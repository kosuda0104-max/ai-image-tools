"use client";

import StandardImageConversionTool from "@/src/components/StandardImageConversionTool";
import type { StandardImageConversionContent } from "@/src/lib/conversion-content";

type Locale = "ja" | "en";

const content: Record<Locale, StandardImageConversionContent> = {
  ja: {
    page: {
      title: "AVIFをJPGに変換",
      description: "AVIF画像をJPG形式に変換できる無料オンラインツールです。",
      aboutTitle: "AVIFをJPGに変換とは？",
      aboutText:
        "AVIF画像をJPG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。JPG形式にすることで、より多くの環境で使いやすい画像として保存できます。",
      stepsTitle: "使い方",
      steps: [
        "AVIF画像をアップロードします",
        "プレビューを確認します",
        "「AVIFをJPGに変換」ボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "透過はどうなりますか？",
          answer: "JPGは透過に対応していないため、透明部分は白背景として変換されます。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでAVIFをJPGに変換できます。",
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
        { name: "AVIFをPNGに変換", href: "/tools/avif-to-png" },
        { name: "WebPをJPGに変換", href: "/tools/webp-to-jpg" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "AVIF画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "エラー: AVIFからJPGへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) => `完了: ${baseName}.jpg をダウンロードしました。`,
      invalidFileError: "エラー: AVIFファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "AVIFをJPGに変換",
      convertingButton: "変換中...",
    },
  },
  en: {
    page: {
      title: "AVIF to JPG Converter",
      description: "Convert AVIF images to JPG format online for free.",
      aboutTitle: "What is AVIF to JPG Converter?",
      aboutText:
        "This free AVIF to JPG converter lets you convert images directly in your browser. No upload is required, so the process is fast, secure, and easy to use. JPG is useful when you want a more widely supported image format.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an AVIF image",
        "Check the preview",
        "Click the Convert AVIF to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What happens to transparency?",
          answer: "JPG does not support transparency, so transparent areas are converted to a white background.",
        },
        {
          question: "Do I need to install anything?",
          answer: "No. You can convert AVIF to JPG directly in your browser without installing any software.",
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
        { name: "AVIF to PNG", href: "/en/tools/avif-to-png" },
        { name: "WebP to JPG", href: "/en/tools/webp-to-jpg" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop an AVIF image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert AVIF to JPG.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) => `Done: ${baseName}.jpg has been downloaded.`,
      invalidFileError: "Error: Please select an AVIF file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert AVIF to JPG",
      convertingButton: "Converting...",
    },
  },
};

export default function AvifToJpgTool({ locale }: { locale: Locale }) {
  return (
    <StandardImageConversionTool
      content={content[locale]}
      accept="image/avif,.avif"
      outputExtension="jpg"
      outputType="image/jpeg"
      fillBackground="#ffffff"
      quality={0.92}
      isValidFile={(file) => file.type === "image/avif" || /\.avif$/i.test(file.name)}
    />
  );
}
