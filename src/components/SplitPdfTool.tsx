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
  pageRangeLabel: string;
  pageRangePlaceholder: string;
  pageRangeHint: string;
  extractButton: string;
  extractingButton: string;
  downloadButton: string;
  resetButton: string;
  unknownType: string;
  invalidFileError: string;
  invalidRangeError: string;
  noPagesMatchedError: string;
  loadingStatus: string;
  extractingStatus: string;
  successMessage: (count: number) => string;
  extractError: string;
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
      title: "PDF分割ツール",
      description:
        "PDFから必要なページだけを抽出して新しいPDFを作成できる無料オンラインツールです。ブラウザ上で安全に処理できます。",
      aboutTitle: "PDF分割ツールとは？",
      aboutText:
        "PDF分割ツールは、PDFファイルから必要なページだけを抽出して新しいPDFを作成できる無料オンラインツールです。不要ページを除いた配布資料を作りたいとき、特定ページだけ共有したいとき、契約書や申請書の一部だけ分けたいときに便利です。処理はブラウザ上で完結するため、PDFファイルを外部サーバーにアップロードせず安全に利用できます。",
      stepsTitle: "使い方",
      steps: [
        "PDFファイルをアップロードします",
        "抽出したいページ番号や範囲を入力します",
        "「PDFを分割」ボタンを押します",
        "抽出されたPDFをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "PDFはサーバーにアップロードされますか？",
          answer:
            "いいえ。PDFはブラウザ上で処理されるため、外部サーバーには送信されません。",
        },
        {
          question: "複数ページをまとめて抽出できますか？",
          answer:
            "はい。1ページだけでなく、カンマ区切りや範囲指定で複数ページをまとめて抽出できます。",
        },
        {
          question: "どんな入力ができますか？",
          answer:
            "例えば `1`、`1,3,5`、`2-6`、`1,3-5,8` のような形式に対応しています。",
        },
        {
          question: "スマホでも使えますか？",
          answer:
            "はい。対応ブラウザであればスマホ・タブレット・PCから利用できますが、大きなPDFでは端末性能に依存します。",
        },
      ],
      relatedTools: [
        { name: "PDF結合", href: "/tools/merge-pdf" },
        { name: "PDF圧縮", href: "/tools/compress-pdf" },
        { name: "PDFをJPGに変換", href: "/tools/pdf-to-jpg" },
        { name: "画像をPDFに変換", href: "/tools/image-to-pdf" },
      ],
    },
    ui: {
      emptyTitle: "PDFをドラッグ＆ドロップ、または選択",
      emptyDescription:
        "必要なページだけを抽出して新しいPDFを作成できます。",
      selectButtonLabel: "PDFを選択",
      dropHereLabel: "ここにPDFをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      selectedFileTitle: "選択中のPDF",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      totalPagesLabel: "総ページ数",
      pageRangeLabel: "抽出ページ",
      pageRangePlaceholder: "例: 1,3-5,8",
      pageRangeHint:
        "入力例: 1 / 1,3,5 / 2-6 / 1,3-5,8",
      extractButton: "PDFを分割",
      extractingButton: "抽出中...",
      downloadButton: "抽出PDFをダウンロード",
      resetButton: "リセット",
      unknownType: "不明",
      invalidFileError: "エラー: PDFファイルを選択してください。",
      invalidRangeError:
        "エラー: ページ指定が不正です。例: 1,3-5,8 の形式で入力してください。",
      noPagesMatchedError:
        "エラー: 有効なページが見つかりませんでした。",
      loadingStatus: "PDFを読み込み中です...",
      extractingStatus: "PDFを抽出中です...",
      successMessage: (count: number) =>
        `完了: ${count}ページを抽出しました。`,
      extractError: "エラー: PDFの分割に失敗しました。",
    },
  },
  en: {
    page: {
      title: "Split PDF Tool",
      description:
        "Extract selected pages from a PDF and create a new PDF online for free. Everything runs directly in your browser.",
      aboutTitle: "What is Split PDF Tool?",
      aboutText:
        "This free PDF splitter lets you extract selected pages from a PDF and create a new PDF directly in your browser. It is useful for removing unnecessary pages, sharing only part of a document, and separating specific sections from contracts, reports, or handouts. Since everything is processed locally, your PDF files are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a PDF file",
        "Enter the pages or page ranges you want to extract",
        "Click Split PDF",
        "Download the extracted PDF",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my PDF files uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Can I extract multiple pages at once?",
          answer:
            "Yes. You can extract one page, multiple pages, or page ranges in a single operation.",
        },
        {
          question: "What input formats are supported?",
          answer:
            "You can use formats like `1`, `1,3,5`, `2-6`, or `1,3-5,8`.",
        },
        {
          question: "Does it work on mobile devices?",
          answer:
            "Yes. It works on phones, tablets, and desktop browsers that support modern web features, though large files depend on device performance.",
        },
      ],
      relatedTools: [
        { name: "Merge PDF", href: "/en/tools/merge-pdf" },
        { name: "Compress PDF", href: "/en/tools/compress-pdf" },
        { name: "PDF to JPG", href: "/en/tools/pdf-to-jpg" },
        { name: "Image to PDF", href: "/en/tools/image-to-pdf" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a PDF here, or select a file",
      emptyDescription:
        "Extract selected pages and create a new PDF.",
      selectButtonLabel: "Choose PDF",
      dropHereLabel: "Drop PDF here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      selectedFileTitle: "Selected PDF",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      totalPagesLabel: "Total Pages",
      pageRangeLabel: "Pages to Extract",
      pageRangePlaceholder: "Example: 1,3-5,8",
      pageRangeHint:
        "Examples: 1 / 1,3,5 / 2-6 / 1,3-5,8",
      extractButton: "Split PDF",
      extractingButton: "Extracting...",
      downloadButton: "Download Extracted PDF",
      resetButton: "Reset",
      unknownType: "Unknown",
      invalidFileError: "Error: Please select a PDF file.",
      invalidRangeError:
        "Error: Invalid page input. Use a format like 1,3-5,8.",
      noPagesMatchedError:
        "Error: No valid pages were found.",
      loadingStatus: "Loading PDF...",
      extractingStatus: "Extracting pages...",
      successMessage: (count: number) =>
        `Done: Extracted ${count} page(s).`,
      extractError: "Error: Failed to split the PDF.",
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

export default function SplitPdfTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageRange, setPageRange] = useState("");
  const [splitBlob, setSplitBlob] = useState<Blob | null>(null);
  const [downloadFileName, setDownloadFileName] = useState("split.pdf");

  const fileInfo = useMemo(() => {
    if (!file) return null;
    return {
      name: file.name,
      type: file.type || ui.unknownType,
      size: formatFileSize(file.size),
    };
  }, [file, ui.unknownType]);

  const handleFileSelect = async (nextFile: File | null) => {
    setMessage("");
    setSplitBlob(null);
    setTotalPages(0);
    setPageRange("");

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
        nextFile.name.replace(/\.pdf$/i, "") + "-split.pdf"
      );
      setMessage("");
    } catch (error) {
      console.error(error);
      setFile(null);
      setMessage(ui.extractError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    void handleFileSelect(nextFile);
    event.target.value = "";
  };

  const handleSplit = async () => {
    if (!file || !totalPages) return;

    const selectedPages = parsePageRanges(pageRange, totalPages);

    if (!selectedPages) {
      setMessage(ui.invalidRangeError);
      return;
    }

    if (selectedPages.length === 0) {
      setMessage(ui.noPagesMatchedError);
      return;
    }

    try {
      setIsProcessing(true);
      setMessage(ui.extractingStatus);

      const bytes = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(bytes);
      const outputPdf = await PDFDocument.create();

      const copiedPages = await outputPdf.copyPages(
        sourcePdf,
        selectedPages.map((pageNumber) => pageNumber - 1)
      );

      copiedPages.forEach((pageItem) => {
        outputPdf.addPage(pageItem);
      });

      const resultBytes = await outputPdf.save();
      const blob = new Blob([resultBytes], { type: "application/pdf" });

      setSplitBlob(blob);
      setMessage(ui.successMessage(selectedPages.length));
    } catch (error) {
      console.error(error);
      setMessage(ui.extractError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!splitBlob) return;

    const url = URL.createObjectURL(splitBlob);
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
    setPageRange("");
    setSplitBlob(null);
    setDownloadFileName("split.pdf");
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
                htmlFor="page-range"
                className="text-sm font-medium text-gray-800"
              >
                {ui.pageRangeLabel}
              </label>
              <input
                id="page-range"
                type="text"
                value={pageRange}
                onChange={(e) => setPageRange(e.target.value)}
                placeholder={ui.pageRangePlaceholder}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
              />
              <p className="text-sm text-gray-600">{ui.pageRangeHint}</p>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            onClick={handleSplit}
            disabled={!file || isProcessing || !pageRange.trim()}
          >
            {isProcessing ? ui.extractingButton : ui.extractButton}
          </PrimaryButton>

          {splitBlob ? (
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


