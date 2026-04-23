import PngToJpgTool from "@/src/components/PngToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "png-to-jpg",
  jaTitle: "PNGをJPGに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "PNG画像をJPG形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  enTitle: "PNG to JPG Converter Free Online",
  enDescription:
    "Convert PNG to JPG online for free. No upload required, fast, secure, and easy to use in your browser.",
});

export default function Page() {
  return <PngToJpgTool locale="ja" />;
}
