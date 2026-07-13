"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import {
  decodeCsvText,
  detectCsvDelimiter,
  encodeCsvText,
  parseDelimitedText,
  rowsToDelimited,
  type CsvDelimiter,
  type CsvSourceEncoding,
} from "@/src/lib/csv";
import { getBaseName, getErrorMessage, triggerBlobDownload } from "@/src/lib/image-conversion";

type Locale = "ja" | "en";
type SourceChoice = "auto" | CsvDelimiter;
const delimiterOptions: { value: CsvDelimiter; ja: string; en: string }[] = [
  { value: ",", ja: "カンマ (,)", en: "Comma (,)" },
  { value: ";", ja: "セミコロン (;)", en: "Semicolon (;)" },
  { value: "\t", ja: "タブ (TSV)", en: "Tab (TSV)" },
  { value: "|", ja: "パイプ (|)", en: "Pipe (|)" },
];

const text = {
  ja: { title: "CSV区切り文字変換・整形", description: "カンマ・セミコロン・タブ・パイプ区切りを自動判定し、別の区切り形式へ変換できます。", aboutTitle: "CSV区切り文字変換とは？", aboutText: "Excelや海外システムから出力されたセミコロンCSV、TSV、パイプ区切りデータを、利用先に合う区切り形式へ整えます。", drop: "CSV・TSVファイルを選択", source: "元の区切り文字", auto: "自動判定", output: "出力の区切り文字", encoding: "元の文字コード", convert: "区切り文字を変換", download: "変換済みファイルをダウンロード", invalid: "エラー: CSV・TSV・TXTファイルを選択してください。", error: "エラー", success: (label: string) => `完了: ${label}区切りとして読み取り、変換しました。`, preview: "プレビュー" },
  en: { title: "CSV Delimiter Converter", description: "Detect and convert comma, semicolon, tab, and pipe-delimited files directly in your browser.", aboutTitle: "What is CSV Delimiter Converter?", aboutText: "Normalize semicolon CSV, TSV, and pipe-delimited exports from Excel, regional systems, and data tools into the delimiter required by your destination.", drop: "Choose a CSV, TSV, or TXT file", source: "Source delimiter", auto: "Auto detect", output: "Output delimiter", encoding: "Source encoding", convert: "Convert Delimiter", download: "Download Converted File", invalid: "Error: Please select a CSV, TSV, or TXT file.", error: "Error", success: (label: string) => `Done: Detected ${label} delimiter and converted the file.`, preview: "Preview" },
} as const;

