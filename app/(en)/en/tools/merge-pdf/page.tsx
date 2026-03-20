import MergePdfTool from "@/src/components/MergePdfTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "merge-pdf",
  jaTitle: "PDF結合ツール【無料・高速・安全】オンラインツール",
  jaDescription:
    "複数のPDFファイルを1つに結合できる無料オンラインツールです。順番変更にも対応し、ブラウザ上で安全に処理できます。",
  enTitle: "Merge PDF Tool Free Online",
  enDescription:
    "Merge multiple PDF files into one PDF online for free. Reorder files before merging and process everything directly in your browser.",
});

export default function Page() {
  return <MergePdfTool locale="en" />;
}
