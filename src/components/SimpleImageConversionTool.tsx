"use client";

import { useEffect, useMemo, useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import PreviewImage from "@/components/PreviewImage";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import {
  convertImageWithCanvas,
  getBaseName,
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

type ToolTextSection = {
  title: string;
  paragraphs: string[];
};

type ToolListSection = {
  title: string;
  items: string[];
};

type ToolComparisonItem = {
  label: string;
  value: string;
};

type SimplePageContent = {
  title: string;
  description: string;
  aboutTitle: string;
  aboutText: string;
  contentSections?: ToolTextSection[];
  listSections?: ToolListSection[];
  comparisonTitle?: string;
  comparisonItems?: ToolComparisonItem[];
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: FAQItem[];
  relatedTools: RelatedToolItem[];
  relatedToolsTitle?: string;
};

export type SimpleImageConversionContent = {
  page: SimplePageContent;
  ui: {
    emptyTitle: string;
    emptyDescription: string;
    selectButtonLabel: string;
    button: string;
    loading: string;
    done: string;
    invalidFile: string;
    error: string;
    resetButton?: string;
  };
};

type Props = {
  content: SimpleImageConversionContent;
  accept: string;
  outputExtension: string;
  outputType: "image/png" | "image/jpeg" | "image/webp";
  isValidFile: (file: File) => boolean;
  fillBackground?: string;
  quality?: number;
};

export default function SimpleImageConversionTool({
  content,
  accept,
  outputExtension,
  outputType,
  isValidFile,
  fillBackground,
  quality,
}: Props) {
  const { page, ui } = content;
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const preview = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const convert = async () => {
    if (!file) return;

    if (!isValidFile(file)) {
      setStatus(ui.invalidFile);
      return;
    }

    try {
      setLoading(true);
      setStatus(ui.loading);

      const blob = await convertImageWithCanvas({
        file,
        outputType,
        quality,
        fillBackground,
      });

      triggerBlobDownload(blob, `${getBaseName(file.name)}.${outputExtension}`);
      setStatus(ui.done);
    } catch {
      setStatus(ui.error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setStatus("");
  };

  return (
    <ToolPageLayout
      title={page.title}
      description={page.description}
      aboutTitle={page.aboutTitle}
      aboutText={page.aboutText}
      contentSections={page.contentSections}
      listSections={page.listSections}
      comparisonTitle={page.comparisonTitle}
      comparisonItems={page.comparisonItems}
      stepsTitle={page.stepsTitle}
      steps={page.steps}
      faqTitle={page.faqTitle}
      faqs={page.faqs}
      relatedTools={page.relatedTools}
      relatedToolsTitle={page.relatedToolsTitle}
    >
      <FileDropzone
        file={file}
        accept={accept}
        emptyTitle={ui.emptyTitle}
        emptyDescription={ui.emptyDescription}
        selectButtonLabel={ui.selectButtonLabel}
        onFileSelect={(selected) => {
          setStatus("");
          setFile(selected);
        }}
      />

      {preview && (
        <div className="space-y-2">
          <PreviewImage
            src={preview}
            alt={page.title}
            className="max-h-80 rounded border object-contain"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <PrimaryButton onClick={convert} disabled={!file || loading}>
          {loading ? ui.loading : ui.button}
        </PrimaryButton>
        {file ? (
          <button
            type="button"
            onClick={reset}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {ui.resetButton ?? "Reset"}
          </button>
        ) : null}
      </div>

      <StatusMessage status={status} />
    </ToolPageLayout>
  );
}
