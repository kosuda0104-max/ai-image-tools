import MergePdfTool from "@/src/components/MergePdfTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "merge-pdf",
  jaTitle: "PDF結合ツール【複数PDFを1つにまとめる】",
  jaDescription:
    "複数のPDFファイルを1つに結合できる無料オンラインツールです。請求書、資料、配布物をまとめたいときにブラウザだけで手早く使えます。",
  enTitle: "Merge PDF Tool Free Online",
  enDescription:
    "Merge multiple PDF files into one PDF online for free. Reorder files before merging and process everything directly in your browser.",
});

export default function Page() {
  return <MergePdfTool locale="ja" />;
}
