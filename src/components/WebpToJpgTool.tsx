"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
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
      error: string;
    };
  }
> = {
  ja: {
    page: {
      title: "WebPをJPGに変換",
      description: "WebP画像をJPG形式に変換できる無料オンラインツールです。",
      aboutTitle: "WebPをJPGに変換とは？",
      aboutText:
        "WebP画像をJPG形式に変換できる無料オンラインツールです。JPGは互換性が高く、一般的な写真用途にも使いやすい形式です。透過部分は白背景として出力されます。",
      stepsTitle: "使い方",
      steps: [
        "WebP画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "JPG画像をダウンロードします"
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "透過はどうなりますか？",
          answer: "JPGは透過に対応していないため、透過部分は白背景になります。"
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけで変換できます。"
        },
        {
          question: "画像はアップロードされますか？",
          answer: "いいえ。変換はブラウザ内で行われます。"
        }
      ],
      relatedTools: [
        { name: "WebPをPNGに変換", href: "/tools/webp-to-png" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "JPGをWebPに変換", href: "/tools/jpg-to-webp" }
      ]
    },
    ui: {
      emptyTitle: "WebP画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "WebPをJPGに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "WebPファイルを選択してください。",
      error: "変換に失敗しました。"
    }
  },
  en: {
    page: {
      title: "WebP to JPG Converter",
      description: "Convert WebP images to JPG format online for free.",
      aboutTitle: "What is WebP to JPG Converter?",
      aboutText:
        "This free online tool converts WebP images into JPG format directly in your browser. JPG is widely supported and useful for general image sharing. Transparent areas are filled with a white background.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a WebP image",
        "Check the preview",
        "Click convert",
        "Download the JPG image"
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What happens to transparency?",
          answer: "JPG does not support transparency, so transparent areas are filled with white."
        },
        {
          question: "Do I need to install anything?",
          answer: "No. Everything works directly in your browser."
        },
        {
          question: "Are my images uploaded?",
          answer: "No. Files are processed locally in your browser."
        }
      ],
      relatedTools: [
        { name: "WebP to PNG", href: "/en/tools/webp-to-png" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "JPG to WebP", href: "/en/tools/jpg-to-webp" }
      ]
    },
    ui: {
      emptyTitle: "Upload WebP image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert WebP to JPG",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select a WebP file.",
      error: "Conversion failed."
    }
  }
};

export default function WebpToJpgTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const preview = useMemo(() => {
    if (!file) return "";
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const convert = () => {
    if (!file) return;

    const isWebp =
      file.type === "image/webp" || /\.webp$/i.test(file.name);

    if (!isWebp) {
      setStatus(ui.invalidFile);
      return;
    }

    setLoading(true);
    setStatus(ui.loading);

    const imageUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setLoading(false);
        setStatus(ui.error);
        URL.revokeObjectURL(imageUrl);
        return;
      }

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (jpgBlob) => {
          if (!jpgBlob) {
            setLoading(false);
            setStatus(ui.error);
            URL.revokeObjectURL(imageUrl);
            return;
          }

          const downloadUrl = URL.createObjectURL(jpgBlob);
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = file.name.replace(/\.webp$/i, "") + ".jpg";
          a.click();

          URL.revokeObjectURL(downloadUrl);
          URL.revokeObjectURL(imageUrl);

          setLoading(false);
          setStatus(ui.done);
        },
        "image/jpeg",
        0.92
      );
    };

    img.onerror = () => {
      setLoading(false);
      setStatus(ui.error);
      URL.revokeObjectURL(imageUrl);
    };

    img.src = imageUrl;
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
      <FileDropzone
        file={file}
        accept="image/webp,.webp"
        emptyTitle={ui.emptyTitle}
        emptyDescription={ui.emptyDescription}
        selectButtonLabel={ui.selectButtonLabel}
        onFileSelect={(selected) => {
          setStatus("");
          setFile(selected);
        }}
      />

      {preview && (
        <div className="space-y-2">
          <img src={preview} alt={page.title} className="max-h-80 rounded border object-contain" />
        </div>
      )}

      <PrimaryButton onClick={convert} disabled={!file || loading}>
        {loading ? ui.loading : ui.button}
      </PrimaryButton>

      <StatusMessage status={status} />
    </ToolPageLayout>
  );
}