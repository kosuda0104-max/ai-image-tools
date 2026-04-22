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

type PageSize = "auto" | "a4" | "letter";

type UIContent = {
  dropTitle: string;
  dropDescription: string;
  selectButtonLabel: string;
  selectedFilesTitle: string;
  fileNameLabel: string;
  fileTypeLabel: string;
  fileSizeLabel: string;
  imageSizeLabel: string;
  pageSizeLabel: string;
  marginLabel: string;
  autoPageSizeLabel: string;
  a4PageSizeLabel: string;
  letterPageSizeLabel: string;
  moveUpLabel: string;
  moveDownLabel: string;
  removeLabel: string;
  addMoreLabel: string;
  createButton: string;
  creatingButton: string;
  downloadButton: string;
  resetButton: string;
  noFilesError: string;
  invalidFileError: string;
  loadingStatus: string;
  creatingStatus: string;
  successMessage: string;
  createError: string;
  emptyListText: string;
};

type ToolContent = {
  page: PageContent;
  ui: UIContent;
};

type Props = {
  locale: Locale;
};

type ImageItem = {
  id: string;
  file: File;
  name: string;
  type: string;
  size: number;
  width: number;
  height: number;
};

const content: Record<Locale, ToolContent> = {
  ja: {
    page: {
      title: "画像を PDF に変換",
      description:
        "複数の画像を 1 つの PDF にまとめられる無料オンラインツールです。ブラウザ上だけで順番変更やページサイズ調整まで行えます。",
      aboutTitle: "画像を PDF に変換とは",
      aboutText:
        "画像を PDF に変換ツールは、JPG・PNG・WebP などの画像を 1 つの PDF にまとめるための無料オンラインツールです。スキャン画像を PDF にしたいときや、複数の画像をひとつの資料として共有したいときに向いています。画像の並び順を入れ替えたり、ページサイズや余白を調整したりできるので、提出前の資料整理にも使いやすい構成です。処理はブラウザ内で完結するため、画像を外部サーバーへアップロードせずに作業しやすい点も特長です。",
      stepsTitle: "使い方",
      steps: [
        "PDF にまとめたい画像を追加します。",
        "必要に応じて画像の順番を並び替えます。",
        "ページサイズと余白を設定します。",
        "「画像を PDF に変換」を押します。",
        "完成した PDF をダウンロードします。",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画像はサーバーにアップロードされますか？",
          answer:
            "いいえ。画像はブラウザ上で処理されるため、外部サーバーへ送信されません。",
        },
        {
          question: "複数の画像を 1 つの PDF にできますか？",
          answer:
            "はい。複数の画像を追加して順番を並び替えたうえで、1 つの PDF にまとめられます。",
        },
        {
          question: "対応している画像形式は何ですか？",
          answer:
            "JPG、JPEG、PNG、WebP の画像に対応しています。",
        },
        {
          question: "A4 サイズで出力できますか？",
          answer:
            "はい。Auto、A4、Letter からページサイズを選べます。",
        },
      ],
      relatedTools: [
        { name: "PDF 結合", href: "/tools/merge-pdf" },
        { name: "PDF 分割", href: "/tools/split-pdf" },
        { name: "PDF を JPG に変換", href: "/tools/pdf-to-jpg" },
        { name: "PDF を PNG に変換", href: "/tools/pdf-to-png" },
      ],
    },
    ui: {
      dropTitle: "画像をドラッグ＆ドロップ、または選択",
      dropDescription:
        "複数の画像を追加して、1 つの PDF にまとめられます。",
      selectButtonLabel: "画像を追加",
      selectedFilesTitle: "PDF にする画像一覧",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      imageSizeLabel: "画像サイズ",
      pageSizeLabel: "ページサイズ",
      marginLabel: "余白",
      autoPageSizeLabel: "Auto",
      a4PageSizeLabel: "A4",
      letterPageSizeLabel: "Letter",
      moveUpLabel: "上へ",
      moveDownLabel: "下へ",
      removeLabel: "削除",
      addMoreLabel: "さらに画像を追加",
      createButton: "画像を PDF に変換",
      creatingButton: "作成中...",
      downloadButton: "PDF をダウンロード",
      resetButton: "リセット",
      noFilesError: "エラー: PDF に変換する画像を 1 つ以上追加してください。",
      invalidFileError: "エラー: JPG / PNG / WebP 画像を選択してください。",
      loadingStatus: "画像を読み込み中です...",
      creatingStatus: "PDF を作成中です...",
      successMessage: "PDF を作成しました。",
      createError: "エラー: PDF の作成に失敗しました。",
      emptyListText: "追加した画像がここに表示されます。",
    },
  },
  en: {
    page: {
      title: "Image to PDF Converter",
      description:
        "Convert multiple images into one PDF online for free. Everything runs directly in your browser.",
      aboutTitle: "What is Image to PDF Converter?",
      aboutText:
        "This free image to PDF converter lets you combine images into a single PDF directly in your browser. It is useful for turning scanned pages into PDFs, combining photos into one shareable document, and preparing image-based materials for reports or submissions. You can reorder images and adjust page size and margins. Since everything is processed locally, your files are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Add the images you want to convert",
        "Reorder them if needed",
        "Choose page size and margin",
        "Click Convert Images to PDF",
        "Download the created PDF",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my images uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Can I combine multiple images into one PDF?",
          answer:
            "Yes. You can add multiple images, reorder them, and combine them into a single PDF.",
        },
        {
          question: "Which image formats are supported?",
          answer:
            "JPG, JPEG, PNG, and WebP are supported.",
        },
        {
          question: "Can I export in A4 size?",
          answer:
            "Yes. You can choose Auto, A4, or Letter page size.",
        },
      ],
      relatedTools: [
        { name: "Merge PDF", href: "/en/tools/merge-pdf" },
        { name: "Split PDF", href: "/en/tools/split-pdf" },
        { name: "PDF to JPG", href: "/en/tools/pdf-to-jpg" },
        { name: "PDF to PNG", href: "/en/tools/pdf-to-png" },
      ],
    },
    ui: {
      dropTitle: "Drag and drop images here, or select files",
      dropDescription:
        "Add multiple images and combine them into one PDF.",
      selectButtonLabel: "Add Images",
      selectedFilesTitle: "Images to Convert",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      imageSizeLabel: "Image Size",
      pageSizeLabel: "Page Size",
      marginLabel: "Margin",
      autoPageSizeLabel: "Auto",
      a4PageSizeLabel: "A4",
      letterPageSizeLabel: "Letter",
      moveUpLabel: "Up",
      moveDownLabel: "Down",
      removeLabel: "Remove",
      addMoreLabel: "Add More Images",
      createButton: "Convert Images to PDF",
      creatingButton: "Creating...",
      downloadButton: "Download PDF",
      resetButton: "Reset",
      noFilesError: "Error: Please add at least one image to convert.",
      invalidFileError: "Error: Please select JPG, PNG, or WebP images.",
      loadingStatus: "Loading images...",
      creatingStatus: "Creating PDF...",
      successMessage: "Done: PDF created successfully.",
      createError: "Error: Failed to create the PDF.",
      emptyListText: "Added images will appear here.",
    },
  },
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: image.width, height: image.height });
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    image.src = objectUrl;
  });
}

