import ParquetToCsvTool from "@/src/components/ParquetToCsvTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "parquet-to-csv",
  jaTitle: "ParquetをCSVに変換【無料・ブラウザ完結】オンラインツール",
  jaDescription:
    "Parquetファイルをブラウザ上でCSVに変換できる無料オンラインツールです。アップロード不要・安全。AWS・BigQuery・Sparkのデータ作業に。",
  enTitle: "Parquet to CSV Converter Free Online",
  enDescription:
    "Convert Parquet files to CSV online for free. No upload required, runs in your browser. Great for AWS, BigQuery, and Spark workflows.",
});

export default function Page() {
  return <ParquetToCsvTool locale="en" />;
}
