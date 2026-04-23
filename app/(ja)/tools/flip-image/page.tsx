import FlipImageTool from "@/src/components/FlipImageTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "flip-image",
  jaTitle: "画像反転ツール【無料・高速・安全】オンラインツール",
  jaDescription:
    "JPG・PNG・WebP画像を左右反転・上下反転できる無料オンラインツールです。ブラウザ上で安全に処理できます。",
  enTitle: "Flip Image Tool Free Online",
  enDescription:
    "Flip JPG, PNG, and WebP images horizontally or vertically online for free. Everything runs directly in your browser.",
});

export default function Page() {
  return <FlipImageTool locale="ja" />;
}
