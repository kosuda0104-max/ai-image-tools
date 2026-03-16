"use client";

import { useMemo, useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import FormSection from "@/components/FormSection";
import { rotatePdfContent } from "@/src/data/tools/rotate-pdf";

const locale = "ja";
const t = rotatePdfContent[locale];

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function Page() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [angle, setAngle] = useState(90);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInfo = useMemo(() => {
    if (!pdfFile) return null;

    return {
      name: pdfFile.name,
      type: pdfFile.type || t.ui.unknownType,
      size: formatFileSize(pdfFile.size),
    };
  }, [pdfFile]);

  const handleRotate = async () => {
    if (!pdfFile || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(t.ui.resizingStatus);

      if (![90, 180, 270].includes(angle)) {
        setStatus(t.ui.validationInvalidSize);
        setIsProcessing(false);
        return;
      }

      const bytes = await pdfFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);

      pdfDoc.getPages().forEach((page) => {
        page.setRotation(degrees(angle));
      });

      const outputBytes = await pdfDoc.save();
      const safeBytes = new Uint8Array(outputBytes);

      const blob = new Blob([safeBytes], {
        type: "application/pdf",
      });

      const downloadUrl = URL.createObjectURL(blob);
      const baseName = pdfFile.name.replace(/\.pdf$/i, "");

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${baseName}-rotated.pdf`;
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
      <FormSection>
        <FileDropzone
          file={pdfFile}
          accept="application/pdf,.pdf"
          emptyTitle={t.ui.emptyTitle}
          onFileSelect={(file) => {
            setStatus("");

            if (!file) {
              setPdfFile(null);
              return;
            }

            const isPdf =
              file.type === "application/pdf" || /\.pdf$/i.test(file.name);

            if (!isPdf) {
              setPdfFile(null);
              setStatus(t.ui.invalidFileError);
              return;
            }

            setPdfFile(file);
          }}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">
            {t.ui.widthLabel}
          </label>
          <select
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400"
          >
            <option value={90}>90°</option>
            <option value={180}>180°</option>
            <option value={270}>270°</option>
          </select>
          <p className="text-xs text-gray-500">{t.ui.keepAspectRatioHint}</p>
        </div>

        {fileInfo && (
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
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
          onClick={handleRotate}
          disabled={!pdfFile || isProcessing}
        >
          {isProcessing ? t.ui.resizingButton : t.ui.resizeButton}
        </PrimaryButton>

        <StatusMessage status={status} />
      </FormSection>
    </ToolPageLayout>
  );
}