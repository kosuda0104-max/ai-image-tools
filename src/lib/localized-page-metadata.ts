import type { Metadata } from "next";
import { siteUrl } from "@/src/lib/site";

type Locale = "ja" | "en";

type CreateLocalizedPageMetadataParams = {
  locale: Locale;
  title: string;
  description: string;
  jaPath: string;
  enPath: string;
};

export function createLocalizedPageMetadata({
  locale,
  title,
  description,
  jaPath,
  enPath,
}: CreateLocalizedPageMetadataParams): Metadata {
  const canonicalPath = locale === "en" ? enPath : jaPath;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${canonicalPath}`,
      languages: {
        ja: `${siteUrl}${jaPath}`,
        en: `${siteUrl}${enPath}`,
        "x-default": `${siteUrl}${jaPath}`,
      },
    },
  };
}
