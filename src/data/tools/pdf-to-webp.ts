import type { ResizeImageContent, ToolLocale } from "./types";

export const pdfToWebpContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "PDF to WebP",
      description: "PDFをWebP画像に変換できる無料ツールです。",
      aboutTitle: "PDF to WebPとは？",
      aboutText:
        "PDFファイルの各ページをWebP画像として書き出せる無料ツールです。軽量な画像形式で保存したい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "PDFファイルをアップロードします",
        "Convert to WebPボタンを押します",
        "変換後のWebP画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "全ページ変換されますか？",
          answer:
            "はい。通常はPDF内の各ページが個別のWebP画像として保存されます。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理されるため、PDFは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "PDF to PNG", href: "/tools/pdf-to-png" },
        { name: "PDF to JPG", href: "/tools/pdf-to-jpg" },
        { name: "Image to PDF", href: "/tools/image-to-pdf" },
        { name: "Merge PDF", href: "/tools/merge-pdf" },
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
      resizeButton: "Convert to WebP",
      resizingButton: "WebPに変換中...",
      resizingStatus: "WebPに変換中...",
      invalidFileError: "エラー: PDFファイルを選択してください",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",
      canvasInitError: "エラー: canvasの初期化に失敗しました",
      resizeError: "エラー: WebPへの変換に失敗しました",
      loadError: "エラー: PDFの読み込みに失敗しました",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: "完了！ WebP画像を保存しました",
    },
  },
  en: {
    page: {
      title: "PDF to WebP",
      description: "Convert PDF files to WebP images online for free.",
      aboutTitle: "What is PDF to WebP?",
      aboutText:
        "This free tool exports PDF pages as WebP images. Useful when you want lighter image files.",
      stepsTitle: "How to use",
      steps: [
        "Upload a PDF file",
        "Click the Convert to WebP button",
        "Download the converted WebP images",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will all pages be converted?",
          answer:
            "Yes. Usually each page of the PDF is saved as a separate WebP image.",
        },
        {
          question: "Is it safe?",
          answer:
            "Yes. Processing runs in your browser, so the PDF is not uploaded to any server.",
        },
      ],
      relatedTools: [
        { name: "PDF to PNG", href: "/tools/pdf-to-png" },
        { name: "PDF to JPG", href: "/tools/pdf-to-jpg" },
        { name: "Image to PDF", href: "/tools/image-to-pdf" },
        { name: "Merge PDF", href: "/tools/merge-pdf" },
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
      resizeButton: "Convert to WebP",
      resizingButton: "Converting to WebP...",
      resizingStatus: "Converting to WebP...",
      invalidFileError: "Error: Please select a PDF file",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",
      canvasInitError: "Error: Failed to initialize canvas",
      resizeError: "Error: Failed to convert to WebP",
      loadError: "Error: Failed to load the PDF",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: "Done! WebP images saved",
    },
  },
};