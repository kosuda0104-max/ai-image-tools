import {
  flattenRecord,
  isRecord,
  recordsToTable,
  safeJsonStringify,
  type TabularData,
} from "@/src/lib/aws-common";

export type CloudWatchLogRow = Record<string, unknown> & {
  timestamp: number | "";
  datetime: string;
  message: string;
  sourceFile: string;
  lineNumber: number;
};

export type CloudWatchConversion = {
  events: CloudWatchLogRow[];
  table: TabularData;
};

function timestampValue(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value < 1_000_000_000_000 ? Math.round(value * 1000) : Math.round(value);
  }
  if (typeof value === "string" && /^\d{10,13}$/.test(value)) {
    const number = Number(value);
    return value.length <= 10 ? number * 1000 : number;
  }
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return "" as const;
}

function enrichMessage(row: CloudWatchLogRow, messageValue: unknown) {
  if (isRecord(messageValue)) {
    Object.assign(row, flattenRecord(messageValue, "message", {}, 4));
    row.message = safeJsonStringify(messageValue) ?? "";
    return row;
  }

  const message = String(messageValue ?? "");
  row.message = message;
  try {
    const parsed: unknown = JSON.parse(message);
    if (isRecord(parsed)) {
      Object.assign(row, flattenRecord(parsed, "message", {}, 4));
    }
  } catch {
    // Most CloudWatch messages are plain text, so JSON enrichment is optional.
  }
  return row;
}

function createRow({
  timestamp,
  message,
  sourceFile,
  lineNumber,
  extra = {},
}: {
  timestamp: unknown;
  message: unknown;
  sourceFile: string;
  lineNumber: number;
  extra?: Record<string, unknown>;
}) {
  const normalizedTimestamp = timestampValue(timestamp);
  const row: CloudWatchLogRow = {
    timestamp: normalizedTimestamp,
    datetime:
      normalizedTimestamp === "" ? "" : new Date(normalizedTimestamp).toISOString(),
    message: "",
    sourceFile,
    lineNumber,
    ...extra,
  };
  return enrichMessage(row, message);
}

function rowsFromJson(
  value: unknown,
  sourceFile: string,
  lineNumber: number,
): CloudWatchLogRow[] {
  if (isRecord(value) && Array.isArray(value.logEvents)) {
    return value.logEvents.filter(isRecord).map((event, index) =>
      createRow({
        timestamp: event.timestamp,
        message: event.message,
        sourceFile,
        lineNumber: lineNumber + index,
        extra: {
          id: event.id ?? "",
          logGroup: value.logGroup ?? "",
          logStream: value.logStream ?? "",
          owner: value.owner ?? "",
        },
      }),
    );
  }

  if (Array.isArray(value)) {
    return value.flatMap((item, index) =>
      rowsFromJson(item, sourceFile, lineNumber + index),
    );
  }

  if (isRecord(value)) {
    const timestamp = value.timestamp ?? value.time ?? value.eventTime ?? "";
    const message = value.message ?? value;
    const extra = Object.fromEntries(
      Object.entries(value).filter(
        ([key]) => !["timestamp", "time", "eventTime", "message"].includes(key),
      ),
    );
    return [createRow({ timestamp, message, sourceFile, lineNumber, extra })];
  }

  return [];
}

function rowFromPlainLine(line: string, sourceFile: string, lineNumber: number) {
  const epoch = line.match(/^(\d{10,13})\s+([\s\S]*)$/);
  if (epoch) {
    return createRow({
      timestamp: epoch[1],
      message: epoch[2],
      sourceFile,
      lineNumber,
    });
  }

  const iso = line.match(
    /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)\s+([\s\S]*)$/,
  );
  return createRow({
    timestamp: iso?.[1] ?? "",
    message: iso?.[2] ?? line,
    sourceFile,
    lineNumber,
  });
}

export function parseCloudWatchText(
  text: string,
  sourceFile = "cloudwatch.log",
): CloudWatchConversion {
  const trimmed = text.replace(/^\ufeff/, "").trim();
  if (!trimmed) throw new Error("No CloudWatch log events were found.");

  let events: CloudWatchLogRow[] = [];
  try {
    const parsed: unknown = JSON.parse(trimmed);
    events = rowsFromJson(parsed, sourceFile, 1);
  } catch {
    events = trimmed.split(/\r?\n/).flatMap((line, index) => {
      if (!line.trim()) return [];
      try {
        return rowsFromJson(JSON.parse(line), sourceFile, index + 1);
      } catch {
        return [rowFromPlainLine(line, sourceFile, index + 1)];
      }
    });
  }

  if (events.length === 0) throw new Error("No CloudWatch log events were found.");
  events.sort((left, right) => {
    if (left.timestamp === "") return right.timestamp === "" ? left.lineNumber - right.lineNumber : 1;
    if (right.timestamp === "") return -1;
    return left.timestamp - right.timestamp || left.lineNumber - right.lineNumber;
  });

  return {
    events,
    table: recordsToTable(events, {
      preferredColumns: [
        "datetime",
        "timestamp",
        "message",
        "logGroup",
        "logStream",
        "sourceFile",
        "lineNumber",
      ],
      maxDepth: 1,
    }),
  };
}

export function mergeCloudWatchConversions(
  conversions: CloudWatchConversion[],
): CloudWatchConversion {
  const events = conversions.flatMap((conversion) => conversion.events);
  if (events.length === 0) throw new Error("No CloudWatch log events were found.");
  events.sort((left, right) => {
    if (left.timestamp === "") return right.timestamp === "" ? 0 : 1;
    if (right.timestamp === "") return -1;
    return left.timestamp - right.timestamp;
  });
  return {
    events,
    table: recordsToTable(events, {
      preferredColumns: [
        "datetime",
        "timestamp",
        "message",
        "logGroup",
        "logStream",
        "sourceFile",
        "lineNumber",
      ],
      maxDepth: 1,
    }),
  };
}
