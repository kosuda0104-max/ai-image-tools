import type { MetadataRoute } from "next";
import { getGuides } from "@/src/data/guides";
import { getAllToolItems } from "@/src/data/tool-directory";
import { siteUrl } from "@/src/lib/site";
import { TOOL_CONTENT_LAST_UPDATED } from "@/src/lib/seo-signals";

const guideRoutes = getGuides("ja").map((guide) => `/guides/${guide.slug}`);
const toolRoutes = getAllToolItems("ja").map((tool) => `/tools/${tool.slug}`);

const routes = [
  "",
  "/tools",
  "/guides",
  ...guideRoutes,
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  ...toolRoutes,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(TOOL_CONTENT_LAST_UPDATED);

  const jaRoutes = routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
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

  const enRoutes = routes.map((path) => ({
    url: `${siteUrl}/en${path === "" ? "" : path}`,
    lastModified,
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

  return [...jaRoutes, ...enRoutes];
}
