import type { ResizeImageContent, ToolLocale } from "./types";

export const heicToJpgContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "HEIC to JPG",
      description: "HEIC画像をJPG形式に変換できる無料ツールです。",
      aboutTitle: "HEIC to JPGとは？",
      aboutText:
        "HEIC画像をJPG形式へ変換できる無料ツールです。iPhoneで撮影したHEIC画像を、より互換性の高いJPG形式に変換したい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "HEIC画像をアップロードします",
        "Convert to JPGボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "HEICとは何ですか？",
          answer:
            "HEICは主にiPhoneなどで使われる画像形式で、高画質のままファイルサイズを抑えやすい形式です。",
        },
        {
          question: "なぜJPGに変換するのですか？",
          answer:
            "JPGは対応アプリやサービスが多く、共有や編集がしやすい一般的な画像形式です。",
        },
      ],
      relatedTools: [
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Resize Image", href: "/tools/resize-image" },
      ],
    },

    ui: {
      emptyTitle: "HEIC画像をドラッグ＆ドロップ",

      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",

      widthLabel: "",
      heightLabel: "",
      widthPlaceholder: "",
      heightPlaceholder: "",

      keepAspectRatioLabel: "",
      keepAspectRatioHint: "",

      resizeButton: "Convert to JPG",
      resizingButton: "JPGに変換中...",
      resizingStatus: "JPGに変換中...",

      invalidFileError: "エラー: HEIC画像を選択してください",

      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "エラー: 変換ライブラリの初期化に失敗しました",
      resizeError: "エラー: JPGへの変換に失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",

      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",

      successMessage: "完了！ JPG画像を保存しました",
    },
  },

  en: {
    page: {
      title: "HEIC to JPG",
      description: "Convert HEIC images to JPG format online for free.",
      aboutTitle: "What is HEIC to JPG?",
      aboutText:
        "This free tool converts HEIC images into JPG format. It is useful when you want to convert iPhone HEIC photos into a more compatible JPG format.",
      stepsTitle: "How to use",
      steps: [
        "Upload a HEIC image",
        "Click the Convert to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What is HEIC?",
          answer:
            "HEIC is an image format commonly used on iPhones and other Apple devices, designed to keep good quality with smaller file sizes.",
        },
        {
          question: "Why convert HEIC to JPG?",
          answer:
            "JPG is widely supported by many apps and services, making it easier to share and edit.",
        },
      ],
      relatedTools: [
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Resize Image", href: "/tools/resize-image" },
      ],
    },

    ui: {
      emptyTitle: "Drag and drop a HEIC image",

      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",

      widthLabel: "",
      heightLabel: "",
      widthPlaceholder: "",
      heightPlaceholder: "",

      keepAspectRatioLabel: "",
      keepAspectRatioHint: "",

      resizeButton: "Convert to JPG",
      resizingButton: "Converting to JPG...",
      resizingStatus: "Converting to JPG...",

      invalidFileError: "Error: Please select a HEIC image",

      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "Error: Failed to initialize conversion library",
      resizeError: "Error: Failed to convert to JPG",
      loadError: "Error: Failed to load the image",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! JPG image saved",
    },
  },
};