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
    };
  }
> = {
  ja: {
    page: {
      title: "TIFFをPNGに変換",
      description: "TIFF画像をPNG形式に変換できる無料オンラインツールです。",
      aboutTitle: "TIFFをPNGに変換とは？",
      aboutText:
        "TIFF画像をPNG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。PNG形式にすることで、扱いやすく編集しやすい画像として保存できます。",
      stepsTitle: "使い方",
      steps: [
        "TIFF画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "PNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画質は落ちますか？",
          answer: "通常の変換では大きく画質を落とさずPNG形式で保存できます。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけで使えます。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。ブラウザ上で処理されるため、画像ファイルは外部サーバーに送信されません。",
        },
      ],
      relatedTools: [
        { name: "TIFFをJPGに変換", href: "/tools/tiff-to-jpg" },
        { name: "BMPをPNGに変換", href: "/tools/bmp-to-png" },
        { name: "WebPをPNGに変換", href: "/tools/webp-to-png" },
      ],
    },
    ui: {
      emptyTitle: "TIFF画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "TIFFをPNGに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "TIFFファイルを選択してください。",
    },
  },
  en: {
    page: {
      title: "TIFF to PNG Converter",
      description: "Convert TIFF images to PNG format online.",
      aboutTitle: "What is TIFF to PNG Converter?",
      aboutText:
        "This tool allows you to convert TIFF images into PNG format directly in your browser. PNG is useful when you want an editable and widely supported image format.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a TIFF image",
        "Check the preview",
        "Click convert",
        "Download PNG",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Does quality decrease?",
          answer: "In normal use, the image can be saved as PNG without major visible quality loss.",
        },
        {
          question: "Do I need to install?",
          answer: "No, everything works in your browser.",
        },
        {
          question: "Can I convert without uploading?",
          answer: "Yes. This tool works entirely in your browser.",
        },
      ],
      relatedTools: [
        { name: "TIFF to JPG", href: "/en/tools/tiff-to-jpg" },
        { name: "BMP to PNG", href: "/en/tools/bmp-to-png" },
        { name: "WebP to PNG", href: "/en/tools/webp-to-png" },
      ],
    },
    ui: {
      emptyTitle: "Upload TIFF image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert TIFF to PNG",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select a TIFF file.",
    },
  },
};

export default function TiffToPngTool({ locale }: Props) {
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

    const isTiff =
      file.type === "image/tiff" || /\.tiff?$/i.test(file.name);

    if (!isTiff) {
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
        return;
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) {
          setLoading(false);
          setStatus("Error");
          return;
        }

        const a = document.createElement("a");
        const downloadUrl = URL.createObjectURL(blob);

        a.href = downloadUrl;
        a.download = file.name.replace(/\.tiff?$/i, "") + ".png";
        a.click();

        setLoading(false);
        setStatus(ui.done);

        URL.revokeObjectURL(downloadUrl);
        URL.revokeObjectURL(url);
      }, "image/png");
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
        accept="image/tiff,.tif,.tiff"
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
          <PreviewImage
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
    </>
  );
}


