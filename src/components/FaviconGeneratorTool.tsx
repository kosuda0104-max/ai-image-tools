"use client";

import { useEffect, useMemo, useState } from "react";
import { zipSync } from "fflate";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";

type Locale = "ja" | "en";

type FAQItem = {
  question: string;
  answer: string;
};

type RelatedToolItem = {
  name: string;
  href: string;
};

type PageContent = {
  title: string;
  description: string;
  aboutTitle: string;
  aboutText: string;
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: FAQItem[];
  relatedTools: RelatedToolItem[];
};

type UIContent = {
  emptyTitle: string;
  emptyDescription: string;
  selectButtonLabel: string;
  dropHereLabel: string;
  clickToSelectLabel: string;
  selectedFileLabel: string;
  selectedImageTitle: string;
  fileNameLabel: string;
  fileSizeLabel: string;
  squareHint: string;
  outputTitle: string;
  outputItems: string[];
  previewTitle: string;
  generateButton: string;
  generatingButton: string;
  downloadZipButton: string;
  downloadIcoButton: string;
  resetButton: string;
  htmlSnippetTitle: string;
  copyButton: string;
  copiedLabel: string;
  invalidFileError: string;
  processingStatus: string;
  successMessage: string;
  generateError: string;
};

type ToolContent = {
  page: PageContent;
  ui: UIContent;
};

type Props = {
  locale: Locale;
};

const HTML_SNIPPET = `<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`;

