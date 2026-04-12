"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PreviewImage from "@/components/PreviewImage";
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

type Props = {
  locale: Locale;
};

const content: Record<
  Locale,
  {
    page: {
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
    ui: {
      emptyTitle: string;
      emptyDescription: string;
      selectButtonLabel: string;
      button: string;
      loading: string;
      done: string;
      invalidFile: string;
      previewLabel: string;
    };
  }
> = {
  ja: {
    page: {
      title: "画像を白黒化",
      description: "画像をグレースケールの白黒画像に変換できる無料オンラインツールです。",
      aboutTitle: "画像を白黒化とは？",
      aboutText:
        "カラー画像をグレースケールの白黒画像に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に使えます。写真や素材画像を落ち着いた印象にしたいときに便利です。",
      stepsTitle: "使い方",
      steps: [
        "画像をアップロードします",
        "プレビューを確認します",
        "白黒化ボタンを押します",
        "変換後の画像をダウンロードします"
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "どの画像形式に対応していますか？",
          answer: "JPG、PNG、WebP など一般的な画像形式に対応します。"
        },
        {
          question: "画質は落ちますか？",
          answer: "白黒化処理は行いますが、通常の利用では大きく見た目を崩さず保存できます。"
        },
        {
          question: "アップロードなしで使えますか？",
          answer: "はい。ブラウザ上で処理するため、画像ファイルは外部サーバーに送信されません。"
        }
      ],
      relatedTools: [
        { name: "画像を圧縮", href: "/tools/image-compress" },
        { name: "画像を回転", href: "/tools/rotate-image" },
        { name: "画像をリサイズ", href: "/tools/resize-image" }
      ]
    },
    ui: {
      emptyTitle: "画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "画像を白黒化",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "画像ファイルを選択してください。",
      previewLabel: "プレビュー"
    }
  },
  en: {
    page: {
      title: "Grayscale Image",
      description: "Convert an image to grayscale online for free.",
      aboutTitle: "What is Grayscale Image?",
      aboutText:
        "This tool converts a color image into a grayscale image directly in your browser. No upload is required, so it is fast, secure, and easy to use. It is useful when you want a monochrome look for photos or design assets.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an image",
        "Check the preview",
        "Click the grayscale button",
        "Download the converted image"
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What image formats are supported?",
          answer: "It supports common image formats such as JPG, PNG, and WebP."
        },
        {
          question: "Will image quality decrease?",
          answer: "The image is converted to grayscale, but in normal use it can be saved without major visual issues."
        },
        {
          question: "Can I use it without uploading?",
          answer: "Yes. This tool works entirely in your browser."
        }
      ],
      relatedTools: [
        { name: "Image Compress", href: "/en/tools/image-compress" },
        { name: "Rotate Image", href: "/en/tools/rotate-image" },
        { name: "Resize Image", href: "/en/tools/resize-image" }
      ]
    },
    ui: {
      emptyTitle: "Upload image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert to Grayscale",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select an image file.",
      previewLabel: "Preview"
    }
  }
};

export default function GrayscaleImageTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");

  const originalPreview = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (originalPreview) URL.revokeObjectURL(originalPreview);
    };
  }, [originalPreview]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const convert = () => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus(ui.invalidFile);
      return;
    }

    setLoading(true);
    setStatus(ui.loading);

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setLoading(false);
        setStatus("Error");
        URL.revokeObjectURL(url);
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const gray = Math.round(
          data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
        );
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
      }

      ctx.putImageData(imageData, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          setLoading(false);
          setStatus("Error");
          URL.revokeObjectURL(url);
          return;
        }

        const downloadUrl = URL.createObjectURL(blob);
        const previewUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const ext = file.name.match(/\.(png|jpg|jpeg|webp)$/i)?.[0] ?? ".png";
        const baseName = file.name.replace(/\.[^.]+$/, "");

        a.href = downloadUrl;
        a.download = `${baseName}-grayscale${ext}`;
        a.click();

        setPreview((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return previewUrl;
        });
        setLoading(false);
        setStatus(ui.done);

        URL.revokeObjectURL(downloadUrl);
        URL.revokeObjectURL(url);
      }, file.type || "image/png");
    };

    img.onerror = () => {
      setLoading(false);
      setStatus("Error");
      URL.revokeObjectURL(url);
    };
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
      <FileDropzone
        file={file}
        accept="image/*"
        emptyTitle={ui.emptyTitle}
        emptyDescription={ui.emptyDescription}
        selectButtonLabel={ui.selectButtonLabel}
        onFileSelect={(selected) => {
          setStatus("");
          setPreview("");
          setFile(selected);
        }}
      />

      {originalPreview && (
        <div className="space-y-2">
          <div className="text-sm text-gray-600">{ui.previewLabel}</div>
          <PreviewImage
            src={preview || originalPreview}
            alt={page.title}
            className="max-h-80 rounded border object-contain"
          />
        </div>
      )}

      <PrimaryButton onClick={convert} disabled={!file || loading}>
        {loading ? ui.loading : ui.button}
      </PrimaryButton>

      <StatusMessage status={status} />
    </ToolPageLayout>
    </>
  );
}