export default function CsvDelimiterConverterTool({ locale }: { locale: Locale }) {
  const t = text[locale];
  const [file, setFile] = useState<File | null>(null);
  const [source, setSource] = useState<SourceChoice>("auto");
  const [output, setOutput] = useState<CsvDelimiter>(",");
  const [encoding, setEncoding] = useState<CsvSourceEncoding>("auto");
  const [preview, setPreview] = useState<{ columns: string[]; rows: string[][] } | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [detected, setDetected] = useState<CsvDelimiter | null>(null);
  const [status, setStatus] = useState("");

  const handleConvert = async () => {
    if (!file) return;
    if (!/\.(csv|tsv|txt)$/i.test(file.name)) { setStatus(t.invalid); return; }
    try {
      const decoded = decodeCsvText(await file.arrayBuffer(), encoding);
      const actual = source === "auto" ? detectCsvDelimiter(decoded) : source;
      const parsed = parseDelimitedText(decoded, actual);
      if (parsed.columns.length === 0) throw new Error("No rows found.");
      const converted = rowsToDelimited(parsed.columns, parsed.rows, output);
      const bytes = encodeCsvText(converted, "utf-8-bom");
      setDetected(actual);
      setPreview({ columns: parsed.columns, rows: parsed.rows.slice(0, 5) });
      setResult(new Blob([bytes], { type: "text/csv;charset=utf-8" }));
      const label = delimiterOptions.find((item) => item.value === actual)?.[locale] || actual;
      setStatus(t.success(label));
    } catch (error) {
      setStatus(`${t.error}: ${getErrorMessage(error)}`);
    }
  };

  const outputExtension = output === "\t" ? "tsv" : output === "|" ? "txt" : "csv";

  return (
    <ToolPageLayout slug="csv-delimiter-converter" toolCategory="data" title={t.title} description={t.description} aboutTitle={t.aboutTitle} aboutText={t.aboutText}
      contentSections={[{ title: locale === "ja" ? "セミコロンCSVやTSVを通常のCSVへ" : "Convert semicolon CSV and TSV to standard CSV", paragraphs: [locale === "ja" ? "区切り文字を自動判定し、引用符で囲まれた値やセル内改行を保ちながら変換します。出力はExcelで開きやすいUTF-8 BOM付きです。" : "The converter detects the delimiter and preserves quoted values and line breaks. Output uses UTF-8 with BOM for reliable Excel compatibility."] }]}
      listSections={[{ title: locale === "ja" ? "対応形式" : "Supported formats", items: locale === "ja" ? ["カンマ区切りCSV", "セミコロン区切りCSV", "タブ区切りTSV", "パイプ区切りテキスト", "UTF-8・Shift-JIS・UTF-16入力"] : ["Comma-separated CSV", "Semicolon-separated CSV", "Tab-separated TSV", "Pipe-delimited text", "UTF-8, Shift-JIS, and UTF-16 input"] }]}
      stepsTitle={locale === "ja" ? "使い方" : "How to use"} steps={locale === "ja" ? ["ファイルを選択します", "元の区切り文字を自動判定または指定します", "出力区切り文字を選びます", "変換してダウンロードします"] : ["Choose a file", "Detect or select its delimiter", "Choose the output delimiter", "Convert and download"]}
      faqTitle={locale === "ja" ? "よくある質問" : "FAQ"} faqs={locale === "ja" ? [
        { question: "CSVが1列にまとまる問題を直せますか？", answer: "元ファイルがセミコロンやタブ区切りの場合、カンマ区切りへ変換すると直せます。" },
        { question: "Shift-JISも読めますか？", answer: "はい。元の文字コードからShift-JISを選択できます。" },
        { question: "ファイルはアップロードされますか？", answer: "いいえ。処理はブラウザ内で完結します。" },
      ] : [
        { question: "Can this fix a CSV opening in one column?", answer: "Yes. If the source uses semicolons or tabs, convert it to commas for applications that expect standard CSV." },
        { question: "Can it read Shift-JIS?", answer: "Yes. Select Shift-JIS as the source encoding." },
        { question: "Is the file uploaded?", answer: "No. Conversion stays in your browser." },
      ]}
      relatedTools={locale === "ja" ? [{ name: "CSV文字化け修正", href: "/tools/csv-encoding-fix" }, { name: "CSVをJSONに変換", href: "/tools/csv-to-json" }, { name: "JSONLをCSVに変換", href: "/tools/jsonl-to-csv" }] : [{ name: "Fix CSV Encoding", href: "/en/tools/csv-encoding-fix" }, { name: "CSV to JSON", href: "/en/tools/csv-to-json" }, { name: "JSONL to CSV", href: "/en/tools/jsonl-to-csv" }]}
    >
      <div className="space-y-5">
        <FileDropzone file={file} accept=".csv,.tsv,.txt,text/csv,text/tab-separated-values" emptyTitle={t.drop} onFileSelect={(selected) => { setFile(selected); setPreview(null); setResult(null); setStatus(""); }} />
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="space-y-1 text-sm"><span className="font-medium">{t.source}</span><select aria-label={t.source} value={source} onChange={(event) => { setSource(event.target.value as SourceChoice); setResult(null); }} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2"><option value="auto">{t.auto}</option>{delimiterOptions.map((item) => <option key={item.value} value={item.value}>{item[locale]}</option>)}</select></label>
          <label className="space-y-1 text-sm"><span className="font-medium">{t.output}</span><select aria-label={t.output} value={output} onChange={(event) => { setOutput(event.target.value as CsvDelimiter); setResult(null); }} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2">{delimiterOptions.map((item) => <option key={item.value} value={item.value}>{item[locale]}</option>)}</select></label>
          <label className="space-y-1 text-sm"><span className="font-medium">{t.encoding}</span><select aria-label={t.encoding} value={encoding} onChange={(event) => { setEncoding(event.target.value as CsvSourceEncoding); setResult(null); }} className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2"><option value="auto">Auto / UTF-8</option><option value="shift_jis">Shift-JIS</option><option value="utf-8">UTF-8</option><option value="utf-16le">UTF-16 LE</option><option value="utf-16be">UTF-16 BE</option></select></label>
        </div>
        {preview ? <div className="space-y-2"><h2 className="text-sm font-medium">{t.preview}</h2><div className="overflow-x-auto rounded-lg border"><table className="min-w-full text-xs"><thead className="bg-gray-50"><tr>{preview.columns.map((column, index) => <th key={`${column}-${index}`} className="px-3 py-2 text-left">{column}</th>)}</tr></thead><tbody>{preview.rows.map((row, rowIndex) => <tr key={rowIndex}>{preview.columns.map((_, columnIndex) => <td key={columnIndex} className="px-3 py-2">{row[columnIndex] || ""}</td>)}</tr>)}</tbody></table></div></div> : null}
        {detected ? <p className="text-xs text-gray-500">{t.source}: {delimiterOptions.find((item) => item.value === detected)?.[locale]}</p> : null}
        {status ? <StatusMessage status={status} /> : null}
        {result ? <PrimaryButton onClick={() => triggerBlobDownload(result, `${getBaseName(file?.name || "converted")}.${outputExtension}`)}>{t.download}</PrimaryButton> : <PrimaryButton onClick={handleConvert} disabled={!file}>{t.convert}</PrimaryButton>}
      </div>
    </ToolPageLayout>
  );
}
