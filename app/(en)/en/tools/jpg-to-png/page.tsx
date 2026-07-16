import JpgToPngTool from "@/src/components/JpgToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "jpg-to-png",
  jaTitle: "JPGをPNGに一括変換【無料・アップロード不要】",
  jaDescription:
    "JPG画像をPNGにまとめて変換できる無料オンラインツールです。ファイルはサーバーに送信されず、ブラウザ内で処理。複数ファイルの一括変換とZIP保存に対応しています。",
  enTitle: "JPG to PNG Converter – Free, Batch, No Upload",
  enDescription:
    "Convert JPG to PNG online for free. Files never leave your browser. Batch conversion with ZIP download supported.",
});

export default function Page() {
  return <JpgToPngTool locale="en" />;
}
