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

type SimplePageContent = {
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

      <PrimaryButton onClick={convert} disabled={!file || loading}>
        {loading ? ui.loading : ui.button}
      </PrimaryButton>

      <StatusMessage status={status} />
    </ToolPageLayout>
  );
}
