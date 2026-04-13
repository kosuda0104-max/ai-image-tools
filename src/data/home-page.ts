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

const ja = {
  heroTitle: "\u30d6\u30e9\u30a6\u30b6\u3067\u4f7f\u3048\u308b\u753b\u50cf\u5909\u63db\u30fbPDF\u30c4\u30fc\u30eb",
  heroDescription:
    "JPG\u3001PNG\u3001WebP\u3001HEIC\u3001GIF\u3001PDF \u306a\u3069\u306e\u5909\u63db\u3084\u3001\u753b\u50cf\u5727\u7e2e\u3001\u30ea\u30b5\u30a4\u30ba\u3001\u5207\u308a\u629c\u304d\u307e\u3067\u3092\u30d6\u30e9\u30a6\u30b6\u4e0a\u3067\u624b\u8efd\u306b\u884c\u3048\u308b\u7121\u6599\u30c4\u30fc\u30eb\u96c6\u3067\u3059\u3002",
  viewTools: "\u30c4\u30fc\u30eb\u4e00\u89a7\u3092\u898b\u308b",
  contact: "\u304a\u554f\u3044\u5408\u308f\u305b",
  stats: [
    { value: "39\u30c4\u30fc\u30eb\u63b2\u8f09", label: "\u753b\u50cf\u30fbPDF\u4f5c\u696d\u3092\u5e45\u5e83\u304f\u30ab\u30d0\u30fc" },
    { value: "\u7121\u6599", label: "\u767b\u9332\u4e0d\u8981\u3067\u3059\u3050\u4f7f\u3048\u308b" },
    { value: "\u5b89\u5168", label: "\u30d6\u30e9\u30a6\u30b6\u5185\u3067\u51e6\u7406" },
  ],
  popularTitle: "\u3088\u304f\u4f7f\u308f\u308c\u308b\u30c4\u30fc\u30eb",
  viewAll: "\u3059\u3079\u3066\u898b\u308b",
  aboutTitle: "\u3053\u306e\u30b5\u30a4\u30c8\u306b\u3064\u3044\u3066",
  aboutBody1:
    "AI Image Tools \u306f\u3001\u753b\u50cf\u5909\u63db\u3001\u753b\u50cf\u8abf\u6574\u3001PDF \u4f5c\u696d\u3092\u30d6\u30e9\u30a6\u30b6\u3060\u3051\u3067\u9032\u3081\u3089\u308c\u308b\u7121\u6599\u30c4\u30fc\u30eb\u30b5\u30a4\u30c8\u3067\u3059\u3002",
  aboutBody2:
    "\u521d\u3081\u3066\u4f7f\u3046\u4eba\u3067\u3082\u8ff7\u3044\u306b\u304f\u3044 UI \u3068\u3001\u5b9f\u52d9\u3067\u3082\u4f7f\u3044\u3084\u3059\u3044\u8efd\u3055\u3092\u91cd\u8996\u3057\u3066\u3044\u307e\u3059\u3002",
  toolsTitle: "\u30c4\u30fc\u30eb\u4e00\u89a7\u30da\u30fc\u30b8",
  toolsDescription:
    "\u753b\u50cf\u5909\u63db\u3001\u753b\u50cf\u7de8\u96c6\u3001PDF \u30c4\u30fc\u30eb\u3092\u30ab\u30c6\u30b4\u30ea\u3054\u3068\u306b\u3055\u304c\u305b\u307e\u3059\u3002",
  toolsButton: "\u30c4\u30fc\u30eb\u4e00\u89a7\u3078",
  faqTitle: "\u3088\u304f\u3042\u308b\u8cea\u554f",
  faq1q: "AI Image Tools \u306f\u7121\u6599\u3067\u4f7f\u3048\u307e\u3059\u304b\uff1f",
  faq1a: "\u306f\u3044\u3002\u516c\u958b\u4e2d\u306e\u30c4\u30fc\u30eb\u306f\u7121\u6599\u3067\u4f7f\u3048\u307e\u3059\u3002",
  faq2q: "\u753b\u50cf\u306f\u5b89\u5168\u306b\u6271\u308f\u308c\u307e\u3059\u304b\uff1f",
  faq2a: "\u591a\u304f\u306e\u30c4\u30fc\u30eb\u306f\u30d6\u30e9\u30a6\u30b6\u5185\u3067\u51e6\u7406\u3059\u308b\u305f\u3081\u3001\u30d5\u30a1\u30a4\u30eb\u306f\u5916\u90e8\u30b5\u30fc\u30d0\u30fc\u3078\u9001\u4fe1\u3055\u308c\u307e\u305b\u3093\u3002",
  faq3q: "\u3069\u306e\u5f62\u5f0f\u306b\u5bfe\u5fdc\u3057\u3066\u3044\u307e\u3059\u304b\uff1f",
  faq3a: "JPG\u3001PNG\u3001WebP\u3001HEIC\u3001GIF\u3001AVIF\u3001BMP\u3001TIFF\u3001ICO\u3001SVG\u3001PDF \u306a\u3069\u306b\u5bfe\u5fdc\u3057\u305f\u30c4\u30fc\u30eb\u304c\u3042\u308a\u307e\u3059\u3002",
  faq4q: "\u4eca\u5f8c\u3082\u30c4\u30fc\u30eb\u306f\u5897\u3048\u307e\u3059\u304b\uff1f",
  faq4a: "\u306f\u3044\u3002\u9700\u8981\u306e\u9ad8\u3044\u30ef\u30fc\u30af\u30d5\u30ed\u30fc\u3092\u9806\u6b21\u8ffd\u52a0\u3057\u3066\u3044\u304f\u4e88\u5b9a\u3067\u3059\u3002",
  contactTitle: "\u304a\u554f\u3044\u5408\u308f\u305b",
  contactBody:
    "\u4e0d\u5177\u5408\u5831\u544a\u3001\u6a5f\u80fd\u8981\u671b\u3001\u8ffd\u52a0\u3057\u3066\u307b\u3057\u3044\u30c4\u30fc\u30eb\u306e\u76f8\u8ac7\u304c\u3042\u308c\u3070\u3001\u304a\u554f\u3044\u5408\u308f\u305b\u30da\u30fc\u30b8\u304b\u3089\u9001\u308c\u307e\u3059\u3002",
  contactButton: "\u304a\u554f\u3044\u5408\u308f\u305b\u30da\u30fc\u30b8\u3078",
  cat1: "\u753b\u50cf\u5f62\u5f0f\u306e\u5909\u63db",
  cat1d: "JPG\u3001PNG\u3001WebP\u3001HEIC \u306a\u3069\u3092\u5225\u306e\u5f62\u5f0f\u3078\u5909\u63db\u3057\u305f\u3044\u3068\u304d\u306e\u30c4\u30fc\u30eb\u3067\u3059\u3002",
  cat2: "\u753b\u50cf\u306e\u8abf\u6574\u3068\u5727\u7e2e",
  cat2d: "\u5bb9\u91cf\u8abf\u6574\u3001\u30b5\u30a4\u30ba\u5909\u66f4\u3001\u5207\u308a\u629c\u304d\u306a\u3069\u3001\u753b\u50cf\u3092\u4f7f\u3044\u3084\u3059\u304f\u6574\u3048\u308b\u305f\u3081\u306e\u30c4\u30fc\u30eb\u3067\u3059\u3002",
  cat3: "PDF \u30c4\u30fc\u30eb",
  cat3d: "PDF \u306e\u5909\u63db\u3001\u7d50\u5408\u3001\u5206\u5272\u3001\u5727\u7e2e\u306a\u3069\u3001\u5b9f\u52d9\u3067\u3088\u304f\u4f7f\u3046\u4f5c\u696d\u3092\u307e\u3068\u3081\u3066\u3044\u307e\u3059\u3002",
};

