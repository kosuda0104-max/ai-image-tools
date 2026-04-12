import type { Metadata } from "next";
import { siteUrl } from "@/src/lib/site";

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

  const jaPath = `/tools/${slug}`;
  const enPath = `/en/tools/${slug}`;
  const canonicalPath = isEn ? enPath : jaPath;

  return {
    title,
    description,
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
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}
