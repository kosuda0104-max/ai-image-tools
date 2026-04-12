"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PreviewImage from "@/components/PreviewImage";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import FAQJsonLd from "@/components/FAQJsonLd";

type Locale = "ja" | "en";

type Props = {
  locale: Locale;
};

const content = {
  ja: {
    page: {
      title: "TIFFをJPGに変換",
      description: "TIFF画像をJPG形式に変換できる無料オンラインツールです。",
      aboutTitle: "TIFFをJPGに変換とは？",
      aboutText:
        "TIFF画像をJPG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。",
      stepsTitle: "使い方",
      steps: [
        "TIFF画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "JPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画質は落ちますか？",
          answer: "JPGは圧縮形式のため多少の劣化があります。",
        },
        {
          question: "インストールは必要？",
          answer: "不要です。ブラウザだけで使えます。",
        },
      ],
      relatedTools: [
        { name: "TIFFをPNGに変換", href: "/tools/tiff-to-png" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "TIFF画像をアップロード",
      button: "TIFFをJPGに変換",
      loading: "変換中...",
      done: "完了しました",
    },
  },
  en: {
    page: {
      title: "TIFF to JPG Converter",
      description: "Convert TIFF images to JPG format online.",
      aboutTitle: "What is TIFF to JPG Converter?",
      aboutText:
        "This tool allows you to convert TIFF images into JPG format directly in your browser.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a TIFF image",
        "Check the preview",
        "Click convert",
        "Download JPG",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Does quality decrease?",
          answer: "JPG is compressed, so slight quality loss may occur.",
        },
        {
          question: "Do I need to install?",
          answer: "No, everything works in your browser.",
        },
      ],
      relatedTools: [
        { name: "TIFF to PNG", href: "/en/tools/tiff-to-png" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "Upload TIFF image",
      button: "Convert TIFF to JPG",
      loading: "Converting...",
      done: "Done",
    },
  },
};

export default function TiffToJpgTool({ locale }: Props) {
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
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return;

        const a = document.createElement("a");
        const downloadUrl = URL.createObjectURL(blob);

        a.href = downloadUrl;
        a.download = file.name.replace(/\.tiff?$/i, "") + ".jpg";
        a.click();

        setLoading(false);
        setStatus(ui.done);

        URL.revokeObjectURL(downloadUrl);
        URL.revokeObjectURL(url);
      }, "image/jpeg");
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
        onFileSelect={setFile}
      />

      {preview && (
        <PreviewImage src={preview} alt={page.title} className="max-h-80" />
      )}

      <PrimaryButton onClick={convert} disabled={!file || loading}>
        {loading ? ui.loading : ui.button}
      </PrimaryButton>

      <StatusMessage status={status} />
    </ToolPageLayout>
    </>
  );
}


