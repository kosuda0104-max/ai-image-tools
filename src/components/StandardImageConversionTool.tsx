"use client";

import { useEffect, useMemo, useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import PreviewImage from "@/components/PreviewImage";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import {
  convertImageWithCanvas,
  formatFileSize,
  getBaseName,
  getErrorMessage,
  triggerBlobDownload,
} from "@/src/lib/image-conversion";

type FAQItem = {
  question: string;
  answer: string;
};

type RelatedToolItem = {
  name: string;
  href: string;
};

type PageContent = {
  title: string;
  description: string;
  aboutTitle: string;
  aboutText: string;
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: FAQItem[];
  relatedTools: RelatedToolItem[];
};

type DetailUiText = {
  emptyTitle: string;
  unknownType: string;
  convertingStatus: string;
  canvasInitError: string;
  convertError: string;
  loadError: string;
  unexpectedErrorPrefix: string;
  successMessage: (baseName: string) => string;
  invalidFileError: string;
  selectedImageTitle: string;
  fileNameLabel: string;
  fileTypeLabel: string;
  fileSizeLabel: string;
  previewLabel: string;
  convertButton: string;
  convertingButton: string;
};

export type StandardImageConversionContent = {
  page: PageContent;
  ui: DetailUiText;
};

type Props = {
  content: StandardImageConversionContent;
  accept: string;
  outputExtension: string;
  outputType: "image/png" | "image/jpeg" | "image/webp";
  isValidFile: (file: File) => boolean;
  fillBackground?: string;
  quality?: number;
};

export default function StandardImageConversionTool({
  content,
  accept,
  outputExtension,
  outputType,
  isValidFile,
  fillBackground,
  quality,
}: Props) {
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

  const handleConvert = async () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(ui.convertingStatus);

      const blob = await convertImageWithCanvas({
        file: image,
        outputType,
        quality,
        fillBackground,
      });

      const baseName = getBaseName(image.name);
      triggerBlobDownload(blob, `${baseName}.${outputExtension}`);
      setStatus(ui.successMessage(baseName));
    } catch (error: unknown) {
      const message = getErrorMessage(error);

      if (message === "Failed to initialize canvas.") {
        setStatus(ui.canvasInitError);
      } else if (message === "Failed to load image.") {
        setStatus(ui.loadError);
      } else if (message === "Failed to convert image.") {
        setStatus(ui.convertError);
      } else {
        setStatus(`${ui.unexpectedErrorPrefix}: ${message}`);
      }
    } finally {
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
          accept={accept}
          emptyTitle={ui.emptyTitle}
          onFileSelect={(file) => {
            setStatus("");

            if (!file) {
              setImage(null);
              return;
            }

            if (!isValidFile(file)) {
              setImage(null);
              setStatus(ui.invalidFileError);
              return;
            }

            setImage(file);
          }}
        />

        {fileInfo && (
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4">
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
            <PreviewImage
              src={previewUrl}
              alt={page.title}
              className="max-h-80 rounded border object-contain"
            />
          </div>
        )}

        <PrimaryButton onClick={handleConvert} disabled={!image || isProcessing}>
          {isProcessing ? ui.convertingButton : ui.convertButton}
        </PrimaryButton>

        <StatusMessage status={status} />
      </div>
    </ToolPageLayout>
  );
}
