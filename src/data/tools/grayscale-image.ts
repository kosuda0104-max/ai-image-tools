import type { ResizeImageContent, ToolLocale } from "./types";

export const grayscaleImageContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "Grayscale Image",
      description: "画像を白黒（グレースケール）に変換できる無料ツールです。",
      aboutTitle: "Grayscale Imageとは？",
      aboutText:
        "画像を白黒のグレースケールに変換して保存できる無料ツールです。雰囲気を変えたい時や、モノクロ表現を作りたい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "画像をアップロードします",
        "Grayscale Imageボタンを押します",
        "白黒に変換した画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "カラー画像も白黒にできますか？",
          answer:
            "はい。JPG、PNG、WebPなどの画像を白黒のグレースケールに変換できます。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Resize Image", href: "/tools/resize-image" },
        { name: "Crop Image", href: "/tools/crop-image" },
        { name: "Rotate Image", href: "/tools/rotate-image" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ",

      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",

      widthLabel: "白黒変換",
      heightLabel: "未使用",
      widthPlaceholder: "",
      heightPlaceholder: "",

      keepAspectRatioLabel: "白黒画像を作成",
      keepAspectRatioHint:
        "ボタンを押すと、画像をグレースケールに変換して保存できます。",

      resizeButton: "Grayscale Image",
      resizingButton: "白黒に変換中...",
      resizingStatus: "白黒に変換中...",

      invalidFileError: "エラー: 画像ファイルを選択してください",
      validationNoSize: "エラー: 画像ファイルを選択してください",
      validationInvalidSize: "エラー: 正しい画像を選択してください",
      validationInvalidResultSize: "エラー: 正しい画像を選択してください",

      canvasInitError: "エラー: canvasの初期化に失敗しました",
      resizeError: "エラー: 白黒変換に失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",

      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",

      successMessage: "完了！ 白黒画像を保存しました",
    },
  },

  en: {
    page: {
      title: "Grayscale Image",
      description: "A free online tool to convert images to grayscale.",
      aboutTitle: "What is Grayscale Image?",
      aboutText:
        "This free tool converts images to black and white grayscale and lets you save the result. It is useful when you want a monochrome look or a different visual style.",
      stepsTitle: "How to use",
      steps: [
        "Upload an image.",
        "Click the Grayscale Image button.",
        "Download the grayscale image.",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can I convert color images to black and white?",
          answer:
            "Yes. You can convert JPG, PNG, WebP, and other common image formats to grayscale.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Resize Image", href: "/tools/resize-image" },
        { name: "Crop Image", href: "/tools/crop-image" },
        { name: "Rotate Image", href: "/tools/rotate-image" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop your image",

      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",

      widthLabel: "Grayscale conversion",
      heightLabel: "Unused",
      widthPlaceholder: "",
      heightPlaceholder: "",

      keepAspectRatioLabel: "Create grayscale image",
      keepAspectRatioHint:
        "Click the button to convert the image to grayscale and save it.",

      resizeButton: "Grayscale Image",
      resizingButton: "Converting to grayscale...",
      resizingStatus: "Converting to grayscale...",

      invalidFileError: "Error: Please select an image file",
      validationNoSize: "Error: Please select an image file",
      validationInvalidSize: "Error: Please select a valid image",
      validationInvalidResultSize: "Error: Please select a valid image",

      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to convert the image to grayscale",
      loadError: "Error: Failed to load the image",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! Saved the grayscale image",
    },
  },
};