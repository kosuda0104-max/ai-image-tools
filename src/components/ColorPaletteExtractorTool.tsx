"use client";

import { useEffect, useMemo, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";

type Locale = "ja" | "en";

type FAQItem = {
  question: string;
  answer: string;
};

type RelatedToolItem = {
  name: string;
  href: string;
};

type PageContent = {
  title: string;
  description: string;
  aboutTitle: string;
  aboutText: string;
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: FAQItem[];
  relatedTools: RelatedToolItem[];
};

type UIContent = {
  emptyTitle: string;
  emptyDescription: string;
  selectButtonLabel: string;
  dropHereLabel: string;
  clickToSelectLabel: string;
  selectedFileLabel: string;
  countLabel: string;
  extractButton: string;
  extractingButton: string;
  resetButton: string;
  paletteTitle: string;
  copyHexHint: string;
  copiedLabel: string;
  cssVarsTitle: string;
  copyButton: string;
  invalidFileError: string;
  processingStatus: string;
  successMessage: string;
  extractError: string;
};

type ToolContent = {
  page: PageContent;
  ui: UIContent;
};

type Props = {
  locale: Locale;
};

type Swatch = {
  r: number;
  g: number;
  b: number;
  hex: string;
};

const content: Record<Locale, ToolContent> = {
  ja: {
    page: {
      title: "画像カラーパレット抽出ツール",
      description:
        "画像から主要な色（メインカラー・サブカラー）を抽出し、HEX・RGB・CSS変数として取得できる無料ツールです。アップロード不要、ブラウザ内で処理します。",
      aboutTitle: "カラーパレット抽出ツールとは？",
      aboutText:
        "写真やイラスト、ロゴ、スクリーンショットなどから、配色のベースになる主要な色を自動で抽出するツールです。Webサイトやスライド、資料の配色を決めるとき、参考画像から色を拾えると作業が一気に楽になります。抽出した色はHEXコード・RGB値で確認でき、ワンクリックでコピー可能。さらにCSSカスタムプロパティ（CSS変数）としてまとめて出力するので、そのままスタイルシートに貼り付けられます。すべてブラウザ内で処理するため、画像を外部サーバーへアップロードする必要はありません。デザイナー・ブロガー・個人開発者の配色決めに役立ちます。",
      stepsTitle: "使い方",
      steps: [
        "画像ファイル（JPG / PNG / WebP）を選択します",
        "抽出する色数（4〜8色）を選びます",
        "「色を抽出」ボタンを押します",
        "各色のHEX・RGBを確認し、クリックでコピーします",
        "CSS変数のコードをコピーしてスタイルに使います",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画像はアップロードされますか？",
          answer:
            "いいえ。すべてブラウザ内で処理されるため、画像が外部サーバーに送信されることはありません。",
        },
        {
          question: "抽出される色はどう決まりますか？",
          answer:
            "画像内のピクセルを色ごとに集計し、出現頻度が高く、かつ互いに十分異なる色を主要色として選び出します。",
        },
        {
          question: "CSS変数はどう使えますか？",
          answer:
            "出力された :root { --color-1: ...; } をスタイルシートに貼り付け、var(--color-1) のように参照できます。",
        },
        {
          question: "透過画像でも使えますか？",
          answer:
            "はい。透明なピクセルは集計から除外するため、透過PNGのロゴなどからも主要色を抽出できます。",
        },
      ],
      relatedTools: [
        { name: "OGP画像メーカー", href: "/tools/ogp-image-maker" },
        { name: "画像を白黒化", href: "/tools/grayscale-image" },
        { name: "画像圧縮", href: "/tools/image-compress" },
        { name: "画像を Base64 に変換", href: "/tools/image-to-base64" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ、または選択",
      emptyDescription: "JPG / PNG / WebP から主要な色を抽出します。",
      selectButtonLabel: "画像を選択",
      dropHereLabel: "ここにファイルをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      countLabel: "抽出する色数",
      extractButton: "色を抽出",
      extractingButton: "抽出中...",
      resetButton: "リセット",
      paletteTitle: "抽出されたパレット",
      copyHexHint: "色をクリックするとHEXをコピーします。",
      copiedLabel: "コピーしました",
      cssVarsTitle: "CSS変数",
      copyButton: "コードをコピー",
      invalidFileError: "エラー: JPG / PNG / WebP ファイルを選択してください。",
      processingStatus: "色を抽出中です...",
      successMessage: "完了: カラーパレットを抽出しました。",
      extractError: "エラー: 色の抽出に失敗しました。",
    },
  },
  en: {
    page: {
      title: "Image Color Palette Extractor",
      description:
        "Extract the dominant colors from an image and get them as HEX, RGB, and CSS variables. Free, no upload required, processed in your browser.",
      aboutTitle: "What is the Color Palette Extractor?",
      aboutText:
        "This tool automatically pulls the main colors from a photo, illustration, logo, or screenshot. When you are choosing a color scheme for a website, slides, or a document, grabbing colors from a reference image makes the job much easier. Extracted colors are shown as HEX codes and RGB values and can be copied with one click. It also outputs a set of CSS custom properties (CSS variables) you can paste straight into a stylesheet. Everything is processed in your browser, so your image is never uploaded to a server. It is handy for designers, bloggers, and indie developers picking a palette.",
      stepsTitle: "How to Use",
      steps: [
        "Select an image file (JPG / PNG / WebP)",
        "Choose how many colors to extract (4–8)",
        "Click the Extract Colors button",
        "Check each color's HEX and RGB, and click to copy",
        "Copy the CSS variables to use in your styles",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my images uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your images are never sent to an external server.",
        },
        {
          question: "How are the colors chosen?",
          answer:
            "Pixels are grouped by color and counted, then the most frequent colors that are also sufficiently distinct from each other are selected as the main palette.",
        },
        {
          question: "How do I use the CSS variables?",
          answer:
            "Paste the generated :root { --color-1: ...; } into your stylesheet and reference them like var(--color-1).",
        },
        {
          question: "Does it work with transparent images?",
          answer:
            "Yes. Transparent pixels are excluded from the count, so it works on transparent PNG logos too.",
        },
      ],
      relatedTools: [
        { name: "OGP Image Maker", href: "/en/tools/ogp-image-maker" },
        { name: "Grayscale Image", href: "/en/tools/grayscale-image" },
        { name: "Image Compress", href: "/en/tools/image-compress" },
        { name: "Image to Base64", href: "/en/tools/image-to-base64" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop an image here, or select a file",
      emptyDescription: "Extract the dominant colors from a JPG, PNG, or WebP image.",
      selectButtonLabel: "Choose Image",
      dropHereLabel: "Drop file here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      countLabel: "Number of colors",
      extractButton: "Extract Colors",
      extractingButton: "Extracting...",
      resetButton: "Reset",
      paletteTitle: "Extracted Palette",
      copyHexHint: "Click a color to copy its HEX.",
      copiedLabel: "Copied",
      cssVarsTitle: "CSS Variables",
      copyButton: "Copy code",
      invalidFileError: "Error: Please select a JPG, PNG, or WebP file.",
      processingStatus: "Extracting colors...",
      successMessage: "Done: Color palette extracted.",
      extractError: "Error: Failed to extract colors.",
    },
  },
};

function toHex(n: number) {
  return n.toString(16).padStart(2, "0");
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function colorDistance(a: Swatch, b: { r: number; g: number; b: number }) {
  return Math.sqrt(
    (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2
  );
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

// Downscale the image, then bucket colors into a 12-bit space, average each
// bucket, and pick the most frequent buckets that are visually distinct.
function extractPalette(image: HTMLImageElement, count: number): Swatch[] {
  const maxSide = 160;
  const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
  const w = Math.max(1, Math.round(image.width * scale));
  const h = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Failed to initialize canvas");
  ctx.drawImage(image, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  const buckets = new Map<
    number,
    { r: number; g: number; b: number; count: number }
  >();
  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha < 125) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    const existing = buckets.get(key);
    if (existing) {
      existing.r += r;
      existing.g += g;
      existing.b += b;
      existing.count += 1;
    } else {
      buckets.set(key, { r, g, b, count: 1 });
    }
  }

  const averaged = Array.from(buckets.values()).map((bucket) => ({
    r: Math.round(bucket.r / bucket.count),
    g: Math.round(bucket.g / bucket.count),
    b: Math.round(bucket.b / bucket.count),
    count: bucket.count,
  }));
  averaged.sort((a, b) => b.count - a.count);

  const picked: Swatch[] = [];
  const pushColor = (c: { r: number; g: number; b: number }) => {
    picked.push({ r: c.r, g: c.g, b: c.b, hex: rgbToHex(c.r, c.g, c.b) });
  };

  for (const candidate of averaged) {
    if (picked.length >= count) break;
    if (picked.every((p) => colorDistance(p, candidate) > 40)) {
      pushColor(candidate);
    }
  }
  // Backfill from the most frequent buckets if diversity filtering left gaps.
  for (const candidate of averaged) {
    if (picked.length >= count) break;
    if (picked.every((p) => colorDistance(p, candidate) > 1)) {
      pushColor(candidate);
    }
  }

  return picked.slice(0, count);
}

export default function ColorPaletteExtractorTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [count, setCount] = useState(6);
  const [palette, setPalette] = useState<Swatch[]>([]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [cssCopied, setCssCopied] = useState(false);

  const previewUrl = useMemo(() => {
    if (!image) return "";
    return URL.createObjectURL(image);
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const cssVars = useMemo(() => {
    if (palette.length === 0) return "";
    const lines = palette.map((c, i) => `  --color-${i + 1}: ${c.hex};`);
    return `:root {\n${lines.join("\n")}\n}`;
  }, [palette]);

  const handleFileSelect = (file: File | null) => {
    setMessage("");
    setPalette([]);

    if (!file) {
      setImage(null);
      return;
    }

    const isSupported =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/webp" ||
      /\.(jpe?g|png|webp)$/i.test(file.name);

    if (!isSupported) {
      setImage(null);
      setMessage(ui.invalidFileError);
      return;
    }

    setImage(file);
  };

  const handleExtract = async () => {
    if (!image || isProcessing) return;
    try {
      setIsProcessing(true);
      setMessage(ui.processingStatus);
      setPalette([]);

      const loaded = await loadImageFromFile(image);
      const result = extractPalette(loaded, count);
      setPalette(result);
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.extractError);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      window.setTimeout(() => setCopiedHex(null), 1500);
    } catch (error) {
      console.error(error);
    }
  };

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(cssVars);
      setCssCopied(true);
      window.setTimeout(() => setCssCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setImage(null);
    setMessage("");
    setIsProcessing(false);
    setCount(6);
    setPalette([]);
    setCopiedHex(null);
    setCssCopied(false);
  };

  return (
    <ToolPageLayout
      title={page.title}
      description={page.description}
      aboutTitle={page.aboutTitle}
      aboutText={page.aboutText}
      stepsTitle={page.stepsTitle}
      steps={page.steps}
      faqTitle={page.faqTitle}
      faqs={page.faqs}
      relatedTools={page.relatedTools}
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

        {previewUrl && (
          <div className="grid gap-4 sm:grid-cols-[200px,1fr] sm:items-center">
            <img
              src={previewUrl}
              alt="selected image preview"
              className="max-h-48 w-full rounded-xl border object-contain"
            />
            <div className="space-y-3">
              <div className="space-y-1">
                <label
                  htmlFor="palette-count"
                  className="text-sm font-medium text-gray-800"
                >
                  {ui.countLabel}
                </label>
                <select
                  id="palette-count"
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value))}
                  className="w-full max-w-[160px] rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                >
                  {[4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton onClick={handleExtract} disabled={!image || isProcessing}>
            {isProcessing ? ui.extractingButton : ui.extractButton}
          </PrimaryButton>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            {ui.resetButton}
          </button>
        </div>

        {palette.length > 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-900">
                {ui.paletteTitle}
              </h3>
              <p className="text-xs text-gray-500">{ui.copyHexHint}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {palette.map((swatch) => (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => copyHex(swatch.hex)}
                    className="overflow-hidden rounded-xl border border-gray-200 text-left transition hover:shadow-md"
                  >
                    <span
                      className="block h-16 w-full"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="block space-y-0.5 px-3 py-2">
                      <span className="block text-sm font-semibold uppercase text-gray-900">
                        {copiedHex === swatch.hex ? ui.copiedLabel : swatch.hex}
                      </span>
                      <span className="block text-xs text-gray-500">
                        rgb({swatch.r}, {swatch.g}, {swatch.b})
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-900">
                  {ui.cssVarsTitle}
                </h3>
                <button
                  type="button"
                  onClick={copyCss}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  {cssCopied ? ui.copiedLabel : ui.copyButton}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-xl border border-gray-200 bg-gray-900 p-4 text-xs leading-6 text-gray-100">
                <code>{cssVars}</code>
              </pre>
            </div>
          </div>
        )}

        {message && <StatusMessage status={message} />}
      </div>
    </ToolPageLayout>
  );
}
