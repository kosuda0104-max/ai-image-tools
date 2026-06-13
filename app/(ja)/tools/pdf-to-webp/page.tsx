import PdfToWebpTool from "@/src/components/PdfToWebpTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "pdf-to-webp",
  jaTitle: "PDFをWebPに変換 - ブラウザだけで使える無料ツール",
  jaDescription:
    "PDFの各ページをWebP画像に変換できる無料オンラインツールです。アップロード不要でブラウザだけで処理でき、軽い画像として保存できます。",
  enTitle: "PDF to WebP Converter - Convert PDF Pages in Your Browser",
  enDescription:
    "Convert PDF pages to WebP images directly in your browser for free. No upload required, useful for lightweight previews and web publishing.",
});

export default function Page() {
  return <PdfToWebpTool locale="ja" />;
}
