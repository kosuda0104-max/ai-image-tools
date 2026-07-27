import type { Metadata } from "next";
import { siteUrl, socialImageUrl } from "@/src/lib/site";
import {
  buildToolKeywords,
  TOOL_CONTENT_LAST_UPDATED,
} from "@/src/lib/seo-signals";
import { isZhTwToolSlug } from "@/src/data/zh-tw";
import type { SiteLocale } from "@/src/lib/site-locale";

type CreateToolMetadataParams = {
  locale: SiteLocale;
  slug: string;
  jaTitle: string;
  jaDescription: string;
  enTitle: string;
  enDescription: string;
  zhTwTitle?: string;
  zhTwDescription?: string;
};

export function createToolMetadata({
  locale,
  slug,
  jaTitle,
  jaDescription,
  enTitle,
  enDescription,
  zhTwTitle,
  zhTwDescription,
}: CreateToolMetadataParams): Metadata {
  const isEn = locale === "en";
  const isZhTw = locale === "zh-TW";

  const title = isZhTw ? zhTwTitle ?? enTitle : isEn ? enTitle : jaTitle;
  const description = isZhTw
    ? zhTwDescription ?? enDescription
    : isEn
      ? enDescription
      : jaDescription;
  const keywords = isZhTw
    ? [title, `${title} 線上`, "免費線上工具", "瀏覽器內處理", slug]
    : buildToolKeywords({ locale, slug, title });

  const jaPath = `/tools/${slug}`;
  const enPath = `/en/tools/${slug}`;
  const zhTwPath = `/zh-tw/tools/${slug}`;
  const canonicalPath = isZhTw ? zhTwPath : isEn ? enPath : jaPath;
  const languages: Record<string, string> = {
    ja: `${siteUrl}${jaPath}`,
    en: `${siteUrl}${enPath}`,
    "x-default": `${siteUrl}${jaPath}`,
  };

  if (isZhTwToolSlug(slug)) {
    languages["zh-TW"] = `${siteUrl}${zhTwPath}`;
  }

  return {
    title,
    description,
    applicationName: "Filewisp",
    category: "Utilities",
    keywords,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `${siteUrl}${canonicalPath}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${canonicalPath}`,
      siteName: "Filewisp",
      locale: isZhTw ? "zh_TW" : isEn ? "en_US" : "ja_JP",
      type: "website",
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImageUrl],
    },
    other: {
      "article:modified_time": TOOL_CONTENT_LAST_UPDATED,
      "og:updated_time": TOOL_CONTENT_LAST_UPDATED,
    },
  };
}
