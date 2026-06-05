"use client";

import StandardImageConversionTool from "@/src/components/StandardImageConversionTool";
import type { StandardImageConversionContent } from "@/src/lib/conversion-content";

type Locale = "ja" | "en";

const content: Record<Locale, StandardImageConversionContent> = {
  ja: {
    page: {
      title: "GIFをJPGに変換",
      description: "GIF画像をJPG形式に変換できる無料オンラインツールです。",
      aboutTitle: "GIFをJPGに変換とは？",
      aboutText:
        "GIF画像をJPG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。JPG形式にすることで、一般的な画像形式として保存や共有がしやすくなります。",
      stepsTitle: "使い方",
      steps: [
        "GIF画像をアップロードします",
        "プレビューを確認します",
        "「GIFをJPGに変換」ボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "アニメーションGIFも変換できますか？",
          answer: "このツールではGIFの先頭フレームをJPG画像として保存します。",
        },
        {
          question: "透過はどうなりますか？",
          answer: "JPGは透過に対応していないため、透明部分は白背景として変換されます。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでGIFをJPGに変換できます。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。このツールはブラウザ上で処理されるため、画像ファイルは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "GIFをPNGに変換", href: "/tools/gif-to-png" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "WebPをJPGに変換", href: "/tools/webp-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "GIF画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "エラー: GIFからJPGへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) => `完了: ${baseName}.jpg をダウンロードしました。`,
      invalidFileError: "エラー: GIFファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "GIFをJPGに変換",
      convertingButton: "変換中...",
    },
  },
  en: {
    page: {
      title: "GIF to JPG Converter",
      description: "Convert GIF images to JPG format online for free.",
      aboutTitle: "What is GIF to JPG Converter?",
      aboutText:
        "This free GIF to JPG converter lets you convert images directly in your browser. No upload is required, so the process is fast, secure, and easy to use. JPG is useful when you want a widely supported image format for saving and sharing.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a GIF image",
        "Check the preview",
        "Click the Convert GIF to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can animated GIFs be converted?",
          answer: "This tool converts the first frame of the GIF into a JPG image.",
        },
        {
          question: "What happens to transparency?",
          answer: "JPG does not support transparency, so transparent areas are converted to a white background.",
        },
        {
          question: "Do I need to install anything?",
          answer: "No. You can convert GIF to JPG directly in your browser without installing any software.",
        },
        {
          question: "Can I convert without uploading?",
          answer:
            "Yes. This tool works entirely in your browser, so your image files are not uploaded to any external server.",
        },
      ],
      relatedTools: [
        { name: "GIF to PNG", href: "/en/tools/gif-to-png" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "WebP to JPG", href: "/en/tools/webp-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a GIF image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert GIF to JPG.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) => `Done: ${baseName}.jpg has been downloaded.`,
      invalidFileError: "Error: Please select a GIF file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert GIF to JPG",
      convertingButton: "Converting...",
    },
  },
};

export default function GifToJpgTool({ locale }: { locale: Locale }) {
  return (
    <StandardImageConversionTool
      content={content[locale]}
      accept="image/gif,.gif"
      outputExtension="jpg"
      outputType="image/jpeg"
      fillBackground="#ffffff"
      quality={0.92}
      isValidFile={(file) => file.type === "image/gif" || /\.gif$/i.test(file.name)}
    />
  );
}
