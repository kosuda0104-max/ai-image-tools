import WebpToPngTool from "@/src/components/WebpToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "webp-to-png",
  jaTitle: "WebPをPNGに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "WebP画像をPNG形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  enTitle: "WebP to PNG Converter Free Online",
  enDescription:
    "Convert WebP to PNG online for free. No upload required, fast, secure, and easy to use in your browser.",
});

export default function Page() {
  return <WebpToPngTool locale="en" />;
}
