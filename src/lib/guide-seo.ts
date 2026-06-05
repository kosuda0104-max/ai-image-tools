import type { Metadata } from "next";
import type { GuideEntry } from "@/src/data/guides";
import { siteUrl } from "@/src/lib/site";
import { TOOL_CONTENT_LAST_UPDATED } from "@/src/lib/seo-signals";

const GUIDE_AUTHOR = {
  "@type": "Person",
  name: "Kosuda",
  jobTitle: "Web Engineer",
};

const GUIDE_PUBLISHER = {
  "@type": "Organization",
  name: "Filewisp",
  url: siteUrl,
};

export function buildGuideArticleJsonLd(guide: GuideEntry, locale: "ja" | "en") {
  const url =
    locale === "ja"
      ? `${siteUrl}/guides/${guide.slug}`
      : `${siteUrl}/en/guides/${guide.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    inLanguage: locale,
    datePublished: TOOL_CONTENT_LAST_UPDATED,
    dateModified: TOOL_CONTENT_LAST_UPDATED,
    author: GUIDE_AUTHOR,
    publisher: GUIDE_PUBLISHER,
    mainEntityOfPage: url,
    url,
  };
}

export function generateGuideMetadata(
  guide: GuideEntry,
  locale: "ja" | "en",
): Metadata {
  const jaUrl = `${siteUrl}/guides/${guide.slug}`;
  const enUrl = `${siteUrl}/en/guides/${guide.slug}`;
  const canonicalUrl = locale === "ja" ? jaUrl : enUrl;

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ja: jaUrl,
        en: enUrl,
        "x-default": jaUrl,
      },
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: canonicalUrl,
      siteName: "Filewisp",
      locale: locale === "ja" ? "ja_JP" : "en_US",
      type: "article",
      images: [
        {
          url: `${siteUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [`${siteUrl}/og.png`],
    },
    other: {
      "article:published_time": TOOL_CONTENT_LAST_UPDATED,
      "article:modified_time": TOOL_CONTENT_LAST_UPDATED,
      "article:author": "Kosuda",
    },
  };
}
