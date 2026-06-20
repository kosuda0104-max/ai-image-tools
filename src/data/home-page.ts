import { getToolItems } from "@/src/data/tool-directory";
import { getGuide } from "@/src/data/guides";

/**
 * Guides featured on the homepage. Deliberately spans every topic cluster
 * (incl. the Parquet/CSV data guides) so each cluster gets an internal link
 * from the highest-authority page on the site.
 */
const HOME_GUIDE_SLUGS = [
  "image-format-basics",
  "compress-images-without-losing-quality",
  "pdf-workflows",
  "what-is-parquet",
  "parquet-csv-workflows",
  "json-and-csv",
  "base64-data-uri-for-web-development",
];

function getHomeGuides(locale: "ja" | "en") {
  return HOME_GUIDE_SLUGS.map((slug) => getGuide(locale, slug))
    .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide))
    .map((guide) => ({
      slug: guide.slug,
      title: guide.title,
      cardDescription: guide.cardDescription,
    }));
}

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

type TaskPathItem = {
  title: string;
  description: string;
  tools: ToolItem[];
};

type HomePageLocale = "ja" | "en";

type GuideLink = {
  slug: string;
  title: string;
  cardDescription: string;
};

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
  taskPathsSection: {
    title: string;
    description: string;
    items: TaskPathItem[];
  };
  categories: ToolCategory[];
  guidesSection: {
    title: string;
    description: string;
    viewAllLabel: string;
    guides: GuideLink[];
  };
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
  heroTitle: "JPG・PNG・WebP・HEIC・PDF を変換する無料ブラウザツール集",
  heroDescription:
    "画像変換（JPG←→PNG←→WebP・HEIC→JPG）、画像圧縮、リサイズ、切り抜き、PDF の変換・結合・分割・圧縮、CSV・JSON・Parquet のデータ変換まで45種類以上のツールをブラウザだけで使えます。登録不要・ファイルは外部サーバーに送信されません。",
  viewTools: "ツール一覧を見る",
  contact: "お問い合わせ",
  stats: [
    { value: "45種類以上", label: "画像・PDF・データ変換ツールを提供中" },
    { value: "完全無料", label: "登録なしですぐ試せる" },
    { value: "ブラウザ完結", label: "ファイルはサーバーに送信されない" },
  ],
  popularTitle: "よく使われるツール",
  viewAll: "すべて見る",
  taskPathsTitle: "目的から選べるおすすめツール",
  taskPathsDescription:
    "何をしたいかが決まっているときは、ツール名から探すよりも目的から選ぶほうが早いです。提出前、共有前、形式のやり直しなど、よくある流れごとに使いやすいツールをまとめています。",
  aboutTitle: "このサイトについて",
  aboutBody1:
    "Filewisp は、画像変換、画像調整、PDF 作業をブラウザだけで進めやすくするための無料ツールサイトです。単に変換ボタンを置くだけでなく、用途ごとに迷いにくい説明や選び方も整えることを重視しています。",
  aboutBody2:
    "初めて使う人でも流れが追いやすいこと、仕事の途中でもすぐ使えること、形式の違いで困りにくいことを意識して更新しています。",
  toolsTitle: "ツール一覧ページ",
  toolsDescription:
    "画像変換、画像編集、PDF ツールをカテゴリごとにまとめています。やりたい作業が決まっているときも、似たツールを見比べたいときも探しやすい構成です。",
  toolsButton: "ツール一覧へ",
  faqTitle: "よくある質問",
  faq1q: "Filewisp は無料で使えますか？",
  faq1a: "はい。公開しているツールは無料で使えます。まず試してから使い勝手を確認したい人向けのサイトです。",
  faq2q: "画像は安全に扱われますか？",
  faq2a: "多くのツールはブラウザ内で処理するため、画像を外部サーバーに送らずに済みます。提出前の画像や社内資料でも使いやすいよう、この点は特に重視しています。",
  faq3q: "どの形式に対応していますか？",
  faq3a: "JPG、PNG、WebP、HEIC、GIF、AVIF、BMP、TIFF、ICO、SVG、PDF まわりの作業に対応しています。変換だけでなく、圧縮やリサイズ、結合や分割まで扱えます。",
  faq4q: "今後もツールは増えますか？",
  faq4a: "増やす予定はありますが、数だけを増やすよりも、いまあるツールの使い勝手や説明を先に改善する方針です。必要性の高いものから順に追加します。",
  contactTitle: "お問い合わせ",
  contactBody:
    "不具合報告、機能要望、追加してほしいツールの相談があれば、お問い合わせページから送れます。実際の困りごとをもとに改善内容を決めることが多いです。",
  contactButton: "お問い合わせページへ",
  cat1: "画像形式の変換",
  cat1d: "JPG、PNG、WebP、HEIC などを別の形式へ変換したいときのツールです。互換性を広げたいときや、編集しやすい形式へ寄せたいときに向いています。",
  cat2: "画像の調整と圧縮",
  cat2d: "容量調整、サイズ変更、切り抜きなど、画像を使いやすい状態に整えるためのツールです。公開前や提出前の仕上げにも使えます。",
  cat3: "PDF ツール",
  cat3d: "PDF の変換、結合、分割、圧縮など、実務でよくある PDF 作業をまとめています。資料整理や提出前の調整にも向いています。",
  cat4: "開発・データ処理ツール",
  cat4d: "CSV・JSON・Parquet・Base64 をブラウザ上で変換できます。APIレスポンス、DBエクスポート、AWS Athena・BigQuery・Spark のデータ確認、HTML・CSSへの画像埋め込みに使えます。",
};

