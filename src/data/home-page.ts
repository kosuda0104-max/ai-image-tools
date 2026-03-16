type ToolItem = {
  name: string;
  href: string;
  description: string;
};

type ToolCategory = {
  title: string;
  description: string;
  tools: ToolItem[];
};

type FaqItem = {
  question: string;
  answer: string;
};

type HomePageLocale = "ja" | "en";

type HomePageContent = {
  badge: string;
  hero: {
    title: string;
    description: string;
    primaryButtonLabel: string;
    secondaryButtonLabel: string;
  };
  stats: {
    value: string;
    label: string;
  }[];
  popularToolsTitle: string;
  toolsPageLinkLabel: string;
  popularTools: ToolItem[];
  categories: ToolCategory[];
  aboutSection: {
    title: string;
    paragraphs: string[];
  };
  toolsSection: {
    title: string;
    description: string;
    buttonLabel: string;
  };
  faqSectionTitle: string;
  faqItems: FaqItem[];
  contactSection: {
    title: string;
    description: string;
    buttonLabel: string;
  };
};

export const homePageContent: Record<HomePageLocale, HomePageContent> = {
  ja: {
    badge: "AI Image Tools",
    hero: {
      title: "無料で使える画像・PDF変換ツール",
      description:
        "JPG、PNG、WebP、GIF、PDFの変換や、画像圧縮・リサイズ・切り抜きができる無料ツール集です。すべてブラウザ上で処理するため、安全に利用できます。",
      primaryButtonLabel: "すべてのツールを見る",
      secondaryButtonLabel: "お問い合わせ",
    },
    stats: [
      {
        value: "35ツール掲載",
        label: "画像・PDFツールを公開中",
      },
      {
        value: "無料",
        label: "登録不要ですぐ使える",
      },
      {
        value: "安全",
        label: "ブラウザ内で処理",
      },
    ],
    popularToolsTitle: "よく使うツール",
    toolsPageLinkLabel: "一覧を見る →",
    popularTools: [
      {
        name: "JPG to PNG",
        href: "/tools/jpg-to-png",
        description: "JPG画像をPNG形式に変換します。",
      },
      {
        name: "PNG to JPG",
        href: "/tools/png-to-jpg",
        description: "PNG画像をJPG形式に変換します。",
      },
      {
        name: "Image Compress",
        href: "/tools/image-compress",
        description: "画像を圧縮してファイルサイズを小さくします。",
      },
      {
        name: "Resize Image",
        href: "/tools/resize-image",
        description: "画像サイズを変更します。",
      },
      {
        name: "PDF to JPG",
        href: "/tools/pdf-to-jpg",
        description: "PDFをJPG画像に変換します。",
      },
      {
        name: "Merge PDF",
        href: "/tools/merge-pdf",
        description: "複数のPDFを1つに結合します。",
      },
    ],
    categories: [
      {
        title: "画像変換",
        description: "画像形式を別の形式へ変換できます。",
        tools: [
          {
            name: "JPG to PNG",
            href: "/tools/jpg-to-png",
            description: "JPG画像をPNG形式に変換します。",
          },
          {
            name: "PNG to JPG",
            href: "/tools/png-to-jpg",
            description: "PNG画像をJPG形式に変換します。",
          },
          {
            name: "WebP to JPG",
            href: "/tools/webp-to-jpg",
            description: "WebP画像をJPG形式に変換します。",
          },
          {
            name: "JPG to WebP",
            href: "/tools/jpg-to-webp",
            description: "JPG画像をWebP形式に変換します。",
          },
        ],
      },
      {
        title: "画像加工",
        description: "画像サイズ変更や圧縮などができます。",
        tools: [
          {
            name: "Image Compress",
            href: "/tools/image-compress",
            description: "画像を圧縮して容量を小さくします。",
          },
          {
            name: "Resize Image",
            href: "/tools/resize-image",
            description: "画像サイズを変更します。",
          },
          {
            name: "Crop Image",
            href: "/tools/crop-image",
            description: "画像を切り抜きます。",
          },
          {
            name: "Rotate Image",
            href: "/tools/rotate-image",
            description: "画像を回転します。",
          },
        ],
      },
      {
        title: "PDFツール",
        description: "PDF変換や結合などができます。",
        tools: [
          {
            name: "Image to PDF",
            href: "/tools/image-to-pdf",
            description: "画像をPDFに変換します。",
          },
          {
            name: "PDF to JPG",
            href: "/tools/pdf-to-jpg",
            description: "PDFをJPG画像に変換します。",
          },
          {
            name: "PDF to PNG",
            href: "/tools/pdf-to-png",
            description: "PDFをPNG画像に変換します。",
          },
          {
            name: "Merge PDF",
            href: "/tools/merge-pdf",
            description: "PDFを結合します。",
          },
        ],
      },
    ],
    aboutSection: {
      title: "このサイトについて",
      paragraphs: [
        "AI Image Toolsは、画像変換・画像加工・PDF変換をまとめて使える無料ツールサイトです。",
        "軽量で使いやすい構成を意識し、よく使う形式変換から実用的な編集機能まで順次拡張しています。",
        "個人利用でも仕事利用でも、すぐ使えるシンプルな操作感を目指しています。",
      ],
    },
    toolsSection: {
      title: "ツール一覧ページ",
      description:
        "すべての画像変換ツール・画像加工ツール・PDFツールをカテゴリ別に探したい場合は、一覧ページから確認できます。",
      buttonLabel: "ツール一覧へ",
    },
    faqSectionTitle: "よくある質問",
    faqItems: [
      {
        question: "AI Image Toolsは無料で使えますか？",
        answer:
          "はい。現在公開している画像変換・画像加工・PDFツールは無料で使えます。",
      },
      {
        question: "アップロードしたファイルは安全ですか？",
        answer:
          "はい。ツールはブラウザ内で処理する設計のため、ファイルを外部サーバーへ送信せずに使えます。",
      },
      {
        question: "どんなファイル形式に対応していますか？",
        answer:
          "JPG、PNG、WebP、GIF、PDFなどの形式に対応したツールを順次公開しています。",
      },
      {
        question: "今後ツールは増えますか？",
        answer:
          "はい。画像変換、画像加工、PDF関連の便利ツールを今後さらに追加予定です。",
      },
    ],
    contactSection: {
      title: "お問い合わせ",
      description:
        "不具合の報告やツール追加の要望があれば、お問い合わせページからご連絡ください。",
      buttonLabel: "お問い合わせページへ",
    },
  },

  en: {
    badge: "AI Image Tools",
    hero: {
      title: "Free Image and PDF Conversion Tools",
      description:
        "A free collection of tools for converting JPG, PNG, WebP, GIF, and PDF files, plus image compression, resizing, and cropping. Everything runs in your browser, so you can use the tools safely.",
      primaryButtonLabel: "View All Tools",
      secondaryButtonLabel: "Contact",
    },
    stats: [
      {
        value: "35 Tools",
        label: "Image and PDF tools available",
      },
      {
        value: "Free",
        label: "No signup required",
      },
      {
        value: "Safe",
        label: "Processed in your browser",
      },
    ],
    popularToolsTitle: "Popular Tools",
    toolsPageLinkLabel: "View all →",
    popularTools: [
      {
        name: "JPG to PNG",
        href: "/tools/jpg-to-png",
        description: "Convert JPG images to PNG format.",
      },
      {
        name: "PNG to JPG",
        href: "/tools/png-to-jpg",
        description: "Convert PNG images to JPG format.",
      },
      {
        name: "Image Compress",
        href: "/tools/image-compress",
        description: "Compress images to reduce file size.",
      },
      {
        name: "Resize Image",
        href: "/tools/resize-image",
        description: "Resize an image.",
      },
      {
        name: "PDF to JPG",
        href: "/tools/pdf-to-jpg",
        description: "Convert PDF files to JPG images.",
      },
      {
        name: "Merge PDF",
        href: "/tools/merge-pdf",
        description: "Merge multiple PDF files into one.",
      },
    ],
    categories: [
      {
        title: "Image Conversion",
        description: "Convert images from one format to another.",
        tools: [
          {
            name: "JPG to PNG",
            href: "/tools/jpg-to-png",
            description: "Convert JPG images to PNG format.",
          },
          {
            name: "PNG to JPG",
            href: "/tools/png-to-jpg",
            description: "Convert PNG images to JPG format.",
          },
          {
            name: "WebP to JPG",
            href: "/tools/webp-to-jpg",
            description: "Convert WebP images to JPG format.",
          },
          {
            name: "JPG to WebP",
            href: "/tools/jpg-to-webp",
            description: "Convert JPG images to WebP format.",
          },
        ],
      },
      {
        title: "Image Editing",
        description: "Resize, compress, and edit images.",
        tools: [
          {
            name: "Image Compress",
            href: "/tools/image-compress",
            description: "Compress images to reduce file size.",
          },
          {
            name: "Resize Image",
            href: "/tools/resize-image",
            description: "Resize an image.",
          },
          {
            name: "Crop Image",
            href: "/tools/crop-image",
            description: "Crop an image.",
          },
          {
            name: "Rotate Image",
            href: "/tools/rotate-image",
            description: "Rotate an image.",
          },
        ],
      },
      {
        title: "PDF Tools",
        description: "Convert and merge PDF files.",
        tools: [
          {
            name: "Image to PDF",
            href: "/tools/image-to-pdf",
            description: "Convert images to PDF.",
          },
          {
            name: "PDF to JPG",
            href: "/tools/pdf-to-jpg",
            description: "Convert PDF files to JPG images.",
          },
          {
            name: "PDF to PNG",
            href: "/tools/pdf-to-png",
            description: "Convert PDF files to PNG images.",
          },
          {
            name: "Merge PDF",
            href: "/tools/merge-pdf",
            description: "Merge PDF files.",
          },
        ],
      },
    ],
    aboutSection: {
      title: "About This Site",
      paragraphs: [
        "AI Image Tools is a free website for image conversion, image editing, and PDF conversion.",
        "It is designed to be lightweight and easy to use, with both common format conversions and practical editing features.",
        "The goal is to provide a simple workflow that is easy to use for both personal and work purposes.",
      ],
    },
    toolsSection: {
      title: "Tools List Page",
      description:
        "If you want to browse all image conversion, image editing, and PDF tools by category, check the tools list page.",
      buttonLabel: "Go to Tools List",
    },
    faqSectionTitle: "Frequently Asked Questions",
    faqItems: [
      {
        question: "Is AI Image Tools free to use?",
        answer:
          "Yes. The currently published image conversion, image editing, and PDF tools are free to use.",
      },
      {
        question: "Are uploaded files safe?",
        answer:
          "Yes. The tools are designed to process files in your browser, so files are not sent to an external server.",
      },
      {
        question: "What file formats are supported?",
        answer:
          "Tools supporting formats such as JPG, PNG, WebP, GIF, and PDF are being published gradually.",
      },
      {
        question: "Will more tools be added later?",
        answer:
          "Yes. More useful image conversion, image editing, and PDF tools are planned for the future.",
      },
    ],
    contactSection: {
      title: "Contact",
      description:
        "If you find a bug or want to request a new tool, please contact us through the contact page.",
      buttonLabel: "Go to Contact Page",
    },
  },
};

export function createHomeFaqJsonLd(locale: HomePageLocale) {
  const faqItems = homePageContent[locale].faqItems;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}