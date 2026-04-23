import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { siteUrl } from "@/src/lib/site";

const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;

const siteTitle = "AI Image Tools";
const siteDescription =
  "画像変換、圧縮、PDF 変換をブラウザでまとめて使えるオンラインツール集です。画像形式の違い、容量調整、提出前のPDF整理まで、よくある作業を分かりやすくまとめています。";

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
    "オンラインツール",
    "AI Image Tools",
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
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <Script
          id="adsbygoogle-loader"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9678380581323736"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {children}
      </body>
    </html>
  );
}
