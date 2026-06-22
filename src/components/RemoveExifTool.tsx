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
  selectedImageTitle: string;
  fileNameLabel: string;
  fileTypeLabel: string;
  fileSizeLabel: string;
  detectedTitle: string;
  exifLabel: string;
  gpsLabel: string;
  xmpLabel: string;
  presentLabel: string;
  absentLabel: string;
  notApplicableLabel: string;
  losslessNote: string;
  reencodeNote: string;
  previewBeforeLabel: string;
  previewAfterLabel: string;
  previewPlaceholder: string;
  originalSizeLabel: string;
  cleanedSizeLabel: string;
  removeButton: string;
  removingButton: string;
  downloadButton: string;
  resetButton: string;
  unknownType: string;
  invalidFileError: string;
  processingStatus: string;
  successMessage: string;
  removeError: string;
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
      title: "画像のEXIF・位置情報削除ツール",
      description:
        "写真や画像に埋め込まれたEXIF（撮影日時・カメラ情報）やGPS位置情報をブラウザ上で削除できる無料ツールです。アップロード不要で、JPEGは画質を落とさず安全にメタデータだけを除去します。",
      aboutTitle: "EXIF・位置情報削除ツールとは？",
      aboutText:
        "スマホやデジカメで撮影した写真には、撮影日時・カメラの機種・そしてGPSによる撮影場所（位置情報）などのEXIFメタデータが埋め込まれています。SNSやフリマ、ブログにそのまま投稿すると、自宅や勤務先などの位置が特定される恐れがあります。このツールは、画像をサーバーへ送らずブラウザ内だけで処理し、EXIF・GPS・XMPなどの個人情報を削除します。JPEGは再圧縮せずメタデータ領域だけを取り除くため、画質はまったく劣化しません。",
      stepsTitle: "使い方",
      steps: [
        "画像ファイル（JPG / PNG / WebP）を選択します",
        "検出されたEXIF・位置情報・XMPの有無を確認します",
        "「メタデータを削除」ボタンを押します",
        "処理後のファイルサイズと結果を確認します",
        "クリーンな画像をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "画像はサーバーにアップロードされますか？",
          answer:
            "いいえ。すべてブラウザ内で処理されるため、画像が外部サーバーに送信されることはありません。位置情報を含む写真も安全に処理できます。",
        },
        {
          question: "画質は劣化しますか？",
          answer:
            "JPEGの場合は再圧縮を行わず、メタデータ領域だけを取り除くため画質は一切劣化しません。PNG・WebPは再エンコードしますが、PNGは可逆のため見た目は変わりません。",
        },
        {
          question: "GPSの位置情報も削除できますか？",
          answer:
            "はい。EXIF内のGPS位置情報を含むメタデータをまとめて削除します。SNSやフリマ投稿前のプライバシー対策に使えます。",
        },
        {
          question: "削除されたことはどう確認できますか？",
          answer:
            "処理後の画像を再度このツールに読み込むと、EXIF・位置情報が「なし」と表示されます。ファイルサイズもメタデータの分だけ小さくなります。",
        },
      ],
      relatedTools: [
        { name: "画像圧縮", href: "/tools/image-compress" },
        { name: "画像リサイズ", href: "/tools/resize-image" },
        { name: "画像に透かしを追加", href: "/tools/watermark-image" },
        { name: "HEIC を JPG に変換", href: "/tools/heic-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "画像をドラッグ＆ドロップ、または選択",
      emptyDescription: "JPG / PNG / WebP のEXIF・位置情報を削除します。",
      selectButtonLabel: "画像を選択",
      dropHereLabel: "ここにファイルをドロップ",
      clickToSelectLabel: "またはクリックして選択",
      selectedFileLabel: "選択中のファイル",
      selectedImageTitle: "選択中の画像",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      detectedTitle: "検出されたメタデータ",
      exifLabel: "EXIF（撮影情報）",
      gpsLabel: "GPS位置情報",
      xmpLabel: "XMP",
      presentLabel: "あり",
      absentLabel: "なし",
      notApplicableLabel: "—",
      losslessNote: "JPEGは再圧縮せず、画質を保ったままメタデータだけを削除します。",
      reencodeNote: "PNG・WebPは再エンコードして全メタデータを削除します（PNGは可逆）。",
      previewBeforeLabel: "削除前プレビュー",
      previewAfterLabel: "削除後プレビュー",
      previewPlaceholder: "削除後のプレビューはここに表示されます。",
      originalSizeLabel: "元のサイズ",
      cleanedSizeLabel: "削除後サイズ",
      removeButton: "メタデータを削除",
      removingButton: "削除中...",
      downloadButton: "クリーンな画像をダウンロード",
      resetButton: "リセット",
      unknownType: "不明",
      invalidFileError:
        "エラー: JPG / PNG / WebP ファイルを選択してください。",
      processingStatus: "メタデータを削除中です...",
      successMessage: "完了: EXIF・位置情報などのメタデータを削除しました。",
      removeError: "エラー: メタデータの削除に失敗しました。",
    },
  },
  en: {
    page: {
      title: "Remove EXIF & GPS Metadata from Images",
      description:
        "Remove EXIF metadata and GPS location data embedded in your photos directly in your browser. No upload required, and JPEG files are cleaned losslessly without re-compression.",
      aboutTitle: "What is the Remove EXIF Tool?",
      aboutText:
        "Photos taken with phones and cameras carry EXIF metadata such as the capture date, camera model, and GPS location of where the photo was taken. Posting these images to social media, marketplaces, or blogs can reveal where you live or work. This tool processes images entirely in your browser without uploading them, removing EXIF, GPS, XMP, and other personal metadata. For JPEG files it strips only the metadata segments without re-compressing, so image quality is fully preserved.",
      stepsTitle: "How to Use",
      steps: [
        "Select an image file (JPG / PNG / WebP)",
        "Check the detected EXIF, GPS, and XMP metadata",
        "Click the Remove Metadata button",
        "Review the cleaned file size and result",
        "Download the cleaned image",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Are my images uploaded to a server?",
          answer:
            "No. Everything is processed locally in your browser, so your images are never sent to an external server. Even photos containing location data stay on your device.",
        },
        {
          question: "Does it reduce image quality?",
          answer:
            "For JPEG, the tool removes only the metadata segments without re-compressing, so there is no quality loss. PNG and WebP are re-encoded, but PNG is lossless so it looks identical.",
        },
        {
          question: "Does it remove GPS location data?",
          answer:
            "Yes. It removes GPS location data along with the rest of the EXIF metadata, which is useful for protecting privacy before posting online.",
        },
        {
          question: "How can I confirm the metadata was removed?",
          answer:
            "Load the processed image back into this tool and EXIF and GPS will show as absent. The file size also shrinks by the amount of removed metadata.",
        },
      ],
      relatedTools: [
        { name: "Image Compress", href: "/en/tools/image-compress" },
        { name: "Resize Image", href: "/en/tools/resize-image" },
        { name: "Watermark Image", href: "/en/tools/watermark-image" },
        { name: "HEIC to JPG", href: "/en/tools/heic-to-jpg" },
      ],
    },
    ui: {
      emptyTitle: "Drag and drop an image here, or select a file",
      emptyDescription: "Remove EXIF and GPS data from JPG, PNG, and WebP images.",
      selectButtonLabel: "Choose Image",
      dropHereLabel: "Drop file here",
      clickToSelectLabel: "or click to browse",
      selectedFileLabel: "Selected File",
      selectedImageTitle: "Selected Image",
      fileNameLabel: "File Name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      detectedTitle: "Detected Metadata",
      exifLabel: "EXIF (camera info)",
      gpsLabel: "GPS location",
      xmpLabel: "XMP",
      presentLabel: "Present",
      absentLabel: "None",
      notApplicableLabel: "—",
      losslessNote:
        "JPEG is cleaned losslessly: metadata is removed without re-compression.",
      reencodeNote:
        "PNG and WebP are re-encoded to strip all metadata (PNG stays lossless).",
      previewBeforeLabel: "Before",
      previewAfterLabel: "After",
      previewPlaceholder: "The cleaned preview will appear here.",
      originalSizeLabel: "Original Size",
      cleanedSizeLabel: "Cleaned Size",
      removeButton: "Remove Metadata",
      removingButton: "Removing...",
      downloadButton: "Download Cleaned Image",
      resetButton: "Reset",
      unknownType: "Unknown",
      invalidFileError: "Error: Please select a JPG, PNG, or WebP file.",
      processingStatus: "Removing metadata...",
      successMessage: "Done: EXIF, GPS, and other metadata were removed.",
      removeError: "Error: Failed to remove metadata.",
    },
  },
};

