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
          question: "JPGとPNGの違いは何ですか？",
          answer:
            "JPGは圧縮形式でファイルサイズが小さくなりますが、画質が劣化します。一方PNGは非圧縮形式で保存されるため、再編集や再保存でも画質を維持しやすい形式です。",
        },
        {
          question: "PNGに変換すると画質は良くなりますか？",
          answer:
            "いいえ。JPGからPNGに変換しても、元のJPGで失われた画質が回復するわけではありません。ただし、その後PNGとして保存することで追加の劣化を防ぎやすくなります。",
        },
        {
          question: "スマホでも使えますか？",
          answer:
            "はい。スマートフォンやタブレットのブラウザでも利用できます。アプリのインストールや会員登録は不要です。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。このツールはブラウザ内で処理されるため、画像ファイルを外部サーバーへ送信せずに変換できます。",
        },
        {
          question: "透過PNGを作れますか？",
          answer:
            "JPGは透過情報を持たないため、変換だけで背景が透明になるわけではありません。透過が必要な場合は、別途背景を削除する編集が必要です。",
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
          question: "What is the difference between JPG and PNG?",
          answer:
            "JPG uses lossy compression to reduce file size, while PNG uses lossless compression and is better for keeping image quality during repeated editing and saving.",
        },
        {
          question: "Will converting JPG to PNG improve image quality?",
          answer:
            "No. Converting JPG to PNG does not restore quality already lost in the original JPG file. However, saving as PNG can help prevent additional quality loss afterward.",
        },
        {
          question: "Can I use this tool on mobile?",
          answer:
            "Yes. You can use this tool on smartphones and tablets in your browser without installing any app.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. The conversion is processed in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Can I create a transparent PNG from JPG?",
          answer:
            "Not automatically. JPG files do not support transparency, so converting to PNG will not remove the background by itself.",
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
