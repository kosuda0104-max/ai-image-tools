import PngToJpgTool from "@/src/components/PngToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "png-to-jpg",
  jaTitle: "PNGをJPGに一括変換【無料・アップロード不要】",
  jaDescription:
    "PNG画像をJPGにまとめて変換できる無料オンラインツールです。ファイルはサーバーに送信されず、ブラウザ内で処理。複数ファイルの一括変換とZIP保存に対応しています。",
  enTitle: "PNG to JPG Converter – Free, Batch, No Upload",
  enDescription:
    "Convert PNG to JPG online for free. Files never leave your browser. Batch conversion with ZIP download supported.",
});

export default function Page() {
  return <PngToJpgTool locale="ja" />;
}
