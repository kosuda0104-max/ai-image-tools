import BmpToJpgTool from "@/src/components/BmpToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "bmp-to-jpg",
  jaTitle: "BMPをJPGに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "BMP画像をJPG形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  enTitle: "BMP to JPG Converter Free Online",
  enDescription:
    "Convert BMP to JPG online for free. No upload required, fast, secure, and easy to use in your browser.",
});

export default function Page() {
  return <BmpToJpgTool locale="ja" />;
}
