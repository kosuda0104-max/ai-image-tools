"use client";

import { useEffect, useMemo, useState } from "react";
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
  unknownType: string;
  convertingStatus: string;
  canvasInitError: string;
  convertError: string;
  loadError: string;
  unexpectedErrorPrefix: string;
  successMessage: (baseName: string) => string;
  invalidFileError: string;
  selectedImageTitle: string;
  fileNameLabel: string;
  fileTypeLabel: string;
  fileSizeLabel: string;
  previewLabel: string;
  convertButton: string;
  convertingButton: string;
};

type ToolContent = {
  page: PageContent;
  ui: UIContent;
};

type Props = {
  locale: Locale;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

const content: Record<Locale, ToolContent> = {
  ja: {
    page: {
      title: "AVIFをJPGに変換",
      description: "AVIF画像をJPG形式に変換できる無料オンラインツールです。",
      aboutTitle: "AVIFをJPGに変換とは？",
      aboutText:
        "AVIF画像をJPG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。JPG形式にすることで、より多くの環境で使いやすい画像として保存できます。",
      stepsTitle: "使い方",
      steps: [
        "AVIF画像をアップロードします",
        "プレビューを確認します",
        "「AVIFをJPGに変換」ボタンを押します",
        "変換後のJPG画像をダウンロードします"
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "透過はどうなりますか？",
          answer: "JPGは透過に対応していないため、透明部分は白背景として変換されます。"
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでAVIFをJPGに変換できます。"
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。ブラウザ上で処理するため、画像ファイルは外部サーバーにアップロードされません。"
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。このツールはブラウザ上で処理されるため、画像ファイルは外部サーバーにアップロードされません。"
        }
      ],
      relatedTools: [
        { name: "AVIFをPNGに変換", href: "/tools/avif-to-png" },
        { name: "WebPをJPGに変換", href: "/tools/webp-to-jpg" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" }
      ]
    },
    ui: {
      emptyTitle: "AVIF画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "エラー: AVIFからJPGへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) => `完了: ${baseName}.jpg をダウンロードしました。`,
      invalidFileError: "エラー: AVIFファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "AVIFをJPGに変換",
      convertingButton: "変換中..."
    }
  },
  en: {
    page: {
      title: "AVIF to JPG Converter",
      description: "Convert AVIF images to JPG format online for free.",
      aboutTitle: "What is AVIF to JPG Converter?",
      aboutText:
        "This free AVIF to JPG converter lets you convert images directly in your browser. No upload is required, so the process is fast, secure, and easy to use. JPG is useful when you want a more widely supported image format.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an AVIF image",
        "Check the preview",
        "Click the Convert AVIF to JPG button",
        "Download the converted JPG image"
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What happens to transparency?",
          answer: "JPG does not support transparency, so transparent areas are converted to a white background."
        },
        {
          question: "Do I need to install anything?",
          answer: "No. You can convert AVIF to JPG directly in your browser without installing any software."
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. The conversion runs in your browser, so your files are not uploaded to any external server."
        },
        {
          question: "Can I convert without uploading?",
          answer:
            "Yes. This tool works entirely in your browser, so your image files are not uploaded to any external server."
        }
      ],
      relatedTools: [
        { name: "AVIF to PNG", href: "/en/tools/avif-to-png" },
        { name: "WebP to JPG", href: "/en/tools/webp-to-jpg" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" }
      ]
    },
    ui: {
      emptyTitle: "Drag and drop an AVIF image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert AVIF to JPG.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) => `Done: ${baseName}.jpg has been downloaded.`,
      invalidFileError: "Error: Please select an AVIF file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert AVIF to JPG",
      convertingButton: "Converting..."
    }
  }
};

export default function AvifToJpgTool({ locale }: Props) {
  const { page, ui } = content[locale];
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const previewUrl = useMemo(() => {
    if (!image) return "";
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const fileInfo = useMemo(() => {
    if (!image) return null;
    return {
      name: image.name,
      type: image.type || ui.unknownType,
      size: formatFileSize(image.size)
    };
  }, [image, ui.unknownType]);

  const handleConvert = () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(ui.convertingStatus);

      const img = new Image();
      const objectUrl = URL.createObjectURL(image);
      img.src = objectUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setStatus(ui.canvasInitError);
          setIsProcessing(false);
          URL.revokeObjectURL(objectUrl);
          return;
        }

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (!blob) {
            setStatus(ui.convertError);
            setIsProcessing(false);
            URL.revokeObjectURL(objectUrl);
            return;
          }

          const downloadUrl = URL.createObjectURL(blob);
          const baseName = image.name.replace(/\.avif$/i, "");
          const link = document.createElement("a");

          link.href = downloadUrl;
          link.download = `${baseName}.jpg`;
          link.click();

          setStatus(ui.successMessage(baseName));
          setIsProcessing(false);

          URL.revokeObjectURL(downloadUrl);
          URL.revokeObjectURL(objectUrl);
        }, "image/jpeg", 0.92);
      };

      img.onerror = () => {
        setStatus(ui.loadError);
        setIsProcessing(false);
        URL.revokeObjectURL(objectUrl);
      };
    } catch (e: unknown) {
      console.error(e);
      setStatus(
        `${ui.unexpectedErrorPrefix}: ${
          e instanceof Error ? e.message : String(e)
        }`
      );
      setIsProcessing(false);
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
          file={image}
          accept="image/avif,.avif"
          emptyTitle={ui.emptyTitle}
          onFileSelect={(file: File | null) => {
            setStatus("");

            if (!file) {
              setImage(null);
              return;
            }

            const isAvif =
              file.type === "image/avif" || /\.avif$/i.test(file.name);

            if (!isAvif) {
              setImage(null);
              setStatus(ui.invalidFileError);
              return;
            }

            setImage(file);
          }}
        />

        {fileInfo && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">
              {ui.selectedImageTitle}
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-800">
                  {ui.fileNameLabel}:
                </span>{" "}
                {fileInfo.name}
              </p>
              <p>
                <span className="font-medium text-gray-800">
                  {ui.fileTypeLabel}:
                </span>{" "}
                {fileInfo.type}
              </p>
              <p>
                <span className="font-medium text-gray-800">
                  {ui.fileSizeLabel}:
                </span>{" "}
                {fileInfo.size}
              </p>
            </div>
          </div>
        )}

        {previewUrl && (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">{ui.previewLabel}</div>
            <img
              src={previewUrl}
              alt="preview"
              className="max-h-80 rounded border object-contain"
            />
          </div>
        )}

        <PrimaryButton onClick={handleConvert} disabled={!image || isProcessing}>
          {isProcessing ? ui.convertingButton : ui.convertButton}
        </PrimaryButton>

        <StatusMessage status={status} />
      </div>
    </ToolPageLayout>
    </>
  );
}


