import type { Metadata } from "next";
import Link from "next/link";
import SiteLogo from "@/src/components/SiteLogo";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const siteDescription =
  "Free online image and PDF tools. Convert JPG, PNG, WebP, HEIC, and PDF files, then compress, resize, crop, and prepare them safely in your browser.";

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
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/en" className="shrink-0">
            <SiteLogo />
          </Link>

          <nav className="flex flex-wrap gap-4 text-sm">
            <Link className="hover:underline" href="/en/tools/jpg-to-png">
              JPG to PNG
            </Link>
            <Link className="hover:underline" href="/en/tools/png-to-jpg">
              PNG to JPG
            </Link>
            <Link className="hover:underline" href="/en/tools/image-compress">
              Compress
            </Link>
            <Link className="hover:underline" href="/en/tools">
              Tools
            </Link>
            <Link className="hover:underline" href="/en/guides">
              Guides
            </Link>
            <Link className="hover:underline" href="/en/about">
              About
            </Link>
            <Link className="font-semibold hover:underline" href="/">
              JA
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>

      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="space-y-5">
            <div className="max-w-3xl space-y-2">
              <SiteLogo compact />
              <p className="text-sm leading-7 text-gray-600">
                A browser-based tools site for image conversion, image editing,
                and PDF workflows. The site publishes tool pages, guide content,
                and policy pages to make the service more useful and
                transparent over time.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">
                Copyright {new Date().getFullYear()} AI Image Tools
              </div>

              <nav className="flex flex-wrap gap-4 text-sm text-gray-600">
                <Link
                  href="/en/about"
                  className="hover:text-black hover:underline"
                >
                  About
                </Link>
                <Link
                  href="/en/guides"
                  className="hover:text-black hover:underline"
                >
                  Guides
                </Link>
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
        </div>
      </footer>
    </>
  );
}
