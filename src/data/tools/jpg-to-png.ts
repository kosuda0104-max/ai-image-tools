import type { JpgToPngContent, ToolLocale } from "./types";

export const jpgToPngContent: Record<ToolLocale, JpgToPngContent> = {
  ja: {
    page: {
      title: "JPGをPNGに変換",
      description:
        "JPG画像をPNG形式に変換できる無料オンラインツールです。",
      aboutTitle: "JPGをPNGに変換とは？",
      aboutText:
        "JPG画像をPNG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。PNG形式にすることで、編集しやすい画像として保存したいときや、より扱いやすい形式に変換したいときに便利です。",
      stepsTitle: "使い方",
      steps: [
        "JPG画像をアップロードします",
        "プレビューを確認します",
        "「JPGをPNGに変換」ボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画質は落ちますか？",
          answer:
            "JPGからPNGへの変換では、変換後のPNGをそのまま保存できます。ただし元画像がJPGなので、元の圧縮状態までは戻りません。",
        },
        {
          question: "インストールは必要ですか？",
          answer:
            "不要です。ソフトを入れなくても、ブラウザだけでJPGをPNGに変換できます。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。変換はブラウザ内で行われるため、ファイルを外部サーバーへ送信せずに利用できます。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。このツールはブラウザ上で処理されるため、画像ファイルは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "JPGをWebPに変換", href: "/tools/jpg-to-webp" },
        { name: "WebPをPNGに変換", href: "/tools/webp-to-png" },
      ],
    },
    ui: {
      emptyTitle: "JPG画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "エラー: JPGからPNGへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) =>
        `完了: ${baseName}.png をダウンロードしました。`,
      invalidFileError: "エラー: JPGファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "JPGをPNGに変換",
      convertingButton: "変換中...",
    },
  },

  en: {
    page: {
      title: "JPG to PNG Converter",
      description: "Convert JPG images to PNG format online for free.",
      aboutTitle: "What is JPG to PNG Converter?",
      aboutText:
        "This free JPG to PNG converter lets you convert images directly in your browser. No upload is required, so the process is fast, secure, and easy to use. PNG format is useful when you want a more editable and widely supported image format for design, documents, or general image use.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a JPG image",
        "Check the preview",
        "Click the Convert JPG to PNG button",
        "Download the converted PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will image quality improve after converting to PNG?",
          answer:
            "The converted file is saved as PNG, but converting from JPG does not restore quality that was already lost in the original JPG compression.",
        },
        {
          question: "Do I need to install anything?",
          answer:
            "No. You can convert JPG to PNG directly in your browser without installing any software.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. The conversion runs in your browser, so your files do not need to be sent to an external server.",
        },
        {
          question: "Can I convert without uploading?",
          answer:
            "Yes. This tool works entirely in your browser, so your image files are not uploaded to any external server.",
        },
      ],
      relatedTools: [
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "JPG to WebP", href: "/en/tools/jpg-to-webp" },
        { name: "WebP to PNG", href: "/en/tools/webp-to-png" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a JPG image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert JPG to PNG.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) =>
        `Done: ${baseName}.png has been downloaded.`,
      invalidFileError: "Error: Please select a JPG file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert JPG to PNG",
      convertingButton: "Converting...",
    },
  },
};