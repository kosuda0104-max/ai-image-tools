import SocialImageResizeTool from "@/src/components/SocialImageResizeTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "social-image-resize",
  jaTitle: "SNS画像リサイズツール【無料】X・Instagram・YouTube対応",
  jaDescription:
    "X・Instagram・YouTube・LINE・note・Qiita の推奨サイズに画像をワンクリックでリサイズできる無料ツール。アップロード不要・ブラウザ完結。縦横比を保って切り抜き／余白調整。",
  enTitle: "Social Media Image Resizer Free Online",
  enDescription:
    "Resize images to the recommended size for X, Instagram, YouTube, LINE, note, and Qiita with one click. No upload required, runs in your browser.",
});

export default function Page() {
  return <SocialImageResizeTool locale="ja" />;
}
