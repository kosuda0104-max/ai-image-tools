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
  qualityLabel: string;
  scaleLabel: string;
  originalSizeLabel: string;
  compressedSizeLabel: string;
  reductionLabel: string;
  compressButton: string;
  compressingButton: string;
  downloadButton: string;
  resetButton: string;
  noteText: string;
  unknownType: string;
  invalidFileError: string;
  loadingStatus: string;
  compressingStatus: string;
  successMessage: string;
  loadError: string;
  compressError: string;
};

type ToolContent = {
  page: PageContent;
  ui: UIContent;
};

type Props = {
  locale: Locale;
};

type PdfJsModule = {
  GlobalWorkerOptions: {
    workerSrc: string;
  };
  getDocument: (src: { data: Uint8Array }) => {
    promise: Promise<{
      numPages: number;
      getPage: (pageNumber: number) => Promise<{
        getViewport: (params: { scale: number }) => { width: number; height: number };
        render: (params: {
          canvasContext: CanvasRenderingContext2D;
          viewport: { width: number; height: number };
        }) => { promise: Promise<void> };
      }>;
    }>;
  };
};

const content: Record<Locale, ToolContent> = {
  ja: {
    page: {
      title: "PDF圧縮ツール",
      description:
        "PDFを軽量化して新しいPDFとして保存できる無料オンラインツールです。ブラウザ上で安全に処理できます。",
      aboutTitle: "PDF圧縮ツールとは？",
      aboutText:
        "PDF圧縮ツールは、PDFを軽量化して新しいPDFとして保存できる無料オンラインツールです。メール添付しやすくしたいとき、アップロード制限に収めたいとき、共有用に容量を小さくしたいときに便利です。この版ではPDFページを再描画して再生成することで軽量化します。特に画像中心のPDFやスキャンPDFで効果が出やすいです。処理はブラウザ上で完結するため、PDFファイルを外部サーバーにアップロードせず安全に利用できます。",
      stepsTitle: "使い方",
      steps: [
        "PDFファイルをアップロードします",
        "画質とレンダー倍率を調整します",
        "「PDFを圧縮」ボタンを押します",
        "軽量化後のPDFサイズを確認します",
        "圧縮PDFをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "PDFはサーバーにアップロードされますか？",
          answer:
            "いいえ。PDFはブラウザ上で処理されるため、外部サーバーには送信されません。",
        },
        {
          question: "必ずファイルサイズは小さくなりますか？",
          answer:
            "多くのPDFで軽量化が期待できますが、元のPDFの構造によってはあまり変わらない場合もあります。画像中心のPDFでは効果が出やすいです。",
        },
        {
          question: "文字情報は保持されますか？",
          answer:
            "この版ではページを再描画して新しいPDFを作る方式のため、元のPDF内部構造は保持されません。見た目を優先して軽量化する方式です。",
        },
        {
          question: "スマホでも使えますか？",
          answer:
            "はい。対応ブラウザであれば利用できますが、大きなPDFやページ数の多いPDFでは端末性能によって時間がかかることがあります。",
        },
      ],
      relatedTools: [
        { name: "PDF結合", href: "/tools/merge-pdf" },
        { name: "PDF分割", href: "/tools/split-pdf" },
        { name: "PDFをJPGに変換", href: "/tools/pdf-to-jpg" },
        { name: "画像をPDFに変換", href: "/tools/image-to-pdf" },
      ],
    },
    ui: {
      emptyTitle: "PDFをドラッグ＆ドロップ、または選択",
      emptyDescription:
        "画質と倍率を調整してPDFを軽量化できます。",
      selectButtonLabel: "PDFを選択",
      dropHereLabel: "ここにPDFをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      selectedFileTitle: "選択中のPDF",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      totalPagesLabel: "総ページ数",
      qualityLabel: "画質",
      scaleLabel: "レンダー倍率",
      originalSizeLabel: "元のサイズ",
      compressedSizeLabel: "圧縮後サイズ",
      reductionLabel: "削減率",
      compressButton: "PDFを圧縮",
      compressingButton: "圧縮中...",
      downloadButton: "圧縮PDFをダウンロード",
      resetButton: "リセット",
      noteText:
        "この版はページを再描画して軽量化PDFを作成します。画像中心のPDFで特に効果が出やすいです。",
      unknownType: "不明",
      invalidFileError: "エラー: PDFファイルを選択してください。",
      loadingStatus: "PDFを読み込み中です...",
      compressingStatus: "PDFを圧縮中です...",
      successMessage: "完了: PDFの圧縮が完了しました。",
      loadError: "エラー: PDFの読み込みに失敗しました。",
      compressError: "エラー: PDFの圧縮に失敗しました。",
    },
  },
  en: {
    page: {
      title: "Compress PDF Tool",
      description:
        "Reduce PDF file size and save it as a new PDF online for free. Everything runs directly in your browser.",
      aboutTitle: "What is Compress PDF Tool?",
      aboutText:
        "This free PDF compressor reduces PDF file size and saves the result as a new PDF directly in your browser. It is useful when you need smaller files for email attachments, upload limits, or sharing. This version works by re-rendering PDF pages and rebuilding the document, which is especially effective for image-heavy PDFs and scanned documents. Since everything is processed locally, your PDF files are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a PDF file",
        "Adjust quality and render scale",
        "Click Compress PDF",
        "Check the new file size",
        "Download the compressed PDF",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my PDF files uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Will the file always become smaller?",
          answer:
            "Often yes, but not always. The result depends on the original PDF structure. Image-heavy PDFs usually benefit the most.",
        },
        {
          question: "Is the original PDF structure preserved?",
          answer:
            "No. This version rebuilds the PDF by re-rendering pages, so it prioritizes visual output rather than preserving the original internal structure.",
        },
        {
          question: "Does it work on mobile devices?",
          answer:
            "Yes. It works on modern browsers, though large or long PDFs may take more time depending on device performance.",
        },
      ],
      relatedTools: [
        { name: "Merge PDF", href: "/en/tools/merge-pdf" },
        { name: "Split PDF", href: "/en/tools/split-pdf" },
        { name: "PDF to JPG", href: "/en/tools/pdf-to-jpg" },
        { name: "Image to PDF", href: "/en/tools/image-to-pdf" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a PDF here, or select a file",
      emptyDescription:
        "Reduce PDF size by adjusting quality and render scale.",
      selectButtonLabel: "Choose PDF",
      dropHereLabel: "Drop PDF here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      selectedFileTitle: "Selected PDF",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      totalPagesLabel: "Total Pages",
      qualityLabel: "Quality",
      scaleLabel: "Render Scale",
      originalSizeLabel: "Original Size",
      compressedSizeLabel: "Compressed Size",
      reductionLabel: "Reduction",
      compressButton: "Compress PDF",
      compressingButton: "Compressing...",
      downloadButton: "Download Compressed PDF",
      resetButton: "Reset",
      noteText:
        "This version rebuilds the PDF by re-rendering pages. It works especially well for image-heavy PDFs.",
      unknownType: "Unknown",
      invalidFileError: "Error: Please select a PDF file.",
      loadingStatus: "Loading PDF...",
      compressingStatus: "Compressing PDF...",
      successMessage: "Done: PDF compression completed successfully.",
      loadError: "Error: Failed to load the PDF.",
      compressError: "Error: Failed to compress the PDF.",
    },
  },
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function loadPdfJs(): Promise<PdfJsModule> {
  const pdfjs = (await import("pdfjs-dist/legacy/build/pdf.mjs")) as unknown as PdfJsModule;
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/legacy/build/pdf.worker.mjs",
    import.meta.url
  ).toString();
  return pdfjs;
}

