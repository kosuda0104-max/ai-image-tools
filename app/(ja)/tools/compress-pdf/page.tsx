import CompressPdfTool from "@/src/components/CompressPdfTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "compress-pdf",
  jaTitle: "PDF圧縮ツール【無料・高速・安全】オンラインツール",
  jaDescription:
    "PDFを軽量化して新しいPDFとして保存できる無料オンラインツールです。ブラウザ上で安全に処理できます。",
  enTitle: "Compress PDF Tool Free Online",
  enDescription:
    "Reduce PDF file size and save it as a new PDF online for free. Everything runs directly in your browser.",
});

export default function Page() {
  return <CompressPdfTool locale="ja" />;
}
