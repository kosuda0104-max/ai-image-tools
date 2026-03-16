import type { ResizeImageContent, ToolLocale } from "./types";

export const flipImageContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "Flip Image",
      description: "画像を左右反転・上下反転できる無料ツールです。",
      aboutTitle: "Flip Imageとは？",
      aboutText:
        "画像を左右または上下に反転して保存できる無料ツールです。鏡像を作りたい時や、向きを調整したい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "画像をアップロードします",
        "反転方向を選択します",
        "Flip Imageボタンを押します",
        "反転後の画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "どんな反転ができますか？",
          answer:
            "左右反転と上下反転に対応しています。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "Rotate Image", href: "/tools/rotate-image" },
        { name: "Crop Image", href: "/tools/crop-image" },
        { name: "Resize Image", href: "/tools/resize-image" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ",

      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",

      widthLabel: "反転方向",
      heightLabel: "未使用",
      widthPlaceholder: "",
      heightPlaceholder: "",

      keepAspectRatioLabel: "反転方向を選択",
      keepAspectRatioHint:
        "左右反転または上下反転を選んで画像を反転できます。",

      resizeButton: "Flip Image",
      resizingButton: "反転中...",
      resizingStatus: "反転中...",

      invalidFileError: "エラー: 画像ファイルを選択してください",
      validationNoSize: "エラー: 反転方向を選択してください",
      validationInvalidSize: "エラー: 正しい反転方向を選択してください",
      validationInvalidResultSize: "エラー: 正しい反転方向を選択してください",

      canvasInitError: "エラー: canvasの初期化に失敗しました",
      resizeError: "エラー: 画像の反転に失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",

      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",

      successMessage: "完了！ 反転後の画像を保存しました",
    },
  },

  en: {
    page: {
      title: "Flip Image",
      description: "A free online tool to flip images horizontally or vertically.",
      aboutTitle: "What is Flip Image?",
      aboutText:
        "This free tool lets you flip images horizontally or vertically and save the result. It is useful when creating mirrored images or adjusting orientation.",
      stepsTitle: "How to use",
      steps: [
        "Upload an image.",
        "Choose a flip direction.",
        "Click the Flip Image button.",
        "Download the flipped image.",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What kinds of flipping are supported?",
          answer:
            "You can flip images horizontally or vertically.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "Rotate Image", href: "/tools/rotate-image" },
        { name: "Crop Image", href: "/tools/crop-image" },
        { name: "Resize Image", href: "/tools/resize-image" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop your image",

      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",

      widthLabel: "Flip direction",
      heightLabel: "Unused",
      widthPlaceholder: "",
      heightPlaceholder: "",

      keepAspectRatioLabel: "Choose a flip direction",
      keepAspectRatioHint:
        "Select horizontal or vertical to flip the image.",

      resizeButton: "Flip Image",
      resizingButton: "Flipping image...",
      resizingStatus: "Flipping image...",

      invalidFileError: "Error: Please select an image file",
      validationNoSize: "Error: Please choose a flip direction",
      validationInvalidSize: "Error: Please choose a valid flip direction",
      validationInvalidResultSize: "Error: Please choose a valid flip direction",

      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to flip the image",
      loadError: "Error: Failed to load the image",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! Saved the flipped image",
    },
  },
};