type MetadataReport = {
  hasExif: boolean;
  hasGps: boolean;
  hasXmp: boolean;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function isJpeg(bytes: Uint8Array) {
  return bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8;
}

// Scan the JPEG TIFF/EXIF block (starting at tiffStart) for the GPS IFD pointer
// tag (0x8825) inside IFD0. Bounded and defensive against malformed input.
function tiffHasGps(bytes: Uint8Array, tiffStart: number) {
  if (tiffStart + 8 > bytes.length) return false;

  const little = bytes[tiffStart] === 0x49 && bytes[tiffStart + 1] === 0x49;
  const big = bytes[tiffStart] === 0x4d && bytes[tiffStart + 1] === 0x4d;
  if (!little && !big) return false;

  const u16 = (o: number) =>
    little ? bytes[o] | (bytes[o + 1] << 8) : (bytes[o] << 8) | bytes[o + 1];
  const u32 = (o: number) =>
    little
      ? bytes[o] +
        bytes[o + 1] * 0x100 +
        bytes[o + 2] * 0x10000 +
        bytes[o + 3] * 0x1000000
      : bytes[o] * 0x1000000 +
        bytes[o + 1] * 0x10000 +
        bytes[o + 2] * 0x100 +
        bytes[o + 3];

  const ifd0Offset = u32(tiffStart + 4);
  let p = tiffStart + ifd0Offset;
  if (p + 2 > bytes.length) return false;

  const count = u16(p);
  p += 2;

  for (let e = 0; e < count; e++) {
    const entry = p + e * 12;
    if (entry + 12 > bytes.length) break;
    if (u16(entry) === 0x8825) return true; // GPS Info IFD pointer
  }

  return false;
}

// Inspect a JPEG's APP1 segments to report which metadata is present.
function analyzeJpegMetadata(bytes: Uint8Array): MetadataReport {
  const report: MetadataReport = { hasExif: false, hasGps: false, hasXmp: false };
  if (!isJpeg(bytes)) return report;

  let i = 2;
  while (i + 4 <= bytes.length) {
    if (bytes[i] !== 0xff) break;
    const marker = bytes[i + 1];
    if (marker === 0xda || marker === 0xd9) break; // SOS / EOI
    if ((marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
      i += 2;
      continue;
    }
    const len = (bytes[i + 2] << 8) | bytes[i + 3];
    if (len < 2) break;
    const segStart = i + 4;

    if (marker === 0xe1) {
      const isExif =
        bytes[segStart] === 0x45 &&
        bytes[segStart + 1] === 0x78 &&
        bytes[segStart + 2] === 0x69 &&
        bytes[segStart + 3] === 0x66; // "Exif"
      if (isExif) {
        report.hasExif = true;
        report.hasGps = report.hasGps || tiffHasGps(bytes, segStart + 6);
      } else {
        report.hasXmp = true; // APP1 without Exif header is typically XMP
      }
    }

    i += 2 + len;
  }

  return report;
}

// Lossless metadata removal for JPEG: rebuild the file dropping APP1 (Exif/XMP),
// APP13 (Photoshop/IPTC), and COM (comments) segments. Image data is untouched.
function stripJpegMetadata(bytes: Uint8Array): Uint8Array | null {
  if (!isJpeg(bytes)) return null;

  const DROP = new Set([0xe1, 0xed, 0xfe]); // APP1, APP13, COM
  const out = new Uint8Array(bytes.length);
  let w = 0;
  out[w++] = 0xff;
  out[w++] = 0xd8;
  let i = 2;

  while (i + 1 < bytes.length) {
    if (bytes[i] !== 0xff) {
      out.set(bytes.subarray(i), w);
      w += bytes.length - i;
      break;
    }

    const marker = bytes[i + 1];

    if (marker === 0xff) {
      out[w++] = 0xff; // fill byte
      i += 1;
      continue;
    }

    if (marker === 0xda) {
      // Start of Scan: copy the rest of the file verbatim.
      out.set(bytes.subarray(i), w);
      w += bytes.length - i;
      break;
    }

    // Standalone markers without a length field.
    if ((marker >= 0xd0 && marker <= 0xd9) || marker === 0x01) {
      out[w++] = 0xff;
      out[w++] = marker;
      i += 2;
      continue;
    }

    if (i + 3 >= bytes.length) {
      out.set(bytes.subarray(i), w);
      w += bytes.length - i;
      break;
    }

    const len = (bytes[i + 2] << 8) | bytes[i + 3];
    const segEnd = i + 2 + len;

    if (DROP.has(marker)) {
      i = segEnd;
      continue;
    }

    const realEnd = Math.min(segEnd, bytes.length);
    out.set(bytes.subarray(i, realEnd), w);
    w += realEnd - i;
    i = segEnd;
  }

  return out.slice(0, w);
}

function getExtensionFromType(type: string, name: string) {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot + 1) : "img";
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
  quality?: number
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

export default function RemoveExifTool({ locale }: Props) {
  const { page, ui } = content[locale];

  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [report, setReport] = useState<MetadataReport | null>(null);
  const [reportApplies, setReportApplies] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState("");

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
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const fileInfo = useMemo(() => {
    if (!image) return null;
    return {
      name: image.name,
      type: image.type || ui.unknownType,
      size: formatFileSize(image.size),
    };
  }, [image, ui.unknownType]);

  const resetResult = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl("");
    setResultBlob(null);
  };

  const handleFileSelect = async (file: File | null) => {
    setMessage("");
    resetResult();
    setReport(null);
    setReportApplies(false);

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

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      if (isJpeg(bytes)) {
        setReport(analyzeJpegMetadata(bytes));
        setReportApplies(true);
      } else {
        setReport(null);
        setReportApplies(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async () => {
    if (!image || isProcessing) return;

    try {
      setIsProcessing(true);
      setMessage(ui.processingStatus);
      resetResult();

      const bytes = new Uint8Array(await image.arrayBuffer());
      let blob: Blob;

      const stripped = stripJpegMetadata(bytes);
      if (stripped) {
        blob = new Blob([stripped.slice().buffer], { type: "image/jpeg" });
      } else {
        // Non-JPEG: re-encode via canvas, which drops all metadata.
        const loaded = await loadImageFromFile(image);
        const canvas = document.createElement("canvas");
        canvas.width = loaded.naturalWidth || loaded.width;
        canvas.height = loaded.naturalHeight || loaded.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Failed to initialize canvas");
        ctx.drawImage(loaded, 0, 0);

        const targetType =
          image.type === "image/webp" ? "image/webp" : "image/png";
        blob = await canvasToBlob(
          canvas,
          targetType,
          targetType === "image/png" ? undefined : 0.95
        );
      }

      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
      setMessage(ui.successMessage);
    } catch (error) {
      console.error(error);
      setMessage(ui.removeError);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultBlob || !image || !resultUrl) return;
    const extension = getExtensionFromType(resultBlob.type, image.name);
    const dotIndex = image.name.lastIndexOf(".");
    const baseName =
      dotIndex >= 0 ? image.name.slice(0, dotIndex) : image.name;

    const link = document.createElement("a");
    link.href = resultUrl;
    link.download = `${baseName}-noexif.${extension}`;
    link.click();
  };

  const handleReset = () => {
    setImage(null);
    setMessage("");
    setIsProcessing(false);
    setReport(null);
    setReportApplies(false);
    resetResult();
  };

  const isJpegSelected = (image?.type ?? "") === "image/jpeg" ||
    /\.jpe?g$/i.test(image?.name ?? "");

  const renderBadge = (present: boolean) => (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        present
          ? "bg-amber-100 text-amber-700"
          : "bg-green-100 text-green-700"
      }`}
    >
      {present ? ui.presentLabel : ui.absentLabel}
    </span>
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
        <FileDropzone
          file={image}
          accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
          emptyTitle={ui.emptyTitle}
          emptyDescription={ui.emptyDescription}
          selectButtonLabel={ui.selectButtonLabel}
          dropHereLabel={ui.dropHereLabel}
          clickToSelectLabel={ui.clickToSelectLabel}
          selectedFileLabel={ui.selectedFileLabel}
          onFileSelect={(file) => {
            void handleFileSelect(file);
          }}
        />

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
              <h3 className="text-sm font-semibold text-gray-900">
                {ui.detectedTitle}
              </h3>
              <div className="grid gap-2 text-sm text-gray-700 sm:grid-cols-3">
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2">
                  <span>{ui.exifLabel}</span>
                  {reportApplies && report
                    ? renderBadge(report.hasExif)
                    : <span className="text-gray-400">{ui.notApplicableLabel}</span>}
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2">
                  <span>{ui.gpsLabel}</span>
                  {reportApplies && report
                    ? renderBadge(report.hasGps)
                    : <span className="text-gray-400">{ui.notApplicableLabel}</span>}
                </div>
                <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2">
                  <span>{ui.xmpLabel}</span>
                  {reportApplies && report
                    ? renderBadge(report.hasXmp)
                    : <span className="text-gray-400">{ui.notApplicableLabel}</span>}
                </div>
              </div>
              <p className="text-xs leading-5 text-gray-500">
                {isJpegSelected ? ui.losslessNote : ui.reencodeNote}
              </p>
            </div>
          </div>
        )}

        {previewUrl && (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm text-gray-600">{ui.previewBeforeLabel}</div>
              <img
                src={previewUrl}
                alt="before metadata removal preview"
                className="max-h-80 w-full rounded border object-contain"
              />
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-600">{ui.previewAfterLabel}</div>
              {resultUrl ? (
                <img
                  src={resultUrl}
                  alt="after metadata removal preview"
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

        {resultBlob && image && (
          <div className="space-y-2 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
            <p>
              <span className="font-medium text-gray-800">
                {ui.originalSizeLabel}:
              </span>{" "}
              {formatFileSize(image.size)}
            </p>
            <p>
              <span className="font-medium text-gray-800">
                {ui.cleanedSizeLabel}:
              </span>{" "}
              {formatFileSize(resultBlob.size)}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton onClick={handleRemove} disabled={!image || isProcessing}>
            {isProcessing ? ui.removingButton : ui.removeButton}
          </PrimaryButton>

          {resultBlob && (
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
  );
}
