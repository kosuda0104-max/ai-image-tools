import AwsDataConverterTool from "@/src/components/AwsDataConverterTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "zh-TW",
  slug: "dynamodb-json-converter",
  jaTitle: "DynamoDB JSON変換",
  jaDescription: "DynamoDB JSONをCSV・Excelへ変換します。",
  enTitle: "DynamoDB JSON Converter",
  enDescription: "Convert DynamoDB typed JSON to JSON, CSV, or Excel.",
  zhTwTitle: "DynamoDB JSON 轉 CSV、Excel｜免費轉換器",
  zhTwDescription: "將 DynamoDB 型別 JSON、JSONL 與 S3 .json.gz 匯出檔轉成一般 JSON、CSV 或 Excel。",
});

export default function Page() {
  return <AwsDataConverterTool kind="dynamodb" locale="zh-TW" />;
}
