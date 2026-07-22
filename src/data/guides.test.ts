import { describe, expect, it } from "vitest";
import { getGuide } from "@/src/data/guides";
import { getRelatedGuides } from "@/src/data/guide-related-guides";
import { getGuideRelatedTools } from "@/src/data/guide-related-tools";
import { buildGuideArticleJsonLd } from "@/src/lib/guide-seo";
import { awsExportFormatsZhTwGuide } from "@/src/data/guides.zh-tw";

const TARGET_GUIDES = {
  "heic-cannot-open-windows": "2026-07-14",
  "csv-encoding-fix": "2026-07-14",
  "what-is-avif": "2026-07-22",
} as const;

describe.each(["ja", "en"] as const)("priority guides (%s)", (locale) => {
  it.each(Object.entries(TARGET_GUIDES))(
    "keeps %s current and source-backed",
    (slug, updatedAt) => {
      const guide = getGuide(locale, slug);

      expect(guide).toBeDefined();
      expect(guide?.updatedAt).toBe(updatedAt);
      expect(guide?.sources?.length).toBeGreaterThan(0);
      expect(guide?.sources?.every((source) => source.href.startsWith("https://"))).toBe(true);

      const jsonLd = buildGuideArticleJsonLd(guide!, locale);
      expect(jsonLd.dateModified).toBe(updatedAt);
      expect(jsonLd.citation).toEqual(guide?.sources?.map((source) => source.href));
    },
  );

  it("answers each target symptom with distinct content", () => {
    const heic = getGuide(locale, "heic-cannot-open-windows");
    const csv = getGuide(locale, "csv-encoding-fix");
    const avif = getGuide(locale, "what-is-avif");

    expect(heic?.sections.some((section) => /30/.test(section.title))).toBe(true);
    expect(csv?.sections.some((section) => /症状|symptom/i.test(section.title))).toBe(true);
    expect(avif?.sections.some((section) => /拡張子|extension/i.test(section.title))).toBe(true);
  });
});

describe("latest GSC opportunities", () => {
  it("targets the Japanese AVIF and transparency queries in prominent copy", () => {
    const avif = getGuide("ja", "what-is-avif");
    const transparency = getGuide("ja", "png-transparency-basics");

    expect(avif?.title).toContain(".avif");
    expect(avif?.description).toMatch(/無料.*ブラウザ/);
    expect(transparency?.title).toMatch(/PNG.*透過.*JPG.*JPEG/);
    expect(transparency?.sections.some((section) => /JPG・JPEGは透過できない/.test(section.title))).toBe(
      true,
    );
  });

  it("answers Parquet reading and BigQuery workflow queries with sources", () => {
    const jaGuide = getGuide("ja", "what-is-parquet");
    const enGuide = getGuide("en", "parquet-csv-workflows");

    expect(jaGuide?.title).toContain("パーケット");
    expect(jaGuide?.sections.some((section) => /BigQuery/.test(section.title))).toBe(true);
    expect(jaGuide?.sources?.length).toBeGreaterThanOrEqual(3);
    expect(enGuide?.title.startsWith("Parquet vs CSV for BigQuery")).toBe(true);
    expect(enGuide?.sections.some((section) => /BigQuery and Parquet/.test(section.title))).toBe(true);
    expect(enGuide?.sources?.length).toBeGreaterThanOrEqual(4);
  });
});

describe("HEIC guide cluster", () => {
  it.each(["ja", "en"] as const)(
    "links the Windows and iPhone/PDF guides both ways (%s)",
    (locale) => {
      const windowsLinks = getRelatedGuides(locale, "heic-cannot-open-windows");
      const pdfLinks = getRelatedGuides(locale, "iphone-photos-to-pdf");

      expect(windowsLinks.map((guide) => guide.slug)).toContain("iphone-photos-to-pdf");
      expect(pdfLinks.map((guide) => guide.slug)).toContain("heic-cannot-open-windows");
    },
  );
});

describe("AWS export conversion cluster", () => {
  it.each(["ja", "en"] as const)(
    "publishes a source-backed hub linked to all six AWS tools (%s)",
    (locale) => {
      const guide = getGuide(locale, "aws-export-file-formats");
      const tools = getGuideRelatedTools(locale, "aws-export-file-formats");

      expect(guide?.updatedAt).toBe("2026-07-22");
      expect(guide?.sources).toHaveLength(6);
      expect(guide?.sections.length).toBeGreaterThanOrEqual(7);
      expect(tools.map((tool) => tool.slug)).toEqual([
        "dynamodb-json-converter",
        "textract-json-to-excel",
        "cloudtrail-log-to-csv",
        "s3-inventory-viewer",
        "cloudwatch-logs-converter",
        "transcribe-json-to-srt",
      ]);
      expect(
        getRelatedGuides(locale, "what-is-parquet").map((item) => item.slug),
      ).toContain("aws-export-file-formats");
    },
  );

  it("publishes a complete Traditional Chinese AWS guide and only localized tools", () => {
    const tools = getGuideRelatedTools("zh-TW", "aws-export-file-formats");
    const jsonLd = buildGuideArticleJsonLd(awsExportFormatsZhTwGuide, "zh-TW");

    expect(awsExportFormatsZhTwGuide.sources).toHaveLength(6);
    expect(awsExportFormatsZhTwGuide.sections).toHaveLength(7);
    expect(tools.map((tool) => tool.slug)).toEqual([
      "dynamodb-json-converter",
      "cloudtrail-log-to-csv",
      "parquet-to-csv",
      "csv-encoding-fix",
    ]);
    expect(jsonLd.inLanguage).toBe("zh-TW");
    expect(jsonLd.url).toContain("/zh-tw/guides/aws-export-file-formats");
  });
});
