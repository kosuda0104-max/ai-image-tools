import FaviconGeneratorTool from "@/src/components/FaviconGeneratorTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "favicon-generator",
  jaTitle: "PNGからfavicon.ico作成ツール【無料・ブラウザ完結】",
  jaDescription:
    "PNG・JPG画像から favicon.ico（16・32・48px内包）と各種PNGアイコンをブラウザ上で一括生成できる無料ツールです。アップロード不要、HTML埋め込みコードも出力。",
  enTitle: "PNG to favicon.ico Generator Free Online",
  enDescription:
    "Generate a multi-size favicon.ico and PNG icons from a PNG or JPG image online for free. No upload required, with a ready-to-paste HTML snippet.",
});

export default function Page() {
  return <FaviconGeneratorTool locale="ja" />;
}
