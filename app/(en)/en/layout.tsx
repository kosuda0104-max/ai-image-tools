import type { Metadata } from "next";
import SiteHeader from "@/src/components/SiteHeader";
import SiteFooter from "@/src/components/SiteFooter";
import CookieBanner from "@/src/components/CookieBanner";
import LangAttribute from "@/src/components/LangAttribute";
import { TOOL_COUNT } from "@/src/data/tool-directory";
import { siteUrl, socialImagePath } from "@/src/lib/site";

const siteDescription =
  `Free online tools for image, PDF, CSV, Parquet, and AWS data workflows. Convert files and inspect exports in your browser with ${TOOL_COUNT} tools and no upload to a server.`;

export const metadata: Metadata = {
  description: siteDescription,
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
    <>
      <LangAttribute lang="en" />
      <SiteHeader locale="en" />
      <div className="min-h-screen">{children}</div>
      <SiteFooter locale="en" />
      <CookieBanner locale="en" />
    </>
  );
}
