import ParquetToCsvTool from "@/src/components/ParquetToCsvTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "zh-TW",
  slug: "parquet-to-csv",
  jaTitle: "ParquetをCSVに変換",
  jaDescription: "ParquetをCSVへ変換します。",
  enTitle: "Parquet to CSV Converter",
  enDescription: "Convert Parquet files to CSV in your browser.",
  zhTwTitle: "Parquet 轉 CSV｜免費瀏覽器轉換工具",
  zhTwDescription: "免費在瀏覽器內將 Parquet 轉成 CSV，適合 AWS S3、Athena、BigQuery 與 Spark 資料。",
});

export default function Page() {
  return <ParquetToCsvTool locale="zh-TW" />;
}
