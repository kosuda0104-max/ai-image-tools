import { strFromU8, unzipSync } from "fflate";
import { describe, expect, it } from "vitest";
import { createXlsxBytes } from "@/src/lib/xlsx";

describe("createXlsxBytes", () => {
  it("creates an xlsx zip with workbook and worksheet XML", () => {
    const bytes = createXlsxBytes({
      headers: ["name", "score"],
      rows: [["Alice", 3]],
      sheetName: "Scores",
    });
    const entries = unzipSync(bytes);
    const workbook = strFromU8(entries["xl/workbook.xml"]);
    const worksheet = strFromU8(entries["xl/worksheets/sheet1.xml"]);

    expect(bytes[0]).toBe(0x50);
    expect(bytes[1]).toBe(0x4b);
    expect(workbook).toContain('name="Scores"');
    expect(worksheet).toContain("Alice");
    expect(worksheet).toContain('<c r="B2" t="n"><v>3</v></c>');
  });
});
