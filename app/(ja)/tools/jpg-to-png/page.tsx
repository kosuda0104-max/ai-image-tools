import JpgToPngTool from "@/src/components/JpgToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "jpg-to-png",
  jaTitle: "JPGをPNGに変換【無料・登録不要・ブラウザ完結】オンラインツール",
  jaDescription:
    "JPG画像をPNG形式に無料で変換できるオンラインツール。登録・インストール不要、画像はブラウザ内で処理され外部サーバーに送信されません。スマホ対応。透過やPNGの使いどころもページ内で解説しています。",
  enTitle: "JPG to PNG Converter Free Online",
  enDescription:
    "Convert JPG to PNG online for free. No signup or install — everything runs in your browser, so your image never leaves your device. Works on mobile too.",
});

export default function Page() {
  return <JpgToPngTool locale="ja" />;
}
