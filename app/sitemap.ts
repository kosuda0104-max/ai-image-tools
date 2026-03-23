import type { MetadataRoute } from "next";

const siteUrl = "https://ai-image-tools.com";

const routes = [
  "",
  "/tools",

  // 画像変換
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
  "/tools/bmp-to-jpg",
  "/tools/bmp-to-png",
  "/tools/tiff-to-jpg",
  "/tools/tiff-to-png",
  "/tools/ico-to-png",
  "/tools/ico-to-jpg",

  // 画像編集
  "/tools/resize-image",
  "/tools/crop-image",
  "/tools/rotate-image",
  "/tools/flip-image",
  "/tools/image-compress",
  "/tools/grayscale-image",
  "/tools/watermark-image",

  // PDF系
  "/tools/image-to-pdf",
  "/tools/pdf-to-jpg",
  "/tools/pdf-to-png",
  "/tools/pdf-to-webp",
  "/tools/merge-pdf",
  "/tools/split-pdf",
  "/tools/compress-pdf",
  "/tools/rotate-pdf",
  "/tools/pdf-remove-pages",

  // その他
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const jaRoutes = routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : path === "/tools" ? 0.9 : 0.8,
  }));

  const enRoutes = routes.map((path) => ({
    url: `${siteUrl}/en${path === "" ? "" : path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 0.9 : path === "/tools" ? 0.8 : 0.7,
  }));

  return [...jaRoutes, ...enRoutes];
}