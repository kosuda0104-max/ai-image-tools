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
      description:
        "WebP画像をJPG形式に変換できる無料オンラインツールです。互換性を優先したい画像をブラウザだけで手軽に変換できます。",
      aboutTitle: "WebPをJPGに変換とは？",
      aboutText:
        "WebPをJPGに変換すると、古いアプリや一部の業務システム、画像投稿フォーム、資料作成ツールなどでも扱いやすい形式にできます。WebPは軽量で優秀ですが、環境によってはJPGのほうが受け入れられやすいことがあります。このツールなら、ブラウザ内で安全に変換してすぐ保存できます。",
      contentSections: [
        {
          title: "WebPをJPGに変換したいよくある場面",
          paragraphs: [
            "相手先のサービスがWebPに対応していないとき、古い画像編集ソフトや社内システムで開けないとき、画像素材をJPG指定で提出したいときに便利です。",
            "特に、Webサイト用に軽量化されたWebP素材を、配布用・共有用・提出用に変えたいケースではJPG変換が役立ちます。",
          ],
        },
        {
          title: "JPG変換が向いているケース",
          paragraphs: [
            "写真の共有、メール添付、CMS登録、一般的な画像管理など、広い互換性を優先したい用途に向いています。",
            "一方で、透過を維持したい画像ならJPGではなくPNG変換のほうが適しています。",
          ],
        },
      ],
      listSections: [
        {
          title: "変換前の注意点",
          items: [
            "JPGは透過に対応していないため、透明部分は背景色付きになります。",
            "JPGは圧縮形式なので、細かい輪郭や文字は少し柔らかく見えることがあります。",
            "提出先がWebP対応なら、無理にJPGへ変換しないほうが軽量さを保てます。",
            "公開用にさらに軽くしたいなら、変換後に画像圧縮ツールを使うのがおすすめです。",
          ],
        },
      ],
      comparisonTitle: "WebPとJPGの比較",
      comparisonItems: [
        {
          label: "互換性",
          value:
            "JPGは多くのアプリやサービスで広くサポートされています。WebPは比較的新しい環境では便利ですが、提出先によっては非対応の場合があります。",
        },
        {
          label: "透過対応",
          value:
            "WebPは透過に対応できますが、JPGは透過を保持できません。",
        },
        {
          label: "ファイルサイズ",
          value:
            "WebPのほうが軽くなりやすいことが多く、JPGは互換性重視の形式です。",
        },
        {
          label: "向いている用途",
          value:
            "WebPはWeb配信用、JPGは共有・提出・一般的な利用環境向けです。",
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "WebP画像をアップロードします",
        "プレビューを確認します",
        "「WebPをJPGに変換」ボタンを押します",
        "変換後のJPG画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "WebPをJPGにすると何が変わりますか？",
          answer:
            "互換性が高くなり、多くのアプリやサービスで扱いやすくなります。反面、透過は失われる場合があります。",
        },
        {
          question: "透明背景はどうなりますか？",
          answer:
            "JPGは透過非対応なので、透明部分は背景色付きになります。",
        },
        {
          question: "画質は落ちますか？",
          answer:
            "JPGは圧縮形式のため、細部の見え方が少し変わることがあります。特に文字や境界線では差が見えやすいです。",
        },
        {
          question: "安全に使えますか？",
          answer:
            "はい。ブラウザ上で変換するため、画像ファイルは外部サーバーにアップロードされません。",
        },
      ],
      relatedToolsTitle: "次に使いやすい関連ツール",
      relatedTools: [
        { name: "WebPをPNGに変換", href: "/tools/webp-to-png" },
        { name: "JPGをWebPに変換", href: "/tools/jpg-to-webp" },
        { name: "画像圧縮", href: "/tools/image-compress" },
        { name: "PNGをJPGに変換", href: "/tools/png-to-jpg" },
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
      description:
        "Convert WebP images to JPG online for free. This is useful when you need broad compatibility for uploads, sharing, or older apps.",
      aboutTitle: "What is a WebP to JPG converter?",
      aboutText:
        "Converting WebP to JPG is useful when a site, app, or workflow does not accept WebP files. WebP is excellent for modern web delivery, but JPG is still easier to use in many office tools, upload forms, and older image workflows. This converter runs locally in your browser, so you can convert files without uploading them to an external server.",
      contentSections: [
        {
          title: "When WebP to JPG is useful",
          paragraphs: [
            "Use it when a client asks for JPG files, when an upload form rejects WebP, or when an older editor or internal system cannot open your image correctly.",
            "It is especially practical when you already have web-optimized WebP assets but need a more universally accepted delivery format.",
          ],
        },
        {
          title: "When JPG is the better final format",
          paragraphs: [
            "JPG is a strong choice for broad compatibility, casual sharing, CMS uploads, and common image exchange workflows.",
            "If you need to preserve transparency, though, PNG is a better target format than JPG.",
          ],
        },
      ],
      listSections: [
        {
          title: "Things to keep in mind",
          items: [
            "JPG does not support transparency, so transparent areas become a solid background.",
            "Because JPG is lossy, sharp text and fine edges may look a little softer.",
            "If your destination already supports WebP, you may not need to convert at all.",
            "For even smaller shared files, try image compression after conversion.",
          ],
        },
      ],
      comparisonTitle: "WebP vs JPG",
      comparisonItems: [
        {
          label: "Compatibility",
          value:
            "JPG is widely supported almost everywhere. WebP is excellent in modern environments but is not always accepted in older tools or rigid upload systems.",
        },
        {
          label: "Transparency",
          value:
            "WebP can preserve transparency. JPG cannot.",
        },
        {
          label: "Typical file size",
          value:
            "WebP is often smaller. JPG is more about compatibility than maximum efficiency.",
        },
        {
          label: "Best use case",
          value:
            "Use WebP for web delivery and JPG for broader sharing, submission, and general compatibility.",
        },
      ],
      stepsTitle: "How to Use",
      steps: [
        "Upload a WebP image",
        "Check the preview",
        "Click the Convert WebP to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What changes when I convert WebP to JPG?",
          answer:
            "The biggest change is compatibility. JPG is easier to open, upload, and share in many systems, but transparency will be lost.",
        },
        {
          question: "What happens to transparent backgrounds?",
          answer:
            "JPG does not support transparency, so those areas are replaced with a solid background.",
        },
        {
          question: "Will image quality change?",
          answer:
            "It can. JPG uses lossy compression, so fine details and text edges may look slightly softer.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. The conversion happens in your browser, so your file is not uploaded to an external server.",
        },
      ],
      relatedToolsTitle: "Related tools worth using next",
      relatedTools: [
        { name: "WebP to PNG", href: "/en/tools/webp-to-png" },
        { name: "JPG to WebP", href: "/en/tools/jpg-to-webp" },
        { name: "Image Compress", href: "/en/tools/image-compress" },
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "Upload a WebP image",
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
