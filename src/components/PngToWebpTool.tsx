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
      title: "PNGをWebPに変換",
      description: "PNG画像をWebP形式に変換できる無料オンラインツールです。",
      aboutTitle: "PNGをWebPに変換とは？",
      aboutText:
        "PNG画像をWebP形式に変換できる無料オンラインツールです。画質を保ちながらファイルサイズを抑えたいときや、Web向けに最適化したいときに便利です。処理はブラウザ内で完結します。",
      stepsTitle: "使い方",
      steps: [
        "PNG画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "WebP画像をダウンロードします"
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "透過は保持されますか？",
          answer: "はい。PNGに透過がある場合、多くのケースでWebPでも保持されます。"
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけで変換できます。"
        },
        {
          question: "画像はアップロードされますか？",
          answer: "いいえ。変換はブラウザ内で行われるため、外部サーバーに送信されません。"
        }
      ],
      relatedTools: [
        { name: "WebPをPNGに変換", href: "/tools/webp-to-png" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "JPGをWebPに変換", href: "/tools/jpg-to-webp" }
      ]
    },
    ui: {
      emptyTitle: "PNG画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "PNGをWebPに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "PNGファイルを選択してください。",
      error: "変換に失敗しました。"
    }
  },
  en: {
    page: {
      title: "PNG to WebP Converter",
      description: "Convert PNG images to WebP format online for free.",
      aboutTitle: "What is PNG to WebP Converter?",
      aboutText:
        "This free online tool converts PNG images into WebP format directly in your browser. It is useful when you want smaller file sizes while keeping good image quality, especially for web use.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a PNG image",
        "Check the preview",
        "Click convert",
        "Download the WebP image"
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will transparency be preserved?",
          answer: "Yes. If the original PNG has transparency, it is usually preserved in the converted WebP."
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
      emptyTitle: "Upload PNG image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert PNG to WebP",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select a PNG file.",
      error: "Conversion failed."
    }
  }
};

export default function PngToWebpTool({ locale }: Props) {
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

    const isPng =
      file.type === "image/png" || /\.png$/i.test(file.name);

    if (!isPng) {
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

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (webpBlob) => {
          if (!webpBlob) {
            setLoading(false);
            setStatus(ui.error);
            URL.revokeObjectURL(imageUrl);
            return;
          }

          const downloadUrl = URL.createObjectURL(webpBlob);
          const a = document.createElement("a");
          a.href = downloadUrl;
          a.download = file.name.replace(/\.png$/i, "") + ".webp";
          a.click();

          URL.revokeObjectURL(downloadUrl);
          URL.revokeObjectURL(imageUrl);

          setLoading(false);
          setStatus(ui.done);
        },
        "image/webp",
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
        accept="image/png,.png"
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
          <img
            src={preview}
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
  );
}