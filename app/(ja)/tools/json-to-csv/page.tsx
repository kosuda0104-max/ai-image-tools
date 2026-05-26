import JsonToCsvTool from "@/src/components/JsonToCsvTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "json-to-csv",
  jaTitle: "JSONをCSVに変換【無料・ブラウザ完結】オンラインツール",
  jaDescription:
    "JSONファイルをブラウザ上でCSVに変換できる無料オンラインツールです。アップロード不要・安全。APIレスポンスやDBエクスポートをExcel・スプレッドシートで開ける形式に変換。",
  enTitle: "JSON to CSV Converter Free Online",
  enDescription:
    "Convert JSON files to CSV online for free. No upload required, runs in your browser. Turn API responses and database exports into spreadsheet-ready CSV files.",
});

export default function Page() {
  return <JsonToCsvTool locale="ja" />;
}
