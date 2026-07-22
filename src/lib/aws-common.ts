import { gunzipSync } from "fflate";
import type { XlsxValue } from "@/src/lib/xlsx";

export type TabularData = {
  columns: string[];
  rows: XlsxValue[][];
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function safeJsonStringify(value: unknown, space?: number) {
  return JSON.stringify(
    value,
    (_key, child) => {
      if (typeof child === "bigint") return child.toString();
      if (child instanceof Uint8Array) {
        return Array.from(child, (byte) => byte.toString(16).padStart(2, "0")).join("");
      }
      if (child instanceof Date) return child.toISOString();
      return child;
    },
    space,
  );
}

export function toTabularCell(value: unknown): XlsxValue {
  if (value === null || value === undefined) return "";
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) return value.toISOString();
  return safeJsonStringify(value) ?? String(value);
}

export function flattenRecord(
  value: unknown,
  prefix = "",
  output: Record<string, XlsxValue> = {},
  maxDepth = Number.POSITIVE_INFINITY,
  depth = 0,
) {
  if (isRecord(value) && depth < maxDepth) {
    const entries = Object.entries(value);
    if (entries.length === 0) {
      output[prefix || "value"] = "{}";
      return output;
    }

    for (const [key, child] of entries) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (isRecord(child) && depth + 1 < maxDepth) {
        flattenRecord(child, path, output, maxDepth, depth + 1);
      } else {
        output[path] = toTabularCell(child);
      }
    }
  } else {
    output[prefix || "value"] = toTabularCell(value);
  }

  return output;
}

export function recordsToTable(
  records: unknown[],
  options: { preferredColumns?: string[]; maxDepth?: number } = {},
): TabularData {
  const flattened = records.map((record) =>
    flattenRecord(
      record,
      "",
      {},
      options.maxDepth ?? Number.POSITIVE_INFINITY,
    ),
  );
  const found = new Set(flattened.flatMap((record) => Object.keys(record)));
  const columns = [
    ...(options.preferredColumns ?? []).filter((column) => found.delete(column)),
    ...found,
  ];

  return {
    columns,
    rows: flattened.map((record) =>
      columns.map((column) => record[column] ?? ""),
    ),
  };
}

export function decodeMaybeGzip(bytes: Uint8Array, filename = "") {
  const gzip =
    /\.gz$/i.test(filename) || (bytes[0] === 0x1f && bytes[1] === 0x8b);
  const decoded = gzip ? gunzipSync(bytes) : bytes;
  return new TextDecoder("utf-8", { fatal: false }).decode(decoded);
}

export async function readFileText(file: File) {
  return decodeMaybeGzip(new Uint8Array(await file.arrayBuffer()), file.name);
}

export function parseJsonOrJsonLines(text: string): unknown[] {
  const trimmed = text.replace(/^\ufeff/, "").trim();
  if (!trimmed) return [];

  try {
    const value: unknown = JSON.parse(trimmed);
    return Array.isArray(value) ? value : [value];
  } catch {
    return trimmed.split(/\r?\n/).flatMap((line, index) => {
      const candidate = line.trim();
      if (!candidate) return [];
      try {
        return [JSON.parse(candidate) as unknown];
      } catch {
        throw new Error(`Invalid JSON on line ${index + 1}.`);
      }
    });
  }
}
