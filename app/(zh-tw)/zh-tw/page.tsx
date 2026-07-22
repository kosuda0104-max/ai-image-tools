import type { Metadata } from "next";
import ZhTwToolDirectory from "@/src/components/ZhTwToolDirectory";

export const metadata: Metadata = {
  title: { absolute: "Filewisp 繁體中文｜免費圖片、CSV 與 AWS 轉換工具" },
  description: "免費在瀏覽器內轉換 HEIC、WebP、CSV、Parquet、DynamoDB JSON 與 CloudTrail 日誌，不需上傳檔案。",
  alternates: {
    canonical: "/zh-tw",
    languages: { ja: "/", en: "/en", "zh-TW": "/zh-tw", "x-default": "/" },
  },
};

export default function Page() {
  return <ZhTwToolDirectory home />;
}
