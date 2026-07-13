import AvifToWebpTool from "@/src/components/AvifToWebpTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "avif-to-webp",
  jaTitle: "AVIFをWebPに変換【無料・複数画像対応】",
  jaDescription: "AVIF画像をWebPへブラウザ内で変換できる無料ツールです。複数ファイルの一括変換とZIPダウンロードに対応します。",
  enTitle: "AVIF to WebP Converter Online Free",
  enDescription: "Convert AVIF images to WebP online for free. Batch conversion, transparent image support, and ZIP download run entirely in your browser.",
});

export default function Page() {
  return <AvifToWebpTool locale="en" />;
}
