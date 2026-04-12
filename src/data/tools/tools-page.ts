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
      title: "無料で使える画像・PDF変換ツール一覧",
      description:
        "JPG、PNG、WebP、HEIC、GIF、AVIF、BMP、TIFF、ICO、SVG、PDFの変換や、画像圧縮・リサイズ・切り抜き・白黒化・透かし追加ができる無料ツール集です。すべてブラウザ上で処理するため、ファイルを外部サーバーに送信せずに使えます。",
    },
    stats: [
      { value: "35ツール掲載", label: "画像・PDFツールを公開中" },
      { value: "無料", label: "登録不要ですぐ使える" },
      { value: "安全", label: "ブラウザ内で処理" },
    ],
    popularToolsTitle: "よく使うツール",
    popularToolsDescription:
      "画像変換とPDF作業の中でも特に需要が高く、初回訪問でも選ばれやすい代表ツールです。",
    topPageLinkLabel: "トップページへ →",
    seoSpotlightTitle: "検索需要が高い注目ツール",
    seoSpotlightDescription:
      "形式変換、軽量化、互換性対応など、検索意図が明確で流入を集めやすいツールを優先表示しています。",
    seoSpotlightTools: [
      {
        name: "JPG to PNG",
        href: "/tools/jpg-to-png",
        reason: "図版・スクリーンショット・編集用保存で需要が高い定番変換です。",
      },
      {
        name: "PNG to JPG",
        href: "/tools/png-to-jpg",
        reason: "軽量化やアップロード用画像として探されやすい代表的な変換です。",
      },
      {
        name: "WebP to JPG",
        href: "/tools/webp-to-jpg",
        reason: "互換性重視の共有・提出用途でよく使われます。",
      },
      {
        name: "HEIC to JPG",
        href: "/tools/heic-to-jpg",
        reason: "iPhone写真の共有や業務利用で継続的にニーズがあります。",
      },
      {
        name: "Image Compress",
        href: "/tools/image-compress",
        reason: "表示速度改善や容量制限対策として幅広いユーザーに使われます。",
      },
    ],
    guideSections: [
      {
        title: "この一覧ページの使い方",
        paragraphs: [
          "まずは変換したい形式や作業内容に近いカテゴリを選び、その中から用途に合うツールを探すのがおすすめです。",
          "たとえば、軽量化したいなら JPG・WebP・画像圧縮、再編集しやすさを重視するなら PNG 系、書類作業なら PDF 系から見ると探しやすくなります。",
        ],
      },
      {
        title: "検索流入後に回遊しやすい構成",
        paragraphs: [
          "各ツールページでは、用途、注意点、比較、関連ツールを順番に見られるようにし、1ページで終わらず次の作業へ移りやすい導線を作っています。",
          "変換後に圧縮、圧縮後にリサイズ、PDF変換後にページ整理といった実務フローに合わせてツールを行き来できる構成です。",
        ],
      },
    ],
    categories: [
      {
        title: "画像変換",
        description: "画像形式を別の形式へ変換できるツールです。",
        tools: [
          {
            name: "JPG to PNG",
            href: "/tools/jpg-to-png",
            description:
              "JPG画像をPNG形式に変換できる無料オンラインツールです。編集用保存やスクリーンショット素材の扱いに向いています。",
          },
          {
            name: "PNG to JPG",
            href: "/tools/png-to-jpg",
            description:
              "PNG画像をJPG形式に変換します。容量を軽くしたい画像や共有用画像に向いています。",
          },
          {
            name: "WebP to PNG",
            href: "/tools/webp-to-png",
            description:
              "WebP画像をPNG形式に変換します。透過保持や再編集しやすい形式にしたいときに便利です。",
          },
          {
            name: "WebP to JPG",
            href: "/tools/webp-to-jpg",
            description:
              "WebP画像をJPG形式に変換します。互換性を重視した共有や提出用途に向いています。",
          },
          {
            name: "JPG to WebP",
            href: "/tools/jpg-to-webp",
            description: "JPG画像をWebP形式に変換します。Web掲載向けの軽量化に便利です。",
          },
          {
            name: "PNG to WebP",
            href: "/tools/png-to-webp",
            description: "PNG画像をWebP形式に変換します。Web配信向けに軽量化したい場合に使えます。",
          },
          {
            name: "HEIC to JPG",
            href: "/tools/heic-to-jpg",
            description: "HEIC画像をJPG形式に変換します。iPhone写真の共有やアップロードに便利です。",
          },
          {
            name: "GIF to PNG",
            href: "/tools/gif-to-png",
            description: "GIF画像をPNG形式に変換します。",
          },
          {
            name: "GIF to JPG",
            href: "/tools/gif-to-jpg",
            description: "GIF画像をJPG形式に変換します。",
          },
          {
            name: "AVIF to JPG",
            href: "/tools/avif-to-jpg",
            description: "AVIF画像をJPG形式に変換します。",
          },
          {
            name: "AVIF to PNG",
            href: "/tools/avif-to-png",
            description: "AVIF画像をPNG形式に変換します。",
          },
          {
            name: "BMP to JPG",
            href: "/tools/bmp-to-jpg",
            description: "BMP画像をJPG形式に変換します。",
          },
          {
            name: "BMP to PNG",
            href: "/tools/bmp-to-png",
            description: "BMP画像をPNG形式に変換します。",
          },
          {
            name: "TIFF to JPG",
            href: "/tools/tiff-to-jpg",
            description: "TIFF画像をJPG形式に変換します。",
          },
          {
            name: "TIFF to PNG",
            href: "/tools/tiff-to-png",
            description: "TIFF画像をPNG形式に変換します。",
          },
          {
            name: "ICO to PNG",
            href: "/tools/ico-to-png",
            description: "ICO画像をPNG形式に変換します。",
          },
          {
            name: "ICO to JPG",
            href: "/tools/ico-to-jpg",
            description: "ICO画像をJPG形式に変換します。",
          },
          {
            name: "SVG to PNG",
            href: "/tools/svg-to-png",
            description: "SVG画像をPNG形式に変換します。",
          },
          {
            name: "SVG to JPG",
            href: "/tools/svg-to-jpg",
            description: "SVG画像をJPG形式に変換します。",
          },
        ],
      },
      {
        title: "画像加工",
        description: "画像サイズや見た目を調整できるツールです。",
        tools: [
          {
            name: "Image Compress",
            href: "/tools/image-compress",
            description: "画像を圧縮してファイルサイズを小さくします。表示速度改善や容量制限対策に便利です。",
          },
          {
            name: "Resize Image",
            href: "/tools/resize-image",
            description: "画像サイズを変更します。Web掲載や資料用に寸法を整えたいときに便利です。",
          },
          {
            name: "Crop Image",
            href: "/tools/crop-image",
            description: "画像を切り抜いて必要な部分だけ保存します。",
          },
          {
            name: "Rotate Image",
            href: "/tools/rotate-image",
            description: "画像を90度、180度、270度に回転します。",
          },
          {
            name: "Flip Image",
            href: "/tools/flip-image",
            description: "画像を左右反転・上下反転します。",
          },
          {
            name: "Grayscale Image",
            href: "/tools/grayscale-image",
            description: "画像を白黒（グレースケール）に変換します。",
          },
          {
            name: "Watermark Image",
            href: "/tools/watermark-image",
            description: "画像に透かし文字を追加します。",
          },
        ],
      },
      {
        title: "PDFツール",
        description:
          "画像とPDFを相互に変換したり、PDFを編集できるツールです。",
        tools: [
          {
            name: "Image to PDF",
            href: "/tools/image-to-pdf",
            description: "画像をPDFに変換します。複数画像をまとめて書類化したいときに便利です。",
          },
          {
            name: "PDF to JPG",
            href: "/tools/pdf-to-jpg",
            description: "PDFをJPG画像に変換します。ページ単位で画像化したいときに便利です。",
          },
          {
            name: "PDF to PNG",
            href: "/tools/pdf-to-png",
            description: "PDFをPNG画像に変換します。図版化や再編集用途に向いています。",
          },
          {
            name: "Merge PDF",
            href: "/tools/merge-pdf",
            description: "複数のPDFを1つに結合します。",
          },
          {
            name: "Split PDF",
            href: "/tools/split-pdf",
            description: "PDFの指定ページだけを抽出します。",
          },
          {
            name: "Compress PDF",
            href: "/tools/compress-pdf",
            description: "PDFを軽量化できるか試します。",
          },
          {
            name: "Rotate PDF",
            href: "/tools/rotate-pdf",
            description: "PDFの全ページを回転します。",
          },
          {
            name: "PDF to WebP",
            href: "/tools/pdf-to-webp",
            description: "PDFをWebP画像として扱いやすく変換します。",
          },
          {
            name: "PDF Remove Pages",
            href: "/tools/pdf-remove-pages",
            description: "PDFから不要なページを削除します。",
          },
        ],
      },
    ],
    aboutSection: {
      title: "この一覧ページについて",
      paragraphs: [
        "画像変換・画像加工・PDFツールをカテゴリ別にまとめています。",
        "定番形式からニッチな形式変換まで一つの一覧で比較できるので、必要なツールにたどり着きやすい構成です。",
        "各ツールページでは用途、注意点、比較、関連ツールも確認できるよう順次強化しています。",
      ],
    },
    homeSection: {
      title: "トップページ",
      description:
        "よく使う代表ツールだけを見たい場合は、トップページから人気ツールへすぐ移動できます。",
      buttonLabel: "トップページへ",
    },
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
    topPageLinkLabel: "Back to Home →",
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
          {
            name: "JPG to PNG",
            href: "/tools/jpg-to-png",
            description: "Convert JPG images to PNG format for more editing-friendly output and stable document use.",
          },
          {
            name: "PNG to JPG",
            href: "/tools/png-to-jpg",
            description: "Convert PNG images to JPG format for lighter uploads and simpler sharing.",
          },
          {
            name: "WebP to PNG",
            href: "/tools/webp-to-png",
            description: "Convert WebP images to PNG when you need transparency support or easier re-editing.",
          },
          {
            name: "WebP to JPG",
            href: "/tools/webp-to-jpg",
            description: "Convert WebP images to JPG when compatibility matters more than modern web efficiency.",
          },
          {
            name: "JPG to WebP",
            href: "/tools/jpg-to-webp",
            description: "Convert JPG images to WebP format for lighter web delivery.",
          },
          {
            name: "PNG to WebP",
            href: "/tools/png-to-webp",
            description: "Convert PNG images to WebP format to reduce file size for web use.",
          },
          {
            name: "HEIC to JPG",
            href: "/tools/heic-to-jpg",
            description: "Convert HEIC images to JPG for easier uploads and broader compatibility.",
          },
          {
            name: "GIF to PNG",
            href: "/tools/gif-to-png",
            description: "Convert GIF images to PNG format.",
          },
          {
            name: "GIF to JPG",
            href: "/tools/gif-to-jpg",
            description: "Convert GIF images to JPG format.",
          },
          {
            name: "AVIF to JPG",
            href: "/tools/avif-to-jpg",
            description: "Convert AVIF images to JPG format.",
          },
          {
            name: "AVIF to PNG",
            href: "/tools/avif-to-png",
            description: "Convert AVIF images to PNG format.",
          },
          {
            name: "BMP to JPG",
            href: "/tools/bmp-to-jpg",
            description: "Convert BMP images to JPG format.",
          },
          {
            name: "BMP to PNG",
            href: "/tools/bmp-to-png",
            description: "Convert BMP images to PNG format.",
          },
          {
            name: "TIFF to JPG",
            href: "/tools/tiff-to-jpg",
            description: "Convert TIFF images to JPG format.",
          },
          {
            name: "TIFF to PNG",
            href: "/tools/tiff-to-png",
            description: "Convert TIFF images to PNG format.",
          },
          {
            name: "ICO to PNG",
            href: "/tools/ico-to-png",
            description: "Convert ICO images to PNG format.",
          },
          {
            name: "ICO to JPG",
            href: "/tools/ico-to-jpg",
            description: "Convert ICO images to JPG format.",
          },
          {
            name: "SVG to PNG",
            href: "/tools/svg-to-png",
            description: "Convert SVG images to PNG format.",
          },
          {
            name: "SVG to JPG",
            href: "/tools/svg-to-jpg",
            description: "Convert SVG images to JPG format.",
          },
        ],
      },
      {
        title: "Image Editing",
        description: "Tools for adjusting image size and appearance.",
        tools: [
          {
            name: "Image Compress",
            href: "/tools/image-compress",
            description: "Compress images to reduce file size for faster pages, smaller uploads, and easier sharing.",
          },
          {
            name: "Resize Image",
            href: "/tools/resize-image",
            description: "Resize an image for web, documents, or platform-specific dimensions.",
          },
          {
            name: "Crop Image",
            href: "/tools/crop-image",
            description: "Crop an image and keep only the area you need.",
          },
          {
            name: "Rotate Image",
            href: "/tools/rotate-image",
            description: "Rotate an image by 90, 180, or 270 degrees.",
          },
          {
            name: "Flip Image",
            href: "/tools/flip-image",
            description: "Flip an image horizontally or vertically.",
          },
          {
            name: "Grayscale Image",
            href: "/tools/grayscale-image",
            description: "Convert an image to grayscale.",
          },
          {
            name: "Watermark Image",
            href: "/tools/watermark-image",
            description: "Add watermark text to an image.",
          },
        ],
      },
      {
        title: "PDF Tools",
        description:
          "Tools for converting between images and PDFs and editing PDF files.",
        tools: [
          {
            name: "Image to PDF",
            href: "/tools/image-to-pdf",
            description: "Convert images to PDF for document-style sharing and printing.",
          },
          {
            name: "PDF to JPG",
            href: "/tools/pdf-to-jpg",
            description: "Convert PDF files to JPG images page by page.",
          },
          {
            name: "PDF to PNG",
            href: "/tools/pdf-to-png",
            description: "Convert PDF files to PNG images for editing-friendly output.",
          },
          {
            name: "Merge PDF",
            href: "/tools/merge-pdf",
            description: "Merge multiple PDF files into one.",
          },
          {
            name: "Split PDF",
            href: "/tools/split-pdf",
            description: "Extract only selected pages from a PDF.",
          },
          {
            name: "Compress PDF",
            href: "/tools/compress-pdf",
            description: "Try reducing the PDF file size.",
          },
          {
            name: "Rotate PDF",
            href: "/tools/rotate-pdf",
            description: "Rotate all pages in a PDF.",
          },
          {
            name: "PDF to WebP",
            href: "/tools/pdf-to-webp",
            description: "Convert PDF pages into lightweight WebP images.",
          },
          {
            name: "PDF Remove Pages",
            href: "/tools/pdf-remove-pages",
            description: "Remove unnecessary pages from a PDF.",
          },
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
