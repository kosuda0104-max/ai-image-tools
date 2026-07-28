import PngToWebpTool from "@/src/components/PngToWebpTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "png-to-webp",
  jaTitle: "PNGをWebPに変換【無料・透過対応・アップロード不要】",
  jaDescription:
    "PNG画像を透過対応のWebPへ無料変換。Web掲載用の容量を抑えたい画像をブラウザ内でまとめて処理でき、外部サーバーへ送信しません。",
  enTitle: "PNG to WebP Converter – Free, Transparent, No Upload",
  enDescription:
    "Convert PNG images to transparency-capable WebP files in your browser for free. Batch conversion with no upload required.",
});

export default function Page() {
  return <PngToWebpTool locale="en" />;
}
