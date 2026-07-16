import AvifToJpgTool from "@/src/components/AvifToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "avif-to-jpg",
  jaTitle: "AVIFをJPGに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "AVIF画像をJPG形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  enTitle: "AVIF to JPG Converter Free Online",
  enDescription:
    "Convert AVIF to JPG online for free. No upload required, fast, secure, and easy to use in your browser.",
});

export default function Page() {
  return <AvifToJpgTool locale="en" />;
}
