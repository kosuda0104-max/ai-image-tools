"use client";

import Link from "next/link";
import {
  useId,
  useMemo,
  useRef,
  useState,
  type DragEvent,
} from "react";
import type { ToolDirectoryItem } from "@/src/data/tool-directory";
import { formatFileSize } from "@/src/lib/image-conversion";
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

type FinderMode = "file" | "problem";

const finderCopy = {
  ja: {
    label: "ツールを絞り込む",
    fileTab: "ファイルから探す",
    problemTab: "困りごとから探す",
    fileAction: "ファイルを選択またはドロップ",
    fileHint: "形式に合うツールだけを表示します",
    chooseAnother: "別のファイルを選択",
    clearFile: "選択を解除",
    recommendations: "このファイルで使えるツール",
    format: "形式",
    privacy: "ファイルは送信されません",
    unknown: "このファイル形式に合うツールを判定できませんでした。",
    problemLabel: "困りごとを入力",
    problemPlaceholder: "例：CSVが1列になる、iPhone写真が開けない",
    results: (count: number) => `${count}件の候補`,
    noResults: "近いツールが見つかりませんでした。別の言葉でお試しください。",
    suggestionsLabel: "よくある困りごと",
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
    fileTab: "Find by file",
    problemTab: "Search by problem",
    fileAction: "Choose or drop a file",
    fileHint: "See only tools that support its format",
    chooseAnother: "Choose another file",
    clearFile: "Clear selected file",
    recommendations: "Tools for this file",
    format: "Format",
    privacy: "Your file is not uploaded",
    unknown: "No tools could be matched to this file format.",
    problemLabel: "Describe the problem",
    problemPlaceholder: "Example: CSV opens in one column",
    results: (count: number) => `${count} matching tool${count === 1 ? "" : "s"}`,
    noResults: "No close match was found. Try a different phrase.",
    suggestionsLabel: "Common problems",
    suggestions: [
      "CSV opens in one column",
      "Make background transparent",
      "iPhone photo will not open",
      "Delete unwanted PDF pages",
    ],
    moreResults: (count: number) => `${count} more available in the full directory`,
  },
} as const;

function ToolResults({ tools }: { tools: ToolDirectoryItem[] }) {
  return (
    <div className="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 bg-white">
      {tools.map((tool) => (
        <Link
          key={tool.slug}
          href={tool.href}
          className="group flex min-h-16 items-center gap-3 px-3 py-2.5 transition hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none"
        >
          <ToolIcon name={tool.name} href={tool.href} size="sm" />
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-gray-900 group-hover:text-blue-700">
              {tool.name}
            </span>
            <span className="mt-0.5 block truncate text-xs text-gray-500">
              {tool.description}
            </span>
          </span>
          <span aria-hidden="true" className="text-lg text-gray-300 group-hover:text-blue-600">
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
  const [mode, setMode] = useState<FinderMode>("file");
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState("");
  const [dragging, setDragging] = useState(false);

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

  const selectFile = (selected: File | null) => {
    setFile(selected);
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    selectFile(event.dataTransfer.files[0] ?? null);
  };

  return (
    <section
      aria-label={t.label}
      className={`mx-auto w-full max-w-3xl rounded-lg border border-gray-200 bg-white p-3 sm:p-4 ${
        variant === "home" ? "shadow-lg shadow-gray-200/70" : ""
      }`}
    >
      <div
        role="tablist"
        aria-label={t.label}
        className="grid grid-cols-2 rounded-lg bg-gray-100 p-1"
      >
        {([
          ["file", t.fileTab],
          ["problem", t.problemTab],
        ] as const).map(([value, label]) => (
          <button
            key={value}
            id={`${id}-${value}-tab`}
            type="button"
            role="tab"
            aria-selected={mode === value}
            aria-controls={`${id}-${value}-panel`}
            onClick={() => setMode(value)}
            className={`min-h-10 rounded-md px-3 py-2 text-sm font-semibold transition ${
              mode === value
                ? "bg-white text-gray-950 shadow-sm"
                : "text-gray-600 hover:text-gray-950"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "file" ? (
        <div
          id={`${id}-file-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-file-tab`}
          className="pt-4"
        >
          <input
            ref={fileInputRef}
            id={`${id}-file-input`}
            type="file"
            className="sr-only"
            accept="image/*,.pdf,.csv,.tsv,.txt,.json,.jsonl,.ndjson,.parquet"
            aria-label={t.fileAction}
            onChange={(event) => selectFile(event.target.files?.[0] ?? null)}
          />

          {!file ? (
            <div
              onDragEnter={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragOver={(event) => event.preventDefault()}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`rounded-lg border border-dashed px-4 py-7 text-center transition ${
                dragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              <label
                htmlFor={`${id}-file-input`}
                className="inline-flex cursor-pointer items-center justify-center rounded-md bg-gray-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                {t.fileAction}
              </label>
              <p className="mt-2 text-xs text-gray-500">{t.fileHint}</p>
              <p className="mt-1 text-xs font-medium text-emerald-700">{t.privacy}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gray-900 text-[10px] font-bold uppercase text-white">
                  {format ?? "?"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-gray-900">
                    {file.name}
                  </span>
                  <span className="block text-xs text-gray-500">
                    {format ? `${t.format}: ${format.toUpperCase()} · ` : ""}
                    {formatFileSize(file.size)}
                  </span>
                </span>
                <button
                  type="button"
                  aria-label={t.clearFile}
                  title={t.clearFile}
                  onClick={() => {
                    selectFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 text-xl text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                >
                  ×
                </button>
              </div>

              {visibleFileTools.length > 0 ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold text-gray-900">
                      {t.recommendations}
                    </h2>
                    <label
                      htmlFor={`${id}-file-input`}
                      className="cursor-pointer text-xs font-semibold text-blue-700 hover:text-blue-900"
                    >
                      {t.chooseAnother}
                    </label>
                  </div>
                  <ToolResults tools={visibleFileTools} />
                  {fileTools.length > visibleFileTools.length ? (
                    <Link
                      href={directoryHref}
                      className="inline-flex text-xs font-semibold text-blue-700 hover:text-blue-900"
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
        </div>
      ) : (
        <div
          id={`${id}-problem-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-problem-tab`}
          className="pt-4"
        >
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
              className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 pr-11 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
            <div className="mt-4">
              <p className="text-xs font-medium text-gray-500">
                {t.suggestionsLabel}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {t.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuery(suggestion)}
                    className="rounded-md border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:border-blue-300 hover:text-blue-800"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-2" aria-live="polite">
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
                  className="inline-flex text-xs font-semibold text-blue-700 hover:text-blue-900"
                >
                  {t.moreResults(problemTools.length - visibleProblemTools.length)}
                </Link>
              ) : null}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
