import CsvEncodingFixTool from "@/src/components/CsvEncodingFixTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "zh-TW",
  slug: "csv-encoding-fix",
  jaTitle: "CSV文字化け修正｜Shift-JIS・UTF-16をUTF-8へ変換",
  jaDescription: "CSVの文字化けをブラウザ内で修正します。",
  enTitle: "Fix CSV Encoding Online",
  enDescription: "Convert CSV text encoding in your browser.",
  zhTwTitle: "修復 CSV 亂碼｜Big5、Shift-JIS 轉 UTF-8",
  zhTwDescription: "免費將 Big5、Shift-JIS、UTF-16 CSV 轉成 Excel 易於開啟的 UTF-8 BOM CSV，檔案不需上傳。",
});

export default function Page() {
  return <CsvEncodingFixTool locale="zh-TW" />;
}
