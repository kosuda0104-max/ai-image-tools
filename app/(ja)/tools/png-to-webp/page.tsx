import PngToWebpTool from "@/src/components/PngToWebpTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "png-to-webp",
  jaTitle: "PNGをWebPに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "PNG画像をWebP形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  enTitle: "PNG to WebP Converter Free Online",
  enDescription:
    "Convert PNG to WebP online for free. No upload required, fast, secure, and easy to use in your browser.",
});

export default function Page() {
  return <PngToWebpTool locale="ja" />;
}
