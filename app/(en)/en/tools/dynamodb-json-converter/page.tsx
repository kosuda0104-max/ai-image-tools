import AwsDataConverterTool from "@/src/components/AwsDataConverterTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "dynamodb-json-converter",
  jaTitle: "DynamoDB JSONをCSV・Excelに変換【無料】",
  jaDescription: "DynamoDBの型付きJSON、JSONL、S3エクスポートの.json.gzを通常JSON・CSV・Excelへブラウザで変換します。",
  enTitle: "DynamoDB JSON Converter to CSV & Excel",
  enDescription: "Convert DynamoDB typed JSON, JSONL, and .json.gz S3 exports to plain JSON, CSV, or Excel without uploading files.",
});

export default function Page() {
  return <AwsDataConverterTool kind="dynamodb" locale="en" />;
}
