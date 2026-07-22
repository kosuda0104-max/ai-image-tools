import type { Metadata } from "next";
import "./globals.css";
import AdSenseLoader from "@/components/AdSenseLoader";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import { TOOL_COUNT } from "@/src/data/tool-directory";
import { siteUrl } from "@/src/lib/site";

const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;

const siteTitle = "Filewisp";
const siteDescription =
  `画像・PDF、CSV・Parquet・AWSエクスポートの変換や確認をブラウザだけで行える無料ツール集。登録不要・ファイルはサーバーに送信されません。${TOOL_COUNT}種類のツールを提供しています。`;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteTitle,
  url: siteUrl,
  inLanguage: ["ja", "en"],
  description: siteDescription,
  publisher: {
    "@type": "Organization",
    name: siteTitle,
    url: siteUrl,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteTitle,
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description: siteDescription,
  keywords: [
    "画像変換",
    "画像圧縮",
    "PDF変換",
    "PDF圧縮",
    "JPG PNG 変換",
    "HEIC JPG 変換",
    "WebP 変換",
    "画像リサイズ",
    "CSV 文字化け 修正",
    "Parquet CSV 変換",
    "DynamoDB JSON 変換",
    "CloudTrail CSV 変換",
    "オンラインツール",
    "無料",
    "Filewisp",
  ],
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
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    locale: "ja_JP",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [`${siteUrl}/og.png`],
  },
  verification: {
    google: googleVerification,
  },
  alternates: {
    canonical: "/",
    languages: {
      ja: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <AdSenseLoader />
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
