import CsvToParquetTool from "@/src/components/CsvToParquetTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "csv-to-parquet",
  jaTitle: "CSVをParquetに変換【無料・ブラウザ完結】オンラインツール",
  jaDescription:
    "CSVファイルをブラウザ上でParquetに変換できる無料オンラインツールです。アップロード不要・安全。AWS S3・BigQuery・Sparkへのデータ取り込みに。",
  enTitle: "CSV to Parquet Converter Free Online",
  enDescription:
    "Convert CSV files to Parquet online for free. No upload required, runs in your browser. Ideal for AWS S3, BigQuery, and Spark data workflows.",
});

export default function Page() {
  return <CsvToParquetTool locale="en" />;
}
