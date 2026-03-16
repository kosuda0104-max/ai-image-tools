import type { ResizeImageContent, ToolLocale } from "./types";

export const resizeImageContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "Resize Image",
      description: "画像の幅と高さを変更できる無料ツールです。",
      aboutTitle: "Resize Imageとは？",
      aboutText:
        "画像のサイズをブラウザ内で変更できる無料ツールです。SNS投稿用、Web掲載用、プロフィール画像用など、用途に合わせて幅と高さを調整できます。",
      stepsTitle: "使い方",
      steps: [
        "画像をアップロードします",
        "幅と高さを入力します",
        "必要に応じて縦横比の維持を設定します",
        "Resize Imageボタンを押します",
        "リサイズ後の画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "縦横比は維持できますか？",
          answer:
            "はい。縦横比を維持する設定をオンにすると、片方の数値を入力するだけでも元の比率を保ってリサイズできます。",
        },
        {
          question: "画質は落ちますか？",
          answer:
            "大きく拡大すると画質が粗く見える場合があります。縮小時は用途に応じて見やすく調整できます。",
        },
      ],
      relatedTools: [
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Crop Image", href: "/tools/crop-image" },
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

      widthLabel: "幅 (px)",
      heightLabel: "高さ (px)",
      widthPlaceholder: "例: 1200",
      heightPlaceholder: "例: 800",

      keepAspectRatioLabel: "縦横比を維持する",
      keepAspectRatioHint:
        "縦横比を維持する場合は、幅または高さのどちらか片方だけ入力してもリサイズできます。",

      resizeButton: "Resize Image",
      resizingButton: "画像サイズを変更中...",

      resizingStatus: "画像サイズを変更中...",

      invalidFileError: "エラー: JPG / PNG / WebP 画像を選択してください",
      validationNoSize: "エラー: 幅または高さを入力してください",
      validationInvalidSize:
        "エラー: 幅と高さには1以上の数値を入力してください",
      validationInvalidResultSize: "エラー: 正しいサイズを入力してください",

      canvasInitError: "エラー: canvasの初期化に失敗しました",
      resizeError: "エラー: 画像のリサイズに失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",

      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",

      successMessage: "完了！ {width} × {height} に変更した画像を保存しました",
    },
  },

  en: {
    page: {
      title: "Resize Image",
      description: "A free tool to change image width and height.",
      aboutTitle: "What is Resize Image?",
      aboutText:
        "Resize Image is a free browser-based tool that lets you change image dimensions easily. It can be used for social media posts, web publishing, profile pictures, and more.",
      stepsTitle: "How to Use",
      steps: [
        "Upload an image",
        "Enter the width and height",
        "Choose whether to keep the aspect ratio",
        "Click the Resize Image button",
        "Download the resized image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can I keep the aspect ratio?",
          answer:
            "Yes. If keep aspect ratio is enabled, you can enter only width or height and the image will be resized while preserving the original ratio.",
        },
        {
          question: "Will the image quality decrease?",
          answer:
            "If you enlarge the image significantly, it may look less sharp. When reducing size, it is usually easier to keep a clean result depending on the use case.",
        },
      ],
      relatedTools: [
        { name: "Image Compress", href: "/tools/image-compress" },
        { name: "Crop Image", href: "/tools/crop-image" },
        { name: "Rotate Image", href: "/tools/rotate-image" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
      ],
    },

    ui: {
      emptyTitle: "Drag and drop an image",

      selectedImageTitle: "Selected Image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",

      widthLabel: "Width (px)",
      heightLabel: "Height (px)",
      widthPlaceholder: "Example: 1200",
      heightPlaceholder: "Example: 800",

      keepAspectRatioLabel: "Keep aspect ratio",
      keepAspectRatioHint:
        "If keep aspect ratio is enabled, you can resize by entering only width or height.",

      resizeButton: "Resize Image",
      resizingButton: "Resizing image...",

      resizingStatus: "Resizing image...",

      invalidFileError: "Error: Please select a JPG / PNG / WebP image",
      validationNoSize: "Error: Please enter width or height",
      validationInvalidSize:
        "Error: Width and height must be numbers greater than 0",
      validationInvalidResultSize: "Error: Please enter a valid size",

      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to resize the image",
      loadError: "Error: Failed to load the image",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! Saved the resized image as {width} × {height}",
    },
  },
};