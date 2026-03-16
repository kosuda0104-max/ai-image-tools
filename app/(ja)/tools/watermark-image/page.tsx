"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import { watermarkImageContent } from "@/src/data/tools/watermark-image";

const locale = "ja";
const t = watermarkImageContent[locale];

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function Page() {
  const [image, setImage] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState("");
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
      type: image.type || t.ui.unknownType,
      size: formatFileSize(image.size),
    };
  }, [image]);

  const handleWatermark = () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(t.ui.resizingStatus);

      if (!watermarkText.trim()) {
        setStatus(t.ui.validationNoSize);
        setIsProcessing(false);
        return;
      }

      const img = new Image();
      const objectUrl = URL.createObjectURL(image);
      img.src = objectUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setStatus(t.ui.canvasInitError);
          setIsProcessing(false);
          URL.revokeObjectURL(objectUrl);
          return;
        }

        ctx.drawImage(img, 0, 0);

        const fontSize = Math.max(20, Math.floor(canvas.width * 0.04));
        ctx.font = `bold ${fontSize}px Arial, sans-serif`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;

        const padding = Math.max(16, Math.floor(canvas.width * 0.02));
        ctx.fillText(
          watermarkText.trim(),
          canvas.width - padding,
          canvas.height - padding
        );

        const isPng = image.type === "image/png";
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
            link.download = `${baseName}-watermarked.${outputExt}`;
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

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">
            {t.ui.widthLabel}
          </label>

          <input
            type="text"
            value={watermarkText}
            onChange={(e) => setWatermarkText(e.target.value)}
            placeholder={t.ui.widthPlaceholder}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
          />

          <p className="text-xs text-gray-500">{t.ui.keepAspectRatioHint}</p>
        </div>

        <PrimaryButton
          onClick={handleWatermark}
          disabled={!image || isProcessing}
        >
          {isProcessing ? t.ui.resizingButton : t.ui.resizeButton}
        </PrimaryButton>

        <StatusMessage status={status} />
      </div>
    </ToolPageLayout>
  );
}