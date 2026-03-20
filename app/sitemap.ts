import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const routes = [
  "",
  "/tools",

  "/tools/jpg-to-png",
  "/tools/png-to-jpg",
  "/tools/webp-to-png",
  "/tools/webp-to-jpg",
  "/tools/jpg-to-webp",
  "/tools/png-to-webp",
  "/tools/avif-to-png",
  "/tools/avif-to-jpg",
  "/tools/gif-to-png",
  "/tools/gif-to-jpg",
  "/tools/svg-to-png",
  "/tools/svg-to-jpg",
  "/tools/heic-to-jpg",

  "/tools/resize-image",
  "/tools/crop-image",
  "/tools/rotate-image",
  "/tools/flip-image",
  "/tools/image-compress",

  "/tools/image-to-pdf",
  "/tools/pdf-to-jpg",
  "/tools/pdf-to-png",
  "/tools/pdf-to-webp",
  "/tools/merge-pdf",
  "/tools/split-pdf",
  "/tools/compress-pdf",
  "/tools/rotate-pdf",
  "/tools/pdf-remove-pages",

  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const jaRoutes = routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const enRoutes = routes.map((path) => ({
    url: `${siteUrl}/en${path === "" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 0.9 : 0.7,
  }));

  return [...jaRoutes, ...enRoutes];
}