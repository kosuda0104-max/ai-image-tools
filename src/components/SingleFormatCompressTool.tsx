"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";

type Locale = "ja" | "en";
type FormatKey = "jpg" | "png" | "webp";

type Props = {
  locale: Locale;
  format: FormatKey;
};

const formatConfig = {
  jpg: { mimeType: "image/jpeg", accept: "image/jpeg,.jpg,.jpeg", test: /\.(jpg|jpeg)$/i, ext: "jpg" },
  png: { mimeType: "image/png", accept: "image/png,.png", test: /\.png$/i, ext: "png" },
  webp: { mimeType: "image/webp", accept: "image/webp,.webp", test: /\.webp$/i, ext: "webp" },
} as const;

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getText(locale: Locale, format: FormatKey) {
  const ja = locale === "ja";
  const titleMap = {
    jpg: ja ? "JPG\u5727\u7e2e" : "JPG Compressor",
    png: ja ? "PNG\u5727\u7e2e" : "PNG Compressor",
    webp: ja ? "WebP\u5727\u7e2e" : "WebP Compressor",
  };

  return {
    title: titleMap[format],
    description: ja
      ? "\u753b\u50cf\u306e\u5bb9\u91cf\u3092\u30d6\u30e9\u30a6\u30b6\u4e0a\u3067\u8abf\u6574\u3067\u304d\u308b\u7121\u6599\u30c4\u30fc\u30eb\u3067\u3059\u3002"
      : "A free browser-based tool for reducing image file size.",
    about: ja
      ? "\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u3084\u5171\u6709\u3092\u3057\u3084\u3059\u304f\u3059\u308b\u305f\u3081\u306b\u3001\u753b\u50cf\u3092\u8efd\u304f\u3057\u305f\u3044\u3068\u304d\u306b\u5411\u3044\u3066\u3044\u307e\u3059\u3002"
      : "Useful when you want a lighter image for uploads, pages, or sharing.",
    sectionTitle: ja ? "\u4f7f\u3044\u3069\u3053\u308d" : "When it helps",
    sectionBody: ja
      ? "\u8a18\u4e8b\u753b\u50cf\u3001\u30e1\u30fc\u30eb\u6dfb\u4ed8\u3001\u753b\u50cf\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u306a\u3069\u3067\u30b5\u30a4\u30ba\u3092\u843d\u3068\u3057\u305f\u3044\u3068\u304d\u306b\u4fbf\u5229\u3067\u3059\u3002"
      : "A practical fit for article images, uploads, email attachments, and lighter web delivery.",
    listTitle: ja ? "\u30dd\u30a4\u30f3\u30c8" : "Tips",
    list: ja
      ? [
          "\u54c1\u8cea 80 \u524d\u5f8c\u304b\u3089\u8a66\u3059\u3068\u30d0\u30e9\u30f3\u30b9\u3092\u898b\u3084\u3059\u3044\u3067\u3059\u3002",
          "\u5143\u753b\u50cf\u3092\u6b8b\u3057\u3066\u304a\u304f\u3068\u518d\u8abf\u6574\u3057\u3084\u3059\u304f\u306a\u308a\u307e\u3059\u3002",
        ]
      : [
          "Starting around quality 80 is usually a safe first pass.",
          "Keep the original file if you may need it later.",
        ],
    relatedTools:
      locale === "ja"
        ? [
            { name: "\u753b\u50cf\u5727\u7e2e", href: "/tools/image-compress" },
            { name: "\u753b\u50cf\u30ea\u30b5\u30a4\u30ba", href: "/tools/resize-image" },
          ]
        : [
            { name: "Image Compress", href: "/en/tools/image-compress" },
            { name: "Resize Image", href: "/en/tools/resize-image" },
          ],
  };
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

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Failed to create blob"));
        return;
      }
      resolve(blob);
    }, mimeType, quality);
  });
}

