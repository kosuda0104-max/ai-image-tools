export type ParsedCsv = {
  columns: string[];
  rows: string[][];
};

export type CsvSourceEncoding =
  | "auto"
  | "utf-8"
  | "shift_jis"
  | "utf-16le"
  | "utf-16be";

export type CsvOutputEncoding = "utf-8-bom" | "utf-8";

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

export function parseCsv(text: string): ParsedCsv {
  const rows: string[][] = [];
  let i = 0;

  while (i < text.length) {
    const row: string[] = [];

    while (i < text.length && text[i] !== "\n" && text[i] !== "\r") {
      if (text[i] === '"') {
        let cell = "";
        i++;

        while (i < text.length) {
          if (text[i] === '"') {
            if (text[i + 1] === '"') {
              cell += '"';
              i += 2;
            } else {
              i++;
              break;
            }
          } else {
            cell += text[i++];
          }
        }

        row.push(cell);
        if (text[i] === ",") i++;
      } else {
        let cell = "";

        while (
          i < text.length &&
          text[i] !== "," &&
          text[i] !== "\n" &&
          text[i] !== "\r"
        ) {
          cell += text[i++];
        }

        row.push(cell);
        if (text[i] === ",") i++;
      }
    }

    if (text[i] === "\r") i++;
    if (text[i] === "\n") i++;

    if (row.length > 0 && row.some((cell) => cell.length > 0)) {
      rows.push(row);
    }
  }

  if (rows.length === 0) return { columns: [], rows: [] };

  return {
    columns: rows[0],
    rows: rows.slice(1),
  };
}

export function escapeCsvCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const text = String(value);

  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

export function rowsToCsv(columns: string[], rows: unknown[][]) {
  const header = columns.map(escapeCsvCell).join(",");
  const body = rows.map((row) => row.map(escapeCsvCell).join(","));
  return [header, ...body].join("\r\n");
}
