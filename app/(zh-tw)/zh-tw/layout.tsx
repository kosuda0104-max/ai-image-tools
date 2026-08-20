import type { Metadata } from "next";
import "../../globals.css";
import AdSenseLoader from "@/components/AdSenseLoader";
import Analytics from "@/components/Analytics";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import SiteHeader from "@/src/components/SiteHeader";
import SiteFooter from "@/src/components/SiteFooter";
import CookieBanner from "@/src/components/CookieBanner";
import { siteUrl, socialImagePath } from "@/src/lib/site";

const description =
  "免費的圖片、CSV、Parquet 與 AWS 資料轉換工具。檔案只在瀏覽器內處理，不會上傳到外部伺服器。";
const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Filewisp 繁體中文",
  url: `${siteUrl}/zh-tw`,
  inLanguage: "zh-TW",
  description,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Filewisp",
  title: {
    default: "Filewisp 繁體中文",
    template: "%s | Filewisp",
  },
  description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: googleVerification,
  },
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
    <html lang="zh-Hant-TW">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <AdSenseLoader />
        <Analytics />
        <ServiceWorkerRegister />
        <SiteHeader locale="zh-TW" />
        <div className="min-h-screen">{children}</div>
        <SiteFooter locale="zh-TW" />
        <CookieBanner locale="zh-TW" />
      </body>
    </html>
  );
}
