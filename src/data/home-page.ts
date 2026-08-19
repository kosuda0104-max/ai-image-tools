import { getToolItems, TOOL_COUNT } from "@/src/data/tool-directory";
import { getGuide } from "@/src/data/guides";

/**
 * Guides featured on the homepage. Leads with the Tier-S "winnable" longtail
 * guides (see docs/winnable-queries.md) to concentrate the homepage's authority
 * on pages we can realistically rank, then keeps one link per remaining topic
 * cluster (incl. the Parquet/CSV data guides) so no cluster loses its homepage
 * internal link.
 */
const HOME_GUIDE_SLUGS = [
  // Tier S — winnable longtail (problem-intent queries, weak competition)
  // The homepage is the only page still drawing impressions, and they now all
  // come from "ai image ..." queries the domain name attracts (2026-08-14
  // report). Lead with the guide written for that intent so those impressions
  // reach a page that answers them.
  "ai-generated-image-formats",
  "heic-cannot-open-windows",
  "csv-encoding-fix",
  "jpg-vs-jpeg-difference",
  "what-is-webp",
  "crop-image-to-square",
  // GSC-validated winner: ranks #2 for ".avif とは" (2026-06 report) — promote
  // from Tier A to Tier S and give it a homepage link to concentrate authority.
  "what-is-avif",
  // Broad cluster coverage (one homepage link per cluster)
  "image-format-basics",
  "compress-images-without-losing-quality",
  "pdf-workflows",
  "parquet-csv-workflows",
  "aws-export-file-formats",
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

type ProblemGuideLink = {
  title: string;
  description: string;
  href: string;
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
  problemGuidesSection: {
    title: string;
    description: string;
    items: ProblemGuideLink[];
  };
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
  heroTitle: "ファイルを選ぶだけ。使える変換・編集ツールが見つかる",
  heroDescription:
    "画像・PDF・CSVなどのファイル形式を判定し、対応するツールを表示します。ここで自動変換されることはありません。やりたいことを入力して探すこともできます。登録不要・ファイルは外部サーバーに送信されません。",
  viewTools: "ツール一覧を見る",
  contact: "お問い合わせ",
  stats: [
    { value: `${TOOL_COUNT}種類`, label: "画像・PDF・データ・AWSツールを提供中" },
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
    "画像変換、画像編集、PDF、データ処理のツールを作業別に並べています。拡張子が分かる場合は検索、分からない場合はカテゴリから探せます。",
  toolsButton: "ツール一覧へ",
  faqTitle: "よくある質問",
  faq1q: "Filewisp は無料で使えますか？",
  faq1a: "はい。公開中のツールは無料で、会員登録も要りません。",
  faq2q: "画像は安全に扱われますか？",
  faq2a: "多くのツールはブラウザ内で処理します。対象ページに「アップロード不要」とある場合、ファイルは外部サーバーへ送られません。",
  faq3q: "どの形式に対応していますか？",
  faq3a: "JPG、PNG、WebP、HEIC、GIF、AVIF、BMP、TIFF、ICO、SVG、PDF まわりの作業に対応しています。変換だけでなく、圧縮やリサイズ、結合や分割まで扱えます。",
  faq4q: "今後もツールは増えますか？",
  faq4a: "必要性の高いものから追加します。既存ツールの不具合修正や説明の見直しも並行して行います。",
  contactTitle: "お問い合わせ",
  contactBody:
    "不具合報告や追加してほしいツールがあれば、お問い合わせページから送ってください。再現手順や元ファイルの形式が分かると調査が早くなります。",
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
    problemGuidesSection: {
      title: "よくある困りごとから解決する",
      description:
        "ファイル名やツール名が分からなくても大丈夫です。症状に近いものを選ぶと、原因と解決手順を確認できます。",
      items: [
        {
          title: "AVIF（.avif）とは？開けない原因を知りたい",
          description: "AVIFの特徴と、写真はJPG、透過画像はPNGへ変換する判断を説明します。",
          href: "/guides/what-is-avif",
        },
        {
          title: "iPhoneのHEIC写真がWindowsで開けない",
          description: "HEICをすぐ開く方法と、JPGへ変換するときの注意点を確認できます。",
          href: "/guides/heic-cannot-open-windows",
        },
        {
          title: "CSVが文字化けする・Excelで正しく開けない",
          description: "文字コードを判定し、日本語を崩さずに開く方法を症状別に案内します。",
          href: "/guides/csv-encoding-fix",
        },
        {
          title: "WebPが開けない・JPGやPNGに変換したい",
          description: "WebPの特徴と、互換性や透過の有無に合わせた変換先を選べます。",
          href: "/guides/what-is-webp",
        },
        {
          title: "JPGとJPEGの違いを知りたい",
          description: "2つの拡張子が同じ形式である理由と、提出時の注意点を説明します。",
          href: "/guides/jpg-vs-jpeg-difference",
        },
        {
          title: "画像を正方形に切り抜きたい",
          description: "SNSアイコンや商品画像を、被写体を残しながら正方形へ整える手順です。",
          href: "/guides/crop-image-to-square",
        },
      ],
    },
    taskPathsSection: {
      title: ja.taskPathsTitle,
      description: ja.taskPathsDescription,
      items: [
        {
          title: "提出用にまとめたい",
          description: "複数画像を1つのPDFにし、必要なら容量も下げます。フォーム提出やメール添付の前に使う組み合わせです。",
          tools: getToolItems("ja", ["image-to-pdf", "jpg-to-pdf", "compress-pdf"]),
        },
        {
          title: "共有前に軽くしたい",
          description: "アップロード上限やメールの添付制限に合わせて、画像の容量を下げます。",
          tools: getToolItems("ja", ["image-compress", "jpg-compress", "webp-compress"]),
        },
        {
          title: "形式で詰まったとき",
          description: "iPhone写真が開けない、PNGでは容量が大きいなど、形式が原因の問題を解消します。",
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
          "avif-to-webp",
          "gif-to-jpg",
          "gif-to-png",
          "svg-to-png",
          "svg-to-webp",
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
          "image-background-transparent",
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
          "tiff-to-pdf",
        ]),
      },
      {
        title: ja.cat4,
        description: ja.cat4d,
        tools: getToolItems("ja", [
          "parquet-to-csv",
          "parquet-to-excel",
          "parquet-viewer",
          "csv-to-parquet",
          "csv-encoding-fix",
          "csv-delimiter-converter",
          "json-to-csv",
          "json-to-excel",
          "jsonl-to-csv",
          "csv-to-json",
          "image-to-base64",
          "base64-to-image",
        ]),
      },
      {
        title: "AWSデータ変換",
        description:
          "DynamoDB、Textract、CloudTrail、S3 Inventory、CloudWatch Logs、Transcribeの固有形式を扱うツールです。",
        tools: getToolItems("ja", [
          "dynamodb-json-converter",
          "textract-json-to-excel",
          "cloudtrail-log-to-csv",
          "s3-inventory-viewer",
          "cloudwatch-logs-converter",
          "transcribe-json-to-srt",
        ]),
      },
      {
        title: "Web・SNS向けツール",
        description:
          "favicon 作成、OGP 画像、SNS 用リサイズ、EXIF・位置情報の削除、カラーパレット抽出など、公開前のこまごました作業に使えるツールです。",
        tools: getToolItems("ja", [
          "social-image-resize",
          "ogp-image-maker",
          "favicon-generator",
          "remove-exif",
          "color-palette-extractor",
        ]),
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
      title: "Free Browser Tools for Images, PDFs, and Data",
      description:
        "Choose an image, PDF, CSV, or other supported file to see compatible conversion and editing tools. Nothing is converted automatically at this step. You can also describe what you need. No signup is required, and files are not uploaded to an external server.",
      primaryButtonLabel: "View All Tools",
      secondaryButtonLabel: "Contact",
    },
    stats: [
      { value: `${TOOL_COUNT} Tools`, label: "Image, PDF, data, and AWS workflows" },
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
    problemGuidesSection: {
      title: "Start with the problem you need to solve",
      description:
        "You do not need to know the tool name or file format. Pick the closest symptom to see the cause and the shortest path to a fix.",
      items: [
        {
          title: "What is AVIF, and why won't my .avif file open?",
          description: "Understand AVIF and choose JPG for photos or PNG when transparency matters.",
          href: "/en/guides/what-is-avif",
        },
        {
          title: "HEIC photos won't open on Windows",
          description: "Open an iPhone photo now and learn when converting HEIC to JPG is the practical fix.",
          href: "/en/guides/heic-cannot-open-windows",
        },
        {
          title: "CSV text is garbled or opens incorrectly in Excel",
          description: "Identify the encoding problem and reopen Japanese or multilingual text correctly.",
          href: "/en/guides/csv-encoding-fix",
        },
        {
          title: "WebP won't open, or I need JPG or PNG",
          description: "Choose a compatible output without losing transparency you still need.",
          href: "/en/guides/what-is-webp",
        },
        {
          title: "JPG vs JPEG: are they different?",
          description: "Learn why both extensions exist and what to check before submitting a file.",
          href: "/en/guides/jpg-vs-jpeg-difference",
        },
        {
          title: "Crop an image to a square",
          description: "Prepare a balanced square crop for profile pictures, listings, and social posts.",
          href: "/en/guides/crop-image-to-square",
        },
      ],
    },
    taskPathsSection: {
      title: "Choose by what you need to finish",
      description:
        "Start with the result you need. Each group links the tools normally used for that job.",
      items: [
        {
          title: "Prepare a file for submission",
          description: "Combine images into a PDF, put them in order, and reduce the final file size before submission.",
          tools: getToolItems("en", ["image-to-pdf", "jpg-to-pdf", "compress-pdf"]),
        },
        {
          title: "Make images lighter before sharing",
          description: "Reduce image size for an upload form, email attachment, or website without changing the subject of the image.",
          tools: getToolItems("en", ["image-compress", "jpg-compress", "webp-compress"]),
        },
        {
          title: "Fix a compatibility problem",
          description: "Convert a phone photo or web image when the receiving app does not accept its current format.",
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
          "avif-to-webp",
          "gif-to-jpg",
          "gif-to-png",
          "svg-to-png",
          "svg-to-webp",
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
          "image-background-transparent",
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
          "tiff-to-pdf",
        ]),
      },
      {
        title: "Developer & Data Tools",
        description: "Convert CSV, JSON, Parquet, and Base64 in your browser for API responses, database exports, data-platform inspection, and web development workflows.",
        tools: getToolItems("en", [
          "parquet-to-csv",
          "parquet-to-excel",
          "parquet-viewer",
          "csv-to-parquet",
          "csv-encoding-fix",
          "csv-delimiter-converter",
          "json-to-csv",
          "json-to-excel",
          "jsonl-to-csv",
          "csv-to-json",
          "image-to-base64",
          "base64-to-image",
        ]),
      },
      {
        title: "AWS Data Conversion",
        description:
          "Handle service-specific exports from DynamoDB, Textract, CloudTrail, S3 Inventory, CloudWatch Logs, and Transcribe.",
        tools: getToolItems("en", [
          "dynamodb-json-converter",
          "textract-json-to-excel",
          "cloudtrail-log-to-csv",
          "s3-inventory-viewer",
          "cloudwatch-logs-converter",
          "transcribe-json-to-srt",
        ]),
      },
      {
        title: "Web & Social Tools",
        description:
          "Small pre-publish helpers: favicon generation, OGP images, social media resizing, EXIF and GPS removal, and color palette extraction.",
        tools: getToolItems("en", [
          "social-image-resize",
          "ogp-image-maker",
          "favicon-generator",
          "remove-exif",
          "color-palette-extractor",
        ]),
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
