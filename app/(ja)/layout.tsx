import type { Metadata } from "next";
import Link from "next/link";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  description:
    "無料で使える画像・PDF変換ツール集。JPG、PNG、WebP、PDFの変換や、画像圧縮・リサイズ・切り抜きなどをブラウザ上で安全に利用できます。",
  alternates: {
    languages: {
      ja: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "AI Image Tools",
    description:
      "無料で使える画像・PDF変換ツール集。JPG、PNG、WebP、PDFの変換や、画像圧縮・リサイズ・切り抜きなどをブラウザ上で安全に利用できます。",
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
    description:
      "無料で使える画像・PDF変換ツール集。JPG、PNG、WebP、PDFの変換や、画像圧縮・リサイズ・切り抜きなどをブラウザ上で安全に利用できます。",
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
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-bold">
            AI Image Tools
          </Link>

          <nav className="flex gap-4 text-sm">
            <Link className="hover:underline" href="/tools/jpg-to-png">
              JPG→PNG
            </Link>
            <Link className="hover:underline" href="/tools/png-to-jpg">
              PNG→JPG
            </Link>
            <Link className="hover:underline" href="/tools/image-compress">
              圧縮
            </Link>
            <Link className="hover:underline" href="/tools">
              ツール一覧
            </Link>
            <Link className="font-semibold hover:underline" href="/en">
              EN
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} AI Image Tools
            </div>

            <nav className="flex flex-wrap gap-4 text-sm text-gray-600">
              <Link
                href="/contact"
                className="hover:text-black hover:underline"
              >
                Contact
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-black hover:underline"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-black hover:underline">
                Terms
              </Link>
              <Link href="/tools" className="hover:text-black hover:underline">
                Tools
              </Link>
              <Link href="/en" className="hover:text-black hover:underline">
                English
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}