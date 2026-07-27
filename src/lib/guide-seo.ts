import type { Metadata } from "next";
import type { GuideEntry } from "@/src/data/guides";
import { siteUrl, socialImageUrl } from "@/src/lib/site";
import { TOOL_CONTENT_LAST_UPDATED } from "@/src/lib/seo-signals";
import { isZhTwGuideSlug } from "@/src/data/zh-tw";
import type { SiteLocale } from "@/src/lib/site-locale";

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

export function buildGuideArticleJsonLd(guide: GuideEntry, locale: SiteLocale) {
  const updatedAt = guide.updatedAt ?? TOOL_CONTENT_LAST_UPDATED;
  const base = locale === "ja" ? "/guides" : locale === "en" ? "/en/guides" : "/zh-tw/guides";
  const url = `${siteUrl}${base}/${guide.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    image: [socialImageUrl],
    inLanguage: locale,
    datePublished: updatedAt,
    dateModified: updatedAt,
    author: GUIDE_AUTHOR,
    publisher: GUIDE_PUBLISHER,
    mainEntityOfPage: url,
    url,
    ...(guide.sources && guide.sources.length > 0
      ? { citation: guide.sources.map((source) => source.href) }
      : {}),
  };
}

export function generateGuideMetadata(
  guide: GuideEntry,
  locale: SiteLocale,
): Metadata {
  const updatedAt = guide.updatedAt ?? TOOL_CONTENT_LAST_UPDATED;
  const jaUrl = `${siteUrl}/guides/${guide.slug}`;
  const enUrl = `${siteUrl}/en/guides/${guide.slug}`;
  const zhTwUrl = `${siteUrl}/zh-tw/guides/${guide.slug}`;
  const canonicalUrl = locale === "zh-TW" ? zhTwUrl : locale === "ja" ? jaUrl : enUrl;
  const languages: Record<string, string> = { ja: jaUrl, en: enUrl, "x-default": jaUrl };
  if (isZhTwGuideSlug(guide.slug)) languages["zh-TW"] = zhTwUrl;

  return {
    title: guide.title,
    description: guide.description,
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: canonicalUrl,
      siteName: "Filewisp",
      locale: locale === "zh-TW" ? "zh_TW" : locale === "ja" ? "ja_JP" : "en_US",
      type: "article",
      images: [
        {
          url: socialImageUrl,
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
      images: [socialImageUrl],
    },
    other: {
      "article:published_time": updatedAt,
      "article:modified_time": updatedAt,
      "article:author": "Kosuda",
    },
  };
}
