import type { Metadata } from "next";
import SiteHeader from "@/src/components/SiteHeader";
import SiteFooter from "@/src/components/SiteFooter";
import CookieBanner from "@/src/components/CookieBanner";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const siteDescription =
  "JPG・PNG・WebP・HEIC・PDF の変換、圧縮、リサイズ、結合、分割をブラウザだけで行える無料ツール集。登録不要・ファイルはサーバーに送信されません。45種類以上のツールを提供しています。";

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
    url: siteUrl,
    siteName: "Filewisp",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Filewisp",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filewisp",
    description: siteDescription,
    images: ["/og.png"],
  },
};

export default function JaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader locale="ja" />
      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      <SiteFooter locale="ja" />
      <CookieBanner locale="ja" />
    </>
  );
}
