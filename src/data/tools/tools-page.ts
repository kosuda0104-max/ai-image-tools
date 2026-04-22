import { getToolItem, getToolItems } from "@/src/data/tool-directory";

export type ToolPageLocale = "ja" | "en";

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

type SeoSpotlightItem = {
  name: string;
  href: string;
  reason: string;
};

type SeoGuideSection = {
  title: string;
  paragraphs: string[];
};

type ToolsPageContent = {
  badge: string;
  hero: {
    title: string;
    description: string;
  };
  stats: {
    value: string;
    label: string;
  }[];
  popularToolsTitle: string;
  popularToolsDescription: string;
  topPageLinkLabel: string;
  seoSpotlightTitle: string;
  seoSpotlightDescription: string;
  seoSpotlightTools: SeoSpotlightItem[];
  guideSections: SeoGuideSection[];
  categories: ToolCategory[];
  aboutSection: {
    title: string;
    paragraphs: string[];
  };
  homeSection: {
    title: string;
    description: string;
    buttonLabel: string;
  };
  contactSection: {
    title: string;
    description: string;
    buttonLabel: string;
  };
};

const imageConversionSlugs = [
  "jpg-to-png",
  "png-to-jpg",
  "webp-to-png",
  "webp-to-jpg",
  "jpg-to-webp",
  "png-to-webp",
  "heic-to-jpg",
  "heic-to-png",
  "gif-to-png",
  "gif-to-jpg",
  "avif-to-jpg",
  "avif-to-png",
  "bmp-to-jpg",
  "bmp-to-png",
  "tiff-to-jpg",
  "tiff-to-png",
  "ico-to-png",
  "ico-to-jpg",
  "svg-to-png",
  "svg-to-jpg",
] as const;

const imageEditingSlugs = [
  "image-compress",
  "jpg-compress",
  "png-compress",
  "webp-compress",
  "resize-image",
  "crop-image",
  "rotate-image",
  "flip-image",
  "grayscale-image",
  "watermark-image",
] as const;

const pdfToolSlugs = [
  "image-to-pdf",
  "jpg-to-pdf",
  "pdf-to-jpg",
  "pdf-to-png",
  "pdf-to-webp",
  "merge-pdf",
  "split-pdf",
  "compress-pdf",
  "rotate-pdf",
  "pdf-remove-pages",
] as const;

const ja = {
  heroTitle: "ブラウザで使える画像・PDFツール一覧",
  heroDescription:
    "画像変換、画像圧縮、リサイズ、PDF 変換や結合まで、よく使う作業をブラウザだけで進められる無料ツールをまとめています。形式の違いで迷ったときも、近い作業を並べて見比べやすい構成です。",
  stats: [
    { value: "40ツール", label: "画像・PDF 作業をカバー" },
    { value: "無料", label: "登録不要ですぐ使える" },
    { value: "安全", label: "ブラウザ内で処理" },
  ],
  popularToolsTitle: "注目ツール",
  popularToolsDescription:
    "変換、互換性対応、軽量化のように、最初に探されやすい作業を中心に並べています。",
  topPageLinkLabel: "トップページへ",
  seoSpotlightTitle: "まず見ておきたいツール",
  seoSpotlightDescription:
    "検索流入が多い変換系だけでなく、実際には次の作業につながりやすい補助ツールも混ぜています。どこから触るか迷うときの入口として使いやすい並びです。",
  guide1: "この一覧ページの使い方",
  guide1a:
    "まずは目的に近いカテゴリを見るのがおすすめです。形式を変えたいのか、容量を軽くしたいのか、PDF を整えたいのかで入口を分けると迷いにくくなります。",
  guide1b:
    "たとえば共有向けなら JPG や WebP、編集前提なら PNG、提出資料なら PDF 系のツールから探すと流れを作りやすいです。",
  guide2: "埋もれやすいけれど便利なツール",
  guide2a:
    "回転、反転、透かし、白黒化、ページ削除のような補助系ツールは、検索では見つけにくくても実作業ではかなり役立ちます。",
  guide2b:
    "変換だけで終わらず、その次の微調整までできるのがこの一覧ページの強みです。必要に応じて関連ツールもたどってみてください。",
  cat1: "画像形式の変換",
  cat1d: "画像を別の形式へ変換したいときのツールです。互換性を広げたいときや、編集しやすい形式へ寄せたいときに向いています。",
  cat2: "画像の調整と圧縮",
  cat2d: "容量調整、サイズ変更、切り抜き、回転など、画像を使いやすく整えるためのツールです。公開前や提出前の仕上げにも使えます。",
  cat3: "PDF ツール",
  cat3d: "PDF の変換、結合、分割、圧縮、回転、ページ削除など、実務でよく使う PDF 作業をまとめています。",
  aboutTitle: "この一覧ページについて",
  about1: "このページでは、画像変換、画像調整、PDF ツールをカテゴリごとにまとめています。どの作業に近いかが分かるよう、役割の似たツールを近くに置いています。",
  about2: "検索から来た人でも関連ツールを見つけやすいようにしているので、変換の次に圧縮、圧縮の次にリサイズといった流れも追いやすくなっています。",
  homeTitle: "トップページ",
  homeDescription: "よく使うツールだけを素早く見たい場合は、トップページから人気ツールにすぐ移動できます。",
  homeButton: "トップページへ",
  contactTitle: "お問い合わせ",
  contactDescription: "不具合報告や追加してほしいツールがあれば、お問い合わせページから気軽に送れます。",
  contactButton: "お問い合わせページへ",
};

