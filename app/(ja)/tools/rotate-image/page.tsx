import RotateImageTool from "@/src/components/RotateImageTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "rotate-image",
  jaTitle: "画像回転ツール【無料・高速・安全】オンラインツール",
  jaDescription:
    "JPG・PNG・WebP画像をブラウザ上で回転できる無料オンラインツールです。90度回転や任意角度回転に対応しています。",
  enTitle: "Rotate Image Tool Free Online",
  enDescription:
    "Rotate JPG, PNG, and WebP images online for free. Turn images by 90 degrees or any custom angle directly in your browser.",
});

export default function Page() {
  return <RotateImageTool locale="ja" />;
}
