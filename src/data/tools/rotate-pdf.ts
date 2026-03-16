import type { ResizeImageContent, ToolLocale } from "./types";

export const rotatePdfContent: Record<ToolLocale, ResizeImageContent> = {
  ja: {
    page: {
      title: "Rotate PDF",
      description: "PDFの全ページを回転できる無料ツールです。",
      aboutTitle: "Rotate PDFとは？",
      aboutText:
        "PDFの全ページをまとめて回転して保存できる無料ツールです。縦横の向きを整えたい時に便利です。",
      stepsTitle: "使い方",
      steps: [
        "PDFファイルをアップロードします",
        "回転角度を選択します",
        "Rotate PDFボタンを押します",
        "回転後のPDFをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "何度回転できますか？",
          answer:
            "90度、180度、270度の回転に対応しています。",
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
        { name: "Compress PDF", href: "/tools/compress-pdf" },
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
      widthLabel: "回転角度",
      heightLabel: "",
      widthPlaceholder: "",
      heightPlaceholder: "",
      keepAspectRatioLabel: "",
      keepAspectRatioHint: "90度、180度、270度から選択できます。",
      resizeButton: "Rotate PDF",
      resizingButton: "PDFを回転中...",
      resizingStatus: "PDFを回転中...",
      invalidFileError: "エラー: PDFファイルを選択してください",
      validationNoSize: "",
      validationInvalidSize: "エラー: 正しい回転角度を選択してください",
      validationInvalidResultSize: "",
      canvasInitError: "",
      resizeError: "エラー: PDFの回転に失敗しました",
      loadError: "エラー: PDFの読み込みに失敗しました",
      unknownType: "不明",
      unexpectedErrorPrefix: "エラー",
      successMessage: "完了！ 回転したPDFを保存しました",
    },
  },
  en: {
    page: {
      title: "Rotate PDF",
      description: "Rotate all pages in a PDF online for free.",
      aboutTitle: "What is Rotate PDF?",
      aboutText:
        "This free tool rotates all pages in a PDF and saves the result. Useful when you want to fix page orientation.",
      stepsTitle: "How to use",
      steps: [
        "Upload a PDF file",
        "Choose a rotation angle",
        "Click the Rotate PDF button",
        "Download the rotated PDF",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What rotation angles are supported?",
          answer:
            "You can rotate pages by 90, 180, or 270 degrees.",
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
        { name: "Compress PDF", href: "/tools/compress-pdf" },
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
      widthLabel: "Rotation angle",
      heightLabel: "",
      widthPlaceholder: "",
      heightPlaceholder: "",
      keepAspectRatioLabel: "",
      keepAspectRatioHint: "Choose from 90, 180, or 270 degrees.",
      resizeButton: "Rotate PDF",
      resizingButton: "Rotating PDF...",
      resizingStatus: "Rotating PDF...",
      invalidFileError: "Error: Please select a PDF file",
      validationNoSize: "",
      validationInvalidSize: "Error: Please choose a valid rotation angle",
      validationInvalidResultSize: "",
      canvasInitError: "",
      resizeError: "Error: Failed to rotate PDF",
      loadError: "Error: Failed to load PDF",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: "Done! Rotated PDF saved",
    },
  },
};