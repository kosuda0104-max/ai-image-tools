import type { MetadataRoute } from "next";
import { getGuides } from "@/src/data/guides";
import { getAllToolItems } from "@/src/data/tool-directory";
import { siteUrl } from "@/src/lib/site";
import { TOOL_CONTENT_LAST_UPDATED } from "@/src/lib/seo-signals";

const guides = getGuides("ja");
const toolRoutes = getAllToolItems("ja").map((tool) => `/tools/${tool.slug}`);

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

  const jaStaticRoutes = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: defaultLastModified,
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
    lastModified: defaultLastModified,
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

  const jaGuideRoutes = guides.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt ?? TOOL_CONTENT_LAST_UPDATED),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const enGuideRoutes = guides.map((guide) => ({
    url: `${siteUrl}/en/guides/${guide.slug}`,
    lastModified: new Date(guide.updatedAt ?? TOOL_CONTENT_LAST_UPDATED),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...jaStaticRoutes, ...jaGuideRoutes, ...enStaticRoutes, ...enGuideRoutes];
}
