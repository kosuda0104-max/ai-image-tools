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
      title: "GIFをPNGに変換",
      description: "GIF画像をPNG形式に変換できる無料オンラインツールです。",
      aboutTitle: "GIFをPNGに変換とは？",
      aboutText:
        "GIF画像をPNG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。PNG形式にすることで、編集しやすく扱いやすい画像として保存できます。",
      stepsTitle: "使い方",
      steps: [
        "GIF画像をアップロードします",
        "プレビューを確認します",
        "「GIFをPNGに変換」ボタンを押します",
        "変換後のPNG画像をダウンロードします"
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "アニメーションGIFも変換できますか？",
          answer: "このツールではGIFの先頭フレームをPNG画像として保存します。"
        },
        {
          question: "透過は維持されますか？",
          answer: "GIFに透過がある場合、PNG変換後も透過を維持できることがあります。"
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでGIFをPNGに変換できます。"
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。このツールはブラウザ上で処理されるため、画像ファイルは外部サーバーにアップロードされません。"
        }
      ],
      relatedTools: [
        { name: "GIFをJPGに変換", href: "/tools/gif-to-jpg" },
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" },
        { name: "WebPをPNGに変換", href: "/tools/webp-to-png" }
      ]
    },
    ui: {
      emptyTitle: "GIF画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "エラー: GIFからPNGへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) => `完了: ${baseName}.png をダウンロードしました。`,
      invalidFileError: "エラー: GIFファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "GIFをPNGに変換",
      convertingButton: "変換中..."
    }
  },
  en: {
    page: {
      title: "GIF to PNG Converter",
      description: "Convert GIF images to PNG format online for free.",
      aboutTitle: "What is GIF to PNG Converter?",
      aboutText:
        "This free GIF to PNG converter lets you convert images directly in your browser. No upload is required, so the process is fast, secure, and easy to use. PNG is useful when you want an editable and widely supported image format.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a GIF image",
        "Check the preview",
        "Click the Convert GIF to PNG button",
        "Download the converted PNG image"
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can animated GIFs be converted?",
          answer: "This tool converts the first frame of the GIF into a PNG image."
        },
        {
          question: "Will transparency be preserved?",
          answer: "If the original GIF has transparency, the converted PNG can preserve it in many cases."
        },
        {
          question: "Do I need to install anything?",
          answer: "No. You can convert GIF to PNG directly in your browser without installing any software."
        },
        {
          question: "Can I convert without uploading?",
          answer:
            "Yes. This tool works entirely in your browser, so your image files are not uploaded to any external server."
        }
      ],
      relatedTools: [
        { name: "GIF to JPG", href: "/en/tools/gif-to-jpg" },
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
        { name: "WebP to PNG", href: "/en/tools/webp-to-png" }
      ]
    },
    ui: {
      emptyTitle: "Drag and drop a GIF image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert GIF to PNG.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) => `Done: ${baseName}.png has been downloaded.`,
      invalidFileError: "Error: Please select a GIF file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert GIF to PNG",
      convertingButton: "Converting..."
    }
  }
};

export default function GifToPngTool({ locale }: Props) {
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

        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (!blob) {
            setStatus(ui.convertError);
            setIsProcessing(false);
            URL.revokeObjectURL(objectUrl);
            return;
          }

          const downloadUrl = URL.createObjectURL(blob);
          const baseName = image.name.replace(/\.gif$/i, "");
          const link = document.createElement("a");

          link.href = downloadUrl;
          link.download = `${baseName}.png`;
          link.click();

          setStatus(ui.successMessage(baseName));
          setIsProcessing(false);

          URL.revokeObjectURL(downloadUrl);
          URL.revokeObjectURL(objectUrl);
        }, "image/png");
      };

      img.onerror = () => {
        setStatus(ui.loadError);
        setIsProcessing(false);
        URL.revokeObjectURL(objectUrl);
      };
    } catch (e: unknown) {
      console.error(e);
      setStatus(`${ui.unexpectedErrorPrefix}: ${e instanceof Error ? e.message : String(e)}`);
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
          accept="image/gif,.gif"
          emptyTitle={ui.emptyTitle}
          onFileSelect={(file: File | null) => {
            setStatus("");
            if (!file) {
              setImage(null);
              return;
            }

            const isGif = file.type === "image/gif" || /\.gif$/i.test(file.name);

            if (!isGif) {
              setImage(null);
              setStatus(ui.invalidFileError);
              return;
            }

            setImage(file);
          }}
        />

        {fileInfo && (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">{ui.selectedImageTitle}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium text-gray-800">{ui.fileNameLabel}:</span> {fileInfo.name}</p>
              <p><span className="font-medium text-gray-800">{ui.fileTypeLabel}:</span> {fileInfo.type}</p>
              <p><span className="font-medium text-gray-800">{ui.fileSizeLabel}:</span> {fileInfo.size}</p>
            </div>
          </div>
        )}

        {previewUrl && (
          <div className="space-y-2">
            <div className="text-sm text-gray-600">{ui.previewLabel}</div>
            <img src={previewUrl} alt="preview" className="max-h-80 rounded border object-contain" />
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


