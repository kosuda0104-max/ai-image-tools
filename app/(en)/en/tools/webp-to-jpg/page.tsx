import WebpToJpgTool from "@/src/components/WebpToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "webp-to-jpg",
  jaTitle: "WebPをJPGに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "WebP画像をJPG形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  enTitle: "WebP to JPG Converter Free Online",
  enDescription:
    "Convert WebP to JPG online for free. No upload required, fast, secure, and easy to use in your browser.",
});

export default function Page() {
  return <WebpToJpgTool locale="en" />;
}