export const homePageContent: Record<HomePageLocale, HomePageContent> = {
  ja: {
    badge: "Filewisp",
    hero: {
      title: ja.heroTitle,
      description: ja.heroDescription,
      primaryButtonLabel: ja.viewTools,
      secondaryButtonLabel: ja.contact,
    },
    stats: ja.stats,
    popularToolsTitle: ja.popularTitle,
    toolsPageLinkLabel: ja.viewAll,
    popularTools: getToolItems("ja", [
      "jpg-to-png",
      "png-to-jpg",
      "heic-to-jpg",
      "jpg-compress",
      "image-compress",
      "pdf-to-jpg",
      "image-to-pdf",
      "resize-image",
      "compress-pdf",
      "jpg-to-webp",
      "webp-to-jpg",
      "merge-pdf",
    ]),
    taskPathsSection: {
      title: ja.taskPathsTitle,
      description: ja.taskPathsDescription,
      items: [
        {
          title: "提出用にまとめたい",
          description: "複数画像を PDF にまとめたり、PDF を軽くしたりして、そのまま提出しやすい形へ整える流れです。",
          tools: getToolItems("ja", ["image-to-pdf", "jpg-to-pdf", "compress-pdf"]),
        },
        {
          title: "共有前に軽くしたい",
          description: "アップロード制限や送信前の容量調整が気になるときに、画像を軽くしやすいツールをまとめています。",
          tools: getToolItems("ja", ["image-compress", "jpg-compress", "webp-compress"]),
        },
        {
          title: "形式で詰まったとき",
          description: "iPhone 写真や PNG / JPG の行き来など、相手先の環境に合わせて変換したいときに便利です。",
          tools: getToolItems("ja", ["heic-to-jpg", "png-to-jpg", "jpg-to-png"]),
        },
      ],
    },
    categories: [
      {
        title: ja.cat1,
        description: ja.cat1d,
        tools: getToolItems("ja", [
          "jpg-to-png",
          "png-to-jpg",
          "heic-to-jpg",
          "heic-to-png",
          "webp-to-jpg",
          "webp-to-png",
          "jpg-to-webp",
          "png-to-webp",
          "avif-to-jpg",
          "avif-to-png",
          "gif-to-jpg",
          "gif-to-png",
          "svg-to-png",
          "svg-to-jpg",
          "bmp-to-jpg",
          "bmp-to-png",
          "tiff-to-jpg",
          "tiff-to-png",
          "ico-to-png",
          "ico-to-jpg",
        ]),
      },
      {
        title: ja.cat2,
        description: ja.cat2d,
        tools: getToolItems("ja", [
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
        ]),
      },
      {
        title: ja.cat3,
        description: ja.cat3d,
        tools: getToolItems("ja", [
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
        ]),
      },
      {
        title: ja.cat4,
        description: ja.cat4d,
        tools: getToolItems("ja", ["parquet-to-csv", "csv-to-parquet", "json-to-csv", "csv-to-json", "image-to-base64"]),
      },
    ],
    guidesSection: {
      title: "使い方ガイド",
      description: "形式の選び方、圧縮のコツ、PDF 作業の流れなど、ツールを使う前後に役立つ解説をまとめています。",
      viewAllLabel: "ガイドをすべて見る",
      guides: getHomeGuides("ja"),
    },
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
    badge: "Filewisp",
    hero: {
      title: "Free Online Image & PDF Converter – JPG, PNG, WebP, HEIC, PDF",
      description:
        "Convert JPG, PNG, WebP, HEIC, GIF, SVG, PDF, CSV, JSON, and Parquet files instantly in your browser. Compress images, resize, crop, merge PDFs, and more — 45+ free tools with no file upload to an external server.",
      primaryButtonLabel: "View All Tools",
      secondaryButtonLabel: "Contact",
    },
    stats: [
      { value: "45+ Tools", label: "Image, PDF, and data conversion" },
      { value: "100% Free", label: "No signup required" },
      { value: "Browser-only", label: "Files never leave your device" },
    ],
    popularToolsTitle: "Popular Tools",
    toolsPageLinkLabel: "View all",
    popularTools: getToolItems("en", [
      "jpg-to-png",
      "png-to-jpg",
      "heic-to-jpg",
      "jpg-compress",
      "image-compress",
      "pdf-to-jpg",
      "image-to-pdf",
      "resize-image",
      "compress-pdf",
      "jpg-to-webp",
      "webp-to-jpg",
      "merge-pdf",
    ]),
    taskPathsSection: {
      title: "Choose by what you need to finish",
      description:
        "Many visitors know the task before they know the tool name. These grouped entry points make it easier to jump into the right workflow without guessing.",
      items: [
        {
          title: "Prepare a file for submission",
          description: "Turn images into PDF, organize the output, and reduce file size before sending or uploading.",
          tools: getToolItems("en", ["image-to-pdf", "jpg-to-pdf", "compress-pdf"]),
        },
        {
          title: "Make images lighter before sharing",
          description: "Start here when upload limits or email size limits are the main problem and you need a smaller file quickly.",
          tools: getToolItems("en", ["image-compress", "jpg-compress", "webp-compress"]),
        },
        {
          title: "Fix a compatibility problem",
          description: "Use these when a phone photo, PNG, or JPG is not accepted by the destination and you need a safer format fast.",
          tools: getToolItems("en", ["heic-to-jpg", "png-to-jpg", "jpg-to-png"]),
        },
      ],
    },
    categories: [
      {
        title: "Image Conversion",
        description: "Use these when you need better compatibility, easier editing, or a different delivery format.",
        tools: getToolItems("en", [
          "jpg-to-png",
          "png-to-jpg",
          "heic-to-jpg",
          "heic-to-png",
          "webp-to-jpg",
          "webp-to-png",
          "jpg-to-webp",
          "png-to-webp",
          "avif-to-jpg",
          "avif-to-png",
          "gif-to-jpg",
          "gif-to-png",
          "svg-to-png",
          "svg-to-jpg",
          "bmp-to-jpg",
          "bmp-to-png",
          "tiff-to-jpg",
          "tiff-to-png",
          "ico-to-png",
          "ico-to-jpg",
        ]),
      },
      {
        title: "Image Editing",
        description: "Resize, compress, crop, and clean up images before publishing, uploading, or sharing.",
        tools: getToolItems("en", [
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
        ]),
      },
      {
        title: "PDF Tools",
        description: "Convert, merge, split, and adjust PDF files for practical work and submission flows.",
        tools: getToolItems("en", [
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
        ]),
      },
      {
        title: "Developer & Data Tools",
        description: "Convert CSV, JSON, Parquet, and Base64 in your browser for API responses, database exports, data-platform inspection, and web development workflows.",
        tools: getToolItems("en", ["parquet-to-csv", "csv-to-parquet", "json-to-csv", "csv-to-json", "image-to-base64"]),
      },
    ],
    guidesSection: {
      title: "Guides",
      description: "Short guides on image formats, compression, and PDF workflows — useful before or after using the tools.",
      viewAllLabel: "View all guides",
      guides: getHomeGuides("en"),
    },
    aboutSection: {
      title: "About This Site",
      paragraphs: [
        "Filewisp is a free browser-based site for image conversion, image cleanup, and PDF workflows.",
        "The goal is not just to publish tools, but to make common file tasks easier to understand and easier to finish without extra friction.",
      ],
    },
    toolsSection: {
      title: "Tools List Page",
      description:
        "If you want to compare formats, editing tools, and PDF workflows in one place, the tools list page is the fastest starting point.",
      buttonLabel: "Go to Tools List",
    },
    faqSectionTitle: "Frequently Asked Questions",
    faqItems: [
      { question: "Is Filewisp free to use?", answer: "Yes. The published tools are free to use, and the site is meant to be easy to try without setup." },
      { question: "Are uploaded files safe?", answer: "Most tools process files in your browser, which helps keep images off external servers and makes the tools easier to use for sensitive everyday tasks." },
      { question: "What file formats are supported?", answer: "The site covers JPG, PNG, WebP, HEIC, GIF, AVIF, BMP, TIFF, ICO, SVG, and several PDF workflows including conversion, splitting, merging, and compression." },
      { question: "Will more tools be added later?", answer: "Probably, but the priority is improving the usefulness and clarity of the tools already here before expanding the list further." },
    ],
    contactSection: {
      title: "Contact",
      description:
        "If you run into a bug or want a new workflow covered, you can send a note through the contact page.",
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
