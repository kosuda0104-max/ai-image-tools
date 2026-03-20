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
  dropHereLabel,
  clickToSelectLabel,
  selectedFileLabel,
  onFileSelect,
}: Props) {
  const pathname = usePathname();
  const isEnglish = pathname?.startsWith("/en");

  const defaultSelectButtonLabel = isEnglish ? "Choose File" : "ファイルを選択";
  const defaultDropHereLabel = isEnglish
    ? "Drop file here"
    : "ここにファイルをドロップ";
  const defaultClickToSelectLabel = isEnglish
    ? "or click to browse"
    : "またはクリックして選択";
  const defaultSelectedFileLabel = isEnglish
    ? "Selected File"
    : "選択中のファイル";

  return (
    <label
      htmlFor="fileUpload"
      className="block cursor-pointer rounded-xl border-2 border-dashed p-8 text-center hover:bg-gray-50"
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

      <div className="space-y-2">
        <div className="text-sm text-gray-600">
          {file
            ? selectedFileLabel ?? defaultSelectedFileLabel
            : emptyTitle}
        </div>

        <div className="text-lg font-semibold">
          {file
            ? file.name
            : dropHereLabel ?? defaultDropHereLabel}
        </div>

        {!file && emptyDescription ? (
          <div className="text-sm text-gray-500">{emptyDescription}</div>
        ) : null}

        <div className="text-sm text-gray-500">
          {clickToSelectLabel ?? defaultClickToSelectLabel}
        </div>

        <div className="inline-flex rounded-lg bg-black px-4 py-2 text-white">
          {selectButtonLabel ?? defaultSelectButtonLabel}
        </div>
      </div>
    </label>
  );
}
