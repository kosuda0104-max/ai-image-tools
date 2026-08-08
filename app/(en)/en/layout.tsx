import type { Metadata } from "next";
import "../../globals.css";
import AdSenseLoader from "@/components/AdSenseLoader";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import SiteHeader from "@/src/components/SiteHeader";
import SiteFooter from "@/src/components/SiteFooter";
import CookieBanner from "@/src/components/CookieBanner";
import { TOOL_COUNT } from "@/src/data/tool-directory";
import { siteUrl, socialImagePath } from "@/src/lib/site";

const siteDescription =
  `Free online tools for image, PDF, CSV, Parquet, and AWS data workflows. Convert files and inspect exports in your browser with ${TOOL_COUNT} tools and no upload to a server.`;
const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Filewisp",
  alternateName: ["ai-image-tools.com"],
  url: `${siteUrl}/en`,
  inLanguage: "en",
  description: siteDescription,
  publisher: {
    "@type": "Organization",
    name: "Filewisp",
    url: siteUrl,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Filewisp",
  title: {
    default: "Filewisp",
    template: "%s | Filewisp",
  },
  description: siteDescription,
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
  alternates: {
    languages: {
      ja: "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Filewisp",
    description: siteDescription,
    url: `${siteUrl}/en`,
    siteName: "Filewisp",
    images: [
      {
        url: socialImagePath,
        width: 1200,
        height: 630,
        alt: "Filewisp",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filewisp",
    description: siteDescription,
    images: [socialImagePath],
  },
};

export default function EnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <AdSenseLoader />
        <ServiceWorkerRegister />
        <SiteHeader locale="en" />
        <div className="min-h-screen">{children}</div>
        <SiteFooter locale="en" />
        <CookieBanner locale="en" />
      </body>
    </html>
  );
}
