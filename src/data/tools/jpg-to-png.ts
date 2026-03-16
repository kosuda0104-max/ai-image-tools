import type { JpgToPngContent, ToolLocale } from "./types";

export const jpgToPngContent: Record<ToolLocale, JpgToPngContent> = {
  ja: {
    page: {
      title: "JPG to PNG",
      description: "JPG画像をPNG形式に変換できる無料ツールです。",
      aboutTitle: "JPG to PNGとは？",
      aboutText:
        "JPG画像をPNG形式へ変換できる無料ツールです。PNGは劣化しにくく、画像編集や再保存にも向いています。",
      stepsTitle: "使い方",
      steps: [
        "JPG画像をアップロードします",
        "Convert to PNGボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "JPGとPNGの違いは？",
          answer:
            "JPGは写真向きで軽量化しやすく、PNGは劣化しにくく文字や図の保存にも向いています。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to WebP", href: "/tools/jpg-to-webp" },
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Resize Image", href: "/tools/resize-image" },
      ],
    },
    ui: {
      emptyTitle: "JPG画像をドラッグ＆ドロップ",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "Convert to PNG",
      convertingButton: "PNGに変換中...",
      convertingStatus: "PNGに変換中...",
      invalidFileError: "エラー: JPG画像を選択してください",
      canvasInitError: "エラー: canvasの初期化に失敗しました",
      convertError: "エラー: PNGへの変換に失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: (fileName) => `完了！ ${fileName}.png を保存しました`,
    },
  },

  en: {
    page: {
      title: "JPG to PNG",
      description: "A free online tool to convert JPG images to PNG format.",
      aboutTitle: "What is JPG to PNG?",
      aboutText:
        "This free tool converts JPG images to PNG format. PNG is lossless and suitable for editing and repeated saves.",
      stepsTitle: "How to use",
      steps: [
        "Upload a JPG image.",
        "Click the Convert to PNG button.",
        "Download the converted PNG image.",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What is the difference between JPG and PNG?",
          answer:
            "JPG is great for photos and smaller file sizes, while PNG is lossless and better for text, graphics, and image editing.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to WebP", href: "/tools/jpg-to-webp" },
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Resize Image", href: "/tools/resize-image" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop your JPG image",
      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert to PNG",
      convertingButton: "Converting to PNG...",
      convertingStatus: "Converting to PNG...",
      invalidFileError: "Error: Please select a JPG image",
      canvasInitError: "Error: Failed to initialize canvas",
      convertError: "Error: Failed to convert to PNG",
      loadError: "Error: Failed to load the image",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: (fileName) => `Done! Saved ${fileName}.png`,
    },
  },
};