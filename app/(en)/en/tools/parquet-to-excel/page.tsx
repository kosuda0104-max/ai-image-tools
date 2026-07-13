import ParquetToExcelTool from "@/src/components/ParquetToExcelTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "parquet-to-excel",
  jaTitle: "ParquetをExcelに変換【無料・ブラウザ完結】オンラインツール",
  jaDescription:
    "ParquetファイルをExcel（.xlsx）に変換できる無料オンラインツールです。AWS・BigQuery・Sparkのデータ確認をブラウザだけで進められます。",
  enTitle: "Parquet to Excel Converter Free Online",
  enDescription:
    "Convert Parquet files to Excel (.xlsx) online for free. Useful for AWS, BigQuery, Spark, and data review workflows in your browser.",
});

export default function Page() {
  return <ParquetToExcelTool locale="en" />;
}
