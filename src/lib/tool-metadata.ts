import type { Metadata } from "next";
import { siteUrl } from "@/src/lib/site";
import {
  buildToolKeywords,
  TOOL_CONTENT_LAST_UPDATED,
} from "@/src/lib/seo-signals";

type Locale = "ja" | "en";

type CreateToolMetadataParams = {
  locale: Locale;
  slug: string;
  jaTitle: string;
  jaDescription: string;
  enTitle: string;
  enDescription: string;
};

export function createToolMetadata({
  locale,
  slug,
  jaTitle,
  jaDescription,
  enTitle,
  enDescription,
}: CreateToolMetadataParams): Metadata {
  const isEn = locale === "en";

  const title = isEn ? enTitle : jaTitle;
  const description = isEn ? enDescription : jaDescription;
  const keywords = buildToolKeywords({
    locale,
    slug,
    title,
  });

  const jaPath = `/tools/${slug}`;
  const enPath = `/en/tools/${slug}`;
  const canonicalPath = isEn ? enPath : jaPath;

  return {
    title,
    description,
    applicationName: "AI Image Tools",
    category: "Utilities",
    keywords,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}${canonicalPath}`,
      languages: {
        ja: `${siteUrl}${jaPath}`,
        en: `${siteUrl}${enPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonicalPath}`,
      siteName: "AI Image Tools",
      locale: isEn ? "en_US" : "ja_JP",
      type: "website",
      images: [
        {
          url: `${siteUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    other: {
      "article:modified_time": TOOL_CONTENT_LAST_UPDATED,
      "og:updated_time": TOOL_CONTENT_LAST_UPDATED,
    },
  };
}
