"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import FAQJsonLd from "@/components/FAQJsonLd";

type Locale = "ja" | "en";

type FAQItem = {
  question: string;
  answer: string;
};

type RelatedToolItem = {
  name: string;
  href: string;
};

type ToolTextSection = {
  title: string;
  paragraphs: string[];
};

type ToolListSection = {
  title: string;
  items: string[];
};

type ToolComparisonItem = {
  label: string;
  value: string;
};

type PageContent = {
  title: string;
  description: string;
  aboutTitle: string;
  aboutText: string;
  contentSections?: ToolTextSection[];
  listSections?: ToolListSection[];
  comparisonTitle?: string;
  comparisonItems?: ToolComparisonItem[];
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: FAQItem[];
  relatedTools: RelatedToolItem[];
  relatedToolsTitle?: string;
};

type UIContent = {
  emptyTitle: string;
  emptyDescription: string;
  selectButtonLabel: string;
  dropHereLabel: string;
  clickToSelectLabel: string;
  selectedFileLabel: string;
  qualityLabel: string;
  qualityHint: string;
  outputFormatLabel: string;
  keepOriginalFormat: string;
  convertToJpg: string;
  convertToWebp: string;
  exportAsPng: string;
  selectedImageTitle: string;
  fileNameLabel: string;
  fileTypeLabel: string;
  fileSizeLabel: string;
  originalSizeLabel: string;
  compressedSizeLabel: string;
  reductionLabel: string;
  previewBeforeLabel: string;
  previewAfterLabel: string;
  previewPlaceholder: string;
  compressButton: string;
  compressingButton: string;
  downloadButton: string;
  resetButton: string;
  unknownType: string;
  invalidFileError: string;
  processingStatus: string;
  successMessage: string;
  convertError: string;
};

type ToolContent = {
  page: PageContent;
  ui: UIContent;
};

type Props = {
  locale: Locale;
};