export const toolsPageContent: Record<ToolPageLocale, ToolsPageContent> = {
  ja: {
    badge: "AI Image Tools",
    hero: { title: ja.heroTitle, description: ja.heroDescription },
    stats: ja.stats,
    popularToolsTitle: ja.popularToolsTitle,
    popularToolsDescription: ja.popularToolsDescription,
    topPageLinkLabel: ja.topPageLinkLabel,
    seoSpotlightTitle: ja.seoSpotlightTitle,
    seoSpotlightDescription: ja.seoSpotlightDescription,
    seoSpotlightTools: [
      {
        ...getToolItem("ja", "jpg-to-png"),
        reason:
          "スクリーンショットや資料用画像を、あとから扱いやすい形に変えたいときの定番です。",
      },
      {
        ...getToolItem("ja", "heic-to-jpg"),
        reason:
          "iPhone 写真を送信や入稿で詰まりにくい形式へそろえたいときに便利です。",
      },
      {
        ...getToolItem("ja", "image-compress"),
        reason:
          "画像の容量をまとめて見直したいときの入口にしやすく、公開前の調整にも向いています。",
      },
      {
        ...getToolItem("ja", "webp-compress"),
        reason:
          "すでに WebP にしてある画像を、さらに軽くしたいときに役立つ補助ツールです。",
      },
      {
        ...getToolItem("ja", "pdf-remove-pages"),
        reason:
          "PDF を分割するほどではないけれど、余計なページだけ外したい場面でかなり使いやすいです。",
      },
    ],
    guideSections: [
      { title: ja.guide1, paragraphs: [ja.guide1a, ja.guide1b] },
      { title: ja.guide2, paragraphs: [ja.guide2a, ja.guide2b] },
    ],
    categories: [
      {
        title: ja.cat1,
        description: ja.cat1d,
        tools: getToolItems("ja", imageConversionSlugs),
      },
      {
        title: ja.cat2,
        description: ja.cat2d,
        tools: getToolItems("ja", imageEditingSlugs),
      },
      {
        title: ja.cat3,
        description: ja.cat3d,
        tools: getToolItems("ja", pdfToolSlugs),
      },
    ],
    aboutSection: {
      title: ja.aboutTitle,
      paragraphs: [ja.about1, ja.about2],
    },
    homeSection: {
      title: ja.homeTitle,
      description: ja.homeDescription,
      buttonLabel: ja.homeButton,
    },
    contactSection: {
      title: ja.contactTitle,
      description: ja.contactDescription,
      buttonLabel: ja.contactButton,
    },
  },
  en: {
    badge: "AI Image Tools",
    hero: {
      title: "Free Image and PDF Conversion Tools",
      description:
        "A free collection of tools for converting JPG, PNG, WebP, HEIC, GIF, AVIF, BMP, TIFF, ICO, SVG, and PDF files, plus image compression, resizing, cropping, grayscale conversion, and watermarking. Everything runs in your browser, so your files are not uploaded to an external server.",
    },
    stats: [
      { value: "40 Tools", label: "Image and PDF tools available" },
      { value: "Free", label: "No signup required" },
      { value: "Safe", label: "Processed in your browser" },
    ],
    popularToolsTitle: "Popular Tools",
    popularToolsDescription:
      "These are the tools many users look for first when they need a fast image or PDF workflow fix.",
    topPageLinkLabel: "Back to Home",
    seoSpotlightTitle: "High-demand tools",
    seoSpotlightDescription:
      "These tools cover the most common format conversion, compatibility, and optimization needs. They are strong starting points for high-intent search traffic.",
    seoSpotlightTools: [
      {
        ...getToolItem("en", "jpg-to-png"),
        reason:
          "Useful for screenshots, design handoff, and editing-friendly output.",
      },
      {
        ...getToolItem("en", "png-to-jpg"),
        reason: "A practical tool for lighter uploads and easier sharing.",
      },
      {
        ...getToolItem("en", "webp-to-jpg"),
        reason: "A strong compatibility-focused conversion for mixed workflows.",
      },
      {
        ...getToolItem("en", "heic-to-jpg"),
        reason: "A common need for iPhone photo uploads and broader sharing.",
      },
      {
        ...getToolItem("en", "image-compress"),
        reason: "A broad utility for page speed, storage, and upload limits.",
      },
    ],
    guideSections: [
      {
        title: "How to use this tools page",
        paragraphs: [
          "Start with the category closest to your goal: image conversion, image editing, or PDF tools.",
          "If your goal is smaller files, look at JPG, WebP, or compression tools. If your goal is edit-friendly output, PNG-related tools are often a better fit.",
        ],
      },
      {
        title: "Designed for search and discovery",
        paragraphs: [
          "This page is built so users can arrive from a specific search query and still discover the next useful step.",
          "That makes it useful not only as a directory but also as a workflow hub for common image and PDF tasks.",
        ],
      },
    ],
    categories: [
      {
        title: "Image Conversion",
        description: "Tools for converting images from one format to another.",
        tools: getToolItems("en", imageConversionSlugs),
      },
      {
        title: "Image Editing",
        description: "Tools for adjusting image size and appearance.",
        tools: getToolItems("en", imageEditingSlugs),
      },
      {
        title: "PDF Tools",
        description:
          "Tools for converting between images and PDFs and editing PDF files.",
        tools: getToolItems("en", pdfToolSlugs),
      },
    ],
    aboutSection: {
      title: "About This Tools Page",
      paragraphs: [
        "This page organizes image conversion, image editing, and PDF tools by category.",
        "It is designed to help both direct search visitors and users exploring related workflows.",
      ],
    },
    homeSection: {
      title: "Home Page",
      description:
        "If you only want quick access to the most commonly used tools, you can jump to them from the home page.",
      buttonLabel: "Go to Home",
    },
    contactSection: {
      title: "Contact",
      description:
        "If you find a bug or want to request a new tool, please contact us through the contact page.",
      buttonLabel: "Go to Contact Page",
    },
  },
};

export const popularTools = [
  getToolItem("en", "jpg-to-png"),
  getToolItem("en", "png-to-jpg"),
  getToolItem("en", "heic-to-jpg"),
  getToolItem("en", "jpg-compress"),
  getToolItem("en", "image-compress"),
  getToolItem("en", "pdf-to-jpg"),
];


