import type { ResizeImageContent, ToolLocale } from "./types";

export const icoToPngContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "ICO to PNG",
      description: "ICO画像をPNG形式に変換できる無料ツールです。",
      aboutTitle: "ICO to PNGとは？",
      aboutText:
        "ICO画像をPNG形式へ変換できる無料ツールです。PNGは一般的な画像形式として扱いやすく、編集や共有にも向いています。",
      stepsTitle: "使い方",
      steps: [
        "ICO画像をアップロードします",
        "Convert to PNGボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "ICOをPNGにするメリットは？",
          answer:
            "PNGは多くのアプリやWebサービスで扱いやすく、通常の画像として利用しやすい形式です。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "ICO to JPG", href: "/tools/ico-to-jpg" },
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

      resizeButton: "Convert to PNG",
      resizingButton: "PNGに変換中...",
      resizingStatus: "PNGに変換中...",

      invalidFileError: "エラー: ICO画像を選択してください",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "エラー: canvasの初期化に失敗しました",
      resizeError: "エラー: PNGへの変換に失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",

      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",

      successMessage: "完了！ PNG画像を保存しました",
    },
  },

  en: {
    page: {
      title: "ICO to PNG",
      description: "Convert ICO images to PNG format online for free.",
      aboutTitle: "What is ICO to PNG?",
      aboutText:
        "This free tool converts ICO images into PNG format. PNG is easier to use as a general image format for editing and sharing.",
      stepsTitle: "How to use",
      steps: [
        "Upload an ICO image",
        "Click the Convert to PNG button",
        "Download the converted PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Why convert ICO to PNG?",
          answer:
            "PNG is easier to use in many apps and web services, making it more convenient as a normal image format.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "ICO to JPG", href: "/tools/ico-to-jpg" },
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

      resizeButton: "Convert to PNG",
      resizingButton: "Converting to PNG...",
      resizingStatus: "Converting to PNG...",

      invalidFileError: "Error: Please select an ICO image",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to convert to PNG",
      loadError: "Error: Failed to load the image",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! PNG image saved",
    },
  },
};