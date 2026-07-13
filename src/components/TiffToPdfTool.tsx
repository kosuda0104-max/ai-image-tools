"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import { formatFileSize, getBaseName, getErrorMessage, triggerBlobDownload } from "@/src/lib/image-conversion";
import { decodeTiffPages, tiffPageToPngBlob } from "@/src/lib/tiff-decode";

type Locale = "ja" | "en";
const text = {
  ja: { title: "複数ページTIFFをPDFに変換", description: "マルチページTIFF・TIFの全ページを順番どおり1つのPDFへ変換できます。スキャンやFAX画像をブラウザだけでPDF化します。", aboutTitle: "複数ページTIFFをPDFに変換とは？", aboutText: "複数のページを内部に持つTIFFを読み取り、各画像をPDFの1ページとしてまとめます。単一ページTIFFにも対応します。", drop: "TIFF・TIFファイルを選択", convert: "TIFFをPDFに変換", converting: "PDFを作成中...", download: "PDFをダウンロード", invalid: "エラー: TIFF・TIFファイルを選択してください。", error: "エラー", success: (pages: number) => `完了: ${pages}ページのPDFを作成しました。`, pageCount: "ページ数" },
  en: { title: "Multi-page TIFF to PDF Converter", description: "Convert every page in a multi-page TIFF or TIF file into one ordered PDF directly in your browser.", aboutTitle: "What is Multi-page TIFF to PDF Converter?", aboutText: "Read all images stored inside a TIFF and place each one on its own PDF page. Single-page TIFF files are supported too.", drop: "Choose a TIFF or TIF file", convert: "Convert TIFF to PDF", converting: "Creating PDF...", download: "Download PDF", invalid: "Error: Please select a TIFF or TIF file.", error: "Error", success: (pages: number) => `Done: Created a PDF with ${pages} page${pages === 1 ? "" : "s"}.`, pageCount: "Pages" },
} as const;

export default function TiffToPdfTool({ locale }: { locale: Locale }) {
  const t = text[locale];
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [pages, setPages] = useState(0);
  const [status, setStatus] = useState("");
  const [processing, setProcessing] = useState(false);

  const convert = async () => {
    if (!file || processing) return;
    if (!/\.tiff?$/i.test(file.name)) { setStatus(t.invalid); return; }
    try {
      setProcessing(true);
      const decodedPages = await decodeTiffPages(file);
      const pdf = await PDFDocument.create();
      for (const decoded of decodedPages) {
        const pngBlob = await tiffPageToPngBlob(decoded);
        const embedded = await pdf.embedPng(await pngBlob.arrayBuffer());
        const scale = Math.min(1, 14400 / Math.max(decoded.width, decoded.height));
        const width = decoded.width * scale;
        const height = decoded.height * scale;
        const page = pdf.addPage([width, height]);
        page.drawImage(embedded, { x: 0, y: 0, width, height });
      }
      const bytes = await pdf.save();
      setResult(new Blob([new Uint8Array(bytes).buffer], { type: "application/pdf" }));
      setPages(decodedPages.length);
      setStatus(t.success(decodedPages.length));
    } catch (error) {
      setStatus(`${t.error}: ${getErrorMessage(error)}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout slug="tiff-to-pdf" toolCategory="pdf" title={t.title} description={t.description} aboutTitle={t.aboutTitle} aboutText={t.aboutText}
      contentSections={[{ title: locale === "ja" ? "スキャン・FAXのマルチページTIFFを保持" : "Preserve every scanned or faxed TIFF page", paragraphs: [locale === "ja" ? "一般的な画像変換では先頭ページだけになることがありますが、このツールはTIFF内の全ページを読み取り、元の順番でPDFへ収録します。" : "Some image converters only export the first TIFF frame. This tool reads every page and preserves the original order in the PDF."] }]}
      listSections={[{ title: locale === "ja" ? "利用場面" : "Common uses", items: locale === "ja" ? ["複合機でスキャンしたTIFF", "FAX受信したマルチページTIFF", "文書管理システムのTIF", "単一ページTIFFのPDF化"] : ["Multi-page scanner output", "Fax TIFF documents", "TIF files from document systems", "Single-page TIFF conversion"] }]}
      stepsTitle={locale === "ja" ? "使い方" : "How to use"} steps={locale === "ja" ? ["TIFFファイルを選択します", "変換ボタンを押します", "全ページの処理を待ちます", "PDFをダウンロードします"] : ["Choose a TIFF file", "Click convert", "Wait while every page is processed", "Download the PDF"]}
      faqTitle={locale === "ja" ? "よくある質問" : "FAQ"} faqs={locale === "ja" ? [
        { question: "複数ページをすべて変換できますか？", answer: "はい。TIFF内の各ページをPDFの1ページとして順番どおり収録します。" },
        { question: "TIF拡張子にも対応していますか？", answer: "はい。.tifと.tiffの両方に対応します。" },
        { question: "ファイルはアップロードされますか？", answer: "いいえ。デコードとPDF作成はブラウザ内で行います。" },
      ] : [
        { question: "Will every TIFF page be converted?", answer: "Yes. Each TIFF image becomes one PDF page in the original order." },
        { question: "Does it support .tif?", answer: "Yes. Both .tif and .tiff extensions are supported." },
        { question: "Is the file uploaded?", answer: "No. TIFF decoding and PDF creation happen in your browser." },
      ]}
      relatedTools={locale === "ja" ? [{ name: "TIFFをPNGに変換", href: "/tools/tiff-to-png" }, { name: "TIFFをJPGに変換", href: "/tools/tiff-to-jpg" }, { name: "PDFを結合", href: "/tools/merge-pdf" }] : [{ name: "TIFF to PNG", href: "/en/tools/tiff-to-png" }, { name: "TIFF to JPG", href: "/en/tools/tiff-to-jpg" }, { name: "Merge PDF", href: "/en/tools/merge-pdf" }]}
    >
      <div className="space-y-5">
        <FileDropzone file={file} accept="image/tiff,.tif,.tiff" emptyTitle={t.drop} onFileSelect={(selected) => { setFile(selected); setResult(null); setPages(0); setStatus(""); }} />
        {file ? <p className="text-sm text-gray-600">{file.name} · {formatFileSize(file.size)}</p> : null}
        {pages > 0 ? <p className="text-sm font-medium text-gray-900">{t.pageCount}: {pages}</p> : null}
        {status ? <StatusMessage status={status} /> : null}
        {result ? <PrimaryButton onClick={() => triggerBlobDownload(result, `${getBaseName(file?.name || "document")}.pdf`)}>{t.download}</PrimaryButton> : <PrimaryButton onClick={convert} disabled={!file || processing}>{processing ? t.converting : t.convert}</PrimaryButton>}
      </div>
    </ToolPageLayout>
  );
}
