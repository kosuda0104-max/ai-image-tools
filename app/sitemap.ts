import type { MetadataRoute } from "next";
import { getGuides } from "@/src/data/guides";
import { getAllToolItems } from "@/src/data/tool-directory";
import { awsExportFormatsZhTwGuide } from "@/src/data/guides.zh-tw";
import {
  isZhTwGuideSlug,
  isZhTwToolSlug,
} from "@/src/data/zh-tw";
import { siteUrl } from "@/src/lib/site";
import {
  getToolContentLastUpdated,
  TOOL_CONTENT_LAST_UPDATED,
} from "@/src/lib/seo-signals";

type LocalizedPaths = {
  ja: string;
  en: string;
  zhTw?: string;
};

const staticRouteGroups: LocalizedPaths[] = [
  { ja: "/", en: "/en", zhTw: "/zh-tw" },
  { ja: "/tools", en: "/en/tools", zhTw: "/zh-tw/tools" },
  { ja: "/guides", en: "/en/guides", zhTw: "/zh-tw/guides" },
  { ja: "/about", en: "/en/about" },
  { ja: "/contact", en: "/en/contact" },
  { ja: "/privacy-policy", en: "/en/privacy-policy" },
  { ja: "/terms", en: "/en/terms" },
];

function absoluteUrl(path: string): string {
  return new URL(path, `${siteUrl.replace(/\/$/, "")}/`).toString();
}

function languageAlternates(paths: LocalizedPaths): Record<string, string> {
  return {
    ja: absoluteUrl(paths.ja),
    en: absoluteUrl(paths.en),
    ...(paths.zhTw ? { "zh-TW": absoluteUrl(paths.zhTw) } : {}),
    "x-default": absoluteUrl(paths.ja),
  };
}

function localizedEntries(
  paths: LocalizedPaths,
  lastModifiedByPath: Partial<Record<keyof LocalizedPaths, Date>> = {},
): MetadataRoute.Sitemap {
  const languages = languageAlternates(paths);
  const variants: Array<[keyof LocalizedPaths, string | undefined]> = [
    ["ja", paths.ja],
    ["en", paths.en],
    ["zhTw", paths.zhTw],
  ];

  return variants.flatMap(([locale, path]) =>
    path
      ? [
          {
            url: absoluteUrl(path),
            ...(lastModifiedByPath[locale]
              ? { lastModified: lastModifiedByPath[locale] }
              : {}),
            alternates: { languages },
          },
        ]
      : [],
  );
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRouteGroups.flatMap((paths) =>
    localizedEntries(paths),
  );

  const toolEntries = getAllToolItems("ja").flatMap((tool) => {
    const paths: LocalizedPaths = {
      ja: `/tools/${tool.slug}`,
      en: `/en/tools/${tool.slug}`,
      ...(isZhTwToolSlug(tool.slug)
        ? { zhTw: `/zh-tw/tools/${tool.slug}` }
        : {}),
    };
    const lastModified = new Date(getToolContentLastUpdated(tool.slug));

    return localizedEntries(paths, {
      ja: lastModified,
      en: lastModified,
      ...(paths.zhTw ? { zhTw: lastModified } : {}),
    });
  });

  const enGuidesBySlug = new Map(
    getGuides("en").map((guide) => [guide.slug, guide]),
  );
  const guideEntries = getGuides("ja").flatMap((jaGuide) => {
    const enGuide = enGuidesBySlug.get(jaGuide.slug);
    if (!enGuide) return [];

    const hasZhTw = isZhTwGuideSlug(jaGuide.slug);
    const paths: LocalizedPaths = {
      ja: `/guides/${jaGuide.slug}`,
      en: `/en/guides/${jaGuide.slug}`,
      ...(hasZhTw ? { zhTw: `/zh-tw/guides/${jaGuide.slug}` } : {}),
    };

    return localizedEntries(paths, {
      ja: new Date(jaGuide.updatedAt ?? TOOL_CONTENT_LAST_UPDATED),
      en: new Date(enGuide.updatedAt ?? TOOL_CONTENT_LAST_UPDATED),
      ...(hasZhTw
        ? {
            zhTw: new Date(
              awsExportFormatsZhTwGuide.updatedAt ?? TOOL_CONTENT_LAST_UPDATED,
            ),
          }
        : {}),
    });
  });

  return [...staticEntries, ...toolEntries, ...guideEntries];
}
