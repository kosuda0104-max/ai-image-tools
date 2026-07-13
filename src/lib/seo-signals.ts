const JAPANESE_TEXT_PATTERN = /[ぁ-ヿ㐀-龯]/;

export const TOOL_CONTENT_LAST_UPDATED = "2026-07-13";

const DATA_TOOL_SLUGS = new Set([
  "csv-encoding-fix",
  "csv-to-json",
  "csv-to-parquet",
  "json-to-csv",
  "json-to-excel",
  "parquet-to-csv",
  "parquet-to-excel",
]);

const toolSpecificKeywords: Record<string, { ja: string[]; en: string[] }> = {
  "base64-to-image": {
    ja: ["Base64 画像 変換", "data URL 画像 保存", "Base64 PNG 変換"],
    en: ["Base64 to image", "data URL to image", "decode Base64 image"],
  },
  "csv-encoding-fix": {
    ja: ["CSV 文字化け 修正", "Excel CSV 文字化け", "Shift-JIS UTF-8 変換", "CSV UTF-8 BOM"],
    en: ["fix CSV encoding", "Shift-JIS to UTF-8 CSV", "Excel CSV encoding", "UTF-8 BOM CSV"],
  },
  "json-to-excel": {
    ja: ["JSON Excel 変換", "JSON XLSX 変換", "API JSON Excel"],
    en: ["JSON to Excel", "JSON to XLSX", "API JSON to spreadsheet"],
  },
  "parquet-to-excel": {
    ja: ["Parquet Excel 変換", "Parquet XLSX", "BigQuery Parquet Excel"],
    en: ["Parquet to Excel", "Parquet to XLSX", "open Parquet in Excel"],
  },
  "svg-to-webp": {
    ja: ["SVG WebP 変換", "SVG WebP オンライン", "SVG 軽量化"],
    en: ["SVG to WebP", "convert SVG to WebP", "SVG WebP converter"],
  },
};

export function isJapaneseText(value: string): boolean {
  return JAPANESE_TEXT_PATTERN.test(value);
}

export function formatToolUpdatedLabel(title: string): string {
  if (isJapaneseText(title)) {
    return `最終更新: ${TOOL_CONTENT_LAST_UPDATED}`;
  }

  return `Last updated: ${TOOL_CONTENT_LAST_UPDATED}`;
}

export function buildToolKeywords({
  locale,
  slug,
  title,
}: {
  locale: "ja" | "en";
  slug: string;
  title: string;
}): string[] {
  const words = slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.toUpperCase());
  const specificKeywords = toolSpecificKeywords[slug]?.[locale] ?? [];
  const categoryKeywords = DATA_TOOL_SLUGS.has(slug)
    ? locale === "ja"
      ? ["データ変換 ツール", "CSV JSON Excel 変換"]
      : ["data converter online", "CSV JSON Excel tools"]
    : slug.includes("pdf")
      ? locale === "ja"
        ? ["PDF ツール", "PDF オンライン"]
        : ["pdf tools online", "PDF browser tool"]
    : locale === "ja"
      ? ["画像 変換 ツール", "画像 オンラインツール"]
      : ["image converter online", "image browser tool"];

  if (locale === "ja") {
    return Array.from(
      new Set([
        title,
        `${title} 無料`,
        `${title} オンライン`,
        `${title} ブラウザ`,
        `${words.join(" ")} 変換`,
        ...specificKeywords,
        ...categoryKeywords,
      ]),
    );
  }

  return Array.from(
    new Set([
      title,
      `${title} online`,
      `${title} free`,
      `${title} browser tool`,
      `${words.join(" ")} converter`,
      ...specificKeywords,
      ...categoryKeywords,
    ]),
  );
}
