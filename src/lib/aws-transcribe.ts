import { isRecord, parseJsonOrJsonLines } from "@/src/lib/aws-common";

export type TranscriptCue = {
  index: number;
  start: number;
  end: number;
  speaker: string;
  text: string;
};

export type TranscribeConversion = {
  transcript: string;
  cues: TranscriptCue[];
  srt: string;
  vtt: string;
  text: string;
};

type TimedWord = {
  start: number;
  end: number;
  speaker: string;
  text: string;
};

function numericTime(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

function alternativeContent(value: unknown) {
  if (!Array.isArray(value)) return "";
  const first = value.find(isRecord);
  return first ? String(first.content ?? "") : "";
}

function speakerMap(results: Record<string, unknown>) {
  const labels = isRecord(results.speaker_labels) ? results.speaker_labels : null;
  const segments = labels && Array.isArray(labels.segments) ? labels.segments : [];
  const map = new Map<string, string>();

  for (const segment of segments.filter(isRecord)) {
    if (!Array.isArray(segment.items)) continue;
    for (const item of segment.items.filter(isRecord)) {
      const start = String(item.start_time ?? "");
      const speaker = String(item.speaker_label ?? segment.speaker_label ?? "");
      if (start && speaker) map.set(start, speaker);
    }
  }
  return map;
}

function wordsFromItems(results: Record<string, unknown>) {
  const items = Array.isArray(results.items) ? results.items.filter(isRecord) : [];
  const speakers = speakerMap(results);
  const words: TimedWord[] = [];

  for (const item of items) {
    const content = alternativeContent(item.alternatives);
    if (!content) continue;

    if (item.type === "punctuation") {
      const previous = words.at(-1);
      if (previous) previous.text += content;
      continue;
    }

    const startKey = String(item.start_time ?? "");
    words.push({
      start: numericTime(item.start_time),
      end: numericTime(item.end_time ?? item.start_time),
      speaker: String(
        item.speaker_label ?? speakers.get(startKey) ?? words.at(-1)?.speaker ?? "",
      ),
      text: content,
    });
  }
  return words;
}

function needsSpace(left: string, right: string) {
  const cjk = /[\u3040-\u30ff\u3400-\u9fff]/;
  return !cjk.test(left.at(-1) ?? "") && !cjk.test(right[0] ?? "");
}

function joinWords(words: TimedWord[]) {
  return words.reduce(
    (text, word) => (text ? `${text}${needsSpace(text, word.text) ? " " : ""}${word.text}` : word.text),
    "",
  );
}

function cuesFromWords(words: TimedWord[]) {
  const cues: TranscriptCue[] = [];
  let current: TimedWord[] = [];

  const finish = () => {
    if (current.length === 0) return;
    const speaker = current[0].speaker;
    const body = joinWords(current);
    cues.push({
      index: cues.length + 1,
      start: current[0].start,
      end: Math.max(current.at(-1)?.end ?? current[0].start, current[0].start + 0.2),
      speaker,
      text: speaker ? `[${speaker}] ${body}` : body,
    });
    current = [];
  };

  for (const word of words) {
    const candidate = [...current, word];
    const speakerChanged = current.length > 0 && word.speaker !== current[0].speaker;
    const tooLong = joinWords(candidate).length > 42;
    const tooSlow = current.length > 0 && word.end - current[0].start > 6;
    if (speakerChanged || tooLong || tooSlow) finish();
    current.push(word);
    if (/[.!?。！？]$/.test(word.text) && word.end - current[0].start >= 1) finish();
  }
  finish();
  return cues;
}

function cuesFromAudioSegments(results: Record<string, unknown>) {
  const segments = Array.isArray(results.audio_segments)
    ? results.audio_segments.filter(isRecord)
    : [];
  return segments.flatMap((segment, index): TranscriptCue[] => {
    const text = String(segment.transcript ?? "").trim();
    if (!text) return [];
    const speaker = String(segment.speaker_label ?? "");
    return [
      {
        index: index + 1,
        start: numericTime(segment.start_time),
        end: Math.max(
          numericTime(segment.end_time),
          numericTime(segment.start_time) + 0.2,
        ),
        speaker,
        text: speaker ? `[${speaker}] ${text}` : text,
      },
    ];
  });
}

function formatTimestamp(seconds: number, separator: "," | ".") {
  const milliseconds = Math.max(0, Math.round(seconds * 1000));
  const hours = Math.floor(milliseconds / 3_600_000);
  const minutes = Math.floor((milliseconds % 3_600_000) / 60_000);
  const secs = Math.floor((milliseconds % 60_000) / 1000);
  const millis = milliseconds % 1000;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}${separator}${String(millis).padStart(3, "0")}`;
}

export function cuesToSrt(cues: TranscriptCue[]) {
  return cues
    .map(
      (cue) =>
        `${cue.index}\r\n${formatTimestamp(cue.start, ",")} --> ${formatTimestamp(cue.end, ",")}\r\n${cue.text}`,
    )
    .join("\r\n\r\n");
}

export function cuesToVtt(cues: TranscriptCue[]) {
  const body = cues
    .map(
      (cue) =>
        `${formatTimestamp(cue.start, ".")} --> ${formatTimestamp(cue.end, ".")}\n${cue.text}`,
    )
    .join("\n\n");
  return `WEBVTT\n\n${body}\n`;
}

export function parseTranscribeText(text: string): TranscribeConversion {
  const document = parseJsonOrJsonLines(text).find(
    (value) => isRecord(value) && isRecord(value.results),
  );
  if (!isRecord(document) || !isRecord(document.results)) {
    throw new Error("No Amazon Transcribe results were found.");
  }

  const results = document.results;
  const transcriptEntry = Array.isArray(results.transcripts)
    ? results.transcripts.find(isRecord)
    : null;
  const transcript = String(transcriptEntry?.transcript ?? "").trim();
  let cues = cuesFromAudioSegments(results);
  if (cues.length === 0) cues = cuesFromWords(wordsFromItems(results));
  if (cues.length === 0 && transcript) {
    cues = [{ index: 1, start: 0, end: 5, speaker: "", text: transcript }];
  }
  if (cues.length === 0) {
    throw new Error("No timed transcript items or transcript text were found.");
  }

  const plainText = transcript || cues.map((cue) => cue.text).join(" ");
  return {
    transcript: plainText,
    cues,
    srt: `${cuesToSrt(cues)}\r\n`,
    vtt: cuesToVtt(cues),
    text: `${plainText}\n`,
  };
}
