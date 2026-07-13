import CsvEncodingFixTool from "@/src/components/CsvEncodingFixTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "csv-encoding-fix",
  jaTitle: "CSV文字化け修正｜Shift-JISをUTF-8に変換【無料】",
  jaDescription:
    "文字化けしたCSVをShift-JIS・UTF-16・UTF-8として読み取り、Excelで開きやすいUTF-8 BOM付きCSVへ変換できる無料オンラインツールです。",
  enTitle: "Fix CSV Encoding Online - Shift-JIS to UTF-8 CSV",
  enDescription:
    "Fix garbled CSV text by reading Shift-JIS, UTF-16, or UTF-8 and exporting an Excel-friendly UTF-8 CSV with BOM. Runs in your browser.",
});

export default function Page() {
  return <CsvEncodingFixTool locale="ja" />;
}
