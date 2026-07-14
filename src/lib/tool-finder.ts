export type ToolFinderLocale = "ja" | "en";

export type FindableTool = {
  slug: string;
  name: string;
  description: string;
  href: string;
};

type FileDescriptor = {
  name: string;
  type: string;
};

const fileRecommendations: Record<string, readonly string[]> = {
  jpg: [
    "image-compress",
    "jpg-compress",
    "jpg-to-png",
    "jpg-to-webp",
    "resize-image",
    "crop-image",
    "image-background-transparent",
    "image-to-pdf",
    "remove-exif",
  ],
  png: [
    "png-to-jpg",
    "png-to-webp",
    "png-compress",
    "resize-image",
    "crop-image",
    "image-background-transparent",
    "image-to-pdf",
  ],
  webp: [
    "webp-to-jpg",
    "webp-to-png",
    "webp-compress",
    "resize-image",
    "crop-image",
    "image-to-pdf",
  ],
  heic: ["heic-to-jpg", "heic-to-png"],
  avif: ["avif-to-webp", "avif-to-jpg", "avif-to-png"],
  gif: ["gif-to-png", "gif-to-jpg"],
  svg: ["svg-to-png", "svg-to-webp", "svg-to-jpg", "image-to-base64"],
  bmp: ["bmp-to-jpg", "bmp-to-png"],
  tiff: ["tiff-to-pdf", "tiff-to-png", "tiff-to-jpg"],
  ico: ["ico-to-png", "ico-to-jpg"],
  pdf: [
    "compress-pdf",
    "merge-pdf",
    "split-pdf",
    "pdf-remove-pages",
    "rotate-pdf",
    "pdf-to-jpg",
    "pdf-to-png",
    "pdf-to-webp",
  ],
  csv: [
    "csv-encoding-fix",
    "csv-delimiter-converter",
    "csv-to-json",
    "csv-to-parquet",
  ],
  tsv: ["csv-delimiter-converter", "csv-encoding-fix"],
  txt: ["csv-delimiter-converter", "csv-encoding-fix"],
  json: ["json-to-excel", "json-to-csv"],
  jsonl: ["jsonl-to-csv"],
  ndjson: ["jsonl-to-csv"],
  parquet: ["parquet-viewer", "parquet-to-csv", "parquet-to-excel"],
};

const mimeFormats: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heic",
  "image/avif": "avif",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/bmp": "bmp",
  "image/tiff": "tiff",
  "image/x-icon": "ico",
  "application/pdf": "pdf",
  "text/csv": "csv",
  "text/tab-separated-values": "tsv",
  "application/json": "json",
  "application/x-ndjson": "ndjson",
  "application/vnd.apache.parquet": "parquet",
};

const aliases: Record<
  string,
  Record<ToolFinderLocale, readonly string[]>
