import SvgToJpgTool from "@/src/components/SvgToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "svg-to-jpg",
  jaTitle: "SVGをJPGに変換【無料】",
  jaDescription: "SVG画像をJPG形式に変換できます。",
  enTitle: "SVG to JPG Converter Free Online",
  enDescription: "Convert SVG to JPG online.",
});

export default function Page() {
  return <SvgToJpgTool locale="en" />;
}
