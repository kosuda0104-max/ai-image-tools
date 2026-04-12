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

export const toolsPageContent: Record<ToolPageLocale, ToolsPageContent> = {
  ja: {
    badge: "AI Image Tools",
    hero: {
      title: "ブラウザで使える画像・PDFツール一覧",
      description:
        "JPG、PNG、WebP、HEIC、GIF、PDF などの変換、画像圧縮、リサイズ、切り抜き、PDF整理まで、よく使う作業をカテゴリ別にまとめています。必要な処理を探しやすく、次の作業にもつなげやすい構成です。",
    },
    stats: [
      { value: "35ツール", label: "画像とPDFの作業をカバー" },
      { value: "無料", label: "登録不要ですぐ使える" },
      { value: "安全", label: "ブラウザ内で処理" },
    ],
    popularToolsTitle: "よく使われるツール",
    popularToolsDescription:
      "はじめて来た人が最初に探しやすい、需要の大きいツールを先にまとめています。",
    topPageLinkLabel: "トップページへ",
    seoSpotlightTitle: "検索需要が強いツール",
    seoSpotlightDescription:
      "互換性の調整、軽量化、iPhone写真の共有、PDF画像化など、実際の検索意図に近い処理を中心に並べています。",
    seoSpotlightTools: [
      {
        name: "JPG to PNG",
        href: "/tools/jpg-to-png",
        reason: "スクリーンショット風に扱いたい画像や、編集前の下準備として使われやすい定番ツールです。",
      },
      {
        name: "PNG to JPG",
        href: "/tools/png-to-jpg",
        reason: "容量を軽くしてアップロードしやすくしたい場面で使いやすい変換です。",
      },
      {
        name: "WebP to JPG",
        href: "/tools/webp-to-jpg",
        reason: "互換性を優先したいときに選ばれやすく、共有先の幅を広げやすいツールです。",
      },
      {
        name: "HEIC to JPG",
        href: "/tools/heic-to-jpg",
        reason: "iPhone写真を Windows や Web フォームで扱いやすくしたいときによく使われます。",
      },
      {
        name: "Image Compress",
        href: "/tools/image-compress",
        reason: "ページ表示速度、アップロード制限、共有のしやすさをまとめて改善しやすい汎用ツールです。",
      },
    ],
    guideSections: [
      {
        title: "この一覧ページの見方",
        paragraphs: [
          "まずは目的に近いカテゴリから探すのが近道です。形式を変えたいなら画像変換、見た目やサイズを調整したいなら画像編集、書類まわりなら PDF ツールを見ると探しやすくなります。",
          "軽さを優先するなら JPG、WebP、圧縮系のツール、編集しやすさを優先するなら PNG 系のツールを先に見ると判断しやすいです。",
        ],
      },
      {
        title: "一覧以上のページとして使えるように",
        paragraphs: [
          "このページは単なるリンク集ではなく、検索で流入した人が次の作業まで見つけやすいように構成しています。",
          "変換のあとに圧縮、圧縮のあとにリサイズ、PDF整理のあとに画像化など、よくある流れをたどりやすいように関連性の高いツールをまとめています。",
        ],
      },
    ],
    categories: [
      {
        title: "画像形式変換",
        description:
          "JPG、PNG、WebP、HEIC などを別の形式へ変換したいときに使うカテゴリです。互換性を合わせたいときや、次の編集作業に備えたいときに役立ちます。",
        tools: [
          {
            name: "JPG to PNG",
            href: "/tools/jpg-to-png",
            description:
              "JPG を PNG に変換します。編集前の下準備や、スクリーンショット風の画像管理に向いています。",
          },
          {
            name: "PNG to JPG",
            href: "/tools/png-to-jpg",
            description:
              "PNG を JPG に変換します。容量を軽くして共有やアップロードをしやすくしたいときに便利です。",
          },
          {
            name: "WebP to PNG",
            href: "/tools/webp-to-png",
            description:
              "WebP を PNG に変換します。透明背景を維持したいときや、再編集しやすい形にしたいときに向いています。",
          },
          {
            name: "WebP to JPG",
            href: "/tools/webp-to-jpg",
            description:
              "WebP を JPG に変換します。互換性を優先したい共有用ファイルづくりで使いやすいツールです。",
          },
          {
            name: "JPG to WebP",
            href: "/tools/jpg-to-webp",
            description:
              "JPG を WebP に変換します。Web掲載向けに軽量化したいときに向いています。",
          },
          {
            name: "PNG to WebP",
            href: "/tools/png-to-webp",
            description:
              "PNG を WebP に変換します。透明背景を保ちつつ軽くしたい画像で検討しやすい形式です。",
          },
          {
            name: "HEIC to JPG",
            href: "/tools/heic-to-jpg",
            description:
              "HEIC を JPG に変換します。iPhone写真を共有しやすい形にしたいときの定番です。",
          },
          { name: "GIF to PNG", href: "/tools/gif-to-png", description: "GIF を PNG に変換します。" },
          { name: "GIF to JPG", href: "/tools/gif-to-jpg", description: "GIF を JPG に変換します。" },
          { name: "AVIF to JPG", href: "/tools/avif-to-jpg", description: "AVIF を JPG に変換します。" },
          { name: "AVIF to PNG", href: "/tools/avif-to-png", description: "AVIF を PNG に変換します。" },
          { name: "BMP to JPG", href: "/tools/bmp-to-jpg", description: "BMP を JPG に変換します。" },
          { name: "BMP to PNG", href: "/tools/bmp-to-png", description: "BMP を PNG に変換します。" },
          { name: "TIFF to JPG", href: "/tools/tiff-to-jpg", description: "TIFF を JPG に変換します。" },
          { name: "TIFF to PNG", href: "/tools/tiff-to-png", description: "TIFF を PNG に変換します。" },
          { name: "ICO to PNG", href: "/tools/ico-to-png", description: "ICO を PNG に変換します。" },
          { name: "ICO to JPG", href: "/tools/ico-to-jpg", description: "ICO を JPG に変換します。" },
          { name: "SVG to PNG", href: "/tools/svg-to-png", description: "SVG を PNG に変換します。" },
          { name: "SVG to JPG", href: "/tools/svg-to-jpg", description: "SVG を JPG に変換します。" },
        ],
      },
      {
        title: "画像編集",
        description:
          "圧縮、サイズ変更、切り抜き、回転など、画像の見た目や使いやすさを整えるカテゴリです。公開前の仕上げにも向いています。",
        tools: [
          {
            name: "Image Compress",
            href: "/tools/image-compress",
            description:
              "画像を圧縮して容量を小さくします。ページ速度改善やアップロード制限対策に便利です。",
          },
          {
            name: "Resize Image",
            href: "/tools/resize-image",
            description:
              "画像サイズを変更します。SNS投稿、Web掲載、資料添付向けのサイズ調整に使いやすいです。",
          },
          {
            name: "Crop Image",
            href: "/tools/crop-image",
            description:
              "必要な範囲だけ切り抜きます。不要な余白を省きたいときに役立ちます。",
          },
          { name: "Rotate Image", href: "/tools/rotate-image", description: "画像の向きを回転します。" },
          { name: "Flip Image", href: "/tools/flip-image", description: "画像を左右または上下に反転します。" },
          { name: "Grayscale Image", href: "/tools/grayscale-image", description: "画像をグレースケールに変換します。" },
          { name: "Watermark Image", href: "/tools/watermark-image", description: "画像に文字のウォーターマークを追加します。" },
        ],
      },
      {
        title: "PDF ツール",
        description:
          "PDF の変換、結合、分割、圧縮、ページ整理など、書類作業でよく使う処理をまとめたカテゴリです。",
        tools: [
          {
            name: "Image to PDF",
            href: "/tools/image-to-pdf",
            description:
              "画像を PDF にまとめます。提出用や印刷用の形に整えたいときに使いやすいです。",
          },
          { name: "PDF to JPG", href: "/tools/pdf-to-jpg", description: "PDF を JPG 画像に変換します。" },
          { name: "PDF to PNG", href: "/tools/pdf-to-png", description: "PDF を PNG 画像に変換します。" },
          { name: "Merge PDF", href: "/tools/merge-pdf", description: "複数の PDF を 1 つにまとめます。" },
          { name: "Split PDF", href: "/tools/split-pdf", description: "必要なページだけを取り出します。" },
          { name: "Compress PDF", href: "/tools/compress-pdf", description: "PDF の容量を軽くします。" },
          { name: "Rotate PDF", href: "/tools/rotate-pdf", description: "PDF のページ向きを整えます。" },
          { name: "PDF to WebP", href: "/tools/pdf-to-webp", description: "PDF を軽量な WebP 画像に変換します。" },
          { name: "PDF Remove Pages", href: "/tools/pdf-remove-pages", description: "不要なページを削除します。" },
        ],
      },
    ],
    aboutSection: {
      title: "この一覧ページについて",
      paragraphs: [
        "このページでは、画像変換、画像編集、PDF ツールをカテゴリごとに整理しています。",
        "単にツールを並べるだけでなく、関連する作業へつながりやすいように構成しているので、次に何を使うべきかも見つけやすくなっています。",
        "一覧から入っても、検索から特定ツールへ入っても、必要な次の処理に進みやすいことを意識しています。",
      ],
    },
    homeSection: {
      title: "トップページ",
      description:
        "よく使うツールだけをすぐ開きたい場合は、トップページから人気ツールへ直接移動できます。",
      buttonLabel: "トップページへ",
    },
    contactSection: {
      title: "お問い合わせ",
      description:
        "不具合報告や追加してほしいツールの要望があれば、お問い合わせページから送れます。",
      buttonLabel: "お問い合わせページへ",
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
      { value: "35 Tools", label: "Image and PDF tools available" },
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
        name: "JPG to PNG",
        href: "/tools/jpg-to-png",
        reason: "Useful for screenshots, design handoff, and editing-friendly output.",
      },
      {
        name: "PNG to JPG",
        href: "/tools/png-to-jpg",
        reason: "A practical tool for lighter uploads and easier sharing.",
      },
      {
        name: "WebP to JPG",
        href: "/tools/webp-to-jpg",
        reason: "A strong compatibility-focused conversion for mixed workflows.",
      },
      {
        name: "HEIC to JPG",
        href: "/tools/heic-to-jpg",
        reason: "A common need for iPhone photo uploads and broader sharing.",
      },
      {
        name: "Image Compress",
        href: "/tools/image-compress",
        reason: "A broad utility for page speed, storage, and upload limits.",
      },
    ],
    guideSections: [
      {
        title: "How to use this tools page",
        paragraphs: [
          "Start with the category closest to your goal: image conversion, image editing, or PDF tools. That usually gets you to the right task in one or two clicks.",
          "If your goal is smaller files, look at JPG, WebP, or compression tools. If your goal is edit-friendly output, PNG-related tools are often a better fit.",
        ],
      },
      {
        title: "Designed for search and discovery",
        paragraphs: [
          "This page is built so users can arrive from a specific search query and still discover the next useful step, such as converting after compression or resizing after export.",
          "That makes it useful not only as a directory but also as a workflow hub for common image and PDF tasks.",
        ],
      },
    ],
    categories: [
      {
        title: "Image Conversion",
        description: "Tools for converting images from one format to another.",
        tools: [
          { name: "JPG to PNG", href: "/tools/jpg-to-png", description: "Convert JPG images to PNG format for more editing-friendly output and stable document use." },
          { name: "PNG to JPG", href: "/tools/png-to-jpg", description: "Convert PNG images to JPG format for lighter uploads and simpler sharing." },
          { name: "WebP to PNG", href: "/tools/webp-to-png", description: "Convert WebP images to PNG when you need transparency support or easier re-editing." },
          { name: "WebP to JPG", href: "/tools/webp-to-jpg", description: "Convert WebP images to JPG when compatibility matters more than modern web efficiency." },
          { name: "JPG to WebP", href: "/tools/jpg-to-webp", description: "Convert JPG images to WebP format for lighter web delivery." },
          { name: "PNG to WebP", href: "/tools/png-to-webp", description: "Convert PNG images to WebP format to reduce file size for web use." },
          { name: "HEIC to JPG", href: "/tools/heic-to-jpg", description: "Convert HEIC images to JPG for easier uploads and broader compatibility." },
          { name: "GIF to PNG", href: "/tools/gif-to-png", description: "Convert GIF images to PNG format." },
          { name: "GIF to JPG", href: "/tools/gif-to-jpg", description: "Convert GIF images to JPG format." },
          { name: "AVIF to JPG", href: "/tools/avif-to-jpg", description: "Convert AVIF images to JPG format." },
          { name: "AVIF to PNG", href: "/tools/avif-to-png", description: "Convert AVIF images to PNG format." },
          { name: "BMP to JPG", href: "/tools/bmp-to-jpg", description: "Convert BMP images to JPG format." },
          { name: "BMP to PNG", href: "/tools/bmp-to-png", description: "Convert BMP images to PNG format." },
          { name: "TIFF to JPG", href: "/tools/tiff-to-jpg", description: "Convert TIFF images to JPG format." },
          { name: "TIFF to PNG", href: "/tools/tiff-to-png", description: "Convert TIFF images to PNG format." },
          { name: "ICO to PNG", href: "/tools/ico-to-png", description: "Convert ICO images to PNG format." },
          { name: "ICO to JPG", href: "/tools/ico-to-jpg", description: "Convert ICO images to JPG format." },
          { name: "SVG to PNG", href: "/tools/svg-to-png", description: "Convert SVG images to PNG format." },
          { name: "SVG to JPG", href: "/tools/svg-to-jpg", description: "Convert SVG images to JPG format." },
        ],
      },
      {
        title: "Image Editing",
        description: "Tools for adjusting image size and appearance.",
        tools: [
          { name: "Image Compress", href: "/tools/image-compress", description: "Compress images to reduce file size for faster pages, smaller uploads, and easier sharing." },
          { name: "Resize Image", href: "/tools/resize-image", description: "Resize an image for web, documents, or platform-specific dimensions." },
          { name: "Crop Image", href: "/tools/crop-image", description: "Crop an image and keep only the area you need." },
          { name: "Rotate Image", href: "/tools/rotate-image", description: "Rotate an image by 90, 180, or 270 degrees." },
          { name: "Flip Image", href: "/tools/flip-image", description: "Flip an image horizontally or vertically." },
          { name: "Grayscale Image", href: "/tools/grayscale-image", description: "Convert an image to grayscale." },
          { name: "Watermark Image", href: "/tools/watermark-image", description: "Add watermark text to an image." },
        ],
      },
      {
        title: "PDF Tools",
        description: "Tools for converting between images and PDFs and editing PDF files.",
        tools: [
          { name: "Image to PDF", href: "/tools/image-to-pdf", description: "Convert images to PDF for document-style sharing and printing." },
          { name: "PDF to JPG", href: "/tools/pdf-to-jpg", description: "Convert PDF files to JPG images page by page." },
          { name: "PDF to PNG", href: "/tools/pdf-to-png", description: "Convert PDF files to PNG images for editing-friendly output." },
          { name: "Merge PDF", href: "/tools/merge-pdf", description: "Merge multiple PDF files into one." },
          { name: "Split PDF", href: "/tools/split-pdf", description: "Extract only selected pages from a PDF." },
          { name: "Compress PDF", href: "/tools/compress-pdf", description: "Try reducing the PDF file size." },
          { name: "Rotate PDF", href: "/tools/rotate-pdf", description: "Rotate all pages in a PDF." },
          { name: "PDF to WebP", href: "/tools/pdf-to-webp", description: "Convert PDF pages into lightweight WebP images." },
          { name: "PDF Remove Pages", href: "/tools/pdf-remove-pages", description: "Remove unnecessary pages from a PDF." },
        ],
      },
    ],
    aboutSection: {
      title: "About This Tools Page",
      paragraphs: [
        "This page organizes image conversion, image editing, and PDF tools by category.",
        "It is designed to help both direct search visitors and users exploring related workflows.",
        "Each tool can lead naturally into the next step, such as compression, resizing, or format conversion.",
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
  { name: "JPG to PNG", href: "/tools/jpg-to-png" },
  { name: "PNG to JPG", href: "/tools/png-to-jpg" },
  { name: "Image Compress", href: "/tools/image-compress" },
  { name: "Resize Image", href: "/tools/resize-image" },
  { name: "PDF to JPG", href: "/tools/pdf-to-jpg" },
  { name: "Merge PDF", href: "/tools/merge-pdf" },
];
