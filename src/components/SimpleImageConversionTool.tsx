"use client";

import { useMemo } from "react";
import BatchImageConverter from "@/src/components/BatchImageConverter";
import type {
  PageContent,
  StandardImageConversionContent,
} from "@/src/lib/conversion-content";
import type { SiteLocale } from "@/src/lib/site-locale";

export type SimpleImageConversionContent = {
  page: PageContent;
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
  pageLocale?: SiteLocale;
  content: SimpleImageConversionContent;
  accept: string;
  outputExtension: string;
  outputType: "image/png" | "image/jpeg" | "image/webp";
  isValidFile: (file: File) => boolean;
  fillBackground?: string;
  quality?: number;
  preprocess?: (file: File) => Promise<File>;
};

/**
 * Thin wrapper that maps the simple content shape onto the shared
 * BatchImageConverter (multi-file, progress, result step with downloads).
 */
export default function SimpleImageConversionTool({
  content,
  pageLocale,
  ...rest
}: Props) {
  const mapped = useMemo<StandardImageConversionContent>(() => {
    const { page, ui } = content;
    return {
      page,
      ui: {
        emptyTitle: ui.emptyTitle,
        unknownType: "-",
        convertingStatus: ui.loading,
        canvasInitError: ui.error,
        convertError: ui.error,
        loadError: ui.error,
        unexpectedErrorPrefix: ui.error,
        successMessage: () => ui.done,
        invalidFileError: ui.invalidFile,
        selectedImageTitle: ui.emptyTitle,
        fileNameLabel: pageLocale === "zh-TW" ? "檔案名稱" : "Name",
        fileTypeLabel: pageLocale === "zh-TW" ? "格式" : "Type",
        fileSizeLabel: pageLocale === "zh-TW" ? "大小" : "Size",
        previewLabel: pageLocale === "zh-TW" ? "預覽" : "Preview",
        convertButton: ui.button,
        convertingButton: ui.loading,
        resetButton: ui.resetButton,
      },
    };
  }, [content, pageLocale]);

  return <BatchImageConverter content={mapped} pageLocale={pageLocale} {...rest} />;
}
