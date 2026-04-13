import type { Metadata } from "next";
import "./globals.css";
import { siteUrl } from "@/src/lib/site";

const googleVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Image Tools",
    template: "%s | AI Image Tools",
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
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9678380581323736"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
