import type { ResizeImageContent, ToolLocale } from "./types";

export const svgToPngContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "SVG to PNG",
      description: "SVG画像をPNG形式に変換できる無料ツールです。",
      aboutTitle: "SVG to PNGとは？",
      aboutText:
        "SVG画像をPNG形式へ変換できる無料ツールです。PNGは一般的な画像形式として扱いやすく、共有や保存にも向いています。",
      stepsTitle: "使い方",
      steps: [
        "SVG画像をアップロードします",
        "Convert to PNGボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "SVGをPNGにするメリットは？",
          answer:
            "PNGは一般的なアプリやSNSなどで扱いやすく、画像としてそのまま共有しやすい形式です。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "SVG to JPG", href: "/tools/svg-to-jpg" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "SVG画像をドラッグ＆ドロップ",

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

      invalidFileError: "エラー: SVG画像を選択してください",
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
      title: "SVG to PNG",
      description: "Convert SVG images to PNG format online for free.",
      aboutTitle: "What is SVG to PNG?",
      aboutText:
        "This free tool converts SVG images into PNG format. PNG is easy to use as a common image format for saving and sharing.",
      stepsTitle: "How to use",
      steps: [
        "Upload an SVG image",
        "Click the Convert to PNG button",
        "Download the converted PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Why convert SVG to PNG?",
          answer:
            "PNG is easier to use in common apps, websites, and social media platforms as a standard image format.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "SVG to JPG", href: "/tools/svg-to-jpg" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "Drag and drop an SVG image",

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

      invalidFileError: "Error: Please select an SVG image",
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