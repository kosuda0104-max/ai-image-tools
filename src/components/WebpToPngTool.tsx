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
      title: "WebPをPNGに変換",
      description: "WebP画像をPNG形式に変換できる無料オンラインツールです。",
      aboutTitle: "WebPをPNGに変換とは？",
      aboutText:
        "WebP画像をPNG形式に変換できる無料オンラインツールです。ブラウザ上で処理するためアップロード不要で、安全かつ高速に変換できます。透過を含むWebPをPNGへ保存したいときにも便利です。",
      stepsTitle: "使い方",
      steps: [
        "WebP画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "PNG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "透過は保持されますか？",
          answer:
            "元のWebP画像に透過情報が含まれている場合、変換後のPNGでも通常は保持されます。",
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
        { name: "PNGをWebPに変換", href: "/tools/png-to-webp" },
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" },
        { name: "WebPをJPGに変換", href: "/tools/webp-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "WebP画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "WebPをPNGに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "WebPファイルを選択してください。",
      error: "変換に失敗しました。",
    },
  },
  en: {
    page: {
      title: "WebP to PNG Converter",
      description: "Convert WebP images to PNG format online for free.",
      aboutTitle: "What is WebP to PNG Converter?",
      aboutText:
        "This free online tool converts WebP images into PNG format directly in your browser. It is useful when you want a standard PNG file or need to preserve transparency. Your image files are processed locally and are not uploaded to an external server.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a WebP image",
        "Check the preview",
        "Click convert",
        "Download the PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will transparency be preserved?",
          answer:
            "Yes. If the original WebP image includes transparency, it is usually preserved in the converted PNG.",
        },
        {
          question: "Do I need to install anything?",
          answer: "No. Everything works directly in your browser.",
        },
        {
          question: "Are my images uploaded to a server?",
          answer: "No. This tool processes files locally in your browser.",
        },
      ],
      relatedTools: [
        { name: "PNG to WebP", href: "/en/tools/png-to-webp" },
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
        { name: "WebP to JPG", href: "/en/tools/webp-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "Upload WebP image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert WebP to PNG",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select a WebP file.",
      error: "Conversion failed.",
    },
  },
};

export default function WebpToPngTool({ locale }: Props) {
  return (
    <SimpleImageConversionTool
      content={content[locale]}
      accept="image/webp,.webp"
      outputExtension="png"
      outputType="image/png"
      isValidFile={(file) =>
        file.type === "image/webp" || /\.webp$/i.test(file.name)
      }
    />
  );
}
