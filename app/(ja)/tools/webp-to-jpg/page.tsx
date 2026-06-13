import WebpToJpgTool from "@/src/components/WebpToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "webp-to-jpg",
  jaTitle: "WebPをJPGに変換 - ブラウザだけで使える無料ツール",
  jaDescription:
    "WebP画像をJPGに変換できる無料オンラインツールです。アップロード不要でブラウザだけで処理でき、共有しやすいJPGを作れます。",
  enTitle: "WebP to JPG Converter - Convert WebP Images in Your Browser",
  enDescription:
    "Convert WebP images to JPG directly in your browser for free. No upload required, fast, secure, and easy to use online.",
});

export default function Page() {
  return <WebpToJpgTool locale="ja" />;
}