const content: Record<Locale, ToolContent> = {
  ja: {
    page: {
      title: "画像圧縮ツール",
      description:
        "JPG・PNG・WebP画像をブラウザ上で圧縮できる無料オンラインツールです。アップロード不要・高速・安全に軽量化できます。",
      aboutTitle: "画像圧縮ツールとは？",
      aboutText:
        "画像圧縮ツールは、JPG・PNG・WebP画像のファイルサイズを小さくできる無料オンラインツールです。ブログ掲載用の画像、ECサイトの商品画像、SNS投稿画像、ポートフォリオ画像などを軽量化することで、表示速度の改善やアップロード時間の短縮に役立ちます。処理はブラウザ上で完結するため、画像ファイルを外部サーバーへアップロードせずに安全に利用できます。",
      contentSections: [
        {
          title: "画像圧縮が役立つ場面",
          paragraphs: [
            "記事用の画像でページ表示を速くしたいとき、ECサイトの商品画像を軽量化したいとき、メール添付やチャット送信をしやすくしたいときに役立ちます。",
            "ポートフォリオやスライド資料に入れる画像、SNS投稿用の画像、広告入稿用の素材など、容量制限や表示速度が気になる場面では特に効果を感じやすいです。",
          ],
        },
        {
          title: "圧縮方法の考え方",
          paragraphs: [
            "JPGやWebPでは品質スライダーを少し下げるだけでも容量が大きく減ることがあります。PNGは構造上、写真よりも図版や透過素材向きなので、画像の内容によって削減率が変わります。",
            "まずは元画像を保管したうえで、品質80前後から試し、見た目とサイズのバランスを確認しながら調整するのがおすすめです。",
          ],
        },
      ],
      listSections: [
        {
          title: "失敗しにくくするコツ",
          items: [
            "文字が多い画像は強く圧縮しすぎるとにじみやすいです。",
            "商品画像や人物写真は、品質70〜85あたりから試すとバランスを取りやすいです。",
            "PNGは圧縮だけではあまり軽くならない場合があるため、必要に応じて JPG や WebP への変換も検討すると効果的です。",
            "公開前の最終調整として、リサイズと圧縮を組み合わせるとさらに軽くできます。",
          ],
        },
      ],
      comparisonTitle: "出力形式ごとの特徴",
      comparisonItems: [
        {
          label: "元の形式のまま圧縮",
          value:
            "元の見た目や運用フローを大きく変えたくない場合に向いています。まずはここから試すのが安全です。",
        },
        {
          label: "JPGに変換して圧縮",
          value:
            "写真の容量を軽くしたいときに向いています。透過は保持されません。",
        },
        {
          label: "WebPに変換して圧縮",
          value:
            "Web掲載向けにより軽量化を狙いたい場合に有効です。対応環境は十分広がっていますが、提出先の仕様は確認すると安心です。",
        },
        {
          label: "PNGとして出力",
          value:
            "図版や透過画像を扱いたい場合に便利ですが、容量はあまり下がらないこともあります。",
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "画像ファイルをアップロードします",
        "圧縮品質をスライダーで調整します",
        "必要に応じて出力形式を選択します",
        "「画像を圧縮」ボタンを押します",
        "圧縮後の画像を確認してダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画像はサーバーにアップロードされますか？",
          answer:
            "いいえ。画像はブラウザ上で処理されるため、外部サーバーにはアップロードされません。",
        },
        {
          question: "PNG画像も圧縮できますか？",
          answer:
            "はい。PNG画像も圧縮できます。ただし、JPGやWebPに比べるとサイズ削減率が小さい場合があります。",
        },
        {
          question: "おすすめの品質設定はありますか？",
          answer:
            "一般的には70〜85程度が使いやすいです。画質を保ちつつ軽量化したい場合は80前後から試すのがおすすめです。",
        },
        {
          question: "スマホでも使えますか？",
          answer:
            "はい。対応ブラウザであればスマホ・タブレット・PCで利用できます。",
        },
      ],
      relatedTools: [
        { name: "画像リサイズ", href: "/tools/resize-image" },
        { name: "画像切り抜き", href: "/tools/crop-image" },
        { name: "画像回転", href: "/tools/rotate-image" },
        { name: "JPGをWebPに変換", href: "/tools/jpg-to-webp" },
      ],
      relatedToolsTitle: "圧縮と一緒に使いやすい関連ツール",
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ、または選択",
      emptyDescription:
        "JPG / PNG / WebP画像を圧縮して、容量を軽くできます。",
      selectButtonLabel: "画像を選択",
      dropHereLabel: "ここにファイルをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      qualityLabel: "圧縮品質",
      qualityHint:
        "数値を下げるほどファイルサイズは小さくなります。写真なら 70〜85 程度が目安です。",
      outputFormatLabel: "出力形式",
      keepOriginalFormat: "元の形式のまま",
      convertToJpg: "JPG に変換して圧縮",
      convertToWebp: "WebP に変換して圧縮",
      exportAsPng: "PNG として出力",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      originalSizeLabel: "元のサイズ",
      compressedSizeLabel: "圧縮後サイズ",
      reductionLabel: "削減率",
      previewBeforeLabel: "圧縮前プレビュー",
      previewAfterLabel: "圧縮後プレビュー",
      previewPlaceholder: "圧縮後のプレビューはここに表示されます。",
      compressButton: "画像を圧縮",
      compressingButton: "圧縮中...",
      downloadButton: "圧縮画像をダウンロード",
      resetButton: "リセット",
      unknownType: "不明",
      invalidFileError:
        "エラー: JPG / PNG / WebP ファイルを選択してください。",
      processingStatus: "画像を圧縮中です...",
      successMessage: "完了: 画像の圧縮が完了しました。",
      convertError: "エラー: 画像の圧縮に失敗しました。",
    },
  },
  en: {
    page: {
      title: "Image Compressor",
      description:
        "Compress JPG, PNG, and WebP images online for free. No upload required, fast, secure, and easy to use in your browser.",
      aboutTitle: "What is Image Compressor?",
      aboutText:
        "This free image compressor helps you reduce the file size of JPG, PNG, and WebP images directly in your browser. It is useful for blog images, ecommerce product images, social media assets, portfolio screenshots, and other web graphics. Smaller files can improve page speed, reduce upload time, and save storage space. Since processing happens locally in your browser, your files are not uploaded to an external server.",
      contentSections: [
        {
          title: "When image compression helps most",
          paragraphs: [
            "Compression is especially helpful for blog images, ecommerce product photos, portfolio screenshots, slide decks, social media assets, and any upload where speed or file limits matter.",
            "Smaller files can improve page speed, shorten upload time, reduce storage usage, and make image-heavy pages feel much faster.",
          ],
        },
        {
          title: "How to choose the right approach",
          paragraphs: [
            "For photos, lowering quality a little often saves a lot of space with only a small visual tradeoff. For PNG graphics, size savings can be more limited depending on the image structure.",
            "A practical starting point is quality 80, then move downward only if the result still looks good at the size people will actually view.",
          ],
        },
      ],
      listSections: [
        {
          title: "Tips for better results",
          items: [
            "Do not over-compress text-heavy images, because small text and sharp edges can degrade quickly.",
            "Product shots and portraits often work well in the 70 to 85 quality range.",
            "If PNG files barely shrink, try converting to JPG or WebP instead.",
            "Combining resize and compression often gives a much better result than compression alone.",
          ],
        },
      ],
      comparisonTitle: "Output format tradeoffs",
      comparisonItems: [
        {
          label: "Keep original format",
          value:
            "Best when you want a safer first pass without changing the overall workflow or file type.",
        },
        {
          label: "Convert to JPG",
          value:
            "Usually a strong choice for photos and general lightweight sharing. Transparency is lost.",
        },
        {
          label: "Convert to WebP",
          value:
            "Often the most efficient choice for web delivery when compatibility requirements allow it.",
        },
        {
          label: "Export as PNG",
          value:
            "Useful for graphics or transparency, but often less effective for aggressive file-size reduction.",
        },
      ],
      stepsTitle: "How to Use",
      steps: [
        "Upload an image file",
        "Adjust the compression quality with the slider",
        "Choose an output format if needed",
        "Click the Compress Image button",
        "Preview and download the compressed image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my images uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your files are not uploaded to an external server.",
        },
        {
          question: "Can I compress PNG images too?",
          answer:
            "Yes. PNG images can also be compressed, although the size reduction may be smaller compared to JPG or WebP.",
        },
        {
          question: "What quality setting should I use?",
          answer:
            "A range of 70 to 85 is a good starting point for most images. Around 80 often gives a good balance between quality and size.",
        },
        {
          question: "Does it work on mobile devices?",
          answer:
            "Yes. You can use it on phones, tablets, and desktop browsers that support modern web features.",
        },
      ],
      relatedTools: [
        { name: "Resize Image", href: "/en/tools/resize-image" },
        { name: "Crop Image", href: "/en/tools/crop-image" },
        { name: "Rotate Image", href: "/en/tools/rotate-image" },
        { name: "JPG to WebP", href: "/en/tools/jpg-to-webp" },
      ],
      relatedToolsTitle: "Related tools that pair well with compression",
    },
    ui: {
      emptyTitle: "Drag and drop an image here, or select a file",
      emptyDescription:
        "Compress JPG, PNG, or WebP images and reduce file size directly in your browser.",
      selectButtonLabel: "Choose Image",
      dropHereLabel: "Drop file here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      qualityLabel: "Compression Quality",
      qualityHint:
        "Lower values create smaller files. A quality range of 70–85 is a good starting point for photos.",
      outputFormatLabel: "Output Format",
      keepOriginalFormat: "Keep original format",
      convertToJpg: "Convert to JPG",
      convertToWebp: "Convert to WebP",
      exportAsPng: "Export as PNG",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      originalSizeLabel: "Original Size",
      compressedSizeLabel: "Compressed Size",
      reductionLabel: "Reduction",
      previewBeforeLabel: "Before Compression",
      previewAfterLabel: "After Compression",
      previewPlaceholder: "The compressed preview will appear here.",
      compressButton: "Compress Image",
      compressingButton: "Compressing...",
      downloadButton: "Download Compressed Image",
      resetButton: "Reset",
      unknownType: "Unknown",
      invalidFileError:
        "Error: Please select a JPG, PNG, or WebP file.",
      processingStatus: "Compressing image...",
      successMessage: "Done: Image compression completed successfully.",
      convertError: "Error: Failed to compress the image.",
    },
  },
};