const content: Record<Locale, ToolContent> = {
  ja: {
    page: {
      title: "PNGからfavicon.ico作成ツール",
      description:
        "PNGやJPG画像から favicon.ico（16×16・32×32・48×48 のマルチサイズ）と各種PNGアイコンをブラウザ上で一括生成できる無料ツールです。アップロード不要で、HTML埋め込み用のコードも出力します。",
      aboutTitle: "favicon作成ツールとは？",
      aboutText:
        "favicon（ファビコン）は、ブラウザのタブやブックマークに表示されるサイトのアイコンです。このツールは、用意したPNG・JPG画像から、複数解像度を内包した favicon.ico と、16×16・32×32・48×48 のPNG、さらにスマホ用の apple-touch-icon（180×180）をまとめて生成します。すべてブラウザ内で処理するため、画像をサーバーへアップロードする必要はありません。生成物はZIPで一括ダウンロードでき、HTMLに貼り付けるだけで使える <link> タグも出力します。個人開発やブログ、社内ツールのアイコン設定にそのまま使えます。",
      stepsTitle: "使い方",
      steps: [
        "正方形に近いPNG / JPG画像を選択します（推奨: 512×512以上）",
        "プレビューで各サイズの見え方を確認します",
        "「faviconを生成」ボタンを押します",
        "favicon.ico と各PNGをZIPでまとめてダウンロードします",
        "出力されたHTMLタグを <head> に貼り付けます",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画像はアップロードされますか？",
          answer:
            "いいえ。すべてブラウザ内で処理されるため、画像が外部サーバーに送信されることはありません。",
        },
        {
          question: "favicon.ico には複数サイズが含まれますか？",
          answer:
            "はい。生成される favicon.ico には 16×16・32×32・48×48 の3サイズが内包され、ブラウザが最適なサイズを選択します。",
        },
        {
          question: "元画像はどんなサイズが良いですか？",
          answer:
            "正方形で、512×512以上の大きめのPNGが最適です。小さい画像を拡大すると粗くなるため、できるだけ高解像度の元画像を使ってください。",
        },
        {
          question: "透過は保持されますか？",
          answer:
            "はい。PNGの透過情報はそのまま保持されます。透過背景のロゴをそのまま favicon にできます。",
        },
      ],
      relatedTools: [
        { name: "PNG を JPG に変換", href: "/tools/png-to-jpg" },
        { name: "ICO を PNG に変換", href: "/tools/ico-to-png" },
        { name: "画像リサイズ", href: "/tools/resize-image" },
        { name: "画像切り抜き", href: "/tools/crop-image" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ、または選択",
      emptyDescription: "PNG / JPG から favicon.ico を生成します。",
      selectButtonLabel: "画像を選択",
      dropHereLabel: "ここにファイルをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileSizeLabel: "サイズ",
      squareHint: "正方形・512×512以上の画像を推奨します。",
      outputTitle: "生成されるファイル",
      outputItems: [
        "favicon.ico（16×16・32×32・48×48 を内包）",
        "favicon-16x16.png",
        "favicon-32x32.png",
        "favicon-48x48.png",
        "apple-touch-icon.png（180×180）",
      ],
      previewTitle: "プレビュー",
      generateButton: "faviconを生成",
      generatingButton: "生成中...",
      downloadZipButton: "ZIPで一括ダウンロード",
      downloadIcoButton: "favicon.ico だけダウンロード",
      resetButton: "リセット",
      htmlSnippetTitle: "HTML（<head> に貼り付け）",
      copyButton: "コードをコピー",
      copiedLabel: "コピーしました",
      invalidFileError: "エラー: PNG / JPG / WebP ファイルを選択してください。",
      processingStatus: "faviconを生成中です...",
      successMessage: "完了: faviconを生成しました。",
      generateError: "エラー: faviconの生成に失敗しました。",
    },
  },
  en: {
    page: {
      title: "PNG to favicon.ico Generator",
      description:
        "Generate a multi-size favicon.ico (16×16, 32×32, 48×48) plus PNG icons from a PNG or JPG image, right in your browser. No upload required, and the HTML snippet is generated for you.",
      aboutTitle: "What is the Favicon Generator?",
      aboutText:
        "A favicon is the small icon shown in browser tabs and bookmarks. This tool turns a PNG or JPG image into a multi-resolution favicon.ico along with 16×16, 32×32, and 48×48 PNG icons and a 180×180 apple-touch-icon for mobile. Everything runs in your browser, so your image is never uploaded to a server. You can download all files as a ZIP and copy a ready-to-paste set of <link> tags. It is perfect for indie projects, blogs, and internal tools.",
      stepsTitle: "How to Use",
      steps: [
        "Select a square-ish PNG or JPG image (512×512 or larger recommended)",
        "Check how each size looks in the preview",
        "Click the Generate Favicon button",
        "Download favicon.ico and the PNG icons as a ZIP",
        "Paste the generated HTML tags into your <head>",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Is my image uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your image is never sent to an external server.",
        },
        {
          question: "Does favicon.ico include multiple sizes?",
          answer:
            "Yes. The generated favicon.ico embeds 16×16, 32×32, and 48×48 images so the browser can pick the best size.",
        },
        {
          question: "What source image size works best?",
          answer:
            "A square PNG of at least 512×512 works best. Upscaling a small image looks rough, so start with the highest resolution you have.",
        },
        {
          question: "Is transparency preserved?",
          answer:
            "Yes. PNG transparency is preserved, so a logo with a transparent background becomes a clean favicon.",
        },
      ],
      relatedTools: [
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "ICO to PNG", href: "/en/tools/ico-to-png" },
        { name: "Resize Image", href: "/en/tools/resize-image" },
        { name: "Crop Image", href: "/en/tools/crop-image" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop an image here, or select a file",
      emptyDescription: "Generate favicon.ico from a PNG or JPG image.",
      selectButtonLabel: "Choose Image",
      dropHereLabel: "Drop file here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileSizeLabel: "Size",
      squareHint: "A square image of 512×512 or larger is recommended.",
      outputTitle: "Generated Files",
      outputItems: [
        "favicon.ico (embeds 16×16, 32×32, 48×48)",
        "favicon-16x16.png",
        "favicon-32x32.png",
        "favicon-48x48.png",
        "apple-touch-icon.png (180×180)",
      ],
      previewTitle: "Preview",
      generateButton: "Generate Favicon",
      generatingButton: "Generating...",
      downloadZipButton: "Download All as ZIP",
      downloadIcoButton: "Download favicon.ico only",
      resetButton: "Reset",
      htmlSnippetTitle: "HTML (paste into <head>)",
      copyButton: "Copy code",
      copiedLabel: "Copied",
      invalidFileError: "Error: Please select a PNG, JPG, or WebP file.",
      processingStatus: "Generating favicon...",
      successMessage: "Done: Favicon generated successfully.",
      generateError: "Error: Failed to generate favicon.",
    },
  },
};

const ICO_SIZES = [16, 32, 48] as const;
const PNG_OUTPUTS: { name: string; size: number }[] = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "apple-touch-icon.png", size: 180 },
];
const PREVIEW_SIZES = [16, 32, 48, 64] as const;

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };
    image.src = objectUrl;
  });
}

