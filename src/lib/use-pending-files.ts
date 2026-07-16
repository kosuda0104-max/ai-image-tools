"use client";

import { useEffect, useRef } from "react";
import { takePendingFiles } from "@/src/lib/pending-files";

// Feeds files handed over from the homepage drop zone (ToolFinder) into a
// tool's own file handler once, on mount. The tool's normal validation runs
// on the handed-over files just like on a manual selection.
export function usePendingFiles(onFiles: (files: File[]) => void) {
  const handler = useRef(onFiles);
  useEffect(() => {
    handler.current = onFiles;
  });

  useEffect(() => {
    const files = takePendingFiles();
    if (files && files.length > 0) handler.current(files);
  }, []);
}
