import GifToPngTool from "@/src/components/GifToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "gif-to-png",
  jaTitle: "GIFをPNGに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "GIF画像をPNG形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  enTitle: "GIF to PNG Converter Free Online",
  enDescription:
    "Convert GIF to PNG online for free. No upload required, fast, secure, and easy to use in your browser.",
});

export default function Page() {
  return <GifToPngTool locale="ja" />;
}
