import ParquetViewerTool from "@/src/components/ParquetViewerTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "parquet-viewer",
  jaTitle: "Parquetビューアー｜スキーマ・中身を確認【無料】",
  jaDescription: "Parquetファイルの列名、型、行数、行グループ、圧縮方式と先頭20行をブラウザで確認できる無料ビューアーです。",
  enTitle: "Parquet Viewer & Schema Inspector Online",
  enDescription: "Inspect Parquet schema, data types, row groups, compression codecs, row count, and sample rows online without uploading your file.",
});

export default function Page() {
  return <ParquetViewerTool locale="en" />;
}
