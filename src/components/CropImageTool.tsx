"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
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

type AspectRatioValue = "free" | "1:1" | "4:3" | "16:9";
type OutputFormat = "image/png" | "image/jpeg" | "image/webp";

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
  cropAreaLabel: string;
  aspectRatioLabel: string;
  freeRatioLabel: string;
  squareRatioLabel: string;
  ratio43Label: string;
  ratio169Label: string;
  circleCropLabel: string;
  outputFormatLabel: string;
  pngFormat: string;
  jpgFormat: string;
  webpFormat: string;
  previewBeforeLabel: string;
  previewAfterLabel: string;
  previewPlaceholder: string;
  cropButton: string;
  croppingButton: string;
  downloadButton: string;
  resetButton: string;
  hintText: string;
  unknownType: string;
  invalidFileError: string;
  missingSelectionError: string;
  processingStatus: string;
  successMessage: string;
  cropError: string;
};

type ToolContent = {
  page: PageContent;
  ui: UIContent;
};

type Props = {
  locale: Locale;
};

type CropRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type DisplaySize = {
  width: number;
  height: number;
};

const MIN_CROP_SIZE = 20;

const content: Record<Locale, ToolContent> = {
  ja: {
    page: {
      title: "画像切り抜きツール",
      description:
        "JPG・PNG・WebP画像をブラウザ上で切り抜きできる無料オンラインツールです。ドラッグで範囲指定、比率固定、円形トリミングに対応しています。",
      aboutTitle: "画像切り抜きツールとは？",
      aboutText:
        "画像切り抜きツールは、JPG・PNG・WebP画像をブラウザ上で自由に切り抜ける無料オンラインツールです。ドラッグで範囲を指定し、正方形や16:9などの比率固定にも対応しています。プロフィール画像向けの円形トリミングもできるため、SNSアイコン、バナー、商品画像、サムネイル作成などに便利です。処理はブラウザ上で完結するため、画像ファイルを外部サーバーにアップロードせず安全に利用できます。",
      stepsTitle: "使い方",
      steps: [
        "画像ファイルをアップロードします",
        "画像上でドラッグして切り抜き範囲を指定します",
        "必要に応じて比率を Free / 1:1 / 4:3 / 16:9 から選びます",
        "円形トリミングが必要ならオンにします",
        "「画像を切り抜く」を押してプレビュー確認後にダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画像はサーバーにアップロードされますか？",
          answer:
            "いいえ。画像はブラウザ上で処理されるため、外部サーバーには送信されません。",
        },
        {
          question: "切り抜き範囲は自由に選べますか？",
          answer:
            "はい。画像上をドラッグして自由に範囲を指定できます。既存の選択範囲の内側をドラッグすると移動もできます。",
        },
        {
          question: "正方形や16:9で切り抜けますか？",
          answer:
            "はい。Free、1:1、4:3、16:9 の比率を選べます。",
        },
        {
          question: "丸いアイコン画像も作れますか？",
          answer:
            "はい。円形トリミングをオンにすると、プロフィール画像向けの丸い切り抜き画像を作成できます。",
        },
      ],
      relatedTools: [
        { name: "画像リサイズ", href: "/tools/resize-image" },
        { name: "画像回転", href: "/tools/rotate-image" },
        { name: "画像反転", href: "/tools/flip-image" },
        { name: "画像圧縮", href: "/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ、または選択",
      emptyDescription:
        "JPG / PNG / WebP画像をドラッグで切り抜けます。",
      selectButtonLabel: "画像を選択",
      dropHereLabel: "ここにファイルをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      originalDimensionsLabel: "元のサイズ",
      cropAreaLabel: "切り抜き範囲",
      aspectRatioLabel: "比率",
      freeRatioLabel: "Free",
      squareRatioLabel: "1:1",
      ratio43Label: "4:3",
      ratio169Label: "16:9",
      circleCropLabel: "円形トリミング",
      outputFormatLabel: "出力形式",
      pngFormat: "PNG",
      jpgFormat: "JPG",
      webpFormat: "WebP",
      previewBeforeLabel: "切り抜き前プレビュー",
      previewAfterLabel: "切り抜き後プレビュー",
      previewPlaceholder: "切り抜き後のプレビューはここに表示されます。",
      cropButton: "画像を切り抜く",
      croppingButton: "切り抜き中...",
      downloadButton: "切り抜き画像をダウンロード",
      resetButton: "リセット",
      hintText:
        "画像上でドラッグして範囲指定できます。選択範囲の内側をドラッグすると移動できます。",
      unknownType: "不明",
      invalidFileError:
        "エラー: JPG / PNG / WebP ファイルを選択してください。",
      missingSelectionError:
        "エラー: 先に画像上で切り抜き範囲を指定してください。",
      processingStatus: "画像を切り抜き中です...",
      successMessage: "完了: 画像の切り抜きが完了しました。",
      cropError: "エラー: 画像の切り抜きに失敗しました。",
    },
  },
  en: {
    page: {
      title: "Crop Image Tool",
      description:
        "Crop JPG, PNG, and WebP images online for free. Drag to select an area, lock aspect ratio, and create circular crops directly in your browser.",
      aboutTitle: "What is Crop Image Tool?",
      aboutText:
        "This free image cropper lets you crop JPG, PNG, and WebP images directly in your browser. You can drag to select an area, lock the crop to common aspect ratios like 1:1 or 16:9, and enable circular cropping for profile pictures and icons. It is useful for social media posts, thumbnails, banners, product images, and avatar creation. Since everything is processed locally, your files are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an image file",
        "Drag on the image to select the crop area",
        "Choose an aspect ratio such as Free, 1:1, 4:3, or 16:9 if needed",
        "Turn on circular crop if you want a round result",
        "Click Crop Image, preview the result, and download it",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my images uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Can I choose the crop area freely?",
          answer:
            "Yes. You can drag on the image to create a crop area. You can also drag inside the current selection to move it.",
        },
        {
          question: "Can I crop to square or 16:9?",
          answer:
            "Yes. You can choose Free, 1:1, 4:3, or 16:9 aspect ratios.",
        },
        {
          question: "Can I make round profile images?",
          answer:
            "Yes. Turn on circular crop to create round images for avatars and profile pictures.",
        },
      ],
      relatedTools: [
        { name: "Resize Image", href: "/en/tools/resize-image" },
        { name: "Rotate Image", href: "/en/tools/rotate-image" },
        { name: "Flip Image", href: "/en/tools/flip-image" },
        { name: "Image Compressor", href: "/en/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop an image here, or select a file",
      emptyDescription:
        "Crop JPG, PNG, and WebP images by dragging on the image.",
      selectButtonLabel: "Choose Image",
      dropHereLabel: "Drop file here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      originalDimensionsLabel: "Original Dimensions",
      cropAreaLabel: "Crop Area",
      aspectRatioLabel: "Aspect Ratio",
      freeRatioLabel: "Free",
      squareRatioLabel: "1:1",
      ratio43Label: "4:3",
      ratio169Label: "16:9",
      circleCropLabel: "Circular Crop",
      outputFormatLabel: "Output Format",
      pngFormat: "PNG",
      jpgFormat: "JPG",
      webpFormat: "WebP",
      previewBeforeLabel: "Before Crop",
      previewAfterLabel: "After Crop",
      previewPlaceholder: "The cropped preview will appear here.",
      cropButton: "Crop Image",
      croppingButton: "Cropping...",
      downloadButton: "Download Cropped Image",
      resetButton: "Reset",
      hintText:
        "Drag on the image to create a selection. Drag inside the selection to move it.",
      unknownType: "Unknown",
      invalidFileError:
        "Error: Please select a JPG, PNG, or WebP file.",
      missingSelectionError:
        "Error: Please select a crop area on the image first.",
      processingStatus: "Cropping image...",
      successMessage: "Done: Image cropping completed successfully.",
      cropError: "Error: Failed to crop the image.",
    },
  },
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getAspectRatioValue(aspectRatio: AspectRatioValue) {
  switch (aspectRatio) {
    case "1:1":
      return 1;
    case "4:3":
      return 4 / 3;
    case "16:9":
      return 16 / 9;
    default:
      return null;
  }
}

function getExtensionFromMimeType(mimeType: OutputFormat) {
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function CropImageTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioValue>("free");
  const [circleCrop, setCircleCrop] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("image/png");

  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [displaySize, setDisplaySize] = useState<DisplaySize>({
    width: 0,
    height: 0,
  });

  const [cropRect, setCropRect] = useState<CropRect | null>(null);
  const [croppedBlob, setCroppedBlob] = useState<Blob | null>(null);
  const [croppedPreviewUrl, setCroppedPreviewUrl] = useState("");

  const [dragMode, setDragMode] = useState<"none" | "create" | "move">("none");
  const dragStartRef = useRef({ x: 0, y: 0 });
  const moveStartCropRef = useRef<CropRect | null>(null);

  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

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
      if (croppedPreviewUrl) URL.revokeObjectURL(croppedPreviewUrl);
    };
  }, [croppedPreviewUrl]);

  const fileInfo = useMemo(() => {
    if (!image) return null;

    return {
      name: image.name,
      type: image.type || ui.unknownType,
      size: formatFileSize(image.size),
    };
  }, [image, ui.unknownType]);

  const updateDisplaySize = () => {
    if (!imageRef.current) return;
    setDisplaySize({
      width: imageRef.current.clientWidth,
      height: imageRef.current.clientHeight,
    });
  };

  useEffect(() => {
    const handleResize = () => updateDisplaySize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const applyAspectRatio = (
    startX: number,
    startY: number,
    currentX: number,
    currentY: number,
    maxWidth: number,
    maxHeight: number
  ): CropRect => {
    const ratio = getAspectRatioValue(aspectRatio);

    const x = Math.min(startX, currentX);
    const y = Math.min(startY, currentY);
    let width = Math.abs(currentX - startX);
    let height = Math.abs(currentY - startY);

    if (!ratio) {
      return { x, y, width, height };
    }

    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    const signX = deltaX >= 0 ? 1 : -1;
    const signY = deltaY >= 0 ? 1 : -1;

    if (width / Math.max(height, 1) > ratio) {
      height = width / ratio;
    } else {
      width = height * ratio;
    }

    let nextX = signX >= 0 ? startX : startX - width;
    let nextY = signY >= 0 ? startY : startY - height;

    if (nextX < 0) {
      nextX = 0;
      width = startX;
      height = ratio ? width / ratio : height;
      if (signY < 0) nextY = startY - height;
    }

    if (nextY < 0) {
      nextY = 0;
      height = startY;
      width = ratio ? height * ratio : width;
      if (signX < 0) nextX = startX - width;
    }

    if (nextX + width > maxWidth) {
      width = maxWidth - nextX;
      height = ratio ? width / ratio : height;
      if (signY < 0) nextY = startY - height;
    }

    if (nextY + height > maxHeight) {
      height = maxHeight - nextY;
      width = ratio ? height * ratio : width;
      if (signX < 0) nextX = startX - width;
    }

    return {
      x: clamp(nextX, 0, maxWidth),
      y: clamp(nextY, 0, maxHeight),
      width: Math.max(0, width),
      height: Math.max(0, height),
    };
  };

  const initializeDefaultCrop = (
    naturalWidth: number,
    naturalHeight: number,
    displayedWidth: number,
    displayedHeight: number,
    nextAspectRatio: AspectRatioValue
  ) => {
    const ratioValue = getAspectRatioValue(nextAspectRatio);
    const padding = 0.08;

    let width = displayedWidth * (1 - padding * 2);
    let height = displayedHeight * (1 - padding * 2);

    if (ratioValue) {
      if (width / height > ratioValue) {
        width = height * ratioValue;
      } else {
        height = width / ratioValue;
      }
    } else {
      const square = Math.min(width, height);
      width = square;
      height = square;
    }

    setCropRect({
      x: (displayedWidth - width) / 2,
      y: (displayedHeight - height) / 2,
      width,
      height,
    });

    setOriginalWidth(naturalWidth);
    setOriginalHeight(naturalHeight);
  };

  const handleFileSelect = async (file: File | null) => {
    setMessage("");

    if (croppedPreviewUrl) {
      URL.revokeObjectURL(croppedPreviewUrl);
      setCroppedPreviewUrl("");
    }

    setCroppedBlob(null);
    setCropRect(null);

    if (!file) {
      setImage(null);
      setOriginalWidth(0);
      setOriginalHeight(0);
      setDisplaySize({ width: 0, height: 0 });
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
      setMessage(ui.cropError);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    void handleFileSelect(file);
    event.target.value = "";
  };

  useEffect(() => {
    if (!image || !displaySize.width || !displaySize.height || cropRect) return;
    initializeDefaultCrop(
      originalWidth,
      originalHeight,
      displaySize.width,
      displaySize.height,
      aspectRatio
    );
  }, [image, displaySize, cropRect, originalWidth, originalHeight, aspectRatio]);

  const handleAspectRatioChange = (nextAspectRatio: AspectRatioValue) => {
    setAspectRatio(nextAspectRatio);

    if (!displaySize.width || !displaySize.height) return;

    initializeDefaultCrop(
      originalWidth,
      originalHeight,
      displaySize.width,
      displaySize.height,
      nextAspectRatio
    );
  };

  const getPointerPosition = (clientX: number, clientY: number) => {
    if (!imageContainerRef.current) return null;
    const rect = imageContainerRef.current.getBoundingClientRect();
    return {
      x: clamp(clientX - rect.left, 0, rect.width),
      y: clamp(clientY - rect.top, 0, rect.height),
      width: rect.width,
      height: rect.height,
    };
  };

  const isInsideCrop = (x: number, y: number, rect: CropRect) => {
    return (
      x >= rect.x &&
      x <= rect.x + rect.width &&
      y >= rect.y &&
      y <= rect.y + rect.height
    );
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!image) return;
    const point = getPointerPosition(event.clientX, event.clientY);
    if (!point) return;

    (event.currentTarget as HTMLDivElement).setPointerCapture(event.pointerId);

    if (cropRect && isInsideCrop(point.x, point.y, cropRect)) {
      setDragMode("move");
      dragStartRef.current = { x: point.x, y: point.y };
      moveStartCropRef.current = cropRect;
      return;
    }

    setDragMode("create");
    dragStartRef.current = { x: point.x, y: point.y };
    setCropRect({
      x: point.x,
      y: point.y,
      width: 0,
      height: 0,
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragMode === "none") return;
    const point = getPointerPosition(event.clientX, event.clientY);
    if (!point) return;

    if (dragMode === "create") {
      const nextCrop = applyAspectRatio(
        dragStartRef.current.x,
        dragStartRef.current.y,
        point.x,
        point.y,
        point.width,
        point.height
      );

      setCropRect(nextCrop);
      return;
    }

    if (dragMode === "move" && moveStartCropRef.current) {
      const dx = point.x - dragStartRef.current.x;
      const dy = point.y - dragStartRef.current.y;
      const startCrop = moveStartCropRef.current;

      const nextX = clamp(
        startCrop.x + dx,
        0,
        Math.max(0, point.width - startCrop.width)
      );
      const nextY = clamp(
        startCrop.y + dy,
        0,
        Math.max(0, point.height - startCrop.height)
      );

      setCropRect({
        ...startCrop,
        x: nextX,
        y: nextY,
      });
    }
  };

  const handlePointerUp = () => {
    setDragMode("none");

    setCropRect((prev) => {
      if (!prev) return prev;
      if (prev.width < MIN_CROP_SIZE || prev.height < MIN_CROP_SIZE) {
        return null;
      }
      return prev;
    });
  };

  const handleCrop = async () => {
    if (!image || !cropRect || isProcessing || !displaySize.width || !displaySize.height) {
      if (!cropRect) {
        setMessage(ui.missingSelectionError);
      }
      return;
    }

    try {
      setIsProcessing(true);
      setMessage(ui.processingStatus);

      const loadedImage = await loadImageFromFile(image);

      const scaleX = loadedImage.width / displaySize.width;
      const scaleY = loadedImage.height / displaySize.height;

      const sx = Math.round(cropRect.x * scaleX);
      const sy = Math.round(cropRect.y * scaleY);
      const sw = Math.round(cropRect.width * scaleX);
      const sh = Math.round(cropRect.height * scaleY);

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, sw);
      canvas.height = Math.max(1, sh);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to initialize canvas");
      }

      if (circleCrop) {
        if (outputFormat === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.save();
        ctx.beginPath();
        const radius = Math.min(canvas.width, canvas.height) / 2;
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(loadedImage, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
        ctx.restore();
      } else {
        ctx.drawImage(loadedImage, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      }

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (nextBlob) => {
            if (!nextBlob) {
              reject(new Error("Failed to create blob"));
              return;
            }
            resolve(nextBlob);
          },
          outputFormat,
          outputFormat === "image/png" ? undefined : 0.92
        );
      });

      if (croppedPreviewUrl) {
        URL.revokeObjectURL(croppedPreviewUrl);
      }

      const nextUrl = URL.createObjectURL(blob);
      setCroppedBlob(blob);
      setCroppedPreviewUrl(nextUrl);
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.cropError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!croppedBlob || !image || !croppedPreviewUrl) return;

    const extension = getExtensionFromMimeType(outputFormat);
    const dotIndex = image.name.lastIndexOf(".");
    const baseName = dotIndex >= 0 ? image.name.slice(0, dotIndex) : image.name;

    const link = document.createElement("a");
    link.href = croppedPreviewUrl;
    link.download = `${baseName}-cropped.${extension}`;
    link.click();
  };

  const handleReset = () => {
    setImage(null);
    setMessage("");
    setIsProcessing(false);
    setAspectRatio("free");
    setCircleCrop(false);
    setOutputFormat("image/png");
    setOriginalWidth(0);
    setOriginalHeight(0);
    setDisplaySize({ width: 0, height: 0 });
    setCropRect(null);

    if (croppedPreviewUrl) {
      URL.revokeObjectURL(croppedPreviewUrl);
    }

    setCroppedPreviewUrl("");
    setCroppedBlob(null);
  };

  const overlayStyles =
    cropRect && displaySize.width && displaySize.height
      ? {
          left: `${cropRect.x}px`,
          top: `${cropRect.y}px`,
          width: `${cropRect.width}px`,
          height: `${cropRect.height}px`,
        }
      : null;

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
                {cropRect ? (
                  <p>
                    <span className="font-medium text-gray-800">
                      {ui.cropAreaLabel}:
                    </span>{" "}
                    {Math.round(cropRect.width)} × {Math.round(cropRect.height)}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label
                  htmlFor="crop-aspect-ratio"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.aspectRatioLabel}
                </label>
                <select
                  id="crop-aspect-ratio"
                  value={aspectRatio}
                  onChange={(e) =>
                    handleAspectRatioChange(e.target.value as AspectRatioValue)
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                >
                  <option value="free">{ui.freeRatioLabel}</option>
                  <option value="1:1">{ui.squareRatioLabel}</option>
                  <option value="4:3">{ui.ratio43Label}</option>
                  <option value="16:9">{ui.ratio169Label}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="crop-output-format"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.outputFormatLabel}
                </label>
                <select
                  id="crop-output-format"
                  value={outputFormat}
                  onChange={(e) =>
                    setOutputFormat(e.target.value as OutputFormat)
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                >
                  <option value="image/png">{ui.pngFormat}</option>
                  <option value="image/jpeg">{ui.jpgFormat}</option>
                  <option value="image/webp">{ui.webpFormat}</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-3 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={circleCrop}
                    onChange={(e) => setCircleCrop(e.target.checked)}
                  />
                  {ui.circleCropLabel}
                </label>
              </div>
            </div>

            <p className="text-sm text-gray-600">{ui.hintText}</p>
          </div>
        )}

        {previewUrl && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">{ui.previewBeforeLabel}</div>
              <div
                ref={imageContainerRef}
                className="relative inline-block max-w-full touch-none select-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                <img
                  ref={imageRef}
                  src={previewUrl}
                  alt="before crop preview"
                  onLoad={() => {
                    updateDisplaySize();
                    if (imageRef.current?.naturalWidth && imageRef.current?.naturalHeight) {
                      setOriginalWidth(imageRef.current.naturalWidth);
                      setOriginalHeight(imageRef.current.naturalHeight);
                    }
                  }}
                  className="max-h-[520px] w-full rounded border object-contain"
                />

                {displaySize.width && displaySize.height ? (
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      width: `${displaySize.width}px`,
                      height: `${displaySize.height}px`,
                    }}
                  >
                    {cropRect ? (
                      <>
                        <div
                          className="absolute inset-0 bg-black/45"
                          style={{
                            clipPath: `polygon(
                              0% 0%,
                              0% 100%,
                              ${cropRect.x}px 100%,
                              ${cropRect.x}px ${cropRect.y}px,
                              ${cropRect.x + cropRect.width}px ${cropRect.y}px,
                              ${cropRect.x + cropRect.width}px ${cropRect.y + cropRect.height}px,
                              ${cropRect.x}px ${cropRect.y + cropRect.height}px,
                              ${cropRect.x}px 100%,
                              100% 100%,
                              100% 0%
                            )`,
                          }}
                        />
                        <div
                          className={`absolute border-2 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.35)] ${
                            circleCrop ? "rounded-full" : "rounded"
                          }`}
                          style={overlayStyles ?? undefined}
                        />
                      </>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-600">{ui.previewAfterLabel}</div>
              {croppedPreviewUrl ? (
                <img
                  src={croppedPreviewUrl}
                  alt="after crop preview"
                  className={`max-h-[520px] w-full rounded border object-contain ${
                    circleCrop ? "bg-[radial-gradient(circle,_#f3f4f6_1px,_transparent_1px)] [background-size:12px_12px]" : ""
                  }`}
                />
              ) : (
                <div className="flex h-[320px] items-center justify-center rounded border border-dashed bg-gray-50 px-4 text-center text-sm text-gray-500">
                  {ui.previewPlaceholder}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            onClick={handleCrop}
            disabled={!image || !cropRect || isProcessing}
          >
            {isProcessing ? ui.croppingButton : ui.cropButton}
          </PrimaryButton>

          {croppedBlob && (
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


