import ImageCompressTool from "@/src/components/ImageCompressTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "image-compress",
  jaTitle: "画像圧縮ツール【JPG・PNG・WebP対応】",
  jaDescription:
    "JPG・PNG・WebP画像のファイルサイズをブラウザ上で軽くできる無料オンラインツールです。Web掲載、メール添付、アップロード前の最終調整に向いています。",
  enTitle: "Image Compressor Free Online",
  enDescription:
    "Compress JPG, PNG, and WebP images online for free. No upload required, fast, secure, and easy to use in your browser.",
});

export default function Page() {
  return <ImageCompressTool locale="ja" />;
}