> = {
  "image-compress": {
    ja: ["画像を軽くしたい", "画像の容量を小さく", "画像サイズが大きい", "アップロード上限"],
    en: ["make image smaller", "image file too large", "reduce image size", "upload limit"],
  },
  "jpg-compress": {
    ja: ["jpgを軽く", "写真の容量を減らす", "jpeg圧縮"],
    en: ["compress jpg", "reduce photo size", "compress jpeg"],
  },
  "png-compress": {
    ja: ["pngを軽く", "png容量を減らす"],
    en: ["compress png", "reduce png size"],
  },
  "webp-compress": {
    ja: ["webpを軽く", "webp容量を減らす"],
    en: ["compress webp", "reduce webp size"],
  },
  "image-background-transparent": {
    ja: ["画像の背景を透明に", "背景を透明に", "白背景を消す", "背景透過", "透過png"],
    en: ["make background transparent", "remove white background", "transparent background", "transparent png"],
  },
  "heic-to-jpg": {
    ja: ["iphone写真が開けない", "heicが開けない", "iphone写真をjpg", "写真を送れない"],
    en: ["iphone photo will not open", "cannot open heic", "iphone photo to jpg", "heic upload rejected"],
  },
  "avif-to-jpg": {
    ja: ["avifが開けない", "avifをjpg"],
    en: ["cannot open avif", "avif to jpg"],
  },
  "avif-to-webp": {
    ja: ["avifをwebp", "cmsがavif非対応"],
    en: ["avif to webp", "cms does not support avif"],
  },
  "webp-to-jpg": {
    ja: ["webpが開けない", "webpをjpg", "webpを送れない"],
    en: ["cannot open webp", "webp to jpg", "webp upload rejected"],
  },
  "resize-image": {
    ja: ["画像サイズを変更", "画像の幅を変える", "画像の高さを変える", "ピクセル数を変更"],
    en: ["change image dimensions", "change image width", "resize photo", "change pixels"],
  },
  "crop-image": {
    ja: ["画像を切り抜く", "余白を消す", "正方形に切り抜く", "トリミング"],
    en: ["crop image", "remove image margins", "crop square", "trim photo"],
  },
  "rotate-image": {
    ja: ["画像の向きを直す", "写真が横向き", "画像を回転"],
    en: ["photo is sideways", "rotate image", "fix image orientation"],
  },
  "remove-exif": {
    ja: ["位置情報を消す", "写真のgpsを削除", "exifを削除"],
    en: ["remove photo location", "remove gps from photo", "delete exif"],
  },
  "image-to-pdf": {
    ja: ["画像をpdfにまとめる", "写真を1つのpdf", "画像を提出用pdf"],
    en: ["combine images into pdf", "photos into one pdf", "create submission pdf"],
  },
  "merge-pdf": {
    ja: ["pdfを1つにまとめる", "pdfを結合", "複数pdfをまとめる"],
    en: ["combine pdf files", "merge pdf", "join pdf files"],
  },
  "split-pdf": {
    ja: ["pdfを分ける", "pdfをページごとに分割", "pdfの一部を抜き出す"],
    en: ["split pdf", "separate pdf pages", "extract pdf pages"],
  },
  "pdf-remove-pages": {
    ja: ["pdfの不要ページを消す", "pdfからページを削除", "余計なページを消す"],
    en: ["delete unwanted pdf pages", "remove pages from pdf", "delete a pdf page"],
  },
  "compress-pdf": {
    ja: ["pdfを軽く", "pdf容量を小さく", "pdfが大きすぎる"],
    en: ["make pdf smaller", "reduce pdf size", "pdf file too large"],
  },
  "rotate-pdf": {
    ja: ["pdfの向きを直す", "pdfが横向き", "pdfを回転"],
    en: ["pdf is sideways", "rotate pdf", "fix pdf orientation"],
  },
  "tiff-to-pdf": {
    ja: ["複数ページtiffをpdf", "faxをpdf", "tifをpdf"],
    en: ["multi page tiff to pdf", "fax tiff to pdf", "tif to pdf"],
  },
  "csv-encoding-fix": {
    ja: ["csv文字化け", "csvの文字化けを直す", "shift-jisをutf-8", "excelで文字化け"],
    en: ["garbled csv", "fix csv encoding", "shift jis to utf 8", "csv mojibake"],
  },
  "csv-delimiter-converter": {
    ja: ["csvが1列になる", "csvが一列になる", "セミコロンcsv", "tsvをcsv", "区切り文字を変える"],
    en: ["csv opens in one column", "semicolon csv", "tsv to csv", "change csv delimiter"],
  },
  "jsonl-to-csv": {
    ja: ["jsonlをcsv", "ndjsonをcsv", "ログをcsv"],
    en: ["jsonl to csv", "ndjson to csv", "log file to csv"],
  },
  "json-to-excel": {
    ja: ["jsonをexcelで開く", "apiレスポンスを表に", "jsonをxlsx"],
    en: ["open json in excel", "api response to spreadsheet", "json to xlsx"],
  },
  "parquet-viewer": {
    ja: ["parquetの中身を見る", "parquetを開く", "parquetのスキーマを確認"],
    en: ["view parquet contents", "open parquet", "inspect parquet schema"],
  },
  "parquet-to-excel": {
    ja: ["parquetをexcelで開く", "parquetをxlsx"],
    en: ["open parquet in excel", "parquet to xlsx"],
  },
  "base64-to-image": {
    ja: ["base64を画像に戻す", "data urlを画像に"],
    en: ["decode base64 image", "data url to image"],
  },
  "image-to-base64": {
    ja: ["画像をbase64に", "画像をhtmlに埋め込む"],
    en: ["image to base64", "embed image in html"],
  },
};

function normalize(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u3000\s]+/g, " ")
    .trim();
}

function compact(value: string) {
  return normalize(value).replace(
    /[\s.,!?！？。、・:：;；()[\]{}「」『』'"`~^|\\/_-]+/g,
    "",
  );
}

export function detectFileFormat(file: FileDescriptor) {
  const extension = file.name.match(/\.([^.]+)$/)?.[1]?.toLowerCase();
  const normalizedExtension =
    extension === "jpeg"
      ? "jpg"
      : extension === "tif"
        ? "tiff"
        : extension === "heif"
          ? "heic"
          : extension;

  if (normalizedExtension && fileRecommendations[normalizedExtension]) {
    return normalizedExtension;
  }

  return mimeFormats[file.type.toLowerCase()] ?? null;
}

export function getFileRecommendationSlugs(file: FileDescriptor) {
  const format = detectFileFormat(file);
  return format ? fileRecommendations[format] ?? [] : [];
}

export function searchToolsByIntent(
  tools: readonly FindableTool[],
  query: string,
  locale: ToolFinderLocale,
) {
  const normalizedQuery = normalize(query);
  const compactQuery = compact(query);
  if (!compactQuery) return [];

  const queryTokens = normalizedQuery
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length > 0);

  return tools
    .map((tool, index) => {
      const normalizedName = normalize(tool.name);
      const compactName = compact(tool.name);
      const normalizedTarget = normalize(
        `${tool.name} ${tool.description} ${tool.slug}`,
      );
      const compactTarget = compact(normalizedTarget);
      let score = 0;

      if (compactName === compactQuery) score += 160;
      if (compactTarget.includes(compactQuery)) score += 90;
      if (compactQuery.includes(compactName)) score += 50;

      for (const alias of aliases[tool.slug]?.[locale] ?? []) {
        const compactAlias = compact(alias);
        if (compactAlias === compactQuery) score += 180;
        else if (
          compactQuery.includes(compactAlias) ||
          compactAlias.includes(compactQuery)
        ) {
          score += 120;
        }
      }

      const matchedTokens = queryTokens.filter((token) =>
        normalizedTarget.includes(token),
      ).length;
      score += matchedTokens * 8;
      if (queryTokens.length > 1 && matchedTokens === queryTokens.length) {
        score += 24;
      }

      if (normalizedName.startsWith(normalizedQuery)) score += 20;
      return { tool, index, score };
    })
    .filter((result) => result.score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map((result) => result.tool);
}
