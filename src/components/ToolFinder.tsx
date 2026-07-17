"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type DragEvent,
} from "react";
import type { ToolDirectoryItem } from "@/src/data/tool-directory";
import { formatFileSize } from "@/src/lib/image-conversion";
import { setPendingFiles } from "@/src/lib/pending-files";
import {
  detectFileFormat,
  getFileRecommendationSlugs,
  searchToolsByIntent,
  type ToolFinderLocale,
} from "@/src/lib/tool-finder";
import { ToolIcon } from "@/src/lib/tool-visuals";

type Props = {
  locale: ToolFinderLocale;
  tools: ToolDirectoryItem[];
  variant?: "home" | "directory";
};

const finderCopy = {
  ja: {
    label: "ツールを絞り込む",
    dropTitle: "ここにファイルをドロップ",
    fileAction: "ファイルを選択",
    fileHint: "種類を自動判定して、使えるツールをすぐに表示します",
    pasteHint: "スクリーンショットは Ctrl+V で貼り付けもできます",
    chooseAnother: "別のファイルを選択",
    clearFile: "選択を解除",
    recommendations: "このファイルで使えるツール",
    carryOverHint: "ツールを選ぶと、このファイルを持ったまま移動します",
    moreFiles: (n: number) => ` ほか${n}件`,
    format: "形式",
    privacy: "ファイルは送信されません",
    unknown: "このファイル形式に合うツールを判定できませんでした。",
    problemDivider: "またはやりたいことで探す",
    problemLabel: "困りごとを入力",
    problemPlaceholder: "例：CSVが1列になる、iPhone写真が開けない",
    results: (count: number) => `${count}件の候補`,
    noResults: "近いツールが見つかりませんでした。別の言葉でお試しください。",
    suggestions: [
      "CSVが1列になる",
      "画像の背景を透明に",
      "iPhone写真が開けない",
      "PDFの不要ページを消す",
    ],
    moreResults: (count: number) => `ほか${count}件はツール一覧から確認できます`,
  },
  en: {
    label: "Narrow down tools",
    dropTitle: "Drop your file here",
    fileAction: "Choose file",
    fileHint: "We detect the format and show only the tools that fit",
    pasteHint: "You can also paste a screenshot with Ctrl+V",
    chooseAnother: "Choose another file",
    clearFile: "Clear selected file",
    recommendations: "Tools for this file",
    carryOverHint: "Pick a tool and your file comes with you",
    moreFiles: (n: number) => ` +${n} more`,
    format: "Format",
    privacy: "Your file is not uploaded",
    unknown: "No tools could be matched to this file format.",
    problemDivider: "Or search by what you need",
    problemLabel: "Describe the problem",
    problemPlaceholder: "Example: CSV opens in one column",
    results: (count: number) => `${count} matching tool${count === 1 ? "" : "s"}`,
    noResults: "No close match was found. Try a different phrase.",
    suggestions: [
      "CSV opens in one column",
      "Make background transparent",
      "iPhone photo will not open",
      "Delete unwanted PDF pages",
    ],
    moreResults: (count: number) => `${count} more available in the full directory`,
  },
} as const;

function ToolResults({
  tools,
  onSelectTool,
}: {
  tools: ToolDirectoryItem[];
  onSelectTool?: () => void;
}) {
  return (
    <div className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 bg-white text-left">
      {tools.map((tool) => (
        <Link
          key={tool.slug}
          href={tool.href}
          onClick={onSelectTool}
          className="group flex min-h-16 items-center gap-3 px-3 py-2.5 transition hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none"
        >
          <ToolIcon name={tool.name} href={tool.href} size="sm" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-gray-900 group-hover:text-teal-700">
              {tool.name}
            </span>
            <span className="mt-0.5 block truncate text-xs text-gray-500">
              {tool.description}
            </span>
          </span>
          <span aria-hidden="true" className="text-lg text-gray-300 group-hover:text-teal-600">
            ›
          </span>
        </Link>
      ))}
    </div>
  );
}