export const homePageContent: Record<HomePageLocale, HomePageContent> = {
  ja: {
    badge: "AI Image Tools",
    hero: {
      title: ja.heroTitle,
      description: ja.heroDescription,
      primaryButtonLabel: ja.viewTools,
      secondaryButtonLabel: ja.contact,
    },
    stats: ja.stats,
    popularToolsTitle: ja.popularTitle,
    toolsPageLinkLabel: ja.viewAll,
    popularTools: [
      { name: "JPG to PNG", href: "/tools/jpg-to-png", description: "Convert JPG images to PNG for editing-friendly output." },
      { name: "PNG to JPG", href: "/tools/png-to-jpg", description: "Convert PNG images to JPG for lighter sharing and uploads." },
      { name: "HEIC to JPG", href: "/tools/heic-to-jpg", description: "Convert iPhone-friendly HEIC files into widely accepted JPG." },
      { name: "JPG Compress", href: "/tools/jpg-compress", description: "Reduce JPG file size for web delivery, email, or uploads." },
      { name: "Image Compress", href: "/tools/image-compress", description: "Compress images to reduce file size directly in your browser." },
      { name: "PDF to JPG", href: "/tools/pdf-to-jpg", description: "Convert PDF pages into JPG images." },
    ],
    categories: [
      {
        title: ja.cat1,
        description: ja.cat1d,
        tools: [
          { name: "JPG to PNG", href: "/tools/jpg-to-png", description: "Convert JPG to PNG." },
          { name: "PNG to JPG", href: "/tools/png-to-jpg", description: "Convert PNG to JPG." },
          { name: "HEIC to JPG", href: "/tools/heic-to-jpg", description: "Convert HEIC to JPG." },
          { name: "HEIC to PNG", href: "/tools/heic-to-png", description: "Convert HEIC to PNG." },
        ],
      },
      {
        title: ja.cat2,
        description: ja.cat2d,
        tools: [
          { name: "Image Compress", href: "/tools/image-compress", description: "Compress JPG, PNG, and WebP images." },
          { name: "JPG Compress", href: "/tools/jpg-compress", description: "Compress JPG files." },
          { name: "PNG Compress", href: "/tools/png-compress", description: "Try reducing PNG size." },
          { name: "WebP Compress", href: "/tools/webp-compress", description: "Compress WebP files." },
        ],
      },
      {
        title: ja.cat3,
        description: ja.cat3d,
        tools: [
          { name: "Image to PDF", href: "/tools/image-to-pdf", description: "Convert images to PDF." },
          { name: "PDF to JPG", href: "/tools/pdf-to-jpg", description: "Convert PDF files to JPG images." },
          { name: "PDF to PNG", href: "/tools/pdf-to-png", description: "Convert PDF files to PNG images." },
          { name: "Merge PDF", href: "/tools/merge-pdf", description: "Merge PDF files." },
        ],
      },
    ],
    aboutSection: {
      title: ja.aboutTitle,
      paragraphs: [ja.aboutBody1, ja.aboutBody2],
    },
    toolsSection: {
      title: ja.toolsTitle,
      description: ja.toolsDescription,
      buttonLabel: ja.toolsButton,
    },
    faqSectionTitle: ja.faqTitle,
    faqItems: [
      { question: ja.faq1q, answer: ja.faq1a },
      { question: ja.faq2q, answer: ja.faq2a },
      { question: ja.faq3q, answer: ja.faq3a },
      { question: ja.faq4q, answer: ja.faq4a },
    ],
    contactSection: {
      title: ja.contactTitle,
      description: ja.contactBody,
      buttonLabel: ja.contactButton,
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
      { value: "39 Tools", label: "Image and PDF tasks covered" },
      { value: "Free", label: "No signup required" },
      { value: "Safe", label: "Processed in your browser" },
    ],
    popularToolsTitle: "Popular Tools",
    toolsPageLinkLabel: "View all",
    popularTools: [
      { name: "JPG to PNG", href: "/tools/jpg-to-png", description: "Convert JPG images to PNG for editing-friendly output." },
      { name: "PNG to JPG", href: "/tools/png-to-jpg", description: "Convert PNG images to JPG for lighter sharing and uploads." },
      { name: "HEIC to JPG", href: "/tools/heic-to-jpg", description: "Convert iPhone-friendly HEIC files into widely accepted JPG." },
      { name: "JPG Compress", href: "/tools/jpg-compress", description: "Reduce JPG file size for web delivery, email, or uploads." },
      { name: "Image Compress", href: "/tools/image-compress", description: "Compress images to reduce file size directly in your browser." },
      { name: "PDF to JPG", href: "/tools/pdf-to-jpg", description: "Convert PDF pages into JPG images." },
    ],
    categories: [
      {
        title: "Image Conversion",
        description: "Convert images from one format to another.",
        tools: [
          { name: "JPG to PNG", href: "/tools/jpg-to-png", description: "Convert JPG to PNG." },
          { name: "PNG to JPG", href: "/tools/png-to-jpg", description: "Convert PNG to JPG." },
          { name: "HEIC to JPG", href: "/tools/heic-to-jpg", description: "Convert HEIC to JPG." },
          { name: "HEIC to PNG", href: "/tools/heic-to-png", description: "Convert HEIC to PNG." },
        ],
      },
      {
        title: "Image Editing",
        description: "Resize, compress, and edit images in a lightweight workflow.",
        tools: [
          { name: "Image Compress", href: "/tools/image-compress", description: "Compress JPG, PNG, and WebP images." },
          { name: "JPG Compress", href: "/tools/jpg-compress", description: "Compress JPG files." },
          { name: "PNG Compress", href: "/tools/png-compress", description: "Try reducing PNG size." },
          { name: "WebP Compress", href: "/tools/webp-compress", description: "Compress WebP files." },
        ],
      },
      {
        title: "PDF Tools",
        description: "Convert and reorganize PDF files.",
        tools: [
          { name: "Image to PDF", href: "/tools/image-to-pdf", description: "Convert images to PDF." },
          { name: "PDF to JPG", href: "/tools/pdf-to-jpg", description: "Convert PDF files to JPG images." },
          { name: "PDF to PNG", href: "/tools/pdf-to-png", description: "Convert PDF files to PNG images." },
          { name: "Merge PDF", href: "/tools/merge-pdf", description: "Merge PDF files." },
        ],
      },
    ],
    aboutSection: {
      title: "About This Site",
      paragraphs: [
        "AI Image Tools is a free browser-based site for image conversion, image editing, and PDF workflows.",
        "The site is designed to be practical, lightweight, and easy to navigate for both personal and work-related tasks.",
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
      { question: "Is AI Image Tools free to use?", answer: "Yes. The currently published tools are free to use." },
      { question: "Are uploaded files safe?", answer: "Most tools process files in your browser, so they are not sent to an external server." },
      { question: "What file formats are supported?", answer: "JPG, PNG, WebP, HEIC, GIF, AVIF, BMP, TIFF, ICO, SVG, and PDF workflows are covered." },
      { question: "Will more tools be added later?", answer: "Yes. The site will continue to improve existing tools and add new workflows over time." },
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
