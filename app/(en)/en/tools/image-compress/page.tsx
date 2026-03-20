import ImageCompressTool from "@/src/components/ImageCompressTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "image-compress",
  jaTitle: "画像圧縮ツール【無料・高速・安全】オンラインツール",
  jaDescription:
    "JPG・PNG・WebP画像をブラウザ上で圧縮できる無料オンラインツールです。アップロード不要・高速・安全に軽量化できます。",
  enTitle: "Image Compressor Free Online",
  enDescription:
    "Compress JPG, PNG, and WebP images online for free. No upload required, fast, secure, and easy to use in your browser.",
});

export default function Page() {
  return <ImageCompressTool locale="en" />;
}
