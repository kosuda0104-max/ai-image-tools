import IcoToJpgTool from "@/src/components/IcoToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "ico-to-jpg",
  jaTitle: "ICOをJPGに変換【無料・登録不要・ブラウザ完結】オンラインツール",
  jaDescription:
    "ICO（アイコン）画像をJPG形式に無料で変換できるオンラインツール。登録・インストール不要、画像はブラウザ内で処理され外部サーバーに送信されません。透明部分は白背景に変換。スマホ対応。",
  enTitle: "ICO to JPG Converter Free Online – No Upload, No Signup",
  enDescription:
    "Convert ICO icon files to JPG online for free. No signup or upload — the conversion runs entirely in your browser, so your file never leaves your device. Transparent areas become a white background. Works on mobile.",
});

export default function Page() {
  return <IcoToJpgTool locale="ja" />;
}
