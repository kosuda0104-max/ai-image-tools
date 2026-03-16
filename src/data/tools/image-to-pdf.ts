import type { ResizeImageContent, ToolLocale } from "./types";

export const imageToPdfContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "Image to PDF",
      description: "画像をPDFに変換できる無料ツールです。",
      aboutTitle: "Image to PDFとは？",
      aboutText:
        "画像ファイルをPDFに変換できる無料ツールです。JPGやPNGなどの画像をまとめてPDFとして保存できます。",
      stepsTitle: "使い方",
      steps: [
        "画像をアップロードします",
        "Convert to PDFボタンを押します",
        "生成されたPDFをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "複数画像は対応していますか？",
          answer:
            "現在は1枚の画像をPDFに変換します。複数画像対応は今後追加予定です。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理するため、画像は外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "PDF to JPG", href: "/tools/pdf-to-jpg" },
        { name: "PDF to PNG", href: "/tools/pdf-to-png" },
        { name: "Merge PDF", href: "/tools/merge-pdf" },
        { name: "Split PDF", href: "/tools/split-pdf" },
      ],
    },

    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ",

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

      resizeButton: "Convert to PDF",
      resizingButton: "PDFを生成中...",
      resizingStatus: "PDFを生成中...",

      invalidFileError: "エラー: 画像ファイルを選択してください",

      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "",
      resizeError: "エラー: PDFの生成に失敗しました",
      loadError: "エラー: 画像の読み込みに失敗しました",

      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",

      successMessage: "完了！ PDFを保存しました",
    },
  },

  en: {
    page: {
      title: "Image to PDF",
      description: "Convert images to PDF online for free.",
      aboutTitle: "What is Image to PDF?",
      aboutText:
        "This free tool converts image files into PDF documents. You can easily save JPG or PNG images as a PDF.",
      stepsTitle: "How to use",
      steps: [
        "Upload an image",
        "Click Convert to PDF",
        "Download the generated PDF",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Does it support multiple images?",
          answer:
            "Currently it converts one image to a PDF. Multiple image support may be added later.",
        },
        {
          question: "Is it safe?",
          answer:
            "Yes. The conversion runs inside your browser. No files are uploaded to any server.",
        },
      ],
      relatedTools: [
        { name: "PDF to JPG", href: "/tools/pdf-to-jpg" },
        { name: "PDF to PNG", href: "/tools/pdf-to-png" },
        { name: "Merge PDF", href: "/tools/merge-pdf" },
        { name: "Split PDF", href: "/tools/split-pdf" },
      ],
    },

    ui: {
      emptyTitle: "Drag and drop an image",

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

      resizeButton: "Convert to PDF",
      resizingButton: "Creating PDF...",
      resizingStatus: "Creating PDF...",

      invalidFileError: "Error: Please select an image file",

      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "",
      resizeError: "Error: Failed to create PDF",
      loadError: "Error: Failed to load image",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! PDF saved",
    },
  },
};