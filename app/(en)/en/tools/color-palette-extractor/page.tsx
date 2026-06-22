import ColorPaletteExtractorTool from "@/src/components/ColorPaletteExtractorTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "color-palette-extractor",
  jaTitle: "画像カラーパレット抽出ツール【無料】HEX・RGB・CSS変数",
  jaDescription:
    "画像から主要な色を抽出し、HEX・RGB・CSS変数として取得できる無料ツール。アップロード不要・ブラウザ完結。配色決めやデザインの参考に。",
  enTitle: "Image Color Palette Extractor Free Online",
  enDescription:
    "Extract dominant colors from an image as HEX, RGB, and CSS variables. Free, no upload required, runs in your browser.",
});

export default function Page() {
  return <ColorPaletteExtractorTool locale="en" />;
}
