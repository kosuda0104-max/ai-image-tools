import ImageToPdfTool from "@/src/components/ImageToPdfTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "image-to-pdf",
  jaTitle: "画像をPDFに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "複数の画像を1つのPDFに変換できる無料オンラインツールです。順番変更やページサイズ設定にも対応しています。",
  enTitle: "Image to PDF Converter Free Online",
  enDescription:
    "Convert multiple images into one PDF online for free. Reorder images, choose page size, and process everything directly in your browser.",
});

export default function Page() {
  return <ImageToPdfTool locale="en" />;
}
