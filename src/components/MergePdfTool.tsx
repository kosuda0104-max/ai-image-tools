"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolPageLayout from "@/components/ToolPageLayout";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";

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
  dropTitle: string;
  dropDescription: string;
  clickToSelectLabel: string;
  selectButtonLabel: string;
  selectedFilesTitle: string;
  fileCountLabel: string;
  mergeButton: string;
  mergingButton: string;
  downloadButton: string;
  resetButton: string;
  invalidFileError: string;
  loadingStatus: string;
  successMessage: string;
  mergeError: string;
  noFilesError: string;
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
      title: "PDF結合ツール",
      description:
        "複数のPDFファイルを1つに結合できる無料オンラインツールです。ブラウザ上で安全に処理できます。",
      aboutTitle: "PDF結合ツールとは？",
      aboutText:
        "PDF結合ツールは、複数のPDFファイルを1つのPDFにまとめられる無料オンラインツールです。請求書や資料を1つにまとめたいとき、複数ページの文書を共有しやすくしたいときに便利です。ファイルはブラウザ上で処理されるため、PDFを外部サーバーにアップロードせず安全に利用できます。",
      stepsTitle: "使い方",
      steps: [
        "結合したいPDFファイルを複数選択します",
        "ファイル一覧を確認します",
        "「PDFを結合」ボタンを押します",
        "結合後のPDFをダウンロードします"
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "PDFはサーバーにアップロードされますか？",
          answer:
            "いいえ。PDFはブラウザ上で処理されるため、外部サーバーには送信されません。"
        },
        {
          question: "複数のPDFを1つにまとめられますか？",
          answer:
            "はい。複数のPDFファイルを選択して1つのPDFに結合できます。"
        },
        {
          question: "ファイル順はどうなりますか？",
          answer:
            "選択した順番で結合されます。"
        }
      ],
      relatedTools: [
        { name: "PDF分割", href: "/tools/split-pdf" },
        { name: "PDF圧縮", href: "/tools/compress-pdf" },
        { name: "PDF回転", href: "/tools/rotate-pdf" },
        { name: "PDFページ削除", href: "/tools/pdf-remove-pages" }
      ]
    },
    ui: {
      dropTitle: "PDFを選択",
      dropDescription: "結合したいPDFファイルを複数選択してください",
      clickToSelectLabel: "複数選択に対応しています",
      selectButtonLabel: "PDFを選択",
      selectedFilesTitle: "選択中のPDF",
      fileCountLabel: "ファイル数",
      mergeButton: "PDFを結合",
      mergingButton: "結合中...",
      downloadButton: "結合後PDFをダウンロード",
      resetButton: "リセット",
      invalidFileError: "エラー: PDFファイルを選択してください。",
      loadingStatus: "PDFを読み込み中です...",
      successMessage: "完了: PDFを結合しました。",
      mergeError: "エラー: PDFの結合に失敗しました。",
      noFilesError: "エラー: 2つ以上のPDFファイルを選択してください。"
    }
  },
  en: {
    page: {
      title: "Merge PDF Tool",
      description:
        "Merge multiple PDF files into one PDF online for free. Everything runs directly in your browser.",
      aboutTitle: "What is Merge PDF Tool?",
      aboutText:
        "This free online PDF merger lets you combine multiple PDF files into one document directly in your browser. It is useful when you want to merge invoices, reports, or multi-part documents into a single file. Since everything is processed locally, your PDF files are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Select multiple PDF files",
        "Check the file list",
        "Click Merge PDF",
        "Download the merged PDF"
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my PDF files uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server."
        },
        {
          question: "Can I merge multiple PDFs into one?",
          answer:
            "Yes. You can select multiple PDF files and combine them into a single PDF."
        },
        {
          question: "What order are the files merged in?",
          answer:
            "They are merged in the order you selected them."
        }
      ],
      relatedTools: [
        { name: "Split PDF", href: "/en/tools/split-pdf" },
        { name: "Compress PDF", href: "/en/tools/compress-pdf" },
        { name: "Rotate PDF", href: "/en/tools/rotate-pdf" },
        { name: "PDF Remove Pages", href: "/en/tools/pdf-remove-pages" }
      ]
    },
    ui: {
      dropTitle: "Select PDF files",
      dropDescription: "Choose multiple PDF files to merge",
      clickToSelectLabel: "Multiple selection is supported",
      selectButtonLabel: "Choose PDFs",
      selectedFilesTitle: "Selected PDFs",
      fileCountLabel: "Files",
      mergeButton: "Merge PDF",
      mergingButton: "Merging...",
      downloadButton: "Download Merged PDF",
      resetButton: "Reset",
      invalidFileError: "Error: Please select PDF files.",
      loadingStatus: "Loading PDFs...",
      successMessage: "Done: PDFs were merged successfully.",
      mergeError: "Error: Failed to merge PDFs.",
      noFilesError: "Error: Please select at least 2 PDF files."
    }
  }
};

export default function MergePdfTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);

  const fileNames = useMemo(() => files.map((file) => file.name), [files]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setMergedBlob(null);

    const nextFiles = Array.from(event.target.files ?? []);
    event.target.value = "";

    if (nextFiles.length === 0) {
      setFiles([]);
      return;
    }

    const pdfFiles = nextFiles.filter(
      (file) => file.type === "application/pdf" || /\.pdf$/i.test(file.name)
    );

    if (pdfFiles.length !== nextFiles.length) {
      setFiles([]);
      setMessage(ui.invalidFileError);
      return;
    }

    setFiles(pdfFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setMessage(ui.noFilesError);
      return;
    }

    try {
      setIsProcessing(true);
      setMessage(ui.loadingStatus);

      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedBytes = await mergedPdf.save();
      const normalizedMergedBytes = new Uint8Array(mergedBytes);
      const blob = new Blob([normalizedMergedBytes.buffer], { type: "application/pdf" });

      setMergedBlob(blob);
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.mergeError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!mergedBlob) return;

    const url = URL.createObjectURL(mergedBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "merged.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFiles([]);
    setMessage("");
    setIsProcessing(false);
    setMergedBlob(null);
  };

  return (
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
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
          <div className="space-y-2">
            <div className="text-sm text-gray-600">{ui.dropTitle}</div>
            <div className="text-lg font-semibold text-gray-900">{ui.dropDescription}</div>
            <div className="text-sm text-gray-500">{ui.clickToSelectLabel}</div>
          </div>

          <div className="mt-4">
            <label className="inline-flex cursor-pointer rounded-lg bg-black px-4 py-2 text-white">
              {ui.selectButtonLabel}
              <input
                type="file"
                accept="application/pdf,.pdf"
                multiple
                onChange={handleInputChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {files.length > 0 && (
          <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <h3 className="text-sm font-semibold text-gray-900">
              {ui.selectedFilesTitle}
            </h3>
            <p className="text-sm text-gray-600">
              {ui.fileCountLabel}: {files.length}
            </p>
            <ul className="space-y-1 text-sm text-gray-700">
              {fileNames.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton onClick={handleMerge} disabled={isProcessing || files.length < 2}>
            {isProcessing ? ui.mergingButton : ui.mergeButton}
          </PrimaryButton>

          {mergedBlob && (
            <PrimaryButton onClick={handleDownload}>
              {ui.downloadButton}
            </PrimaryButton>
          )}

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
  );
}