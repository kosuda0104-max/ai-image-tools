import type { ResizeImageContent, ToolLocale } from "./types";

export const pdfToJpgContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "PDF to JPG",
      description: "PDFをJPG画像に変換できる無料ツールです。",
      aboutTitle: "PDF to JPGとは？",
      aboutText:
        "PDFファイルのページをJPG画像として書き出せる無料ツールです。PDFの内容を画像として保存したい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "PDFファイルをアップロードします",
        "Convert to JPGボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "全ページ変換されますか？",
          answer:
            "はい。PDF内の各ページが個別のJPG画像として保存されます。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理されるため、PDFは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "PDF to PNG", href: "/tools/pdf-to-png" },
        { name: "Image to PDF", href: "/tools/image-to-pdf" },
        { name: "Merge PDF", href: "/tools/merge-pdf" },
        { name: "Split PDF", href: "/tools/split-pdf" },
      ],
    },

    ui: {
      emptyTitle: "PDFファイルをドラッグ＆ドロップ",

      selectedImageTitle: "選択中のPDF",
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

      resizeButton: "Convert to JPG",
      resizingButton: "JPGに変換中...",
      resizingStatus: "JPGに変換中...",

      invalidFileError: "エラー: PDFファイルを選択してください",

      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "エラー: canvasの初期化に失敗しました",
      resizeError: "エラー: JPGへの変換に失敗しました",
      loadError: "エラー: PDFの読み込みに失敗しました",

      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",

      successMessage: "完了！ JPG画像を保存しました",
    },
  },

  en: {
    page: {
      title: "PDF to JPG",
      description: "Convert PDF files to JPG images online for free.",
      aboutTitle: "What is PDF to JPG?",
      aboutText:
        "This free tool converts PDF pages into JPG images. Useful when you want to save PDF content as images.",
      stepsTitle: "How to use",
      steps: [
        "Upload a PDF file",
        "Click the Convert to JPG button",
        "Download the converted JPG images",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will all pages be converted?",
          answer:
            "Yes. Each page of the PDF will be saved as a JPG image.",
        },
        {
          question: "Is it safe?",
          answer:
            "Yes. Processing runs entirely in your browser.",
        },
      ],
      relatedTools: [
        { name: "PDF to PNG", href: "/tools/pdf-to-png" },
        { name: "Image to PDF", href: "/tools/image-to-pdf" },
        { name: "Merge PDF", href: "/tools/merge-pdf" },
        { name: "Split PDF", href: "/tools/split-pdf" },
      ],
    },

    ui: {
      emptyTitle: "Drag and drop a PDF file",

      selectedImageTitle: "Selected PDF",
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

      resizeButton: "Convert to JPG",
      resizingButton: "Converting to JPG...",
      resizingStatus: "Converting to JPG...",

      invalidFileError: "Error: Please select a PDF file",

      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",

      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to convert to JPG",
      loadError: "Error: Failed to load the PDF",

      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",

      successMessage: "Done! JPG images saved",
    },
  },
};