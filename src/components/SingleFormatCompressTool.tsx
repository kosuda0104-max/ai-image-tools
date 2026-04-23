"use client";

import { useEffect, useMemo, useState } from "react";
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

const qualityPresets = [
  { key: "high", value: 90 },
  { key: "balanced", value: 80 },
  { key: "small", value: 60 },
] as const;

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getText(locale: Locale, format: FormatKey) {
  const ja = locale === "ja";
  const titleMap = {
    jpg: ja ? "JPG圧縮" : "JPG Compressor",
    png: ja ? "PNG圧縮" : "PNG Compressor",
    webp: ja ? "WebP圧縮" : "WebP Compressor",
  };

  return {
    title: titleMap[format],
    description: ja
      ? "画像の容量をブラウザ上で調整できる無料ツールです。"
      : "A free browser-based tool for reducing image file size.",
    about: ja
      ? "アップロードや共有をしやすくするために、画像を軽くしたいときに向いています。"
      : "Useful when you want a lighter image for uploads, pages, or sharing.",
    sectionTitle: ja ? "使いどころ" : "When it helps",
    sectionBody: ja
      ? "記事画像、メール添付、画像アップロードなどでサイズを落としたいときに便利です。"
      : "A practical fit for article images, uploads, email attachments, and lighter web delivery.",
    listTitle: ja ? "ポイント" : "Tips",
    list: ja
      ? [
          "迷ったら標準プリセットから試すとバランスを見やすいです。",
          "写真は容量優先、文字や線が多い画像は高画質が向いています。",
          "元画像を残しておくと再調整しやすくなります。",
        ]
      : [
          "Start with the Balanced preset if you are unsure.",
          "Use Small size for photos and High quality for text-heavy images.",
          "Keep the original file if you may need it later.",
        ],
    relatedTools:
      locale === "ja"
        ? [
            { name: "画像圧縮", href: "/tools/image-compress" },
            { name: "画像リサイズ", href: "/tools/resize-image" },
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
    const changeRatio =
      image.size > 0
        ? ((image.size - compressedBlob.size) / image.size) * 100
        : 0;

    return {
      original: formatFileSize(image.size),
      compressed: formatFileSize(compressedBlob.size),
      change: `${Math.abs(changeRatio).toFixed(1)}%`,
      isLarger: changeRatio < 0,
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
      setMessage(isJa ? "対応する画像を選択してください。" : "Please choose a supported image.");
      return;
    }

    setImage(file);
  };

  const handleCompress = async () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setMessage(isJa ? "圧縮中です..." : "Compressing...");
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
      setMessage(isJa ? "圧縮が完了しました。" : "Compression completed.");
    } catch (error) {
      console.error(error);
      setMessage(isJa ? "圧縮に失敗しました。" : "Compression failed.");
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
      aboutTitle={isJa ? "このツールについて" : "About this tool"}
      aboutText={text.about}
      contentSections={[{ title: text.sectionTitle, paragraphs: [text.sectionBody] }]}
      listSections={[{ title: text.listTitle, items: text.list }]}
      stepsTitle={isJa ? "使い方" : "How to Use"}
      steps={
        isJa
          ? ["画像を選択します", "品質を調整します", "圧縮してダウンロードします"]
          : ["Choose an image", "Adjust quality", "Compress and download the result"]
      }
      faqTitle="FAQ"
      faqs={[
        {
          question: isJa ? "画像はアップロードされますか？" : "Are files uploaded?",
          answer: isJa ? "いいえ。処理はブラウザ内で行われます。" : "No. Processing stays in your browser.",
        },
      ]}
      relatedTools={text.relatedTools}
      relatedToolsTitle={isJa ? "関連ツール" : "Related Tools"}
    >
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <FileDropzone
          file={image}
          accept={config.accept}
          emptyTitle={isJa ? "画像を選択" : "Choose an image"}
          emptyDescription={text.description}
          selectButtonLabel={isJa ? "画像を選択" : "Choose Image"}
          dropHereLabel={isJa ? "ここにドロップ" : "Drop file here"}
          clickToSelectLabel={isJa ? "またはクリックして選択" : "or click to browse"}
          selectedFileLabel={isJa ? "選択中のファイル" : "Selected File"}
          onFileSelect={handleFileSelect}
        />

        {image && (
          <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="text-sm text-gray-700">
              {image.name} / {image.type || "unknown"} / {formatFileSize(image.size)}
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-800">
                {isJa ? "圧縮の強さ" : "Compression strength"}
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {qualityPresets.map((preset) => {
                  const label =
                    preset.key === "high"
                      ? isJa
                        ? "高画質"
                        : "High quality"
                      : preset.key === "balanced"
                        ? isJa
                          ? "標準"
                          : "Balanced"
                        : isJa
                          ? "容量優先"
                          : "Small size";

                  return (
                    <button
                      key={preset.key}
                      type="button"
                      onClick={() => setQuality(preset.value)}
                      className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${
                        quality === preset.value
                          ? "border-blue-600 bg-blue-50 text-blue-700"
                          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {label}
                      <span className="mt-1 block text-xs text-gray-500">
                        {preset.value}
                      </span>
                    </button>
                  );
                })}
              </div>
              <label htmlFor="quality" className="text-sm font-medium text-gray-800">
                {isJa ? "圧縮品質" : "Compression Quality"}: {quality}
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
                {isJa ? "圧縮後のプレビューがここに表示されます。" : "The compressed preview will appear here."}
              </div>
            )}
          </div>
        )}

        {compressedInfo && (
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <p>{isJa ? "元のサイズ" : "Original Size"}: {compressedInfo.original}</p>
            <p>{isJa ? "圧縮後サイズ" : "Compressed Size"}: {compressedInfo.compressed}</p>
            <p>
              {compressedInfo.isLarger
                ? isJa
                  ? "増加率"
                  : "Increase"
                : isJa
                  ? "削減率"
                  : "Reduction"}
              : {compressedInfo.change}
            </p>
            <p
              className={`rounded-lg px-3 py-2 ${
                compressedInfo.isLarger
                  ? "bg-amber-50 text-amber-800"
                  : "bg-green-50 text-green-800"
              }`}
            >
              {compressedInfo.isLarger
                ? isJa
                  ? "圧縮後のほうが大きくなっています。品質を下げるか、別の形式も試してください。"
                  : "The result is larger than the original. Try a lower quality setting or another format."
                : isJa
                  ? "容量を減らせています。見た目に問題がなければダウンロードできます。"
                  : "The result is smaller. If it still looks good, it is ready to download."}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton onClick={handleCompress} disabled={!image || isProcessing}>
            {isProcessing ? (isJa ? "圧縮中..." : "Compressing...") : isJa ? "圧縮する" : "Compress"}
          </PrimaryButton>
          {compressedBlob && (
            <PrimaryButton onClick={handleDownload}>
              {isJa ? "ダウンロード" : "Download"}
            </PrimaryButton>
          )}
          <button
            type="button"
            onClick={() => handleFileSelect(null)}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {isJa ? "リセット" : "Reset"}
          </button>
        </div>

        {message && <StatusMessage status={message} />}
      </div>
    </ToolPageLayout>
  );
}
