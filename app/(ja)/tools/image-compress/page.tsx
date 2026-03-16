"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import { imageCompressContent } from "@/src/data/tools/image-compress";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function Page() {
  const locale = "ja";
  const content = imageCompressContent[locale];
  const { page, ui } = content;

  const [image, setImage] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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
      type: image.type || ui.unknownType,
      size: formatFileSize(image.size),
    };
  }, [image, ui.unknownType]);

  const handleCompress = () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(ui.convertingStatus);

      const img = new Image();
      const objectUrl = URL.createObjectURL(image);
      img.src = objectUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setStatus(ui.canvasInitError);
          setIsProcessing(false);
          URL.revokeObjectURL(objectUrl);
          return;
        }

        const originalType = image.type;
        const outputType =
          originalType === "image/png" ||
          originalType === "image/webp" ||
          originalType === "image/jpeg"
            ? originalType
            : "image/jpeg";

        if (outputType === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const qualityValue =
          outputType === "image/png" ? undefined : quality / 100;

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setStatus(ui.convertError);
              setIsProcessing(false);
              URL.revokeObjectURL(objectUrl);
              return;
            }

            const extension =
              outputType === "image/png"
                ? "png"
                : outputType === "image/webp"
                ? "webp"
                : "jpg";

            const baseName = image.name.replace(/\.[^.]+$/, "");
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = downloadUrl;
            link.download = `${baseName}-compressed.${extension}`;
            link.click();

            const before = image.size;
            const after = blob.size;
            const saved = before - after;

            const savedRate =
              before > 0
                ? Math.max(0, Number(((saved / before) * 100).toFixed(1)))
                : 0;

            setStatus(
              `完了！ ${baseName}-compressed.${extension} を保存しました（${formatFileSize(
                before
              )} → ${formatFileSize(after)} / ${savedRate}% 削減）`
            );

            setIsProcessing(false);

            setTimeout(() => {
              URL.revokeObjectURL(downloadUrl);
            }, 1000);

            URL.revokeObjectURL(objectUrl);
          },
          outputType,
          qualityValue
        );
      };

      img.onerror = () => {
        setStatus(ui.loadError);
        setIsProcessing(false);
        URL.revokeObjectURL(objectUrl);
      };
    } catch (e: any) {
      console.error(e);
      setStatus(`${ui.unexpectedErrorPrefix}: ${e?.message ?? String(e)}`);
      setIsProcessing(false);
    }
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
          onFileSelect={(file) => {
            setStatus("");

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
              setStatus(ui.invalidFileError);
              return;
            }

            setImage(file);
          }}
        />

        {fileInfo && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
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
            </div>
          </div>
        )}

        {image && image.type !== "image/png" && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3">
            <div className="flex items-center justify-between gap-4">
              <label
                htmlFor="quality"
                className="text-sm font-medium text-gray-900"
              >
                圧縮率
              </label>
              <span className="text-sm text-gray-600">{quality}%</span>
            </div>

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

            <p className="text-xs text-gray-500">
              数値を下げるほどファイルサイズは軽くなりやすいですが、画質は低下しやすくなります。
            </p>
          </div>
        )}

        {image && image.type === "image/png" && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
            PNGは可逆圧縮のため、JPEGやWebPほど大きく軽くならない場合があります。
          </div>
        )}

        {previewUrl && (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">{ui.previewLabel}</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="preview"
              className="max-h-80 rounded border object-contain"
            />
          </div>
        )}

        <PrimaryButton
          onClick={handleCompress}
          disabled={!image || isProcessing}
        >
          {isProcessing ? ui.convertingButton : ui.convertButton}
        </PrimaryButton>

        <StatusMessage status={status} />
      </div>
    </ToolPageLayout>
  );
}