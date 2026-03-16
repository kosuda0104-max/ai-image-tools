"use client";

import { useMemo, useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import FormSection from "@/components/FormSection";
import { splitPdfContent } from "@/src/data/tools/split-pdf";

const locale = "ja";
const t = splitPdfContent[locale];

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function parsePageNumbers(input: string, maxPage: number) {
  const values = input
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (!values.length) {
    throw new Error("NO_PAGES");
  }

  const pages = new Set<number>();

  for (const value of values) {
    if (value.includes("-")) {
      const [startText, endText] = value.split("-").map((v) => v.trim());
      const start = Number(startText);
      const end = Number(endText);

      if (
        !Number.isInteger(start) ||
        !Number.isInteger(end) ||
        start < 1 ||
        end < 1 ||
        start > end
      ) {
        throw new Error("INVALID_RANGE");
      }

      for (let i = start; i <= end; i++) {
        if (i > maxPage) {
          throw new Error("OUT_OF_RANGE");
        }
        pages.add(i);
      }
    } else {
      const page = Number(value);

      if (!Number.isInteger(page) || page < 1) {
        throw new Error("INVALID_PAGE");
      }

      if (page > maxPage) {
        throw new Error("OUT_OF_RANGE");
      }

      pages.add(page);
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

export default function Page() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pageText, setPageText] = useState("");
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

  const handleSplit = async () => {
    if (!pdfFile || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(t.ui.resizingStatus);

      const bytes = await pdfFile.arrayBuffer();
      const sourcePdf = await PDFDocument.load(bytes);
      const maxPage = sourcePdf.getPageCount();

      const selectedPages = parsePageNumbers(pageText, maxPage);
      const newPdf = await PDFDocument.create();

      const copiedPages = await newPdf.copyPages(
        sourcePdf,
        selectedPages.map((page) => page - 1)
      );

      copiedPages.forEach((page) => newPdf.addPage(page));

      const outputBytes = await newPdf.save();
      const safeBytes = new Uint8Array(outputBytes);

      const blob = new Blob([safeBytes], {
        type: "application/pdf",
      });

      const downloadUrl = URL.createObjectURL(blob);
      const baseName = pdfFile.name.replace(/\.pdf$/i, "");

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${baseName}-split.pdf`;
      link.click();

      setStatus(t.ui.successMessage);
      setIsProcessing(false);

      setTimeout(() => {
        URL.revokeObjectURL(downloadUrl);
      }, 1000);
    } catch (e: unknown) {
      console.error(e);

      if (e instanceof Error) {
        if (e.message === "NO_PAGES") {
          setStatus(t.ui.validationNoSize);
        } else if (
          e.message === "INVALID_RANGE" ||
          e.message === "INVALID_PAGE"
        ) {
          setStatus(t.ui.validationInvalidSize);
        } else if (e.message === "OUT_OF_RANGE") {
          setStatus(t.ui.validationInvalidResultSize);
        } else {
          setStatus(`${t.ui.unexpectedErrorPrefix}: ${e.message}`);
        }
      } else {
        setStatus(`${t.ui.unexpectedErrorPrefix}: ${String(e)}`);
      }

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
          <label
            htmlFor="pages"
            className="text-sm font-medium text-gray-900"
          >
            {t.ui.widthLabel}
          </label>
          <input
            id="pages"
            type="text"
            value={pageText}
            onChange={(e) => setPageText(e.target.value)}
            placeholder={t.ui.widthPlaceholder}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-gray-400"
          />
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
          onClick={handleSplit}
          disabled={!pdfFile || isProcessing}
        >
          {isProcessing ? t.ui.resizingButton : t.ui.resizeButton}
        </PrimaryButton>

        <StatusMessage status={status} />
      </FormSection>
    </ToolPageLayout>
  );
}