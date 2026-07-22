import { describe, expect, it } from "vitest";
import { buildToolKeywords } from "@/src/lib/seo-signals";

describe("buildToolKeywords", () => {
  it("uses data-specific keywords for the CSV encoding fixer", () => {
    const keywords = buildToolKeywords({
      locale: "ja",
      slug: "csv-encoding-fix",
      title: "CSV文字化け修正ツール",
    });

    expect(keywords).toContain("CSV 文字化け 修正");
    expect(keywords).toContain("Shift-JIS UTF-8 変換");
    expect(keywords).toContain("データ変換 ツール");
    expect(keywords).not.toContain("PDF ツール");
  });

  it("adds targeted English keywords for Parquet to Excel", () => {
    const keywords = buildToolKeywords({
      locale: "en",
      slug: "parquet-to-excel",
      title: "Parquet to Excel Converter",
    });

    expect(keywords).toContain("open Parquet in Excel");
    expect(keywords).toContain("data converter online");
    expect(keywords).not.toContain("pdf tools online");
  });

  it("does not add PDF keywords to image converters", () => {
    const keywords = buildToolKeywords({
      locale: "ja",
      slug: "svg-to-webp",
      title: "SVGをWebPに変換",
    });

    expect(keywords).toContain("SVG WebP 変換");
    expect(keywords).toContain("画像 変換 ツール");
    expect(keywords).not.toContain("PDF ツール");
  });

  it.each([
    ["image-background-transparent", "Make Image Background Transparent", "make background transparent"],
    ["avif-to-webp", "AVIF to WebP Converter", "AVIF to WebP"],
    ["csv-delimiter-converter", "CSV Delimiter Converter", "CSV opens in one column"],
    ["jsonl-to-csv", "JSONL to CSV Converter", "NDJSON to CSV"],
    ["parquet-viewer", "Parquet Viewer", "Parquet schema viewer"],
    ["tiff-to-pdf", "Multi-page TIFF to PDF", "multi-page TIFF to PDF"],
    ["dynamodb-json-converter", "DynamoDB JSON Converter", "DynamoDB JSON to CSV"],
    ["textract-json-to-excel", "Textract JSON to Excel", "Textract table to CSV"],
    ["cloudtrail-log-to-csv", "CloudTrail Log to CSV", "CloudTrail json.gz converter"],
    ["s3-inventory-viewer", "S3 Inventory Viewer", "S3 Inventory CSV.GZ"],
    ["cloudwatch-logs-converter", "CloudWatch Logs Converter", "CloudWatch .gz converter"],
    ["transcribe-json-to-srt", "Transcribe JSON to SRT", "Amazon Transcribe JSON to SRT"],
  ])("adds targeted SEO terms for %s", (slug, title, expected) => {
    const keywords = buildToolKeywords({ locale: "en", slug, title });

    expect(keywords).toContain(expected);
  });
});
