import AwsDataConverterTool from "@/src/components/AwsDataConverterTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "transcribe-json-to-srt",
  jaTitle: "Amazon Transcribe JSONをSRT・VTTに変換",
  jaDescription: "Amazon TranscribeのJSON結果から時刻・句読点・話者ラベルを読み取り、SRT・WebVTT・TXT字幕へ変換します。",
  enTitle: "Amazon Transcribe JSON to SRT & VTT",
  enDescription: "Convert Amazon Transcribe JSON output to SRT, WebVTT, or TXT using word timestamps, punctuation, and speaker labels.",
});

export default function Page() {
  return <AwsDataConverterTool kind="transcribe" locale="ja" />;
}
