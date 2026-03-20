import PdfToPngTool from "@/src/components/PdfToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "pdf-to-png",
  jaTitle: "PDFをPNGに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "PDFの各ページをブラウザ上でPNG画像に変換できる無料オンラインツールです。アップロード不要で安全に処理できます。",
  enTitle: "PDF to PNG Converter Free Online",
  enDescription:
    "Convert PDF pages to PNG images online for free. Everything runs directly in your browser with no upload required.",
});

export default function Page() {
  return <PdfToPngTool locale="ja" />;
}
