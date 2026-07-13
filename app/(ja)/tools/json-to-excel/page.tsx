import JsonToExcelTool from "@/src/components/JsonToExcelTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "json-to-excel",
  jaTitle: "JSONをExcelに変換【無料・ブラウザ完結】オンラインツール",
  jaDescription:
    "JSONファイルをExcel（.xlsx）に変換できる無料オンラインツールです。APIレスポンスやDBエクスポートを表で確認しやすい形に整えます。",
  enTitle: "JSON to Excel Converter Free Online",
  enDescription:
    "Convert JSON files to Excel (.xlsx) online for free. Turn API responses and database exports into spreadsheet-ready files in your browser.",
});

export default function Page() {
  return <JsonToExcelTool locale="ja" />;
}