type OutputFormat = "original" | "image/jpeg" | "image/webp" | "image/png";

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function getDownloadExtension(mimeType: string) {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/webp":
      return "webp";
    case "image/png":
      return "png";
    default:
      return "png";
  }
}

function getOutputMimeType(
  originalType: string,
  outputFormat: OutputFormat
): string {
  if (outputFormat !== "original") {
    return outputFormat;
  }

  if (
    originalType === "image/jpeg" ||
    originalType === "image/png" ||
    originalType === "image/webp"
  ) {
    return originalType;
  }

  return "image/jpeg";
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    image.src = objectUrl;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob"));
          return;
        }
        resolve(blob);
      },
      mimeType,
      quality
    );
  });
}

export default function ImageCompressTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [quality, setQuality] = useState<number>(80);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("original");
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedPreviewUrl, setCompressedPreviewUrl] = useState("");

  const previewUrl = useMemo(() => {
    if (!image) return "";
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    return () => {
      if (compressedPreviewUrl) URL.revokeObjectURL(compressedPreviewUrl);
    };
  }, [compressedPreviewUrl]);

  const fileInfo = useMemo(() => {
    if (!image) return null;

    return {
      name: image.name,
      type: image.type || ui.unknownType,
      size: formatFileSize(image.size),
    };
  }, [image, ui.unknownType]);

  const compressedInfo = useMemo(() => {
    if (!compressedBlob || !image) return null;

    const reduction =
      image.size > 0
        ? Math.max(
            0,
            ((image.size - compressedBlob.size) / image.size) * 100
          ).toFixed(1)
        : "0.0";

    return {
      size: formatFileSize(compressedBlob.size),
      reduction: `${reduction}%`,
    };
  }, [compressedBlob, image]);

  const handleFileSelect = (file: File | null) => {
    setMessage("");

    if (compressedPreviewUrl) {
      URL.revokeObjectURL(compressedPreviewUrl);
      setCompressedPreviewUrl("");
    }

    setCompressedBlob(null);

    if (!file) {
      setImage(null);
      return;
    }

    const isSupported =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp" ||
      /\.(jpg|jpeg|png|webp)$/i.test(file.name);

    if (!isSupported) {
      setImage(null);
      setMessage(ui.invalidFileError);
      return;
    }

    setImage(file);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    handleFileSelect(file);
    event.target.value = "";
  };

  const handleCompress = async () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setMessage(ui.processingStatus);

      const loadedImage = await loadImageFromFile(image);

      const canvas = document.createElement("canvas");
      canvas.width = loadedImage.width;
      canvas.height = loadedImage.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Failed to initialize canvas");
      }

      ctx.drawImage(loadedImage, 0, 0);

      const targetMimeType = getOutputMimeType(image.type, outputFormat);
      const blob = await canvasToBlob(
        canvas,
        targetMimeType,
        Math.max(0.1, Math.min(1, quality / 100))
      );

      if (compressedPreviewUrl) {
        URL.revokeObjectURL(compressedPreviewUrl);
      }

      const nextUrl = URL.createObjectURL(blob);
      setCompressedBlob(blob);
      setCompressedPreviewUrl(nextUrl);
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.convertError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlob || !image || !compressedPreviewUrl) return;

    const targetMimeType = getOutputMimeType(image.type, outputFormat);
    const extension = getDownloadExtension(targetMimeType);
    const dotIndex = image.name.lastIndexOf(".");
    const baseName = dotIndex >= 0 ? image.name.slice(0, dotIndex) : image.name;
    const link = document.createElement("a");

    link.href = compressedPreviewUrl;
    link.download = `${baseName}-compressed.${extension}`;
    link.click();
  };

  const handleReset = () => {
    setImage(null);
    setMessage("");
    setIsProcessing(false);
    setQuality(80);
    setOutputFormat("original");

    if (compressedPreviewUrl) {
      URL.revokeObjectURL(compressedPreviewUrl);
    }

    setCompressedPreviewUrl("");
    setCompressedBlob(null);
  };

  return (
    <>
      <FAQJsonLd faqs={page.faqs} />
      <ToolPageLayout
      title={page.title}
      description={page.description}
      aboutTitle={page.aboutTitle}
      aboutText={page.aboutText}
      contentSections={page.contentSections}
      listSections={page.listSections}
      comparisonTitle={page.comparisonTitle}
      comparisonItems={page.comparisonItems}
      stepsTitle={page.stepsTitle}
      steps={page.steps}
      faqTitle={page.faqTitle}
      faqs={page.faqs}
      relatedTools={page.relatedTools}
      relatedToolsTitle={page.relatedToolsTitle}
    >
      <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <FileDropzone
          file={image}
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          emptyTitle={ui.emptyTitle}
          emptyDescription={ui.emptyDescription}
          selectButtonLabel={ui.selectButtonLabel}
          dropHereLabel={ui.dropHereLabel}
          clickToSelectLabel={ui.clickToSelectLabel}
          selectedFileLabel={ui.selectedFileLabel}
          onFileSelect={handleFileSelect}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-800">
            {ui.selectButtonLabel}
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            onChange={handleInputChange}
            className="block w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-gray-700"
          />
        </div>

        {fileInfo && (
          <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">
                {ui.selectedImageTitle}
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-800">
                    {ui.fileNameLabel}:
                  </span>{" "}
                  {fileInfo.name}
                </p>
                <p>
                  <span className="font-medium text-gray-800">
                    {ui.fileTypeLabel}:
                  </span>{" "}
                  {fileInfo.type}
                </p>
                <p>
                  <span className="font-medium text-gray-800">
                    {ui.fileSizeLabel}:
                  </span>{" "}
                  {fileInfo.size}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="quality"
                className="text-sm font-medium text-gray-800"
              >
                {ui.qualityLabel}: {quality}
              </label>
              <input
                id="quality"
                type="range"
                min="10"
                max="100"
                step="1"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-sm text-gray-600">{ui.qualityHint}</p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="output-format"
                className="text-sm font-medium text-gray-800"
              >
                {ui.outputFormatLabel}
              </label>
              <select
                id="output-format"
                value={outputFormat}
                onChange={(e) =>
                  setOutputFormat(e.target.value as OutputFormat)
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
              >
                <option value="original">{ui.keepOriginalFormat}</option>
                <option value="image/jpeg">{ui.convertToJpg}</option>
                <option value="image/webp">{ui.convertToWebp}</option>
                <option value="image/png">{ui.exportAsPng}</option>
              </select>
            </div>
          </div>
        )}

        {previewUrl && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">{ui.previewBeforeLabel}</div>
              <img
                src={previewUrl}
                alt="before preview"
                className="max-h-80 w-full rounded border object-contain"
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm text-gray-600">{ui.previewAfterLabel}</div>
              {compressedPreviewUrl ? (
                <img
                  src={compressedPreviewUrl}
                  alt="after preview"
                  className="max-h-80 w-full rounded border object-contain"
                />
              ) : (
                <div className="flex h-80 items-center justify-center rounded border border-dashed bg-gray-50 px-4 text-center text-sm text-gray-500">
                  {ui.previewPlaceholder}
                </div>
              )}
            </div>
          </div>
        )}

        {compressedInfo && (
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <p>
              <span className="font-medium text-gray-800">
                {ui.originalSizeLabel}:
              </span>{" "}
              {image ? formatFileSize(image.size) : "-"}
            </p>
            <p>
              <span className="font-medium text-gray-800">
                {ui.compressedSizeLabel}:
              </span>{" "}
              {compressedInfo.size}
            </p>
            <p>
              <span className="font-medium text-gray-800">
                {ui.reductionLabel}:
              </span>{" "}
              {compressedInfo.reduction}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton
            onClick={handleCompress}
            disabled={!image || isProcessing}
          >
            {isProcessing ? ui.compressingButton : ui.compressButton}
          </PrimaryButton>

          {compressedBlob && (
            <PrimaryButton onClick={handleDownload}>
              {ui.downloadButton}
            </PrimaryButton>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {ui.resetButton}
          </button>
        </div>

        {message && <StatusMessage status={message} />}
      </div>
    </ToolPageLayout>
    </>
  );
}


