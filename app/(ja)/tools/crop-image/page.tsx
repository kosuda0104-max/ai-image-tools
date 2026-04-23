import CropImageTool from "@/src/components/CropImageTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "crop-image",
  jaTitle: "画像切り抜きツール【無料・高速・安全】オンラインツール",
  jaDescription:
    "JPG・PNG・WebP画像をブラウザ上で切り抜きできる無料オンラインツールです。ドラッグ範囲指定、比率固定、円形トリミングに対応しています。",
  enTitle: "Crop Image Tool Free Online",
  enDescription:
    "Crop JPG, PNG, and WebP images online for free. Drag to select an area, lock aspect ratio, and create circular crops directly in your browser.",
});

export default function Page() {
  return <CropImageTool locale="ja" />;
}
