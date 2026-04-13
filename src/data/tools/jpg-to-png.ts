import type { JpgToPngContent, ToolLocale } from "./types";

export const jpgToPngContent: Record<ToolLocale, JpgToPngContent> = {
  ja: {
    page: {
      title: "JPG\u3092PNG\u306b\u5909\u63db",
      description:
        "JPG\u753b\u50cf\u3092PNG\u5f62\u5f0f\u306b\u5909\u63db\u3067\u304d\u308b\u7121\u6599\u30aa\u30f3\u30e9\u30a4\u30f3\u30c4\u30fc\u30eb\u3067\u3059\u3002\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u4e0d\u8981\u3067\u3001\u30d6\u30e9\u30a6\u30b6\u3060\u3051\u3067\u624b\u8efd\u306b\u5909\u63db\u3067\u304d\u307e\u3059\u3002",
      aboutTitle: "JPG\u3092PNG\u306b\u5909\u63db\u3059\u308b\u3068\u3069\u3093\u306a\u3068\u304d\u306b\u4fbf\u5229\uff1f",
      aboutText:
        "JPG\u3092PNG\u306b\u5909\u63db\u3059\u308b\u3068\u3001\u3042\u3068\u304b\u3089\u6587\u5b57\u3092\u8f09\u305b\u305f\u308a\u3001\u753b\u50cf\u3092\u518d\u7de8\u96c6\u3057\u305f\u308a\u3059\u308b\u5834\u9762\u3067\u6271\u3044\u3084\u3059\u304f\u306a\u308a\u307e\u3059\u3002\u7279\u306b\u30b9\u30af\u30ea\u30fc\u30f3\u30b7\u30e7\u30c3\u30c8\u3001\u8cc7\u6599\u7528\u306e\u753b\u50cf\u3001UI\u30ad\u30e3\u30d7\u30c1\u30e3\u3001\u7c21\u5358\u306a\u56f3\u7248\u306a\u3069\u3092\u6271\u3046\u3068\u304d\u306b\u5411\u3044\u3066\u3044\u307e\u3059\u3002",
      contentSections: [
        {
          title: "JPG\u304b\u3089PNG\u3078\u5909\u63db\u3057\u305f\u304f\u306a\u308b\u4ee3\u8868\u4f8b",
          paragraphs: [
            "\u30b9\u30af\u30ea\u30fc\u30f3\u30b7\u30e7\u30c3\u30c8\u3092\u8cc7\u6599\u306b\u8cbc\u308b\u524d\u306b\u6574\u3048\u305f\u3044\u3068\u304d\u3001\u753b\u50cf\u306b\u8ffd\u8a18\u3084\u88c5\u98fe\u3092\u5165\u308c\u308b\u524d\u306b\u6271\u3044\u3084\u3059\u3044\u5f62\u306b\u3057\u305f\u3044\u3068\u304d\u3001JPG\u306e\u307e\u307e\u4fdd\u5b58\u3092\u7e70\u308a\u8fd4\u3059\u306e\u304c\u4e0d\u5b89\u306a\u3068\u304d\u306b\u5411\u3044\u3066\u3044\u307e\u3059\u3002",
            "\u305f\u3060\u3057\u3001PNG\u306b\u5909\u3048\u305f\u304b\u3089\u3068\u3044\u3063\u3066\u3001\u3082\u3068\u306eJPG\u3067\u5931\u308f\u308c\u305f\u753b\u8cea\u304c\u623b\u308b\u308f\u3051\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002\u76ee\u7684\u306f\u300c\u3053\u308c\u4ee5\u4e0a\u306e\u52a3\u5316\u3092\u6291\u3048\u306a\u304c\u3089\u6271\u3046\u300d\u3053\u3068\u306b\u3042\u308a\u307e\u3059\u3002",
          ],
        },
        {
          title: "JPG\u3068PNG\u3092\u3069\u3046\u4f7f\u3044\u5206\u3051\u308b\u304b",
          paragraphs: [
            "JPG\u306f\u5199\u771f\u3092\u8efd\u304f\u4fdd\u5b58\u3059\u308b\u306e\u306b\u5411\u3044\u3066\u304a\u308a\u3001PNG\u306f\u6587\u5b57\u3084\u7dda\u306e\u591a\u3044\u753b\u50cf\u3001\u30b9\u30af\u30ea\u30fc\u30f3\u30b7\u30e7\u30c3\u30c8\u3001\u56f3\u7248\u3092\u6271\u3046\u3068\u304d\u306b\u5411\u3044\u3066\u3044\u307e\u3059\u3002",
            "\u516c\u958b\u7528\u306e\u6700\u7d42\u30d5\u30a1\u30a4\u30eb\u3092\u8efd\u304f\u3057\u305f\u3044\u306a\u3089 JPG \u3084 WebP \u304c\u5411\u3044\u3066\u3044\u307e\u3059\u304c\u3001\u7de8\u96c6\u306e\u9014\u4e2d\u3067\u306f PNG \u3067\u6301\u3063\u3066\u304a\u304f\u3068\u5b89\u5fc3\u306a\u3053\u3068\u304c\u591a\u3044\u3067\u3059\u3002",
          ],
        },
      ],
      listSections: [
        {
          title: "\u5909\u63db\u524d\u306b\u77e5\u3063\u3066\u304a\u304d\u305f\u3044\u3053\u3068",
          items: [
            "JPG \u304b\u3089 PNG \u3078\u306e\u5909\u63db\u3067\u900f\u904e\u80cc\u666f\u304c\u81ea\u52d5\u3067\u4f5c\u3089\u308c\u308b\u3053\u3068\u306f\u3042\u308a\u307e\u305b\u3093\u3002",
            "\u3082\u3068\u306e JPG \u3067\u5931\u308f\u308c\u305f\u7d30\u90e8\u304c\u56de\u5fa9\u3059\u308b\u308f\u3051\u3067\u306f\u3042\u308a\u307e\u305b\u3093\u3002",
            "\u5199\u771f\u306f PNG \u306b\u3059\u308b\u3068\u30d5\u30a1\u30a4\u30eb\u30b5\u30a4\u30ba\u304c\u5927\u304d\u304f\u306a\u308a\u3084\u3059\u3044\u3067\u3059\u3002",
            "\u518d\u7de8\u96c6\u5f8c\u306b\u516c\u958b\u3059\u308b\u306a\u3089\u3001\u6700\u5f8c\u306b JPG \u3084 WebP \u3078\u51fa\u3057\u76f4\u3059\u3068\u30d0\u30e9\u30f3\u30b9\u3092\u53d6\u308a\u3084\u3059\u3044\u3067\u3059\u3002",
          ],
        },
      ],
      comparisonTitle: "JPG\u3068PNG\u306e\u6bd4\u8f03",
      comparisonItems: [
        {
          label: "\u30d5\u30a1\u30a4\u30eb\u30b5\u30a4\u30ba",
          value:
            "\u4e00\u822c\u7684\u306b JPG \u306e\u307b\u3046\u304c\u8efd\u304f\u3001PNG \u306e\u307b\u3046\u304c\u5927\u304d\u304f\u306a\u308a\u3084\u3059\u3044\u3067\u3059\u3002",
        },
        {
          label: "\u5411\u3044\u3066\u3044\u308b\u753b\u50cf",
          value:
            "JPG \u306f\u5199\u771f\u3001PNG \u306f\u30b9\u30af\u30ea\u30fc\u30f3\u30b7\u30e7\u30c3\u30c8\u3001\u56f3\u7248\u3001\u6587\u5b57\u304c\u591a\u3044\u753b\u50cf\u306b\u5411\u3044\u3066\u3044\u307e\u3059\u3002",
        },
        {
          label: "\u7de8\u96c6\u306e\u3057\u3084\u3059\u3055",
          value:
            "\u5f8c\u304b\u3089\u6587\u5b57\u3084\u7dda\u3092\u8f09\u305b\u305f\u308a\u3001\u4f55\u5ea6\u304b\u4fdd\u5b58\u3057\u306a\u304c\u3089\u4f5c\u696d\u3057\u305f\u3044\u3068\u304d\u306f PNG \u306e\u307b\u3046\u304c\u6271\u3044\u3084\u3059\u3044\u3067\u3059\u3002",
        },
        {
          label: "\u900f\u904e\u5bfe\u5fdc",
          value:
            "PNG \u306f\u900f\u904e\u306b\u5bfe\u5fdc\u3057\u307e\u3059\u304c\u3001JPG \u304b\u3089\u5909\u63db\u3057\u305f\u3060\u3051\u3067\u306f\u900f\u904e\u306f\u4ed8\u304d\u307e\u305b\u3093\u3002",
        },
      ],
      stepsTitle: "\u4f7f\u3044\u65b9",
      steps: [
        "JPG\u753b\u50cf\u3092\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u3057\u307e\u3059",
        "\u30d7\u30ec\u30d3\u30e5\u30fc\u3068\u753b\u50cf\u60c5\u5831\u3092\u78ba\u8a8d\u3057\u307e\u3059",
        "\u300cJPG\u3092PNG\u306b\u5909\u63db\u300d\u30dc\u30bf\u30f3\u3092\u62bc\u3057\u307e\u3059",
        "\u5909\u63db\u5f8c\u306ePNG\u753b\u50cf\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3057\u307e\u3059",
      ],
      faqTitle: "\u3088\u304f\u3042\u308b\u8cea\u554f",
      faqs: [
        {
          question: "JPG\u3092PNG\u306b\u3059\u308b\u3068\u753b\u8cea\u306f\u4e0a\u304c\u308a\u307e\u3059\u304b\uff1f",
          answer:
            "\u4e0a\u304c\u308a\u307e\u305b\u3093\u3002\u305f\u3060\u3057\u3001\u3053\u308c\u4ee5\u4e0a\u306e\u52a3\u5316\u3092\u6291\u3048\u306a\u304c\u3089\u5f8c\u7d9a\u306e\u7de8\u96c6\u3092\u3057\u3084\u3059\u304f\u3059\u308b\u52b9\u679c\u306f\u671f\u5f85\u3067\u304d\u307e\u3059\u3002",
        },
        {
          question: "\u900f\u904ePNG\u306b\u306a\u308a\u307e\u3059\u304b\uff1f",
          answer:
            "\u306a\u308a\u307e\u305b\u3093\u3002JPG \u306b\u306f\u900f\u904e\u60c5\u5831\u304c\u306a\u3044\u305f\u3081\u3001\u5909\u63db\u3060\u3051\u3067\u306f\u900f\u904e\u306f\u4ed8\u304d\u307e\u305b\u3093\u3002",
        },
        {
          question: "\u30b9\u30de\u30db\u3067\u3082\u4f7f\u3048\u307e\u3059\u304b\uff1f",
          answer:
            "\u306f\u3044\u3002\u5bfe\u5fdc\u30d6\u30e9\u30a6\u30b6\u304c\u3042\u308c\u3070\u30b9\u30de\u30db\u3084\u30bf\u30d6\u30ec\u30c3\u30c8\u3067\u3082\u4f7f\u3048\u307e\u3059\u3002",
        },
        {
          question: "\u5b89\u5168\u306b\u4f7f\u3048\u307e\u3059\u304b\uff1f",
          answer:
            "\u306f\u3044\u3002\u51e6\u7406\u306f\u30d6\u30e9\u30a6\u30b6\u5185\u3067\u884c\u308f\u308c\u308b\u305f\u3081\u3001\u753b\u50cf\u30d5\u30a1\u30a4\u30eb\u306f\u5916\u90e8\u30b5\u30fc\u30d0\u30fc\u3078\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u3055\u308c\u307e\u305b\u3093\u3002",
        },
      ],
      relatedToolsTitle: "\u6b21\u306b\u4f7f\u3044\u3084\u3059\u3044\u95a2\u9023\u30c4\u30fc\u30eb",
      relatedTools: [
        { name: "PNG\u3092JPG\u306b\u5909\u63db", href: "/tools/png-to-jpg" },
        { name: "WebP\u3092PNG\u306b\u5909\u63db", href: "/tools/webp-to-png" },
        { name: "\u753b\u50cf\u5727\u7e2e", href: "/tools/image-compress" },
        { name: "\u753b\u50cf\u30ea\u30b5\u30a4\u30ba", href: "/tools/resize-image" },
      ],
    },
    ui: {
      emptyTitle: "JPG\u753b\u50cf\u3092\u30c9\u30e9\u30c3\u30b0\uff06\u30c9\u30ed\u30c3\u30d7\u3001\u307e\u305f\u306f\u9078\u629e",
      selectedImageTitle: "\u9078\u629e\u4e2d\u306e\u753b\u50cf",
      fileNameLabel: "\u30d5\u30a1\u30a4\u30eb\u540d",
      fileTypeLabel: "\u5f62\u5f0f",
      fileSizeLabel: "\u30b5\u30a4\u30ba",
      previewLabel: "\u30d7\u30ec\u30d3\u30e5\u30fc",
      convertButton: "JPG\u3092PNG\u306b\u5909\u63db",
      convertingButton: "\u5909\u63db\u4e2d...",
      convertingStatus: "\u5909\u63db\u4e2d\u3067\u3059...",
      invalidFileError: "\u30a8\u30e9\u30fc: JPG\u30d5\u30a1\u30a4\u30eb\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
      canvasInitError: "\u30a8\u30e9\u30fc: \u753b\u50cf\u51e6\u7406\u306e\u521d\u671f\u5316\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
      convertError: "\u30a8\u30e9\u30fc: JPG\u304b\u3089PNG\u3078\u306e\u5909\u63db\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
      loadError: "\u30a8\u30e9\u30fc: \u753b\u50cf\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
      unknownType: "\u4e0d\u660e",
      unexpectedErrorPrefix: "\u30a8\u30e9\u30fc",
      successMessage: (fileName: string) =>
        `\u5b8c\u4e86: ${fileName}.png \u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3057\u307e\u3057\u305f\u3002`,
    },
  },
  en: {
    page: {
      title: "JPG to PNG Converter",
      description:
        "Convert JPG images to PNG online for free. The conversion runs in your browser, so it is fast, private, and easy to use.",
      aboutTitle: "What is a JPG to PNG converter?",
      aboutText:
        "Converting JPG to PNG is useful when you want an image that is easier to keep stable during later editing and saving. It works well for screenshots, diagrams, document assets, and design handoff files. This tool processes everything locally in your browser, so your files are not uploaded to an external server.",
      contentSections: [
        {
          title: "When JPG to PNG makes sense",
          paragraphs: [
            "JPG is great for lightweight photos, but it uses lossy compression. PNG is better when you want to avoid extra loss after future edits, exports, or repeated saves.",
            "That makes JPG to PNG useful for screenshots, charts, UI captures, reference images in presentations, and any file you plan to edit again later.",
          ],
        },
        {
          title: "Who should use this tool",
          paragraphs: [
            "Designers, content editors, marketers, and office users often convert JPG to PNG before adding text, annotations, or layout changes.",
            "If your main goal is a smaller file for publishing, JPG or WebP may still be the better final format. PNG is more about editing stability and compatibility than file size.",
          ],
        },
      ],
      listSections: [
        {
          title: "Important things to know before converting",
          items: [
            "Converting to PNG does not recover detail already lost in the original JPG.",
            "JPG files do not contain transparency, so the conversion will not create a transparent background automatically.",
            "Photos often become larger as PNG files.",
            "A practical workflow is to edit in PNG, then export a lighter format such as JPG or WebP when needed.",
          ],
        },
      ],
      comparisonTitle: "JPG vs PNG",
      comparisonItems: [
        {
          label: "Compression",
          value:
            "JPG uses lossy compression, while PNG uses lossless compression. JPG is usually smaller, while PNG is better for preserving changes over time.",
        },
        {
          label: "Best for",
          value:
            "JPG is usually best for photos. PNG is usually better for screenshots, text-heavy graphics, diagrams, and logos.",
        },
        {
          label: "Transparency",
          value:
            "PNG supports transparency, but converting a JPG will not magically create transparent areas because the source file does not contain that data.",
        },
        {
          label: "File size",
          value:
            "PNG files are often larger than JPG files, especially for photos and complex images.",
        },
      ],
      stepsTitle: "How to Use",
      steps: [
        "Upload a JPG image",
        "Check the preview",
        "Click the Convert JPG to PNG button",
        "Download the converted PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What is the difference between JPG and PNG?",
          answer:
            "JPG is usually better for photos and smaller file sizes, while PNG is better for preserving image detail during editing and saving.",
        },
        {
          question: "Will converting JPG to PNG improve image quality?",
          answer:
            "No. It will not restore quality already lost in the JPG, but it can help prevent additional loss in later editing steps.",
        },
        {
          question: "Can I create a transparent PNG from JPG?",
          answer:
            "Not by conversion alone. You would need a separate background removal step.",
        },
        {
          question: "Can I use this tool on mobile?",
          answer:
            "Yes. You can use it on phones and tablets in a modern browser without installing anything.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. The conversion happens in your browser, so your file is not uploaded to an external server.",
        },
      ],
      relatedToolsTitle: "Related tools people often use next",
      relatedTools: [
        { name: "PNG to JPG", href: "/en/tools/png-to-jpg" },
        { name: "WebP to PNG", href: "/en/tools/webp-to-png" },
        { name: "Image Compress", href: "/en/tools/image-compress" },
        { name: "Resize Image", href: "/en/tools/resize-image" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop a JPG image here, or select a file",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert JPG to PNG",
      convertingButton: "Converting...",
      convertingStatus: "Converting...",
      invalidFileError: "Error: Please select a JPG file.",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert JPG to PNG.",
      loadError: "Error: Failed to load image.",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: (fileName: string) =>
        `Done: ${fileName}.png has been downloaded.`,
    },
  },
};
