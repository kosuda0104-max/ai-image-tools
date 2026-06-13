import MergePdfTool from "@/src/components/MergePdfTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "merge-pdf",
  jaTitle: "PDF結合ブラウザツール - 複数PDFを無料で1つにまとめる",
  jaDescription:
    "複数のPDFファイルを1つに結合できる無料オンラインツールです。アップロード不要でブラウザだけで処理でき、資料や請求書をまとめられます。",
  enTitle: "Merge PDF Online - Combine PDF Files in Your Browser",
  enDescription:
    "Merge multiple PDF files into one PDF directly in your browser for free. No upload required, reorder files and combine documents online.",
});

export default function Page() {
  return <MergePdfTool locale="en" />;
}
