import AvifToPngTool from "@/src/components/AvifToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "avif-to-png",
  jaTitle: "AVIFをPNGに変換 - ブラウザだけで使える無料ツール",
  jaDescription:
    "AVIF画像をPNGに変換できる無料オンラインツールです。アップロード不要でブラウザだけで処理でき、編集しやすいPNG画像を作れます。",
  enTitle: "AVIF to PNG Converter - Convert AVIF Images in Your Browser",
  enDescription:
    "Convert AVIF images to PNG directly in your browser for free. No upload required, useful when you need editable PNG output online.",
});

export default function Page() {
  return <AvifToPngTool locale="ja" />;
}
