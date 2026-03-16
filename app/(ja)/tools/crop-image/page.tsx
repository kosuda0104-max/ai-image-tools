"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import { cropImageContent } from "@/src/data/tools/crop-image";

const locale = "ja";
const t = cropImageContent[locale];

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function Page() {
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropWidth, setCropWidth] = useState(300);
  const [cropHeight, setCropHeight] = useState(300);

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
      type: image.type || t.ui.unknownType,
      size: formatFileSize(image.size),
    };
  }, [image]);

  const handleCrop = () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(t.ui.resizingStatus);

      const img = new Image();
      const objectUrl = URL.createObjectURL(image);
      img.src = objectUrl;

      img.onload = () => {
        const safeX = Math.max(0, Math.floor(cropX));
        const safeY = Math.max(0, Math.floor(cropY));
        const safeWidth = Math.max(1, Math.floor(cropWidth));
        const safeHeight = Math.max(1, Math.floor(cropHeight));

        const actualWidth = Math.min(safeWidth, img.width - safeX);
        const actualHeight = Math.min(safeHeight, img.height - safeY);

        if (safeX >= img.width || safeY >= img.height) {
          setStatus("エラー: 切り抜き開始位置が画像サイズを超えています");
          setIsProcessing(false);
          URL.revokeObjectURL(objectUrl);
          return;
        }

        if (actualWidth <= 0 || actualHeight <= 0) {
          setStatus(t.ui.validationInvalidResultSize);
          setIsProcessing(false);
          URL.revokeObjectURL(objectUrl);
          return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = actualWidth;
        canvas.height = actualHeight;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setStatus(t.ui.canvasInitError);
          setIsProcessing(false);
          URL.revokeObjectURL(objectUrl);
          return;
        }

        const isPng = image.type === "image/png";

        if (!isPng) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(
          img,
          safeX,
          safeY,
          actualWidth,
          actualHeight,
          0,
          0,
          actualWidth,
          actualHeight
        );

        const outputMime = isPng ? "image/png" : "image/jpeg";
        const outputExt = isPng ? "png" : "jpg";

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setStatus(t.ui.resizeError);
              setIsProcessing(false);
              URL.revokeObjectURL(objectUrl);
              return;
            }

            const downloadUrl = URL.createObjectURL(blob);
            const baseName = image.name.replace(/\.[^.]+$/i, "");
            const link = document.createElement("a");

            link.href = downloadUrl;
            link.download = `${baseName}-cropped.${outputExt}`;
            link.click();

            setStatus(t.ui.successMessage);
            setIsProcessing(false);

            setTimeout(() => {
              URL.revokeObjectURL(downloadUrl);
            }, 1000);

            URL.revokeObjectURL(objectUrl);
          },
          outputMime,
          isPng ? undefined : 0.92
        );
      };

      img.onerror = () => {
        setStatus(t.ui.loadError);
        setIsProcessing(false);
        URL.revokeObjectURL(objectUrl);
      };
    } catch (e: any) {
      console.error(e);
      setStatus(`${t.ui.unexpectedErrorPrefix}: ${e?.message ?? String(e)}`);
      setIsProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title={t.page.title}
      description={t.page.description}
      aboutTitle={t.page.aboutTitle}
      aboutText={t.page.aboutText}
      stepsTitle={t.page.stepsTitle}
      steps={t.page.steps}
      faqTitle={t.page.faqTitle}
      faqs={t.page.faqs}
      relatedTools={t.page.relatedTools}
    >
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <FileDropzone
          file={image}
          accept="image/*"
          emptyTitle={t.ui.emptyTitle}
          onFileSelect={(file) => {
            setStatus("");

            if (!file) {
              setImage(null);
              return;
            }

            if (!file.type.startsWith("image/")) {
              setImage(null);
              setStatus(t.ui.invalidFileError);
              return;
            }

            setImage(file);
          }}
        />

        {fileInfo && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">
              {t.ui.selectedImageTitle}
            </h3>

            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-800">
                  {t.ui.fileNameLabel}:
                </span>{" "}
                {fileInfo.name}
              </p>

              <p>
                <span className="font-medium text-gray-800">
                  {t.ui.fileTypeLabel}:
                </span>{" "}
                {fileInfo.type}
              </p>

              <p>
                <span className="font-medium text-gray-800">
                  {t.ui.fileSizeLabel}:
                </span>{" "}
                {fileInfo.size}
              </p>
            </div>
          </div>
        )}

        {previewUrl && (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">{t.ui.previewLabel}</div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="preview"
              className="max-h-80 rounded border object-contain"
            />
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="number"
            value={cropX}
            onChange={(e) => setCropX(Number(e.target.value))}
            placeholder="Start X"
            className="border p-2 rounded"
          />

          <input
            type="number"
            value={cropY}
            onChange={(e) => setCropY(Number(e.target.value))}
            placeholder="Start Y"
            className="border p-2 rounded"
          />

          <input
            type="number"
            value={cropWidth}
            onChange={(e) => setCropWidth(Number(e.target.value))}
            placeholder="Width"
            className="border p-2 rounded"
          />

          <input
            type="number"
            value={cropHeight}
            onChange={(e) => setCropHeight(Number(e.target.value))}
            placeholder="Height"
            className="border p-2 rounded"
          />
        </div>

        <PrimaryButton onClick={handleCrop} disabled={!image || isProcessing}>
          {isProcessing ? t.ui.resizingButton : t.ui.resizeButton}
        </PrimaryButton>

        <StatusMessage status={status} />
      </div>
    </ToolPageLayout>
  );
}