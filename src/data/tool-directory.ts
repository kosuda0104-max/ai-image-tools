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
  { slug: "avif-to-webp", jaName: "AVIF を WebP に変換", jaDescription: "AVIFをWebPへ変換し、Web掲載やCMSで扱いやすくします。", enName: "AVIF to WebP", enDescription: "Convert AVIF images to WebP for wider web and CMS compatibility." },
  { slug: "bmp-to-jpg", jaName: "BMP を JPG に変換", jaDescription: "重くなりがちな BMP を JPG に変換して扱いやすくします。", enName: "BMP to JPG", enDescription: "Turn heavy BMP files into lighter JPG images." },
  { slug: "bmp-to-png", jaName: "BMP を PNG に変換", jaDescription: "BMP を PNG に変換して、再利用しやすい形に整えます。", enName: "BMP to PNG", enDescription: "Convert BMP files into PNG for easier reuse." },
  { slug: "compress-pdf", jaName: "PDF を圧縮", jaDescription: "提出前や送信前に PDF の容量を抑えたいときに使えます。", enName: "Compress PDF", enDescription: "Reduce PDF size before upload, submission, or sharing." },
  { slug: "crop-image", jaName: "画像切り抜き", jaDescription: "不要な余白や写したくない範囲を取り除けます。", enName: "Crop Image", enDescription: "Trim away extra margins or unwanted parts of an image." },
  { slug: "remove-exif", jaName: "EXIF・位置情報削除", jaDescription: "写真のEXIFやGPS位置情報を削除して、安全に共有できます。JPEGは画質を保ったまま除去します。", enName: "Remove EXIF & GPS", enDescription: "Strip EXIF and GPS location data from photos before sharing. JPEG is cleaned losslessly." },
  { slug: "favicon-generator", jaName: "favicon.ico 作成", jaDescription: "PNG・JPGから favicon.ico と各種PNGアイコンを一括生成します。HTML埋め込みコード付き。", enName: "Favicon Generator", enDescription: "Generate favicon.ico and PNG icons from a PNG or JPG, with a ready-to-paste HTML snippet." },
  { slug: "social-image-resize", jaName: "SNS画像リサイズ", jaDescription: "X・Instagram・YouTube など各SNSの推奨サイズにワンクリックでリサイズします。縦横比を保持。", enName: "Social Media Image Resizer", enDescription: "Resize images to recommended sizes for X, Instagram, YouTube, and more in one click, keeping aspect ratio." },
  { slug: "ogp-image-maker", jaName: "OGP画像メーカー", jaDescription: "タイトルと色を入れるだけでOGP画像（1200×630）を作成。ブログ・Qiita・Zenn・個人開発向け。", enName: "OGP Image Maker", enDescription: "Create OGP images (1200×630) by entering a title and colors. Great for blogs, Qiita, Zenn, and indie projects." },
  { slug: "color-palette-extractor", jaName: "カラーパレット抽出", jaDescription: "画像から主要な色を抽出し、HEX・RGB・CSS変数として取得できます。配色決めに。", enName: "Color Palette Extractor", enDescription: "Extract dominant colors from an image as HEX, RGB, and CSS variables for picking a palette." },
  { slug: "flip-image", jaName: "画像反転", jaDescription: "左右反転や上下反転をすばやく行えます。", enName: "Flip Image", enDescription: "Flip images horizontally or vertically in one step." },
  { slug: "gif-to-jpg", jaName: "GIF を JPG に変換", jaDescription: "GIF 画像を静止画の JPG に変換したいときに使えます。", enName: "GIF to JPG", enDescription: "Convert GIF images into still JPG output." },
  { slug: "gif-to-png", jaName: "GIF を PNG に変換", jaDescription: "GIF 画像を PNG に変換して編集しやすくします。", enName: "GIF to PNG", enDescription: "Convert GIF images into PNG for easier editing." },
  { slug: "grayscale-image", jaName: "画像を白黒化", jaDescription: "カラー画像を落ち着いたモノクロ表現に変えられます。", enName: "Grayscale Image", enDescription: "Turn a color image into grayscale." },
  { slug: "image-to-base64", jaName: "画像を Base64 に変換", jaDescription: "画像を Base64 文字列に変換して、HTML・CSS・API にインラインで埋め込めます。", enName: "Image to Base64", enDescription: "Convert images to Base64 strings for inline use in HTML, CSS, and APIs." },
  { slug: "base64-to-image", jaName: "Base64 を画像に変換", jaDescription: "Base64文字列やdata URLを画像ファイルに戻して、プレビューとダウンロードができます。", enName: "Base64 to Image", enDescription: "Convert Base64 strings and data URLs back into downloadable image files." },
  { slug: "heic-to-jpg", jaName: "HEIC を JPG に変換", jaDescription: "iPhone 写真を幅広い環境で扱いやすい JPG に変換します。", enName: "HEIC to JPG", enDescription: "Convert iPhone HEIC photos into widely supported JPG." },
  { slug: "heic-to-png", jaName: "HEIC を PNG に変換", jaDescription: "HEIC 画像を PNG にして、編集用に残しやすくします。", enName: "HEIC to PNG", enDescription: "Convert HEIC images into PNG for editing workflows." },
  { slug: "ico-to-jpg", jaName: "ICO を JPG に変換", jaDescription: "アイコン画像を JPG として書き出したいときに便利です。", enName: "ICO to JPG", enDescription: "Convert ICO files into JPG images." },
  { slug: "ico-to-png", jaName: "ICO を PNG に変換", jaDescription: "ICO ファイルを PNG にして再利用しやすくします。", enName: "ICO to PNG", enDescription: "Convert ICO files into reusable PNG images." },
  { slug: "image-compress", jaName: "画像圧縮", jaDescription: "JPG、PNG、WebP の容量を公開前に軽く調整できます。", enName: "Image Compress", enDescription: "Trim image size before publishing, uploading, or sharing." },
  { slug: "image-background-transparent", jaName: "画像の背景を透明化", jaDescription: "白背景や単色背景を選択して、透明PNGとして保存できます。", enName: "Make Background Transparent", enDescription: "Remove a solid image background and export a transparent PNG." },
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
  { slug: "svg-to-webp", jaName: "SVG を WebP に変換", jaDescription: "SVG を WebP にして、Web掲載向けの軽い画像として保存できます。", enName: "SVG to WebP", enDescription: "Convert SVG into lightweight WebP output for web publishing." },
  { slug: "tiff-to-jpg", jaName: "TIFF を JPG に変換", jaDescription: "TIFF 画像を軽めの JPG に変換して扱いやすくします。", enName: "TIFF to JPG", enDescription: "Convert TIFF images into lighter JPG files." },
  { slug: "tiff-to-pdf", jaName: "複数ページ TIFF を PDF に変換", jaDescription: "TIFF内の全ページを順番どおり1つのPDFへ変換します。", enName: "Multi-page TIFF to PDF", enDescription: "Convert every page in a TIFF file into one ordered PDF." },
  { slug: "tiff-to-png", jaName: "TIFF を PNG に変換", jaDescription: "TIFF 画像を PNG に変換して編集や共有に使いやすくします。", enName: "TIFF to PNG", enDescription: "Convert TIFF images into PNG for easier editing or sharing." },
  { slug: "csv-to-json", jaName: "CSV を JSON に変換", jaDescription: "CSV ファイルをブラウザ上で JSON に変換できます。スプレッドシートのデータを API や開発ツールで使いやすい形に。", enName: "CSV to JSON", enDescription: "Convert CSV files to JSON in your browser. Turn spreadsheet data into a JSON array for APIs and developer workflows." },
  { slug: "csv-delimiter-converter", jaName: "CSV 区切り文字変換", jaDescription: "カンマ・セミコロン・タブ・パイプ区切りを相互変換します。", enName: "CSV Delimiter Converter", enDescription: "Convert comma, semicolon, tab, and pipe-delimited files." },
  { slug: "csv-encoding-fix", jaName: "CSV文字化け修正", jaDescription: "Shift-JIS・UTF-16・UTF-8のCSVを読み直し、Excelで開きやすいUTF-8 BOM付きCSVへ整えます。", enName: "Fix CSV Encoding", enDescription: "Fix garbled CSV text by converting Shift-JIS, UTF-16, or UTF-8 into an Excel-friendly UTF-8 CSV." },
  { slug: "csv-to-parquet", jaName: "CSV を Parquet に変換", jaDescription: "CSV ファイルをブラウザ上で Parquet に変換できます。AWS S3・BigQuery・Spark への取り込みに。", enName: "CSV to Parquet", enDescription: "Convert CSV files to Parquet in your browser. Ideal for AWS S3, BigQuery, and Spark." },
  { slug: "dynamodb-json-converter", jaName: "DynamoDB JSON変換", jaDescription: "DynamoDBの型付きJSON・JSONL・JSON.GZを通常JSON、CSV、Excelへ変換します。", enName: "DynamoDB JSON Converter", enDescription: "Convert DynamoDB typed JSON, JSONL, and JSON.GZ exports to plain JSON, CSV, or Excel." },
  { slug: "textract-json-to-excel", jaName: "Textract JSONをExcelに変換", jaDescription: "Amazon TextractのBlockから表・フォーム・本文を復元し、ExcelまたはCSVへ変換します。", enName: "Textract JSON to Excel", enDescription: "Reconstruct Amazon Textract tables, forms, and text into Excel or CSV." },
  { slug: "cloudtrail-log-to-csv", jaName: "CloudTrailログをCSVに変換", jaDescription: "複数のCloudTrail .json.gz監査ログを結合し、CSVまたはJSONLへ変換します。", enName: "CloudTrail Log to CSV", enDescription: "Merge CloudTrail .json.gz audit logs and convert them to CSV or JSONL." },
  { slug: "s3-inventory-viewer", jaName: "S3 Inventoryビューアー", jaDescription: "manifestとCSV.GZ・Parquetを読み、S3オブジェクト一覧を表示・結合します。", enName: "S3 Inventory Viewer", enDescription: "Open and merge S3 Inventory manifest, CSV.GZ, and Parquet data." },
  { slug: "cloudwatch-logs-converter", jaName: "CloudWatch Logs変換", jaDescription: "S3へ出力した.gzログを結合・時刻順に整列し、CSVまたはJSONLへ変換します。", enName: "CloudWatch Logs Converter", enDescription: "Merge, sort, and convert CloudWatch Logs .gz exports to CSV or JSONL." },
  { slug: "transcribe-json-to-srt", jaName: "Transcribe JSONをSRTに変換", jaDescription: "Amazon Transcribe JSONからSRT・VTT・TXT字幕を作成します。", enName: "Transcribe JSON to SRT", enDescription: "Create SRT, VTT, or TXT subtitles from Amazon Transcribe JSON." },
  { slug: "json-to-csv", jaName: "JSON を CSV に変換", jaDescription: "JSON ファイルをブラウザ上で CSV に変換できます。API レスポンスや DB エクスポートを Excel・スプレッドシートで開ける形に。", enName: "JSON to CSV", enDescription: "Convert JSON files to CSV in your browser. Turn API responses and database exports into spreadsheet-ready CSV files." },
  { slug: "jsonl-to-csv", jaName: "JSONL・NDJSON を CSV に変換", jaDescription: "1行1JSONのログやデータセットをCSVへ変換します。", enName: "JSONL to CSV", enDescription: "Convert JSONL and NDJSON logs or datasets into CSV." },
  { slug: "json-to-excel", jaName: "JSON を Excel に変換", jaDescription: "JSONファイルをブラウザ上でExcel（.xlsx）に変換し、APIレスポンスやDB出力を表で確認できます。", enName: "JSON to Excel", enDescription: "Convert JSON files to Excel (.xlsx) in your browser for spreadsheet review." },
  { slug: "parquet-to-csv", jaName: "Parquet を CSV に変換", jaDescription: "Parquet ファイルをブラウザ上で CSV に変換できます。AWS・BigQuery データ作業に。", enName: "Parquet to CSV", enDescription: "Convert Parquet files to CSV in your browser. Great for AWS and BigQuery workflows." },
  { slug: "parquet-to-excel", jaName: "Parquet を Excel に変換", jaDescription: "ParquetファイルをExcel（.xlsx）へ変換し、データ基盤の出力を表で確認できます。", enName: "Parquet to Excel", enDescription: "Convert Parquet files to Excel (.xlsx) for data-platform inspection and sharing." },
  { slug: "parquet-viewer", jaName: "Parquet ビューアー", jaDescription: "Parquetのスキーマ、型、圧縮方式、行数と先頭データを確認します。", enName: "Parquet Viewer", enDescription: "Inspect Parquet schema, codecs, row count, and sample rows." },
  { slug: "watermark-image", jaName: "画像に透かしを追加", jaDescription: "画像に名前や注意書きを重ねて保存できます。", enName: "Watermark Image", enDescription: "Add a text watermark or note onto an image." },
  { slug: "webp-compress", jaName: "WebP 圧縮", jaDescription: "WebP の軽さを活かしつつ、さらにサイズを抑えたいときに使えます。", enName: "WebP Compress", enDescription: "Reduce WebP size even further for web delivery." },
  { slug: "webp-to-jpg", jaName: "WebP を JPG に変換", jaDescription: "WebP を JPG にして、より広い環境で扱いやすくします。", enName: "WebP to JPG", enDescription: "Convert WebP into JPG for broader compatibility." },
  { slug: "webp-to-png", jaName: "WebP を PNG に変換", jaDescription: "WebP を PNG に変えて、再編集しやすい形で残せます。", enName: "WebP to PNG", enDescription: "Convert WebP into PNG for easier follow-up editing." },
];

export const TOOL_COUNT = toolEntries.length;

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
    href: locale === "en" ? `/en/tools/${slug}` : `/tools/${slug}`,
  };
}

export function getToolItems(
  locale: ToolDirectoryLocale,
  slugs: readonly string[],
): ToolDirectoryItem[] {
  return slugs.map((slug) => getToolItem(locale, slug));
}

export function getAllToolItems(locale: ToolDirectoryLocale): ToolDirectoryItem[] {
  return toolEntries.map((entry) => ({
    slug: entry.slug,
    name: locale === "ja" ? entry.jaName : entry.enName,
    description: locale === "ja" ? entry.jaDescription : entry.enDescription,
    href: locale === "en" ? `/en/tools/${entry.slug}` : `/tools/${entry.slug}`,
  }));
}

