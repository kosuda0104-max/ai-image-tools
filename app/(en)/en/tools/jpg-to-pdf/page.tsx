import ImageToPdfTool from "@/src/components/ImageToPdfTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "jpg-to-pdf",
  jaTitle: "JPGをPDFに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "複数の JPG 画像を 1 つの PDF に変換できる無料オンラインツールです。順番変更やページサイズ設定にも対応しています。",
  enTitle: "JPG to PDF Converter Free Online",
  enDescription:
    "Convert JPG images into one PDF online for free. Reorder pages, choose page size, and process everything directly in your browser.",
});

export default function Page() {
  return <ImageToPdfTool locale="en" />;
}
