import type { ResizeImageContent, ToolLocale } from "./types";

export const avifToJpgContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "AVIF to JPG",
      description: "AVIF画像をJPG形式に変換できる無料ツールです。",
      aboutTitle: "AVIF to JPGとは？",
      aboutText:
        "AVIF画像をJPG形式へ変換できる無料ツールです。JPGは互換性が高く、多くのアプリやサービスで使いやすい形式です。",
      stepsTitle: "使い方",
      steps: [
        "AVIF画像をアップロードします",
        "Convert to JPGボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "AVIFをJPGにするメリットは？",
          answer:
            "JPGは幅広い環境で利用でき、共有や保存もしやすい一般的な画像形式です。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理されるため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "AVIF to PNG", href: "/tools/avif-to-png" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "AVIF画像をドラッグ＆ドロップ",

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

      invalidFileError: "エラー: AVIF画像を選択してください",

      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "エラー: canvasの初期化に失敗しました",
      resizeError: "エラー: JPGへの変換に失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",

      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",

      successMessage: "完了！ JPG画像を保存しました",
    },
  },

  en: {
    page: {
      title: "AVIF to JPG",
      description: "Convert AVIF images to JPG format online for free.",
      aboutTitle: "What is AVIF to JPG?",
      aboutText:
        "This free tool converts AVIF images into JPG format. JPG is highly compatible and easy to use with many apps and services.",
      stepsTitle: "How to use",
      steps: [
        "Upload an AVIF image",
        "Click the Convert to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Why convert AVIF to JPG?",
          answer:
            "JPG is a common image format that is easy to share, store, and use in many environments.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to any server.",
        },
      ],
      relatedTools: [
        { name: "AVIF to PNG", href: "/tools/avif-to-png" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "Drag and drop an AVIF image",

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

      invalidFileError: "Error: Please select an AVIF image",

      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to convert to JPG",
      loadError: "Error: Failed to load the image",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! JPG image saved",
    },
  },
};