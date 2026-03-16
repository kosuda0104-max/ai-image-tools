import type { JpgToPngContent, ToolLocale } from "./types";

export const pngToJpgContent: Record<ToolLocale, JpgToPngContent> = {
  ja: {
    page: {
      title: "PNG to JPG",
      description: "PNG画像をJPG形式に変換できる無料ツールです。",
      aboutTitle: "PNG to JPGとは？",
      aboutText:
        "PNG画像をJPG形式へ変換できる無料ツールです。写真や容量を軽くしたい画像をJPGとして保存したいときに便利です。",
      stepsTitle: "使い方",
      steps: [
        "PNG画像をアップロードします",
        "Convert to JPGボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "PNGをJPGにするとどうなりますか？",
          answer:
            "JPGはPNGよりファイルサイズを小さくしやすい一方で、画質は圧縮により少し劣化することがあります。",
        },
        {
          question: "透過はどうなりますか？",
          answer:
            "JPGは透過に対応していないため、透明部分は通常白背景として保存されます。",
        },
      ],
      relatedTools: [
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "PNG to WebP", href: "/tools/png-to-webp" },
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Resize Image", href: "/tools/resize-image" },
      ],
    },
    ui: {
      emptyTitle: "PNG画像をドラッグ＆ドロップ",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "Convert to JPG",
      convertingButton: "JPGに変換中...",
      convertingStatus: "JPGに変換中...",
      invalidFileError: "エラー: PNG画像を選択してください",
      canvasInitError: "エラー: canvasの初期化に失敗しました",
      convertError: "エラー: JPGへの変換に失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: (fileName) => `完了！ ${fileName}.jpg を保存しました`,
    },
  },

  en: {
    page: {
      title: "PNG to JPG",
      description: "A free online tool to convert PNG images to JPG format.",
      aboutTitle: "What is PNG to JPG?",
      aboutText:
        "This free tool converts PNG images to JPG format. It is useful when you want smaller file sizes or need to save an image as JPG.",
      stepsTitle: "How to use",
      steps: [
        "Upload a PNG image.",
        "Click the Convert to JPG button.",
        "Download the converted JPG image.",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What happens when I convert PNG to JPG?",
          answer:
            "JPG usually creates smaller file sizes than PNG, but some image quality may be lost due to compression.",
        },
        {
          question: "What happens to transparency?",
          answer:
            "JPG does not support transparency, so transparent areas are usually saved with a white background.",
        },
      ],
      relatedTools: [
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "PNG to WebP", href: "/tools/png-to-webp" },
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Resize Image", href: "/tools/resize-image" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop your PNG image",
      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert to JPG",
      convertingButton: "Converting to JPG...",
      convertingStatus: "Converting to JPG...",
      invalidFileError: "Error: Please select a PNG image",
      canvasInitError: "Error: Failed to initialize canvas",
      convertError: "Error: Failed to convert to JPG",
      loadError: "Error: Failed to load the image",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: (fileName) => `Done! Saved ${fileName}.jpg`,
    },
  },
};