import HeicToPngTool from "@/src/components/HeicToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "heic-to-png",
  jaTitle: "HEICをPNGに変換【無料・安全】",
  jaDescription:
    "HEIC画像をPNG形式へ変換できる無料オンラインツール。アップロード不要でブラウザ上だけで使えます。",
  enTitle: "HEIC to PNG Converter Free Online",
  enDescription:
    "Convert HEIC images to PNG online for free. No upload required and easy to use in your browser.",
});

export default function Page() {
  return <HeicToPngTool locale="en" />;
}
