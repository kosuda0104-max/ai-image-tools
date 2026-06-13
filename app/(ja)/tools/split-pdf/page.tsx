import SplitPdfTool from "@/src/components/SplitPdfTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "split-pdf",
  jaTitle: "PDF分割無料ツール - ブラウザだけでページを抽出",
  jaDescription:
    "PDFから必要なページだけを抽出して分割できる無料オンラインツールです。アップロード不要でブラウザだけで処理でき、新しいPDFを作成できます。",
  enTitle: "Split PDF Online - Extract PDF Pages in Your Browser",
  enDescription:
    "Split PDF files and extract selected pages directly in your browser for free. No upload required, create a new PDF from only the pages you need.",
});

export default function Page() {
  return <SplitPdfTool locale="ja" />;
}
