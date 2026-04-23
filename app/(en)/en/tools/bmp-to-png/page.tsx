import BmpToPngTool from "@/src/components/BmpToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "bmp-to-png",
  jaTitle: "BMPをPNGに変換【無料・高速・安全】オンラインツール",
  jaDescription:
    "BMP画像をPNG形式に変換できる無料オンラインツールです。アップロード不要・高速・安全。ブラウザだけで簡単に変換できます。",
  enTitle: "BMP to PNG Converter Free Online",
  enDescription:
    "Convert BMP to PNG online for free. No upload required, fast, secure, and easy to use in your browser.",
});

export default function Page() {
  return <BmpToPngTool locale="en" />;
}
