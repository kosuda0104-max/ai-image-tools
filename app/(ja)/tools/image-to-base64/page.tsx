import ImageToBase64Tool from "@/src/components/ImageToBase64Tool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "image-to-base64",
  jaTitle: "画像をBase64に変換【無料・ブラウザ完結】オンラインツール",
  jaDescription:
    "画像ファイルをブラウザ上でBase64文字列に変換できる無料オンラインツールです。アップロード不要・安全。HTML・CSS・APIへのインライン埋め込みに。",
  enTitle: "Image to Base64 Converter Free Online",
  enDescription:
    "Convert image files to Base64 strings online for free. No upload required, runs in your browser. Embed images inline in HTML, CSS, JSON, or API payloads.",
});

export default function Page() {
  return <ImageToBase64Tool locale="ja" />;
}
