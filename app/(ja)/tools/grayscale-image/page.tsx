import GrayscaleImageTool from "@/src/components/GrayscaleImageTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "ja",
  slug: "grayscale-image",
  jaTitle: "画像を白黒化【無料】",
  jaDescription: "画像をグレースケールの白黒画像に変換できます。",
  enTitle: "Grayscale Image Free Online",
  enDescription: "Convert an image to grayscale online.",
});

export default function Page() {
  return <GrayscaleImageTool locale="ja" />;
}
