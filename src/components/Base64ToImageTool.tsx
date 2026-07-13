"use client";

import { useEffect, useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import { formatFileSize, getErrorMessage, triggerBlobDownload } from "@/src/lib/image-conversion";

type Props = {
  locale: "ja" | "en";
};

type DecodedImage = {
  blob: Blob;
  mime: string;
  extension: string;
  url: string;
};

const labels = {
  ja: {
    title: "Base64 を画像に変換",
    description:
      "Base64文字列やdata URLをPNG・JPG・WebPなどの画像ファイルに戻せる無料ツールです。処理はブラウザ内で完結します。",
    aboutTitle: "Base64 を画像に戻すとは？",
    aboutText:
      "HTML、CSS、JSON、APIレスポンスに埋め込まれたBase64画像を、通常の画像ファイルとして保存したいときに使えます。data:image/png;base64,... のようなdata URLにも、Base64部分だけの文字列にも対応します。",
    inputLabel: "Base64 または data URL",
    placeholder: "data:image/png;base64,iVBORw0KGgo... または Base64 文字列を貼り付け",
    convert: "画像に変換",
    reset: "リセット",
    download: "画像をダウンロード",
    invalid: "エラー: 画像として読み取れるBase64文字列を入力してください。",
    success: "完了: 画像に変換しました。",
    preview: "プレビュー",
    mime: "形式",
    size: "サイズ",
  },
  en: {
    title: "Base64 to Image Converter",
    description:
      "Convert Base64 strings or data URLs back into PNG, JPG, WebP, GIF, or SVG image files in your browser.",
    aboutTitle: "What is Base64 to Image?",
    aboutText:
      "Use this when an image is embedded in HTML, CSS, JSON, or an API response and you need to save it as a normal image file. It supports full data URLs and raw Base64 image strings.",
    inputLabel: "Base64 or data URL",
    placeholder: "Paste data:image/png;base64,iVBORw0KGgo... or a raw Base64 string",
    convert: "Convert to Image",
    reset: "Reset",
    download: "Download Image",
    invalid: "Error: Enter a Base64 string that can be decoded as an image.",
    success: "Done: Image decoded successfully.",
    preview: "Preview",
    mime: "Format",
    size: "Size",
  },
} as const;

function detectImage(bytes: Uint8Array, mimeHint?: string) {
  if (mimeHint?.startsWith("image/")) {
    return mimeToExtension(mimeHint);
  }

  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { mime: "image/png", extension: "png" };
  }

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: "image/jpeg", extension: "jpg" };
  }

  if (
    bytes[0] === 0x47 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46
  ) {
    return { mime: "image/gif", extension: "gif" };
  }

  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return { mime: "image/webp", extension: "webp" };
  }

  const textStart = new TextDecoder().decode(bytes.slice(0, 200)).trimStart();
  if (textStart.startsWith("<svg") || textStart.startsWith("<?xml")) {
    return { mime: "image/svg+xml", extension: "svg" };
  }

  return null;
}

function mimeToExtension(mime: string) {
  if (mime === "image/jpeg") return { mime, extension: "jpg" };
  if (mime === "image/svg+xml") return { mime, extension: "svg" };
  const subtype = mime.split("/")[1]?.split("+")[0] || "png";
  return { mime, extension: subtype };
}

function decodeBase64Image(input: string): DecodedImage {
  const trimmed = input.trim();
  const dataUrlMatch = trimmed.match(/^data:([^;,]+)?(;base64)?,([\s\S]+)$/i);
  const mimeHint = dataUrlMatch?.[1];
  const encoded = (dataUrlMatch ? dataUrlMatch[3] : trimmed)
    .replace(/\s/g, "")
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  const detected = detectImage(bytes, mimeHint);
  if (!detected) {
    throw new Error("Unsupported image data.");
  }

  const blob = new Blob([bytes], { type: detected.mime });
  return {
    blob,
    mime: detected.mime,
    extension: detected.extension,
    url: URL.createObjectURL(blob),
  };
}

