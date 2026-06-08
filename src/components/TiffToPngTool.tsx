"use client";

import SimpleImageConversionTool, {
  type SimpleImageConversionContent,
} from "@/src/components/SimpleImageConversionTool";
import { tiffToPngFile } from "@/src/lib/tiff-decode";

type Locale = "ja" | "en";

const content: Record<Locale, SimpleImageConversionContent> = {
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
      error: "変換に失敗しました。TIFFファイルが破損していないかご確認ください。",
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
      error: "Conversion failed. Please check that the TIFF file is not corrupted.",
    },
  },
};

export default function TiffToPngTool({ locale }: { locale: Locale }) {
  return (
    <SimpleImageConversionTool
      content={content[locale]}
      accept="image/tiff,.tif,.tiff"
      outputExtension="png"
      outputType="image/png"
      isValidFile={(file) => file.type === "image/tiff" || /\.tiff?$/i.test(file.name)}
      preprocess={tiffToPngFile}
    />
  );
}
