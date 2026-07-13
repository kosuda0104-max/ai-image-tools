export type JsonlTable = {
  columns: string[];
  rows: unknown[][];
};

function stringifyCell(value: unknown) {
  if (value === null || value === undefined) return "";
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value;
  }
  return JSON.stringify(value);
}

function flattenValue(
  value: unknown,
  prefix = "",
  output: Record<string, unknown> = {},
) {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      const path = prefix ? `${prefix}.${key}` : key;
      if (child !== null && typeof child === "object" && !Array.isArray(child)) {
        flattenValue(child, path, output);
      } else {
        output[path] = stringifyCell(child);
      }
    }
  } else {
    output[prefix || "value"] = stringifyCell(value);
  }

  return output;
}

export function parseJsonLines(text: string) {
  const values: unknown[] = [];

  text.split(/\r?\n/).forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    try {
      values.push(JSON.parse(trimmed));
    } catch {
      throw new Error(`Invalid JSON on line ${index + 1}.`);
    }
  });

  return values;
}

export function jsonLinesToTable(values: unknown[]): JsonlTable {
  const records = values.map((value) => flattenValue(value));
  const columns = Array.from(
    records.reduce((keys, record) => {
      Object.keys(record).forEach((key) => keys.add(key));
      return keys;
    }, new Set<string>()),
  );

  return {
    columns,
    rows: records.map((record) =>
      columns.map((column) => record[column] ?? ""),
    ),
  };
}
