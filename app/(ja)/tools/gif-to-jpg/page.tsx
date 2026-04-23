import GifToJpgTool from "@/src/components/GifToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "gif-to-jpg",
  jaTitle: "GIFをJPGに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "GIF画像をJPG形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  enTitle: "GIF to JPG Converter Free Online",
  enDescription:
    "Convert GIF to JPG online for free. No upload required, fast, secure, and easy to use in your browser.",
});

export default function Page() {
  return <GifToJpgTool locale="ja" />;
}
