"use client";

import { useEffect, useMemo, useState } from "react";
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
  presetTitle: string;
  fitModeTitle: string;
  fitCoverLabel: string;
  fitCoverHint: string;
  fitContainLabel: string;
  fitContainHint: string;
  bgColorLabel: string;
  outputFormatLabel: string;
  jpgFormat: string;
  pngFormat: string;
  webpFormat: string;
  previewBeforeLabel: string;
  previewAfterLabel: string;
  previewPlaceholder: string;
  targetSizeLabel: string;
  resultSizeLabel: string;
  resizeButton: string;
  resizingButton: string;
  downloadButton: string;
  resetButton: string;
  invalidFileError: string;
  processingStatus: string;
  successMessage: string;
  resizeError: string;
};

type ToolContent = {
  page: PageContent;
  ui: UIContent;
};

type Props = {
  locale: Locale;
};

type Preset = {
  key: string;
  jaLabel: string;
  enLabel: string;
  width: number;
  height: number;
};

const PRESETS: Preset[] = [
  { key: "x-post", jaLabel: "X 投稿画像", enLabel: "X (Twitter) Post", width: 1600, height: 900 },
  { key: "instagram-post", jaLabel: "Instagram 投稿", enLabel: "Instagram Post", width: 1080, height: 1080 },
  { key: "instagram-story", jaLabel: "Instagram ストーリー", enLabel: "Instagram Story", width: 1080, height: 1920 },
  { key: "youtube-thumbnail", jaLabel: "YouTube サムネイル", enLabel: "YouTube Thumbnail", width: 1280, height: 720 },
  { key: "line-icon", jaLabel: "LINE アイコン", enLabel: "LINE Icon", width: 640, height: 640 },
  { key: "note-header", jaLabel: "note 見出し画像", enLabel: "note Header", width: 1280, height: 670 },
  { key: "qiita-ogp", jaLabel: "Qiita 記事 (OGP)", enLabel: "Qiita / OGP", width: 1200, height: 630 },
  { key: "facebook-post", jaLabel: "Facebook 投稿", enLabel: "Facebook Post", width: 1200, height: 630 },
];

type FitMode = "cover" | "contain";
type OutputFormat = "image/jpeg" | "image/png" | "image/webp";

