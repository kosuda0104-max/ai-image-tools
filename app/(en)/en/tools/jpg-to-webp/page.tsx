import JpgToWebpTool from "@/src/components/JpgToWebpTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "jpg-to-webp",
  jaTitle: "JPGをWebPに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "JPG画像をWebP形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  enTitle: "JPG to WebP Converter Free Online",
  enDescription:
    "Convert JPG to WebP online for free. No upload required, fast, secure, and easy to use in your browser.",
});

export default function Page() {
  return <JpgToWebpTool locale="en" />;
}
