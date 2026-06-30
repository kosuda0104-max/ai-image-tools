import { getGuide } from "@/src/data/guides";

type GuideLocale = "ja" | "en";

export type RelatedGuideLink = {
  slug: string;
  title: string;
  href: string;
};

/**
 * Guide-to-guide internal links, grouped by topic cluster.
 * Cross-linking sibling guides concentrates internal PageRank on each
 * cluster and signals topical depth, which helps thin / niche pages
 * (e.g. the Parquet/CSV cluster) get indexed.
 */
const guideRelatedGuidesMap: Record<string, string[]> = {
  // ── Data cluster (fully interlinked) ──
  "what-is-parquet": ["parquet-csv-workflows", "json-and-csv", "csv-encoding-fix"],
  "parquet-csv-workflows": ["what-is-parquet", "json-and-csv", "csv-encoding-fix"],
  "json-and-csv": ["csv-encoding-fix", "what-is-parquet", "parquet-csv-workflows"],
  "csv-encoding-fix": ["json-and-csv", "what-is-parquet", "parquet-csv-workflows"],
  "base64-data-uri-for-web-development": [
    "choose-best-image-format-for-web",
    "optimize-blog-and-site-images",
    "how-to-create-ogp-image",
  ],

  // ── Image format cluster ──
  "image-format-basics": [
    "jpg-vs-png",
    "png-vs-webp",
    "choose-best-image-format-for-web",
    // Tier-S inbound boosts: jpg-vs-jpeg-difference had only 1 inbound guide link,
    // and what-is-avif (GSC #2) was promoted to Tier S — link both from this hub.
    "jpg-vs-jpeg-difference",
    "what-is-avif",
  ],
  "jpg-vs-png": ["image-format-basics", "jpg-vs-jpeg-difference", "png-vs-webp"],
  "png-vs-webp": ["what-is-webp", "image-format-basics", "png-transparency-basics"],
  "what-is-webp": ["png-vs-webp", "what-is-avif", "choose-best-image-format-for-web"],
  "what-is-avif": ["what-is-webp", "choose-best-image-format-for-web", "image-format-basics"],
  "jpg-vs-jpeg-difference": ["jpg-vs-png", "image-format-basics"],
  "png-transparency-basics": ["png-vs-webp", "what-is-webp"],
  "what-is-tiff": ["image-format-basics", "what-is-avif"],
  "choose-best-image-format-for-web": [
    "image-format-basics",
    "png-vs-webp",
    "optimize-blog-and-site-images",
    "base64-data-uri-for-web-development",
  ],

  // ── Compression / web delivery cluster ──
  "compress-images-without-losing-quality": [
    "resize-images-for-web",
    "optimize-blog-and-site-images",
    "send-large-photos-by-email",
  ],
  "resize-images-for-web": [
    "compress-images-without-losing-quality",
    "optimize-blog-and-site-images",
    "prepare-images-for-upload",
  ],
  "optimize-blog-and-site-images": [
    "resize-images-for-web",
    "choose-best-image-format-for-web",
    "how-to-create-favicon",
  ],
  "prepare-images-for-upload": [
    "resize-images-for-web",
    "compress-images-without-losing-quality",
    "marketplace-product-photos",
  ],
  "send-large-photos-by-email": [
    "compress-images-without-losing-quality",
    "resize-images-for-web",
  ],
  "marketplace-product-photos": [
    "crop-image-to-square",
    "prepare-images-for-upload",
    "remove-photo-location-data",
  ],
  "resume-photo-size": ["crop-image-to-square", "prepare-images-for-upload"],

  // ── HEIC / smartphone cluster ──
  "heic-to-jpg-guide": [
    "heic-cannot-open-windows",
    "convert-images-on-smartphone",
    "iphone-photos-to-pdf",
  ],
  "heic-cannot-open-windows": ["heic-to-jpg-guide", "convert-images-on-smartphone"],
  "convert-images-on-smartphone": ["heic-to-jpg-guide", "heic-cannot-open-windows"],

  // ── PDF cluster ──
  "pdf-workflows": ["merge-or-split-pdf", "how-to-remove-pages-from-pdf", "pdf-to-jpg-guide"],
  "merge-or-split-pdf": ["pdf-workflows", "how-to-remove-pages-from-pdf", "pdf-upload-size-limit"],
  "how-to-remove-pages-from-pdf": ["merge-or-split-pdf", "pdf-workflows"],
  "pdf-to-jpg-guide": ["pdf-workflows", "screenshot-to-pdf", "iphone-photos-to-pdf"],
  "pdf-upload-size-limit": ["merge-or-split-pdf", "pdf-workflows"],
  "screenshot-to-pdf": ["pdf-to-jpg-guide", "iphone-photos-to-pdf"],
  "iphone-photos-to-pdf": ["heic-to-jpg-guide", "screenshot-to-pdf", "pdf-workflows"],

  // ── Editing cluster ──
  "grayscale-photo": ["add-watermark-to-image", "crop-image-to-square"],
  "add-watermark-to-image": ["grayscale-photo", "crop-image-to-square"],
  "crop-image-to-square": ["resume-photo-size", "marketplace-product-photos", "grayscale-photo"],

  // ── Privacy cluster ──
  "remove-photo-location-data": [
    "marketplace-product-photos",
    "prepare-images-for-upload",
    "send-large-photos-by-email",
  ],

  // ── Developer / web publishing cluster ──
  "how-to-create-favicon": [
    "how-to-create-ogp-image",
    "base64-data-uri-for-web-development",
    "optimize-blog-and-site-images",
  ],
  "how-to-create-ogp-image": [
    "how-to-create-favicon",
    "social-media-image-sizes",
    "extract-color-palette-from-image",
  ],
  "social-media-image-sizes": [
    "how-to-create-ogp-image",
    "extract-color-palette-from-image",
    "resize-images-for-web",
  ],
  "extract-color-palette-from-image": [
    "how-to-create-ogp-image",
    "social-media-image-sizes",
    "optimize-blog-and-site-images",
  ],
};

export function getRelatedGuides(
  locale: GuideLocale,
  slug: string,
): RelatedGuideLink[] {
  const slugs = guideRelatedGuidesMap[slug] ?? [];
  const base = locale === "ja" ? "/guides" : "/en/guides";

  return slugs
    .map((relatedSlug) => getGuide(locale, relatedSlug))
    .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide))
    .map((guide) => ({
      slug: guide.slug,
      title: guide.title,
      href: `${base}/${guide.slug}`,
    }));
}
