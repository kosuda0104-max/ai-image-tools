import AwsDataConverterTool from "@/src/components/AwsDataConverterTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "cloudwatch-logs-converter",
  jaTitle: "CloudWatch Logs（.gz）をCSV・JSONLに変換",
  jaDescription: "CloudWatch LogsのS3エクスポート.gzを複数結合し、時刻順に整列してCSVまたはJSONLへ変換します。",
  enTitle: "CloudWatch Logs .gz to CSV & JSONL",
  enDescription: "Merge CloudWatch Logs .gz exports, sort events by timestamp, and convert them to CSV or JSONL locally.",
});

export default function Page() {
  return <AwsDataConverterTool kind="cloudwatch" locale="en" />;
}
