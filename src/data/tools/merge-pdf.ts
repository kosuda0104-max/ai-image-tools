import type { ResizeImageContent, ToolLocale } from "./types";

export const mergePdfContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "Merge PDF",
      description: "複数のPDFを1つに結合できる無料ツールです。",
      aboutTitle: "Merge PDFとは？",
      aboutText:
        "複数のPDFファイルを1つにまとめられる無料ツールです。資料や書類を1つのPDFとして整理したい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "PDFファイルを複数アップロードします",
        "Merge PDFボタンを押します",
        "結合後のPDFをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "何個まで結合できますか？",
          answer:
            "通常の利用範囲なら複数ファイルを結合できますが、非常に大きいPDFや大量のファイルではブラウザ性能の影響を受けます。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理されるため、PDFは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "Split PDF", href: "/tools/split-pdf" },
        { name: "Rotate PDF", href: "/tools/rotate-pdf" },
        { name: "Compress PDF", href: "/tools/compress-pdf" },
        { name: "Image to PDF", href: "/tools/image-to-pdf" },
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
      resizeButton: "Merge PDF",
      resizingButton: "PDFを結合中...",
      resizingStatus: "PDFを結合中...",
      invalidFileError: "エラー: PDFファイルを選択してください",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",
      canvasInitError: "",
      resizeError: "エラー: PDFの結合に失敗しました",
      loadError: "エラー: PDFの読み込みに失敗しました",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: "完了！ 結合したPDFを保存しました",
    },
  },
  en: {
    page: {
      title: "Merge PDF",
      description: "Merge multiple PDF files into one online for free.",
      aboutTitle: "What is Merge PDF?",
      aboutText:
        "This free tool lets you combine multiple PDF files into a single PDF. Useful for organizing documents into one file.",
      stepsTitle: "How to use",
      steps: [
        "Upload multiple PDF files",
        "Click the Merge PDF button",
        "Download the merged PDF",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "How many files can I merge?",
          answer:
            "You can merge multiple files in normal use, but very large PDFs or many files may depend on browser performance.",
        },
        {
          question: "Is it safe?",
          answer:
            "Yes. Processing runs in your browser, so PDFs are not uploaded to any server.",
        },
      ],
      relatedTools: [
        { name: "Split PDF", href: "/tools/split-pdf" },
        { name: "Rotate PDF", href: "/tools/rotate-pdf" },
        { name: "Compress PDF", href: "/tools/compress-pdf" },
        { name: "Image to PDF", href: "/tools/image-to-pdf" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop PDF files",
      selectedImageTitle: "Selected PDFs",
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
      resizeButton: "Merge PDF",
      resizingButton: "Merging PDFs...",
      resizingStatus: "Merging PDFs...",
      invalidFileError: "Error: Please select PDF files",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",
      canvasInitError: "",
      resizeError: "Error: Failed to merge PDFs",
      loadError: "Error: Failed to load PDFs",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: "Done! Merged PDF saved",
    },
  },
};