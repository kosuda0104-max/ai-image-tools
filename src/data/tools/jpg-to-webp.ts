import type { ResizeImageContent, ToolLocale } from "./types";

export const jpgToWebpContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "JPG to WebP",
      description: "JPG画像をWebP形式に変換できる無料ツールです。",
      aboutTitle: "JPG to WebPとは？",
      aboutText:
        "JPG画像をWebP形式へ変換できる無料ツールです。WebPは高画質のままファイルサイズを抑えやすく、Web掲載にも向いています。",
      stepsTitle: "使い方",
      steps: [
        "JPG画像をアップロードします",
        "Convert to WebPボタンを押します",
        "変換後のWebP画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "WebPにすると何が良いですか？",
          answer:
            "WebPはJPGやPNGより軽量になる場合が多く、Webページの表示速度改善に役立つことがあります。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "WebP to JPG", href: "/tools/webp-to-jpg" },
        { name: "PNG to WebP", href: "/tools/png-to-webp" },
        { name: "WebP to PNG", href: "/tools/webp-to-png" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "JPG画像をドラッグ＆ドロップ",

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

      resizeButton: "Convert to WebP",
      resizingButton: "WebPに変換中...",
      resizingStatus: "WebPに変換中...",

      invalidFileError: "エラー: JPG画像を選択してください",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "エラー: canvasの初期化に失敗しました",
      resizeError: "エラー: WebPへの変換に失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",

      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",

      successMessage: "完了！ WebP画像を保存しました",
    },
  },

  en: {
    page: {
      title: "JPG to WebP",
      description: "Convert JPG images to WebP format online for free.",
      aboutTitle: "What is JPG to WebP?",
      aboutText:
        "This free tool converts JPG images into WebP format. WebP often provides smaller file sizes while keeping good image quality, making it useful for web use.",
      stepsTitle: "How to use",
      steps: [
        "Upload a JPG image",
        "Click the Convert to WebP button",
        "Download the converted WebP image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Why convert JPG to WebP?",
          answer:
            "WebP often produces smaller file sizes than JPG or PNG, which can help improve web page loading speed.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. This tool runs in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedTools: [
        { name: "WebP to JPG", href: "/tools/webp-to-jpg" },
        { name: "PNG to WebP", href: "/tools/png-to-webp" },
        { name: "WebP to PNG", href: "/tools/webp-to-png" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "Drag and drop a JPG image",

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

      resizeButton: "Convert to WebP",
      resizingButton: "Converting to WebP...",
      resizingStatus: "Converting to WebP...",

      invalidFileError: "Error: Please select a JPG image",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to convert to WebP",
      loadError: "Error: Failed to load the image",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! WebP image saved",
    },
  },
};