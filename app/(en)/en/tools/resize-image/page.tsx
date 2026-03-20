import ResizeImageTool from "@/src/components/ResizeImageTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "resize-image",
  jaTitle: "画像リサイズツール【無料・高速・安全】オンラインツール",
  jaDescription:
    "JPG・PNG・WebP画像の幅と高さをブラウザ上で変更できる無料オンラインツールです。アップロード不要で安全にサイズ変更できます。",
  enTitle: "Resize Image Tool Free Online",
  enDescription:
    "Resize JPG, PNG, and WebP images online for free. Change width and height directly in your browser with no upload required.",
});

export default function Page() {
  return <ResizeImageTool locale="en" />;
}
