"use client";

import { useMemo, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import FormSection from "@/components/FormSection";
import { pdfToJpgContent } from "@/src/data/tools/pdf-to-jpg";

const locale = "ja";
const t = pdfToJpgContent[locale];

(pdfjsLib as any).GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${(pdfjsLib as any).version}/pdf.worker.min.js`;

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function Page() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
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

  const handleConvert = async () => {
    if (!pdfFile || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(t.ui.resizingStatus);

      const arrayBuffer = await pdfFile.arrayBuffer();
      const pdf = await (pdfjsLib as any).getDocument({ data: arrayBuffer }).promise;

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d") as CanvasRenderingContext2D | null;

        if (!context) {
          setStatus(t.ui.canvasInitError);
          setIsProcessing(false);
          return;
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob((result) => resolve(result), "image/jpeg", 0.92);
        });

        if (!blob) {
          setStatus(t.ui.resizeError);
          setIsProcessing(false);
          return;
        }

        const baseName = pdfFile.name.replace(/\.pdf$/i, "");
        const downloadUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `${baseName}-page-${pageNumber}.jpg`;
        link.click();

        setTimeout(() => {
          URL.revokeObjectURL(downloadUrl);
        }, 1000);
      }

      setStatus(t.ui.successMessage);
      setIsProcessing(false);
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
          onClick={handleConvert}
          disabled={!pdfFile || isProcessing}
        >
          {isProcessing ? t.ui.resizingButton : t.ui.resizeButton}
        </PrimaryButton>

        <StatusMessage status={status} />
      </FormSection>
    </ToolPageLayout>
  );
}