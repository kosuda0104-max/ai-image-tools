"use client";

import StandardImageConversionTool from "@/src/components/StandardImageConversionTool";
import type { StandardImageConversionContent } from "@/src/lib/conversion-content";

type Locale = "ja" | "en";

async function heicToPngFile(file: File): Promise<File> {
  const heic2any = (await import("heic2any")).default;
  const out = await heic2any({ blob: file, toType: "image/png" });
  const blob = Array.isArray(out) ? out[0] : out;
  const name = file.name.replace(/\.(heic|heif)$/i, "") + ".png";
  return new File([blob], name, { type: "image/png" });
}

function isHeic(file: File): boolean {
  return (
    file.type === "image/heic" ||
    file.type === "image/heif" ||
    /\.(heic|heif)$/i.test(file.name)
  );
}

const content: Record<Locale, StandardImageConversionContent> = {
  ja: {
    page: {
      title: "HEICをPNGに変換",
      description: "HEIC画像をPNG形式へ変換できる無料オンラインツールです。",
      aboutTitle: "このツールについて",
      aboutText:
        "iPhone 写真の HEIC を PNG に変換して、編集しやすい形式で扱いたいときに向いています。",
      contentSections: [
        {
          title: "使いどころ",
          paragraphs: [
            "画質を重視したいときや、再編集しやすい形式へ変えたいときに便利です。",
          ],
        },
      ],
      listSections: [
        {
          title: "変換前のポイント",
          items: [
            "PNG は JPG より容量が大きくなりやすいです。",
            "共有しやすさ重視なら HEIC から JPG も候補です。",
          ],
        },
      ],
      stepsTitle: "使い方",
      steps: ["HEIC画像を選択します", "変換ボタンを押します", "PNGをダウンロードします"],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "画像はアップロードされますか？",
          answer: "いいえ。処理はブラウザ内で行われます。",
        },
      ],
      relatedToolsTitle: "関連ツール",
      relatedTools: [
        { name: "HEICをJPGに変換", href: "/tools/heic-to-jpg" },
        { name: "画像圧縮", href: "/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "HEIC画像をドラッグ＆ドロップ、または選択",
      unknownType: "不明",
      convertingStatus: "変換中です...",
      canvasInitError: "エラー: Canvasの初期化に失敗しました。",
      convertError: "変換に失敗しました。",
      loadError: "エラー: 画像の読み込みに失敗しました。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (baseName: string) => `${baseName}.png をダウンロードしました。`,
      invalidFileError: "HEICファイルを選択してください。",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      previewLabel: "プレビュー",
      convertButton: "HEICをPNGに変換",
      convertingButton: "変換中...",
    },
  },
  en: {
    page: {
      title: "HEIC to PNG Converter",
      description: "Convert HEIC images to PNG online for free.",
      aboutTitle: "About this tool",
      aboutText:
        "Useful when you want to convert iPhone-friendly HEIC files into a more edit-friendly PNG export.",
      contentSections: [
        {
          title: "When HEIC to PNG helps",
          paragraphs: [
            "A practical option when you want a reusable image export from a HEIC photo.",
          ],
        },
      ],
      listSections: [
        {
          title: "Things to know",
          items: [
            "PNG files can be larger than JPG exports.",
            "If compatibility matters more, HEIC to JPG may be the better choice.",
          ],
        },
      ],
      stepsTitle: "How to Use",
      steps: ["Choose a HEIC image", "Click convert", "Download the PNG file"],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are files uploaded?",
          answer: "No. Processing stays in your browser.",
        },
      ],
      relatedToolsTitle: "Related Tools",
      relatedTools: [
        { name: "HEIC to JPG", href: "/en/tools/heic-to-jpg" },
        { name: "Image Compress", href: "/en/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a HEIC image here, or select a file",
      unknownType: "Unknown",
      convertingStatus: "Converting...",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Conversion failed.",
      loadError: "Error: Failed to load image.",
      unexpectedErrorPrefix: "Error",
      successMessage: (baseName: string) => `${baseName}.png has been downloaded.`,
      invalidFileError: "Please select a HEIC file.",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert HEIC to PNG",
      convertingButton: "Converting...",
    },
  },
};

export default function HeicToPngTool({ locale }: { locale: Locale }) {
  return (
    <StandardImageConversionTool
      content={content[locale]}
      accept=".heic,.heif,image/heic,image/heif"
      outputExtension="png"
      outputType="image/png"
      isValidFile={isHeic}
      preprocess={heicToPngFile}
    />
  );
}
