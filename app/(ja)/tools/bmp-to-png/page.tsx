"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import { bmpToPngContent } from "@/src/data/tools/bmp-to-png";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function Page() {
  const locale = "ja";
  const content = bmpToPngContent[locale];
  const { page, ui } = content;

  const [image, setImage] = useState<File | null>(null);
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

  const handleConvert = () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(ui.resizingStatus);

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

        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setStatus(ui.resizeError);
              setIsProcessing(false);
              URL.revokeObjectURL(objectUrl);
              return;
            }

            const downloadUrl = URL.createObjectURL(blob);
            const baseName = image.name.replace(/\.bmp$/i, "");
            const link = document.createElement("a");

            link.href = downloadUrl;
            link.download = `${baseName}.png`;
            link.click();

            setStatus(ui.successMessage);
            setIsProcessing(false);

            URL.revokeObjectURL(downloadUrl);
            URL.revokeObjectURL(objectUrl);
          },
          "image/png"
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
          accept="image/bmp,.bmp"
          emptyTitle={ui.emptyTitle}
          onFileSelect={(file: File | null) => {
            setStatus("");

            if (!file) {
              setImage(null);
              return;
            }

            const isBmp =
              file.type === "image/bmp" ||
              file.type === "image/x-ms-bmp" ||
              /\.bmp$/i.test(file.name);

            if (!isBmp) {
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
          onClick={handleConvert}
          disabled={!image || isProcessing}
        >
          {isProcessing ? ui.resizingButton : ui.resizeButton}
        </PrimaryButton>

        <StatusMessage status={status} />
      </div>
    </ToolPageLayout>
  );
}