import type { ResizeImageContent, ToolLocale } from "./types";

export const gifToJpgContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "GIF to JPG",
      description: "GIF画像をJPG形式に変換できる無料ツールです。",
      aboutTitle: "GIF to JPGとは？",
      aboutText:
        "GIF画像をJPG形式へ変換できる無料ツールです。静止画像として保存したい時や、共有しやすいJPG形式に変えたい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "GIF画像をアップロードします",
        "Convert to JPGボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "アニメーションGIFも変換できますか？",
          answer:
            "このツールでは基本的に先頭フレームをJPG画像として保存します。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "GIF to PNG", href: "/tools/gif-to-png" },
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

      resizeButton: "Convert to JPG",
      resizingButton: "JPGに変換中...",
      resizingStatus: "JPGに変換中...",

      invalidFileError: "エラー: GIF画像を選択してください",
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
      title: "GIF to JPG",
      description: "Convert GIF images to JPG format online for free.",
      aboutTitle: "What is GIF to JPG?",
      aboutText:
        "This free tool converts GIF images into JPG format. It is useful when you want to save a still image or share it more easily as a JPG file.",
      stepsTitle: "How to use",
      steps: [
        "Upload a GIF image",
        "Click the Convert to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can animated GIFs be converted?",
          answer:
            "This tool generally saves the first frame of the GIF as a JPG image.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "GIF to PNG", href: "/tools/gif-to-png" },
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

      resizeButton: "Convert to JPG",
      resizingButton: "Converting to JPG...",
      resizingStatus: "Converting to JPG...",

      invalidFileError: "Error: Please select a GIF image",
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