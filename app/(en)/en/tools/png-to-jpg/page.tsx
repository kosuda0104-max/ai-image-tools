import PngToJpgTool from "@/src/components/PngToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "png-to-jpg",
  jaTitle: "PNGをJPGに変換【無料・登録不要・ブラウザ完結】オンラインツール",
  jaDescription:
    "PNG画像をJPG形式に無料で変換できるオンラインツール。登録・インストール不要、画像はブラウザ内で処理され外部サーバーに送信されません。スマホ対応。透過部分の扱いやJPGとの使い分けも解説しています。",
  enTitle: "PNG to JPG Converter Free Online",
  enDescription:
    "Convert PNG to JPG online for free. No signup or install — everything runs in your browser, so your image never leaves your device. Works on mobile too.",
});

export default function Page() {
  return <PngToJpgTool locale="en" />;
}
