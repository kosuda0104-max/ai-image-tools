import { describe, expect, it } from "vitest";
import { getAllToolItems } from "@/src/data/tool-directory";

const newSlugs = [
  "image-background-transparent",
  "parquet-viewer",
  "csv-delimiter-converter",
  "jsonl-to-csv",
  "tiff-to-pdf",
  "avif-to-webp",
  "dynamodb-json-converter",
  "textract-json-to-excel",
  "cloudtrail-log-to-csv",
  "s3-inventory-viewer",
  "cloudwatch-logs-converter",
  "transcribe-json-to-srt",
] as const;

describe("tool directory", () => {
  it("contains all 67 unique tools in both locales", () => {
    const ja = getAllToolItems("ja");
    const en = getAllToolItems("en");

    expect(ja).toHaveLength(67);
    expect(en).toHaveLength(67);
    expect(new Set(ja.map((tool) => tool.slug)).size).toBe(67);
    expect(en.map((tool) => tool.slug)).toEqual(ja.map((tool) => tool.slug));
  });

  it.each(newSlugs)("registers %s with localized URLs", (slug) => {
    const ja = getAllToolItems("ja").find((tool) => tool.slug === slug);
    const en = getAllToolItems("en").find((tool) => tool.slug === slug);

    expect(ja?.href).toBe(`/tools/${slug}`);
    expect(en?.href).toBe(`/en/tools/${slug}`);
    expect(ja?.name).toBeTruthy();
    expect(en?.name).toBeTruthy();
  });
});
