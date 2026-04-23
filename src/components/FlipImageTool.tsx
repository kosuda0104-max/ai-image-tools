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

type OutputFormat = "original" | "image/jpeg" | "image/png" | "image/webp";

type UIContent = {
  emptyTitle: string;
  emptyDescription: string;
  selectButtonLabel: string;
  dropHereLabel: string;
  clickToSelectLabel: string;
  selectedFileLabel: string;
  selectedImageTitle: string;
  fileNameLabel: string;
  fileTypeLabel: string;
  fileSizeLabel: string;
  originalDimensionsLabel: string;
  resultDimensionsLabel: string;
  outputFormatLabel: string;
  keepOriginalFormat: string;
  jpgFormat: string;
  pngFormat: string;
  webpFormat: string;
  horizontalFlipLabel: string;
  verticalFlipLabel: string;
  previewBeforeLabel: string;
  previewAfterLabel: string;
  previewPlaceholder: string;
  flipButton: string;
  flippingButton: string;
  downloadButton: string;
  resetButton: string;
  unknownType: string;
  invalidFileError: string;
  selectFlipError: string;
  processingStatus: string;
  successMessage: string;
  flipError: string;
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
      title: "画像反転ツール",
      description:
        "JPG・PNG・WebP画像を左右反転・上下反転できる無料オンラインツールです。ブラウザ上で安全に処理できます。",
      aboutTitle: "画像反転ツールとは？",
      aboutText:
        "画像反転ツールは、JPG・PNG・WebP画像を左右反転または上下反転できる無料オンラインツールです。セルフィーの左右補正、資料画像の向き調整、デザイン素材の反転、SNS投稿画像の調整などに便利です。処理はブラウザ上で完結するため、画像ファイルを外部サーバーにアップロードせず安全に利用できます。",
      stepsTitle: "使い方",
      steps: [
        "画像ファイルをアップロードします",
        "左右反転または上下反転を選びます",
        "必要に応じて出力形式を選択します",
        "「画像を反転」ボタンを押します",
        "反転後の画像を確認してダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画像はサーバーにアップロードされますか？",
          answer:
            "いいえ。画像はブラウザ上で処理されるため、外部サーバーには送信されません。",
        },
        {
          question: "左右反転と上下反転の両方に対応していますか？",
          answer:
            "はい。左右反転と上下反転のどちらにも対応しています。両方同時に選ぶこともできます。",
        },
        {
          question: "出力形式は変更できますか？",
          answer:
            "はい。元の形式のまま保存するほか、JPG・PNG・WebPとして書き出すこともできます。",
        },
        {
          question: "スマホでも使えますか？",
          answer:
            "はい。対応ブラウザであればスマホ・タブレット・PCから利用できます。",
        },
      ],
      relatedTools: [
        { name: "画像回転", href: "/tools/rotate-image" },
        { name: "画像切り抜き", href: "/tools/crop-image" },
        { name: "画像リサイズ", href: "/tools/resize-image" },
        { name: "画像圧縮", href: "/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ、または選択",
      emptyDescription:
        "JPG / PNG / WebP画像を左右反転・上下反転できます。",
      selectButtonLabel: "画像を選択",
      dropHereLabel: "ここにファイルをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      originalDimensionsLabel: "元のサイズ",
      resultDimensionsLabel: "反転後サイズ",
      outputFormatLabel: "出力形式",
      keepOriginalFormat: "元の形式のまま",
      jpgFormat: "JPG",
      pngFormat: "PNG",
      webpFormat: "WebP",
      horizontalFlipLabel: "左右反転",
      verticalFlipLabel: "上下反転",
      previewBeforeLabel: "反転前プレビュー",
      previewAfterLabel: "反転後プレビュー",
      previewPlaceholder: "反転後のプレビューはここに表示されます。",
      flipButton: "画像を反転",
      flippingButton: "反転中...",
      downloadButton: "反転画像をダウンロード",
      resetButton: "リセット",
      unknownType: "不明",
      invalidFileError:
        "エラー: JPG / PNG / WebP ファイルを選択してください。",
      selectFlipError:
        "エラー: 左右反転または上下反転のどちらかを選択してください。",
      processingStatus: "画像を反転中です...",
      successMessage: "完了: 画像の反転が完了しました。",
      flipError: "エラー: 画像の反転に失敗しました。",
    },
  },
  en: {
    page: {
      title: "Flip Image Tool",
      description:
        "Flip JPG, PNG, and WebP images horizontally or vertically online for free. Everything runs directly in your browser.",
      aboutTitle: "What is Flip Image Tool?",
      aboutText:
        "This free image flipper lets you flip JPG, PNG, and WebP images horizontally or vertically directly in your browser. It is useful for correcting mirrored selfies, adjusting design assets, flipping screenshots, and preparing images for documents or social media. Since everything is processed locally, your files are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an image file",
        "Choose horizontal flip or vertical flip",
        "Select an output format if needed",
        "Click Flip Image",
        "Preview and download the flipped image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my images uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Can I flip both horizontally and vertically?",
          answer:
            "Yes. You can choose horizontal flip, vertical flip, or both at the same time.",
        },
        {
          question: "Can I change the output format?",
          answer:
            "Yes. You can keep the original format or export as JPG, PNG, or WebP.",
        },
        {
          question: "Does it work on mobile devices?",
          answer:
            "Yes. It works on phones, tablets, and desktop browsers that support modern web features.",
        },
      ],
      relatedTools: [
        { name: "Rotate Image", href: "/en/tools/rotate-image" },
        { name: "Crop Image", href: "/en/tools/crop-image" },
        { name: "Resize Image", href: "/en/tools/resize-image" },
        { name: "Image Compressor", href: "/en/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop an image here, or select a file",
      emptyDescription:
        "Flip JPG, PNG, and WebP images horizontally or vertically.",
      selectButtonLabel: "Choose Image",
      dropHereLabel: "Drop file here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      originalDimensionsLabel: "Original Dimensions",
      resultDimensionsLabel: "Flipped Dimensions",
      outputFormatLabel: "Output Format",
      keepOriginalFormat: "Keep original format",
      jpgFormat: "JPG",
      pngFormat: "PNG",
      webpFormat: "WebP",
      horizontalFlipLabel: "Flip Horizontally",
      verticalFlipLabel: "Flip Vertically",
      previewBeforeLabel: "Before Flip",
      previewAfterLabel: "After Flip",
      previewPlaceholder: "The flipped preview will appear here.",
      flipButton: "Flip Image",
      flippingButton: "Flipping...",
      downloadButton: "Download Flipped Image",
      resetButton: "Reset",
      unknownType: "Unknown",
      invalidFileError:
        "Error: Please select a JPG, PNG, or WebP file.",
      selectFlipError:
        "Error: Please select horizontal flip or vertical flip.",
      processingStatus: "Flipping image...",
      successMessage: "Done: Image flip completed successfully.",
      flipError: "Error: Failed to flip the image.",
    },
  },
};

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

