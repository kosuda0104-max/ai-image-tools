"use client";

import SimpleImageConversionTool, {
  type SimpleImageConversionContent,
} from "@/src/components/SimpleImageConversionTool";

type Locale = "ja" | "en";

type Props = {
  locale: Locale;
};

const content: Record<Locale, SimpleImageConversionContent> = {
  ja: {
    page: {
      title: "PNGをJPGに変換",
      description: "PNG画像をJPG形式に変換できる無料オンラインツールです。",
      aboutTitle: "PNGをJPGに変換とは？",
      aboutText:
        "PNG画像をJPG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。JPG形式にすることで、ファイルサイズを小さくしやすく、共有しやすい画像として保存できます。",
      stepsTitle: "使い方",
      steps: [
        "PNG画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "JPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "透過はどうなりますか？",
          answer:
            "JPGは透過に対応していないため、透明部分は白背景として変換されます。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけで変換できます。",
        },
        {
          question: "画像はアップロードされますか？",
          answer: "いいえ。変換はブラウザ内で完結します。",
        },
      ],
      relatedTools: [
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" },
        { name: "PNGをWebPに変換", href: "/tools/png-to-webp" },
        { name: "WebPをJPGに変換", href: "/tools/webp-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "PNG画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "PNGをJPGに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "PNGファイルを選択してください。",
      error: "変換に失敗しました。",
    },
  },
  en: {
    page: {
      title: "PNG to JPG Converter",
      description: "Convert PNG images to JPG format online for free.",
      aboutTitle: "What is PNG to JPG Converter?",
      aboutText:
        "This free online tool converts PNG images into JPG format directly in your browser. It is useful when you need a standard JPG file. Transparent areas are filled with a white background.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a PNG image",
        "Check the preview",
        "Click convert",
        "Download the JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What happens to transparency?",
          answer:
            "JPG does not support transparency, so transparent areas are filled with white.",
        },
        {
          question: "Do I need to install anything?",
          answer: "No. Everything works directly in your browser.",
        },
        {
          question: "Are my images uploaded?",
          answer: "No. Files are processed locally in your browser.",
        },
      ],
      relatedTools: [
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
        { name: "PNG to WebP", href: "/en/tools/png-to-webp" },
        { name: "WebP to JPG", href: "/en/tools/webp-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "Upload PNG image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert PNG to JPG",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select a PNG file.",
      error: "Conversion failed.",
    },
  },
};

export default function PngToJpgTool({ locale }: Props) {
  return (
    <SimpleImageConversionTool
      content={content[locale]}
      accept="image/png,.png"
      outputExtension="jpg"
      outputType="image/jpeg"
      fillBackground="#ffffff"
      quality={0.92}
      isValidFile={(file) =>
        file.type === "image/png" || /\.png$/i.test(file.name)
      }
    />
  );
}
