import type { Metadata } from "next";
import { siteUrl } from "@/src/lib/site";
import type { SiteLocale } from "@/src/lib/site-locale";

type CreateLocalizedPageMetadataParams = {
  locale: SiteLocale;
  title: string;
  description: string;
  jaPath: string;
  enPath: string;
  zhTwPath?: string;
};

export function createLocalizedPageMetadata({
  locale,
  title,
  description,
  jaPath,
  enPath,
  zhTwPath,
}: CreateLocalizedPageMetadataParams): Metadata {
  const canonicalPath =
    locale === "zh-TW" && zhTwPath
      ? zhTwPath
      : locale === "en"
        ? enPath
        : jaPath;
  const languages: Record<string, string> = {
    ja: `${siteUrl}${jaPath}`,
    en: `${siteUrl}${enPath}`,
    "x-default": `${siteUrl}${jaPath}`,
  };

  if (zhTwPath) languages["zh-TW"] = `${siteUrl}${zhTwPath}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${canonicalPath}`,
      languages,
    },
  };
}
