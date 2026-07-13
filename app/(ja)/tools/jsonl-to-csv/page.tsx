import JsonlToCsvTool from "@/src/components/JsonlToCsvTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "jsonl-to-csv",
  jaTitle: "JSONL・NDJSONをCSVに変換【無料・ブラウザ完結】",
  jaDescription: "1行1JSONのJSONL・NDJSONをCSVへ変換し、ネストした値を列へ展開できる無料ツールです。ログやAIデータセットの確認に使えます。",
  enTitle: "JSONL to CSV Converter - NDJSON Online Free",
  enDescription: "Convert JSONL and NDJSON to CSV online. Flatten nested objects into columns for logs, API exports, and AI datasets without uploading files.",
});

export default function Page() {
  return <JsonlToCsvTool locale="ja" />;
}
