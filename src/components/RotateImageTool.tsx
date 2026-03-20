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
  angleLabel: string;
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
  rotatedDimensionsLabel: string;
  previewBeforeLabel: string;
  previewAfterLabel: string;
  previewPlaceholder: string;
  rotateLeftButton: string;
  rotateRightButton: string;
  rotateButton: string;
  rotatingButton: string;
  downloadButton: string;
  resetButton: string;
  unknownType: string;
  invalidFileError: string;
  processingStatus: string;
  successMessage: string;
  rotateError: string;
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
      title: "画像回転ツール",
      description:
        "JPG・PNG・WebP画像をブラウザ上で90度単位または任意角度で回転できる無料オンラインツールです。アップロード不要で安全に使えます。",
      aboutTitle: "画像回転ツールとは？",
      aboutText:
        "画像回転ツールは、JPG・PNG・WebP画像をブラウザ上で回転できる無料オンラインツールです。写真の向きを整えたいとき、横向き画像を縦向きにしたいとき、SNS投稿用や資料用に角度を調整したいときに便利です。処理はブラウザ上で完結するため、画像ファイルを外部サーバーにアップロードせず安全に利用できます。",
      stepsTitle: "使い方",
      steps: [
        "画像ファイルをアップロードします",
        "回転角度を選択または入力します",
        "必要に応じて出力形式を選びます",
        "「画像を回転」ボタンを押します",
        "回転後の画像を確認してダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画像はサーバーにアップロードされますか？",
          answer:
            "いいえ。画像はブラウザ上で処理されるため、外部サーバーには送信されません。",
        },
        {
          question: "90度以外の角度でも回転できますか？",
          answer:
            "はい。90度刻みだけでなく、任意の角度を入力して回転できます。",
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
        { name: "画像反転", href: "/tools/flip-image" },
        { name: "画像切り抜き", href: "/tools/crop-image" },
        { name: "画像リサイズ", href: "/tools/resize-image" },
        { name: "画像圧縮", href: "/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ、または選択",
      emptyDescription:
        "JPG / PNG / WebP画像を回転できます。",
      selectButtonLabel: "画像を選択",
      dropHereLabel: "ここにファイルをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      angleLabel: "回転角度",
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
      rotatedDimensionsLabel: "回転後サイズ",
      previewBeforeLabel: "回転前プレビュー",
      previewAfterLabel: "回転後プレビュー",
      previewPlaceholder: "回転後のプレビューはここに表示されます。",
      rotateLeftButton: "左に90°回転",
      rotateRightButton: "右に90°回転",
      rotateButton: "画像を回転",
      rotatingButton: "回転中...",
      downloadButton: "回転画像をダウンロード",
      resetButton: "リセット",
      unknownType: "不明",
      invalidFileError:
        "エラー: JPG / PNG / WebP ファイルを選択してください。",
      processingStatus: "画像を回転中です...",
      successMessage: "完了: 画像の回転が完了しました。",
      rotateError: "エラー: 画像の回転に失敗しました。",
    },
  },
  en: {
    page: {
      title: "Rotate Image Tool",
      description:
        "Rotate JPG, PNG, and WebP images online for free. Turn images by 90 degrees or any custom angle directly in your browser.",
      aboutTitle: "What is Rotate Image Tool?",
      aboutText:
        "This free image rotator lets you rotate JPG, PNG, and WebP images directly in your browser. It is useful for fixing sideways photos, adjusting image orientation for documents, and preparing images for social media or websites. Since everything is processed locally, your files are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an image file",
        "Choose or enter the rotation angle",
        "Select an output format if needed",
        "Click Rotate Image",
        "Preview and download the rotated image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my images uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Can I rotate by angles other than 90 degrees?",
          answer:
            "Yes. You can use preset 90-degree controls or enter a custom angle.",
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
        { name: "Flip Image", href: "/en/tools/flip-image" },
        { name: "Crop Image", href: "/en/tools/crop-image" },
        { name: "Resize Image", href: "/en/tools/resize-image" },
        { name: "Image Compressor", href: "/en/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop an image here, or select a file",
      emptyDescription:
        "Rotate JPG, PNG, and WebP images directly in your browser.",
      selectButtonLabel: "Choose Image",
      dropHereLabel: "Drop file here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      angleLabel: "Rotation Angle",
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
      rotatedDimensionsLabel: "Rotated Dimensions",
      previewBeforeLabel: "Before Rotation",
      previewAfterLabel: "After Rotation",
      previewPlaceholder: "The rotated preview will appear here.",
      rotateLeftButton: "Rotate Left 90°",
      rotateRightButton: "Rotate Right 90°",
      rotateButton: "Rotate Image",
      rotatingButton: "Rotating...",
      downloadButton: "Download Rotated Image",
      resetButton: "Reset",
      unknownType: "Unknown",
      invalidFileError:
        "Error: Please select a JPG, PNG, or WebP file.",
      processingStatus: "Rotating image...",
      successMessage: "Done: Image rotation completed successfully.",
      rotateError: "Error: Failed to rotate the image.",
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
  if (outputFormat !== "original") return outputFormat;

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

export default function RotateImageTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [angle, setAngle] = useState<number>(90);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [rotatedWidth, setRotatedWidth] = useState<number>(0);
  const [rotatedHeight, setRotatedHeight] = useState<number>(0);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("original");
  const [rotatedBlob, setRotatedBlob] = useState<Blob | null>(null);
  const [rotatedPreviewUrl, setRotatedPreviewUrl] = useState("");

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
      if (rotatedPreviewUrl) URL.revokeObjectURL(rotatedPreviewUrl);
    };
  }, [rotatedPreviewUrl]);

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

    if (rotatedPreviewUrl) {
      URL.revokeObjectURL(rotatedPreviewUrl);
      setRotatedPreviewUrl("");
    }

    setRotatedBlob(null);

    if (!file) {
      setImage(null);
      setOriginalWidth(0);
      setOriginalHeight(0);
      setRotatedWidth(0);
      setRotatedHeight(0);
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
      setRotatedWidth(0);
      setRotatedHeight(0);
    } catch (error) {
      console.error(error);
      setImage(null);
      setMessage(ui.rotateError);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    void handleFileSelect(file);
    event.target.value = "";
  };

  const rotateBy = (delta: number) => {
    setAngle((prev) => prev + delta);
  };

  const handleRotate = async () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setMessage(ui.processingStatus);

      const loadedImage = await loadImageFromFile(image);
      const radians = (angle * Math.PI) / 180;
      const sin = Math.abs(Math.sin(radians));
      const cos = Math.abs(Math.cos(radians));

      const nextWidth = Math.round(
        loadedImage.width * cos + loadedImage.height * sin
      );
      const nextHeight = Math.round(
        loadedImage.width * sin + loadedImage.height * cos
      );

      const canvas = document.createElement("canvas");
      canvas.width = nextWidth;
      canvas.height = nextHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to initialize canvas");
      }

      ctx.translate(nextWidth / 2, nextHeight / 2);
      ctx.rotate(radians);
      ctx.drawImage(
        loadedImage,
        -loadedImage.width / 2,
        -loadedImage.height / 2
      );

      const targetMimeType = getOutputMimeType(image.type, outputFormat);
      const blob = await canvasToBlob(
        canvas,
        targetMimeType,
        targetMimeType === "image/png" ? undefined : 0.92
      );

      if (rotatedPreviewUrl) {
        URL.revokeObjectURL(rotatedPreviewUrl);
      }

      const nextUrl = URL.createObjectURL(blob);
      setRotatedBlob(blob);
      setRotatedPreviewUrl(nextUrl);
      setRotatedWidth(nextWidth);
      setRotatedHeight(nextHeight);
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.rotateError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!rotatedBlob || !image || !rotatedPreviewUrl) return;

    const targetMimeType = getOutputMimeType(image.type, outputFormat);
    const extension = getExtensionFromMimeType(targetMimeType);
    const dotIndex = image.name.lastIndexOf(".");
    const baseName = dotIndex >= 0 ? image.name.slice(0, dotIndex) : image.name;

    const link = document.createElement("a");
    link.href = rotatedPreviewUrl;
    link.download = `${baseName}-rotated.${extension}`;
    link.click();
  };

  const handleReset = () => {
    setImage(null);
    setMessage("");
    setIsProcessing(false);
    setAngle(90);
    setOriginalWidth(0);
    setOriginalHeight(0);
    setRotatedWidth(0);
    setRotatedHeight(0);
    setOutputFormat("original");

    if (rotatedPreviewUrl) {
      URL.revokeObjectURL(rotatedPreviewUrl);
    }

    setRotatedPreviewUrl("");
    setRotatedBlob(null);
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

            <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
              <div className="space-y-2">
                <label
                  htmlFor="rotate-angle"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.angleLabel}
                </label>
                <input
                  id="rotate-angle"
                  type="number"
                  step="1"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => rotateBy(-90)}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  {ui.rotateLeftButton}
                </button>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => rotateBy(90)}
                  className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  {ui.rotateRightButton}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="rotate-output-format"
                className="text-sm font-medium text-gray-800"
              >
                {ui.outputFormatLabel}
              </label>
              <select
                id="rotate-output-format"
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
                alt="before rotation preview"
                className="max-h-80 w-full rounded border object-contain"
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-600">{ui.previewAfterLabel}</div>
              {rotatedPreviewUrl ? (
                <img
                  src={rotatedPreviewUrl}
                  alt="after rotation preview"
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

        {rotatedBlob && (
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <p>
              <span className="font-medium text-gray-800">
                {ui.originalDimensionsLabel}:
              </span>{" "}
              {originalWidth} × {originalHeight}
            </p>
            <p>
              <span className="font-medium text-gray-800">
                {ui.rotatedDimensionsLabel}:
              </span>{" "}
              {rotatedWidth} × {rotatedHeight}
            </p>
            <p>
              <span className="font-medium text-gray-800">
                {ui.fileSizeLabel}:
              </span>{" "}
              {formatFileSize(rotatedBlob.size)}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            onClick={handleRotate}
            disabled={!image || isProcessing}
          >
            {isProcessing ? ui.rotatingButton : ui.rotateButton}
          </PrimaryButton>

          {rotatedBlob && (
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


