import SvgToWebpTool from "@/src/components/SvgToWebpTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "svg-to-webp",
  jaTitle: "SVGをWebPに変換【無料・ブラウザ完結】オンラインツール",
  jaDescription:
    "SVG画像をWebP形式に変換できる無料オンラインツールです。Web掲載向けの軽い画像をブラウザだけで作成できます。",
  enTitle: "SVG to WebP Converter Free Online",
  enDescription:
    "Convert SVG images to WebP online for free. Create lightweight web-ready images in your browser without uploading files.",
});

export default function Page() {
  return <SvgToWebpTool locale="en" />;
}
