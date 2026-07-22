import AwsDataConverterTool from "@/src/components/AwsDataConverterTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "cloudtrail-log-to-csv",
  jaTitle: "CloudTrailログ（.json.gz）をCSVに変換",
  jaDescription: "S3の複数CloudTrail .json.gzログを結合し、監査イベントをCSVまたはJSONLへブラウザ内で変換します。",
  enTitle: "CloudTrail .json.gz Log to CSV Converter",
  enDescription: "Merge AWS CloudTrail .json.gz files from S3 and convert audit events to CSV or JSONL in your browser.",
});

export default function Page() {
  return <AwsDataConverterTool kind="cloudtrail" locale="ja" />;
}
