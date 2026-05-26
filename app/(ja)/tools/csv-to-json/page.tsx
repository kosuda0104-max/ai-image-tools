import CsvToJsonTool from "@/src/components/CsvToJsonTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "csv-to-json",
  jaTitle: "CSVをJSONに変換【無料・ブラウザ完結】オンラインツール",
  jaDescription:
    "CSVファイルをブラウザ上でJSONに変換できる無料オンラインツールです。アップロード不要・安全。スプレッドシートのデータをAPIや開発ツールで使いやすいJSON配列に変換。",
  enTitle: "CSV to JSON Converter Free Online",
  enDescription:
    "Convert CSV files to JSON online for free. No upload required, runs in your browser. Turn spreadsheet data into a JSON array ready for APIs and developer workflows.",
});

export default function Page() {
  return <CsvToJsonTool locale="ja" />;
}
