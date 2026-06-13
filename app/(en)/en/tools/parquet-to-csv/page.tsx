import ParquetToCsvTool from "@/src/components/ParquetToCsvTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "parquet-to-csv",
  jaTitle: "ParquetをCSVに変換 - ブラウザだけで使える無料ツール",
  jaDescription:
    "ParquetファイルをCSVに変換できる無料オンラインツールです。アップロード不要でブラウザだけで処理でき、AWS・BigQuery・Sparkのデータ確認に使えます。",
  enTitle: "Parquet to CSV Converter - Convert Parquet Files in Your Browser",
  enDescription:
    "Convert Parquet files to CSV directly in your browser for free. No upload required, ideal for AWS, BigQuery, Spark, and data inspection workflows.",
});

export default function Page() {
  return <ParquetToCsvTool locale="en" />;
}
