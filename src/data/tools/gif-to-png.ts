import type { ResizeImageContent, ToolLocale } from "./types";

export const gifToPngContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "GIF to PNG",
      description: "GIF画像をPNG形式に変換できる無料ツールです。",
      aboutTitle: "GIF to PNGとは？",
      aboutText:
        "GIF画像をPNG形式へ変換できる無料ツールです。静止画像として保存したい時や、編集しやすいPNG形式に変えたい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "GIF画像をアップロードします",
        "Convert to PNGボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "アニメーションGIFも変換できますか？",
          answer:
            "このツールでは基本的に先頭フレームをPNG画像として保存します。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "GIF to JPG", href: "/tools/gif-to-jpg" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "GIF画像をドラッグ＆ドロップ",

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

      invalidFileError: "エラー: GIF画像を選択してください",
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
      title: "GIF to PNG",
      description: "Convert GIF images to PNG format online for free.",
      aboutTitle: "What is GIF to PNG?",
      aboutText:
        "This free tool converts GIF images into PNG format. It is useful when you want to save a still image or edit the image more easily in PNG format.",
      stepsTitle: "How to use",
      steps: [
        "Upload a GIF image",
        "Click the Convert to PNG button",
        "Download the converted PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can animated GIFs be converted?",
          answer:
            "This tool generally saves the first frame of the GIF as a PNG image.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "GIF to JPG", href: "/tools/gif-to-jpg" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "Drag and drop a GIF image",

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

      invalidFileError: "Error: Please select a GIF image",
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