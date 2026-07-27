import type { FindableTool, ToolFinderLocale } from "@/src/lib/tool-finder";
import { searchToolsByIntent } from "@/src/lib/tool-finder";

export type ToolAssistantGuide = {
  title: string;
  href: string;
};

export type ToolAssistantRecommendation = FindableTool & {
  reason: string;
};

export type ToolAssistantReply =
  | {
      kind: "clarification";
      message: string;
    }
  | {
      kind: "recommendations";
      message: string;
      recommendations: ToolAssistantRecommendation[];
      guide: ToolAssistantGuide | null;
    };

type GuideDefinition = {
  slug: string;
  ja: string;
  en: string;
};

const guideDefinitions: Record<string, GuideDefinition> = {
  aws: {
    slug: "aws-export-file-formats",
    ja: "AWSエクスポート形式の変換ガイド",
    en: "AWS export file format guide",
  },
  avif: {
    slug: "what-is-avif",
    ja: "AVIFとは？開けないときの確認ポイント",
    en: "What is AVIF? Compatibility and conversion guide",
  },
  csv: {
    slug: "csv-encoding-fix",
    ja: "CSVの文字化け・列ずれを直す方法",
    en: "How to fix CSV encoding and column issues",
  },
  heic: {
    slug: "heic-cannot-open-windows",
    ja: "iPhoneのHEIC写真がWindowsで開けないときの対処法",
    en: "How to open iPhone HEIC photos on Windows",
  },
  imageCompress: {
    slug: "compress-images-without-losing-quality",
    ja: "画質を保ちながら画像を軽くする方法",
    en: "How to compress images without obvious quality loss",
  },
  parquet: {
    slug: "parquet-csv-workflows",
    ja: "ParquetとCSVを使い分ける方法",
    en: "Practical Parquet and CSV workflows",
  },
  pdf: {
    slug: "pdf-workflows",
    ja: "PDFの結合・分割・圧縮・変換ガイド",
    en: "PDF merge, split, compression, and conversion guide",
  },
  transparency: {
    slug: "png-transparency-basics",
    ja: "PNGの背景透過で知っておきたいこと",
    en: "PNG transparency basics",
  },
  webp: {
    slug: "what-is-webp",
    ja: "WebPとは？開けないときの変換方法",
    en: "What is WebP? Compatibility and conversion guide",
  },
};

const toolGuideGroups: Array<{ pattern: RegExp; guide: keyof typeof guideDefinitions }> = [
  {
    pattern:
      /^(dynamodb-json-converter|textract-json-to-excel|cloudtrail-log-to-csv|s3-inventory-viewer|cloudwatch-logs-converter|transcribe-json-to-srt)$/,
    guide: "aws",
  },
  { pattern: /^(heic-to-|image-to-pdf$)/, guide: "heic" },
  { pattern: /^avif-to-/, guide: "avif" },
  { pattern: /^(parquet-|csv-to-parquet)/, guide: "parquet" },
  { pattern: /^(csv-|json-to-csv|jsonl-to-csv)/, guide: "csv" },
  { pattern: /(^|-)pdf($|-)|^(merge-pdf|split-pdf|rotate-pdf)/, guide: "pdf" },
  { pattern: /^(image-compress|jpg-compress|png-compress|webp-compress)$/, guide: "imageCompress" },
  { pattern: /background-transparent/, guide: "transparency" },
  { pattern: /(^webp-to-|to-webp$)/, guide: "webp" },
];

const vagueQueries = new Set([
  "変換",
  "ファイル変換",
  "画像",
  "画像変換",
  "画像を変換したい",
  "写真",
  "pdf",
  "csv",
  "json",
  "help",
  "convert",
  "converter",
  "file",
  "fileconverter",
  "image",
  "imageconverter",
  "photo",
]);

const relatedToolSlugs: Record<string, readonly string[]> = {
  "heic-to-jpg": ["heic-to-png", "jpg-compress"],
  "heic-to-png": ["heic-to-jpg", "png-compress"],
  "parquet-to-csv": ["parquet-viewer", "parquet-to-excel"],
  "parquet-viewer": ["parquet-to-csv", "parquet-to-excel"],
  "parquet-to-excel": ["parquet-viewer", "parquet-to-csv"],
  "csv-delimiter-converter": ["csv-encoding-fix", "csv-to-json"],
  "csv-encoding-fix": ["csv-delimiter-converter", "csv-to-json"],
  "compress-pdf": ["pdf-remove-pages", "split-pdf"],
  "merge-pdf": ["split-pdf", "compress-pdf"],
  "split-pdf": ["pdf-remove-pages", "merge-pdf"],
  "image-compress": ["resize-image", "jpg-compress"],
  "image-background-transparent": ["png-compress", "crop-image"],
};

function compact(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\s.,!?！？。、・:：;；()[\]{}「」『』'"`~^|\\/_-]+/g, "")
    .trim();
}

function getGuide(locale: ToolFinderLocale, slug: string) {
  const match = toolGuideGroups.find(({ pattern }) => pattern.test(slug));
  if (!match) return null;

  const definition = guideDefinitions[match.guide];
  const base = locale === "en" ? "/en/guides" : "/guides";
  return {
    title: definition[locale],
    href: `${base}/${definition.slug}`,
  };
}

export function buildToolAssistantReply(
  tools: readonly FindableTool[],
  query: string,
  locale: ToolFinderLocale,
): ToolAssistantReply {
  const normalizedQuery = compact(query);
  const clarification =
    locale === "ja"
      ? "元のファイル形式と、どうしたいかをもう少し教えてください。例:「AVIFをPNGにしたい」「PDFを軽くしたい」"
      : "Tell me the current file format and what you want to do. For example: “Convert AVIF to PNG” or “Make a PDF smaller.”";

  if (normalizedQuery.length < 3 || vagueQueries.has(normalizedQuery)) {
    return { kind: "clarification", message: clarification };
  }

  const intentMatches = searchToolsByIntent(tools, query, locale);
  if (intentMatches.length === 0) {
    return { kind: "clarification", message: clarification };
  }

  const matches = intentMatches.slice(0, 3);
  const matchedSlugs = new Set(matches.map((tool) => tool.slug));
  for (const relatedSlug of relatedToolSlugs[matches[0].slug] ?? []) {
    if (matches.length >= 3) break;
    const relatedTool = tools.find((tool) => tool.slug === relatedSlug);
    if (relatedTool && !matchedSlugs.has(relatedTool.slug)) {
      matches.push(relatedTool);
      matchedSlugs.add(relatedTool.slug);
    }
  }

  const recommendations = matches.map((tool) => ({
    ...tool,
    reason: tool.description,
  }));

  return {
    kind: "recommendations",
    message:
      locale === "ja"
        ? matches.length === 1
          ? "このツールがいちばん近そうです。"
          : "このあたりが近そうです。まずは一番上から試してください。"
        : matches.length === 1
          ? "This tool looks like the closest match."
          : "These look like the closest matches. Start with the first one.",
    recommendations,
    guide: getGuide(locale, matches[0].slug),
  };
}
