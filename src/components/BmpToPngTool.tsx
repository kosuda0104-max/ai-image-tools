"use client";

import StandardImageConversionTool, {
  type StandardImageConversionContent,
} from "@/src/components/StandardImageConversionTool";

type Locale = "ja" | "en";

type Props = {
  locale: Locale;
};

const content: Record<Locale, StandardImageConversionContent> = {
  ja: {
    page: {
      title: "BMPをPNGに変換",
      description: "BMP画像をPNG形式に変換できる無料オンラインツールです。",
      aboutTitle: "BMPをPNGに変換とは？",
      aboutText:
        "BMP画像をPNG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。PNG形式にすることで、扱いやすく編集しやすい画像として保存できます。",
      stepsTitle: "使い方",
      steps: [
        "BMP画像をアップロードします",
        "プレビューを確認します",
        "「BMPをPNGに変換」ボタンを押します",
        "変換後のPNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "BMPをPNGにすると画質は落ちますか？",
          answer: "通常の変換では大きく画質を落とさずPNG形式で保存できます。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでBMPをPNGに変換できます。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。ブラウザ上で処理するため、画像ファイルは外部サーバーにアップロードされません。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。このツールはブラウザ上で処理されるため、画像ファイルは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "BMPをJPGに変換", href: "/tools/bmp-to-jpg" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "BMP画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "エラー: BMPからPNGへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) =>
        `完了: ${baseName}.png をダウンロードしました。`,
      invalidFileError: "エラー: BMPファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "BMPをPNGに変換",
      convertingButton: "変換中...",
    },
  },
  en: {
    page: {
      title: "BMP to PNG Converter",
      description: "Convert BMP images to PNG format online for free.",
      aboutTitle: "What is BMP to PNG Converter?",
      aboutText:
        "This free BMP to PNG converter lets you convert images directly in your browser. No upload is required, so the process is fast, secure, and easy to use. PNG is useful when you want an editable and widely supported image format.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a BMP image",
        "Check the preview",
        "Click the Convert BMP to PNG button",
        "Download the converted PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will BMP to PNG reduce quality?",
          answer:
            "In normal use, the image can be saved as PNG without major visible quality loss.",
        },
        {
          question: "Do I need to install anything?",
          answer:
            "No. You can convert BMP to PNG directly in your browser without installing any software.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. The conversion runs in your browser, so your files are not uploaded to any external server.",
        },
        {
          question: "Can I convert without uploading?",
          answer:
            "Yes. This tool works entirely in your browser, so your image files are not uploaded to any external server.",
        },
      ],
      relatedTools: [
        { name: "BMP to JPG", href: "/en/tools/bmp-to-jpg" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a BMP image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert BMP to PNG.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) =>
        `Done: ${baseName}.png has been downloaded.`,
      invalidFileError: "Error: Please select a BMP file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert BMP to PNG",
      convertingButton: "Converting...",
    },
  },
};

export default function BmpToPngTool({ locale }: Props) {
  return (
    <StandardImageConversionTool
      content={content[locale]}
      accept="image/bmp,.bmp"
      outputExtension="png"
      outputType="image/png"
      isValidFile={(file) =>
        file.type === "image/bmp" || /\.bmp$/i.test(file.name)
      }
    />
  );
}
