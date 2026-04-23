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
type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

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
  watermarkTextLabel: string;
  fontSizeLabel: string;
  opacityLabel: string;
  colorLabel: string;
  positionLabel: string;
  outputFormatLabel: string;
  keepOriginalFormat: string;
  jpgFormat: string;
  pngFormat: string;
  webpFormat: string;
  topLeftLabel: string;
  topCenterLabel: string;
  topRightLabel: string;
  centerLabel: string;
  bottomLeftLabel: string;
  bottomCenterLabel: string;
  bottomRightLabel: string;
  previewBeforeLabel: string;
  previewAfterLabel: string;
  previewPlaceholder: string;
  addWatermarkButton: string;
  processingButton: string;
  downloadButton: string;
  resetButton: string;
  unknownType: string;
  invalidFileError: string;
  watermarkRequiredError: string;
  processingStatus: string;
  successMessage: string;
  watermarkError: string;
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
      title: "画像透かし追加ツール",
      description:
        "JPG・PNG・WebP画像に文字の透かしを追加できる無料オンラインツールです。ブラウザ上で安全に処理できます。",
      aboutTitle: "画像透かし追加ツールとは？",
      aboutText:
        "画像透かし追加ツールは、JPG・PNG・WebP画像にテキストの透かしを追加できる無料オンラインツールです。著作権表示、ブランド名、サイト名、サンプル表示、SNS用の透かし入れなどに便利です。文字サイズ、透明度、色、配置を調整でき、処理はブラウザ上で完結するため、画像ファイルを外部サーバーにアップロードせず安全に利用できます。",
      stepsTitle: "使い方",
      steps: [
        "画像ファイルをアップロードします",
        "透かし文字を入力します",
        "文字サイズ・透明度・色・位置を調整します",
        "必要に応じて出力形式を選びます",
        "「透かしを追加」ボタンを押してダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画像はサーバーにアップロードされますか？",
          answer:
            "いいえ。画像はブラウザ上で処理されるため、外部サーバーには送信されません。",
        },
        {
          question: "ロゴ画像の透かしは入れられますか？",
          answer:
            "今回の版では文字透かしに対応しています。将来的に画像ロゴ透かしへ拡張しやすい構成です。",
        },
        {
          question: "透明度は調整できますか？",
          answer:
            "はい。透明度スライダーで透かし文字の濃さを調整できます。",
        },
        {
          question: "スマホでも使えますか？",
          answer:
            "はい。対応ブラウザであればスマホ・タブレット・PCから利用できます。",
        },
      ],
      relatedTools: [
        { name: "画像圧縮", href: "/tools/image-compress" },
        { name: "画像リサイズ", href: "/tools/resize-image" },
        { name: "画像切り抜き", href: "/tools/crop-image" },
        { name: "画像回転", href: "/tools/rotate-image" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ、または選択",
      emptyDescription:
        "JPG / PNG / WebP画像に文字の透かしを追加できます。",
      selectButtonLabel: "画像を選択",
      dropHereLabel: "ここにファイルをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      originalDimensionsLabel: "元のサイズ",
      resultDimensionsLabel: "出力後サイズ",
      watermarkTextLabel: "透かし文字",
      fontSizeLabel: "文字サイズ",
      opacityLabel: "透明度",
      colorLabel: "文字色",
      positionLabel: "配置",
      outputFormatLabel: "出力形式",
      keepOriginalFormat: "元の形式のまま",
      jpgFormat: "JPG",
      pngFormat: "PNG",
      webpFormat: "WebP",
      topLeftLabel: "左上",
      topCenterLabel: "上中央",
      topRightLabel: "右上",
      centerLabel: "中央",
      bottomLeftLabel: "左下",
      bottomCenterLabel: "下中央",
      bottomRightLabel: "右下",
      previewBeforeLabel: "透かし追加前プレビュー",
      previewAfterLabel: "透かし追加後プレビュー",
      previewPlaceholder: "透かし追加後のプレビューはここに表示されます。",
      addWatermarkButton: "透かしを追加",
      processingButton: "追加中...",
      downloadButton: "透かし画像をダウンロード",
      resetButton: "リセット",
      unknownType: "不明",
      invalidFileError:
        "エラー: JPG / PNG / WebP ファイルを選択してください。",
      watermarkRequiredError:
        "エラー: 透かし文字を入力してください。",
      processingStatus: "透かしを追加中です...",
      successMessage: "完了: 透かしの追加が完了しました。",
      watermarkError: "エラー: 透かしの追加に失敗しました。",
    },
  },
  en: {
    page: {
      title: "Watermark Image Tool",
      description:
        "Add text watermarks to JPG, PNG, and WebP images online for free. Everything runs directly in your browser.",
      aboutTitle: "What is Watermark Image Tool?",
      aboutText:
        "This free watermark tool lets you add text watermarks to JPG, PNG, and WebP images directly in your browser. It is useful for copyright text, brand names, website names, sample labels, and social media image protection. You can adjust font size, opacity, color, and position. Since everything is processed locally, your files are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an image file",
        "Enter your watermark text",
        "Adjust font size, opacity, color, and position",
        "Select an output format if needed",
        "Click Add Watermark and download the result",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my images uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Can I add an image logo watermark?",
          answer:
            "This version supports text watermarks. The structure is easy to extend later for image logo watermarks.",
        },
        {
          question: "Can I adjust opacity?",
          answer:
            "Yes. You can control how visible the watermark is with the opacity slider.",
        },
        {
          question: "Does it work on mobile devices?",
          answer:
            "Yes. It works on phones, tablets, and desktop browsers that support modern web features.",
        },
      ],
      relatedTools: [
        { name: "Image Compressor", href: "/en/tools/image-compress" },
        { name: "Resize Image", href: "/en/tools/resize-image" },
        { name: "Crop Image", href: "/en/tools/crop-image" },
        { name: "Rotate Image", href: "/en/tools/rotate-image" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop an image here, or select a file",
      emptyDescription:
        "Add text watermarks to JPG, PNG, and WebP images.",
      selectButtonLabel: "Choose Image",
      dropHereLabel: "Drop file here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      originalDimensionsLabel: "Original Dimensions",
      resultDimensionsLabel: "Output Dimensions",
      watermarkTextLabel: "Watermark Text",
      fontSizeLabel: "Font Size",
      opacityLabel: "Opacity",
      colorLabel: "Text Color",
      positionLabel: "Position",
      outputFormatLabel: "Output Format",
      keepOriginalFormat: "Keep original format",
      jpgFormat: "JPG",
      pngFormat: "PNG",
      webpFormat: "WebP",
      topLeftLabel: "Top Left",
      topCenterLabel: "Top Center",
      topRightLabel: "Top Right",
      centerLabel: "Center",
      bottomLeftLabel: "Bottom Left",
      bottomCenterLabel: "Bottom Center",
      bottomRightLabel: "Bottom Right",
      previewBeforeLabel: "Before Watermark",
      previewAfterLabel: "After Watermark",
      previewPlaceholder: "The watermarked preview will appear here.",
      addWatermarkButton: "Add Watermark",
      processingButton: "Processing...",
      downloadButton: "Download Watermarked Image",
      resetButton: "Reset",
      unknownType: "Unknown",
      invalidFileError:
        "Error: Please select a JPG, PNG, or WebP file.",
      watermarkRequiredError:
        "Error: Please enter watermark text.",
      processingStatus: "Adding watermark...",
      successMessage: "Done: Watermark added successfully.",
      watermarkError: "Error: Failed to add watermark.",
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

function getWatermarkPosition(
  position: WatermarkPosition,
  canvasWidth: number,
  canvasHeight: number,
  textWidth: number,
  fontSize: number
) {
  const margin = Math.max(16, Math.round(fontSize * 0.6));

  switch (position) {
    case "top-left":
      return { x: margin, y: margin + fontSize };
    case "top-center":
      return { x: (canvasWidth - textWidth) / 2, y: margin + fontSize };
    case "top-right":
      return { x: canvasWidth - textWidth - margin, y: margin + fontSize };
    case "center":
      return { x: (canvasWidth - textWidth) / 2, y: canvasHeight / 2 };
    case "bottom-left":
      return { x: margin, y: canvasHeight - margin };
    case "bottom-center":
      return { x: (canvasWidth - textWidth) / 2, y: canvasHeight - margin };
    case "bottom-right":
    default:
      return { x: canvasWidth - textWidth - margin, y: canvasHeight - margin };
  }
}

export default function WatermarkImageTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [watermarkText, setWatermarkText] = useState(locale === "ja" ? "SAMPLE" : "SAMPLE");
  const [fontSize, setFontSize] = useState(36);
  const [opacity, setOpacity] = useState(35);
  const [textColor, setTextColor] = useState("#ffffff");
  const [position, setPosition] = useState<WatermarkPosition>("bottom-right");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("original");
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [watermarkedBlob, setWatermarkedBlob] = useState<Blob | null>(null);
  const [watermarkedPreviewUrl, setWatermarkedPreviewUrl] = useState("");

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
      if (watermarkedPreviewUrl) URL.revokeObjectURL(watermarkedPreviewUrl);
    };
  }, [watermarkedPreviewUrl]);

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

    if (watermarkedPreviewUrl) {
      URL.revokeObjectURL(watermarkedPreviewUrl);
      setWatermarkedPreviewUrl("");
    }

    setWatermarkedBlob(null);

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
      setMessage(ui.watermarkError);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    void handleFileSelect(file);
    event.target.value = "";
  };

  const handleAddWatermark = async () => {
    if (!image || isProcessing) return;

    if (!watermarkText.trim()) {
      setMessage(ui.watermarkRequiredError);
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

      ctx.drawImage(loadedImage, 0, 0);

      const scaledFontSize = Math.max(
        14,
        Math.round((Math.min(canvas.width, canvas.height) / 1000) * fontSize * 2.2)
      );

      ctx.font = `700 ${scaledFontSize}px Arial, sans-serif`;
      ctx.fillStyle = textColor;
      ctx.globalAlpha = opacity / 100;
      ctx.textBaseline = position === "center" ? "middle" : "alphabetic";

      const textWidth = ctx.measureText(watermarkText).width;
      const { x, y } = getWatermarkPosition(
        position,
        canvas.width,
        canvas.height,
        textWidth,
        scaledFontSize
      );

      ctx.shadowColor = "rgba(0,0,0,0.35)";
      ctx.shadowBlur = Math.max(2, Math.round(scaledFontSize * 0.12));
      ctx.fillText(watermarkText, x, y);

      const targetMimeType = getOutputMimeType(image.type, outputFormat);
      const blob = await canvasToBlob(
        canvas,
        targetMimeType,
        targetMimeType === "image/png" ? undefined : 0.92
      );

      if (watermarkedPreviewUrl) {
        URL.revokeObjectURL(watermarkedPreviewUrl);
      }

      const nextUrl = URL.createObjectURL(blob);
      setWatermarkedBlob(blob);
      setWatermarkedPreviewUrl(nextUrl);
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.watermarkError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!watermarkedBlob || !image || !watermarkedPreviewUrl) return;

    const targetMimeType = getOutputMimeType(image.type, outputFormat);
    const extension = getExtensionFromMimeType(targetMimeType);
    const dotIndex = image.name.lastIndexOf(".");
    const baseName = dotIndex >= 0 ? image.name.slice(0, dotIndex) : image.name;

    const link = document.createElement("a");
    link.href = watermarkedPreviewUrl;
    link.download = `${baseName}-watermarked.${extension}`;
    link.click();
  };

  const handleReset = () => {
    setImage(null);
    setMessage("");
    setIsProcessing(false);
    setWatermarkText("SAMPLE");
    setFontSize(36);
    setOpacity(35);
    setTextColor("#ffffff");
    setPosition("bottom-right");
    setOutputFormat("original");
    setOriginalWidth(0);
    setOriginalHeight(0);

    if (watermarkedPreviewUrl) {
      URL.revokeObjectURL(watermarkedPreviewUrl);
    }

    setWatermarkedPreviewUrl("");
    setWatermarkedBlob(null);
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

            <div className="space-y-2">
              <label
                htmlFor="watermark-text"
                className="text-sm font-medium text-gray-800"
              >
                {ui.watermarkTextLabel}
              </label>
              <input
                id="watermark-text"
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="watermark-font-size"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.fontSizeLabel}: {fontSize}
                </label>
                <input
                  id="watermark-font-size"
                  type="range"
                  min="12"
                  max="96"
                  step="1"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="watermark-opacity"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.opacityLabel}: {opacity}%
                </label>
                <input
                  id="watermark-opacity"
                  type="range"
                  min="5"
                  max="100"
                  step="1"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label
                  htmlFor="watermark-color"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.colorLabel}
                </label>
                <input
                  id="watermark-color"
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="h-11 w-full rounded-xl border border-gray-300 bg-white px-2 py-1"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="watermark-position"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.positionLabel}
                </label>
                <select
                  id="watermark-position"
                  value={position}
                  onChange={(e) =>
                    setPosition(e.target.value as WatermarkPosition)
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                >
                  <option value="top-left">{ui.topLeftLabel}</option>
                  <option value="top-center">{ui.topCenterLabel}</option>
                  <option value="top-right">{ui.topRightLabel}</option>
                  <option value="center">{ui.centerLabel}</option>
                  <option value="bottom-left">{ui.bottomLeftLabel}</option>
                  <option value="bottom-center">{ui.bottomCenterLabel}</option>
                  <option value="bottom-right">{ui.bottomRightLabel}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="watermark-output-format"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.outputFormatLabel}
                </label>
                <select
                  id="watermark-output-format"
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
          </div>
        )}

        {previewUrl && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">{ui.previewBeforeLabel}</div>
              <img
                src={previewUrl}
                alt="before watermark preview"
                className="max-h-80 w-full rounded border object-contain"
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-600">{ui.previewAfterLabel}</div>
              {watermarkedPreviewUrl ? (
                <img
                  src={watermarkedPreviewUrl}
                  alt="after watermark preview"
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

        {watermarkedBlob && (
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
              {formatFileSize(watermarkedBlob.size)}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            onClick={handleAddWatermark}
            disabled={!image || isProcessing}
          >
            {isProcessing ? ui.processingButton : ui.addWatermarkButton}
          </PrimaryButton>

          {watermarkedBlob && (
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


