import type { ResizeImageContent, ToolLocale } from "./types";

export const pdfRemovePagesContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "PDF Remove Pages",
      description: "PDFから不要なページを削除できる無料ツールです。",
      aboutTitle: "PDF Remove Pagesとは？",
      aboutText:
        "PDFファイルから不要なページを削除して、新しいPDFとして保存できる無料ツールです。表紙や不要ページをまとめて削除したい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "PDFファイルをアップロードします",
        "削除したいページ番号を入力します",
        "Remove Pagesボタンを押します",
        "不要ページを削除したPDFをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "複数ページをまとめて削除できますか？",
          answer:
            "はい。カンマ区切りや範囲指定で複数ページをまとめて削除できます。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理されるため、PDFは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "Split PDF", href: "/tools/split-pdf" },
        { name: "Merge PDF", href: "/tools/merge-pdf" },
        { name: "Rotate PDF", href: "/tools/rotate-pdf" },
        { name: "Compress PDF", href: "/tools/compress-pdf" },
      ],
    },
    ui: {
      emptyTitle: "PDFファイルをドラッグ＆ドロップ",
      selectedImageTitle: "選択中のPDF",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      widthLabel: "削除するページ番号",
      heightLabel: "",
      widthPlaceholder: "例: 1,3,5-7",
      heightPlaceholder: "",
      keepAspectRatioLabel: "",
      keepAspectRatioHint:
        "カンマ区切りで複数指定できます。範囲指定は 2-5 のように入力します。",
      resizeButton: "Remove Pages",
      resizingButton: "ページを削除中...",
      resizingStatus: "ページを削除中...",
      invalidFileError: "エラー: PDFファイルを選択してください",
      validationNoSize: "エラー: 削除するページ番号を入力してください",
      validationInvalidSize: "エラー: 無効なページ番号または範囲です",
      validationInvalidResultSize: "エラー: ページ番号がPDFの範囲外です",
      canvasInitError: "",
      resizeError: "エラー: PDFのページ削除に失敗しました",
      loadError: "エラー: PDFの読み込みに失敗しました",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: "完了！ ページを削除したPDFを保存しました",
    },
  },
  en: {
    page: {
      title: "PDF Remove Pages",
      description: "Remove unwanted pages from a PDF online for free.",
      aboutTitle: "What is PDF Remove Pages?",
      aboutText:
        "This free tool removes unwanted pages from a PDF and saves the result as a new PDF.",
      stepsTitle: "How to use",
      steps: [
        "Upload a PDF file",
        "Enter the page numbers to remove",
        "Click the Remove Pages button",
        "Download the updated PDF",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can I remove multiple pages at once?",
          answer:
            "Yes. You can use comma-separated page numbers or ranges to remove multiple pages.",
        },
        {
          question: "Is it safe?",
          answer:
            "Yes. Processing runs in your browser, so the PDF is not uploaded to any server.",
        },
      ],
      relatedTools: [
        { name: "Split PDF", href: "/tools/split-pdf" },
        { name: "Merge PDF", href: "/tools/merge-pdf" },
        { name: "Rotate PDF", href: "/tools/rotate-pdf" },
        { name: "Compress PDF", href: "/tools/compress-pdf" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a PDF file",
      selectedImageTitle: "Selected PDF",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      widthLabel: "Pages to remove",
      heightLabel: "",
      widthPlaceholder: "Example: 1,3,5-7",
      heightPlaceholder: "",
      keepAspectRatioLabel: "",
      keepAspectRatioHint:
        "Use commas for multiple pages. Use ranges like 2-5.",
      resizeButton: "Remove Pages",
      resizingButton: "Removing pages...",
      resizingStatus: "Removing pages...",
      invalidFileError: "Error: Please select a PDF file",
      validationNoSize: "Error: Please enter pages to remove",
      validationInvalidSize: "Error: Invalid page number or range",
      validationInvalidResultSize: "Error: Page number is out of range",
      canvasInitError: "",
      resizeError: "Error: Failed to remove pages from PDF",
      loadError: "Error: Failed to load PDF",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: "Done! Updated PDF saved",
    },
  },
};