export default function FlipImageTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [flipHorizontal, setFlipHorizontal] = useState(true);
  const [flipVertical, setFlipVertical] = useState(false);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("original");
  const [flippedBlob, setFlippedBlob] = useState<Blob | null>(null);
  const [flippedPreviewUrl, setFlippedPreviewUrl] = useState("");

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
      if (flippedPreviewUrl) URL.revokeObjectURL(flippedPreviewUrl);
    };
  }, [flippedPreviewUrl]);

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

    if (flippedPreviewUrl) {
      URL.revokeObjectURL(flippedPreviewUrl);
      setFlippedPreviewUrl("");
    }

    setFlippedBlob(null);

    if (!file) {
      setImage(null);
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
    } catch (error) {
      console.error(error);
      setImage(null);
      setMessage(ui.flipError);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    void handleFileSelect(file);
    event.target.value = "";
  };

  const handleFlip = async () => {
    if (!image || isProcessing) return;

    if (!flipHorizontal && !flipVertical) {
      setMessage(ui.selectFlipError);
      return;
    }

    try {
      setIsProcessing(true);
      setMessage(ui.processingStatus);

      const loadedImage = await loadImageFromFile(image);
      const canvas = document.createElement("canvas");
      canvas.width = loadedImage.width;
      canvas.height = loadedImage.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to initialize canvas");
      }

      ctx.save();
      ctx.translate(
        flipHorizontal ? loadedImage.width : 0,
        flipVertical ? loadedImage.height : 0
      );
      ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
      ctx.drawImage(loadedImage, 0, 0);
      ctx.restore();

      const targetMimeType = getOutputMimeType(image.type, outputFormat);
      const blob = await canvasToBlob(
        canvas,
        targetMimeType,
        targetMimeType === "image/png" ? undefined : 0.92
      );

      if (flippedPreviewUrl) {
        URL.revokeObjectURL(flippedPreviewUrl);
      }

      const nextUrl = URL.createObjectURL(blob);
      setFlippedBlob(blob);
      setFlippedPreviewUrl(nextUrl);
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.flipError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!flippedBlob || !image || !flippedPreviewUrl) return;

    const targetMimeType = getOutputMimeType(image.type, outputFormat);
    const extension = getExtensionFromMimeType(targetMimeType);
    const dotIndex = image.name.lastIndexOf(".");
    const baseName = dotIndex >= 0 ? image.name.slice(0, dotIndex) : image.name;

    const link = document.createElement("a");
    link.href = flippedPreviewUrl;
    link.download = `${baseName}-flipped.${extension}`;
    link.click();
  };

  const handleReset = () => {
    setImage(null);
    setMessage("");
    setIsProcessing(false);
    setFlipHorizontal(true);
    setFlipVertical(false);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setOutputFormat("original");

    if (flippedPreviewUrl) {
      URL.revokeObjectURL(flippedPreviewUrl);
    }

    setFlippedPreviewUrl("");
    setFlippedBlob(null);
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

            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={flipHorizontal}
                  onChange={(e) => setFlipHorizontal(e.target.checked)}
                />
                {ui.horizontalFlipLabel}
              </label>

              <label className="flex items-center gap-3 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={flipVertical}
                  onChange={(e) => setFlipVertical(e.target.checked)}
                />
                {ui.verticalFlipLabel}
              </label>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="flip-output-format"
                className="text-sm font-medium text-gray-800"
              >
                {ui.outputFormatLabel}
              </label>
              <select
                id="flip-output-format"
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
                alt="before flip preview"
                className="max-h-80 w-full rounded border object-contain"
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-600">{ui.previewAfterLabel}</div>
              {flippedPreviewUrl ? (
                <img
                  src={flippedPreviewUrl}
                  alt="after flip preview"
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

        {flippedBlob && (
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <p>
              <span className="font-medium text-gray-800">
                {ui.originalDimensionsLabel}:
              </span>{" "}
              {originalWidth} × {originalHeight}
            </p>
            <p>
              <span className="font-medium text-gray-800">
                {ui.resultDimensionsLabel}:
              </span>{" "}
              {originalWidth} × {originalHeight}
            </p>
            <p>
              <span className="font-medium text-gray-800">
                {ui.fileSizeLabel}:
              </span>{" "}
              {formatFileSize(flippedBlob.size)}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            onClick={handleFlip}
            disabled={!image || isProcessing}
          >
            {isProcessing ? ui.flippingButton : ui.flipButton}
          </PrimaryButton>

          {flippedBlob && (
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


