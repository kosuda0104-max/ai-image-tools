import CsvToParquetTool from "@/src/components/CsvToParquetTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "csv-to-parquet",
  jaTitle: "CSVをParquetに変換 - ブラウザだけで使える無料ツール",
  jaDescription:
    "CSVファイルをParquetに変換できる無料オンラインツールです。アップロード不要でブラウザだけで処理でき、AWS S3・BigQuery・Sparkへの取り込み前に使えます。",
  enTitle: "CSV to Parquet Converter - Convert CSV Files in Your Browser",
  enDescription:
    "Convert CSV files to Parquet directly in your browser for free. No upload required, ideal for AWS S3, BigQuery, Spark, and data platform workflows.",
});

export default function Page() {
  return <CsvToParquetTool locale="ja" />;
}
