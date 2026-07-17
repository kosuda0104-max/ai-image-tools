"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import {
  decodeCsvText,
  encodeCsvText,
  parseCsv,
  type CsvOutputEncoding,
  type CsvSourceEncoding,
} from "@/src/lib/csv";
import { formatFileSize, getBaseName, getErrorMessage, triggerBlobDownload } from "@/src/lib/image-conversion";

type Props = {
  locale: "ja" | "en";
};

const PREVIEW_ROWS = 5;

const text = {
  ja: {
    title: "CSV文字化け修正ツール",
    description:
      "Shift-JISやUTF-16のCSVを読み取り、Excelで開きやすいUTF-8 BOM付きCSVに変換できます。ブラウザ内で処理するためアップロード不要です。",
    aboutTitle: "CSV文字化け修正ツールとは？",
    aboutText:
      "Excelや他システムから出力したCSVが文字化けするときに、文字コードを読み直してUTF-8 BOM付きCSVとして保存するツールです。日本語のCSVをExcelで開きやすい形に整えられます。",
    emptyTitle: "CSVファイルをドラッグ＆ドロップ、または選択",
    source: "元の文字コード",
    output: "出力形式",
    convert: "文字化けを修正",
    converting: "変換中...",
    download: "修正済みCSVをダウンロード",
    invalid: "エラー: .csv ファイルを選択してください。",
    success: (name: string) => `完了: ${name} をExcelで開きやすいCSVに変換しました。`,
    preview: "プレビュー",
    fileName: "ファイル名",
    fileSize: "サイズ",
    rows: "行数",
    columns: "列数",
    unexpected: "エラー",
  },
  en: {
    title: "Fix CSV Encoding",
    description:
      "Read CSV files encoded as Shift-JIS, UTF-16, or UTF-8 and save them as Excel-friendly UTF-8 CSV with BOM. Everything runs in your browser.",
    aboutTitle: "What is Fix CSV Encoding?",
    aboutText:
      "Use this when a Japanese CSV opens as garbled text in Excel or another spreadsheet app. The tool decodes the source file and exports a clean UTF-8 CSV with BOM, which Excel handles more reliably.",
    emptyTitle: "Drop a CSV file here, or click to select",
    source: "Source encoding",
    output: "Output encoding",
    convert: "Fix Encoding",
    converting: "Converting...",
    download: "Download Fixed CSV",
    invalid: "Error: Please select a .csv file.",
    success: (name: string) => `Done: ${name} has been converted to an Excel-friendly CSV.`,
    preview: "Preview",
    fileName: "File name",
    fileSize: "Size",
    rows: "Rows",
    columns: "Columns",
    unexpected: "Error",
  },
} as const;

const sourceOptions: { value: CsvSourceEncoding; ja: string; en: string }[] = [
  { value: "auto", ja: "自動（BOM優先・通常はUTF-8）", en: "Auto (BOM first, otherwise UTF-8)" },
  { value: "shift_jis", ja: "Shift-JIS（Excel日本語CSV）", en: "Shift-JIS (Japanese Excel CSV)" },
  { value: "utf-8", ja: "UTF-8", en: "UTF-8" },
  { value: "utf-16le", ja: "UTF-16 LE", en: "UTF-16 LE" },
  { value: "utf-16be", ja: "UTF-16 BE", en: "UTF-16 BE" },
];

const outputOptions: { value: CsvOutputEncoding; ja: string; en: string }[] = [
  { value: "utf-8-bom", ja: "UTF-8 BOM付き（Excel向け）", en: "UTF-8 with BOM (Excel-friendly)" },
  { value: "utf-8", ja: "UTF-8 BOMなし", en: "UTF-8 without BOM" },
];

