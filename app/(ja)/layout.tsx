import type { Metadata } from "next";
import SiteHeader from "@/src/components/SiteHeader";
import SiteFooter from "@/src/components/SiteFooter";
import CookieBanner from "@/src/components/CookieBanner";
import { TOOL_COUNT } from "@/src/data/tool-directory";
import { siteUrl } from "@/src/lib/site";

const siteDescription =
  `画像・PDF、CSV・Parquet・AWSエクスポートの変換や確認をブラウザだけで行える無料ツール集。登録不要・ファイルはサーバーに送信されません。${TOOL_COUNT}種類のツールを提供しています。`;

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
      <div className="min-h-screen">{children}</div>
      <SiteFooter locale="ja" />
      <CookieBanner locale="ja" />
    </>
  );
}
