import type { Metadata } from "next";
import Link from "next/link";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  description:
    "Free online image and PDF tools. Convert JPG, PNG, WebP, and PDF files, and compress, resize, or crop images safely in your browser.",
  alternates: {
    languages: {
      ja: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "AI Image Tools",
    description:
      "Free online image and PDF tools. Convert JPG, PNG, WebP, and PDF files, and compress, resize, or crop images safely in your browser.",
    url: `${siteUrl}/en`,
    siteName: "AI Image Tools",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "AI Image Tools",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Tools",
    description:
      "Free online image and PDF tools. Convert JPG, PNG, WebP, and PDF files, and compress, resize, or crop images safely in your browser.",
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
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/en" className="font-bold">
            AI Image Tools
          </Link>

          <nav className="flex gap-4 text-sm">
            <Link className="hover:underline" href="/en/tools/jpg-to-png">
              JPG→PNG
            </Link>
            <Link className="hover:underline" href="/en/tools/png-to-jpg">
              PNG→JPG
            </Link>
            <Link className="hover:underline" href="/en/tools/image-compress">
              Compress
            </Link>
            <Link className="hover:underline" href="/en/tools">
              Tools
            </Link>
            <Link className="font-semibold hover:underline" href="/">
              JA
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
                href="/en/contact"
                className="hover:text-black hover:underline"
              >
                Contact
              </Link>
              <Link
                href="/en/privacy-policy"
                className="hover:text-black hover:underline"
              >
                Privacy Policy
              </Link>
              <Link
                href="/en/terms"
                className="hover:text-black hover:underline"
              >
                Terms
              </Link>
              <Link
                href="/en/tools"
                className="hover:text-black hover:underline"
              >
                Tools
              </Link>
              <Link href="/" className="hover:text-black hover:underline">
                Japanese
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}