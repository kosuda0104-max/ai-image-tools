"use client";

import { ChangeEvent, DragEvent, useMemo, useState } from "react";
import { PDFDocument } from "pdf-lib";
import ToolPageLayout from "@/components/ToolPageLayout";
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
  dropTitle: string;
  dropDescription: string;
  selectButtonLabel: string;
  selectedFilesTitle: string;
  fileNameLabel: string;
  fileSizeLabel: string;
  totalPagesLabel: string;
  unknownPagesLabel: string;
  moveUpLabel: string;
  moveDownLabel: string;
  removeLabel: string;
  addMoreLabel: string;
  mergeButton: string;
  mergingButton: string;
  downloadButton: string;
  resetButton: string;
  noFilesError: string;
  invalidFileError: string;
  loadingStatus: string;
  mergingStatus: string;
  successMessage: string;
  mergeError: string;
  emptyListText: string;
};

type ToolContent = {
  page: PageContent;
  ui: UIContent;
};

type Props = {
  locale: Locale;
};

type PdfItem = {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number | null;
};

const content: Record<Locale, ToolContent> = {
  ja: {
    page: {
      title: "PDF結合ツール",
      description:
        "複数のPDFファイルを1つに結合できる無料オンラインツールです。ブラウザ上で安全に処理できます。",
      aboutTitle: "PDF結合ツールとは？",
      aboutText:
        "PDF結合ツールは、複数のPDFファイルを1つのPDFへまとめられる無料オンラインツールです。請求書や契約書を1つにまとめたいとき、複数の配布資料を1つのPDFで共有したいとき、応募書類や報告資料を統合したいときに便利です。ファイルの順番を並び替えてから結合でき、処理はブラウザ上で完結するため、PDFファイルを外部サーバーにアップロードせず安全に利用できます。",
      stepsTitle: "使い方",
      steps: [
        "結合したいPDFファイルを追加します",
        "必要に応じて順番を並び替えます",
        "不要なファイルがあれば削除します",
        "「PDFを結合」ボタンを押します",
        "結合後のPDFをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "PDFはサーバーにアップロードされますか？",
          answer:
            "いいえ。PDFはブラウザ上で処理されるため、外部サーバーには送信されません。",
        },
        {
          question: "ファイルの順番は変更できますか？",
          answer:
            "はい。各PDFの上へ・下へボタンで結合順を変更できます。",
        },
        {
          question: "何個まで結合できますか？",
          answer:
            "ブラウザのメモリが許す範囲で複数ファイルを結合できます。ただし大きなPDFや大量のPDFでは処理に時間がかかることがあります。",
        },
        {
          question: "スマホでも使えますか？",
          answer:
            "はい。対応ブラウザであればスマホ・タブレット・PCから利用できますが、大容量PDFでは端末性能に依存します。",
        },
      ],
      relatedTools: [
        { name: "PDF分割", href: "/tools/split-pdf" },
        { name: "PDF圧縮", href: "/tools/compress-pdf" },
        { name: "画像をPDFに変換", href: "/tools/image-to-pdf" },
        { name: "PDFをJPGに変換", href: "/tools/pdf-to-jpg" },
      ],
    },
    ui: {
      dropTitle: "PDFをドラッグ＆ドロップ、または選択",
      dropDescription:
        "複数のPDFを追加して、順番を調整してから1つに結合できます。",
      selectButtonLabel: "PDFを追加",
      selectedFilesTitle: "結合するPDF一覧",
      fileNameLabel: "ファイル名",
      fileSizeLabel: "サイズ",
      totalPagesLabel: "ページ数",
      unknownPagesLabel: "取得中",
      moveUpLabel: "上へ",
      moveDownLabel: "下へ",
      removeLabel: "削除",
      addMoreLabel: "さらにPDFを追加",
      mergeButton: "PDFを結合",
      mergingButton: "結合中...",
      downloadButton: "結合PDFをダウンロード",
      resetButton: "リセット",
      noFilesError: "エラー: 結合するPDFを2つ以上追加してください。",
      invalidFileError: "エラー: PDFファイルを選択してください。",
      loadingStatus: "PDFを読み込み中です...",
      mergingStatus: "PDFを結合中です...",
      successMessage: "完了: PDFの結合が完了しました。",
      mergeError: "エラー: PDFの結合に失敗しました。",
      emptyListText: "追加したPDFはここに表示されます。",
    },
  },
  en: {
    page: {
      title: "Merge PDF Tool",
      description:
        "Merge multiple PDF files into one PDF online for free. Everything runs directly in your browser.",
      aboutTitle: "What is Merge PDF Tool?",
      aboutText:
        "This free PDF merger lets you combine multiple PDF files into a single PDF directly in your browser. It is useful for merging invoices, reports, application documents, handouts, and presentation files into one shareable document. You can reorder files before merging, and since everything is processed locally, your PDF files are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Add the PDF files you want to merge",
        "Reorder them if needed",
        "Remove any file you do not want",
        "Click Merge PDF",
        "Download the merged PDF",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my PDF files uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Can I change the file order?",
          answer:
            "Yes. You can use the move up and move down buttons to change the merge order.",
        },
        {
          question: "How many PDFs can I merge?",
          answer:
            "You can merge multiple files as long as your browser and device memory can handle them. Very large PDFs may take longer.",
        },
        {
          question: "Does it work on mobile devices?",
          answer:
            "Yes. It works on phones, tablets, and desktop browsers that support modern web features, though large files depend on device performance.",
        },
      ],
      relatedTools: [
        { name: "Split PDF", href: "/en/tools/split-pdf" },
        { name: "Compress PDF", href: "/en/tools/compress-pdf" },
        { name: "Image to PDF", href: "/en/tools/image-to-pdf" },
        { name: "PDF to JPG", href: "/en/tools/pdf-to-jpg" },
      ],
    },
    ui: {
      dropTitle: "Drag and drop PDFs here, or select files",
      dropDescription:
        "Add multiple PDFs, reorder them, and merge them into one file.",
      selectButtonLabel: "Add PDFs",
      selectedFilesTitle: "PDFs to Merge",
      fileNameLabel: "File Name",
      fileSizeLabel: "Size",
      totalPagesLabel: "Pages",
      unknownPagesLabel: "Loading",
      moveUpLabel: "Up",
      moveDownLabel: "Down",
      removeLabel: "Remove",
      addMoreLabel: "Add More PDFs",
      mergeButton: "Merge PDF",
      mergingButton: "Merging...",
      downloadButton: "Download Merged PDF",
      resetButton: "Reset",
      noFilesError: "Error: Please add at least 2 PDF files to merge.",
      invalidFileError: "Error: Please select PDF files.",
      loadingStatus: "Loading PDF files...",
      mergingStatus: "Merging PDF files...",
      successMessage: "Done: PDF merge completed successfully.",
      mergeError: "Error: Failed to merge the PDFs.",
      emptyListText: "Added PDFs will appear here.",
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

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export default function MergePdfTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [items, setItems] = useState<PdfItem[]>([]);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [mergedBlob, setMergedBlob] = useState<Blob | null>(null);
  const [mergedFileName, setMergedFileName] = useState("merged.pdf");

  const handleFiles = async (files: FileList | File[] | null) => {
    setMessage("");
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const invalidExists = fileArray.some(
      (file) =>
        file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)
    );

    if (invalidExists) {
      setMessage(ui.invalidFileError);
      return;
    }

    try {
      setIsProcessing(true);
      setMessage(ui.loadingStatus);

      const nextItems = await Promise.all(
        fileArray.map(async (file) => {
          const pageCount = await getPdfPageCount(file);
          return {
            id: createId(),
            file,
            name: file.name,
            size: file.size,
            pageCount,
          } as PdfItem;
        })
      );

      setItems((prev) => [...prev, ...nextItems]);

      if (!mergedBlob) {
        const baseName =
          nextItems.length > 0
            ? nextItems[0].name.replace(/\.pdf$/i, "")
            : "merged";
        setMergedFileName(`${baseName}-merged.pdf`);
      }

      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage(ui.mergeError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    void handleFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    void handleFiles(event.dataTransfer.files);
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    setItems((prev) => {
      const next = [...prev];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMerge = async () => {
    if (items.length < 2) {
      setMessage(ui.noFilesError);
      return;
    }

    try {
      setIsProcessing(true);
      setMessage(ui.mergingStatus);

      const mergedPdf = await PDFDocument.create();

      for (const item of items) {
        const bytes = await item.file.arrayBuffer();
        const sourcePdf = await PDFDocument.load(bytes);
        const pageIndices = sourcePdf.getPageIndices();
        const copiedPages = await mergedPdf.copyPages(sourcePdf, pageIndices);

        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: "application/pdf" });

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
    link.download = mergedFileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setItems([]);
    setMessage("");
    setIsProcessing(false);
    setMergedBlob(null);
    setMergedFileName("merged.pdf");
  };

  const totalPages = useMemo(
    () => items.reduce((sum, item) => sum + (item.pageCount ?? 0), 0),
    [items]
  );

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
        <label
          htmlFor="merge-pdf-input"
          className="block cursor-pointer rounded-xl border-2 border-dashed p-8 text-center hover:bg-gray-50"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            id="merge-pdf-input"
            type="file"
            accept="application/pdf,.pdf"
            multiple
            className="hidden"
            onChange={handleInputChange}
          />

          <div className="space-y-2">
            <div className="text-sm text-gray-600">{ui.dropTitle}</div>
            <div className="text-lg font-semibold">{ui.dropDescription}</div>
            <div className="text-sm text-gray-500">{ui.clickToSelectLabel}</div>
            <div className="inline-flex rounded-lg bg-black px-4 py-2 text-white">
              {ui.selectButtonLabel}
            </div>
          </div>
        </label>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-800">
            {ui.addMoreLabel}
          </label>
          <input
            type="file"
            accept="application/pdf,.pdf"
            multiple
            onChange={handleInputChange}
            className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700"
          />
        </div>

        <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-gray-900">
              {ui.selectedFilesTitle}
            </h3>
            {items.length > 0 ? (
              <div className="text-sm text-gray-600">
                {ui.totalPagesLabel}: {totalPages}
              </div>
            ) : null}
          </div>

          {items.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white px-4 py-8 text-center text-sm text-gray-500">
              {ui.emptyListText}
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-gray-200 bg-white p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>
                        <span className="font-medium text-gray-800">
                          {index + 1}. {ui.fileNameLabel}:
                        </span>{" "}
                        {item.name}
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          {ui.fileSizeLabel}:
                        </span>{" "}
                        {formatFileSize(item.size)}
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          {ui.totalPagesLabel}:
                        </span>{" "}
                        {item.pageCount ?? ui.unknownPagesLabel}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => moveItem(index, -1)}
                        disabled={index === 0}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {ui.moveUpLabel}
                      </button>

                      <button
                        type="button"
                        onClick={() => moveItem(index, 1)}
                        disabled={index === items.length - 1}
                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {ui.moveDownLabel}
                      </button>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="rounded-lg border border-red-300 px-3 py-2 text-sm text-red-700"
                      >
                        {ui.removeLabel}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            onClick={handleMerge}
            disabled={isProcessing || items.length < 2}
          >
            {isProcessing ? ui.mergingButton : ui.mergeButton}
          </PrimaryButton>

          {mergedBlob ? (
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


