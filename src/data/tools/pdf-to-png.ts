import type { ResizeImageContent, ToolLocale } from "./types";

export const pdfToPngContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "PDF to PNG",
      description: "PDFをPNG画像に変換できる無料ツールです。",
      aboutTitle: "PDF to PNGとは？",
      aboutText:
        "PDFファイルのページをPNG画像として書き出せる無料ツールです。PDFの内容を画像として保存したい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "PDFファイルをアップロードします",
        "Convert to PNGボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "全ページ変換されますか？",
          answer:
            "はい。通常はPDF内の各ページが個別のPNG画像として保存されます。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理されるため、PDFは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "PDF to JPG", href: "/tools/pdf-to-jpg" },
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
      resizeButton: "Convert to PNG",
      resizingButton: "PNGに変換中...",
      resizingStatus: "PNGに変換中...",
      invalidFileError: "エラー: PDFファイルを選択してください",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",
      canvasInitError: "エラー: canvasの初期化に失敗しました",
      resizeError: "エラー: PNGへの変換に失敗しました",
      loadError: "エラー: PDFの読み込みに失敗しました",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: "完了！ PNG画像を保存しました",
    },
  },
  en: {
    page: {
      title: "PDF to PNG",
      description: "Convert PDF files to PNG images online for free.",
      aboutTitle: "What is PDF to PNG?",
      aboutText:
        "This free tool exports PDF pages as PNG images. It is useful when you want to save PDF content as images.",
      stepsTitle: "How to use",
      steps: [
        "Upload a PDF file",
        "Click the Convert to PNG button",
        "Download the converted PNG images",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will all pages be converted?",
          answer:
            "Yes. Usually each page of the PDF is saved as a separate PNG image.",
        },
        {
          question: "Is it safe?",
          answer:
            "Yes. The processing runs in your browser, so the PDF is not uploaded to any server.",
        },
      ],
      relatedTools: [
        { name: "PDF to JPG", href: "/tools/pdf-to-jpg" },
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
      resizeButton: "Convert to PNG",
      resizingButton: "Converting to PNG...",
      resizingStatus: "Converting to PNG...",
      invalidFileError: "Error: Please select a PDF file",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",
      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to convert to PNG",
      loadError: "Error: Failed to load the PDF",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: "Done! PNG images saved",
    },
  },
};