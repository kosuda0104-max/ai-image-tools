import { getToolItems } from "@/src/data/tool-directory";
import type { ToolDirectoryLocale, ToolDirectoryItem } from "@/src/data/tool-directory";

const guideToolMap: Record<string, string[]> = {
  "image-format-basics": ["jpg-to-png", "png-to-jpg", "jpg-to-webp", "heic-to-jpg", "webp-to-jpg"],
  "jpg-vs-png": ["jpg-to-png", "png-to-jpg", "image-compress", "resize-image"],
  "png-vs-webp": ["png-to-webp", "webp-to-png", "image-compress", "jpg-to-webp"],
  "pdf-workflows": ["merge-pdf", "split-pdf", "compress-pdf", "pdf-to-jpg", "pdf-remove-pages"],
  "heic-to-jpg-guide": ["heic-to-jpg", "heic-to-png", "jpg-compress", "image-compress"],
  "compress-images-without-losing-quality": ["image-compress", "jpg-compress", "png-compress", "resize-image"],
  "pdf-to-jpg-guide": ["pdf-to-jpg", "pdf-to-png", "pdf-to-webp", "compress-pdf"],
  "resize-images-for-web": ["resize-image", "image-compress", "jpg-to-webp", "png-to-webp"],
  "merge-or-split-pdf": ["merge-pdf", "split-pdf", "pdf-remove-pages", "compress-pdf"],
  "choose-best-image-format-for-web": ["jpg-to-webp", "png-to-webp", "image-compress", "resize-image"],
  "how-to-remove-pages-from-pdf": ["pdf-remove-pages", "split-pdf", "merge-pdf", "compress-pdf"],
  "prepare-images-for-upload": ["heic-to-jpg", "image-compress", "resize-image", "jpg-to-png"],
  "iphone-photos-to-pdf": ["heic-to-jpg", "image-to-pdf", "compress-pdf", "jpg-compress"],
  "parquet-csv-workflows": ["parquet-to-csv", "csv-to-parquet"],
  "optimize-blog-and-site-images": ["image-compress", "jpg-to-webp", "png-to-webp", "resize-image"],
  "heic-cannot-open-windows": ["heic-to-jpg", "heic-to-png", "jpg-compress", "image-compress"],
  "send-large-photos-by-email": ["image-compress", "resize-image", "heic-to-jpg", "image-to-pdf"],
  "pdf-upload-size-limit": ["compress-pdf", "pdf-remove-pages", "split-pdf", "merge-pdf"],
  "what-is-webp": ["webp-to-jpg", "webp-to-png", "jpg-to-webp", "png-to-webp"],
  "convert-images-on-smartphone": ["heic-to-jpg", "image-compress", "resize-image", "jpg-to-png"],
  "jpg-vs-jpeg-difference": ["png-to-jpg", "heic-to-jpg", "webp-to-jpg", "jpg-compress"],
  "screenshot-to-pdf": ["image-to-pdf", "compress-pdf", "pdf-to-png", "pdf-to-jpg"],
  "resume-photo-size": ["heic-to-jpg", "crop-image", "resize-image", "jpg-compress"],
  "what-is-tiff": ["tiff-to-jpg", "tiff-to-png", "image-to-pdf", "image-compress"],
  "marketplace-product-photos": ["crop-image", "image-compress", "heic-to-jpg", "resize-image"],
  "png-transparency-basics": ["png-to-webp", "png-to-jpg", "png-compress", "image-compress"],
  "csv-encoding-fix": ["csv-to-json", "json-to-csv", "csv-to-parquet"],
  "what-is-parquet": ["parquet-to-csv", "csv-to-parquet", "json-to-csv"],
  "json-and-csv": ["json-to-csv", "csv-to-json", "csv-to-parquet"],
  "base64-data-uri-for-web-development": ["image-to-base64", "image-compress", "jpg-to-webp", "png-to-webp"],
  "what-is-avif": ["avif-to-jpg", "avif-to-png", "jpg-to-webp", "image-compress"],
  "grayscale-photo": ["grayscale-image", "image-compress", "resize-image", "crop-image"],
  "add-watermark-to-image": ["watermark-image", "resize-image", "image-compress", "crop-image"],
  "crop-image-to-square": ["crop-image", "resize-image", "image-compress", "grayscale-image"],
  "remove-photo-location-data": ["remove-exif", "image-compress", "resize-image", "watermark-image"],
  "how-to-create-favicon": ["favicon-generator", "png-to-jpg", "ico-to-png", "resize-image"],
  "how-to-create-ogp-image": ["ogp-image-maker", "social-image-resize", "resize-image", "image-compress"],
  "social-media-image-sizes": ["social-image-resize", "resize-image", "crop-image", "image-compress"],
  "extract-color-palette-from-image": ["color-palette-extractor", "ogp-image-maker", "grayscale-image", "image-to-base64"],
};

export function getGuideRelatedTools(
  locale: ToolDirectoryLocale,
  slug: string,
): ToolDirectoryItem[] {
  const slugs = guideToolMap[slug] ?? [];
  return getToolItems(locale, slugs);
}
