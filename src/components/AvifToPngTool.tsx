"use client";

import StandardImageConversionTool from "@/src/components/StandardImageConversionTool";
import type { StandardImageConversionContent } from "@/src/lib/conversion-content";

type Locale = "ja" | "en";

const content: Record<Locale, StandardImageConversionContent> = {
  ja: {
    page: {
      title: "AVIFをPNGに変換",
      description: "AVIF画像をPNG形式に変換できる無料オンラインツールです。",
      aboutTitle: "AVIFをPNGに変換とは？",
      aboutText:
        "AVIF画像をPNG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。PNG形式にすることで、編集しやすく扱いやすい画像として保存できます。",
      stepsTitle: "使い方",
      steps: [
        "AVIF画像をアップロードします",
        "プレビューを確認します",
        "「AVIFをPNGに変換」ボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "透過は維持されますか？",
          answer: "元のAVIF画像に透過がある場合、PNG変換後も透過を維持できることがあります。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでAVIFをPNGに変換できます。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。ブラウザ上で処理するため、画像ファイルは外部サーバーにアップロードされません。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。このツールはブラウザ上で処理されるため、画像ファイルは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "AVIFをJPGに変換", href: "/tools/avif-to-jpg" },
        { name: "WebPをPNGに変換", href: "/tools/webp-to-png" },
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "AVIF画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "エラー: AVIFからPNGへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) => `完了: ${baseName}.png をダウンロードしました。`,
      invalidFileError: "エラー: AVIFファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "AVIFをPNGに変換",
      convertingButton: "変換中...",
    },
  },
  en: {
    page: {
      title: "AVIF to PNG Converter",
      description: "Convert AVIF images to PNG format online for free.",
      aboutTitle: "What is AVIF to PNG Converter?",
      aboutText:
        "This free AVIF to PNG converter lets you convert images directly in your browser. No upload is required, so the process is fast, secure, and easy to use. PNG is useful when you want an editable and widely supported image format.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an AVIF image",
        "Check the preview",
        "Click the Convert AVIF to PNG button",
        "Download the converted PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will transparency be preserved?",
          answer: "If the original AVIF image has transparency, the converted PNG can preserve it in many cases.",
        },
        {
          question: "Do I need to install anything?",
          answer: "No. You can convert AVIF to PNG directly in your browser without installing any software.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. The conversion runs in your browser, so your files are not uploaded to any external server.",
        },
        {
          question: "Can I convert without uploading?",
          answer:
            "Yes. This tool works entirely in your browser, so your image files are not uploaded to any external server.",
        },
      ],
      relatedTools: [
        { name: "AVIF to JPG", href: "/en/tools/avif-to-jpg" },
        { name: "WebP to PNG", href: "/en/tools/webp-to-png" },
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop an AVIF image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert AVIF to PNG.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) => `Done: ${baseName}.png has been downloaded.`,
      invalidFileError: "Error: Please select an AVIF file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert AVIF to PNG",
      convertingButton: "Converting...",
    },
  },
};

export default function AvifToPngTool({ locale }: { locale: Locale }) {
  return (
    <StandardImageConversionTool
      content={content[locale]}
      accept="image/avif,.avif"
      outputExtension="png"
      outputType="image/png"
      isValidFile={(file) => file.type === "image/avif" || /\.avif$/i.test(file.name)}
    />
  );
}
