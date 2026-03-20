import SvgToPngTool from "@/src/components/SvgToPngTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "svg-to-png",
  jaTitle: "SVGをPNGに変換【無料】",
  jaDescription: "SVG画像をPNG形式に変換できます。",
  enTitle: "SVG to PNG Converter Free Online",
  enDescription: "Convert SVG to PNG online.",
});

export default function Page() {
  return <SvgToPngTool locale="ja" />;
}