function getPageSize(size: PageSize): { width: number; height: number } | null {
  switch (size) {
    case "a4":
      return { width: 595.28, height: 841.89 };
    case "letter":
      return { width: 612, height: 792 };
    default:
      return null;
  }
}

export default function ImageToPdfTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [items, setItems] = useState<ImageItem[]>([]);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageSize, setPageSize] = useState<PageSize>("auto");
  const [margin, setMargin] = useState(24);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [downloadFileName, setDownloadFileName] = useState("images.pdf");

  const handleFiles = async (files: FileList | File[] | null) => {
    setMessage("");
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    const invalidExists = fileArray.some(
      (file) =>
        !(
          file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "image/webp" ||
          /\.(jpg|jpeg|png|webp)$/i.test(file.name)
        )
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
          const { width, height } = await getImageDimensions(file);
          return {
            id: createId(),
            file,
            name: file.name,
            type: file.type,
            size: file.size,
            width,
            height,
          } as ImageItem;
        })
      );

      setItems((prev) => [...prev, ...nextItems]);

      if (!pdfBlob && nextItems.length > 0) {
        const baseName = nextItems[0].name.replace(/\.[^.]+$/, "");
        setDownloadFileName(`${baseName}.pdf`);
      }

      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage(ui.createError);
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

  const handleCreatePdf = async () => {
    if (items.length < 1) {
      setMessage(ui.noFilesError);
      return;
    }

    try {
      setIsProcessing(true);
      setMessage(ui.creatingStatus);

      const pdfDoc = await PDFDocument.create();

      for (const item of items) {
        const fileBytes = await item.file.arrayBuffer();
        const mimeType = item.type || "";
        const pagePreset = getPageSize(pageSize);

        let embeddedImage;
        if (mimeType === "image/png") {
          embeddedImage = await pdfDoc.embedPng(fileBytes);
        } else {
          embeddedImage = await pdfDoc.embedJpg(fileBytes);
        }

        const imageWidth = embeddedImage.width;
        const imageHeight = embeddedImage.height;

        let pageWidth = imageWidth + margin * 2;
        let pageHeight = imageHeight + margin * 2;

        if (pagePreset) {
          pageWidth = pagePreset.width;
          pageHeight = pagePreset.height;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        const availableWidth = pageWidth - margin * 2;
        const availableHeight = pageHeight - margin * 2;
        const scale = Math.min(
          availableWidth / imageWidth,
          availableHeight / imageHeight
        );

        const drawWidth = imageWidth * scale;
        const drawHeight = imageHeight * scale;
        const x = (pageWidth - drawWidth) / 2;
        const y = (pageHeight - drawHeight) / 2;

        page.drawImage(embeddedImage, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const normalizedPdfBytes = new Uint8Array(pdfBytes);
      const blob = new Blob([normalizedPdfBytes.buffer], { type: "application/pdf" });

      setPdfBlob(blob);
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.createError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlob) return;

    const url = URL.createObjectURL(pdfBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = downloadFileName;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setItems([]);
    setMessage("");
    setIsProcessing(false);
    setPageSize("auto");
    setMargin(24);
    setPdfBlob(null);
    setDownloadFileName("images.pdf");
  };

  const totalSize = useMemo(
    () => items.reduce((sum, item) => sum + item.size, 0),
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
          htmlFor="image-to-pdf-input"
          className="block cursor-pointer rounded-xl border-2 border-dashed p-8 text-center hover:bg-gray-50"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            id="image-to-pdf-input"
            type="file"
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            multiple
            className="hidden"
            onChange={handleInputChange}
          />

          <div className="space-y-2">
            <div className="text-sm text-gray-600">{ui.dropTitle}</div>
            <div className="text-lg font-semibold">{ui.dropDescription}</div>
            <div className="text-sm text-gray-500">{ui.selectButtonLabel}</div>
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
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            multiple
            onChange={handleInputChange}
            className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="image-to-pdf-page-size"
              className="text-sm font-medium text-gray-800"
            >
              {ui.pageSizeLabel}
            </label>
            <select
              id="image-to-pdf-page-size"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value as PageSize)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
            >
              <option value="auto">{ui.autoPageSizeLabel}</option>
              <option value="a4">{ui.a4PageSizeLabel}</option>
              <option value="letter">{ui.letterPageSizeLabel}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="image-to-pdf-margin"
              className="text-sm font-medium text-gray-800"
            >
              {ui.marginLabel}: {margin}
            </label>
            <input
              id="image-to-pdf-margin"
              type="range"
              min="0"
              max="80"
              step="2"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold text-gray-900">
              {ui.selectedFilesTitle}
            </h3>
            {items.length > 0 ? (
              <div className="text-sm text-gray-600">
                {ui.fileSizeLabel}: {formatFileSize(totalSize)}
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
                          {ui.fileTypeLabel}:
                        </span>{" "}
                        {item.type || "-"}
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          {ui.fileSizeLabel}:
                        </span>{" "}
                        {formatFileSize(item.size)}
                      </p>
                      <p>
                        <span className="font-medium text-gray-800">
                          {ui.imageSizeLabel}:
                        </span>{" "}
                        {item.width} x {item.height}
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
            onClick={handleCreatePdf}
            disabled={isProcessing || items.length < 1}
          >
            {isProcessing ? ui.creatingButton : ui.createButton}
          </PrimaryButton>

          {pdfBlob ? (
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



