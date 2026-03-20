"use client";

import { useMemo, useState } from "react";
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
  convertError: string;
  unexpectedErrorPrefix: string;
  successMessage: (baseName: string) => string;
  invalidFileError: string;
  selectedImageTitle: string;
  fileNameLabel: string;
  fileTypeLabel: string;
  fileSizeLabel: string;
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
      title: "HEICをJPGに変換",
      description: "HEIC画像をJPG形式に変換できる無料オンラインツールです。",
      aboutTitle: "HEICをJPGに変換とは？",
      aboutText:
        "HEIC画像をJPG形式に変換できる無料オンラインツールです。iPhoneで撮影した写真を、より互換性の高いJPG形式へ変換したいときに便利です。ブラウザ上で処理するためアップロード不要で、安全かつ簡単に利用できます。",
      stepsTitle: "使い方",
      steps: [
        "HEIC画像をアップロードします",
        "「HEICをJPGに変換」ボタンを押します",
        "変換後のJPG画像をダウンロードします"
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "iPhoneの写真も変換できますか？",
          answer: "はい。HEIC形式のiPhone写真をJPGへ変換できます。"
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでHEICをJPGに変換できます。"
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
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "AVIFをJPGに変換", href: "/tools/avif-to-jpg" }
      ]
    },
    ui: {
      emptyTitle: "HEIC画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      convertError: "エラー: HEICからJPGへの変換に失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) => `完了: ${baseName}.jpg をダウンロードしました。`,
      invalidFileError: "エラー: HEICファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      convertButton: "HEICをJPGに変換",
      convertingButton: "変換中..."
    }
  },
  en: {
    page: {
      title: "HEIC to JPG Converter",
      description: "Convert HEIC images to JPG format online for free.",
      aboutTitle: "What is HEIC to JPG Converter?",
      aboutText:
        "This free HEIC to JPG converter lets you convert images directly in your browser. It is useful for converting iPhone photos into the more widely supported JPG format. No upload is required, so the process is secure and easy to use.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a HEIC image",
        "Click the Convert HEIC to JPG button",
        "Download the converted JPG image"
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can I convert iPhone photos?",
          answer: "Yes. This tool can convert HEIC photos from iPhone to JPG."
        },
        {
          question: "Do I need to install anything?",
          answer: "No. You can convert HEIC to JPG directly in your browser without installing any software."
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
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "AVIF to JPG", href: "/en/tools/avif-to-jpg" }
      ]
    },
    ui: {
      emptyTitle: "Drag and drop a HEIC image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      convertError: "Error: Failed to convert HEIC to JPG.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) => `Done: ${baseName}.jpg has been downloaded.`,
      invalidFileError: "Error: Please select a HEIC file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      convertButton: "Convert HEIC to JPG",
      convertingButton: "Converting..."
    }
  }
};

export default function HeicToJpgTool({ locale }: Props) {
  const { page, ui } = content[locale];
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInfo = useMemo(() => {
    if (!image) return null;
    return {
      name: image.name,
      type: image.type || ui.unknownType,
      size: formatFileSize(image.size)
    };
  }, [image, ui.unknownType]);

  const handleConvert = async () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setStatus(ui.convertingStatus);

      const heic2any = (await import("heic2any")).default;

      const converted = await heic2any({
        blob: image,
        toType: "image/jpeg",
        quality: 0.92
      });

      const blob = Array.isArray(converted) ? converted[0] : converted;

      if (!(blob instanceof Blob)) {
        setStatus(ui.convertError);
        setIsProcessing(false);
        return;
      }

      const downloadUrl = URL.createObjectURL(blob);
      const baseName = image.name.replace(/\.heic$/i, "");
      const link = document.createElement("a");

      link.href = downloadUrl;
      link.download = `${baseName}.jpg`;
      link.click();

      setStatus(ui.successMessage(baseName));
      setIsProcessing(false);

      URL.revokeObjectURL(downloadUrl);
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
          accept=".heic,image/heic"
          emptyTitle={ui.emptyTitle}
          onFileSelect={(file: File | null) => {
            setStatus("");

            if (!file) {
              setImage(null);
              return;
            }

            const isHeic =
              file.type === "image/heic" || /\.heic$/i.test(file.name);

            if (!isHeic) {
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

        <PrimaryButton onClick={handleConvert} disabled={!image || isProcessing}>
          {isProcessing ? ui.convertingButton : ui.convertButton}
        </PrimaryButton>

        <StatusMessage status={status} />
      </div>
    </ToolPageLayout>
    </>
  );
}


