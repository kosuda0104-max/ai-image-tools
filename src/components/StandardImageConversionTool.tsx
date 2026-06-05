"use client";

import BatchImageConverter from "@/src/components/BatchImageConverter";
import type { StandardImageConversionContent } from "@/src/lib/conversion-content";

export type { StandardImageConversionContent } from "@/src/lib/conversion-content";

type Props = {
  content: StandardImageConversionContent;
  accept: string;
  outputExtension: string;
  outputType: "image/png" | "image/jpeg" | "image/webp";
  isValidFile: (file: File) => boolean;
  fillBackground?: string;
  quality?: number;
  preprocess?: (file: File) => Promise<File>;
};

/**
 * Standard single/multi image conversion tool. Delegates to the shared
 * BatchImageConverter, which provides multi-file selection, a progress
 * indicator, and a result step with per-file + ZIP download.
 */
export default function StandardImageConversionTool(props: Props) {
  return <BatchImageConverter {...props} />;
}
