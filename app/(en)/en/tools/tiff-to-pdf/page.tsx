import TiffToPdfTool from "@/src/components/TiffToPdfTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "tiff-to-pdf",
  jaTitle: "複数ページTIFFをPDFに変換【全ページ対応・無料】",
  jaDescription: "マルチページTIFF・TIFの全ページを元の順番で1つのPDFへ変換できる無料ツールです。スキャンやFAX画像をブラウザ内で処理します。",
  enTitle: "Multi-page TIFF to PDF Converter Online Free",
  enDescription: "Convert all pages in a multi-page TIFF or TIF file into one ordered PDF. Browser-based processing with no file upload required.",
});

export default function Page() {
  return <TiffToPdfTool locale="en" />;
}
