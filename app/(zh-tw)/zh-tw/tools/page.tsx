import ZhTwToolDirectory from "@/src/components/ZhTwToolDirectory";
import { getAllToolItems } from "@/src/data/tool-directory";
import { createLocalizedPageMetadata } from "@/src/lib/localized-page-metadata";

const count = getAllToolItems("zh-TW").length;

export const metadata = createLocalizedPageMetadata({
  locale: "zh-TW",
  title: `繁體中文工具列表｜${count} 項免費檔案轉換工具`,
  description: `提供 ${count} 項完整繁體中文工具，包括 CSV 亂碼修復、Parquet、AWS 資料與圖片轉換。`,
  jaPath: "/tools",
  enPath: "/en/tools",
  zhTwPath: "/zh-tw/tools",
});

export default function Page() {
  return <ZhTwToolDirectory />;
}
