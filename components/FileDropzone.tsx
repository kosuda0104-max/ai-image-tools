"use client";

import { usePathname } from "next/navigation";

type Props = {
  file: File | null;
  accept: string;
  emptyTitle: string;
  emptyDescription?: string;
  selectButtonLabel?: string;
  dropHereLabel?: string;
  clickToSelectLabel?: string;
  selectedFileLabel?: string;
  onFileSelect: (file: File | null) => void;
};

export default function FileDropzone({
  file,
  accept,
  emptyTitle,
  emptyDescription,
  selectButtonLabel,
  onFileSelect,
}: Props) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  const defaultSelectButtonLabel = isEnglish ? "Choose File" : "ファイルを選択";
  const changeFileLabel = isEnglish ? "Change file" : "ファイルを変更";
  const dropOrClickLabel = isEnglish
    ? "Drop file here or click to browse"
    : "ここにドロップ、またはクリックして選択";

  return (
    <label
      htmlFor="fileUpload"
      className={`group block cursor-pointer rounded-2xl border-2 border-dashed transition-colors ${
        file
          ? "border-blue-300 bg-blue-50 hover:border-blue-400"
          : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/40"
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0] || null;
        onFileSelect(f);
      }}
    >
      <input
        id="fileUpload"
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
      />

      <div className="flex flex-col items-center gap-3 px-6 py-10">
        {file ? (
          /* Selected state */
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-900 break-all">{file.name}</p>
              <p className="mt-1 text-xs text-blue-600 underline underline-offset-2">{changeFileLabel}</p>
            </div>
          </>
        ) : (
          /* Empty state */
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-900">{emptyTitle}</p>
              {emptyDescription && (
                <p className="mt-1 text-xs text-gray-500">{emptyDescription}</p>
              )}
              <p className="mt-1 text-xs text-gray-400">{dropOrClickLabel}</p>
            </div>
            <span className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white group-hover:bg-blue-600 transition-colors">
              {selectButtonLabel ?? defaultSelectButtonLabel}
            </span>
          </>
        )}
      </div>
    </label>
  );
}
