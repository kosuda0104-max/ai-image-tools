import type { MetadataRoute } from "next";
import { getGuides } from "@/src/data/guides";
import { getAllToolItems } from "@/src/data/tool-directory";
import { siteUrl } from "@/src/lib/site";
import {
  getToolContentLastUpdated,
  TOOL_CONTENT_LAST_UPDATED,
} from "@/src/lib/seo-signals";
import { awsExportFormatsZhTwGuide } from "@/src/data/guides.zh-tw";

const jaGuides = getGuides("ja");
const enGuides = getGuides("en");
const toolRoutes = getAllToolItems("ja").map((tool) => `/tools/${tool.slug}`);
const zhTwToolRoutes = getAllToolItems("zh-TW").map(
  (tool) => `/zh-tw/tools/${tool.slug}`,
);

const staticRoutes = [
  "",
  "/tools",
  "/guides",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  ...toolRoutes,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const defaultLastModified = new Date(TOOL_CONTENT_LAST_UPDATED);
  const getStaticLastModified = (path: string) => {
    const toolPrefix = "/tools/";
    return path.startsWith(toolPrefix)
      ? new Date(getToolContentLastUpdated(path.slice(toolPrefix.length)))
      : defaultLastModified;
  };

  const jaStaticRoutes = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: getStaticLastModified(path),
    changeFrequency: "weekly" as const,
    priority:
      path === ""
        ? 1
        : path === "/tools"
          ? 0.9
          : path.startsWith("/guides") || path === "/about"
            ? 0.85
            : 0.8,
  }));

  const enStaticRoutes = staticRoutes.map((path) => ({
    url: `${siteUrl}/en${path === "" ? "" : path}`,
    lastModified: getStaticLastModified(path),
    changeFrequency: "weekly" as const,
    priority:
      path === ""
        ? 0.9
        : path === "/tools"
          ? 0.85
          : path.startsWith("/guides") || path === "/about"
            ? 0.8
            : 0.7,
  }));

  const jaGuideRoutes = jaGuides.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt ?? TOOL_CONTENT_LAST_UPDATED),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const enGuideRoutes = enGuides.map((guide) => ({
    url: `${siteUrl}/en/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt ?? TOOL_CONTENT_LAST_UPDATED),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const zhTwRoutes = [
    "/zh-tw",
    "/zh-tw/tools",
    "/zh-tw/guides",
    ...zhTwToolRoutes,
    `/zh-tw/guides/${awsExportFormatsZhTwGuide.slug}`,
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(
      path.includes("/guides/aws-export-file-formats")
        ? awsExportFormatsZhTwGuide.updatedAt ?? TOOL_CONTENT_LAST_UPDATED
        : TOOL_CONTENT_LAST_UPDATED,
    ),
    changeFrequency: "weekly" as const,
    priority: path === "/zh-tw" ? 0.8 : path === "/zh-tw/tools" ? 0.75 : 0.7,
  }));

  return [
    ...jaStaticRoutes,
    ...jaGuideRoutes,
    ...enStaticRoutes,
    ...enGuideRoutes,
    ...zhTwRoutes,
  ];
}
