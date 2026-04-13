export type ToolDirectoryLocale = "ja" | "en";

export type ToolDirectoryItem = {
  slug: string;
  name: string;
  description: string;
  href: string;
};

type ToolEntry = {
  slug: string;
  jaName: string;
  jaDescription: string;
  enName: string;
  enDescription: string;
};

const toolEntries: ToolEntry[] = [
  { slug: "avif-to-jpg", jaName: "AVIFをJPGに変換", jaDescription: "AVIF画像をJPG形式に変換できます。", enName: "AVIF to JPG", enDescription: "Convert AVIF to JPG." },
  { slug: "avif-to-png", jaName: "AVIFをPNGに変換", jaDescription: "AVIF画像をPNG形式に変換できます。", enName: "AVIF to PNG", enDescription: "Convert AVIF to PNG." },
  { slug: "bmp-to-jpg", jaName: "BMPをJPGに変換", jaDescription: "BMP画像をJPG形式に変換できます。", enName: "BMP to JPG", enDescription: "Convert BMP to JPG." },
  { slug: "bmp-to-png", jaName: "BMPをPNGに変換", jaDescription: "BMP画像をPNG形式に変換できます。", enName: "BMP to PNG", enDescription: "Convert BMP to PNG." },
  { slug: "compress-pdf", jaName: "PDF圧縮ツール", jaDescription: "PDFのファイルサイズを軽くできます。", enName: "Compress PDF", enDescription: "Reduce PDF file size." },
  { slug: "crop-image", jaName: "画像切り抜きツール", jaDescription: "画像を切り抜いて必要な範囲だけ残せます。", enName: "Crop Image", enDescription: "Crop an image." },
  { slug: "flip-image", jaName: "画像反転ツール", jaDescription: "画像を左右または上下に反転できます。", enName: "Flip Image", enDescription: "Flip an image." },
  { slug: "gif-to-jpg", jaName: "GIFをJPGに変換", jaDescription: "GIF画像をJPG形式に変換できます。", enName: "GIF to JPG", enDescription: "Convert GIF to JPG." },
  { slug: "gif-to-png", jaName: "GIFをPNGに変換", jaDescription: "GIF画像をPNG形式に変換できます。", enName: "GIF to PNG", enDescription: "Convert GIF to PNG." },
  { slug: "grayscale-image", jaName: "画像を白黒化", jaDescription: "画像を白黒に変換できます。", enName: "Grayscale Image", enDescription: "Convert an image to grayscale." },
  { slug: "heic-to-jpg", jaName: "HEICをJPGに変換", jaDescription: "HEIC画像をJPG形式に変換できます。", enName: "HEIC to JPG", enDescription: "Convert HEIC to JPG." },
  { slug: "heic-to-png", jaName: "HEICをPNGに変換", jaDescription: "HEIC画像をPNG形式に変換できます。", enName: "HEIC to PNG", enDescription: "Convert HEIC to PNG." },
  { slug: "ico-to-jpg", jaName: "ICOをJPGに変換", jaDescription: "ICO画像をJPG形式に変換できます。", enName: "ICO to JPG", enDescription: "Convert ICO to JPG." },
  { slug: "ico-to-png", jaName: "ICOをPNGに変換", jaDescription: "ICO画像をPNG形式に変換できます。", enName: "ICO to PNG", enDescription: "Convert ICO to PNG." },
  { slug: "image-compress", jaName: "画像圧縮ツール", jaDescription: "JPG・PNG・WebP画像をまとめて圧縮できます。", enName: "Image Compress", enDescription: "Compress JPG, PNG, and WebP images." },
  { slug: "image-to-pdf", jaName: "画像をPDFに変換", jaDescription: "画像を1つのPDFにまとめられます。", enName: "Image to PDF", enDescription: "Convert images to PDF." },
  { slug: "jpg-compress", jaName: "JPG圧縮", jaDescription: "JPG画像のファイルサイズを軽くできます。", enName: "JPG Compress", enDescription: "Compress JPG files." },
  { slug: "jpg-to-png", jaName: "JPGをPNGに変換", jaDescription: "JPG画像をPNG形式に変換できます。", enName: "JPG to PNG", enDescription: "Convert JPG to PNG." },
  { slug: "jpg-to-webp", jaName: "JPGをWebPに変換", jaDescription: "JPG画像をWebP形式に変換できます。", enName: "JPG to WebP", enDescription: "Convert JPG to WebP." },
  { slug: "merge-pdf", jaName: "PDF結合ツール", jaDescription: "複数のPDFを1つにまとめられます。", enName: "Merge PDF", enDescription: "Merge PDF files." },
  { slug: "pdf-remove-pages", jaName: "PDFページ削除ツール", jaDescription: "PDFから不要なページを削除できます。", enName: "PDF Remove Pages", enDescription: "Remove pages from a PDF." },
  { slug: "pdf-to-jpg", jaName: "PDFをJPGに変換", jaDescription: "PDFのページをJPG画像として書き出せます。", enName: "PDF to JPG", enDescription: "Convert PDF pages to JPG." },
  { slug: "pdf-to-png", jaName: "PDFをPNGに変換", jaDescription: "PDFのページをPNG画像として書き出せます。", enName: "PDF to PNG", enDescription: "Convert PDF pages to PNG." },
  { slug: "pdf-to-webp", jaName: "PDFをWebPに変換", jaDescription: "PDFのページをWebP画像として書き出せます。", enName: "PDF to WebP", enDescription: "Convert PDF pages to WebP." },
  { slug: "png-compress", jaName: "PNG圧縮", jaDescription: "PNG画像の容量をできるだけ軽くできます。", enName: "PNG Compress", enDescription: "Try reducing PNG size." },
  { slug: "png-to-jpg", jaName: "PNGをJPGに変換", jaDescription: "PNG画像をJPG形式に変換できます。", enName: "PNG to JPG", enDescription: "Convert PNG to JPG." },
  { slug: "png-to-webp", jaName: "PNGをWebPに変換", jaDescription: "PNG画像をWebP形式に変換できます。", enName: "PNG to WebP", enDescription: "Convert PNG to WebP." },
  { slug: "resize-image", jaName: "画像リサイズツール", jaDescription: "画像の幅と高さを調整できます。", enName: "Resize Image", enDescription: "Resize an image." },
  { slug: "rotate-image", jaName: "画像回転ツール", jaDescription: "画像を回転して向きを整えられます。", enName: "Rotate Image", enDescription: "Rotate an image." },
  { slug: "rotate-pdf", jaName: "PDF回転ツール", jaDescription: "PDFページの向きを回転できます。", enName: "Rotate PDF", enDescription: "Rotate PDF pages." },
  { slug: "split-pdf", jaName: "PDF分割ツール", jaDescription: "必要なページだけを抜き出して保存できます。", enName: "Split PDF", enDescription: "Extract selected PDF pages." },
  { slug: "svg-to-jpg", jaName: "SVGをJPGに変換", jaDescription: "SVG画像をJPG形式に変換できます。", enName: "SVG to JPG", enDescription: "Convert SVG to JPG." },
  { slug: "svg-to-png", jaName: "SVGをPNGに変換", jaDescription: "SVG画像をPNG形式に変換できます。", enName: "SVG to PNG", enDescription: "Convert SVG to PNG." },
  { slug: "tiff-to-jpg", jaName: "TIFFをJPGに変換", jaDescription: "TIFF画像をJPG形式に変換できます。", enName: "TIFF to JPG", enDescription: "Convert TIFF to JPG." },
  { slug: "tiff-to-png", jaName: "TIFFをPNGに変換", jaDescription: "TIFF画像をPNG形式に変換できます。", enName: "TIFF to PNG", enDescription: "Convert TIFF to PNG." },
  { slug: "watermark-image", jaName: "画像透かし追加ツール", jaDescription: "画像にテキスト透かしを追加できます。", enName: "Watermark Image", enDescription: "Add text watermark to an image." },
  { slug: "webp-compress", jaName: "WebP圧縮", jaDescription: "WebP画像のファイルサイズを軽くできます。", enName: "WebP Compress", enDescription: "Compress WebP files." },
  { slug: "webp-to-jpg", jaName: "WebPをJPGに変換", jaDescription: "WebP画像をJPG形式に変換できます。", enName: "WebP to JPG", enDescription: "Convert WebP to JPG." },
  { slug: "webp-to-png", jaName: "WebPをPNGに変換", jaDescription: "WebP画像をPNG形式に変換できます。", enName: "WebP to PNG", enDescription: "Convert WebP to PNG." },
];

const toolMap = new Map(toolEntries.map((entry) => [entry.slug, entry]));

export function getToolItem(locale: ToolDirectoryLocale, slug: string): ToolDirectoryItem {
  const entry = toolMap.get(slug);

  if (!entry) {
    throw new Error(`Unknown tool slug: ${slug}`);
  }

  return {
    slug,
    name: locale === "ja" ? entry.jaName : entry.enName,
    description:
      locale === "ja" ? entry.jaDescription : entry.enDescription,
    href: `/tools/${slug}`,
  };
}

export function getToolItems(
  locale: ToolDirectoryLocale,
  slugs: readonly string[],
): ToolDirectoryItem[] {
  return slugs.map((slug) => getToolItem(locale, slug));
}
