import type { ResizeImageContent, ToolLocale } from "./types";

export const compressPdfContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "Compress PDF",
      description: "PDFの軽量化を試せる無料ツールです。",
      aboutTitle: "Compress PDFとは？",
      aboutText:
        "PDFファイルをブラウザ内で再保存し、軽量化できるか試せる無料ツールです。PDFの構造によってはサイズが小さくならない場合もあります。",
      stepsTitle: "使い方",
      steps: [
        "PDFファイルをアップロードします",
        "Compress PDFボタンを押します",
        "軽量化後のPDFをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "必ず軽くなりますか？",
          answer:
            "いいえ。PDFの内容によっては、再保存してもサイズがほとんど変わらない場合があります。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理されるため、PDFは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "Merge PDF", href: "/tools/merge-pdf" },
        { name: "Split PDF", href: "/tools/split-pdf" },
        { name: "Rotate PDF", href: "/tools/rotate-pdf" },
        { name: "PDF Remove Pages", href: "/tools/pdf-remove-pages" },
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
      resizeButton: "Compress PDF",
      resizingButton: "PDFを軽量化中...",
      resizingStatus: "PDFを軽量化中...",
      invalidFileError: "エラー: PDFファイルを選択してください",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",
      canvasInitError: "",
      resizeError: "エラー: PDFの軽量化に失敗しました",
      loadError: "エラー: PDFの読み込みに失敗しました",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: "完了！ 軽量化したPDFを保存しました",
    },
  },
  en: {
    page: {
      title: "Compress PDF",
      description: "Try to reduce PDF file size online for free.",
      aboutTitle: "What is Compress PDF?",
      aboutText:
        "This free tool re-saves a PDF in your browser and attempts to reduce its file size. Depending on the PDF structure, the size may not change much.",
      stepsTitle: "How to use",
      steps: [
        "Upload a PDF file",
        "Click the Compress PDF button",
        "Download the compressed PDF",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will the file always get smaller?",
          answer:
            "No. Depending on the PDF contents, re-saving may not reduce the size much.",
        },
        {
          question: "Is it safe?",
          answer:
            "Yes. Processing runs in your browser, so the PDF is not uploaded to any server.",
        },
      ],
      relatedTools: [
        { name: "Merge PDF", href: "/tools/merge-pdf" },
        { name: "Split PDF", href: "/tools/split-pdf" },
        { name: "Rotate PDF", href: "/tools/rotate-pdf" },
        { name: "PDF Remove Pages", href: "/tools/pdf-remove-pages" },
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
      resizeButton: "Compress PDF",
      resizingButton: "Compressing PDF...",
      resizingStatus: "Compressing PDF...",
      invalidFileError: "Error: Please select a PDF file",
      validationNoSize: "",
      validationInvalidSize: "",
      validationInvalidResultSize: "",
      canvasInitError: "",
      resizeError: "Error: Failed to compress PDF",
      loadError: "Error: Failed to load PDF",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: "Done! Compressed PDF saved",
    },
  },
};