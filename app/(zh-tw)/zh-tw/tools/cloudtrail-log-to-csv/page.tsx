import AwsDataConverterTool from "@/src/components/AwsDataConverterTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "zh-TW",
  slug: "cloudtrail-log-to-csv",
  jaTitle: "CloudTrailログをCSVに変換",
  jaDescription: "CloudTrailログをCSV・JSONLへ変換します。",
  enTitle: "CloudTrail Log to CSV Converter",
  enDescription: "Merge CloudTrail logs and convert them to CSV or JSONL.",
  zhTwTitle: "CloudTrail 日誌轉 CSV｜合併 .json.gz",
  zhTwDescription: "合併多個 AWS CloudTrail .json.gz 稽核日誌並轉成 CSV 或 JSONL，處理不需上傳。",
});

export default function Page() {
  return <AwsDataConverterTool kind="cloudtrail" locale="zh-TW" />;
}
