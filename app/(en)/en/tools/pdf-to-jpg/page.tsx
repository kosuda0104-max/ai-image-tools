import PdfToJpgTool from "@/src/components/PdfToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "pdf-to-jpg",
  jaTitle: "PDFをJPGに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "PDFの各ページをブラウザ上でJPG画像に変換できる無料オンラインツールです。アップロード不要で安全に処理できます。",
  enTitle: "PDF to JPG Converter Free Online",
  enDescription:
    "Convert PDF pages to JPG images online for free. Everything runs directly in your browser with no upload required.",
});

export default function Page() {
  return <PdfToJpgTool locale="en" />;
}
