"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { PDFDocument, degrees } from "pdf-lib";
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

type RotationValue = "right-90" | "left-90" | "180";

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
  targetPagesLabel: string;
  targetPagesPlaceholder: string;
  targetPagesHint: string;
  rotationLabel: string;
  rotateRight90Label: string;
  rotateLeft90Label: string;
  rotate180Label: string;
  affectedPagesLabel: string;
  rotateButton: string;
  rotatingButton: string;
  downloadButton: string;
  resetButton: string;
  unknownType: string;
  invalidFileError: string;
  invalidRangeError: string;
  noPagesMatchedError: string;
  loadingStatus: string;
  rotatingStatus: string;
  successMessage: (count: number) => string;
  rotateError: string;
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
      title: "PDF回転ツール",
      description:
        "PDFの指定ページを回転して新しいPDFを作成できる無料オンラインツールです。ブラウザ上で安全に処理できます。",
      aboutTitle: "PDF回転ツールとは？",
      aboutText:
        "PDF回転ツールは、PDFの指定ページを回転して新しいPDFを作成できる無料オンラインツールです。スキャンが横向きになっているページを正しい向きに直したいとき、資料の一部ページだけ回転したいとき、閲覧しやすい向きに整えたいときに便利です。処理はブラウザ上で完結するため、PDFファイルを外部サーバーにアップロードせず安全に利用できます。",
      stepsTitle: "使い方",
      steps: [
        "PDFファイルをアップロードします",
        "回転したいページ番号や範囲を入力します",
        "回転方向を選びます",
        "「PDFを回転」ボタンを押します",
        "回転後のPDFをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "PDFはサーバーにアップロードされますか？",
          answer:
            "いいえ。PDFはブラウザ上で処理されるため、外部サーバーには送信されません。",
        },
        {
          question: "一部のページだけ回転できますか？",
          answer:
            "はい。特定のページだけ、または範囲指定で複数ページを回転できます。",
        },
        {
          question: "どんなページ指定ができますか？",
          answer:
            "例えば `all`、`1`、`1,3,5`、`2-6`、`1,3-5,8` のような形式に対応しています。",
        },
        {
          question: "90度以外の回転にも対応していますか？",
          answer:
            "はい。右90度、左90度、180度回転に対応しています。",
        },
      ],
      relatedTools: [
        { name: "PDFページ削除", href: "/tools/pdf-remove-pages" },
        { name: "PDF分割", href: "/tools/split-pdf" },
        { name: "PDF結合", href: "/tools/merge-pdf" },
        { name: "PDFをJPGに変換", href: "/tools/pdf-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "PDFをドラッグ＆ドロップ、または選択",
      emptyDescription:
        "指定したページだけを回転して新しいPDFを作成できます。",
      selectButtonLabel: "PDFを選択",
      dropHereLabel: "ここにPDFをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      selectedFileTitle: "選択中のPDF",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      totalPagesLabel: "総ページ数",
      targetPagesLabel: "回転ページ",
      targetPagesPlaceholder: "例: all / 1 / 1,3-5,8",
      targetPagesHint:
        "入力例: all / 1 / 1,3,5 / 2-6 / 1,3-5,8",
      rotationLabel: "回転方向",
      rotateRight90Label: "右 90°",
      rotateLeft90Label: "左 90°",
      rotate180Label: "180°",
      affectedPagesLabel: "回転対象ページ数",
      rotateButton: "PDFを回転",
      rotatingButton: "回転中...",
      downloadButton: "回転後PDFをダウンロード",
      resetButton: "リセット",
      unknownType: "不明",
      invalidFileError: "エラー: PDFファイルを選択してください。",
      invalidRangeError:
        "エラー: ページ指定が不正です。例: all / 1,3-5,8 の形式で入力してください。",
      noPagesMatchedError:
        "エラー: 有効な回転対象ページが見つかりませんでした。",
      loadingStatus: "PDFを読み込み中です...",
      rotatingStatus: "PDFを回転中です...",
      successMessage: (count: number) =>
        `完了: ${count}ページを回転しました。`,
      rotateError: "エラー: PDFの回転に失敗しました。",
    },
  },
  en: {
    page: {
      title: "Rotate PDF Tool",
      description:
        "Rotate selected PDF pages and create a new PDF online for free. Everything runs directly in your browser.",
      aboutTitle: "What is Rotate PDF Tool?",
      aboutText:
        "This free PDF rotator lets you rotate selected PDF pages and create a new PDF directly in your browser. It is useful for fixing sideways scanned pages, rotating only part of a document, and making PDFs easier to read before sharing or printing. Since everything is processed locally, your PDF files are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a PDF file",
        "Enter the pages or page ranges you want to rotate",
        "Choose the rotation direction",
        "Click Rotate PDF",
        "Download the rotated PDF",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my PDF files uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Can I rotate only some pages?",
          answer:
            "Yes. You can rotate specific pages or multiple pages using ranges.",
        },
        {
          question: "What page input formats are supported?",
          answer:
            "You can use formats like `all`, `1`, `1,3,5`, `2-6`, or `1,3-5,8`.",
        },
        {
          question: "Do you support more than 90-degree rotation?",
          answer:
            "Yes. You can rotate right 90°, left 90°, or 180°.",
        },
      ],
      relatedTools: [
        { name: "PDF Remove Pages", href: "/en/tools/pdf-remove-pages" },
        { name: "Split PDF", href: "/en/tools/split-pdf" },
        { name: "Merge PDF", href: "/en/tools/merge-pdf" },
        { name: "PDF to JPG", href: "/en/tools/pdf-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a PDF here, or select a file",
      emptyDescription:
        "Rotate selected pages and create a new PDF.",
      selectButtonLabel: "Choose PDF",
      dropHereLabel: "Drop PDF here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      selectedFileTitle: "Selected PDF",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      totalPagesLabel: "Total Pages",
      targetPagesLabel: "Pages to Rotate",
      targetPagesPlaceholder: "Example: all / 1 / 1,3-5,8",
      targetPagesHint:
        "Examples: all / 1 / 1,3,5 / 2-6 / 1,3-5,8",
      rotationLabel: "Rotation",
      rotateRight90Label: "Right 90°",
      rotateLeft90Label: "Left 90°",
      rotate180Label: "180°",
      affectedPagesLabel: "Pages to rotate",
      rotateButton: "Rotate PDF",
      rotatingButton: "Rotating...",
      downloadButton: "Download Rotated PDF",
      resetButton: "Reset",
      unknownType: "Unknown",
      invalidFileError: "Error: Please select a PDF file.",
      invalidRangeError:
        "Error: Invalid page input. Use a format like all or 1,3-5,8.",
      noPagesMatchedError:
        "Error: No valid pages to rotate were found.",
      loadingStatus: "Loading PDF...",
      rotatingStatus: "Rotating PDF...",
      successMessage: (count: number) =>
        `Done: Rotated ${count} page(s).`,
      rotateError: "Error: Failed to rotate the PDF.",
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
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return null;

  if (trimmed === "all") {
    return Array.from({ length: maxPages }, (_, index) => index + 1);
  }

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

function getRotationDegrees(value: RotationValue) {
  switch (value) {
    case "left-90":
      return -90;
    case "180":
      return 180;
    case "right-90":
    default:
      return 90;
  }
}

export default function RotatePdfTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [targetPagesInput, setTargetPagesInput] = useState("all");
  const [rotation, setRotation] = useState<RotationValue>("right-90");
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [downloadFileName, setDownloadFileName] = useState("rotated.pdf");

  const fileInfo = useMemo(() => {
    if (!file) return null;
    return {
      name: file.name,
      type: file.type || ui.unknownType,
      size: formatFileSize(file.size),
    };
  }, [file, ui.unknownType]);

  const targetPages = useMemo(() => {
    if (!totalPages) return [];
    return parsePageRanges(targetPagesInput, totalPages) ?? [];
  }, [targetPagesInput, totalPages]);

  const handleFileSelect = async (nextFile: File | null) => {
    setMessage("");
    setResultBlob(null);
    setTotalPages(0);
    setTargetPagesInput("all");

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
        nextFile.name.replace(/\.pdf$/i, "") + "-rotated.pdf"
      );
      setMessage("");
    } catch (error) {
      console.error(error);
      setFile(null);
      setMessage(ui.rotateError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    void handleFileSelect(nextFile);
    event.target.value = "";
  };

  const handleRotate = async () => {
    if (!file || !totalPages) return;

    const pages = parsePageRanges(targetPagesInput, totalPages);

    if (!pages) {
      setMessage(ui.invalidRangeError);
      return;
    }

    if (pages.length === 0) {
      setMessage(ui.noPagesMatchedError);
      return;
    }

    try {
      setIsProcessing(true);
      setMessage(ui.rotatingStatus);

      const bytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(bytes);
      const delta = getRotationDegrees(rotation);

      pages.forEach((pageNumber) => {
        const pdfPage = pdfDoc.getPage(pageNumber - 1);
        const currentAngle = pdfPage.getRotation().angle;
        pdfPage.setRotation(degrees(currentAngle + delta));
      });

      const resultBytes = await pdfDoc.save();
      const pdfBytes = new Uint8Array(resultBytes);
      const blob = new Blob([pdfBytes.buffer], { type: "application/pdf" });

      setResultBlob(blob);
      setMessage(ui.successMessage(pages.length));
    } catch (error) {
      console.error(error);
      setMessage(ui.rotateError);
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
    setTargetPagesInput("all");
    setRotation("right-90");
    setResultBlob(null);
    setDownloadFileName("rotated.pdf");
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

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="rotate-pdf-pages"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.targetPagesLabel}
                </label>
                <input
                  id="rotate-pdf-pages"
                  type="text"
                  value={targetPagesInput}
                  onChange={(e) => setTargetPagesInput(e.target.value)}
                  placeholder={ui.targetPagesPlaceholder}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                />
                <p className="text-sm text-gray-600">{ui.targetPagesHint}</p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="rotate-pdf-direction"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.rotationLabel}
                </label>
                <select
                  id="rotate-pdf-direction"
                  value={rotation}
                  onChange={(e) => setRotation(e.target.value as RotationValue)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                >
                  <option value="right-90">{ui.rotateRight90Label}</option>
                  <option value="left-90">{ui.rotateLeft90Label}</option>
                  <option value="180">{ui.rotate180Label}</option>
                </select>
                <p className="text-sm text-gray-600">
                  {ui.affectedPagesLabel}: {targetPages.length}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            onClick={handleRotate}
            disabled={!file || isProcessing || !targetPagesInput.trim()}
          >
            {isProcessing ? ui.rotatingButton : ui.rotateButton}
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


