"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { zipSync } from "fflate";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import type { StandardImageConversionContent } from "@/src/lib/conversion-content";
import {
  convertImageWithCanvas,
  formatFileSize,
  getBaseName,
  getErrorMessage,
  triggerBlobDownload,
} from "@/src/lib/image-conversion";

type Props = {
  content: StandardImageConversionContent;
  accept: string;
  outputExtension: string;
  outputType: "image/png" | "image/jpeg" | "image/webp";
  isValidFile: (file: File) => boolean;
  fillBackground?: string;
  quality?: number;
  /** Optional preprocessing step (e.g. HEIC → canvas-friendly blob). */
  preprocess?: (file: File) => Promise<File>;
};

type SourceItem = {
  id: string;
  file: File;
  url: string;
};

type ResultItem = {
  id: string;
  name: string;
  blob: Blob;
  url: string;
  size: number;
};

function isJa(text: string) {
  return /[ぁ-んァ-ン一-龠]/.test(text);
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function BatchImageConverter({
  content,
  accept,
  outputExtension,
  outputType,
  isValidFile,
  fillBackground,
  quality,
  preprocess,
}: Props) {
  const { page, ui } = content;
  const ja = isJa(page.title);

  const L = ja
    ? {
        addMore: "画像を追加",
        dropHint: "ここにドラッグ＆ドロップ、またはクリックして選択（複数可）",
        selected: (n: number) => `${n} 件の画像`,
        remove: "削除",
        convert: (n: number) => (n > 1 ? `${n} 件をまとめて変換` : ui.convertButton),
        converting: ui.convertingButton,
        progress: (d: number, t: number) => `変換中... ${d} / ${t}`,
        resultsTitle: "変換結果",
        download: "ダウンロード",
        downloadAll: "すべて ZIP でダウンロード",
        convertMore: "別の画像を変換",
        invalid: ui.invalidFileError,
        someInvalid: "対応していないファイルが除外されました。",
        empty: "変換する画像を追加してください。",
      }
    : {
        addMore: "Add images",
        dropHint: "Drag & drop here or click to select (multiple allowed)",
        selected: (n: number) => `${n} image${n !== 1 ? "s" : ""}`,
        remove: "Remove",
        convert: (n: number) => (n > 1 ? `Convert ${n} files` : ui.convertButton),
        converting: ui.convertingButton,
        progress: (d: number, t: number) => `Converting... ${d} / ${t}`,
        resultsTitle: "Results",
        download: "Download",
        downloadAll: "Download all as ZIP",
        convertMore: "Convert more images",
        invalid: ui.invalidFileError,
        someInvalid: "Some unsupported files were skipped.",
        empty: "Please add an image to convert.",
      };

  const [items, setItems] = useState<SourceItem[]>([]);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  // Track thumbnails the browser cannot render (e.g. HEIC source files).
  const [brokenThumbs, setBrokenThumbs] = useState<Set<string>>(new Set());

  const markThumbBroken = (id: string) =>
    setBrokenThumbs((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });

  // Track object URLs for cleanup on unmount.
  const urlsRef = useRef<string[]>([]);
  useEffect(() => {
    return () => {
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    };
  }, []);

  const addFiles = useCallback(
    (fileList: FileList | File[] | null) => {
      if (!fileList) return;
      const incoming = Array.from(fileList);
      if (incoming.length === 0) return;

      const valid = incoming.filter((f) => isValidFile(f));
      const skipped = incoming.length - valid.length;

      setItems((prev) => {
        const existing = new Set(prev.map((i) => `${i.file.name}:${i.file.size}`));
        const next = [...prev];
        for (const file of valid) {
          const key = `${file.name}:${file.size}`;
          if (existing.has(key)) continue;
          existing.add(key);
          const url = URL.createObjectURL(file);
          urlsRef.current.push(url);
          next.push({ id: makeId(), file, url });
        }
        return next;
      });

      if (skipped > 0) {
        setStatus(valid.length === 0 ? L.invalid : L.someInvalid);
      } else {
        setStatus("");
      }
    },
    [isValidFile, L.invalid, L.someInvalid],
  );

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleConvert = async () => {
    if (items.length === 0 || isProcessing) {
      if (items.length === 0) setStatus(L.empty);
      return;
    }

    setIsProcessing(true);
    setResults([]);
    setStatus("");
    setProgress({ done: 0, total: items.length });

    const out: ResultItem[] = [];
    const usedNames = new Set<string>();

    try {
      for (let i = 0; i < items.length; i++) {
        const source = items[i].file;
        try {
          const input = preprocess ? await preprocess(source) : source;
          const blob = await convertImageWithCanvas({
            file: input,
            outputType,
            quality,
            fillBackground,
          });

          let name = `${getBaseName(source.name)}.${outputExtension}`;
          let dupe = 1;
          while (usedNames.has(name)) {
            name = `${getBaseName(source.name)}-${dupe++}.${outputExtension}`;
          }
          usedNames.add(name);

          const url = URL.createObjectURL(blob);
          urlsRef.current.push(url);
          out.push({ id: makeId(), name, blob, url, size: blob.size });
        } catch {
          // Skip a single failed file but keep going with the rest.
        }
        setProgress({ done: i + 1, total: items.length });
      }

      setResults(out);
      if (out.length === 0) {
        setStatus(ui.convertError);
      } else if (out.length === 1) {
        setStatus(ui.successMessage(getBaseName(out[0].name)));
      }
    } catch (error) {
      setStatus(`${ui.unexpectedErrorPrefix}: ${getErrorMessage(error)}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = () => {
    if (results.length === 0) return;
    const zipInput: Record<string, Uint8Array> = {};
    Promise.all(
      results.map(async (r) => {
        zipInput[r.name] = new Uint8Array(await r.blob.arrayBuffer());
      }),
    ).then(() => {
      const zipped = zipSync(zipInput, { level: 0 });
      const blob = new Blob([zipped.slice().buffer], { type: "application/zip" });
      triggerBlobDownload(blob, "converted.zip");
    });
  };

  const handleReset = () => {
    // Release object URLs created for source/result previews to avoid leaks
    // when the user converts several batches in one session.
    urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    urlsRef.current = [];
    setItems([]);
    setResults([]);
    setStatus("");
    setProgress({ done: 0, total: 0 });
    setBrokenThumbs(new Set());
  };

  const hasResults = results.length > 0;

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
      <div className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        {!hasResults ? (
          <>
            {/* Multi-file dropzone */}
            <label
              htmlFor="batch-file-input"
              className="group block cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-blue-400 hover:bg-blue-50/40"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                addFiles(e.dataTransfer.files);
              }}
            >
              <input
                id="batch-file-input"
                type="file"
                accept={accept}
                multiple
                className="hidden"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.currentTarget.value = "";
                }}
              />
              <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{ui.emptyTitle}</p>
                  <p className="mt-1 text-xs text-gray-400">{L.dropHint}</p>
                </div>
                <span className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-blue-600">
                  {L.addMore}
                </span>
              </div>
            </label>

            {/* Selected files list */}
            {items.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900">{L.selected(items.length)}</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {items.map((item) => (
                    <div key={item.id} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                      {brokenThumbs.has(item.id) ? (
                        <div className="flex h-24 w-full flex-col items-center justify-center gap-1 text-gray-400">
                          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM14 3v4h4" />
                          </svg>
                          <span className="text-[10px] uppercase">{(item.file.name.split(".").pop() || "img").slice(0, 5)}</span>
                        </div>
                      ) : (
                        <img
                          src={item.url}
                          alt={item.file.name}
                          className="h-24 w-full object-contain"
                          onError={() => markThumbBroken(item.id)}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={L.remove}
                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition group-hover:opacity-100"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <p className="truncate px-2 py-1 text-[10px] text-gray-500">{item.file.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Progress */}
            {isProcessing && progress.total > 0 && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{L.progress(progress.done, progress.total)}</span>
                  <span>{Math.round((progress.done / progress.total) * 100)}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-200"
                    style={{ width: `${(progress.done / progress.total) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <PrimaryButton onClick={handleConvert} disabled={items.length === 0 || isProcessing}>
                {isProcessing ? L.converting : L.convert(items.length)}
              </PrimaryButton>
              {items.length > 0 && !isProcessing ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  {ui.resetButton ?? (ja ? "リセット" : "Reset")}
                </button>
              ) : null}
            </div>
          </>
        ) : (
          /* ── Result step ── */
          <div className="space-y-5">
            <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
              <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {L.resultsTitle}（{results.length}）
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {results.map((r) => (
                <div key={r.id} className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <img src={r.url} alt={r.name} className="h-28 w-full bg-gray-50 object-contain" />
                  <div className="flex flex-1 flex-col gap-2 p-3">
                    <p className="truncate text-xs font-medium text-gray-800" title={r.name}>{r.name}</p>
                    <p className="text-[11px] text-gray-400">{formatFileSize(r.size)}</p>
                    <button
                      type="button"
                      onClick={() => triggerBlobDownload(r.blob, r.name)}
                      className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5 5-5M12 4v12" />
                      </svg>
                      {L.download}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {results.length > 1 && (
                <PrimaryButton onClick={handleDownloadAll}>{L.downloadAll}</PrimaryButton>
              )}
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                {L.convertMore}
              </button>
            </div>
          </div>
        )}

        <StatusMessage status={status} />
      </div>
    </ToolPageLayout>
  );
}
