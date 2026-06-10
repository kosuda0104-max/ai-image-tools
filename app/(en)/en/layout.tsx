import type { Metadata } from "next";
import SiteHeader from "@/src/components/SiteHeader";
import SiteFooter from "@/src/components/SiteFooter";
import CookieBanner from "@/src/components/CookieBanner";
import LangAttribute from "@/src/components/LangAttribute";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const siteDescription =
  "Free online tools for image and PDF conversion. Convert JPG, PNG, WebP, HEIC, and PDF files. Compress, resize, crop, rotate, merge, and split — all in your browser with no file upload to a server. 45+ tools available.";

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
        url: "/og.png",
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
    images: ["/og.png"],
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