export default function ToolFinder({ locale, tools, variant = "home" }: Props) {
  const t = finderCopy[locale];
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [query, setQuery] = useState("");
  const [dragging, setDragging] = useState(false);

  const file = files[0] ?? null;
  const format = file ? detectFileFormat(file) : null;
  const fileTools = useMemo(() => {
    if (!file) return [];
    const recommendationOrder = getFileRecommendationSlugs(file);
    const slugs = new Set(recommendationOrder);
    return tools.filter((tool) => slugs.has(tool.slug)).sort((left, right) => {
      return (
        recommendationOrder.indexOf(left.slug) -
        recommendationOrder.indexOf(right.slug)
      );
    });
  }, [file, tools]);
  const problemTools = useMemo(
    () => searchToolsByIntent(tools, query, locale),
    [locale, query, tools],
  );

  const visibleFileTools = fileTools.slice(0, 6);
  const visibleProblemTools = problemTools.slice(0, 8);
  const directoryHref = locale === "en" ? "/en/tools" : "/tools";

  const selectFiles = (selected: FileList | File[] | null) => {
    setFiles(selected ? Array.from(selected) : []);
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    selectFiles(event.dataTransfer.files);
  };

  // Accept a pasted screenshot or file (Ctrl+V / Cmd+V) anywhere on the page.
  // Text pastes (e.g. into the search box) carry no files and pass through.
  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const pasted = event.clipboardData?.files;
      if (pasted && pasted.length > 0) {
        event.preventDefault();
        setFiles(Array.from(pasted));
        setDragging(false);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, []);

  // Hand the selected files to the tool page so the user does not have to
  // pick them again after navigating.
  const handleToolSelected = () => {
    if (files.length > 0) setPendingFiles(files);
  };

  return (
    <section
      aria-label={t.label}
      className={`mx-auto w-full max-w-3xl rounded-xl border border-gray-200 bg-white p-3 sm:p-4 ${
        variant === "home" ? "shadow-lg shadow-gray-200/70" : ""
      }`}
    >
      <input
        ref={fileInputRef}
        id={`${id}-file-input`}
        type="file"
        multiple
        className="sr-only"
        accept="image/*,.pdf,.csv,.tsv,.txt,.json,.jsonl,.ndjson,.parquet"
        aria-label={t.fileAction}
        onChange={(event) => selectFiles(event.target.files)}
      />

      {files.length === 0 ? (
        <div
          onDragEnter={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`rounded-lg border-2 border-dashed text-center transition ${
            dragging
              ? "border-teal-500 bg-teal-50"
              : "border-gray-300 bg-gray-50"
          } ${variant === "home" ? "px-4 py-10 sm:py-12" : "px-4 py-7"}`}
        >
          {variant === "home" ? (
            <p className="text-lg font-bold text-gray-900 sm:text-xl">
              {t.dropTitle}
            </p>
          ) : null}
          <label
            htmlFor={`${id}-file-input`}
            className={`inline-flex cursor-pointer items-center justify-center rounded-md bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-800 ${
              variant === "home" ? "mt-4" : ""
            }`}
          >
            {t.fileAction}
          </label>
          <p className="mt-3 text-xs text-gray-500">{t.fileHint}</p>
          <p className="mt-1 text-xs text-gray-400">{t.pasteHint}</p>
          <p className="mt-1 text-xs font-medium text-teal-700">{t.privacy}</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-gray-100 pb-3 text-left">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gray-900 text-[10px] font-bold uppercase text-white">
              {format ?? "?"}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-gray-900">
                {file!.name}
                {files.length > 1 ? t.moreFiles(files.length - 1) : ""}
              </span>
              <span className="block text-xs text-gray-500">
                {format ? `${t.format}: ${format.toUpperCase()} · ` : ""}
                {formatFileSize(file!.size)}
              </span>
            </span>
            <button
              type="button"
              aria-label={t.clearFile}
              title={t.clearFile}
              onClick={() => {
                selectFiles(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 text-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              ×
            </button>
          </div>

          {visibleFileTools.length > 0 ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3 text-left">
                <h2 className="text-sm font-semibold text-gray-900">
                  {t.recommendations}
                </h2>
                <label
                  htmlFor={`${id}-file-input`}
                  className="cursor-pointer text-xs font-semibold text-teal-700 hover:text-teal-900"
                >
                  {t.chooseAnother}
                </label>
              </div>
              <ToolResults tools={visibleFileTools} onSelectTool={handleToolSelected} />
              <p className="text-left text-xs text-gray-400">{t.carryOverHint}</p>
              {fileTools.length > visibleFileTools.length ? (
                <Link
                  href={directoryHref}
                  className="inline-flex text-xs font-semibold text-teal-700 hover:text-teal-900"
                >
                  {t.moreResults(fileTools.length - visibleFileTools.length)}
                </Link>
              ) : null}
            </div>
          ) : (
            <p className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
              {t.unknown}
            </p>
          )}
        </div>
      )}

      <div className="mt-4 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-medium text-gray-400">{t.problemDivider}</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="pt-4">
        <label htmlFor={`${id}-problem-input`} className="sr-only">
          {t.problemLabel}
        </label>
        <div className="relative">
          <input
            id={`${id}-problem-input`}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.problemPlaceholder}
            className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 pr-11 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          />
          {query ? (
            <button
              type="button"
              aria-label={locale === "ja" ? "検索をクリア" : "Clear search"}
              onClick={() => setQuery("")}
              className="absolute inset-y-0 right-1 flex w-10 items-center justify-center text-xl text-gray-400 hover:text-gray-800"
            >
              ×
            </button>
          ) : null}
        </div>

        {!query.trim() ? (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {t.suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setQuery(suggestion)}
                className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:border-teal-300 hover:text-teal-800"
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4 space-y-2 text-left" aria-live="polite">
            <p className="text-xs font-medium text-gray-500">
              {problemTools.length > 0
                ? t.results(problemTools.length)
                : t.noResults}
            </p>
            {visibleProblemTools.length > 0 ? (
              <ToolResults tools={visibleProblemTools} />
            ) : null}
            {problemTools.length > visibleProblemTools.length ? (
              <Link
                href={directoryHref}
                className="inline-flex text-xs font-semibold text-teal-700 hover:text-teal-900"
              >
                {t.moreResults(problemTools.length - visibleProblemTools.length)}
              </Link>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
