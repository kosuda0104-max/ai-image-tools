import BmpToPngTool from "@/src/components/BmpToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "bmp-to-png",
  jaTitle: "BMPをPNGに変換【無料・画質劣化なし・アップロード不要】",
  jaDescription:
    "容量が大きいBMP画像を、画質を劣化させずPNGへ無料変換。複数画像をブラウザ内で処理でき、ファイルは外部サーバーへ送信されません。",
  enTitle: "BMP to PNG Converter – Lossless, Free, No Upload",
  enDescription:
    "Convert large BMP images to lossless PNG files in your browser for free. Batch conversion with no upload required.",
});

export default function Page() {
  return <BmpToPngTool locale="en" />;
}
