"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import FAQJsonLd from "@/components/FAQJsonLd";

type Locale = "ja" | "en";

type FAQItem = {
  question: string;
  answer: string;
};

type RelatedToolItem = {
  name: string;
  href: string;
};

type PageContent = {
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

type UIContent = {
  emptyTitle: string;
  emptyDescription: string;
  selectButtonLabel: string;
  dropHereLabel: string;
  clickToSelectLabel: string;
  selectedFileLabel: string;
  selectedFileTitle: string;
  fileNameLabel: string;
  fileTypeLabel: string;
  fileSizeLabel: string;
  totalPagesLabel: string;
  removePagesLabel: string;
  removePagesPlaceholder: string;
  removePagesHint: string;
  keepPagesLabel: string;
  removeButton: string;
  removingButton: string;
  downloadButton: string;
  resetButton: string;
  unknownType: string;
  invalidFileError: string;
  invalidRangeError: string;
  allPagesRemovedError: string;
  noPagesMatchedError: string;
  loadingStatus: string;
  removingStatus: string;
  successMessage: (removedCount: number, keptCount: number) => string;
  removeError: string;
};

type ToolContent = {
  page: PageContent;
  ui: UIContent;
};

type Props = {
  locale: Locale;
};

const content: Record<Locale, ToolContent> = {
  ja: {
    page: {
      title: "PDFページ削除ツール",
      description:
        "PDFから不要なページを削除して新しいPDFを作成できる無料オンラインツールです。ブラウザ上で安全に処理できます。",
      aboutTitle: "PDFページ削除ツールとは？",
      aboutText:
        "PDFページ削除ツールは、PDFファイルから不要なページを削除して新しいPDFを作成できる無料オンラインツールです。表紙や空白ページを取り除きたいとき、不要ページを削除して配布用PDFを作りたいとき、資料の一部を整理したいときに便利です。処理はブラウザ上で完結するため、PDFファイルを外部サーバーにアップロードせず安全に利用できます。",
      stepsTitle: "使い方",
      steps: [
        "PDFファイルをアップロードします",
        "削除したいページ番号や範囲を入力します",
        "「ページを削除」ボタンを押します",
        "不要ページを除いたPDFをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "PDFはサーバーにアップロードされますか？",
          answer:
            "いいえ。PDFはブラウザ上で処理されるため、外部サーバーには送信されません。",
        },
        {
          question: "複数ページをまとめて削除できますか？",
          answer:
            "はい。1ページだけでなく、カンマ区切りや範囲指定で複数ページをまとめて削除できます。",
        },
        {
          question: "どんな入力ができますか？",
          answer:
            "例えば `1`、`1,3,5`、`2-6`、`1,3-5,8` のような形式に対応しています。",
        },
        {
          question: "すべてのページを削除できますか？",
          answer:
            "すべてのページを削除することはできません。少なくとも1ページは残す必要があります。",
        },
      ],
      relatedTools: [
        { name: "PDF分割", href: "/tools/split-pdf" },
        { name: "PDF結合", href: "/tools/merge-pdf" },
        { name: "PDF圧縮", href: "/tools/compress-pdf" },
        { name: "PDFをJPGに変換", href: "/tools/pdf-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "PDFをドラッグ＆ドロップ、または選択",
      emptyDescription:
        "不要なページを削除して新しいPDFを作成できます。",
      selectButtonLabel: "PDFを選択",
      dropHereLabel: "ここにPDFをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      selectedFileTitle: "選択中のPDF",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      totalPagesLabel: "総ページ数",
      removePagesLabel: "削除ページ",
      removePagesPlaceholder: "例: 1,3-5,8",
      removePagesHint:
        "入力例: 1 / 1,3,5 / 2-6 / 1,3-5,8",
      keepPagesLabel: "削除後に残るページ数",
      removeButton: "ページを削除",
      removingButton: "削除中...",
      downloadButton: "削除後PDFをダウンロード",
      resetButton: "リセット",
      unknownType: "不明",
      invalidFileError: "エラー: PDFファイルを選択してください。",
      invalidRangeError:
        "エラー: ページ指定が不正です。例: 1,3-5,8 の形式で入力してください。",
      allPagesRemovedError:
        "エラー: すべてのページは削除できません。少なくとも1ページ残してください。",
      noPagesMatchedError:
        "エラー: 有効な削除ページが見つかりませんでした。",
      loadingStatus: "PDFを読み込み中です...",
      removingStatus: "ページを削除中です...",
      successMessage: (removedCount: number, keptCount: number) =>
        `完了: ${removedCount}ページを削除し、${keptCount}ページを残しました。`,
      removeError: "エラー: ページ削除に失敗しました。",
    },
  },
  en: {
    page: {
      title: "PDF Remove Pages Tool",
      description:
        "Remove unwanted pages from a PDF and create a new PDF online for free. Everything runs directly in your browser.",
      aboutTitle: "What is PDF Remove Pages Tool?",
      aboutText:
        "This free PDF page remover lets you delete unwanted pages from a PDF and create a new PDF directly in your browser. It is useful for removing cover pages, blank pages, and unnecessary sections before sharing or printing. Since everything is processed locally, your PDF files are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a PDF file",
        "Enter the pages or page ranges you want to remove",
        "Click Remove Pages",
        "Download the updated PDF",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my PDF files uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Can I remove multiple pages at once?",
          answer:
            "Yes. You can remove one page, multiple pages, or page ranges in a single operation.",
        },
        {
          question: "What input formats are supported?",
          answer:
            "You can use formats like `1`, `1,3,5`, `2-6`, or `1,3-5,8`.",
        },
        {
          question: "Can I remove all pages?",
          answer:
            "No. At least one page must remain in the output PDF.",
        },
      ],
      relatedTools: [
        { name: "Split PDF", href: "/en/tools/split-pdf" },
        { name: "Merge PDF", href: "/en/tools/merge-pdf" },
        { name: "Compress PDF", href: "/en/tools/compress-pdf" },
        { name: "PDF to JPG", href: "/en/tools/pdf-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a PDF here, or select a file",
      emptyDescription:
        "Remove unwanted pages and create a new PDF.",
      selectButtonLabel: "Choose PDF",
      dropHereLabel: "Drop PDF here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      selectedFileTitle: "Selected PDF",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      totalPagesLabel: "Total Pages",
      removePagesLabel: "Pages to Remove",
      removePagesPlaceholder: "Example: 1,3-5,8",
      removePagesHint:
        "Examples: 1 / 1,3,5 / 2-6 / 1,3-5,8",
      keepPagesLabel: "Pages remaining after removal",
      removeButton: "Remove Pages",
      removingButton: "Removing...",
      downloadButton: "Download Updated PDF",
      resetButton: "Reset",
      unknownType: "Unknown",
      invalidFileError: "Error: Please select a PDF file.",
      invalidRangeError:
        "Error: Invalid page input. Use a format like 1,3-5,8.",
      allPagesRemovedError:
        "Error: You cannot remove all pages. At least one page must remain.",
      noPagesMatchedError:
        "Error: No valid pages to remove were found.",
      loadingStatus: "Loading PDF...",
      removingStatus: "Removing pages...",
      successMessage: (removedCount: number, keptCount: number) =>
        `Done: Removed ${removedCount} page(s) and kept ${keptCount} page(s).`,
      removeError: "Error: Failed to remove pages.",
    },
  },
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function getPdfPageCount(file: File): Promise<number> {
  const bytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(bytes);
  return pdfDoc.getPageCount();
}

function parsePageRanges(input: string, maxPages: number): number[] | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const values = new Set<number>();
  const parts = trimmed.split(",").map((part) => part.trim()).filter(Boolean);

  for (const part of parts) {
    if (part.includes("-")) {
      const [startText, endText] = part.split("-").map((v) => v.trim());
      const start = Number(startText);
      const end = Number(endText);

      if (
        !Number.isInteger(start) ||
        !Number.isInteger(end) ||
        start < 1 ||
        end < 1 ||
        start > end
      ) {
        return null;
      }

      for (let page = start; page <= end; page += 1) {
        if (page <= maxPages) {
          values.add(page);
        }
      }
    } else {
      const page = Number(part);
      if (!Number.isInteger(page) || page < 1) {
        return null;
      }
      if (page <= maxPages) {
        values.add(page);
      }
    }
  }

  return Array.from(values).sort((a, b) => a - b);
}

export default function PdfRemovePagesTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [removePageRange, setRemovePageRange] = useState("");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [downloadFileName, setDownloadFileName] = useState("updated.pdf");

  const fileInfo = useMemo(() => {
    if (!file) return null;
    return {
      name: file.name,
      type: file.type || ui.unknownType,
      size: formatFileSize(file.size),
    };
  }, [file, ui.unknownType]);

  const pagesToRemove = useMemo(() => {
    if (!totalPages) return [];
    return parsePageRanges(removePageRange, totalPages) ?? [];
  }, [removePageRange, totalPages]);

  const remainingPages = useMemo(() => {
    if (!totalPages) return 0;
    return Math.max(0, totalPages - pagesToRemove.length);
  }, [totalPages, pagesToRemove]);

  const handleFileSelect = async (nextFile: File | null) => {
    setMessage("");
    setResultBlob(null);
    setTotalPages(0);
    setRemovePageRange("");

    if (!nextFile) {
      setFile(null);
      return;
    }

    const isPdf =
      nextFile.type === "application/pdf" || /\.pdf$/i.test(nextFile.name);

    if (!isPdf) {
      setFile(null);
      setMessage(ui.invalidFileError);
      return;
    }

    try {
      setIsProcessing(true);
      setMessage(ui.loadingStatus);

      const count = await getPdfPageCount(nextFile);
      setFile(nextFile);
      setTotalPages(count);
      setDownloadFileName(
        nextFile.name.replace(/\.pdf$/i, "") + "-updated.pdf"
      );
      setMessage("");
    } catch (error) {
      console.error(error);
      setFile(null);
      setMessage(ui.removeError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    void handleFileSelect(nextFile);
    event.target.value = "";
  };

  const handleRemovePages = async () => {
    if (!file || !totalPages) return;

    const removePages = parsePageRanges(removePageRange, totalPages);

    if (!removePages) {
      setMessage(ui.invalidRangeError);
      return;
    }

    if (removePages.length === 0) {
      setMessage(ui.noPagesMatchedError);
      return;
    }

    if (removePages.length >= totalPages) {
      setMessage(ui.allPagesRemovedError);
      return;
    }

    try {
      setIsProcessing(true);
      setMessage(ui.removingStatus);

      const bytes = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(bytes);
      const outputPdf = await PDFDocument.create();

      const removeSet = new Set(removePages);
      const keepIndexes = Array.from({ length: totalPages }, (_, index) => index)
        .filter((index) => !removeSet.has(index + 1));

      const copiedPages = await outputPdf.copyPages(sourcePdf, keepIndexes);
      copiedPages.forEach((pageItem) => {
        outputPdf.addPage(pageItem);
      });

      const resultBytes = await outputPdf.save();
      const normalizedResultBytes = new Uint8Array(resultBytes);
      const blob = new Blob([normalizedResultBytes.buffer], { type: "application/pdf" });

      setResultBlob(blob);
      setMessage(ui.successMessage(removePages.length, keepIndexes.length));
    } catch (error) {
      console.error(error);
      setMessage(ui.removeError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob) return;

    const url = URL.createObjectURL(resultBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadFileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFile(null);
    setMessage("");
    setIsProcessing(false);
    setTotalPages(0);
    setRemovePageRange("");
    setResultBlob(null);
    setDownloadFileName("updated.pdf");
  };

  return (
    <>
      <FAQJsonLd faqs={page.faqs} />
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
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <FileDropzone
          file={file}
          accept="application/pdf,.pdf"
          emptyTitle={ui.emptyTitle}
          emptyDescription={ui.emptyDescription}
          selectButtonLabel={ui.selectButtonLabel}
          dropHereLabel={ui.dropHereLabel}
          clickToSelectLabel={ui.clickToSelectLabel}
          selectedFileLabel={ui.selectedFileLabel}
          onFileSelect={(nextFile) => {
            void handleFileSelect(nextFile);
          }}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-800">
            {ui.selectButtonLabel}
          </label>
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleInputChange}
            className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700"
          />
        </div>

        {fileInfo && (
          <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">
                {ui.selectedFileTitle}
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">{ui.fileNameLabel}:</span>{" "}
                  {fileInfo.name}
                </p>
                <p>
                  <span className="font-medium text-gray-800">{ui.fileTypeLabel}:</span>{" "}
                  {fileInfo.type}
                </p>
                <p>
                  <span className="font-medium text-gray-800">{ui.fileSizeLabel}:</span>{" "}
                  {fileInfo.size}
                </p>
                <p>
                  <span className="font-medium text-gray-800">{ui.totalPagesLabel}:</span>{" "}
                  {totalPages}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="remove-page-range"
                className="text-sm font-medium text-gray-800"
              >
                {ui.removePagesLabel}
              </label>
              <input
                id="remove-page-range"
                type="text"
                value={removePageRange}
                onChange={(e) => setRemovePageRange(e.target.value)}
                placeholder={ui.removePagesPlaceholder}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
              />
              <p className="text-sm text-gray-600">{ui.removePagesHint}</p>
              <p className="text-sm text-gray-600">
                {ui.keepPagesLabel}: {remainingPages}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            onClick={handleRemovePages}
            disabled={!file || isProcessing || !removePageRange.trim()}
          >
            {isProcessing ? ui.removingButton : ui.removeButton}
          </PrimaryButton>

          {resultBlob ? (
            <PrimaryButton onClick={handleDownload}>
              {ui.downloadButton}
            </PrimaryButton>
          ) : null}

          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {ui.resetButton}
          </button>
        </div>

        {message && <StatusMessage status={message} />}
      </div>
    </ToolPageLayout>
    </>
  );
}


