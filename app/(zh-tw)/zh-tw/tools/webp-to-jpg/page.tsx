import WebpToJpgTool from "@/src/components/WebpToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "zh-TW",
  slug: "webp-to-jpg",
  jaTitle: "WebPをJPGに変換",
  jaDescription: "WebP画像をJPGへ変換します。",
  enTitle: "WebP to JPG Converter",
  enDescription: "Convert WebP images to JPG in your browser.",
  zhTwTitle: "WebP 轉 JPG｜免費批次圖片轉換",
  zhTwDescription: "免費在瀏覽器內將 WebP 圖片批次轉成 JPG，適合舊版軟體與只接受 JPG 的上傳表單。",
});

export default function Page() {
  return <WebpToJpgTool locale="zh-TW" />;
}
