"use client";

import { useMemo, useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import { imageToPdfContent } from "@/src/data/tools/image-to-pdf";

const locale = "ja";
const t = imageToPdfContent[locale];

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function Page() {
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInfo = useMemo(() => {
    if (!image) return null;

    return {
      name: image.name,
      type: image.type || t.ui.unknownType,
      size: formatFileSize(image.size),
    };
  }, [image]);

  const handleConvert = async () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(t.ui.resizingStatus);

      const bytes = await image.arrayBuffer();
      const pdfDoc = await PDFDocument.create();

      let embedded;

      if (image.type === "image/png") {
        embedded = await pdfDoc.embedPng(bytes);
      } else {
        embedded = await pdfDoc.embedJpg(bytes);
      }

      const page = pdfDoc.addPage([embedded.width, embedded.height]);

      page.drawImage(embedded, {
        x: 0,
        y: 0,
        width: embedded.width,
        height: embedded.height,
      });

      const pdfBytes = await pdfDoc.save();

      // Blob型エラー回避
      const safeBytes = new Uint8Array(pdfBytes);

      const blob = new Blob([safeBytes], {
        type: "application/pdf",
      });

      const downloadUrl = URL.createObjectURL(blob);

      const baseName = image.name.replace(/\.[^.]+$/, "");

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${baseName}.pdf`;
      link.click();

      setStatus(t.ui.successMessage);
      setIsProcessing(false);

      setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
      }, 1000);
    } catch (e: unknown) {
      console.error(e);
      const message = e instanceof Error ? e.message : String(e);
      setStatus(`${t.ui.unexpectedErrorPrefix}: ${message}`);
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

        <PrimaryButton
          onClick={handleConvert}
          disabled={!image || isProcessing}
        >
          {isProcessing ? t.ui.resizingButton : t.ui.resizeButton}
        </PrimaryButton>

        <StatusMessage status={status} />
      </div>
    </ToolPageLayout>
  );
}