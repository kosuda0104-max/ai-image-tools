import ImageCompressTool from "@/src/components/ImageCompressTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "image-compress",
  jaTitle: "画像圧縮ブラウザツール - JPG・PNG・WebPを無料で軽量化",
  jaDescription:
    "JPG・PNG・WebP画像をブラウザだけで圧縮できる無料オンラインツールです。アップロード不要で、Web掲載・メール添付・フォーム送信前に軽量化できます。",
  enTitle: "Image Compressor - Compress JPG, PNG, and WebP in Your Browser",
  enDescription:
    "Compress JPG, PNG, and WebP images directly in your browser for free. No upload required, useful before publishing, emailing, or uploading images.",
});

export default function Page() {
  return <ImageCompressTool locale="en" />;
}
