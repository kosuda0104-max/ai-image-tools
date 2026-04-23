import type { MetadataRoute } from "next";
import { siteUrl } from "@/src/lib/site";

const routes = [
  "",
  "/tools",
  "/guides",
  "/guides/image-format-basics",
  "/guides/jpg-vs-png",
  "/guides/png-vs-webp",
  "/guides/pdf-workflows",
  "/guides/heic-to-jpg-guide",
  "/guides/compress-images-without-losing-quality",
  "/guides/pdf-to-jpg-guide",
  "/guides/resize-images-for-web",
  "/guides/merge-or-split-pdf",
  "/guides/choose-best-image-format-for-web",
  "/guides/how-to-remove-pages-from-pdf",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
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
  "/tools/heic-to-png",
  "/tools/bmp-to-jpg",
  "/tools/bmp-to-png",
  "/tools/tiff-to-jpg",
  "/tools/tiff-to-png",
  "/tools/ico-to-png",
  "/tools/ico-to-jpg",
  "/tools/resize-image",
  "/tools/crop-image",
  "/tools/rotate-image",
  "/tools/flip-image",
  "/tools/image-compress",
  "/tools/jpg-compress",
  "/tools/png-compress",
  "/tools/webp-compress",
  "/tools/grayscale-image",
  "/tools/watermark-image",
  "/tools/image-to-pdf",
  "/tools/jpg-to-pdf",
  "/tools/pdf-to-jpg",
  "/tools/pdf-to-png",
  "/tools/pdf-to-webp",
  "/tools/merge-pdf",
  "/tools/split-pdf",
  "/tools/compress-pdf",
  "/tools/rotate-pdf",
  "/tools/pdf-remove-pages",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

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