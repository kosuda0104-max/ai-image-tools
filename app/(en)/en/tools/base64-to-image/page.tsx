import Base64ToImageTool from "@/src/components/Base64ToImageTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "base64-to-image",
  jaTitle: "Base64を画像に変換【無料・ブラウザ完結】オンラインツール",
  jaDescription:
    "Base64文字列やdata URLをPNG・JPG・WebPなどの画像ファイルに戻せる無料オンラインツールです。ブラウザ内で処理され、アップロード不要です。",
  enTitle: "Base64 to Image Converter Free Online",
  enDescription:
    "Convert Base64 strings and data URLs back into image files such as PNG, JPG, and WebP. Runs in your browser with no upload required.",
});

export default function Page() {
  return <Base64ToImageTool locale="en" />;
}
