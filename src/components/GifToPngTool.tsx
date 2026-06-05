"use client";

import StandardImageConversionTool from "@/src/components/StandardImageConversionTool";
import type { StandardImageConversionContent } from "@/src/lib/conversion-content";

type Locale = "ja" | "en";

const content: Record<Locale, StandardImageConversionContent> = {
  ja: {
    page: {
      title: "GIFをPNGに変換",
      description: "GIF画像をPNG形式に変換できる無料オンラインツールです。",
      aboutTitle: "GIFをPNGに変換とは？",
      aboutText:
        "GIF画像をPNG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。PNG形式にすることで、編集しやすく扱いやすい画像として保存できます。",
      stepsTitle: "使い方",
      steps: [
        "GIF画像をアップロードします",
        "プレビューを確認します",
        "「GIFをPNGに変換」ボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "アニメーションGIFも変換できますか？",
          answer: "このツールではGIFの先頭フレームをPNG画像として保存します。",
        },
        {
          question: "透過は維持されますか？",
          answer: "GIFに透過がある場合、PNG変換後も透過を維持できることがあります。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでGIFをPNGに変換できます。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。このツールはブラウザ上で処理されるため、画像ファイルは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "GIFをJPGに変換", href: "/tools/gif-to-jpg" },
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" },
        { name: "WebPをPNGに変換", href: "/tools/webp-to-png" },
      ],
    },
    ui: {
      emptyTitle: "GIF画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "エラー: GIFからPNGへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) => `完了: ${baseName}.png をダウンロードしました。`,
      invalidFileError: "エラー: GIFファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "GIFをPNGに変換",
      convertingButton: "変換中...",
    },
  },
  en: {
    page: {
      title: "GIF to PNG Converter",
      description: "Convert GIF images to PNG format online for free.",
      aboutTitle: "What is GIF to PNG Converter?",
      aboutText:
        "This free GIF to PNG converter lets you convert images directly in your browser. No upload is required, so the process is fast, secure, and easy to use. PNG is useful when you want an editable and widely supported image format.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a GIF image",
        "Check the preview",
        "Click the Convert GIF to PNG button",
        "Download the converted PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can animated GIFs be converted?",
          answer: "This tool converts the first frame of the GIF into a PNG image.",
        },
        {
          question: "Will transparency be preserved?",
          answer: "If the original GIF has transparency, the converted PNG can preserve it in many cases.",
        },
        {
          question: "Do I need to install anything?",
          answer: "No. You can convert GIF to PNG directly in your browser without installing any software.",
        },
        {
          question: "Can I convert without uploading?",
          answer:
            "Yes. This tool works entirely in your browser, so your image files are not uploaded to any external server.",
        },
      ],
      relatedTools: [
        { name: "GIF to JPG", href: "/en/tools/gif-to-jpg" },
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
        { name: "WebP to PNG", href: "/en/tools/webp-to-png" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a GIF image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert GIF to PNG.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) => `Done: ${baseName}.png has been downloaded.`,
      invalidFileError: "Error: Please select a GIF file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert GIF to PNG",
      convertingButton: "Converting...",
    },
  },
};

export default function GifToPngTool({ locale }: { locale: Locale }) {
  return (
    <StandardImageConversionTool
      content={content[locale]}
      accept="image/gif,.gif"
      outputExtension="png"
      outputType="image/png"
      isValidFile={(file) => file.type === "image/gif" || /\.gif$/i.test(file.name)}
    />
  );
}
