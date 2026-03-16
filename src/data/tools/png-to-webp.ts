import type { ResizeImageContent, ToolLocale } from "./types";

export const pngToWebpContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "PNG to WebP",
      description: "PNG画像をWebP形式に変換できる無料ツールです。",
      aboutTitle: "PNG to WebPとは？",
      aboutText:
        "PNG画像をWebP形式へ変換できる無料ツールです。WebPは高画質を保ちながらファイルサイズを抑えやすく、Web掲載にも向いています。",
      stepsTitle: "使い方",
      steps: [
        "PNG画像をアップロードします",
        "Convert to WebPボタンを押します",
        "変換後のWebP画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "PNGをWebPにするメリットは？",
          answer:
            "WebPはPNGよりファイルサイズを抑えやすいことがあり、Webページの表示速度改善に役立つ場合があります。",
        },
        {
          question: "透明部分は保持されますか？",
          answer:
            "はい。WebPは透過にも対応しているため、PNGの透明部分を保持しやすいです。",
        },
      ],
      relatedTools: [
        { name: "WebP to PNG", href: "/tools/webp-to-png" },
        { name: "JPG to WebP", href: "/tools/jpg-to-webp" },
        { name: "WebP to JPG", href: "/tools/webp-to-jpg" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "PNG画像をドラッグ＆ドロップ",

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

      invalidFileError: "エラー: PNG画像を選択してください",
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
      title: "PNG to WebP",
      description: "Convert PNG images to WebP format online for free.",
      aboutTitle: "What is PNG to WebP?",
      aboutText:
        "This free tool converts PNG images into WebP format. WebP often keeps good image quality while reducing file size, making it useful for websites.",
      stepsTitle: "How to use",
      steps: [
        "Upload a PNG image",
        "Click the Convert to WebP button",
        "Download the converted WebP image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Why convert PNG to WebP?",
          answer:
            "WebP often creates smaller file sizes than PNG, which can help improve page loading speed.",
        },
        {
          question: "Will transparency be preserved?",
          answer:
            "Yes. WebP supports transparency, so transparent areas in PNG images can usually be preserved.",
        },
      ],
      relatedTools: [
        { name: "WebP to PNG", href: "/tools/webp-to-png" },
        { name: "JPG to WebP", href: "/tools/jpg-to-webp" },
        { name: "WebP to JPG", href: "/tools/webp-to-jpg" },
        { name: "Image Compress", href: "/tools/image-compress" },
      ],
    },

    ui: {
      emptyTitle: "Drag and drop a PNG image",

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

      invalidFileError: "Error: Please select a PNG image",
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