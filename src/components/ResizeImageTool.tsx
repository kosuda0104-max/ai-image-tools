"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import FAQJsonLd from "@/components/FAQJsonLd";

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
  widthLabel: string;
  heightLabel: string;
  lockAspectRatioLabel: string;
  outputFormatLabel: string;
  keepOriginalFormat: string;
  jpgFormat: string;
  pngFormat: string;
  webpFormat: string;
  selectedImageTitle: string;
  fileNameLabel: string;
  fileTypeLabel: string;
  fileSizeLabel: string;
  originalDimensionsLabel: string;
  resizedDimensionsLabel: string;
  previewBeforeLabel: string;
  previewAfterLabel: string;
  previewPlaceholder: string;
  resizeButton: string;
  resizingButton: string;
  downloadButton: string;
  resetButton: string;
  unknownType: string;
  invalidFileError: string;
  invalidSizeError: string;
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

const content: Record<Locale, ToolContent> = {
  ja: {
    page: {
      title: "画像リサイズツール",
      description:
        "JPG・PNG・WebP画像の幅と高さをブラウザ上で変更できる無料オンラインツールです。アップロード不要で安全にサイズ変更できます。",
      aboutTitle: "画像リサイズツールとは？",
      aboutText:
        "画像リサイズツールは、JPG・PNG・WebP画像の幅と高さを変更できる無料オンラインツールです。ブログ用画像、商品画像、SNS用画像、バナー画像などを用途に合わせたサイズへ調整できます。ブラウザ上で処理するため、画像ファイルを外部サーバーにアップロードせず安全に利用できます。",
      stepsTitle: "使い方",
      steps: [
        "画像ファイルをアップロードします",
        "必要な幅と高さを入力します",
        "縦横比を維持するか選択します",
        "必要に応じて出力形式を選択します",
        "「画像をリサイズ」ボタンを押してダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画像はアップロードされますか？",
          answer:
            "いいえ。画像はブラウザ上で処理されるため、外部サーバーには送信されません。",
        },
        {
          question: "縦横比は維持できますか？",
          answer:
            "はい。縦横比を維持する設定をオンにすると、幅または高さを変更したときにもう一方も自動調整されます。",
        },
        {
          question: "どの形式で保存できますか？",
          answer:
            "元の形式のままに加え、JPG・PNG・WebP での出力に対応しています。",
        },
        {
          question: "スマホでも使えますか？",
          answer:
            "はい。対応ブラウザであればスマホ・タブレット・PCから利用できます。",
        },
      ],
      relatedTools: [
        { name: "画像圧縮", href: "/tools/image-compress" },
        { name: "画像切り抜き", href: "/tools/crop-image" },
        { name: "画像回転", href: "/tools/rotate-image" },
        { name: "画像反転", href: "/tools/flip-image" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ、または選択",
      emptyDescription:
        "JPG / PNG / WebP画像の幅と高さを変更できます。",
      selectButtonLabel: "画像を選択",
      dropHereLabel: "ここにファイルをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      widthLabel: "幅",
      heightLabel: "高さ",
      lockAspectRatioLabel: "縦横比を維持する",
      outputFormatLabel: "出力形式",
      keepOriginalFormat: "元の形式のまま",
      jpgFormat: "JPG",
      pngFormat: "PNG",
      webpFormat: "WebP",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      originalDimensionsLabel: "元のサイズ",
      resizedDimensionsLabel: "変更後サイズ",
      previewBeforeLabel: "変更前プレビュー",
      previewAfterLabel: "変更後プレビュー",
      previewPlaceholder: "リサイズ後のプレビューはここに表示されます。",
      resizeButton: "画像をリサイズ",
      resizingButton: "リサイズ中...",
      downloadButton: "リサイズ画像をダウンロード",
      resetButton: "リセット",
      unknownType: "不明",
      invalidFileError:
        "エラー: JPG / PNG / WebP ファイルを選択してください。",
      invalidSizeError:
        "エラー: 幅と高さには 1 以上の数値を入力してください。",
      processingStatus: "画像をリサイズ中です...",
      successMessage: "完了: 画像のリサイズが完了しました。",
      resizeError: "エラー: 画像のリサイズに失敗しました。",
    },
  },
  en: {
    page: {
      title: "Resize Image Tool",
      description:
        "Resize JPG, PNG, and WebP images online for free. Change width and height directly in your browser with no upload required.",
      aboutTitle: "What is Resize Image Tool?",
      aboutText:
        "This free image resizer lets you change the width and height of JPG, PNG, and WebP images directly in your browser. It is useful for blog images, product images, social media posts, banners, and other web graphics. Since everything is processed locally, your files are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an image file",
        "Enter the width and height you want",
        "Choose whether to keep the aspect ratio locked",
        "Select an output format if needed",
        "Click Resize Image and download the result",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my images uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Can I keep the aspect ratio?",
          answer:
            "Yes. When aspect ratio lock is enabled, changing width or height will automatically adjust the other value.",
        },
        {
          question: "Which output formats are supported?",
          answer:
            "You can keep the original format or export as JPG, PNG, or WebP.",
        },
        {
          question: "Does it work on mobile devices?",
          answer:
            "Yes. It works on phones, tablets, and desktop browsers that support modern web features.",
        },
      ],
      relatedTools: [
        { name: "Image Compressor", href: "/en/tools/image-compress" },
        { name: "Crop Image", href: "/en/tools/crop-image" },
        { name: "Rotate Image", href: "/en/tools/rotate-image" },
        { name: "Flip Image", href: "/en/tools/flip-image" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop an image here, or select a file",
      emptyDescription:
        "Resize JPG, PNG, and WebP images by changing width and height.",
      selectButtonLabel: "Choose Image",
      dropHereLabel: "Drop file here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      widthLabel: "Width",
      heightLabel: "Height",
      lockAspectRatioLabel: "Lock aspect ratio",
      outputFormatLabel: "Output Format",
      keepOriginalFormat: "Keep original format",
      jpgFormat: "JPG",
      pngFormat: "PNG",
      webpFormat: "WebP",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      originalDimensionsLabel: "Original Dimensions",
      resizedDimensionsLabel: "Resized Dimensions",
      previewBeforeLabel: "Before Resize",
      previewAfterLabel: "After Resize",
      previewPlaceholder: "The resized preview will appear here.",
      resizeButton: "Resize Image",
      resizingButton: "Resizing...",
      downloadButton: "Download Resized Image",
      resetButton: "Reset",
      unknownType: "Unknown",
      invalidFileError:
        "Error: Please select a JPG, PNG, or WebP file.",
      invalidSizeError:
        "Error: Width and height must be numbers greater than 0.",
      processingStatus: "Resizing image...",
      successMessage: "Done: Image resizing completed successfully.",
      resizeError: "Error: Failed to resize the image.",
    },
  },
};

type OutputFormat = "original" | "image/jpeg" | "image/png" | "image/webp";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getOutputMimeType(
  originalType: string,
  outputFormat: OutputFormat
): string {
  if (outputFormat !== "original") {
    return outputFormat;
  }

  if (
    originalType === "image/jpeg" ||
    originalType === "image/png" ||
    originalType === "image/webp"
  ) {
    return originalType;
  }

  return "image/png";
}

function getExtensionFromMimeType(mimeType: string) {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/webp":
      return "webp";
    case "image/png":
    default:
      return "png";
  }
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

export default function ResizeImageTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [lockAspectRatio, setLockAspectRatio] = useState(true);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("original");
  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null);
  const [resizedPreviewUrl, setResizedPreviewUrl] = useState("");

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
      if (resizedPreviewUrl) URL.revokeObjectURL(resizedPreviewUrl);
    };
  }, [resizedPreviewUrl]);

  const fileInfo = useMemo(() => {
    if (!image) return null;

    return {
      name: image.name,
      type: image.type || ui.unknownType,
      size: formatFileSize(image.size),
    };
  }, [image, ui.unknownType]);

  const handleFileSelect = async (file: File | null) => {
    setMessage("");

    if (resizedPreviewUrl) {
      URL.revokeObjectURL(resizedPreviewUrl);
      setResizedPreviewUrl("");
    }

    setResizedBlob(null);

    if (!file) {
      setImage(null);
      setWidth("");
      setHeight("");
      setOriginalWidth(0);
      setOriginalHeight(0);
      return;
    }

    const isSupported =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp" ||
      /\.(jpg|jpeg|png|webp)$/i.test(file.name);

    if (!isSupported) {
      setImage(null);
      setMessage(ui.invalidFileError);
      return;
    }

    try {
      const loadedImage = await loadImageFromFile(file);
      setImage(file);
      setOriginalWidth(loadedImage.width);
      setOriginalHeight(loadedImage.height);
      setWidth(String(loadedImage.width));
      setHeight(String(loadedImage.height));
    } catch (error) {
      console.error(error);
      setImage(null);
      setMessage(ui.resizeError);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    void handleFileSelect(file);
    event.target.value = "";
  };

  const handleWidthChange = (value: string) => {
    setWidth(value);

    if (!lockAspectRatio) return;
    if (!originalWidth || !originalHeight) return;

    const nextWidth = Number(value);
    if (!Number.isFinite(nextWidth) || nextWidth <= 0) {
      setHeight(value === "" ? "" : height);
      return;
    }

    const nextHeight = Math.round((nextWidth * originalHeight) / originalWidth);
    setHeight(String(nextHeight));
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);

    if (!lockAspectRatio) return;
    if (!originalWidth || !originalHeight) return;

    const nextHeight = Number(value);
    if (!Number.isFinite(nextHeight) || nextHeight <= 0) {
      setWidth(value === "" ? "" : width);
      return;
    }

    const nextWidth = Math.round((nextHeight * originalWidth) / originalHeight);
    setWidth(String(nextWidth));
  };

  const handleResize = async () => {
    if (!image || isProcessing) return;

    const targetWidth = Number(width);
    const targetHeight = Number(height);

    if (
      !Number.isFinite(targetWidth) ||
      !Number.isFinite(targetHeight) ||
      targetWidth <= 0 ||
      targetHeight <= 0
    ) {
      setMessage(ui.invalidSizeError);
      return;
    }

    try {
      setIsProcessing(true);
      setMessage(ui.processingStatus);

      const loadedImage = await loadImageFromFile(image);
      const canvas = document.createElement("canvas");
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to initialize canvas");
      }

      ctx.drawImage(loadedImage, 0, 0, targetWidth, targetHeight);

      const targetMimeType = getOutputMimeType(image.type, outputFormat);
      const blob = await canvasToBlob(
        canvas,
        targetMimeType,
        targetMimeType === "image/png" ? undefined : 0.92
      );

      if (resizedPreviewUrl) {
        URL.revokeObjectURL(resizedPreviewUrl);
      }

      const nextUrl = URL.createObjectURL(blob);
      setResizedBlob(blob);
      setResizedPreviewUrl(nextUrl);
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.resizeError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resizedBlob || !image || !resizedPreviewUrl) return;

    const targetMimeType = getOutputMimeType(image.type, outputFormat);
    const extension = getExtensionFromMimeType(targetMimeType);
    const dotIndex = image.name.lastIndexOf(".");
    const baseName = dotIndex >= 0 ? image.name.slice(0, dotIndex) : image.name;

    const link = document.createElement("a");
    link.href = resizedPreviewUrl;
    link.download = `${baseName}-resized.${extension}`;
    link.click();
  };

  const handleReset = () => {
    setImage(null);
    setMessage("");
    setIsProcessing(false);
    setWidth("");
    setHeight("");
    setOriginalWidth(0);
    setOriginalHeight(0);
    setLockAspectRatio(true);
    setOutputFormat("original");

    if (resizedPreviewUrl) {
      URL.revokeObjectURL(resizedPreviewUrl);
    }

    setResizedPreviewUrl("");
    setResizedBlob(null);
  };

  return (
    <>
      <FAQJsonLd faqs={page.faqs} />
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
          onFileSelect={(file) => {
            void handleFileSelect(file);
          }}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-800">
            {ui.selectButtonLabel}
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            onChange={handleInputChange}
            className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700"
          />
        </div>

        {fileInfo && (
          <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="space-y-2">
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
                    {ui.fileTypeLabel}:
                  </span>{" "}
                  {fileInfo.type}
                </p>
                <p>
                  <span className="font-medium text-gray-800">
                    {ui.fileSizeLabel}:
                  </span>{" "}
                  {fileInfo.size}
                </p>
                <p>
                  <span className="font-medium text-gray-800">
                    {ui.originalDimensionsLabel}:
                  </span>{" "}
                  {originalWidth} × {originalHeight}
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="resize-width"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.widthLabel}
                </label>
                <input
                  id="resize-width"
                  type="number"
                  min="1"
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="resize-height"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.heightLabel}
                </label>
                <input
                  id="resize-height"
                  type="number"
                  min="1"
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={lockAspectRatio}
                onChange={(e) => setLockAspectRatio(e.target.checked)}
              />
              {ui.lockAspectRatioLabel}
            </label>

            <div className="space-y-2">
              <label
                htmlFor="resize-output-format"
                className="text-sm font-medium text-gray-800"
              >
                {ui.outputFormatLabel}
              </label>
              <select
                id="resize-output-format"
                value={outputFormat}
                onChange={(e) =>
                  setOutputFormat(e.target.value as OutputFormat)
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
              >
                <option value="original">{ui.keepOriginalFormat}</option>
                <option value="image/jpeg">{ui.jpgFormat}</option>
                <option value="image/png">{ui.pngFormat}</option>
                <option value="image/webp">{ui.webpFormat}</option>
              </select>
            </div>
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
              {resizedPreviewUrl ? (
                <img
                  src={resizedPreviewUrl}
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

        {resizedBlob && (
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <p>
              <span className="font-medium text-gray-800">
                {ui.originalDimensionsLabel}:
              </span>{" "}
              {originalWidth} × {originalHeight}
            </p>
            <p>
              <span className="font-medium text-gray-800">
                {ui.resizedDimensionsLabel}:
              </span>{" "}
              {width} × {height}
            </p>
            <p>
              <span className="font-medium text-gray-800">
                {ui.fileSizeLabel}:
              </span>{" "}
              {formatFileSize(resizedBlob.size)}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            onClick={handleResize}
            disabled={!image || isProcessing}
          >
            {isProcessing ? ui.resizingButton : ui.resizeButton}
          </PrimaryButton>

          {resizedBlob && (
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
    </>
  );
}


