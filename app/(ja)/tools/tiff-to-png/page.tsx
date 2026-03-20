import TiffToPngTool from "@/src/components/TiffToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "tiff-to-png",
  jaTitle: "TIFFをPNGに変換【無料】",
  jaDescription: "TIFF画像をPNG形式に変換できます。",
  enTitle: "TIFF to PNG Converter Free Online",
  enDescription: "Convert TIFF to PNG online.",
});

export default function Page() {
  return <TiffToPngTool locale="ja" />;
}
