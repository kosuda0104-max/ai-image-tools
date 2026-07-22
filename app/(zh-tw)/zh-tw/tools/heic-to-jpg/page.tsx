import HeicToJpgTool from "@/src/components/HeicToJpgTool";
import { createToolMetadata } from "@/src/lib/tool-metadata";

export const metadata = createToolMetadata({
  locale: "zh-TW",
  slug: "heic-to-jpg",
  jaTitle: "HEICをJPGに変換",
  jaDescription: "iPhoneのHEIC写真をJPGへ変換します。",
  enTitle: "HEIC to JPG Converter",
  enDescription: "Convert iPhone HEIC photos to JPG in your browser.",
  zhTwTitle: "HEIC 轉 JPG｜iPhone 照片免費轉換",
  zhTwDescription: "免費在瀏覽器內將 iPhone HEIC、HEIF 照片批次轉成 JPG，不需上傳圖片。",
});

export default function Page() {
  return <HeicToJpgTool locale="zh-TW" />;
}
