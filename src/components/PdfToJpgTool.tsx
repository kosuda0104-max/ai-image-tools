"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
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
  selectedPageLabel: string;
  qualityLabel: string;
  scaleLabel: string;
  previewLabel: string;
  previewPlaceholder: string;
  convertButton: string;
  convertingButton: string;
  downloadButton: string;
  resetButton: string;
  unknownType: string;
  invalidFileError: string;
  loadingPdfStatus: string;
  convertingStatus: string;
  successMessage: string;
  loadError: string;
  convertError: string;
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
      title: "PDFをJPGに変換",
      description:
        "PDFの各ページをブラウザ上でJPG画像に変換できる無料オンラインツールです。アップロード不要で安全に処理できます。",
      aboutTitle: "PDFをJPGに変換とは？",
      aboutText:
        "PDFをJPGに変換ツールは、PDFファイルのページをJPG画像として書き出せる無料オンラインツールです。資料の一部を画像で共有したいとき、サムネイル画像を作りたいとき、プレゼン資料や配布資料のページを画像化したいときに便利です。処理はブラウザ上で完結するため、PDFファイルを外部サーバーにアップロードせず安全に利用できます。",
      stepsTitle: "使い方",
      steps: [
        "PDFファイルをアップロードします",
        "変換したいページ番号を選びます",
        "画質と拡大率を調整します",
        "「PDFをJPGに変換」ボタンを押します",
        "プレビューを確認してJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "PDFはサーバーにアップロードされますか？",
          answer:
            "いいえ。PDFはブラウザ上で処理されるため、外部サーバーには送信されません。",
        },
        {
          question: "すべてのページを一括変換できますか？",
          answer:
            "今回の版では選択した1ページをJPGに変換できます。将来的に全ページ一括出力にも拡張しやすい構成です。",
        },
        {
          question: "画質は調整できますか？",
          answer:
            "はい。JPG品質スライダーで画質とファイルサイズのバランスを調整できます。",
        },
        {
          question: "スマホでも使えますか？",
          answer:
            "はい。対応ブラウザであればスマホ・タブレット・PCから利用できますが、ページ数の多いPDFでは端末性能により時間がかかることがあります。",
        },
      ],
      relatedTools: [
        { name: "PDFをPNGに変換", href: "/tools/pdf-to-png" },
        { name: "PDFをWebPに変換", href: "/tools/pdf-to-webp" },
        { name: "画像をPDFに変換", href: "/tools/image-to-pdf" },
        { name: "PDF結合", href: "/tools/merge-pdf" },
      ],
    },
    ui: {
      emptyTitle: "PDFをドラッグ＆ドロップ、または選択",
      emptyDescription:
        "PDFの選択したページをJPG画像に変換できます。",
      selectButtonLabel: "PDFを選択",
      dropHereLabel: "ここにPDFをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      selectedFileTitle: "選択中のPDF",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      totalPagesLabel: "総ページ数",
      selectedPageLabel: "変換ページ",
      qualityLabel: "JPG画質",
      scaleLabel: "拡大率",
      previewLabel: "JPGプレビュー",
      previewPlaceholder: "変換後のJPGプレビューはここに表示されます。",
      convertButton: "PDFをJPGに変換",
      convertingButton: "変換中...",
      downloadButton: "JPGをダウンロード",
      resetButton: "リセット",
      unknownType: "不明",
      invalidFileError: "エラー: PDFファイルを選択してください。",
      loadingPdfStatus: "PDFを読み込み中です...",
      convertingStatus: "PDFをJPGに変換中です...",
      successMessage: "完了: PDFのJPG変換が完了しました。",
      loadError: "エラー: PDFの読み込みに失敗しました。",
      convertError: "エラー: PDFのJPG変換に失敗しました。",
    },
  },
  en: {
    page: {
      title: "PDF to JPG Converter",
      description:
        "Convert PDF pages to JPG images online for free. Everything runs directly in your browser with no upload required.",
      aboutTitle: "What is PDF to JPG Converter?",
      aboutText:
        "This free PDF to JPG converter lets you turn PDF pages into JPG images directly in your browser. It is useful for sharing document pages as images, creating thumbnails, exporting presentation slides, and reusing PDF content in websites or social media. Since everything is processed locally, your PDF files are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a PDF file",
        "Choose the page you want to convert",
        "Adjust JPG quality and render scale",
        "Click Convert PDF to JPG",
        "Preview and download the JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my PDF files uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Can I convert all pages at once?",
          answer:
            "This version converts one selected page to JPG. The structure is easy to extend later for batch export.",
        },
        {
          question: "Can I adjust image quality?",
          answer:
            "Yes. You can use the JPG quality slider to balance quality and file size.",
        },
        {
          question: "Does it work on mobile devices?",
          answer:
            "Yes. It works on phones, tablets, and desktop browsers that support modern web features, though large PDFs may take longer on slower devices.",
        },
      ],
      relatedTools: [
        { name: "PDF to PNG", href: "/en/tools/pdf-to-png" },
        { name: "PDF to WebP", href: "/en/tools/pdf-to-webp" },
        { name: "Image to PDF", href: "/en/tools/image-to-pdf" },
        { name: "Merge PDF", href: "/en/tools/merge-pdf" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a PDF here, or select a file",
      emptyDescription:
        "Convert a selected PDF page into a JPG image.",
      selectButtonLabel: "Choose PDF",
      dropHereLabel: "Drop PDF here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      selectedFileTitle: "Selected PDF",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      totalPagesLabel: "Total Pages",
      selectedPageLabel: "Page to Convert",
      qualityLabel: "JPG Quality",
      scaleLabel: "Render Scale",
      previewLabel: "JPG Preview",
      previewPlaceholder: "The converted JPG preview will appear here.",
      convertButton: "Convert PDF to JPG",
      convertingButton: "Converting...",
      downloadButton: "Download JPG",
      resetButton: "Reset",
      unknownType: "Unknown",
      invalidFileError: "Error: Please select a PDF file.",
      loadingPdfStatus: "Loading PDF...",
      convertingStatus: "Converting PDF to JPG...",
      successMessage: "Done: PDF to JPG conversion completed successfully.",
      loadError: "Error: Failed to load the PDF.",
      convertError: "Error: Failed to convert PDF to JPG.",
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

export default function PdfToJpgTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [quality, setQuality] = useState(92);
  const [scale, setScale] = useState(1.5);
  const [jpgBlob, setJpgBlob] = useState<Blob | null>(null);
  const [jpgPreviewUrl, setJpgPreviewUrl] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const fileInfo = useMemo(() => {
    if (!file) return null;
    return {
      name: file.name,
      type: file.type || ui.unknownType,
      size: formatFileSize(file.size),
    };
  }, [file, ui.unknownType]);

  useEffect(() => {
    return () => {
      if (jpgPreviewUrl) URL.revokeObjectURL(jpgPreviewUrl);
    };
  }, [jpgPreviewUrl]);

  const handleFileSelect = async (nextFile: File | null) => {
    setMessage("");

    if (jpgPreviewUrl) {
      URL.revokeObjectURL(jpgPreviewUrl);
      setJpgPreviewUrl("");
    }

    setJpgBlob(null);
    setTotalPages(0);
    setSelectedPage(1);

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
      setMessage(ui.loadingPdfStatus);

      const arrayBuffer = await nextFile.arrayBuffer();
      const pdfjs = await loadPdfJs();
      const pdf = await pdfjs.getDocument({
        data: new Uint8Array(arrayBuffer),
      }).promise;

      setFile(nextFile);
      setTotalPages(pdf.numPages);
      setSelectedPage(1);
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

  const handleConvert = async () => {
    if (!file || !canvasRef.current || isProcessing) return;

    try {
      setIsProcessing(true);
      setMessage(ui.convertingStatus);

      const arrayBuffer = await file.arrayBuffer();
      const pdfjs = await loadPdfJs();
      const pdf = await pdfjs.getDocument({
        data: new Uint8Array(arrayBuffer),
      }).promise;

      const pageData = await pdf.getPage(selectedPage);
      const viewport = pageData.getViewport({ scale });

      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas context not available");
      }

      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);

      await pageData.render({
        canvasContext: context,
        viewport,
      }).promise;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (nextBlob) => {
            if (!nextBlob) {
              reject(new Error("Failed to create JPG blob"));
              return;
            }
            resolve(nextBlob);
          },
          "image/jpeg",
          quality / 100
        );
      });

      if (jpgPreviewUrl) {
        URL.revokeObjectURL(jpgPreviewUrl);
      }

      const nextUrl = URL.createObjectURL(blob);
      setJpgBlob(blob);
      setJpgPreviewUrl(nextUrl);
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.convertError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!jpgBlob || !jpgPreviewUrl || !file) return;

    const baseName =
      file.name.lastIndexOf(".") >= 0
        ? file.name.slice(0, file.name.lastIndexOf("."))
        : file.name;

    const link = document.createElement("a");
    link.href = jpgPreviewUrl;
    link.download = `${baseName}-page-${selectedPage}.jpg`;
    link.click();
  };

  const handleReset = () => {
    setFile(null);
    setMessage("");
    setIsProcessing(false);
    setTotalPages(0);
    setSelectedPage(1);
    setQuality(92);
    setScale(1.5);

    if (jpgPreviewUrl) {
      URL.revokeObjectURL(jpgPreviewUrl);
    }

    setJpgPreviewUrl("");
    setJpgBlob(null);

    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      canvasRef.current.width = 0;
      canvasRef.current.height = 0;
    }
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

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label
                  htmlFor="pdf-page"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.selectedPageLabel}
                </label>
                <input
                  id="pdf-page"
                  type="number"
                  min="1"
                  max={Math.max(1, totalPages)}
                  value={selectedPage}
                  onChange={(e) =>
                    setSelectedPage(
                      Math.min(
                        Math.max(1, Number(e.target.value) || 1),
                        Math.max(1, totalPages)
                      )
                    )
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="jpg-quality"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.qualityLabel}: {quality}
                </label>
                <input
                  id="jpg-quality"
                  type="range"
                  min="40"
                  max="100"
                  step="1"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="render-scale"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.scaleLabel}: {scale.toFixed(1)}
                </label>
                <input
                  id="render-scale"
                  type="range"
                  min="1"
                  max="3"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <div className="text-sm text-gray-600">{ui.previewLabel}</div>
          {jpgPreviewUrl ? (
            <img
              src={jpgPreviewUrl}
              alt="jpg preview"
              className="max-h-[720px] w-full rounded border object-contain"
            />
          ) : (
            <div className="flex h-[320px] items-center justify-center rounded border border-dashed bg-gray-50 px-4 text-center text-sm text-gray-500">
              {ui.previewPlaceholder}
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            onClick={handleConvert}
            disabled={!file || isProcessing || totalPages === 0}
          >
            {isProcessing ? ui.convertingButton : ui.convertButton}
          </PrimaryButton>

          {jpgBlob && (
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
    </>
  );
}


