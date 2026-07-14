import { describe, expect, it } from "vitest";
import { getAllToolItems } from "@/src/data/tool-directory";
import {
  detectFileFormat,
  getFileRecommendationSlugs,
  searchToolsByIntent,
} from "@/src/lib/tool-finder";

describe("file-based tool recommendations", () => {
  it.each([
    ["photo.jpeg", "", "jpg"],
    ["scan.tif", "", "tiff"],
    ["dataset.unknown", "application/vnd.apache.parquet", "parquet"],
    ["export", "text/csv", "csv"],
  ])("detects %s as %s", (name, type, expected) => {
    expect(detectFileFormat({ name, type })).toBe(expected);
  });

  it("orders the most useful CSV actions first", () => {
    expect(
      getFileRecommendationSlugs({ name: "customers.csv", type: "text/csv" }),
    ).toEqual([
      "csv-encoding-fix",
      "csv-delimiter-converter",
      "csv-to-json",
      "csv-to-parquet",
    ]);
  });

  it("offers all-page PDF conversion first for TIFF files", () => {
    expect(
      getFileRecommendationSlugs({ name: "fax.tiff", type: "image/tiff" }),
    ).toEqual(["tiff-to-pdf", "tiff-to-png", "tiff-to-jpg"]);
  });
});

describe("intent-based tool search", () => {
  it.each([
    ["CSVが1列になる", "csv-delimiter-converter"],
    ["iPhone写真が開けない", "heic-to-jpg"],
    ["画像の背景を透明に", "image-background-transparent"],
    ["PDFの不要ページを消す", "pdf-remove-pages"],
  ])("matches the Japanese problem %s", (query, expectedSlug) => {
    const results = searchToolsByIntent(getAllToolItems("ja"), query, "ja");

    expect(results[0]?.slug).toBe(expectedSlug);
  });

  it.each([
    ["CSV opens in one column", "csv-delimiter-converter"],
    ["make background transparent", "image-background-transparent"],
    ["open parquet", "parquet-viewer"],
    ["remove gps from photo", "remove-exif"],
  ])("matches the English problem %s", (query, expectedSlug) => {
    const results = searchToolsByIntent(getAllToolItems("en"), query, "en");

    expect(results[0]?.slug).toBe(expectedSlug);
  });

  it("still supports direct tool-name search", () => {
    const results = searchToolsByIntent(
      getAllToolItems("en"),
      "PNG to JPG",
      "en",
    );

    expect(results[0]?.slug).toBe("png-to-jpg");
  });
});