export default function Base64ToImageTool({ locale }: Props) {
  const t = labels[locale];
  const [input, setInput] = useState("");
  const [status, setStatus] = useState("");
  const [decoded, setDecoded] = useState<DecodedImage | null>(null);

  useEffect(() => {
    return () => {
      if (decoded) URL.revokeObjectURL(decoded.url);
    };
  }, [decoded]);

  const resetDecoded = () => {
    if (decoded) URL.revokeObjectURL(decoded.url);
    setDecoded(null);
  };

  const handleConvert = () => {
    try {
      resetDecoded();
      const result = decodeBase64Image(input);
      setDecoded(result);
      setStatus(t.success);
    } catch (error) {
      setStatus(`${t.invalid} ${getErrorMessage(error)}`);
    }
  };

  const handleReset = () => {
    resetDecoded();
    setInput("");
    setStatus("");
  };

  return (
    <ToolPageLayout
      slug="base64-to-image"
      title={t.title}
      description={t.description}
      aboutTitle={t.aboutTitle}
      aboutText={t.aboutText}
      contentSections={[
        {
          title: locale === "ja" ? "対応する入力" : "Supported input",
          paragraphs: [
            locale === "ja"
              ? "data URL全体でも、カンマ以降のBase64部分だけでも変換できます。PNG、JPG、WebP、GIF、SVGなど、画像として判定できる形式を保存できます。"
              : "Paste a full data URL or only the Base64 payload after the comma. The tool detects common image types such as PNG, JPG, WebP, GIF, and SVG.",
          ],
        },
      ]}
      stepsTitle={locale === "ja" ? "使い方" : "How to use"}
      steps={
        locale === "ja"
          ? ["Base64文字列を貼り付けます", "画像に変換します", "プレビューを確認します", "画像ファイルをダウンロードします"]
          : ["Paste a Base64 string", "Convert it to an image", "Check the preview", "Download the image file"]
      }
      faqTitle={locale === "ja" ? "よくある質問" : "FAQ"}
      faqs={[
        {
          question: locale === "ja" ? "ファイルはアップロードされますか？" : "Is the file uploaded?",
          answer: locale === "ja" ? "いいえ。変換はブラウザ内で行われます。" : "No. The decoding runs locally in your browser.",
        },
        {
          question: locale === "ja" ? "data URLにも対応していますか？" : "Does it support data URLs?",
          answer: locale === "ja" ? "はい。data:image/png;base64,... の形式をそのまま貼り付けられます。" : "Yes. You can paste a full data:image/...;base64,... URL.",
        },
      ]}
      relatedTools={[
        { name: locale === "ja" ? "画像を Base64 に変換" : "Image to Base64", href: locale === "ja" ? "/tools/image-to-base64" : "/en/tools/image-to-base64" },
        { name: locale === "ja" ? "PNG を WebP に変換" : "PNG to WebP", href: locale === "ja" ? "/tools/png-to-webp" : "/en/tools/png-to-webp" },
      ]}
      relatedToolsTitle={locale === "ja" ? "関連ツール" : "Related tools"}
    >
      <div className="space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-gray-900">{t.inputLabel}</span>
          <textarea
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setStatus("");
              resetDecoded();
            }}
            placeholder={t.placeholder}
            rows={7}
            className="w-full rounded-xl border border-gray-200 bg-white p-3 font-mono text-xs text-gray-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          />
        </label>

        {status ? <StatusMessage status={status} /> : null}

        {decoded ? (
          <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
            <div className="grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
              <div><span className="font-medium text-gray-900">{t.mime}:</span> {decoded.mime}</div>
              <div><span className="font-medium text-gray-900">{t.size}:</span> {formatFileSize(decoded.blob.size)}</div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-900">{t.preview}</p>
              <img src={decoded.url} alt={t.preview} className="max-h-64 rounded-xl border bg-white object-contain" />
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton onClick={handleConvert} disabled={!input.trim()}>
            {t.convert}
          </PrimaryButton>
          {decoded ? (
            <PrimaryButton onClick={() => triggerBlobDownload(decoded.blob, `decoded-image.${decoded.extension}`)}>
              {t.download}
            </PrimaryButton>
          ) : null}
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:text-gray-900"
          >
            {t.reset}
          </button>
        </div>
      </div>
    </ToolPageLayout>
  );
}
