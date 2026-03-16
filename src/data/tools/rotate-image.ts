import type { ResizeImageContent, ToolLocale } from "./types";

export const rotateImageContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "Rotate Image",
      description: "画像を回転できる無料ツールです。",
      aboutTitle: "Rotate Imageとは？",
      aboutText:
        "画像を90度、180度、270度で回転して保存できる無料ツールです。向きを整えたい時や、写真を見やすくしたい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "画像をアップロードします",
        "回転角度を選択します",
        "Rotate Imageボタンを押します",
        "回転後の画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "どの角度で回転できますか？",
          answer:
            "90度、180度、270度の回転に対応しています。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "Crop Image", href: "/tools/crop-image" },
        { name: "Resize Image", href: "/tools/resize-image" },
        { name: "Flip Image", href: "/tools/flip-image" },
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

      widthLabel: "回転角度",
      heightLabel: "未使用",
      widthPlaceholder: "例: 90",
      heightPlaceholder: "",

      keepAspectRatioLabel: "回転角度を選択",
      keepAspectRatioHint:
        "90度、180度、270度のいずれかを選んで画像を回転できます。",

      resizeButton: "Rotate Image",
      resizingButton: "回転中...",
      resizingStatus: "回転中...",

      invalidFileError: "エラー: 画像ファイルを選択してください",
      validationNoSize: "エラー: 回転角度を選択してください",
      validationInvalidSize: "エラー: 正しい回転角度を選択してください",
      validationInvalidResultSize: "エラー: 正しい回転角度を選択してください",

      canvasInitError: "エラー: canvasの初期化に失敗しました",
      resizeError: "エラー: 画像の回転に失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",

      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",

      successMessage: "完了！ 回転後の画像を保存しました",
    },
  },

  en: {
    page: {
      title: "Rotate Image",
      description: "A free online tool to rotate images.",
      aboutTitle: "What is Rotate Image?",
      aboutText:
        "This free tool lets you rotate images by 90, 180, or 270 degrees and save the result. It is useful for fixing image orientation and making photos easier to view.",
      stepsTitle: "How to use",
      steps: [
        "Upload an image.",
        "Choose a rotation angle.",
        "Click the Rotate Image button.",
        "Download the rotated image.",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Which rotation angles are supported?",
          answer:
            "You can rotate images by 90, 180, or 270 degrees.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "Crop Image", href: "/tools/crop-image" },
        { name: "Resize Image", href: "/tools/resize-image" },
        { name: "Flip Image", href: "/tools/flip-image" },
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

      widthLabel: "Rotation angle",
      heightLabel: "Unused",
      widthPlaceholder: "Example: 90",
      heightPlaceholder: "",

      keepAspectRatioLabel: "Choose a rotation angle",
      keepAspectRatioHint:
        "Select 90, 180, or 270 degrees to rotate the image.",

      resizeButton: "Rotate Image",
      resizingButton: "Rotating image...",
      resizingStatus: "Rotating image...",

      invalidFileError: "Error: Please select an image file",
      validationNoSize: "Error: Please choose a rotation angle",
      validationInvalidSize: "Error: Please choose a valid rotation angle",
      validationInvalidResultSize: "Error: Please choose a valid rotation angle",

      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to rotate the image",
      loadError: "Error: Failed to load the image",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! Saved the rotated image",
    },
  },
};