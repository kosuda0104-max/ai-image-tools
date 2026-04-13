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
  heroTitle: "\u30d6\u30e9\u30a6\u30b6\u3067\u4f7f\u3048\u308b\u753b\u50cf\u30fbPDF\u30c4\u30fc\u30eb\u4e00\u89a7",
  heroDescription:
    "\u753b\u50cf\u5909\u63db\u3001\u753b\u50cf\u5727\u7e2e\u3001\u30ea\u30b5\u30a4\u30ba\u3001PDF \u5909\u63db\u3084\u7d50\u5408\u307e\u3067\u3001\u3088\u304f\u4f7f\u3046\u4f5c\u696d\u3092\u30d6\u30e9\u30a6\u30b6\u3060\u3051\u3067\u9032\u3081\u3089\u308c\u308b\u7121\u6599\u30c4\u30fc\u30eb\u3092\u307e\u3068\u3081\u3066\u3044\u307e\u3059\u3002",
  stats: [
    { value: "39\u30c4\u30fc\u30eb", label: "\u753b\u50cf\u30fbPDF\u4f5c\u696d\u3092\u30ab\u30d0\u30fc" },
    { value: "\u7121\u6599", label: "\u767b\u9332\u4e0d\u8981\u3067\u3059\u3050\u4f7f\u3048\u308b" },
    { value: "\u5b89\u5168", label: "\u30d6\u30e9\u30a6\u30b6\u5185\u3067\u51e6\u7406" },
  ],
  popularToolsTitle: "\u6ce8\u76ee\u30c4\u30fc\u30eb",
  popularToolsDescription:
    "\u307e\u305a\u4f7f\u308f\u308c\u3084\u3059\u3044\u5909\u63db\u3001\u4e92\u63db\u6027\u5bfe\u5fdc\u3001\u5727\u7e2e\u7cfb\u306e\u30c4\u30fc\u30eb\u3092\u4e2d\u5fc3\u306b\u4e26\u3079\u3066\u3044\u307e\u3059\u3002",
  topPageLinkLabel: "\u30c8\u30c3\u30d7\u30da\u30fc\u30b8\u3078",
  seoSpotlightTitle: "\u691c\u7d22\u9700\u8981\u304c\u5f37\u3044\u30c4\u30fc\u30eb",
  seoSpotlightDescription:
    "\u5f62\u5f0f\u5909\u63db\u3001\u4e92\u63db\u6027\u5bfe\u5fdc\u3001\u5bb9\u91cf\u524a\u6e1b\u306f\u691c\u7d22\u610f\u56f3\u304c\u306f\u3063\u304d\u308a\u3057\u3066\u3044\u308b\u305f\u3081\u3001\u307e\u305a\u306f\u3053\u306e\u3042\u305f\u308a\u304b\u3089\u63a2\u3059\u3068\u76ee\u7684\u306b\u5408\u3046\u30c4\u30fc\u30eb\u3092\u898b\u3064\u3051\u3084\u3059\u3044\u3067\u3059\u3002",
  guide1: "\u3053\u306e\u4e00\u89a7\u30da\u30fc\u30b8\u306e\u898b\u65b9",
  guide1a:
    "\u76ee\u7684\u306b\u8fd1\u3044\u30ab\u30c6\u30b4\u30ea\u304b\u3089\u898b\u308b\u3068\u3001\u753b\u50cf\u5909\u63db\u3001\u753b\u50cf\u8abf\u6574\u3001PDF \u4f5c\u696d\u306e\u3069\u308c\u304b\u306b\u3059\u3050\u305f\u3069\u308a\u7740\u3051\u307e\u3059\u3002",
  guide1b:
    "\u5bb9\u91cf\u3092\u8efd\u304f\u3057\u305f\u3044\u306a\u3089 JPG\u3001WebP\u3001\u5727\u7e2e\u7cfb\u30c4\u30fc\u30eb\u3001\u900f\u904e\u3084\u518d\u7de8\u96c6\u3092\u91cd\u8996\u3059\u308b\u306a\u3089 PNG \u7cfb\u30c4\u30fc\u30eb\u304b\u3089\u63a2\u3059\u306e\u304c\u304a\u3059\u3059\u3081\u3067\u3059\u3002",
  guide2: "\u4e00\u89a7\u3060\u3051\u3067\u7d42\u308f\u3089\u305b\u306a\u3044\u305f\u3081\u306b",
  guide2a:
    "\u5404\u30c4\u30fc\u30eb\u30da\u30fc\u30b8\u306b\u306f\u6bd4\u8f03\u3001\u6ce8\u610f\u70b9\u3001\u95a2\u9023\u30c4\u30fc\u30eb\u3082\u7f6e\u3044\u3066\u3044\u308b\u306e\u3067\u3001\u5909\u63db\u5f8c\u306e\u6b21\u306e\u4f5c\u696d\u306b\u3082\u3064\u306a\u3052\u3084\u3059\u304f\u3057\u3066\u3044\u307e\u3059\u3002",
  guide2b:
    "\u3069\u306e\u5f62\u5f0f\u3092\u9078\u3076\u3079\u304d\u304b\u8ff7\u3046\u5834\u5408\u306f\u3001\u30ac\u30a4\u30c9\u30da\u30fc\u30b8\u304b\u3089\u8003\u3048\u65b9\u3092\u6574\u7406\u3057\u3066\u304b\u3089\u9078\u3076\u3068\u5931\u6557\u3057\u306b\u304f\u3044\u3067\u3059\u3002",
  cat1: "\u753b\u50cf\u5f62\u5f0f\u306e\u5909\u63db",
  cat1d: "\u753b\u50cf\u3092\u5225\u306e\u5f62\u5f0f\u3078\u5909\u63db\u3057\u305f\u3044\u3068\u304d\u306e\u30c4\u30fc\u30eb\u3067\u3059\u3002",
  cat2: "\u753b\u50cf\u306e\u8abf\u6574\u3068\u5727\u7e2e",
  cat2d: "\u5bb9\u91cf\u8abf\u6574\u3001\u30b5\u30a4\u30ba\u5909\u66f4\u3001\u5207\u308a\u629c\u304d\u3001\u56de\u8ee2\u306a\u3069\u3001\u753b\u50cf\u3092\u4f7f\u3044\u3084\u3059\u304f\u6574\u3048\u308b\u305f\u3081\u306e\u30c4\u30fc\u30eb\u3067\u3059\u3002",
  cat3: "PDF \u30c4\u30fc\u30eb",
  cat3d: "PDF \u306e\u5909\u63db\u3001\u7d50\u5408\u3001\u5206\u5272\u3001\u5727\u7e2e\u3001\u56de\u8ee2\u306a\u3069\u3092\u307e\u3068\u3081\u3066\u3044\u307e\u3059\u3002",
  aboutTitle: "\u3053\u306e\u4e00\u89a7\u30da\u30fc\u30b8\u306b\u3064\u3044\u3066",
  about1: "\u3053\u306e\u30da\u30fc\u30b8\u3067\u306f\u3001\u753b\u50cf\u5909\u63db\u3001\u753b\u50cf\u8abf\u6574\u3001PDF \u30c4\u30fc\u30eb\u3092\u30ab\u30c6\u30b4\u30ea\u3054\u3068\u306b\u307e\u3068\u3081\u3066\u3044\u307e\u3059\u3002",
  about2: "\u691c\u7d22\u304b\u3089\u6765\u305f\u4eba\u3067\u3082\u95a2\u9023\u30c4\u30fc\u30eb\u3092\u898b\u3064\u3051\u3084\u3059\u3044\u3088\u3046\u306b\u3001\u7528\u9014\u306e\u8fd1\u3044\u4f5c\u696d\u3092\u4e00\u7dd2\u306b\u63a2\u305b\u308b\u69cb\u6210\u306b\u3057\u3066\u3044\u307e\u3059\u3002",
  homeTitle: "\u30c8\u30c3\u30d7\u30da\u30fc\u30b8",
  homeDescription: "\u3088\u304f\u4f7f\u3046\u30c4\u30fc\u30eb\u3060\u3051\u3092\u7d20\u65e9\u304f\u898b\u305f\u3044\u5834\u5408\u306f\u3001\u30c8\u30c3\u30d7\u30da\u30fc\u30b8\u304b\u3089\u4eba\u6c17\u30c4\u30fc\u30eb\u306b\u3059\u3050\u79fb\u52d5\u3067\u304d\u307e\u3059\u3002",
  homeButton: "\u30c8\u30c3\u30d7\u30da\u30fc\u30b8\u3078",
  contactTitle: "\u304a\u554f\u3044\u5408\u308f\u305b",
  contactDescription: "\u4e0d\u5177\u5408\u5831\u544a\u3084\u8ffd\u52a0\u5e0c\u671b\u306e\u30c4\u30fc\u30eb\u304c\u3042\u308c\u3070\u3001\u304a\u554f\u3044\u5408\u308f\u305b\u30da\u30fc\u30b8\u304b\u3089\u6c17\u8efd\u306b\u9001\u308c\u307e\u3059\u3002",
  contactButton: "\u304a\u554f\u3044\u5408\u308f\u305b\u30da\u30fc\u30b8\u3078",
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
          "スクリーンショットや資料画像を扱いやすい形式に整えたいときに向いています。",
      },
      {
        ...getToolItem("ja", "png-to-jpg"),
        reason:
          "容量を軽くして共有しやすくしたいときに使いやすい定番ツールです。",
      },
      {
        ...getToolItem("ja", "heic-to-jpg"),
        reason:
          "iPhone 写真を幅広い環境で使える形にしたいときに便利です。",
      },
      {
        ...getToolItem("ja", "jpg-compress"),
        reason:
          "写真中心の画像を公開前に軽くしたいときに使いやすいです。",
      },
      {
        ...getToolItem("ja", "image-compress"),
        reason:
          "画像の容量調整をまとめて考えたいときの入口に向いています。",
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
      { value: "39 Tools", label: "Image and PDF tools available" },
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