export default function CsvEncodingFixTool({ locale }: Props) {
  const t = text[locale];
  const [file, setFile] = useState<File | null>(null);
  const [sourceEncoding, setSourceEncoding] = useState<CsvSourceEncoding>("auto");
  const [outputEncoding, setOutputEncoding] = useState<CsvOutputEncoding>("utf-8-bom");
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [preview, setPreview] = useState<{ columns: string[]; rows: string[][]; rowCount: number } | null>(null);
  const [fixedBlob, setFixedBlob] = useState<Blob | null>(null);
  const [baseName, setBaseName] = useState("");

  const handleFileSelect = (selected: File | null) => {
    setFile(selected);
    setPreview(null);
    setFixedBlob(null);
    setStatus("");
    if (selected) setBaseName(getBaseName(selected.name));
  };

  const handleConvert = async () => {
    if (!file || isProcessing) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setStatus(t.invalid);
      return;
    }

    try {
      setIsProcessing(true);
      const buffer = await file.arrayBuffer();
      const decoded = decodeCsvText(buffer, sourceEncoding);
      const parsed = parseCsv(decoded);
      const bytes = encodeCsvText(decoded, outputEncoding);
      const blob = new Blob([bytes], { type: "text/csv;charset=utf-8" });

      setPreview({
        columns: parsed.columns,
        rows: parsed.rows.slice(0, PREVIEW_ROWS),
        rowCount: parsed.rows.length,
      });
      setFixedBlob(blob);
      setStatus(t.success(`${baseName}.csv`));
    } catch (error) {
      setStatus(`${t.unexpected}: ${getErrorMessage(error)}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadName = `${baseName || "fixed"}-${outputEncoding === "utf-8-bom" ? "utf8-bom" : "utf8"}.csv`;

  return (
    <ToolPageLayout
      slug="csv-encoding-fix"
      toolCategory="data"
      title={t.title}
      description={t.description}
      aboutTitle={t.aboutTitle}
      aboutText={t.aboutText}
      contentSections={[
        {
          title: locale === "ja" ? "Excelで開きやすいCSVに変換" : "Convert CSV for Excel",
          paragraphs: [
            locale === "ja"
              ? "Shift-JISの日本語CSVやUTF-16のCSVを読み直し、Excelで文字化けしにくいUTF-8 BOM付きCSVとして保存できます。"
              : "Decode Japanese Shift-JIS CSV or UTF-16 CSV and save it as UTF-8 with BOM, a format Excel usually opens more reliably.",
            locale === "ja"
              ? "CSVをExcelで開いたときに「縺」「譁」などの文字が並ぶ場合は、元の文字コードとExcelが想定する文字コードが一致していない可能性があります。元の文字コードを選び直して変換してください。"
              : "Garbled characters usually mean the CSV source encoding does not match the encoding expected by Excel. Select the original encoding, then export a clean UTF-8 CSV.",
          ],
        },
      ]}
      listSections={[
        {
          title: locale === "ja" ? "対応する文字コード" : "Supported encodings",
          items:
            locale === "ja"
              ? [
                  "Shift-JIS（Windowsや日本語版Excelで作られたCSV）",
                  "UTF-8とUTF-8 BOM付きCSV",
                  "UTF-16 LE／UTF-16 BE",
                  "出力はUTF-8 BOM付き、またはBOMなしUTF-8",
                ]
              : [
                  "Shift-JIS CSV from Japanese Windows and Excel workflows",
                  "UTF-8 and UTF-8 CSV with BOM",
                  "UTF-16 LE and UTF-16 BE",
                  "UTF-8 output with or without BOM",
                ],
        },
      ]}
      comparisonTitle={locale === "ja" ? "出力形式の選び方" : "Choosing the output encoding"}
      comparisonItems={
        locale === "ja"
          ? [
              { label: "UTF-8 BOM付き", value: "日本語CSVをExcelで直接開く用途に向いています。" },
              { label: "UTF-8 BOMなし", value: "Webサービス、API、開発ツールへ渡す用途に向いています。" },
            ]
          : [
              { label: "UTF-8 with BOM", value: "Best when the CSV will be opened directly in Excel, especially with Japanese text." },
              { label: "UTF-8 without BOM", value: "Best for web services, APIs, scripts, and developer tools." },
            ]
      }
      stepsTitle={locale === "ja" ? "使い方" : "How to use"}
      steps={
        locale === "ja"
          ? ["CSVファイルを選択します", "元の文字コードを選びます", "出力形式を選びます", "修正済みCSVをダウンロードします"]
          : ["Upload a CSV file", "Choose the source encoding", "Choose the output format", "Download the fixed CSV"]
      }
      faqTitle={locale === "ja" ? "よくある質問" : "FAQ"}
      faqs={[
        {
          question: locale === "ja" ? "Shift-JISから変換できますか？" : "Can it read Shift-JIS?",
          answer: locale === "ja" ? "はい。元の文字コードでShift-JISを選ぶと、日本語CSVを読み直してUTF-8へ変換できます。" : "Yes. Choose Shift-JIS as the source encoding, then export as UTF-8 with BOM.",
        },
        {
          question: locale === "ja" ? "ファイルはアップロードされますか？" : "Is my file uploaded?",
          answer: locale === "ja" ? "いいえ。変換はブラウザ内で完結します。" : "No. The conversion runs locally in your browser.",
        },
        {
          question: locale === "ja" ? "UTF-8 BOM付きにする理由は何ですか？" : "Why export UTF-8 with BOM?",
          answer: locale === "ja" ? "ExcelがUTF-8のCSVだと判定しやすくなり、日本語の文字化けを避けやすいためです。" : "The BOM helps Excel recognize the file as UTF-8, which reduces garbled Japanese text.",
        },
      ]}
      relatedTools={[
        { name: locale === "ja" ? "CSV を JSON に変換" : "CSV to JSON", href: locale === "ja" ? "/tools/csv-to-json" : "/en/tools/csv-to-json" },
        { name: locale === "ja" ? "JSON を CSV に変換" : "JSON to CSV", href: locale === "ja" ? "/tools/json-to-csv" : "/en/tools/json-to-csv" },
      ]}
      relatedToolsTitle={locale === "ja" ? "関連ツール" : "Related tools"}
    >
      <div className="space-y-4">
        <FileDropzone
          file={file}
          accept=".csv,text/csv"
          emptyTitle={t.emptyTitle}
          onFileSelect={handleFileSelect}
        />

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-1 text-sm">
            <span className="font-medium text-gray-900">{t.source}</span>
            <select
              value={sourceEncoding}
              onChange={(event) => setSourceEncoding(event.target.value as CsvSourceEncoding)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            >
              {sourceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {locale === "ja" ? option.ja : option.en}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1 text-sm">
            <span className="font-medium text-gray-900">{t.output}</span>
            <select
              value={outputEncoding}
              onChange={(event) => setOutputEncoding(event.target.value as CsvOutputEncoding)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            >
              {outputOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {locale === "ja" ? option.ja : option.en}
                </option>
              ))}
            </select>
          </label>
        </div>

        {file ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
            <div><span className="font-medium text-gray-900">{t.fileName}:</span> {file.name}</div>
            <div><span className="font-medium text-gray-900">{t.fileSize}:</span> {formatFileSize(file.size)}</div>
            {preview ? (
              <>
                <div><span className="font-medium text-gray-900">{t.rows}:</span> {preview.rowCount.toLocaleString(locale)}</div>
                <div><span className="font-medium text-gray-900">{t.columns}:</span> {preview.columns.length}</div>
              </>
            ) : null}
          </div>
        ) : null}

        {preview && preview.columns.length > 0 ? (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">{t.preview}</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>{preview.columns.map((column) => <th key={column} className="whitespace-nowrap px-3 py-2 text-left font-medium text-gray-700">{column}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {preview.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {preview.columns.map((_, columnIndex) => (
                        <td key={columnIndex} className="max-w-[200px] truncate whitespace-nowrap px-3 py-2 text-gray-600">
                          {row[columnIndex] ?? ""}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        {status ? <StatusMessage status={status} /> : null}

        <div className="flex flex-wrap gap-3">
          {!fixedBlob ? (
            <PrimaryButton onClick={handleConvert} disabled={!file || isProcessing}>
              {isProcessing ? t.converting : t.convert}
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={() => triggerBlobDownload(fixedBlob, downloadName)}>
              {t.download}
            </PrimaryButton>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
