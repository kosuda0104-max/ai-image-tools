"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ToolPageLayout from "@/components/ToolPageLayout";
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
  titleLabel: string;
  titlePlaceholder: string;
  subtitleLabel: string;
  subtitlePlaceholder: string;
  sizeLabel: string;
  bgColorLabel: string;
  textColorLabel: string;
  accentColorLabel: string;
  alignLabel: string;
  alignLeft: string;
  alignCenter: string;
  logoLabel: string;
  logoSelect: string;
  logoRemove: string;
  themeLabel: string;
  previewTitle: string;
  downloadButton: string;
  resetButton: string;
  invalidLogoError: string;
  successMessage: string;
  downloadError: string;
};

type ToolContent = {
  page: PageContent;
  ui: UIContent;
};

type Props = {
  locale: Locale;
};

type SizeOption = { key: string; label: string; width: number; height: number };

const SIZES: SizeOption[] = [
  { key: "ogp", label: "OGP 1200×630", width: 1200, height: 630 },
  { key: "twitter", label: "X/Twitter 1200×675", width: 1200, height: 675 },
  { key: "square", label: "Square 1080×1080", width: 1080, height: 1080 },
];

type Theme = {
  key: string;
  label: string;
  bg: string;
  text: string;
  accent: string;
};

const THEMES: Theme[] = [
  { key: "ink", label: "Ink", bg: "#0f172a", text: "#ffffff", accent: "#38bdf8" },
  { key: "paper", label: "Paper", bg: "#ffffff", text: "#0f172a", accent: "#2563eb" },
  { key: "violet", label: "Violet", bg: "#4c1d95", text: "#ffffff", accent: "#f0abfc" },
  { key: "forest", label: "Forest", bg: "#064e3b", text: "#ecfdf5", accent: "#34d399" },
  { key: "sunset", label: "Sunset", bg: "#7c2d12", text: "#fff7ed", accent: "#fb923c" },
];

const FONT_STACK =
  "'Hiragino Sans', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', 'Yu Gothic', Meiryo, system-ui, -apple-system, 'Segoe UI', sans-serif";

