"use client";

import { useEffect, useRef, useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import {
  hexToRgb,
  removeBackgroundColor,
  rgbToHex,
} from "@/src/lib/background-transparency";
import {
  getBaseName,
  getErrorMessage,
  triggerBlobDownload,
} from "@/src/lib/image-conversion";

type Locale = "ja" | "en";

const copy = {
  ja: {
    title: "画像の背景を透明化",
    description:
      "JPG・PNG・WebP画像の単色背景を選び、透明PNGに変換できます。画像端からつながる背景だけを消せるブラウザ完結ツールです。",
    aboutTitle: "画像の背景を透明化するツールとは？",
    aboutText:
      "白背景の商品画像、ロゴ、スクリーンショットなどから単色背景を取り除き、透明部分を持つPNGとして保存します。背景色は画像をクリックして選べます。",
    drop: "JPG・PNG・WebP画像を選択",
    source: "元画像（消したい背景色をクリック）",
    result: "透明化結果",
    color: "背景色",
    tolerance: "色の許容値",
    connected: "画像端からつながっている同系色だけを透明化",
    convert: "背景を透明化",
    download: "透明PNGをダウンロード",
    loading: "画像を読み込んでいます...",
    invalid: "エラー: JPG・PNG・WebP画像を選択してください。",
    error: "エラー",
    success: (count: number) => `完了: ${count.toLocaleString()} ピクセルを透明化しました。`,
  },
  en: {
    title: "Make Image Background Transparent",
    description:
      "Remove a solid background from JPG, PNG, or WebP images and download a transparent PNG. Connected-edge mode helps preserve matching colors inside the subject.",
    aboutTitle: "What is Make Image Background Transparent?",
    aboutText:
      "Use this tool for product photos, logos, and screenshots with a solid background. Click the background color in the image, adjust tolerance, and export a transparent PNG.",
    drop: "Choose a JPG, PNG, or WebP image",
    source: "Source image (click the background color)",
    result: "Transparent result",
    color: "Background color",
    tolerance: "Color tolerance",
    connected: "Only remove matching colors connected to the image edges",
    convert: "Make Background Transparent",
    download: "Download Transparent PNG",
    loading: "Loading image...",
    invalid: "Error: Please select a JPG, PNG, or WebP image.",
    error: "Error",
    success: (count: number) => `Done: ${count.toLocaleString()} pixels were made transparent.`,
  },
} as const;

function isSupportedImage(file: File) {
  return (
    ["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
    /\.(jpe?g|png|webp)$/i.test(file.name)
  );
}

export default function ImageBackgroundTransparentTool({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [targetColor, setTargetColor] = useState("#ffffff");
  const [tolerance, setTolerance] = useState(32);
  const [connectedOnly, setConnectedOnly] = useState(true);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      const canvas = sourceCanvasRef.current;
      const context = canvas?.getContext("2d", { willReadFrequently: true });
      if (!canvas || !context) return;

      canvas.width = image.naturalWidth || image.width;
      canvas.height = image.naturalHeight || image.height;
      context.drawImage(image, 0, 0);
      const pixel = context.getImageData(0, 0, 1, 1).data;
      setTargetColor(rgbToHex({ red: pixel[0], green: pixel[1], blue: pixel[2] }));
      setDimensions({ width: canvas.width, height: canvas.height });
      setStatus("");
    };
    image.onerror = () => setStatus(`${t.error}: ${t.invalid.replace(/^Error: |^エラー: /, "")}`);
    image.src = objectUrl;

    return () => URL.revokeObjectURL(objectUrl);
  }, [file, t.error, t.invalid]);

  const handleFileSelect = (selected: File | null) => {
    setResultBlob(null);
    setDimensions(null);
    if (selected && !isSupportedImage(selected)) {
      setFile(null);
      setStatus(t.invalid);
      return;
    }
    setFile(selected);
    setStatus(selected ? t.loading : "");
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = sourceCanvasRef.current;
    const context = canvas?.getContext("2d", { willReadFrequently: true });
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.min(canvas.width - 1, Math.max(0, Math.floor((event.clientX - rect.left) * canvas.width / rect.width)));
    const y = Math.min(canvas.height - 1, Math.max(0, Math.floor((event.clientY - rect.top) * canvas.height / rect.height)));
    const pixel = context.getImageData(x, y, 1, 1).data;
    setTargetColor(rgbToHex({ red: pixel[0], green: pixel[1], blue: pixel[2] }));
    setResultBlob(null);
  };

  const handleConvert = () => {
    const source = sourceCanvasRef.current;
    const result = resultCanvasRef.current;
    const sourceContext = source?.getContext("2d", { willReadFrequently: true });
    const resultContext = result?.getContext("2d");
    if (!source || !result || !sourceContext || !resultContext) return;

    try {
      const imageData = sourceContext.getImageData(0, 0, source.width, source.height);
      const converted = removeBackgroundColor({
        data: imageData.data,
        width: source.width,
        height: source.height,
        target: hexToRgb(targetColor),
        tolerance,
        connectedOnly,
      });
      result.width = source.width;
      result.height = source.height;
      const output = resultContext.createImageData(source.width, source.height);
      output.data.set(converted.data);
      resultContext.putImageData(output, 0, 0);
      result.toBlob((blob) => {
        if (!blob) {
          setStatus(`${t.error}: PNG encoding failed.`);
          return;
        }
        setResultBlob(blob);
        setStatus(t.success(converted.transparentPixels));
      }, "image/png");
    } catch (error) {
      setStatus(`${t.error}: ${getErrorMessage(error)}`);
    }
  };

  return (
    <ToolPageLayout
      slug="image-background-transparent"
      toolCategory="image"
      title={t.title}
      description={t.description}
      aboutTitle={t.aboutTitle}
      aboutText={t.aboutText}
      contentSections={[{
        title: locale === "ja" ? "白背景や単色背景を透明PNGに" : "Turn a solid background into transparent PNG",
        paragraphs: [locale === "ja"
          ? "画像端からつながる背景だけを対象にできるため、被写体やロゴ内部に同じ色があっても残しやすくなります。背景全体を消したい場合は設定をオフにできます。"
          : "Connected-edge mode removes matching background pixels from the outside inward, helping preserve the same color when it appears inside a logo or subject."],
      }]}
      listSections={[{
        title: locale === "ja" ? "向いている画像" : "Best suited for",
        items: locale === "ja"
          ? ["白背景の商品写真", "単色背景のロゴやアイコン", "資料用スクリーンショット", "JPGから透明PNGを作りたい画像"]
          : ["Product photos on white", "Logos and icons on solid colors", "Screenshots for documents", "JPG images that need transparent PNG output"],
      }]}
      stepsTitle={locale === "ja" ? "使い方" : "How to use"}
      steps={locale === "ja"
        ? ["画像を選択します", "消したい背景色を画像上でクリックします", "色の許容値を調整します", "背景を透明化してPNGをダウンロードします"]
        : ["Choose an image", "Click the background color in the image", "Adjust color tolerance", "Remove the background and download PNG"]}
      faqTitle={locale === "ja" ? "よくある質問" : "FAQ"}
      faqs={locale === "ja" ? [
        { question: "JPGを透過できますか？", answer: "はい。JPGの背景色を取り除き、透明部分を保持できるPNGとして保存します。" },
        { question: "AI背景削除ですか？", answer: "いいえ。選択した単色に近い背景を正確に取り除く方式です。ロゴや商品画像に向いています。" },
        { question: "画像はアップロードされますか？", answer: "いいえ。処理はブラウザ内で完結します。" },
      ] : [
        { question: "Can JPG have transparency?", answer: "JPG itself cannot store transparency, so this tool removes the background and exports a transparent PNG." },
        { question: "Is this AI background removal?", answer: "No. It precisely removes colors close to the one you select, which works well for logos and solid backgrounds." },
        { question: "Is the image uploaded?", answer: "No. Processing stays in your browser." },
      ]}
      relatedTools={locale === "ja" ? [
        { name: "PNGをWebPに変換", href: "/tools/png-to-webp" },
        { name: "画像切り抜き", href: "/tools/crop-image" },
        { name: "画像を圧縮", href: "/tools/image-compress" },
      ] : [
        { name: "PNG to WebP", href: "/en/tools/png-to-webp" },
        { name: "Crop Image", href: "/en/tools/crop-image" },
        { name: "Compress Image", href: "/en/tools/image-compress" },
      ]}
    >
      <div className="space-y-5">
        <FileDropzone file={file} accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" emptyTitle={t.drop} onFileSelect={handleFileSelect} />
        <canvas
          ref={sourceCanvasRef}
          onClick={handleCanvasClick}
          className={`${file ? "block" : "hidden"} max-h-[420px] max-w-full cursor-crosshair rounded-lg border border-gray-200 bg-gray-100 object-contain`}
          aria-label={t.source}
        />
        {dimensions ? <p className="text-xs text-gray-500">{dimensions.width} x {dimensions.height}px</p> : null}
        {file ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-gray-900">
              <span>{t.color}</span>
              <input aria-label={t.color} type="color" value={targetColor} onChange={(event) => { setTargetColor(event.target.value); setResultBlob(null); }} className="h-11 w-full rounded-lg border border-gray-200 bg-white p-1" />
            </label>
            <label className="space-y-2 text-sm font-medium text-gray-900">
              <span>{t.tolerance}: {tolerance}</span>
              <input aria-label={t.tolerance} type="range" min="0" max="128" value={tolerance} onChange={(event) => { setTolerance(Number(event.target.value)); setResultBlob(null); }} className="w-full" />
            </label>
          </div>
        ) : null}
        {file ? (
          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input type="checkbox" checked={connectedOnly} onChange={(event) => { setConnectedOnly(event.target.checked); setResultBlob(null); }} className="mt-1" />
            <span>{t.connected}</span>
          </label>
        ) : null}
        <canvas ref={resultCanvasRef} className={`${resultBlob ? "block" : "hidden"} max-h-[420px] max-w-full rounded-lg border border-gray-200 bg-gray-100 object-contain`} aria-label={t.result} />
        {status ? <StatusMessage status={status} /> : null}
        {file && dimensions ? (
          resultBlob ? <PrimaryButton onClick={() => triggerBlobDownload(resultBlob, `${getBaseName(file.name)}-transparent.png`)}>{t.download}</PrimaryButton>
            : <PrimaryButton onClick={handleConvert}>{t.convert}</PrimaryButton>
        ) : null}
      </div>
    </ToolPageLayout>
  );
}
