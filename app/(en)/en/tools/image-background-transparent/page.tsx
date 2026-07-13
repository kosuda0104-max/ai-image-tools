import ImageBackgroundTransparentTool from "@/src/components/ImageBackgroundTransparentTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "en",
  slug: "image-background-transparent",
  jaTitle: "画像背景透過｜JPG・PNGの背景を透明化【無料】",
  jaDescription: "JPG・PNG・WebPの白背景や単色背景をクリックして透明化し、透過PNGとして保存できる無料ツールです。画像はアップロードされません。",
  enTitle: "Make Image Background Transparent Online Free",
  enDescription: "Remove a solid background from JPG, PNG, and WebP images and export a transparent PNG. Connected-edge removal runs locally in your browser.",
});

export default function Page() {
  return <ImageBackgroundTransparentTool locale="en" />;
}
