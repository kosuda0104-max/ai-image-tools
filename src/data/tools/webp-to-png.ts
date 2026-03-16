import type { ResizeImageContent, ToolLocale } from "./types";

export const webpToPngContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "WebP to PNG",
      description: "WebP画像をPNG形式に変換できる無料ツールです。",
      aboutTitle: "WebP to PNGとは？",
      aboutText:
        "WebP画像をPNG形式へ変換できる無料ツールです。PNGは劣化しにくく、画像編集や再保存にも向いています。",
      stepsTitle: "使い方",
      steps: [
        "WebP画像をアップロードします",
        "Convert to PNGボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "WebPとは何ですか？",
          answer:
            "WebPはGoogleが開発した画像形式で、JPGやPNGより軽量な場合が多い形式です。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "PNG to WebP", href: "/tools/png-to-webp" },
        { name: "JPG to WebP", href: "/tools/jpg-to-webp" },
        { name: "WebP to JPG", href: "/tools/webp-to-jpg" },
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
      resizeButton: "Convert to PNG",
      resizingButton: "PNGに変換中...",
      resizingStatus: "PNGに変換中...",
      invalidFileError: "エラー: WebP画像を選択してください",
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
      title: "WebP to PNG",
      description: "Convert WebP images to PNG format online for free.",
      aboutTitle: "What is WebP to PNG?",
      aboutText:
        "This free tool converts WebP images into PNG format. PNG is widely supported and suitable for editing and lossless image storage.",
      stepsTitle: "How to use",
      steps: [
        "Upload a WebP image",
        "Click the Convert to PNG button",
        "Download the converted PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What is WebP?",
          answer:
            "WebP is an image format developed by Google that often provides smaller file sizes compared to JPG and PNG.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "PNG to WebP", href: "/tools/png-to-webp" },
        { name: "JPG to WebP", href: "/tools/jpg-to-webp" },
        { name: "WebP to JPG", href: "/tools/webp-to-jpg" },
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
      resizeButton: "Convert to PNG",
      resizingButton: "Converting to PNG...",
      resizingStatus: "Converting to PNG...",
      invalidFileError: "Error: Please select a WebP image",
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