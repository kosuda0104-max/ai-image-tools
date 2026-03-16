import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

const routes = [
  "",
  "/tools",
  "/en",
  "/en/tools",

  "/tools/jpg-to-png",
  "/tools/png-to-jpg",
  "/tools/webp-to-png",
  "/tools/webp-to-jpg",
  "/tools/jpg-to-webp",
  "/tools/png-to-webp",
  "/tools/heic-to-jpg",
  "/tools/gif-to-png",
  "/tools/gif-to-jpg",

  "/tools/image-compress",
  "/tools/resize-image",
  "/tools/crop-image",
  "/tools/rotate-image",
  "/tools/flip-image",

  "/tools/image-to-pdf",
  "/tools/pdf-to-jpg",
  "/tools/pdf-to-png",
  "/tools/merge-pdf",
  "/tools/split-pdf",
  "/tools/compress-pdf",
  "/tools/rotate-pdf",

  "/tools/avif-to-jpg",
  "/tools/avif-to-png",
  "/tools/bmp-to-jpg",
  "/tools/bmp-to-png",
  "/tools/tiff-to-jpg",
  "/tools/tiff-to-png",
  "/tools/ico-to-png",
  "/tools/ico-to-jpg",
  "/tools/svg-to-png",
  "/tools/svg-to-jpg",
  "/tools/grayscale-image",
  "/tools/watermark-image",
  "/tools/pdf-to-webp",
  "/tools/pdf-remove-pages",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
  }));

  const enPages: MetadataRoute.Sitemap = routes
    .filter((route) => route.startsWith("/tools"))
    .map((route) => ({
      url: `${siteUrl}/en${route}`,
      lastModified: now,
    }));

  return [...pages, ...enPages];
}