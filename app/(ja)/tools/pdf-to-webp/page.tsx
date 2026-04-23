import PdfToWebpTool from "@/src/components/PdfToWebpTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "pdf-to-webp",
  jaTitle: "PDFをWebPに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "PDFの各ページをブラウザ上でWebP画像に変換できる無料オンラインツールです。アップロード不要で安全に処理できます。",
  enTitle: "PDF to WebP Converter Free Online",
  enDescription:
    "Convert PDF pages to WebP images online for free. Everything runs directly in your browser with no upload required.",
});

export default function Page() {
  return <PdfToWebpTool locale="ja" />;
}
