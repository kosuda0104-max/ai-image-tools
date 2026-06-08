"use client";

import SimpleImageConversionTool, {
  type SimpleImageConversionContent,
} from "@/src/components/SimpleImageConversionTool";
import { tiffToPngFile } from "@/src/lib/tiff-decode";

type Locale = "ja" | "en";

const content: Record<Locale, SimpleImageConversionContent> = {
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
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "TIFFをJPGに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "TIFFファイルを選択してください。",
      error: "変換に失敗しました。TIFFファイルが破損していないかご確認ください。",
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
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert TIFF to JPG",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select a TIFF file.",
      error: "Conversion failed. Please check that the TIFF file is not corrupted.",
    },
  },
};

export default function TiffToJpgTool({ locale }: { locale: Locale }) {
  return (
    <SimpleImageConversionTool
      content={content[locale]}
      accept="image/tiff,.tif,.tiff"
      outputExtension="jpg"
      outputType="image/jpeg"
      fillBackground="#ffffff"
      quality={0.92}
      isValidFile={(file) => file.type === "image/tiff" || /\.tiff?$/i.test(file.name)}
      preprocess={tiffToPngFile}
    />
  );
}
