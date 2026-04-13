import type { JpgToPngContent, ToolLocale } from "./types";

export const pngToJpgContent: Record<ToolLocale, JpgToPngContent> = {
  ja: {
    page: {
      title: "PNG\u3092JPG\u306b\u5909\u63db",
      description:
        "PNG\u753b\u50cf\u3092JPG\u5f62\u5f0f\u306b\u5909\u63db\u3067\u304d\u308b\u7121\u6599\u30aa\u30f3\u30e9\u30a4\u30f3\u30c4\u30fc\u30eb\u3067\u3059\u3002\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u4e0d\u8981\u3067\u3001\u753b\u50cf\u3092\u8efd\u304f\u3057\u305f\u3044\u3068\u304d\u306b\u5411\u3044\u3066\u3044\u307e\u3059\u3002",
      aboutTitle: "PNG\u3092JPG\u306b\u5909\u63db\u3059\u308b\u3068\u3069\u3093\u306a\u3068\u304d\u306b\u4fbf\u5229\uff1f",
      aboutText:
        "PNG\u3092JPG\u306b\u5909\u63db\u3059\u308b\u3068\u3001\u30d5\u30a1\u30a4\u30eb\u30b5\u30a4\u30ba\u3092\u8efd\u304f\u3057\u3084\u3059\u304f\u306a\u308a\u307e\u3059\u3002\u30d6\u30ed\u30b0\u753b\u50cf\u3001EC\u5546\u54c1\u753b\u50cf\u3001\u30e1\u30fc\u30eb\u6dfb\u4ed8\u3001CMS \u5165\u7a3f\u306a\u3069\u3001\u5bb9\u91cf\u3092\u6291\u3048\u305f\u3044\u5834\u9762\u3067\u4f7f\u3044\u3084\u3059\u3044\u5909\u63db\u3067\u3059\u3002",
      contentSections: [
        {
          title: "PNG\u304b\u3089JPG\u3078\u5909\u63db\u3057\u305f\u3044\u4ee3\u8868\u4f8b",
          paragraphs: [
            "Web \u63b2\u8f09\u7528\u306e\u753b\u50cf\u3092\u8efd\u304f\u3057\u305f\u3044\u3068\u304d\u3001\u5546\u54c1\u753b\u50cf\u3092\u8907\u6570\u679a\u30a2\u30c3\u30d7\u3057\u305f\u3044\u3068\u304d\u3001\u30e1\u30fc\u30eb\u3084\u30c1\u30e3\u30c3\u30c8\u3067\u9001\u308a\u3084\u3059\u3044\u30d5\u30a1\u30a4\u30eb\u306b\u3057\u305f\u3044\u3068\u304d\u306b\u5411\u3044\u3066\u3044\u307e\u3059\u3002",
            "\u7279\u306b\u5199\u771f\u7cfb\u306e PNG \u306f JPG \u306b\u3059\u308b\u3068\u5bb9\u91cf\u304c\u304b\u306a\u308a\u4e0b\u304c\u308b\u3053\u3068\u304c\u3042\u308b\u305f\u3081\u3001\u300c\u307e\u305a\u8efd\u304f\u3057\u305f\u3044\u300d\u3068\u3044\u3046\u5834\u9762\u3067\u304a\u3059\u3059\u3081\u3067\u3059\u3002",
          ],
        },
        {
          title: "PNG\u306e\u307e\u307e\u6b8b\u3057\u305f\u307b\u3046\u304c\u3088\u3044\u30b1\u30fc\u30b9",
          paragraphs: [
            "\u900f\u904e\u80cc\u666f\u304c\u5fc5\u8981\u306a\u753b\u50cf\u3001\u30ed\u30b4\u3001\u30a2\u30a4\u30b3\u30f3\u3001\u30b9\u30af\u30ea\u30fc\u30f3\u30b7\u30e7\u30c3\u30c8\u3001\u6587\u5b57\u304c\u591a\u3044\u753b\u50cf\u3067\u306f PNG \u306e\u307b\u3046\u304c\u5411\u3044\u3066\u3044\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002",
            "\u300c\u8efd\u3055\u3092\u512a\u5148\u3059\u308b\u304b\u300d\u300c\u30a8\u30c3\u30b8\u306e\u30af\u30ea\u30a2\u3055\u3084\u900f\u904e\u3092\u6b8b\u3059\u304b\u300d\u3092\u5148\u306b\u6c7a\u3081\u308b\u3068\u3001JPG \u306b\u3059\u308b\u3079\u304d\u304b\u3069\u3046\u304b\u3092\u5224\u65ad\u3057\u3084\u3059\u3044\u3067\u3059\u3002",
          ],
        },
      ],
      listSections: [
        {
          title: "\u5909\u63db\u524d\u306b\u77e5\u3063\u3066\u304a\u304d\u305f\u3044\u3053\u3068",
          items: [
            "JPG \u306f\u900f\u904e\u306b\u5bfe\u5fdc\u3057\u3066\u3044\u306a\u3044\u305f\u3081\u3001\u900f\u904e\u90e8\u5206\u306f\u80cc\u666f\u8272\u306b\u7f6e\u304d\u63db\u308f\u308a\u307e\u3059\u3002",
            "\u7d30\u304b\u3044\u6587\u5b57\u3084\u7dda\u304c\u591a\u3044\u753b\u50cf\u3067\u306f\u3001PNG \u3088\u308a\u3082\u67d4\u3089\u304b\u304f\u898b\u3048\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002",
            "\u5f8c\u304b\u3089\u518d\u7de8\u96c6\u3057\u305f\u3044\u5834\u5408\u306f\u3001\u5143\u306e PNG \u3092\u6b8b\u3057\u3066\u304a\u304f\u3068\u5b89\u5fc3\u3067\u3059\u3002",
            "\u3055\u3089\u306b\u8efd\u304f\u3057\u305f\u3044\u5834\u5408\u306f\u3001JPG \u5909\u63db\u5f8c\u306b\u753b\u50cf\u5727\u7e2e\u3092\u7d44\u307f\u5408\u308f\u305b\u308b\u3068\u52b9\u679c\u7684\u3067\u3059\u3002",
          ],
        },
      ],
      comparisonTitle: "PNG\u3068JPG\u306e\u6bd4\u8f03",
      comparisonItems: [
        {
          label: "\u30d5\u30a1\u30a4\u30eb\u30b5\u30a4\u30ba",
          value:
            "\u4e00\u822c\u7684\u306b JPG \u306e\u307b\u3046\u304c\u8efd\u304f\u3001\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u3084\u5171\u6709\u3092\u3057\u3084\u3059\u3044\u3067\u3059\u3002",
        },
        {
          label: "\u5411\u3044\u3066\u3044\u308b\u753b\u50cf",
          value:
            "JPG \u306f\u5199\u771f\u7cfb\u306e\u753b\u50cf\u3001PNG \u306f\u30ed\u30b4\u3001\u56f3\u7248\u3001\u6587\u5b57\u304c\u591a\u3044\u753b\u50cf\u306b\u5411\u3044\u3066\u3044\u307e\u3059\u3002",
        },
        {
          label: "\u900f\u904e",
          value:
            "PNG \u306f\u900f\u904e\u306b\u5bfe\u5fdc\u3057\u307e\u3059\u304c\u3001JPG \u306f\u5bfe\u5fdc\u3057\u3066\u3044\u307e\u305b\u3093\u3002",
        },
        {
          label: "\u304a\u3059\u3059\u3081\u7528\u9014",
          value:
            "\u8efd\u3044\u753b\u50cf\u3092\u4f5c\u308a\u305f\u3044\u3068\u304d\u306f JPG\u3001\u8cc7\u6599\u7528\u306e\u56f3\u7248\u3084\u900f\u904e\u304c\u5fc5\u8981\u306a\u3068\u304d\u306f PNG \u304c\u5411\u3044\u3066\u3044\u307e\u3059\u3002",
        },
      ],
      stepsTitle: "\u4f7f\u3044\u65b9",
      steps: [
        "PNG\u753b\u50cf\u3092\u30a2\u30c3\u30d7\u30ed\u30fc\u30c9\u3057\u307e\u3059",
        "\u30d7\u30ec\u30d3\u30e5\u30fc\u3068\u753b\u50cf\u60c5\u5831\u3092\u78ba\u8a8d\u3057\u307e\u3059",
        "\u300cPNG\u3092JPG\u306b\u5909\u63db\u300d\u30dc\u30bf\u30f3\u3092\u62bc\u3057\u307e\u3059",
        "\u5909\u63db\u5f8c\u306eJPG\u753b\u50cf\u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3057\u307e\u3059",
      ],
      faqTitle: "\u3088\u304f\u3042\u308b\u8cea\u554f",
      faqs: [
        {
          question: "PNG\u3092JPG\u306b\u3059\u308b\u3068\u8efd\u304f\u306a\u308a\u307e\u3059\u304b\uff1f",
          answer:
            "\u591a\u304f\u306e\u5834\u5408\u3067\u8efd\u304f\u306a\u308a\u307e\u3059\u3002\u7279\u306b\u5199\u771f\u7cfb\u306e\u753b\u50cf\u3067\u306f\u5bb9\u91cf\u5dee\u304c\u51fa\u3084\u3059\u3044\u3067\u3059\u3002",
        },
        {
          question: "\u900f\u904e\u306f\u3069\u3046\u306a\u308a\u307e\u3059\u304b\uff1f",
          answer:
            "JPG \u306f\u900f\u904e\u306b\u5bfe\u5fdc\u3057\u3066\u3044\u306a\u3044\u305f\u3081\u3001\u900f\u904e\u90e8\u5206\u306f\u80cc\u666f\u8272\u306b\u5909\u308f\u308a\u307e\u3059\u3002",
        },
        {
          question: "\u753b\u8cea\u306f\u5909\u308f\u308a\u307e\u3059\u304b\uff1f",
          answer:
            "\u5909\u308f\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002JPG \u306f\u5727\u7e2e\u5f62\u5f0f\u306a\u306e\u3067\u3001\u6587\u5b57\u3084\u7dda\u306e\u591a\u3044\u753b\u50cf\u306f PNG \u3088\u308a\u3082\u67d4\u3089\u304b\u304f\u898b\u3048\u308b\u3053\u3068\u304c\u3042\u308a\u307e\u3059\u3002",
        },
        {
          question: "\u5b89\u5168\u306b\u4f7f\u3048\u307e\u3059\u304b\uff1f",
          answer:
            "\u306f\u3044\u3002\u5909\u63db\u51e6\u7406\u306f\u30d6\u30e9\u30a6\u30b6\u5185\u3067\u884c\u308f\u308c\u308b\u305f\u3081\u3001\u753b\u50cf\u306f\u5916\u90e8\u30b5\u30fc\u30d0\u30fc\u3078\u9001\u3089\u308c\u307e\u305b\u3093\u3002",
        },
      ],
      relatedToolsTitle: "\u6b21\u306b\u4f7f\u3044\u3084\u3059\u3044\u95a2\u9023\u30c4\u30fc\u30eb",
      relatedTools: [
        { name: "JPG\u3092PNG\u306b\u5909\u63db", href: "/tools/jpg-to-png" },
        { name: "PNG\u3092WebP\u306b\u5909\u63db", href: "/tools/png-to-webp" },
        { name: "\u753b\u50cf\u5727\u7e2e", href: "/tools/image-compress" },
        { name: "\u753b\u50cf\u30ea\u30b5\u30a4\u30ba", href: "/tools/resize-image" },
      ],
    },
    ui: {
      emptyTitle: "PNG\u753b\u50cf\u3092\u30c9\u30e9\u30c3\u30b0\uff06\u30c9\u30ed\u30c3\u30d7\u3001\u307e\u305f\u306f\u9078\u629e",
      selectedImageTitle: "\u9078\u629e\u4e2d\u306e\u753b\u50cf",
      fileNameLabel: "\u30d5\u30a1\u30a4\u30eb\u540d",
      fileTypeLabel: "\u5f62\u5f0f",
      fileSizeLabel: "\u30b5\u30a4\u30ba",
      previewLabel: "\u30d7\u30ec\u30d3\u30e5\u30fc",
      convertButton: "PNG\u3092JPG\u306b\u5909\u63db",
      convertingButton: "\u5909\u63db\u4e2d...",
      convertingStatus: "JPG\u306b\u5909\u63db\u4e2d\u3067\u3059...",
      invalidFileError: "\u30a8\u30e9\u30fc: PNG\u753b\u50cf\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
      canvasInitError: "\u30a8\u30e9\u30fc: \u753b\u50cf\u51e6\u7406\u306e\u521d\u671f\u5316\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
      convertError: "\u30a8\u30e9\u30fc: PNG\u304b\u3089JPG\u3078\u306e\u5909\u63db\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
      loadError: "\u30a8\u30e9\u30fc: \u753b\u50cf\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
      unknownType: "\u4e0d\u660e",
      unexpectedErrorPrefix: "\u30a8\u30e9\u30fc",
      successMessage: (fileName: string) =>
        `\u5b8c\u4e86: ${fileName}.jpg \u3092\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u3057\u307e\u3057\u305f\u3002`,
    },
  },
  en: {
    page: {
      title: "PNG to JPG Converter",
      description:
        "Convert PNG images to JPG online for free. This is useful when you want smaller image files for upload, sharing, or web publishing.",
      aboutTitle: "What is a PNG to JPG converter?",
      aboutText:
        "PNG to JPG conversion is helpful when file size matters more than keeping every pixel exactly as-is. JPG is often easier to upload, send, or publish, especially for photos and general-purpose images. This tool runs in your browser, so you can convert files quickly without uploading them to an external server.",
      contentSections: [
        {
          title: "Common reasons to convert PNG to JPG",
          paragraphs: [
            "People often use PNG to JPG when preparing blog images, product photos, email attachments, CMS uploads, or image assets that need to stay lightweight.",
            "If the final destination is a website, marketplace listing, shared folder, or messaging app, JPG can be a more practical format than PNG.",
          ],
        },
        {
          title: "When PNG may still be the better choice",
          paragraphs: [
            "PNG is usually better for transparent graphics, logos, icons, line art, diagrams, and screenshots with a lot of text.",
            "Before converting, decide whether your priority is smaller size or sharper edges. That one decision usually tells you which format is better.",
          ],
        },
      ],
      listSections: [
        {
          title: "Things that often surprise people",
          items: [
            "JPG does not support transparency, so transparent areas are replaced with a background color.",
            "Text-heavy images and graphics with sharp edges may look softer after conversion.",
            "If you need to edit the file repeatedly later, keep the original PNG as a master copy.",
            "For even smaller files, convert first and then try image compression as a second step.",
          ],
        },
      ],
      comparisonTitle: "PNG vs JPG",
      comparisonItems: [
        {
          label: "File size",
          value: "JPG is usually smaller and easier to upload or share.",
        },
        {
          label: "Image behavior",
          value:
            "PNG preserves crisp edges better, while JPG is better suited to photos and general lightweight delivery.",
        },
        {
          label: "Transparency",
          value: "PNG supports transparency. JPG does not.",
        },
        {
          label: "Best use",
          value:
            "Use JPG for photos and lightweight output. Use PNG for logos, screenshots, diagrams, and editing masters.",
        },
      ],
      stepsTitle: "How to Use",
      steps: [
        "Upload a PNG image",
        "Check the preview",
        "Click the Convert PNG to JPG button",
        "Download the converted JPG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Will PNG to JPG reduce file size?",
          answer:
            "In many cases, yes. JPG is often much smaller than PNG, especially for photos.",
        },
        {
          question: "What happens to transparency?",
          answer:
            "JPG does not support transparency, so transparent areas are replaced with a background color.",
        },
        {
          question: "Will image quality change?",
          answer:
            "It can. JPG uses lossy compression, so text and sharp edges may look softer than in the original PNG.",
        },
        {
          question: "Can I use this tool on mobile?",
          answer:
            "Yes. It works in modern mobile browsers as well as on desktop.",
        },
        {
          question: "Is it safe to use?",
          answer:
            "Yes. The conversion happens in your browser, so your image is not uploaded to an external server.",
        },
      ],
      relatedToolsTitle: "Related tools for the next step",
      relatedTools: [
        { name: "JPG to PNG", href: "/en/tools/jpg-to-png" },
        { name: "PNG to WebP", href: "/en/tools/png-to-webp" },
        { name: "Image Compress", href: "/en/tools/image-compress" },
        { name: "Resize Image", href: "/en/tools/resize-image" },
      ],
    },
    ui: {
      emptyTitle: "Upload a PNG image",
      selectedImageTitle: "Selected image",
      fileNameLabel: "File name",
      fileTypeLabel: "Format",
      fileSizeLabel: "Size",
      previewLabel: "Preview",
      convertButton: "Convert PNG to JPG",
      convertingButton: "Converting...",
      convertingStatus: "Converting to JPG...",
      invalidFileError: "Error: Please select a PNG image.",
      canvasInitError: "Error: Failed to initialize canvas.",
      convertError: "Error: Failed to convert to JPG.",
      loadError: "Error: Failed to load the image.",
      unknownType: "Unknown",
      unexpectedErrorPrefix: "Error",
      successMessage: (fileName: string) =>
        `Done: ${fileName}.jpg has been downloaded.`,
    },
  },
};
