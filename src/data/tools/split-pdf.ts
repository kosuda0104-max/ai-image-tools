import type { ResizeImageContent, ToolLocale } from "./types";

export const splitPdfContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "Split PDF",
      description: "PDFの指定ページだけを抽出できる無料ツールです。",
      aboutTitle: "Split PDFとは？",
      aboutText:
        "PDFから必要なページだけを抽出して、新しいPDFとして保存できる無料ツールです。特定ページだけ共有したい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "PDFファイルをアップロードします",
        "抽出したいページ番号を入力します",
        "Split PDFボタンを押します",
        "抽出後のPDFをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "複数ページをまとめて抽出できますか？",
          answer:
            "はい。カンマ区切りや範囲指定で複数ページをまとめて抽出できます。",
        },
        {
          question: "安全ですか？",
          answer:
            "このツールはブラウザ内で処理されるため、PDFは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "Merge PDF", href: "/tools/merge-pdf" },
        { name: "Rotate PDF", href: "/tools/rotate-pdf" },
        { name: "PDF Remove Pages", href: "/tools/pdf-remove-pages" },
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
      widthLabel: "抽出するページ番号",
      heightLabel: "",
      widthPlaceholder: "例: 1,3,5-7",
      heightPlaceholder: "",
      keepAspectRatioLabel: "",
      keepAspectRatioHint:
        "カンマ区切りで複数指定できます。範囲指定は 2-5 のように入力します。",
      resizeButton: "Split PDF",
      resizingButton: "PDFを抽出中...",
      resizingStatus: "PDFを抽出中...",
      invalidFileError: "エラー: PDFファイルを選択してください",
      validationNoSize: "エラー: 抽出するページ番号を入力してください",
      validationInvalidSize: "エラー: 無効なページ番号または範囲です",
      validationInvalidResultSize: "エラー: ページ番号がPDFの範囲外です",
      canvasInitError: "",
      resizeError: "エラー: PDFの抽出に失敗しました",
      loadError: "エラー: PDFの読み込みに失敗しました",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: "完了！ 抽出したPDFを保存しました",
    },
  },
  en: {
    page: {
      title: "Split PDF",
      description: "Extract selected pages from a PDF online for free.",
      aboutTitle: "What is Split PDF?",
      aboutText:
        "This free tool lets you extract only the pages you need from a PDF and save them as a new PDF.",
      stepsTitle: "How to use",
      steps: [
        "Upload a PDF file",
        "Enter the pages you want to extract",
        "Click the Split PDF button",
        "Download the extracted PDF",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can I extract multiple pages at once?",
          answer:
            "Yes. You can use comma-separated page numbers or ranges to extract multiple pages.",
        },
        {
          question: "Is it safe?",
          answer:
            "Yes. Processing runs in your browser, so the PDF is not uploaded to any server.",
        },
      ],
      relatedTools: [
        { name: "Merge PDF", href: "/tools/merge-pdf" },
        { name: "Rotate PDF", href: "/tools/rotate-pdf" },
        { name: "PDF Remove Pages", href: "/tools/pdf-remove-pages" },
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
      widthLabel: "Pages to extract",
      heightLabel: "",
      widthPlaceholder: "Example: 1,3,5-7",
      heightPlaceholder: "",
      keepAspectRatioLabel: "",
      keepAspectRatioHint:
        "Use commas for multiple pages. Use ranges like 2-5.",
      resizeButton: "Split PDF",
      resizingButton: "Extracting PDF...",
      resizingStatus: "Extracting PDF...",
      invalidFileError: "Error: Please select a PDF file",
      validationNoSize: "Error: Please enter pages to extract",
      validationInvalidSize: "Error: Invalid page number or range",
      validationInvalidResultSize: "Error: Page number is out of range",
      canvasInitError: "",
      resizeError: "Error: Failed to split PDF",
      loadError: "Error: Failed to load PDF",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: "Done! Extracted PDF saved",
    },
  },
};