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
  { slug: "avif-to-jpg", jaName: "AVIF を JPG に変換", jaDescription: "AVIF 画像を、共有しやすい JPG に変換します。", enName: "AVIF to JPG", enDescription: "Convert AVIF images into shareable JPG files." },
  { slug: "avif-to-png", jaName: "AVIF を PNG に変換", jaDescription: "AVIF 画像を、編集しやすい PNG に変換します。", enName: "AVIF to PNG", enDescription: "Convert AVIF images into editable PNG files." },
  { slug: "bmp-to-jpg", jaName: "BMP を JPG に変換", jaDescription: "重くなりがちな BMP を JPG に変換して扱いやすくします。", enName: "BMP to JPG", enDescription: "Turn heavy BMP files into lighter JPG images." },
  { slug: "bmp-to-png", jaName: "BMP を PNG に変換", jaDescription: "BMP を PNG に変換して、再利用しやすい形に整えます。", enName: "BMP to PNG", enDescription: "Convert BMP files into PNG for easier reuse." },
  { slug: "compress-pdf", jaName: "PDF を圧縮", jaDescription: "提出前や送信前に PDF の容量を抑えたいときに使えます。", enName: "Compress PDF", enDescription: "Reduce PDF size before upload, submission, or sharing." },
  { slug: "crop-image", jaName: "画像切り抜き", jaDescription: "不要な余白や写したくない範囲を取り除けます。", enName: "Crop Image", enDescription: "Trim away extra margins or unwanted parts of an image." },
  { slug: "flip-image", jaName: "画像反転", jaDescription: "左右反転や上下反転をすばやく行えます。", enName: "Flip Image", enDescription: "Flip images horizontally or vertically in one step." },
  { slug: "gif-to-jpg", jaName: "GIF を JPG に変換", jaDescription: "GIF 画像を静止画の JPG に変換したいときに使えます。", enName: "GIF to JPG", enDescription: "Convert GIF images into still JPG output." },
  { slug: "gif-to-png", jaName: "GIF を PNG に変換", jaDescription: "GIF 画像を PNG に変換して編集しやすくします。", enName: "GIF to PNG", enDescription: "Convert GIF images into PNG for easier editing." },
  { slug: "grayscale-image", jaName: "画像を白黒化", jaDescription: "カラー画像を落ち着いたモノクロ表現に変えられます。", enName: "Grayscale Image", enDescription: "Turn a color image into grayscale." },
  { slug: "heic-to-jpg", jaName: "HEIC を JPG に変換", jaDescription: "iPhone 写真を幅広い環境で扱いやすい JPG に変換します。", enName: "HEIC to JPG", enDescription: "Convert iPhone HEIC photos into widely supported JPG." },
  { slug: "heic-to-png", jaName: "HEIC を PNG に変換", jaDescription: "HEIC 画像を PNG にして、編集用に残しやすくします。", enName: "HEIC to PNG", enDescription: "Convert HEIC images into PNG for editing workflows." },
  { slug: "ico-to-jpg", jaName: "ICO を JPG に変換", jaDescription: "アイコン画像を JPG として書き出したいときに便利です。", enName: "ICO to JPG", enDescription: "Convert ICO files into JPG images." },
  { slug: "ico-to-png", jaName: "ICO を PNG に変換", jaDescription: "ICO ファイルを PNG にして再利用しやすくします。", enName: "ICO to PNG", enDescription: "Convert ICO files into reusable PNG images." },
  { slug: "image-compress", jaName: "画像圧縮", jaDescription: "JPG、PNG、WebP の容量を公開前に軽く調整できます。", enName: "Image Compress", enDescription: "Trim image size before publishing, uploading, or sharing." },
  { slug: "image-to-pdf", jaName: "画像を PDF に変換", jaDescription: "複数の画像を 1 つの PDF にまとめて提出しやすくします。", enName: "Image to PDF", enDescription: "Combine images into a single PDF for easier submission or sharing." },
  { slug: "jpg-to-pdf", jaName: "JPG を PDF に変換", jaDescription: "JPG 画像を 1 つの PDF にまとめて共有や提出に使いやすくします。", enName: "JPG to PDF", enDescription: "Turn JPG images into a single PDF for sharing or submission." },
  { slug: "jpg-compress", jaName: "JPG 圧縮", jaDescription: "写真系の JPG を軽くしたいときに向いています。", enName: "JPG Compress", enDescription: "Reduce JPG size for photo-heavy workflows." },
  { slug: "jpg-to-png", jaName: "JPG を PNG に変換", jaDescription: "JPG を PNG に変えて、あとから編集しやすくします。", enName: "JPG to PNG", enDescription: "Convert JPG into PNG for cleaner follow-up editing." },
  { slug: "jpg-to-webp", jaName: "JPG を WebP に変換", jaDescription: "JPG を WebP に変えて、Web 公開用に軽く整えます。", enName: "JPG to WebP", enDescription: "Convert JPG into lighter WebP for web delivery." },
  { slug: "merge-pdf", jaName: "PDF 結合", jaDescription: "分かれた PDF を 1 つにまとめて提出しやすくします。", enName: "Merge PDF", enDescription: "Merge separate PDF files into one cleaner document." },
  { slug: "pdf-remove-pages", jaName: "PDF ページ削除", jaDescription: "不要なページだけ外して、必要な内容に絞れます。", enName: "PDF Remove Pages", enDescription: "Remove extra PDF pages and keep only what you need." },
  { slug: "pdf-to-jpg", jaName: "PDF を JPG に変換", jaDescription: "PDF のページを画像として使いたいときに便利です。", enName: "PDF to JPG", enDescription: "Export PDF pages as JPG images for previews or reuse." },
  { slug: "pdf-to-png", jaName: "PDF を PNG に変換", jaDescription: "PDF のページをくっきりした PNG 画像として書き出せます。", enName: "PDF to PNG", enDescription: "Export PDF pages as crisp PNG images." },
  { slug: "pdf-to-webp", jaName: "PDF を WebP に変換", jaDescription: "PDF ページを軽い WebP 画像に変換できます。", enName: "PDF to WebP", enDescription: "Convert PDF pages into lighter WebP images." },
  { slug: "png-compress", jaName: "PNG 圧縮", jaDescription: "PNG の見た目をなるべく保ちながら容量調整を試せます。", enName: "PNG Compress", enDescription: "Try reducing PNG size while protecting its look." },
  { slug: "png-to-jpg", jaName: "PNG を JPG に変換", jaDescription: "PNG を JPG に変えて、共有しやすい軽さに寄せます。", enName: "PNG to JPG", enDescription: "Convert PNG into lighter JPG for easier sharing." },
  { slug: "png-to-webp", jaName: "PNG を WebP に変換", jaDescription: "PNG を WebP にして、公開向けに軽量化できます。", enName: "PNG to WebP", enDescription: "Convert PNG into lighter WebP for publishing." },
  { slug: "resize-image", jaName: "画像リサイズ", jaDescription: "画像の幅や高さを用途に合わせて整えられます。", enName: "Resize Image", enDescription: "Resize image dimensions for the destination you need." },
  { slug: "rotate-image", jaName: "画像回転", jaDescription: "向きがずれた画像を見やすい向きに直せます。", enName: "Rotate Image", enDescription: "Rotate images into the correct orientation." },
  { slug: "rotate-pdf", jaName: "PDF 回転", jaDescription: "縦横がずれた PDF ページの向きを整えます。", enName: "Rotate PDF", enDescription: "Fix the orientation of PDF pages." },
  { slug: "split-pdf", jaName: "PDF 分割", jaDescription: "必要なページだけ抜き出して別ファイルにできます。", enName: "Split PDF", enDescription: "Extract only the PDF pages you actually need." },
  { slug: "svg-to-jpg", jaName: "SVG を JPG に変換", jaDescription: "SVG を JPG に変えて共有しやすくします。", enName: "SVG to JPG", enDescription: "Convert SVG into shareable JPG output." },
  { slug: "svg-to-png", jaName: "SVG を PNG に変換", jaDescription: "SVG を PNG にして画像素材として使いやすくします。", enName: "SVG to PNG", enDescription: "Convert SVG into PNG for easier image reuse." },
  { slug: "tiff-to-jpg", jaName: "TIFF を JPG に変換", jaDescription: "TIFF 画像を軽めの JPG に変換して扱いやすくします。", enName: "TIFF to JPG", enDescription: "Convert TIFF images into lighter JPG files." },
  { slug: "tiff-to-png", jaName: "TIFF を PNG に変換", jaDescription: "TIFF 画像を PNG に変換して編集や共有に使いやすくします。", enName: "TIFF to PNG", enDescription: "Convert TIFF images into PNG for easier editing or sharing." },
  { slug: "watermark-image", jaName: "画像に透かしを追加", jaDescription: "画像に名前や注意書きを重ねて保存できます。", enName: "Watermark Image", enDescription: "Add a text watermark or note onto an image." },
  { slug: "webp-compress", jaName: "WebP 圧縮", jaDescription: "WebP の軽さを活かしつつ、さらにサイズを抑えたいときに使えます。", enName: "WebP Compress", enDescription: "Reduce WebP size even further for web delivery." },
  { slug: "webp-to-jpg", jaName: "WebP を JPG に変換", jaDescription: "WebP を JPG にして、より広い環境で扱いやすくします。", enName: "WebP to JPG", enDescription: "Convert WebP into JPG for broader compatibility." },
  { slug: "webp-to-png", jaName: "WebP を PNG に変換", jaDescription: "WebP を PNG に変えて、再編集しやすい形で残せます。", enName: "WebP to PNG", enDescription: "Convert WebP into PNG for easier follow-up editing." },
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

