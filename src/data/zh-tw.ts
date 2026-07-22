export const ZH_TW_TOOL_SLUGS = [
  "csv-encoding-fix",
  "parquet-to-csv",
  "dynamodb-json-converter",
  "cloudtrail-log-to-csv",
  "heic-to-jpg",
  "webp-to-jpg",
] as const;

export const ZH_TW_GUIDE_SLUGS = ["aws-export-file-formats"] as const;

export type ZhTwToolSlug = (typeof ZH_TW_TOOL_SLUGS)[number];
export type ZhTwGuideSlug = (typeof ZH_TW_GUIDE_SLUGS)[number];

export const ZH_TW_TOOL_COPY: Record<
  ZhTwToolSlug,
  { name: string; description: string }
> = {
  "csv-encoding-fix": {
    name: "修復 CSV 亂碼",
    description:
      "將 Big5、Shift-JIS、UTF-16 或 UTF-8 CSV 轉成 Excel 易於開啟的 UTF-8 CSV。",
  },
  "parquet-to-csv": {
    name: "Parquet 轉 CSV",
    description:
      "直接在瀏覽器將 Parquet 資料轉成 CSV，適合 AWS、BigQuery 與資料分析工作。",
  },
  "dynamodb-json-converter": {
    name: "DynamoDB JSON 轉換器",
    description:
      "將 DynamoDB 型別 JSON、JSONL 或 JSON.GZ 轉成一般 JSON、CSV 或 Excel。",
  },
  "cloudtrail-log-to-csv": {
    name: "CloudTrail 日誌轉 CSV",
    description:
      "合併多個 CloudTrail .json.gz 稽核日誌，並轉成 CSV 或 JSONL。",
  },
  "heic-to-jpg": {
    name: "HEIC 轉 JPG",
    description:
      "將 iPhone 的 HEIC 照片轉成相容性更高、方便分享與上傳的 JPG。",
  },
  "webp-to-jpg": {
    name: "WebP 轉 JPG",
    description:
      "將 WebP 圖片轉成廣泛支援的 JPG，方便在舊版軟體或上傳表單中使用。",
  },
};

export function isZhTwToolSlug(slug: string): slug is ZhTwToolSlug {
  return (ZH_TW_TOOL_SLUGS as readonly string[]).includes(slug);
}

export function isZhTwGuideSlug(slug: string): slug is ZhTwGuideSlug {
  return (ZH_TW_GUIDE_SLUGS as readonly string[]).includes(slug);
}
