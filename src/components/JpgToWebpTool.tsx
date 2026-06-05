"use client";

import SimpleImageConversionTool, {
  type SimpleImageConversionContent,
} from "@/src/components/SimpleImageConversionTool";

type Locale = "ja" | "en";

const content: Record<Locale, SimpleImageConversionContent> = {
  ja: {
    page: {
      title: "JPGをWebPに変換",
      description: "JPG画像をWebP形式に変換できる無料オンラインツールです。",
      aboutTitle: "JPGをWebPに変換とは？",
      aboutText:
        "JPG画像をWebP形式に変換できる無料オンラインツールです。画像サイズを抑えたいときや、WebP形式で保存したいときに便利です。処理はブラウザ内で完結します。",
      stepsTitle: "使い方",
      steps: [
        "JPG画像をアップロードします",
        "プレビューを確認します",
        "変換ボタンを押します",
        "WebP画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "JPGをWebPに変換すると軽くなりますか？",
          answer: "多くの場合、WebPに変換するとファイルサイズを小さくできる可能性があります。",
        },
        {
          question: "インストールは必要ですか？",
          answer: "不要です。ブラウザだけで変換できます。",
        },
        {
          question: "画像は外部にアップロードされますか？",
          answer: "いいえ。変換はブラウザ内で処理されるため、画像ファイルは外部サーバーに送信されません。",
        },
      ],
      relatedTools: [
        { name: "WebPをJPGに変換", href: "/tools/webp-to-jpg" },
        { name: "PNGをWebPに変換", href: "/tools/png-to-webp" },
        { name: "JPGをPNGに変換", href: "/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "JPG画像をアップロード",
      emptyDescription: "ここにファイルをドロップ、またはクリックして選択",
      selectButtonLabel: "ファイルを選択",
      button: "JPGをWebPに変換",
      loading: "変換中...",
      done: "完了しました",
      invalidFile: "JPGファイルを選択してください。",
      error: "変換に失敗しました。",
    },
  },
  en: {
    page: {
      title: "JPG to WebP Converter",
      description: "Convert JPG images to WebP format online for free.",
      aboutTitle: "What is JPG to WebP Converter?",
      aboutText:
        "This free online tool converts JPG images into WebP format directly in your browser. It is useful when you want smaller file sizes or need WebP images for the web.",
      stepsTitle: "How to Use",
      steps: [
        "Upload a JPG image",
        "Check the preview",
        "Click convert",
        "Download the WebP image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can WebP reduce file size?",
          answer: "In many cases, WebP can reduce image file size compared with JPG.",
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
        { name: "WebP to JPG", href: "/en/tools/webp-to-jpg" },
        { name: "PNG to WebP", href: "/en/tools/png-to-webp" },
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
      ],
    },
    ui: {
      emptyTitle: "Upload JPG image",
      emptyDescription: "Drop a file here or click to browse",
      selectButtonLabel: "Choose File",
      button: "Convert JPG to WebP",
      loading: "Converting...",
      done: "Done",
      invalidFile: "Please select a JPG file.",
      error: "Conversion failed.",
    },
  },
};

export default function JpgToWebpTool({ locale }: { locale: Locale }) {
  return (
    <SimpleImageConversionTool
      content={content[locale]}
      accept="image/jpeg,.jpg,.jpeg"
      outputExtension="webp"
      outputType="image/webp"
      quality={0.92}
      isValidFile={(file) => file.type === "image/jpeg" || /\.(jpg|jpeg)$/i.test(file.name)}
    />
  );
}
