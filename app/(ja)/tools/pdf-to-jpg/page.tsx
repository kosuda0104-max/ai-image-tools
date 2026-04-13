import PdfToJpgTool from "@/src/components/PdfToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "pdf-to-jpg",
  jaTitle: "PDFをJPGに変換【ページを画像化】",
  jaDescription:
    "PDFのページをJPG画像に変換できる無料オンラインツールです。資料の一部を画像で共有したいときや、サムネイル化したいときに役立ちます。",
  enTitle: "PDF to JPG Converter Free Online",
  enDescription:
    "Convert PDF pages to JPG images online for free. Everything runs directly in your browser with no upload required.",
});

export default function Page() {
  return <PdfToJpgTool locale="ja" />;
}
