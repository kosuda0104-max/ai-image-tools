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
      title: "ブラウザで使える画像変換・PDFツール",
      description:
        "JPG、PNG、WebP、HEIC、GIF、PDF などの変換や、画像圧縮、リサイズ、トリミングをブラウザ上で手早く進められる無料ツール集です。",
      primaryButtonLabel: "ツール一覧を見る",
      secondaryButtonLabel: "お問い合わせ",
    },
    stats: [
      { value: "35ツール掲載", label: "画像・PDFツールを公開中" },
      { value: "無料", label: "登録不要ですぐ使える" },
      { value: "安全", label: "ブラウザ内で処理" },
    ],
    popularToolsTitle: "よく使われるツール",
    toolsPageLinkLabel: "すべて見る",
    popularTools: [
      {
        name: "JPG to PNG",
        href: "/tools/jpg-to-png",
        description:
          "写真の JPG を、編集しやすい PNG に変換したいときに使いやすい定番ツールです。",
      },
      {
        name: "PNG to JPG",
        href: "/tools/png-to-jpg",
        description:
          "PNG を軽い JPG に変換して、共有やアップロードをしやすくします。",
      },
      {
        name: "Image Compress",
        href: "/tools/image-compress",
        description:
          "画像の見た目を大きく崩さずにファイルサイズを抑えたいときに役立ちます。",
      },
      {
        name: "Resize Image",
        href: "/tools/resize-image",
        description:
          "Web掲載、SNS投稿、資料添付向けに画像サイズを調整できます。",
      },
      {
        name: "PDF to JPG",
        href: "/tools/pdf-to-jpg",
        description:
          "PDF の各ページを JPG に変換して、画像として扱いやすくします。",
      },
      {
        name: "Merge PDF",
        href: "/tools/merge-pdf",
        description:
          "複数の PDF を 1 つにまとめて、提出や共有しやすい形に整えます。",
      },
    ],
    categories: [
      {
        title: "画像形式変換",
        description:
          "JPG、PNG、WebP、HEIC などを別の形式へ変換したいときに使えるツールです。",
        tools: [
          {
            name: "JPG to PNG",
            href: "/tools/jpg-to-png",
            description: "JPG を PNG に変換します。",
          },
          {
            name: "PNG to JPG",
            href: "/tools/png-to-jpg",
            description: "PNG を JPG に変換します。",
          },
          {
            name: "WebP to JPG",
            href: "/tools/webp-to-jpg",
            description: "WebP を JPG に変換します。",
          },
          {
            name: "JPG to WebP",
            href: "/tools/jpg-to-webp",
            description: "JPG を WebP に変換します。",
          },
        ],
      },
      {
        title: "画像編集",
        description:
          "圧縮、サイズ変更、切り抜き、回転などの軽い編集をブラウザですぐ行えます。",
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
            description: "必要な範囲だけ切り抜きます。",
          },
          {
            name: "Rotate Image",
            href: "/tools/rotate-image",
            description: "画像の向きを回転します。",
          },
        ],
      },
      {
        title: "PDF ツール",
        description:
          "PDF 変換、結合、分割、圧縮など、日常業務でよく使う PDF 作業をまとめています。",
        tools: [
          {
            name: "Image to PDF",
            href: "/tools/image-to-pdf",
            description: "画像を PDF にまとめます。",
          },
          {
            name: "PDF to JPG",
            href: "/tools/pdf-to-jpg",
            description: "PDF を JPG 画像に変換します。",
          },
          {
            name: "PDF to PNG",
            href: "/tools/pdf-to-png",
            description: "PDF を PNG 画像に変換します。",
          },
          {
            name: "Merge PDF",
            href: "/tools/merge-pdf",
            description: "PDF を結合します。",
          },
        ],
      },
    ],
    aboutSection: {
      title: "このサイトについて",
      paragraphs: [
        "AI Image Tools は、画像変換、画像編集、PDF 作業をブラウザだけで進められる無料ツールサイトです。",
        "単にツールを並べるだけでなく、関連ツール、解説ページ、ポリシー情報も用意して、迷いにくい導線を意識しています。",
        "検索で訪れた人にも、日常業務で使う人にも、必要な処理へすぐたどり着けることを目指しています。",
      ],
    },
    toolsSection: {
      title: "ツール一覧ページ",
      description:
        "画像形式変換、画像編集、PDF ツールをカテゴリごとにまとめた一覧ページから、目的に合う処理を探せます。",
      buttonLabel: "ツール一覧へ",
    },
    faqSectionTitle: "よくある質問",
    faqItems: [
      {
        question: "AI Image Tools は無料で使えますか？",
        answer:
          "はい。公開中の画像変換、画像編集、PDF ツールは無料で使えます。",
      },
      {
        question: "アップロードしたファイルは安全ですか？",
        answer:
          "多くのツールはブラウザ内で処理する設計なので、外部サーバーへ送信せずに使える構成です。",
      },
      {
        question: "どんな形式に対応していますか？",
        answer:
          "JPG、PNG、WebP、HEIC、GIF、AVIF、BMP、TIFF、ICO、SVG、PDF などに対応したツールがあります。",
      },
      {
        question: "今後もツールは増えますか？",
        answer:
          "はい。既存ツールの改善に加えて、要望の多い形式変換や PDF ワークフローを順次追加していく予定です。",
      },
    ],
    contactSection: {
      title: "お問い合わせ",
      description:
        "不具合報告、機能追加の要望、使い方の相談があればお問い合わせページから送れます。",
      buttonLabel: "お問い合わせページへ",
    },
  },
  en: {
    badge: "AI Image Tools",
    hero: {
      title: "Free Image and PDF Conversion Tools",
      description:
        "A free collection of browser-based tools for converting JPG, PNG, WebP, HEIC, GIF, and PDF files, plus image compression, resizing, cropping, and other practical tasks.",
      primaryButtonLabel: "View All Tools",
      secondaryButtonLabel: "Contact",
    },
    stats: [
      { value: "35 Tools", label: "Image and PDF tasks covered" },
      { value: "Free", label: "No signup required" },
      { value: "Safe", label: "Processed in your browser" },
    ],
    popularToolsTitle: "Popular Tools",
    toolsPageLinkLabel: "View all",
    popularTools: [
      {
        name: "JPG to PNG",
        href: "/tools/jpg-to-png",
        description: "Convert JPG images to PNG for editing-friendly output.",
      },
      {
        name: "PNG to JPG",
        href: "/tools/png-to-jpg",
        description: "Convert PNG images to JPG for lighter sharing and uploads.",
      },
      {
        name: "Image Compress",
        href: "/tools/image-compress",
        description: "Compress images to reduce file size directly in your browser.",
      },
      {
        name: "Resize Image",
        href: "/tools/resize-image",
        description: "Resize images for web, documents, and social media.",
      },
      {
        name: "PDF to JPG",
        href: "/tools/pdf-to-jpg",
        description: "Convert PDF pages into JPG images.",
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
        description: "Resize, compress, and edit images in a lightweight workflow.",
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
        description: "Convert and reorganize PDF files.",
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
        "AI Image Tools is a free browser-based site for image conversion, image editing, and PDF workflows.",
        "The site is designed to be practical, lightweight, and easy to navigate for both personal and work-related tasks.",
        "In addition to tools, the site includes guides, related links, and support pages to make the overall workflow easier to understand.",
      ],
    },
    toolsSection: {
      title: "Tools List Page",
      description:
        "If you want to browse all image conversion, image editing, and PDF tools by category, visit the tools list page.",
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
          "Yes. Most tools are designed to process files in your browser, so files are not sent to an external server.",
      },
      {
        question: "What file formats are supported?",
        answer:
          "Tools supporting JPG, PNG, WebP, HEIC, GIF, AVIF, BMP, TIFF, ICO, SVG, and PDF workflows are available.",
      },
      {
        question: "Will more tools be added later?",
        answer:
          "Yes. The site will continue to improve existing tools and add new workflows over time.",
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