const content: Record<Locale, ToolContent> = {
  ja: {
    page: {
      title: "SNS画像リサイズツール",
      description:
        "X（Twitter）・Instagram・YouTube・LINE・note・Qiita など、各SNSの推奨サイズに画像をワンクリックでリサイズできる無料ツールです。アップロード不要、ブラウザ内で処理します。",
      aboutTitle: "SNS画像リサイズツールとは？",
      aboutText:
        "SNSやブログの投稿では、プラットフォームごとに推奨される画像サイズが異なります。サイズが合っていないと、自動でトリミングされたり、余白が入ったり、画質が落ちたりします。このツールは、X投稿・Instagram投稿/ストーリー・YouTubeサムネイル・LINEアイコン・note見出し・Qiita（OGP）などの定番サイズをプリセットとして用意し、選ぶだけで最適なサイズに変換します。「切り抜いて埋める（cover）」と「余白を付けて全体表示（contain）」を選べ、背景色も指定できます。すべてブラウザ内で処理するため、画像を外部サーバーへアップロードする必要はありません。",
      stepsTitle: "使い方",
      steps: [
        "画像ファイル（JPG / PNG / WebP）を選択します",
        "投稿先のプリセット（X・Instagram など）を選びます",
        "切り抜き方法（埋める / 全体表示）と背景色を選びます",
        "「リサイズ」ボタンを押して結果を確認します",
        "リサイズした画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画像はアップロードされますか？",
          answer:
            "いいえ。すべてブラウザ内で処理されるため、画像が外部サーバーに送信されることはありません。",
        },
        {
          question: "「埋める」と「全体表示」の違いは？",
          answer:
            "「埋める（cover）」は指定サイズいっぱいに画像を配置し、はみ出た部分を切り抜きます。「全体表示（contain）」は画像全体が収まるように縮小し、余白に背景色を入れます。",
        },
        {
          question: "縦横比は崩れませんか？",
          answer:
            "崩れません。どちらのモードでも元画像の縦横比を保ったまま処理するため、引き伸ばしによる歪みは発生しません。",
        },
        {
          question: "対応している投稿先は？",
          answer:
            "X投稿、Instagram投稿・ストーリー、YouTubeサムネイル、LINEアイコン、note見出し、Qiita（OGP）、Facebook投稿のプリセットに対応しています。",
        },
      ],
      relatedTools: [
        { name: "画像リサイズ", href: "/tools/resize-image" },
        { name: "画像切り抜き", href: "/tools/crop-image" },
        { name: "画像圧縮", href: "/tools/image-compress" },
        { name: "favicon.ico 作成", href: "/tools/favicon-generator" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ、または選択",
      emptyDescription: "JPG / PNG / WebP をSNSの推奨サイズに変換します。",
      selectButtonLabel: "画像を選択",
      dropHereLabel: "ここにファイルをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      presetTitle: "投稿先プリセット",
      fitModeTitle: "サイズの合わせ方",
      fitCoverLabel: "埋める（切り抜き）",
      fitCoverHint: "指定サイズいっぱいに配置し、はみ出しを切り抜きます。",
      fitContainLabel: "全体表示（余白）",
      fitContainHint: "画像全体が収まるよう縮小し、余白に背景色を入れます。",
      bgColorLabel: "背景色（全体表示時）",
      outputFormatLabel: "出力形式",
      jpgFormat: "JPG",
      pngFormat: "PNG",
      webpFormat: "WebP",
      previewBeforeLabel: "変更前プレビュー",
      previewAfterLabel: "変更後プレビュー",
      previewPlaceholder: "リサイズ後のプレビューはここに表示されます。",
      targetSizeLabel: "出力サイズ",
      resultSizeLabel: "ファイルサイズ",
      resizeButton: "リサイズ",
      resizingButton: "リサイズ中...",
      downloadButton: "画像をダウンロード",
      resetButton: "リセット",
      invalidFileError: "エラー: JPG / PNG / WebP ファイルを選択してください。",
      processingStatus: "画像をリサイズ中です...",
      successMessage: "完了: 画像のリサイズが完了しました。",
      resizeError: "エラー: 画像のリサイズに失敗しました。",
    },
  },
  en: {
    page: {
      title: "Social Media Image Resizer",
      description:
        "Resize images to the recommended size for X (Twitter), Instagram, YouTube, LINE, note, and Qiita with one click. No upload required, processed in your browser.",
      aboutTitle: "What is the Social Media Image Resizer?",
      aboutText:
        "Every social platform recommends a different image size. When the size is off, the image gets auto-cropped, padded, or downscaled. This tool provides presets for X posts, Instagram posts and stories, YouTube thumbnails, LINE icons, note headers, and Qiita/OGP images, so you can resize with a single click. You can choose between cover (crop to fill) and contain (fit with a background), and set the background color. Everything is processed locally in your browser, so your image is never uploaded to a server.",
      stepsTitle: "How to Use",
      steps: [
        "Select an image file (JPG / PNG / WebP)",
        "Pick a destination preset (X, Instagram, etc.)",
        "Choose the fit mode (cover / contain) and background color",
        "Click Resize and review the result",
        "Download the resized image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my images uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your images are never sent to an external server.",
        },
        {
          question: "What is the difference between cover and contain?",
          answer:
            "Cover fills the target size and crops the overflow. Contain scales the whole image to fit and fills the empty space with a background color.",
        },
        {
          question: "Will the aspect ratio be distorted?",
          answer:
            "No. Both modes keep the original aspect ratio, so the image is never stretched or squashed.",
        },
        {
          question: "Which platforms are supported?",
          answer:
            "Presets cover X posts, Instagram posts and stories, YouTube thumbnails, LINE icons, note headers, Qiita/OGP, and Facebook posts.",
        },
      ],
      relatedTools: [
        { name: "Resize Image", href: "/en/tools/resize-image" },
        { name: "Crop Image", href: "/en/tools/crop-image" },
        { name: "Image Compress", href: "/en/tools/image-compress" },
        { name: "Favicon Generator", href: "/en/tools/favicon-generator" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop an image here, or select a file",
      emptyDescription: "Resize JPG, PNG, and WebP images to social media sizes.",
      selectButtonLabel: "Choose Image",
      dropHereLabel: "Drop file here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      presetTitle: "Destination Preset",
      fitModeTitle: "How to Fit",
      fitCoverLabel: "Cover (crop)",
      fitCoverHint: "Fills the target size and crops the overflow.",
      fitContainLabel: "Contain (padding)",
      fitContainHint: "Scales the whole image to fit and pads with a background color.",
      bgColorLabel: "Background color (contain)",
      outputFormatLabel: "Output Format",
      jpgFormat: "JPG",
      pngFormat: "PNG",
      webpFormat: "WebP",
      previewBeforeLabel: "Before",
      previewAfterLabel: "After",
      previewPlaceholder: "The resized preview will appear here.",
      targetSizeLabel: "Output Size",
      resultSizeLabel: "File Size",
      resizeButton: "Resize",
      resizingButton: "Resizing...",
      downloadButton: "Download Image",
      resetButton: "Reset",
      invalidFileError: "Error: Please select a JPG, PNG, or WebP file.",
      processingStatus: "Resizing image...",
      successMessage: "Done: Image resizing completed successfully.",
      resizeError: "Error: Failed to resize the image.",
    },
  },
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getExtension(format: OutputFormat) {
  if (format === "image/jpeg") return "jpg";
  if (format === "image/webp") return "webp";
  return "png";
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

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob"));
          return;
        }
        resolve(blob);
      },
      mimeType,
      quality
    );
  });
}

