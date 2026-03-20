import TiffToJpgTool from "@/src/components/TiffToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "tiff-to-jpg",
  jaTitle: "TIFFをJPGに変換【無料】",
  jaDescription: "TIFF画像をJPG形式に変換できます。",
  enTitle: "TIFF to JPG Converter Free Online",
  enDescription: "Convert TIFF to JPG online.",
});

export default function Page() {
  return <TiffToJpgTool locale="ja" />;
}