// Render the source image into a square canvas of the given size, centered with
// aspect ratio preserved so non-square sources are not distorted.
function renderSquare(image: HTMLImageElement, size: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to initialize canvas");
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const srcW = image.naturalWidth || image.width;
  const srcH = image.naturalHeight || image.height;
  const scale = Math.min(size / srcW, size / srcH);
  const drawW = Math.round(srcW * scale);
  const drawH = Math.round(srcH * scale);
  const dx = Math.round((size - drawW) / 2);
  const dy = Math.round((size - drawH) / 2);
  ctx.drawImage(image, dx, dy, drawW, drawH);
  return canvas;
}

function canvasToPngBytes(canvas: HTMLCanvasElement): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(async (blob) => {
      if (!blob) {
        reject(new Error("Failed to create PNG"));
        return;
      }
      resolve(new Uint8Array(await blob.arrayBuffer()));
    }, "image/png");
  });
}

// Build a PNG-based .ico container from the given PNG entries.
function buildIco(entries: { size: number; data: Uint8Array }[]): Uint8Array {
  const headerSize = 6 + entries.length * 16;
  const total = headerSize + entries.reduce((sum, e) => sum + e.data.length, 0);
  const buf = new Uint8Array(total);
  const dv = new DataView(buf.buffer);

  dv.setUint16(0, 0, true); // reserved
  dv.setUint16(2, 1, true); // image type: 1 = icon
  dv.setUint16(4, entries.length, true); // number of images

  let offset = headerSize;
  entries.forEach((entry, index) => {
    const dir = 6 + index * 16;
    buf[dir] = entry.size >= 256 ? 0 : entry.size; // width
    buf[dir + 1] = entry.size >= 256 ? 0 : entry.size; // height
    buf[dir + 2] = 0; // palette count
    buf[dir + 3] = 0; // reserved
    dv.setUint16(dir + 4, 1, true); // color planes
    dv.setUint16(dir + 6, 32, true); // bits per pixel
    dv.setUint32(dir + 8, entry.data.length, true); // size of image data
    dv.setUint32(dir + 12, offset, true); // offset of image data
    buf.set(entry.data, offset);
    offset += entry.data.length;
  });

  return buf;
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

type GeneratedAssets = {
  ico: Uint8Array;
  pngs: { name: string; data: Uint8Array }[];
};

export default function FaviconGeneratorTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [assets, setAssets] = useState<GeneratedAssets | null>(null);
  const [copied, setCopied] = useState(false);

  const previewUrl = useMemo(() => {
    if (!image) return "";
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const fileInfo = useMemo(() => {
    if (!image) return null;
    return {
      name: image.name,
      size: formatFileSize(image.size),
    };
  }, [image]);

  const handleFileSelect = (file: File | null) => {
    setMessage("");
    setAssets(null);

    if (!file) {
      setImage(null);
      return;
    }

    const isSupported =
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/webp" ||
      /\.(png|jpe?g|webp)$/i.test(file.name);

    if (!isSupported) {
      setImage(null);
      setMessage(ui.invalidFileError);
      return;
    }

    setImage(file);
  };

  const handleGenerate = async () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setMessage(ui.processingStatus);
      setAssets(null);

      const loaded = await loadImageFromFile(image);

      const icoEntries = await Promise.all(
        ICO_SIZES.map(async (size) => ({
          size,
          data: await canvasToPngBytes(renderSquare(loaded, size)),
        }))
      );
      const ico = buildIco(icoEntries);

      const pngs = await Promise.all(
        PNG_OUTPUTS.map(async (output) => ({
          name: output.name,
          data: await canvasToPngBytes(renderSquare(loaded, output.size)),
        }))
      );

      setAssets({ ico, pngs });
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.generateError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadZip = () => {
    if (!assets) return;
    const zipInput: Record<string, Uint8Array> = {
      "favicon.ico": assets.ico,
    };
    for (const png of assets.pngs) {
      zipInput[png.name] = png.data;
    }
    const zipped = zipSync(zipInput, { level: 0 });
    triggerDownload(
      new Blob([zipped.slice().buffer], { type: "application/zip" }),
      "favicons.zip"
    );
  };

  const handleDownloadIco = () => {
    if (!assets) return;
    triggerDownload(
      new Blob([assets.ico.slice().buffer], { type: "image/x-icon" }),
      "favicon.ico"
    );
  };

  const handleCopySnippet = async () => {
    try {
      await navigator.clipboard.writeText(HTML_SNIPPET);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setImage(null);
    setMessage("");
    setIsProcessing(false);
    setAssets(null);
    setCopied(false);
  };

  return (
    <ToolPageLayout
      title={page.title}
      description={page.description}
      aboutTitle={page.aboutTitle}
      aboutText={page.aboutText}
      stepsTitle={page.stepsTitle}
      steps={page.steps}
      faqTitle={page.faqTitle}
      faqs={page.faqs}
      relatedTools={page.relatedTools}
    >
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <FileDropzone
          file={image}
          accept="image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp"
          emptyTitle={ui.emptyTitle}
          emptyDescription={ui.emptyDescription}
          selectButtonLabel={ui.selectButtonLabel}
          dropHereLabel={ui.dropHereLabel}
          clickToSelectLabel={ui.clickToSelectLabel}
          selectedFileLabel={ui.selectedFileLabel}
          onFileSelect={handleFileSelect}
        />

        {fileInfo && (
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-semibold text-gray-900">
              {ui.selectedImageTitle}
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-800">
                  {ui.fileNameLabel}:
                </span>{" "}
                {fileInfo.name}
              </p>
              <p>
                <span className="font-medium text-gray-800">
                  {ui.fileSizeLabel}:
                </span>{" "}
                {fileInfo.size}
              </p>
            </div>
            <p className="text-xs text-gray-500">{ui.squareHint}</p>
          </div>
        )}

        {previewUrl && (
          <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-semibold text-gray-900">
              {ui.previewTitle}
            </h3>
            <div className="flex flex-wrap items-end gap-5">
              {PREVIEW_SIZES.map((size) => (
                <div key={size} className="flex flex-col items-center gap-1.5">
                  <div
                    className="flex items-center justify-center rounded border border-gray-200 bg-white"
                    style={{ width: 64, height: 64 }}
                  >
                    <img
                      src={previewUrl}
                      alt={`favicon preview ${size}px`}
                      width={size}
                      height={size}
                      style={{ width: size, height: size, objectFit: "contain" }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {size}×{size}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <h3 className="text-sm font-semibold text-gray-900">
            {ui.outputTitle}
          </h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
            {ui.outputItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <PrimaryButton onClick={handleGenerate} disabled={!image || isProcessing}>
            {isProcessing ? ui.generatingButton : ui.generateButton}
          </PrimaryButton>

          {assets && (
            <>
              <PrimaryButton onClick={handleDownloadZip}>
                {ui.downloadZipButton}
              </PrimaryButton>
              <button
                type="button"
                onClick={handleDownloadIco}
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                {ui.downloadIcoButton}
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {ui.resetButton}
          </button>
        </div>

        {assets && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">
                {ui.htmlSnippetTitle}
              </h3>
              <button
                type="button"
                onClick={handleCopySnippet}
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
              >
                {copied ? ui.copiedLabel : ui.copyButton}
              </button>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-900 p-4 text-xs leading-6 text-gray-100">
              <code>{HTML_SNIPPET}</code>
            </pre>
          </div>
        )}

        {message && <StatusMessage status={message} />}
      </div>
    </ToolPageLayout>
  );
}
