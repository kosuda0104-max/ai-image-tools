"use client";

import { useMemo, useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolPageLayout from "@/components/ToolPageLayout";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import FormSection from "@/components/FormSection";
import { mergePdfContent } from "@/src/data/tools/merge-pdf";

const locale = "ja";
const t = mergePdfContent[locale];

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function Page() {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInfo = useMemo(() => {
    if (!pdfFiles.length) return [];

    return pdfFiles.map((file) => ({
      name: file.name,
      type: file.type || t.ui.unknownType,
      size: formatFileSize(file.size),
    }));
  }, [pdfFiles]);

  const handleMerge = async () => {
    if (!pdfFiles.length || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(t.ui.resizingStatus);

      const mergedPdf = await PDFDocument.create();

      for (const file of pdfFiles) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pdf.getPageIndices()
        );

        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedBytes = await mergedPdf.save();
      const safeBytes = new Uint8Array(mergedBytes);

      const blob = new Blob([safeBytes], {
        type: "application/pdf",
      });

      const downloadUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "merged.pdf";
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
        <div className="space-y-3 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6">
          <div className="text-sm font-medium text-gray-900">
            {t.ui.emptyTitle}
          </div>
          <input
            type="file"
            accept="application/pdf,.pdf"
            multiple
            onChange={(e) => {
              setStatus("");

              const fileList = Array.from(e.target.files ?? []);

              if (!fileList.length) {
                setPdfFiles([]);
                return;
              }

              const validFiles = fileList.filter(
                (file) =>
                  file.type === "application/pdf" || /\.pdf$/i.test(file.name)
              );

              if (validFiles.length !== fileList.length) {
                setPdfFiles([]);
                setStatus(t.ui.invalidFileError);
                return;
              }

              setPdfFiles(validFiles);
            }}
            className="block w-full text-sm text-gray-700"
          />
          <p className="text-xs text-gray-500">
            複数のPDFを選択して、1つのPDFにまとめられます。
          </p>
        </div>

        {fileInfo.length > 0 && (
          <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-semibold text-gray-900">
              {t.ui.selectedImageTitle}
            </h3>

            {fileInfo.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="space-y-1 border-b border-gray-200 pb-3 last:border-b-0 last:pb-0 text-sm text-gray-600"
              >
                <p>
                  <span className="font-medium text-gray-800">
                    {t.ui.fileNameLabel}:
                  </span>{" "}
                  {file.name}
                </p>
                <p>
                  <span className="font-medium text-gray-800">
                    {t.ui.fileTypeLabel}:
                  </span>{" "}
                  {file.type}
                </p>
                <p>
                  <span className="font-medium text-gray-800">
                    {t.ui.fileSizeLabel}:
                  </span>{" "}
                  {file.size}
                </p>
              </div>
            ))}
          </div>
        )}

        <PrimaryButton
          onClick={handleMerge}
          disabled={!pdfFiles.length || isProcessing}
        >
          {isProcessing ? t.ui.resizingButton : t.ui.resizeButton}
        </PrimaryButton>

        <StatusMessage status={status} />
      </FormSection>
    </ToolPageLayout>
  );
}