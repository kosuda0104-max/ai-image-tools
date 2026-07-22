export type ParsedCsv = {
  columns: string[];
  rows: string[][];
};

export type CsvSourceEncoding =
  | "auto"
  | "utf-8"
  | "big5"
  | "shift_jis"
  | "utf-16le"
  | "utf-16be";

export type CsvOutputEncoding = "utf-8-bom" | "utf-8";
export type CsvDelimiter = "," | ";" | "\t" | "|";

export function stripBom(text: string) {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

export function decodeCsvText(
  bytes: ArrayBuffer,
  encoding: CsvSourceEncoding,
) {
  if (encoding === "auto") {
    const head = new Uint8Array(bytes.slice(0, 4));

    if (head[0] === 0xff && head[1] === 0xfe) {
      return stripBom(new TextDecoder("utf-16le").decode(bytes));
    }

    if (head[0] === 0xfe && head[1] === 0xff) {
      return stripBom(new TextDecoder("utf-16be").decode(bytes));
    }

    if (head[0] === 0xef && head[1] === 0xbb && head[2] === 0xbf) {
      return stripBom(new TextDecoder("utf-8").decode(bytes));
    }

    return stripBom(new TextDecoder("utf-8").decode(bytes));
  }

  return stripBom(new TextDecoder(encoding).decode(bytes));
}

export function encodeCsvText(text: string, encoding: CsvOutputEncoding) {
  const normalized = text.replace(/\r?\n/g, "\r\n");
  const output = encoding === "utf-8-bom" ? `\ufeff${normalized}` : normalized;
  return new TextEncoder().encode(output);
}

export function parseDelimitedText(
  text: string,
  delimiter: CsvDelimiter,
): ParsedCsv {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let quoted = false;

  const finishRow = () => {
    row.push(cell);
    if (row.some((value) => value.length > 0)) rows.push(row);
    row = [];
    cell = "";
  };

  for (let index = 0; index < text.length; index++) {
    const character = text[index];

    if (quoted) {
      if (character === '"') {
        if (text[index + 1] === '"') {
          cell += '"';
          index++;
        } else {
          quoted = false;
        }
      } else {
        cell += character;
      }
      continue;
    }

    if (character === '"' && cell.length === 0) {
      quoted = true;
    } else if (character === delimiter) {
      row.push(cell);
      cell = "";
    } else if (character === "\n" || character === "\r") {
      finishRow();
      if (character === "\r" && text[index + 1] === "\n") index++;
    } else {
      cell += character;
    }
  }

  if (cell.length > 0 || row.length > 0) finishRow();

  if (rows.length === 0) return { columns: [], rows: [] };

  return {
    columns: rows[0],
    rows: rows.slice(1),
  };
}

export function parseCsv(text: string): ParsedCsv {
  return parseDelimitedText(text, ",");
}

export function detectCsvDelimiter(text: string): CsvDelimiter {
  const candidates: CsvDelimiter[] = [",", ";", "\t", "|"];
  let best: { delimiter: CsvDelimiter; score: number } = {
    delimiter: ",",
    score: -1,
  };

  for (const delimiter of candidates) {
    const parsed = parseDelimitedText(text, delimiter);
    const widths = [
      parsed.columns.length,
      ...parsed.rows.slice(0, 20).map((row) => row.length),
    ];
    const expectedWidth = parsed.columns.length;
    const consistentRows = widths.filter((width) => width === expectedWidth).length;
    const inconsistentRows = widths.length - consistentRows;
    const score =
      expectedWidth > 1
        ? consistentRows * 100 + expectedWidth - inconsistentRows * 25
        : 0;

    if (score > best.score) best = { delimiter, score };
  }

  return best.delimiter;
}

export function escapeCsvCell(value: unknown): string {
  return escapeDelimitedCell(value, ",");
}

export function escapeDelimitedCell(
  value: unknown,
  delimiter: CsvDelimiter,
): string {
  if (value === null || value === undefined) return "";
  const text = String(value);

  if (text.includes(delimiter) || /["\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

export function rowsToCsv(columns: string[], rows: unknown[][]) {
  return rowsToDelimited(columns, rows, ",");
}

export function rowsToDelimited(
  columns: string[],
  rows: unknown[][],
  delimiter: CsvDelimiter,
) {
  const header = columns
    .map((value) => escapeDelimitedCell(value, delimiter))
    .join(delimiter);
  const body = rows.map((row) =>
    row.map((value) => escapeDelimitedCell(value, delimiter)).join(delimiter),
  );
  return [header, ...body].join("\r\n");
}
