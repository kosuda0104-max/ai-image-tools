import type { ResizeImageContent, ToolLocale } from "./types";

export const avifToPngContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "AVIF to PNG",
      description: "AVIF画像をPNG形式に変換できる無料ツールです。",
      aboutTitle: "AVIF to PNGとは？",
      aboutText:
        "AVIF画像をPNG形式へ変換できる無料ツールです。PNGは多くのアプリやWebサービスで利用できる一般的な画像形式です。",
      stepsTitle: "使い方",
      steps: [
        "AVIF画像をアップロードします",
        "Convert to PNGボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "AVIFをPNGにするメリットは？",
          answer:
            "PNGは互換性が高く、多くの画像編集ソフトやサービスで使用できます。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理されるため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "AVIF to JPG", href: "/tools/avif-to-jpg" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "AVIF画像をドラッグ＆ドロップ",

      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",

      widthLabel: "",
      heightLabel: "",
      widthPlaceholder: "",
      heightPlaceholder: "",

      keepAspectRatioLabel: "",
      keepAspectRatioHint: "",

      resizeButton: "Convert to PNG",
      resizingButton: "PNGに変換中...",
      resizingStatus: "PNGに変換中...",

      invalidFileError: "エラー: AVIF画像を選択してください",

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
      title: "AVIF to PNG",
      description: "Convert AVIF images to PNG format online for free.",
      aboutTitle: "What is AVIF to PNG?",
      aboutText:
        "This free tool converts AVIF images into PNG format. PNG is widely supported and easy to use in many applications.",
      stepsTitle: "How to use",
      steps: [
        "Upload an AVIF image",
        "Click the Convert to PNG button",
        "Download the converted PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Why convert AVIF to PNG?",
          answer:
            "PNG has high compatibility and works well with many image editing tools and services.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to any server.",
        },
      ],
      relatedTools: [
        { name: "AVIF to JPG", href: "/tools/avif-to-jpg" },
        { name: "PNG to JPG", href: "/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/tools/jpg-to-png" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "Drag and drop an AVIF image",

      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",

      widthLabel: "",
      heightLabel: "",
      widthPlaceholder: "",
      heightPlaceholder: "",

      keepAspectRatioLabel: "",
      keepAspectRatioHint: "",

      resizeButton: "Convert to PNG",
      resizingButton: "Converting to PNG...",
      resizingStatus: "Converting to PNG...",

      invalidFileError: "Error: Please select an AVIF image",

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