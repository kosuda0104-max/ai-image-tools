import type { ResizeImageContent, ToolLocale } from "./types";

export const webpToJpgContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "WebP to JPG",
      description: "WebP画像をJPG形式に変換できる無料ツールです。",
      aboutTitle: "WebP to JPGとは？",
      aboutText:
        "WebP画像をJPG形式へ変換できる無料ツールです。JPGは多くの環境で広く使われており、共有しやすい形式です。",
      stepsTitle: "使い方",
      steps: [
        "WebP画像をアップロードします",
        "Convert to JPGボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "WebPをJPGにするとどうなりますか？",
          answer:
            "JPGは対応環境が広く、共有しやすい一方で、圧縮により画質が少し変化することがあります。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "WebP to PNG", href: "/tools/webp-to-png" },
        { name: "JPG to WebP", href: "/tools/jpg-to-webp" },
        { name: "PNG to WebP", href: "/tools/png-to-webp" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "WebP画像をドラッグ＆ドロップ",

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

      invalidFileError: "エラー: WebP画像を選択してください",
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
      title: "WebP to JPG",
      description: "Convert WebP images to JPG format online for free.",
      aboutTitle: "What is WebP to JPG?",
      aboutText:
        "This free tool converts WebP images into JPG format. JPG is widely supported and easy to share across many devices and services.",
      stepsTitle: "How to use",
      steps: [
        "Upload a WebP image",
        "Click the Convert to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What happens when I convert WebP to JPG?",
          answer:
            "JPG is widely compatible and easy to share, though some image quality may change slightly due to compression.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "WebP to PNG", href: "/tools/webp-to-png" },
        { name: "JPG to WebP", href: "/tools/jpg-to-webp" },
        { name: "PNG to WebP", href: "/tools/png-to-webp" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "Drag and drop a WebP image",

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

      invalidFileError: "Error: Please select a WebP image",
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