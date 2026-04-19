import type { Metadata } from "next";
import Link from "next/link";
import SiteLogo from "@/src/components/SiteLogo";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const siteDescription =
  "ブラウザで使える無料の画像変換・画像編集・PDFツール集です。JPG、PNG、WebP、HEIC、PDF などの変換や圧縮、リサイズ、切り抜きまで安全に行えます。";

export const metadata: Metadata = {
  description: siteDescription,
  alternates: {
    languages: {
      ja: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "AI Image Tools",
    description: siteDescription,
    url: siteUrl,
    siteName: "AI Image Tools",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AI Image Tools",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Tools",
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
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="shrink-0">
            <SiteLogo />
          </Link>

          <nav className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
            <Link className="hover:underline" href="/tools/jpg-to-png">
              JPGをPNGに変換
            </Link>
            <Link className="hover:underline" href="/tools/png-to-jpg">
              PNGをJPGに変換
            </Link>
            <Link className="hover:underline" href="/tools/image-compress">
              画像圧縮
            </Link>
            <Link className="hover:underline" href="/tools">
              ツール一覧
            </Link>
            <Link className="hover:underline" href="/guides">
              ガイド
            </Link>
            <Link className="hover:underline" href="/about">
              このサイトについて
            </Link>
            <Link className="font-semibold hover:underline" href="/en">
              EN
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="space-y-5">
            <div className="max-w-3xl space-y-3">
              <SiteLogo compact />
              <p className="text-sm leading-7 text-gray-600">
                画像変換、画像編集、PDF 作業をブラウザだけで進められる無料ツールサイトです。
                ツールページだけでなく、ガイドや運営情報も公開して、用途に合う作業を見つけやすくしています。
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">
                Copyright {new Date().getFullYear()} AI Image Tools
              </div>

              <nav className="flex flex-wrap gap-4 text-sm text-gray-600">
                <Link href="/about" className="hover:text-black hover:underline">
                  このサイトについて
                </Link>
                <Link href="/guides" className="hover:text-black hover:underline">
                  ガイド
                </Link>
                <Link href="/contact" className="hover:text-black hover:underline">
                  お問い合わせ
                </Link>
                <Link
                  href="/privacy-policy"
                  className="hover:text-black hover:underline"
                >
                  プライバシーポリシー
                </Link>
                <Link href="/terms" className="hover:text-black hover:underline">
                  利用規約
                </Link>
                <Link href="/tools" className="hover:text-black hover:underline">
                  ツール一覧
                </Link>
                <Link href="/en" className="hover:text-black hover:underline">
                  English
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
