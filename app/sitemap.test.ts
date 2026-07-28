import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

const PRIORITY_GUIDES = {
  "/guides/heic-cannot-open-windows": "2026-07-14",
  "/guides/csv-encoding-fix": "2026-07-14",
  "/en/guides/heic-cannot-open-windows": "2026-07-14",
  "/en/guides/csv-encoding-fix": "2026-07-14",
  "/guides/what-is-avif": "2026-07-22",
  "/en/guides/what-is-avif": "2026-07-22",
  "/guides/png-transparency-basics": "2026-07-22",
  "/guides/what-is-parquet": "2026-07-22",
  "/en/guides/parquet-csv-workflows": "2026-07-22",
} as const;

const RECRAWL_PRIORITY_TOOLS = [
  "/tools/tiff-to-png",
  "/en/tools/parquet-to-csv",
  "/tools/png-to-webp",
  "/tools/csv-to-parquet",
  "/en/tools/bmp-to-png",
  "/tools/bmp-to-png",
] as const;

const AWS_PATHS = [
  "/tools/dynamodb-json-converter",
  "/tools/textract-json-to-excel",
  "/tools/cloudtrail-log-to-csv",
  "/tools/s3-inventory-viewer",
  "/tools/cloudwatch-logs-converter",
  "/tools/transcribe-json-to-srt",
  "/guides/aws-export-file-formats",
  "/en/tools/dynamodb-json-converter",
  "/en/tools/textract-json-to-excel",
  "/en/tools/cloudtrail-log-to-csv",
  "/en/tools/s3-inventory-viewer",
  "/en/tools/cloudwatch-logs-converter",
  "/en/tools/transcribe-json-to-srt",
  "/en/guides/aws-export-file-formats",
];

const ZH_TW_PATHS = [
  "/zh-tw",
  "/zh-tw/tools",
  "/zh-tw/guides",
  "/zh-tw/tools/csv-encoding-fix",
  "/zh-tw/tools/parquet-to-csv",
  "/zh-tw/tools/dynamodb-json-converter",
  "/zh-tw/tools/cloudtrail-log-to-csv",
  "/zh-tw/tools/heic-to-jpg",
  "/zh-tw/tools/webp-to-jpg",
  "/zh-tw/guides/aws-export-file-formats",
] as const;

describe("sitemap", () => {
  it("publishes the current modified date for priority guides in both locales", () => {
    const entries = sitemap();

    for (const [path, lastModified] of Object.entries(PRIORITY_GUIDES)) {
      const entry = entries.find(({ url }) => new URL(url).pathname === path);
      expect(entry, path).toBeDefined();
      expect(entry?.lastModified).toEqual(new Date(lastModified));
    }
  });

  it("publishes an accurate fresh modified date for recrawl-priority tools", () => {
    const entries = sitemap();

    for (const path of RECRAWL_PRIORITY_TOOLS) {
      const entry = entries.find(({ url }) => new URL(url).pathname === path);
      expect(entry, path).toBeDefined();
      expect(entry?.lastModified).toEqual(new Date("2026-07-29"));
    }
  });

  it("does not mark unchanged tools as freshly modified", () => {
    const entry = sitemap().find(
      ({ url }) => new URL(url).pathname === "/tools/jpg-to-png",
    );
    expect(entry?.lastModified).toEqual(new Date("2026-07-22"));
  });

  it("does not emit duplicate URLs", () => {
    const urls = sitemap().map(({ url }) => url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("publishes every AWS tool and the AWS guide in both locales", () => {
    const paths = new Set(sitemap().map(({ url }) => new URL(url).pathname));
    for (const path of AWS_PATHS) expect(paths.has(path), path).toBe(true);
  });

  it("publishes only the complete Traditional Chinese pilot routes", () => {
    const paths = sitemap().map(({ url }) => new URL(url).pathname);
    const zhTwPaths = paths.filter((path) => path.startsWith("/zh-tw"));

    expect(zhTwPaths.sort()).toEqual([...ZH_TW_PATHS].sort());
  });
});
