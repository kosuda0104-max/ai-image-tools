"use client";

import StandardImageConversionTool from "@/src/components/StandardImageConversionTool";
import type { StandardImageConversionContent } from "@/src/lib/conversion-content";

type Locale = "ja" | "en";

const content: Record<Locale, StandardImageConversionContent> = {
  ja: {
    page: {
      title: "PNGをWebPに変換",
      description:
        "PNG画像をWebP形式に変換できる無料オンラインツールです。",
      aboutTitle: "PNGをWebPに変換とは？",
      aboutText:
        "PNG画像をWebP形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。WebPはファイルサイズを抑えやすく、Webサイト掲載用の画像を軽くしたいときや、表示速度を改善したいときに便利です。",
      stepsTitle: "使い方",
      steps: [
        "PNG画像をアップロードします",
        "プレビューを確認します",
        "「PNGをWebPに変換」ボタンを押します",
        "変換後のWebP画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "WebPにすると軽くなりますか？",
          answer:
            "多くの場合、WebPはPNGよりもファイルサイズを小さくしやすいため、Web掲載用画像の軽量化に役立ちます。",
        },
        {
          question: "透過は維持されますか？",
          answer:
            "はい。元のPNG画像に透過がある場合、WebP変換後も透過を維持できることがあります。",
        },
        {
          question: "インストールは必要ですか？",
          answer:
            "不要です。ブラウザだけでPNGをWebPに変換できます。",
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
      emptyTitle: "PNG画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "エラー: PNGからWebPへの変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) =>
        `完了: ${baseName}.webp をダウンロードしました。`,
      invalidFileError: "エラー: PNGファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "PNGをWebPに変換",
      convertingButton: "変換中...",
    },
  },
  en: {
    page: {
      title: "PNG to WebP Converter",
      description:
        "Convert PNG images to WebP format online for free.",
      aboutTitle: "What is PNG to WebP Converter?",
      aboutText:
        "This free PNG to WebP converter lets you convert images directly in your browser. No upload is required, so the process is fast, secure, and easy to use. WebP is useful when you want smaller file sizes for websites, faster page loading, and better image optimization while keeping transparency when supported.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a PNG image",
        "Check the preview",
        "Click the Convert PNG to WebP button",
        "Download the converted WebP image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will WebP make the image smaller?",
          answer:
            "In many cases, WebP can reduce file size compared with PNG, which makes it useful for websites and faster image delivery.",
        },
        {
          question: "Will transparency be preserved?",
          answer:
            "Yes. If the original PNG image has transparency, the converted WebP can preserve it in many cases.",
        },
        {
          question: "Do I need to install anything?",
          answer:
            "No. You can convert PNG to WebP directly in your browser without installing any software.",
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
      emptyTitle: "Drag and drop a PNG image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert PNG to WebP.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) =>
        `Done: ${baseName}.webp has been downloaded.`,
      invalidFileError: "Error: Please select a PNG file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert PNG to WebP",
      convertingButton: "Converting...",
    },
  },
};

export default function PngToWebpTool({ locale }: { locale: Locale }) {
  return (
    <StandardImageConversionTool
      content={content[locale]}
      accept="image/png,.png"
      outputExtension="webp"
      outputType="image/webp"
      quality={0.92}
      isValidFile={(file) => file.type === "image/png" || /\.png$/i.test(file.name)}
    />
  );
}
