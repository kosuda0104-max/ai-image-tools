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
      title: "WebPをJPGに変換",
      description: "WebP画像をJPG形式に変換できる無料オンラインツールです。",
      aboutTitle: "WebPをJPGに変換とは？",
      aboutText:
        "WebP画像をJPG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。JPG形式にすることで、共有しやすく一般的な画像形式として保存できます。",
      stepsTitle: "使い方",
      steps: [
        "WebP画像をアップロードします",
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
        { name: "WebPをPNGに変換", href: "/tools/webp-to-png" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
        { name: "JPGをWebPに変換", href: "/tools/jpg-to-webp" },
      ],
    },
    ui: {
      emptyTitle: "WebP画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "WebPをJPGに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "WebPファイルを選択してください。",
      error: "変換に失敗しました。",
    },
  },
  en: {
    page: {
      title: "WebP to JPG Converter",
      description: "Convert WebP images to JPG format online for free.",
      aboutTitle: "What is WebP to JPG Converter?",
      aboutText:
        "This free online tool converts WebP images into JPG format directly in your browser. JPG is widely supported and useful for general image sharing. Transparent areas are filled with a white background.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a WebP image",
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
        { name: "WebP to PNG", href: "/en/tools/webp-to-png" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "JPG to WebP", href: "/en/tools/jpg-to-webp" },
      ],
    },
    ui: {
      emptyTitle: "Upload WebP image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert WebP to JPG",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select a WebP file.",
      error: "Conversion failed.",
    },
  },
};

export default function WebpToJpgTool({ locale }: Props) {
  return (
    <SimpleImageConversionTool
      content={content[locale]}
      accept="image/webp,.webp"
      outputExtension="jpg"
      outputType="image/jpeg"
      fillBackground="#ffffff"
      quality={0.92}
      isValidFile={(file) =>
        file.type === "image/webp" || /\.webp$/i.test(file.name)
      }
    />
  );
}
