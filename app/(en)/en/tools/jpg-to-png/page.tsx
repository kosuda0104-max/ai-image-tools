import JpgToPngTool from "@/src/components/JpgToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "jpg-to-png",
  jaTitle: "JPGをPNGに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "JPG画像をPNG形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  enTitle: "JPG to PNG Converter Free Online",
  enDescription:
    "Convert JPG to PNG online for free. No upload required, fast, secure, and easy to use in your browser.",
});

export default function Page() {
  return <JpgToPngTool locale="en" />;
}