const content: Record<Locale, ToolContent> = {
  ja: {
    page: {
      title: "OGP画像メーカー",
      description:
        "ブログ・Qiita・Zenn・個人開発サービス向けのOGP画像（1200×630）を、タイトルと色を入れるだけでブラウザ上で作成できる無料ツールです。ロゴの配置にも対応、アップロード不要です。",
      aboutTitle: "OGP画像メーカーとは？",
      aboutText:
        "OGP画像は、記事やサービスのURLをSNSでシェアしたときに表示されるサムネイル画像です。専用のデザインツールがなくても、このメーカーならタイトル・サブタイトル・背景色・ロゴを入力するだけで、1200×630のOGP画像をその場で生成できます。テーマ配色のプリセットや文字色・アクセント色の調整、ロゴ画像の配置にも対応。すべてブラウザ内で描画するため、入力した内容や画像が外部サーバーへ送信されることはありません。ブログ、Qiita、Zenn、個人開発サービスの紹介ページなどにそのまま使えます。",
      stepsTitle: "使い方",
      steps: [
        "タイトルとサブタイトルを入力します",
        "テーマ配色を選ぶか、背景色・文字色・アクセント色を調整します",
        "必要に応じてロゴ画像を追加します",
        "プレビューで仕上がりを確認します",
        "PNG画像としてダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "入力した内容はアップロードされますか？",
          answer:
            "いいえ。テキストもロゴ画像もすべてブラウザ内で処理・描画されるため、外部サーバーには送信されません。",
        },
        {
          question: "出力サイズは変更できますか？",
          answer:
            "OGP標準の1200×630のほか、X/Twitter向けの1200×675、正方形の1080×1080から選べます。",
        },
        {
          question: "日本語のタイトルも使えますか？",
          answer:
            "はい。日本語を含むタイトル・サブタイトルに対応し、長い場合は自動で折り返します。",
        },
        {
          question: "ロゴは透過PNGでも使えますか？",
          answer:
            "はい。透過PNGのロゴをそのまま配置できます。背景色の上に自然に重なります。",
        },
      ],
      relatedTools: [
        { name: "SNS画像リサイズ", href: "/tools/social-image-resize" },
        { name: "画像リサイズ", href: "/tools/resize-image" },
        { name: "favicon.ico 作成", href: "/tools/favicon-generator" },
        { name: "画像圧縮", href: "/tools/image-compress" },
      ],
    },
    ui: {
      titleLabel: "タイトル",
      titlePlaceholder: "記事やサービスのタイトル",
      subtitleLabel: "サブタイトル",
      subtitlePlaceholder: "補足・著者名・サイト名など",
      sizeLabel: "画像サイズ",
      bgColorLabel: "背景色",
      textColorLabel: "文字色",
      accentColorLabel: "アクセント色",
      alignLabel: "文字位置",
      alignLeft: "左寄せ",
      alignCenter: "中央",
      logoLabel: "ロゴ画像（任意）",
      logoSelect: "ロゴを選択",
      logoRemove: "ロゴを削除",
      themeLabel: "テーマ配色",
      previewTitle: "プレビュー",
      downloadButton: "PNG をダウンロード",
      resetButton: "リセット",
      invalidLogoError: "エラー: 画像ファイル（PNG / JPG / WebP）を選択してください。",
      successMessage: "完了: OGP画像をダウンロードしました。",
      downloadError: "エラー: 画像の生成に失敗しました。",
    },
  },
  en: {
    page: {
      title: "OGP Image Maker",
      description:
        "Create OGP images (1200×630) for blogs, Qiita, Zenn, and indie projects just by entering a title and colors, right in your browser. Supports logo placement and requires no upload.",
      aboutTitle: "What is the OGP Image Maker?",
      aboutText:
        "An OGP image is the thumbnail shown when a URL is shared on social media. Without a dedicated design tool, this maker lets you generate a 1200×630 OGP image instantly by entering a title, subtitle, background color, and logo. It includes color theme presets, adjustable text and accent colors, and optional logo placement. Everything is rendered in your browser, so your text and images are never sent to a server. It is great for blogs, Qiita, Zenn, and indie project landing pages.",
      stepsTitle: "How to Use",
      steps: [
        "Enter a title and subtitle",
        "Pick a color theme or adjust background, text, and accent colors",
        "Add a logo image if you want one",
        "Check the result in the preview",
        "Download it as a PNG image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Is my input uploaded to a server?",
          answer:
            "No. Both the text and the logo image are processed and rendered entirely in your browser, so nothing is sent to an external server.",
        },
        {
          question: "Can I change the output size?",
          answer:
            "Yes. You can choose the standard OGP 1200×630, X/Twitter 1200×675, or a square 1080×1080.",
        },
        {
          question: "Does it support Japanese titles?",
          answer:
            "Yes. Titles and subtitles with Japanese text are supported and wrap automatically when long.",
        },
        {
          question: "Can I use a transparent PNG logo?",
          answer:
            "Yes. Transparent PNG logos are placed as-is and blend naturally over the background color.",
        },
      ],
      relatedTools: [
        { name: "Social Media Image Resizer", href: "/en/tools/social-image-resize" },
        { name: "Resize Image", href: "/en/tools/resize-image" },
        { name: "Favicon Generator", href: "/en/tools/favicon-generator" },
        { name: "Image Compress", href: "/en/tools/image-compress" },
      ],
    },
    ui: {
      titleLabel: "Title",
      titlePlaceholder: "Article or service title",
      subtitleLabel: "Subtitle",
      subtitlePlaceholder: "Author, site name, or a short note",
      sizeLabel: "Image Size",
      bgColorLabel: "Background",
      textColorLabel: "Text",
      accentColorLabel: "Accent",
      alignLabel: "Text Align",
      alignLeft: "Left",
      alignCenter: "Center",
      logoLabel: "Logo (optional)",
      logoSelect: "Choose Logo",
      logoRemove: "Remove Logo",
      themeLabel: "Color Theme",
      previewTitle: "Preview",
      downloadButton: "Download PNG",
      resetButton: "Reset",
      invalidLogoError: "Error: Please select an image file (PNG / JPG / WebP).",
      successMessage: "Done: OGP image downloaded.",
      downloadError: "Error: Failed to generate the image.",
    },
  },
};

type Align = "left" | "center";

// Word-aware text wrapper with character-level fallback for long CJK runs.
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const lines: string[] = [];

  for (const paragraph of text.split("\n")) {
    if (paragraph === "") {
      lines.push("");
      continue;
    }

    let line = "";
    const words = paragraph.split(/(\s+)/); // keep whitespace tokens

    const breakLongToken = (token: string) => {
      for (const ch of token) {
        if (line !== "" && ctx.measureText(line + ch).width > maxWidth) {
          lines.push(line);
          line = ch;
        } else {
          line += ch;
        }
      }
    };

    for (const word of words) {
      if (word === "") continue;
      if (ctx.measureText(line + word).width <= maxWidth) {
        line += word;
      } else if (word.trim() === "") {
        // overflowing whitespace: drop it
      } else if (ctx.measureText(word).width > maxWidth) {
        if (line.trim() !== "") {
          lines.push(line.replace(/\s+$/, ""));
          line = "";
        }
        breakLongToken(word);
      } else {
        if (line.trim() !== "") lines.push(line.replace(/\s+$/, ""));
        line = word;
      }
    }

    if (line.trim() !== "") lines.push(line.replace(/\s+$/, ""));
  }

  return lines;
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