export default function SingleFormatCompressTool({ locale, format }: Props) {
  const isJa = locale === "ja";
  const text = getText(locale, format);
  const config = formatConfig[format];
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState(80);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedPreviewUrl, setCompressedPreviewUrl] = useState("");

  const previewUrl = useMemo(() => (image ? URL.createObjectURL(image) : ""), [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (compressedPreviewUrl) URL.revokeObjectURL(compressedPreviewUrl);
    };
  }, [compressedPreviewUrl]);

  const compressedInfo = useMemo(() => {
    if (!image || !compressedBlob) return null;
    return {
      original: formatFileSize(image.size),
      compressed: formatFileSize(compressedBlob.size),
      reduction: `${Math.max(0, ((image.size - compressedBlob.size) / image.size) * 100).toFixed(1)}%`,
    };
  }, [compressedBlob, image]);

  const handleFileSelect = (file: File | null) => {
    setMessage("");
    setCompressedBlob(null);
    if (compressedPreviewUrl) URL.revokeObjectURL(compressedPreviewUrl);
    setCompressedPreviewUrl("");

    if (!file) {
      setImage(null);
      return;
    }

    const isSupported = file.type === config.mimeType || config.test.test(file.name);
    if (!isSupported) {
      setImage(null);
      setMessage(isJa ? "\u5bfe\u5fdc\u3059\u308b\u753b\u50cf\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002" : "Please choose a supported image.");
      return;
    }

    setImage(file);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(event.target.files?.[0] ?? null);
    event.target.value = "";
  };

  const handleCompress = async () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setMessage(isJa ? "\u5727\u7e2e\u4e2d\u3067\u3059..." : "Compressing...");
      const loaded = await loadImageFromFile(image);
      const canvas = document.createElement("canvas");
      canvas.width = loaded.width;
      canvas.height = loaded.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No canvas context");
      ctx.drawImage(loaded, 0, 0);
      const blob = await canvasToBlob(canvas, config.mimeType, quality / 100);
      if (compressedPreviewUrl) URL.revokeObjectURL(compressedPreviewUrl);
      const nextUrl = URL.createObjectURL(blob);
      setCompressedBlob(blob);
      setCompressedPreviewUrl(nextUrl);
      setMessage(isJa ? "\u5727\u7e2e\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f\u3002" : "Compression completed.");
    } catch (error) {
      console.error(error);
      setMessage(isJa ? "\u5727\u7e2e\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002" : "Compression failed.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!image || !compressedPreviewUrl) return;
    const baseName = image.name.replace(/\.[^.]+$/, "");
    const link = document.createElement("a");
    link.href = compressedPreviewUrl;
    link.download = `${baseName}-compressed.${config.ext}`;
    link.click();
  };

  return (
    <ToolPageLayout
      title={text.title}
      description={text.description}
      aboutTitle={isJa ? "\u3053\u306e\u30c4\u30fc\u30eb\u306b\u3064\u3044\u3066" : "About this tool"}
      aboutText={text.about}
      contentSections={[{ title: text.sectionTitle, paragraphs: [text.sectionBody] }]}
      listSections={[{ title: text.listTitle, items: text.list }]}
      stepsTitle={isJa ? "\u4f7f\u3044\u65b9" : "How to Use"}
      steps={
        isJa
          ? ["\u753b\u50cf\u3092\u9078\u629e\u3057\u307e\u3059", "\u54c1\u8cea\u3092\u8abf\u6574\u3057\u307e\u3059", "\u5727\u7e2e\u3057\u3066\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3057\u307e\u3059"]
          : ["Choose an image", "Adjust quality", "Compress and download the result"]
      }
      faqTitle="FAQ"
      faqs={[
        {
          question: isJa ? "\u753b\u50cf\u306f\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u3055\u308c\u307e\u3059\u304b\uff1f" : "Are files uploaded?",
          answer: isJa ? "\u3044\u3044\u3048\u3002\u51e6\u7406\u306f\u30d6\u30e9\u30a6\u30b6\u5185\u3067\u884c\u308f\u308c\u307e\u3059\u3002" : "No. Processing stays in your browser.",
        },
      ]}
      relatedTools={text.relatedTools}
      relatedToolsTitle={isJa ? "\u95a2\u9023\u30c4\u30fc\u30eb" : "Related Tools"}
    >
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <FileDropzone
          file={image}
          accept={config.accept}
          emptyTitle={isJa ? "\u753b\u50cf\u3092\u9078\u629e" : "Choose an image"}
          emptyDescription={text.description}
          selectButtonLabel={isJa ? "\u753b\u50cf\u3092\u9078\u629e" : "Choose Image"}
          dropHereLabel={isJa ? "\u3053\u3053\u306b\u30c9\u30ed\u30c3\u30d7" : "Drop file here"}
          clickToSelectLabel={isJa ? "\u307e\u305f\u306f\u30af\u30ea\u30c3\u30af\u3057\u3066\u9078\u629e" : "or click to browse"}
          selectedFileLabel={isJa ? "\u9078\u629e\u4e2d\u306e\u30d5\u30a1\u30a4\u30eb" : "Selected File"}
          onFileSelect={handleFileSelect}
        />

        <input
          type="file"
          accept={config.accept}
          onChange={handleInputChange}
          className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700"
        />

        {image && (
          <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm text-gray-700">
              {image.name} / {image.type || "unknown"} / {formatFileSize(image.size)}
            </div>
            <div className="space-y-2">
              <label htmlFor="quality" className="text-sm font-medium text-gray-800">
                {isJa ? "\u5727\u7e2e\u54c1\u8cea" : "Compression Quality"}: {quality}
              </label>
              <input
                id="quality"
                type="range"
                min="10"
                max="100"
                step="1"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        )}

        {previewUrl && (
          <div className="grid gap-6 lg:grid-cols-2">
            <img src={previewUrl} alt="before preview" className="max-h-80 w-full rounded border object-contain" />
            {compressedPreviewUrl ? (
              <img src={compressedPreviewUrl} alt="after preview" className="max-h-80 w-full rounded border object-contain" />
            ) : (
              <div className="flex h-80 items-center justify-center rounded border border-dashed bg-gray-50 px-4 text-center text-sm text-gray-500">
                {isJa ? "\u5727\u7e2e\u5f8c\u306e\u30d7\u30ec\u30d3\u30e5\u30fc\u304c\u3053\u3053\u306b\u8868\u793a\u3055\u308c\u307e\u3059\u3002" : "The compressed preview will appear here."}
              </div>
            )}
          </div>
        )}

        {compressedInfo && (
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <p>{isJa ? "\u5143\u306e\u30b5\u30a4\u30ba" : "Original Size"}: {compressedInfo.original}</p>
            <p>{isJa ? "\u5727\u7e2e\u5f8c\u30b5\u30a4\u30ba" : "Compressed Size"}: {compressedInfo.compressed}</p>
            <p>{isJa ? "\u524a\u6e1b\u7387" : "Reduction"}: {compressedInfo.reduction}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton onClick={handleCompress} disabled={!image || isProcessing}>
            {isProcessing ? (isJa ? "\u5727\u7e2e\u4e2d..." : "Compressing...") : isJa ? "\u5727\u7e2e\u3059\u308b" : "Compress"}
          </PrimaryButton>
          {compressedBlob && (
            <PrimaryButton onClick={handleDownload}>
              {isJa ? "\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9" : "Download"}
            </PrimaryButton>
          )}
          <button
            type="button"
            onClick={() => handleFileSelect(null)}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {isJa ? "\u30ea\u30bb\u30c3\u30c8" : "Reset"}
          </button>
        </div>

        {message && <StatusMessage status={message} />}
      </div>
    </ToolPageLayout>
  );
}
