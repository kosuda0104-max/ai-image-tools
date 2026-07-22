import { describe, expect, it } from "vitest";
import {
  decodeCsvText,
  detectCsvDelimiter,
  parseDelimitedText,
  rowsToDelimited,
} from "@/src/lib/csv";

describe("delimited text helpers", () => {
  it("decodes explicitly selected Big5 CSV text", () => {
    const bytes = new Uint8Array([
      0x6e, 0x61, 0x6d, 0x65, 0x0a, 0xa4, 0xa4, 0xa4, 0xe5,
    ]);

    expect(decodeCsvText(bytes.buffer, "big5")).toBe("name\n中文");
  });

  it("detects semicolon-delimited CSV and preserves quoted delimiters", () => {
    const input = 'name;note\r\nAda;"alpha;beta"\r\nLin;plain';

    expect(detectCsvDelimiter(input)).toBe(";");
    expect(parseDelimitedText(input, ";")).toEqual({
      columns: ["name", "note"],
      rows: [
        ["Ada", "alpha;beta"],
        ["Lin", "plain"],
      ],
    });
  });

  it("keeps quoted line breaks and escaped quotes in one cell", () => {
    const input = 'id,note\n1,"line 1\nline 2"\n2,"say ""hello"""';

    expect(parseDelimitedText(input, ",").rows).toEqual([
      ["1", "line 1\nline 2"],
      ["2", 'say "hello"'],
    ]);
  });

  it("escapes values for the selected output delimiter", () => {
    expect(
      rowsToDelimited(
        ["name", "note"],
        [
          ["Ada", "alpha,beta"],
          ["Lin", 'say "hello"'],
        ],
        ",",
      ),
    ).toBe('name,note\r\nAda,"alpha,beta"\r\nLin,"say ""hello"""');
  });
});