export default function SocialImageResizeTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [presetKey, setPresetKey] = useState<string>(PRESETS[0].key);
  const [fitMode, setFitMode] = useState<FitMode>("cover");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/jpeg");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState("");

  const preset = useMemo(
    () => PRESETS.find((p) => p.key === presetKey) ?? PRESETS[0],
    [presetKey]
  );

  const previewUrl = useMemo(() => {
    if (!image) return "";
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const fileInfo = useMemo(() => {
    if (!image) return null;
    return {
      name: image.name,
      size: formatFileSize(image.size),
    };
  }, [image]);

  const clearResult = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl("");
    setResultBlob(null);
  };

  const handleFileSelect = (file: File | null) => {
    setMessage("");
    clearResult();

    if (!file) {
      setImage(null);
      return;
    }

    const isSupported =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp" ||
      /\.(jpe?g|png|webp)$/i.test(file.name);

    if (!isSupported) {
      setImage(null);
      setMessage(ui.invalidFileError);
      return;
    }

    setImage(file);
  };

  const handleResize = async () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setMessage(ui.processingStatus);
      clearResult();

      const loaded = await loadImageFromFile(image);
      const canvas = document.createElement("canvas");
      canvas.width = preset.width;
      canvas.height = preset.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Failed to initialize canvas");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const srcW = loaded.naturalWidth || loaded.width;
      const srcH = loaded.naturalHeight || loaded.height;

      if (fitMode === "contain" && outputFormat !== "image/png") {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, preset.width, preset.height);
      } else if (fitMode === "contain") {
        // For PNG, keep transparent padding unless the user wants a color; we
        // still honor a non-white background choice.
        if (bgColor.toLowerCase() !== "#ffffff") {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, preset.width, preset.height);
        }
      }

      const scale =
        fitMode === "cover"
          ? Math.max(preset.width / srcW, preset.height / srcH)
          : Math.min(preset.width / srcW, preset.height / srcH);

      const drawW = srcW * scale;
      const drawH = srcH * scale;
      const dx = (preset.width - drawW) / 2;
      const dy = (preset.height - drawH) / 2;
      ctx.drawImage(loaded, dx, dy, drawW, drawH);

      const blob = await canvasToBlob(
        canvas,
        outputFormat,
        outputFormat === "image/png" ? undefined : 0.92
      );

      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.resizeError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !image || !resultUrl) return;
    const extension = getExtension(outputFormat);
    const dotIndex = image.name.lastIndexOf(".");
    const baseName =
      dotIndex >= 0 ? image.name.slice(0, dotIndex) : image.name;

    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `${baseName}-${preset.key}.${extension}`;
    link.click();
  };

  const handleReset = () => {
    setImage(null);
    setMessage("");
    setIsProcessing(false);
    setPresetKey(PRESETS[0].key);
    setFitMode("cover");
    setBgColor("#ffffff");
    setOutputFormat("image/jpeg");
    clearResult();
  };

  const selectPreset = (key: string) => {
    setPresetKey(key);
    clearResult();
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
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          emptyTitle={ui.emptyTitle}
          emptyDescription={ui.emptyDescription}
          selectButtonLabel={ui.selectButtonLabel}
          dropHereLabel={ui.dropHereLabel}
          clickToSelectLabel={ui.clickToSelectLabel}
          selectedFileLabel={ui.selectedFileLabel}
          onFileSelect={handleFileSelect}
        />

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900">
            {ui.presetTitle}
          </h3>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {PRESETS.map((p) => {
              const active = p.key === presetKey;
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => selectPreset(p.key)}
                  className={`rounded-xl border px-3 py-2.5 text-left transition ${
                    active
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-700 hover:border-blue-300"
                  }`}
                >
                  <span className="block text-sm font-medium">
                    {locale === "ja" ? p.jaLabel : p.enLabel}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {p.width}×{p.height}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">
              {ui.fitModeTitle}
            </h3>
            <label className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
              <input
                type="radio"
                name="fit-mode"
                checked={fitMode === "cover"}
                onChange={() => {
                  setFitMode("cover");
                  clearResult();
                }}
                className="mt-1"
              />
              <span>
                <span className="font-medium">{ui.fitCoverLabel}</span>
                <span className="block text-xs text-gray-500">
                  {ui.fitCoverHint}
                </span>
              </span>
            </label>
            <label className="flex items-start gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
              <input
                type="radio"
                name="fit-mode"
                checked={fitMode === "contain"}
                onChange={() => {
                  setFitMode("contain");
                  clearResult();
                }}
                className="mt-1"
              />
              <span>
                <span className="font-medium">{ui.fitContainLabel}</span>
                <span className="block text-xs text-gray-500">
                  {ui.fitContainHint}
                </span>
              </span>
            </label>
          </div>

          <div className="space-y-4">
            {fitMode === "contain" && (
              <div className="space-y-2">
                <label
                  htmlFor="bg-color"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.bgColorLabel}
                </label>
                <div className="flex items-center gap-3">
                  <input
                    id="bg-color"
                    type="color"
                    value={bgColor}
                    onChange={(e) => {
                      setBgColor(e.target.value);
                      clearResult();
                    }}
                    className="h-10 w-16 cursor-pointer rounded border border-gray-300"
                  />
                  <span className="text-sm text-gray-600">{bgColor}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label
                htmlFor="output-format"
                className="text-sm font-medium text-gray-800"
              >
                {ui.outputFormatLabel}
              </label>
              <select
                id="output-format"
                value={outputFormat}
                onChange={(e) => {
                  setOutputFormat(e.target.value as OutputFormat);
                  clearResult();
                }}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
              >
                <option value="image/jpeg">{ui.jpgFormat}</option>
                <option value="image/png">{ui.pngFormat}</option>
                <option value="image/webp">{ui.webpFormat}</option>
              </select>
            </div>
          </div>
        </div>

        {fileInfo && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            <p>
              <span className="font-medium text-gray-800">
                {ui.selectedFileLabel}:
              </span>{" "}
              {fileInfo.name} ({fileInfo.size})
            </p>
            <p>
              <span className="font-medium text-gray-800">
                {ui.targetSizeLabel}:
              </span>{" "}
              {preset.width}×{preset.height}
            </p>
          </div>
        )}

        {previewUrl && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">{ui.previewBeforeLabel}</div>
              <img
                src={previewUrl}
                alt="before resize preview"
                className="max-h-80 w-full rounded border object-contain"
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">{ui.previewAfterLabel}</div>
              {resultUrl ? (
                <img
                  src={resultUrl}
                  alt="after resize preview"
                  className="max-h-80 w-full rounded border object-contain"
                />
              ) : (
                <div className="flex h-80 items-center justify-center rounded border border-dashed bg-gray-50 px-4 text-center text-sm text-gray-500">
                  {ui.previewPlaceholder}
                </div>
              )}
            </div>
          </div>
        )}

        {resultBlob && (
          <div className="space-y-1 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <p>
              <span className="font-medium text-gray-800">
                {ui.targetSizeLabel}:
              </span>{" "}
              {preset.width}×{preset.height}
            </p>
            <p>
              <span className="font-medium text-gray-800">
                {ui.resultSizeLabel}:
              </span>{" "}
              {formatFileSize(resultBlob.size)}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton onClick={handleResize} disabled={!image || isProcessing}>
            {isProcessing ? ui.resizingButton : ui.resizeButton}
          </PrimaryButton>

          {resultBlob && (
            <PrimaryButton onClick={handleDownload}>
              {ui.downloadButton}
            </PrimaryButton>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {ui.resetButton}
          </button>
        </div>

        {message && <StatusMessage status={message} />}
      </div>
    </ToolPageLayout>
  );
}
