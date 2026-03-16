"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import { resizeImageContent } from "@/src/data/tools/resize-image";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function Page() {
  const locale = "ja";
  const content = resizeImageContent[locale];
  const { page, ui } = content;

  const [image, setImage] = useState<File | null>(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [keepAspectRatio, setKeepAspectRatio] = useState(true);
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

  const handleResize = () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(ui.resizingStatus);

      const img = new Image();
      const objectUrl = URL.createObjectURL(image);
      img.src = objectUrl;

      img.onload = () => {
        const originalWidth = img.width;
        const originalHeight = img.height;

        let newWidth = Number(width);
        let newHeight = Number(height);

        if (!width && !height) {
          setStatus(ui.validationNoSize);
          setIsProcessing(false);
          URL.revokeObjectURL(objectUrl);
          return;
        }

        if (
          (width && (!Number.isFinite(newWidth) || newWidth <= 0)) ||
          (height && (!Number.isFinite(newHeight) || newHeight <= 0))
        ) {
          setStatus(ui.validationInvalidSize);
          setIsProcessing(false);
          URL.revokeObjectURL(objectUrl);
          return;
        }

        if (keepAspectRatio) {
          const ratio = originalWidth / originalHeight;

          if (width && !height) {
            newHeight = Math.round(newWidth / ratio);
          } else if (!width && height) {
            newWidth = Math.round(newHeight * ratio);
          }
        }

        if (!newWidth || !newHeight) {
          setStatus(ui.validationInvalidResultSize);
          setIsProcessing(false);
          URL.revokeObjectURL(objectUrl);
          return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setStatus(ui.canvasInitError);
          setIsProcessing(false);
          URL.revokeObjectURL(objectUrl);
          return;
        }

        if (image.type === "image/jpeg") {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, newWidth, newHeight);
        }

        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        const outputType =
          image.type === "image/png" ||
          image.type === "image/webp" ||
          image.type === "image/jpeg"
            ? image.type
            : "image/jpeg";

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setStatus(ui.resizeError);
              setIsProcessing(false);
              URL.revokeObjectURL(objectUrl);
              return;
            }

            const baseName = image.name.replace(/\.[^.]+$/, "");
            const extension =
              outputType === "image/png"
                ? "png"
                : outputType === "image/webp"
                ? "webp"
                : "jpg";

            const downloadUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = `${baseName}-resized.${extension}`;
            link.click();

            const message = ui.successMessage
              .replace("{width}", String(newWidth))
              .replace("{height}", String(newHeight));

            setStatus(message);
            setIsProcessing(false);

            setTimeout(() => {
              URL.revokeObjectURL(downloadUrl);
            }, 1000);

            URL.revokeObjectURL(objectUrl);
          },
          outputType,
          0.92
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              {ui.widthLabel}
            </label>

            <input
              type="number"
              value={width}
              placeholder={ui.widthPlaceholder}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              {ui.heightLabel}
            </label>

            <input
              type="number"
              value={height}
              placeholder={ui.heightPlaceholder}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
            />
          </div>
        </div>

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={keepAspectRatio}
            onChange={(e) => setKeepAspectRatio(e.target.checked)}
            className="mt-1"
          />

          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-900">
              {ui.keepAspectRatioLabel}
            </div>

            <div className="text-xs text-gray-500">
              {ui.keepAspectRatioHint}
            </div>
          </div>
        </div>

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
          onClick={handleResize}
          disabled={!image || isProcessing}
        >
          {isProcessing ? ui.resizingButton : ui.resizeButton}
        </PrimaryButton>

        <StatusMessage status={status} />
      </div>
    </ToolPageLayout>
  );
}