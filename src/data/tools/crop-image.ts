import type { ResizeImageContent, ToolLocale } from "./types";

export const cropImageContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "Crop Image",
      description: "画像を切り抜ける無料ツールです。",
      aboutTitle: "Crop Imageとは？",
      aboutText:
        "画像の一部だけを切り抜いて保存できる無料ツールです。不要な余白を削除したい時や、SNS用に構図を整えたい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "画像ファイルをアップロードします",
        "切り抜き位置とサイズを入力します",
        "Crop Imageボタンを押します",
        "切り抜き後の画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "どの画像形式に対応していますか？",
          answer: "JPG、PNG、WebPなど主要な画像形式に対応しています。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "Resize Image", href: "/tools/resize-image" },
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Rotate Image", href: "/tools/rotate-image" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ",

      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",

      widthLabel: "幅(px)",
      heightLabel: "高さ(px)",
      widthPlaceholder: "例: 300",
      heightPlaceholder: "例: 300",

      keepAspectRatioLabel: "開始位置とサイズを入力",
      keepAspectRatioHint:
        "開始X・開始Y・幅・高さを入力して、切り抜く範囲を指定します。",

      resizeButton: "Crop Image",
      resizingButton: "切り抜き中...",
      resizingStatus: "切り抜き中...",

      invalidFileError: "エラー: 画像ファイルを選択してください",
      validationNoSize: "エラー: 幅と高さを入力してください",
      validationInvalidSize:
        "エラー: 幅と高さには1以上の数値を入力してください",
      validationInvalidResultSize: "エラー: 切り抜きサイズが不正です",

      canvasInitError: "エラー: canvasの初期化に失敗しました",
      resizeError: "エラー: 画像の切り抜きに失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",

      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",

      successMessage: "完了！ 切り抜き後の画像を保存しました",
    },
  },

  en: {
    page: {
      title: "Crop Image",
      description: "A free online tool to crop images.",
      aboutTitle: "What is Crop Image?",
      aboutText:
        "This free tool lets you crop part of an image and save only the area you need. It is useful for removing extra margins or adjusting composition for social media.",
      stepsTitle: "How to use",
      steps: [
        "Upload an image file.",
        "Enter the crop position and size.",
        "Click the Crop Image button.",
        "Download the cropped image.",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Which image formats are supported?",
          answer:
            "Major image formats such as JPG, PNG, and WebP are supported.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "Resize Image", href: "/tools/resize-image" },
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Rotate Image", href: "/tools/rotate-image" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop your image",

      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",

      widthLabel: "Width (px)",
      heightLabel: "Height (px)",
      widthPlaceholder: "Example: 300",
      heightPlaceholder: "Example: 300",

      keepAspectRatioLabel: "Enter crop position and size",
      keepAspectRatioHint:
        "Enter start X, start Y, width, and height to define the crop area.",

      resizeButton: "Crop Image",
      resizingButton: "Cropping image...",
      resizingStatus: "Cropping image...",

      invalidFileError: "Error: Please select an image file",
      validationNoSize: "Error: Please enter width and height",
      validationInvalidSize:
        "Error: Width and height must be numbers greater than 0",
      validationInvalidResultSize: "Error: Invalid crop size",

      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to crop the image",
      loadError: "Error: Failed to load the image",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! Saved the cropped image",
    },
  },
};