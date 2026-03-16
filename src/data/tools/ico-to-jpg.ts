import type { ResizeImageContent, ToolLocale } from "./types";

export const icoToJpgContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "ICO to JPG",
      description: "ICO画像をJPG形式に変換できる無料ツールです。",
      aboutTitle: "ICO to JPGとは？",
      aboutText:
        "ICO画像をJPG形式へ変換できる無料ツールです。JPGは共有しやすく、一般的な画像形式として使いやすいです。",
      stepsTitle: "使い方",
      steps: [
        "ICO画像をアップロードします",
        "Convert to JPGボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "ICOをJPGにするメリットは？",
          answer:
            "JPGは一般的な画像形式として多くのアプリやサービスで扱いやすく、共有もしやすいです。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "ICO to PNG", href: "/tools/ico-to-png" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "ICO画像をドラッグ＆ドロップ",

      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",

      widthLabel: "未使用",
      heightLabel: "未使用",
      widthPlaceholder: "",
      heightPlaceholder: "",

      keepAspectRatioLabel: "変換",
      keepAspectRatioHint: "",

      resizeButton: "Convert to JPG",
      resizingButton: "JPGに変換中...",
      resizingStatus: "JPGに変換中...",

      invalidFileError: "エラー: ICO画像を選択してください",
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
      title: "ICO to JPG",
      description: "Convert ICO images to JPG format online for free.",
      aboutTitle: "What is ICO to JPG?",
      aboutText:
        "This free tool converts ICO images into JPG format. JPG is easy to share and widely used as a standard image format.",
      stepsTitle: "How to use",
      steps: [
        "Upload an ICO image",
        "Click the Convert to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Why convert ICO to JPG?",
          answer:
            "JPG is widely supported by many apps and services, making it convenient for sharing and everyday use.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "ICO to PNG", href: "/tools/ico-to-png" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "Drag and drop an ICO image",

      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",

      widthLabel: "Unused",
      heightLabel: "Unused",
      widthPlaceholder: "",
      heightPlaceholder: "",

      keepAspectRatioLabel: "Convert",
      keepAspectRatioHint: "",

      resizeButton: "Convert to JPG",
      resizingButton: "Converting to JPG...",
      resizingStatus: "Converting to JPG...",

      invalidFileError: "Error: Please select an ICO image",
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