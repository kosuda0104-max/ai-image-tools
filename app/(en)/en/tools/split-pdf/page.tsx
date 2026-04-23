import SplitPdfTool from "@/src/components/SplitPdfTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "split-pdf",
  jaTitle: "PDF分割ツール【無料・高速・安全】オンラインツール",
  jaDescription:
    "PDFから必要なページだけを抽出して新しいPDFを作成できる無料オンラインツールです。ブラウザ上で安全に処理できます。",
  enTitle: "Split PDF Tool Free Online",
  enDescription:
    "Extract selected pages from a PDF and create a new PDF online for free. Everything runs directly in your browser.",
});

export default function Page() {
  return <SplitPdfTool locale="en" />;
}
