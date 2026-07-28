import type { Metadata } from "next";
import SiteHeader from "@/src/components/SiteHeader";
import SiteFooter from "@/src/components/SiteFooter";
import CookieBanner from "@/src/components/CookieBanner";
import LangAttribute from "@/src/components/LangAttribute";
import { siteUrl, socialImagePath } from "@/src/lib/site";

const description =
  "免費的圖片、CSV、Parquet 與 AWS 資料轉換工具。檔案只在瀏覽器內處理，不會上傳到外部伺服器。";
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Filewisp 繁體中文",
  url: `${siteUrl}/zh-tw`,
  inLanguage: "zh-TW",
  description,
};

export const metadata: Metadata = {
  description,
  openGraph: {
    title: "Filewisp 繁體中文",
    description,
    url: `${siteUrl}/zh-tw`,
    siteName: "Filewisp",
    locale: "zh_TW",
    type: "website",
    images: [{ url: socialImagePath, width: 1200, height: 630, alt: "Filewisp" }],
  },
};

export default function ZhTwLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <LangAttribute lang="zh-Hant-TW" />
      <SiteHeader locale="zh-TW" />
      <div className="min-h-screen">{children}</div>
      <SiteFooter locale="zh-TW" />
      <CookieBanner locale="zh-TW" />
    </>
  );
}
