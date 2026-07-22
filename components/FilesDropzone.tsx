"use client";

import { usePathname } from "next/navigation";
import { usePendingFiles } from "@/src/lib/use-pending-files";

type Props = {
  files: File[];
  accept: string;
  multiple?: boolean;
  emptyTitle: string;
  emptyDescription?: string;
  onFilesSelect: (files: File[]) => void;
};

export default function FilesDropzone({
  files,
  accept,
  multiple = false,
  emptyTitle,
  emptyDescription,
  onFilesSelect,
}: Props) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");
  usePendingFiles((pending) => onFilesSelect(multiple ? pending : pending.slice(0, 1)));

  const choose = isEnglish
    ? multiple
      ? "Choose Files"
      : "Choose File"
    : multiple
      ? "ファイルを選択"
      : "ファイルを選択";
  const change = isEnglish ? "Change selection" : "選び直す";
  const drop = isEnglish
    ? multiple
      ? "Drop files here or click to browse"
      : "Drop a file here or click to browse"
    : multiple
      ? "ここにまとめてドロップ、またはクリックして選択"
      : "ここにドロップ、またはクリックして選択";

  return (
    <label
      htmlFor="awsFileUpload"
      className={`group block cursor-pointer rounded-xl border-2 border-dashed transition-colors ${
        files.length > 0
          ? "border-teal-300 bg-teal-50 hover:border-teal-400"
          : "border-gray-300 bg-gray-50 hover:border-teal-400 hover:bg-teal-50/40"
      }`}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const selected = Array.from(event.dataTransfer.files ?? []);
        onFilesSelect(multiple ? selected : selected.slice(0, 1));
      }}
    >
      <input
        id="awsFileUpload"
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(event) => {
          const selected = Array.from(event.target.files ?? []);
          onFilesSelect(multiple ? selected : selected.slice(0, 1));
        }}
      />

      <div className="flex flex-col items-center gap-3 px-5 py-8">
        <span
          aria-hidden="true"
          className={`flex h-11 w-11 items-center justify-center rounded-full text-xl font-bold ${
            files.length > 0 ? "bg-teal-100 text-teal-700" : "bg-gray-200 text-gray-500"
          }`}
        >
          {files.length > 0 ? "OK" : "+"}
        </span>
        <div className="min-w-0 max-w-full text-center">
          <p className="text-sm font-semibold text-gray-900">
            {files.length > 0
              ? isEnglish
                ? `${files.length} file${files.length === 1 ? "" : "s"} selected`
                : `${files.length}件を選択中`
              : emptyTitle}
          </p>
          {files.length > 0 ? (
            <ul className="mt-1 max-w-lg text-xs leading-5 text-gray-600">
              {files.slice(0, 4).map((file) => (
                <li key={`${file.name}-${file.size}`} className="truncate">
                  {file.name}
                </li>
              ))}
              {files.length > 4 ? <li>+{files.length - 4}</li> : null}
            </ul>
          ) : emptyDescription ? (
            <p className="mt-1 text-xs text-gray-500">{emptyDescription}</p>
          ) : null}
          <p className="mt-1 text-xs text-gray-400">{drop}</p>
        </div>
        <span className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-teal-700">
          {files.length > 0 ? change : choose}
        </span>
      </div>
    </label>
  );
}
