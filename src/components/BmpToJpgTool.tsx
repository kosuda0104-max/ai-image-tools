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
      title: "BMPをJPGに変換",
      description: "BMP画像をJPG形式に変換できる無料オンラインツールです。",
      aboutTitle: "BMPをJPGに変換とは？",
      aboutText:
        "BMP画像をJPG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。JPG形式にすることで、ファイルサイズを小さくしやすく、共有や保存がしやすくなります。",
      stepsTitle: "使い方",
      steps: [
        "BMP画像をアップロードします",
        "プレビューを確認します",
        "「BMPをJPGに変換」ボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "BMPをJPGにすると軽くなりますか？",
          answer:
            "多くの場合、BMPよりJPGのほうがファイルサイズを小さくしやすいです。",
        },
        {
          question: "透過はどうなりますか？",
          answer:
            "JPGは透過に対応していないため、透明部分がある場合は白背景として変換されます。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけでBMPをJPGに変換できます。",
        },
        {
          question: "アップロードなしで変換できますか？",
          answer:
            "はい。このツールはブラウザ上で処理されるため、画像ファイルは外部サーバーにアップロードされません。",
        },
      ],
      relatedTools: [
        { name: "BMPをPNGに変換", href: "/tools/bmp-to-png" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "AVIFをJPGに変換", href: "/tools/avif-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "BMP画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "エラー: BMPからJPGへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) =>
        `完了: ${baseName}.jpg をダウンロードしました。`,
      invalidFileError: "エラー: BMPファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "BMPをJPGに変換",
      convertingButton: "変換中...",
    },
  },
  en: {
    page: {
      title: "BMP to JPG Converter",
      description: "Convert BMP images to JPG format online for free.",
      aboutTitle: "What is BMP to JPG Converter?",
      aboutText:
        "This free BMP to JPG converter lets you convert images directly in your browser. No upload is required, so the process is fast, secure, and easy to use. JPG is useful when you want smaller file sizes and a more widely supported image format.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a BMP image",
        "Check the preview",
        "Click the Convert BMP to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will BMP to JPG reduce file size?",
          answer:
            "In many cases, JPG files are smaller than BMP files, which makes them easier to share and store.",
        },
        {
          question: "What happens to transparency?",
          answer:
            "JPG does not support transparency, so transparent areas are converted to a white background.",
        },
        {
          question: "Do I need to install anything?",
          answer:
            "No. You can convert BMP to JPG directly in your browser without installing any software.",
        },
        {
          question: "Can I convert without uploading?",
          answer:
            "Yes. This tool works entirely in your browser, so your image files are not uploaded to any external server.",
        },
      ],
      relatedTools: [
        { name: "BMP to PNG", href: "/en/tools/bmp-to-png" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "AVIF to JPG", href: "/en/tools/avif-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a BMP image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert BMP to JPG.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) =>
        `Done: ${baseName}.jpg has been downloaded.`,
      invalidFileError: "Error: Please select a BMP file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert BMP to JPG",
      convertingButton: "Converting...",
    },
  },
};

export default function BmpToJpgTool({ locale }: Props) {
  return (
    <StandardImageConversionTool
      content={content[locale]}
      accept="image/bmp,.bmp"
      outputExtension="jpg"
      outputType="image/jpeg"
      fillBackground="#ffffff"
      quality={0.92}
      isValidFile={(file) =>
        file.type === "image/bmp" || /\.bmp$/i.test(file.name)
      }
    />
  );
}