export default function OgpImageMakerTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const defaultTitle =
    locale === "ja" ? "記事のタイトルをここに" : "Your Headline Goes Here";
  const defaultSubtitle =
    locale === "ja" ? "Filewisp / example.com" : "Filewisp / example.com";

  const [titleText, setTitleText] = useState(defaultTitle);
  const [subtitleText, setSubtitleText] = useState(defaultSubtitle);
  const [sizeKey, setSizeKey] = useState(SIZES[0].key);
  const [bgColor, setBgColor] = useState(THEMES[0].bg);
  const [textColor, setTextColor] = useState(THEMES[0].text);
  const [accentColor, setAccentColor] = useState(THEMES[0].accent);
  const [align, setAlign] = useState<Align>("left");
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [message, setMessage] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const size = useMemo(
    () => SIZES.find((s) => s.key === sizeKey) ?? SIZES[0],
    [sizeKey]
  );

  const applyTheme = (theme: Theme) => {
    setBgColor(theme.bg);
    setTextColor(theme.text);
    setAccentColor(theme.accent);
  };

  const handleLogoSelect = async (file: File | null) => {
    setMessage("");
    if (!file) {
      setLogo(null);
      return;
    }
    const ok =
      /^image\//.test(file.type) || /\.(png|jpe?g|webp|svg)$/i.test(file.name);
    if (!ok) {
      setMessage(ui.invalidLogoError);
      return;
    }
    try {
      const img = await loadImageFromFile(file);
      setLogo(img);
    } catch (error) {
      console.error(error);
      setMessage(ui.invalidLogoError);
    }
  };

  // Draw the OGP image to the canvas whenever inputs change.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width: W, height: H } = size;
    canvas.width = W;
    canvas.height = H;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);

    const margin = Math.round(W * 0.07);

    // Accent bar on the left edge.
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 0, Math.max(8, Math.round(W * 0.012)), H);

    const contentWidth = W - margin * 2;
    const isCenter = align === "center";
    ctx.textAlign = isCenter ? "center" : "left";
    const x = isCenter ? W / 2 : margin;

    // Title — size scales down as the text gets longer.
    const baseTitleSize = Math.round(H * 0.11);
    const titleSize =
      titleText.length > 60
        ? Math.round(baseTitleSize * 0.7)
        : titleText.length > 36
          ? Math.round(baseTitleSize * 0.85)
          : baseTitleSize;
    ctx.font = `700 ${titleSize}px ${FONT_STACK}`;
    ctx.fillStyle = textColor;
    const titleLines = wrapText(ctx, titleText || " ", contentWidth).slice(0, 4);
    const titleLineHeight = Math.round(titleSize * 1.25);

    const subtitleSize = Math.round(H * 0.045);
    const subtitleLineHeight = Math.round(subtitleSize * 1.35);
    let subtitleLines: string[] = [];
    if (subtitleText.trim() !== "") {
      ctx.font = `500 ${subtitleSize}px ${FONT_STACK}`;
      subtitleLines = wrapText(ctx, subtitleText, contentWidth).slice(0, 2);
    }

    const logoSpace = logo ? Math.round(H * 0.13) : 0;
    const blockHeight =
      titleLines.length * titleLineHeight +
      (subtitleLines.length > 0
        ? Math.round(titleSize * 0.5) + subtitleLines.length * subtitleLineHeight
        : 0);

    let cursorY = Math.max(
      margin + logoSpace,
      (H - blockHeight - logoSpace) / 2 + logoSpace
    );

    // Logo above the text block.
    if (logo) {
      const logoH = Math.round(H * 0.11);
      const logoW = Math.round((logo.width / logo.height) * logoH);
      const logoX = isCenter ? Math.round(W / 2 - logoW / 2) : margin;
      const logoY = Math.round(cursorY - logoSpace);
      ctx.drawImage(logo, logoX, Math.max(margin, logoY), logoW, logoH);
    }

    // Title lines.
    ctx.font = `700 ${titleSize}px ${FONT_STACK}`;
    ctx.fillStyle = textColor;
    ctx.textBaseline = "top";
    for (const line of titleLines) {
      ctx.fillText(line, x, cursorY);
      cursorY += titleLineHeight;
    }

    // Subtitle lines.
    if (subtitleLines.length > 0) {
      cursorY += Math.round(titleSize * 0.4);
      ctx.font = `500 ${subtitleSize}px ${FONT_STACK}`;
      ctx.fillStyle = accentColor;
      for (const line of subtitleLines) {
        ctx.fillText(line, x, cursorY);
        cursorY += subtitleLineHeight;
      }
    }
  }, [titleText, subtitleText, size, bgColor, textColor, accentColor, align, logo]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob((blob) => {
        if (!blob) {
          setMessage(ui.downloadError);
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `ogp-${size.width}x${size.height}.png`;
        link.click();
        URL.revokeObjectURL(url);
        setMessage(ui.successMessage);
      }, "image/png");
    } catch (error) {
      console.error(error);
      setMessage(ui.downloadError);
    }
  };

  const handleReset = () => {
    setTitleText(defaultTitle);
    setSubtitleText(defaultSubtitle);
    setSizeKey(SIZES[0].key);
    applyTheme(THEMES[0]);
    setAlign("left");
    setLogo(null);
    setMessage("");
  };

  const colorField = (
    id: string,
    label: string,
    value: string,
    onChange: (v: string) => void
  ) => (
    <div className="space-y-1">
      <label htmlFor={id} className="text-xs font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-12 cursor-pointer rounded border border-gray-300"
        />
        <span className="text-xs text-gray-500">{value}</span>
      </div>
    </div>
  );

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
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="ogp-title"
                className="text-sm font-medium text-gray-800"
              >
                {ui.titleLabel}
              </label>
              <textarea
                id="ogp-title"
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
                placeholder={ui.titlePlaceholder}
                rows={2}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="ogp-subtitle"
                className="text-sm font-medium text-gray-800"
              >
                {ui.subtitleLabel}
              </label>
              <input
                id="ogp-subtitle"
                type="text"
                value={subtitleText}
                onChange={(e) => setSubtitleText(e.target.value)}
                placeholder={ui.subtitlePlaceholder}
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
              />
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-800">
                {ui.themeLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {THEMES.map((theme) => (
                  <button
                    key={theme.key}
                    type="button"
                    onClick={() => applyTheme(theme)}
                    className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:border-blue-300"
                  >
                    <span
                      className="inline-block h-4 w-4 rounded-full border border-black/10"
                      style={{ backgroundColor: theme.bg }}
                    />
                    {theme.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {colorField("ogp-bg", ui.bgColorLabel, bgColor, setBgColor)}
              {colorField("ogp-text", ui.textColorLabel, textColor, setTextColor)}
              {colorField(
                "ogp-accent",
                ui.accentColorLabel,
                accentColor,
                setAccentColor
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label
                  htmlFor="ogp-size"
                  className="text-xs font-medium text-gray-700"
                >
                  {ui.sizeLabel}
                </label>
                <select
                  id="ogp-size"
                  value={sizeKey}
                  onChange={(e) => setSizeKey(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-gray-500"
                >
                  {SIZES.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-medium text-gray-700">
                  {ui.alignLabel}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setAlign("left")}
                    className={`flex-1 rounded-xl border px-3 py-2 text-sm transition ${
                      align === "left"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:border-blue-300"
                    }`}
                  >
                    {ui.alignLeft}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlign("center")}
                    className={`flex-1 rounded-xl border px-3 py-2 text-sm transition ${
                      align === "center"
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:border-blue-300"
                    }`}
                  >
                    {ui.alignCenter}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-medium text-gray-700">
                {ui.logoLabel}
              </span>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                  {ui.logoSelect}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/svg+xml"
                    className="hidden"
                    onChange={(e) => {
                      void handleLogoSelect(e.target.files?.[0] ?? null);
                      e.target.value = "";
                    }}
                  />
                </label>
                {logo && (
                  <button
                    type="button"
                    onClick={() => setLogo(null)}
                    className="text-sm text-gray-500 underline underline-offset-2 hover:text-gray-800"
                  >
                    {ui.logoRemove}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-900">
              {ui.previewTitle}
            </h3>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <canvas
                ref={canvasRef}
                className="h-auto w-full"
                style={{ aspectRatio: `${size.width} / ${size.height}` }}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryButton onClick={handleDownload}>
                {ui.downloadButton}
              </PrimaryButton>
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
        </div>
      </div>
    </ToolPageLayout>
  );
}
