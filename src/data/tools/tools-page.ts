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
  topPageLinkLabel: string;
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
    topPageLinkLabel: "トップページへ →",
    categories: [
      {
        title: "画像変換",
        description: "画像形式を別の形式へ変換できるツールです。",
        tools: [
          {
            name: "JPG to PNG",
            href: "/tools/jpg-to-png",
            description: "JPG画像をPNG形式に変換できる無料オンラインツールです。画質を保ったまま透過対応のPNGに変換できるため、ロゴやイラストの保存に最適です。すべてブラウザ内で処理されるため、安全に利用できます。",
          },
          {
            name: "PNG to JPG",
            href: "/tools/png-to-jpg",
            description: "PNG画像をJPG形式に変換します。",
          },
          {
            name: "WebP to PNG",
            href: "/tools/webp-to-png",
            description: "WebP画像をPNG形式に変換します。",
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
          {
            name: "PNG to WebP",
            href: "/tools/png-to-webp",
            description: "PNG画像をWebP形式に変換します。",
          },
          {
            name: "HEIC to JPG",
            href: "/tools/heic-to-jpg",
            description: "HEIC画像をJPG形式に変換します。",
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
            description: "画像を圧縮してファイルサイズを小さくします。",
          },
          {
            name: "Resize Image",
            href: "/tools/resize-image",
            description: "画像サイズを変更します。",
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
        "代表的なツールからマイナーな形式変換まで、まとめて探しやすい構成です。",
        "必要なツールが見つからない場合は、今後さらに追加して拡張できます。",
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
    topPageLinkLabel: "Back to Home →",
    categories: [
      {
        title: "Image Conversion",
        description: "Tools for converting images from one format to another.",
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
            name: "WebP to PNG",
            href: "/tools/webp-to-png",
            description: "Convert WebP images to PNG format.",
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
          {
            name: "PNG to WebP",
            href: "/tools/png-to-webp",
            description: "Convert PNG images to WebP format.",
          },
          {
            name: "HEIC to JPG",
            href: "/tools/heic-to-jpg",
            description: "Convert HEIC images to JPG format.",
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
            description: "Crop an image and save only the part you need.",
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
            description: "Convert PDF pages into easy-to-use WebP images.",
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
        "It is designed so you can quickly find both common tools and more niche format converters.",
        "If a tool you need is not listed yet, more tools can be added later.",
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
