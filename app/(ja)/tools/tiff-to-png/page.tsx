import TiffToPngTool from "@/src/components/TiffToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "tiff-to-png",
  jaTitle: "TIFF（TIF）をPNGに変換【無料・アップロード不要】",
  jaDescription:
    "TIFF・TIF画像の先頭ページをPNGへ無料変換。スキャン、図面、文字入り画像をブラウザ内で処理し、ファイルはサーバーへ送信されません。",
  enTitle: "TIFF to PNG Converter – Free, No Upload",
  enDescription:
    "Convert the first page of a TIFF or TIF image to PNG in your browser for free. No upload or software installation required.",
});

export default function Page() {
  return <TiffToPngTool locale="ja" />;
}
