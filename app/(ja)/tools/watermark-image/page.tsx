import WatermarkImageTool from "@/src/components/WatermarkImageTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "watermark-image",
  jaTitle: "画像透かし追加ツール【無料・高速・安全】オンラインツール",
  jaDescription:
    "JPG・PNG・WebP画像に文字の透かしを追加できる無料オンラインツールです。文字サイズ、透明度、色、位置を調整できます。",
  enTitle: "Watermark Image Tool Free Online",
  enDescription:
    "Add text watermarks to JPG, PNG, and WebP images online for free. Adjust font size, opacity, color, and position directly in your browser.",
});

export default function Page() {
  return <WatermarkImageTool locale="ja" />;
}