async function getPdfPageCount(file: File): Promise<number> {
  const bytes = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(bytes);
  return pdfDoc.getPageCount();
}

export default function CompressPdfTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [quality, setQuality] = useState(75);
  const [scale, setScale] = useState(1.2);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [downloadFileName, setDownloadFileName] = useState("compressed.pdf");

  const fileInfo = useMemo(() => {
    if (!file) return null;
    return {
      name: file.name,
      type: file.type || ui.unknownType,
      size: formatFileSize(file.size),
      rawSize: file.size,
    };
  }, [file, ui.unknownType]);

  const compressedInfo = useMemo(() => {
    if (!compressedBlob || !file) return null;

    const originalSize = file.size;
    const compressedSize = compressedBlob.size;
    const reduction =
      originalSize > 0
        ? Math.max(0, ((originalSize - compressedSize) / originalSize) * 100)
        : 0;

    return {
      size: formatFileSize(compressedSize),
      reduction: `${reduction.toFixed(1)}%`,
    };
  }, [compressedBlob, file]);

  const handleFileSelect = async (nextFile: File | null) => {
    setMessage("");
    setCompressedBlob(null);
    setTotalPages(0);

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

      const pageCount = await getPdfPageCount(nextFile);
      setFile(nextFile);
      setTotalPages(pageCount);
      setDownloadFileName(
        nextFile.name.replace(/\.pdf$/i, "") + "-compressed.pdf"
      );
      setMessage("");
    } catch (error) {
      console.error(error);
      setFile(null);
      setMessage(ui.loadError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    void handleFileSelect(nextFile);
    event.target.value = "";
  };

  const handleCompress = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      setMessage(ui.compressingStatus);

      const bytes = await file.arrayBuffer();
      const pdfjs = await loadPdfJs();
      const srcPdf = await pdfjs.getDocument({
        data: new Uint8Array(bytes),
      }).promise;

      const outPdf = await PDFDocument.create();

      for (let pageNumber = 1; pageNumber <= srcPdf.numPages; pageNumber += 1) {
        const srcPage = await srcPdf.getPage(pageNumber);
        const viewport = srcPage.getViewport({ scale });

        const canvas = document.createElement("canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);

        const context = canvas.getContext("2d");
        if (!context) {
          throw new Error("Canvas context not available");
        }

        await srcPage.render({
          canvasContext: context,
          viewport,
        }).promise;

        const jpgBlob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Failed to create JPEG blob"));
                return;
              }
              resolve(blob);
            },
            "image/jpeg",
            quality / 100
          );
        });

        const imageBytes = await jpgBlob.arrayBuffer();
        const embeddedImage = await outPdf.embedJpg(imageBytes);

        const page = outPdf.addPage([viewport.width, viewport.height]);
        page.drawImage(embeddedImage, {
          x: 0,
          y: 0,
          width: viewport.width,
          height: viewport.height,
        });
      }

      const outBytes = await outPdf.save();
      const blob = new Blob([outBytes], { type: "application/pdf" });

      setCompressedBlob(blob);
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.compressError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob) return;

    const url = URL.createObjectURL(compressedBlob);
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
    setQuality(75);
    setScale(1.2);
    setCompressedBlob(null);
    setDownloadFileName("compressed.pdf");
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
                  htmlFor="pdf-quality"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.qualityLabel}: {quality}
                </label>
                <input
                  id="pdf-quality"
                  type="range"
                  min="40"
                  max="95"
                  step="1"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="pdf-scale"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.scaleLabel}: {scale.toFixed(1)}
                </label>
                <input
                  id="pdf-scale"
                  type="range"
                  min="0.8"
                  max="2"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <p className="text-sm text-gray-600">{ui.noteText}</p>
          </div>
        )}

        {(fileInfo || compressedInfo) && (
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            {fileInfo ? (
              <p>
                <span className="font-medium text-gray-800">
                  {ui.originalSizeLabel}:
                </span>{" "}
                {fileInfo.size}
              </p>
            ) : null}

            {compressedInfo ? (
              <>
                <p>
                  <span className="font-medium text-gray-800">
                    {ui.compressedSizeLabel}:
                  </span>{" "}
                  {compressedInfo.size}
                </p>
                <p>
                  <span className="font-medium text-gray-800">
                    {ui.reductionLabel}:
                  </span>{" "}
                  {compressedInfo.reduction}
                </p>
              </>
            ) : null}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            onClick={handleCompress}
            disabled={!file || isProcessing}
          >
            {isProcessing ? ui.compressingButton : ui.compressButton}
          </PrimaryButton>

          {compressedBlob ? (
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


