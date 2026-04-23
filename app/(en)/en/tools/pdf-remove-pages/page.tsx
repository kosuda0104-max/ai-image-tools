import PdfRemovePagesTool from "@/src/components/PdfRemovePagesTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "pdf-remove-pages",
  jaTitle: "PDFページ削除ツール【無料・高速・安全】オンラインツール",
  jaDescription:
    "PDFから不要なページを削除して新しいPDFを作成できる無料オンラインツールです。ブラウザ上で安全に処理できます。",
  enTitle: "PDF Remove Pages Tool Free Online",
  enDescription:
    "Remove unwanted pages from a PDF and create a new PDF online for free. Everything runs directly in your browser.",
});

export default function Page() {
  return <PdfRemovePagesTool locale="en" />;
}
