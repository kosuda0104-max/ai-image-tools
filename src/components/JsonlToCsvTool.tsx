"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import { encodeCsvText, rowsToCsv } from "@/src/lib/csv";
import { jsonLinesToTable, parseJsonLines } from "@/src/lib/jsonl";
import { getBaseName, getErrorMessage, triggerBlobDownload } from "@/src/lib/image-conversion";

type Locale = "ja" | "en";
const content = {
  ja: {
    title: "JSONL・NDJSONをCSVに変換",
    description: "1行1JSONのJSONL・NDJSONファイルをCSVへ変換し、ログやAIデータセットをExcelで確認できます。",
    aboutTitle: "JSONLをCSVに変換とは？",
    aboutText: "JSON Lines（JSONL／NDJSON）の各行をCSVの1行へ変換します。ネストしたオブジェクトは user.name のような列名へ展開します。",
    drop: "JSONL・NDJSONファイルを選択",
    convert: "JSONLをCSVに変換",
    download: "CSVをダウンロード",
    invalid: "エラー: .jsonl・.ndjson・.jsonファイルを選択してください。",
    error: "エラー",
    success: (rows: number) => `完了: ${rows.toLocaleString()} 行をCSVへ変換しました。`,
    preview: "プレビュー",
  },
  en: {
    title: "JSONL to CSV Converter",
    description: "Convert line-delimited JSON (JSONL or NDJSON) to CSV for logs, API exports, and AI datasets directly in your browser.",
    aboutTitle: "What is JSONL to CSV Converter?",
    aboutText: "Each JSONL or NDJSON line becomes one CSV row. Nested objects are flattened into columns such as user.name for spreadsheet review.",
    drop: "Choose a JSONL or NDJSON file",
    convert: "Convert JSONL to CSV",
    download: "Download CSV",
    invalid: "Error: Please select a .jsonl, .ndjson, or .json file.",
    error: "Error",
    success: (rows: number) => `Done: ${rows.toLocaleString()} rows were converted to CSV.`,
    preview: "Preview",
  },
} as const;

export default function JsonlToCsvTool({ locale }: { locale: Locale }) {
  const t = content[locale];
  const [file, setFile] = useState<File | null>(null);
  const [table, setTable] = useState<{ columns: string[]; rows: unknown[][] } | null>(null);
  const [result, setResult] = useState<Blob | null>(null);
  const [status, setStatus] = useState("");

  const convert = async () => {
    if (!file) return;
    if (!/\.(jsonl|ndjson|json)$/i.test(file.name)) { setStatus(t.invalid); return; }
    try {
      const values = parseJsonLines(await file.text());
      if (values.length === 0) throw new Error("No JSON lines found.");
      const parsed = jsonLinesToTable(values);
      const bytes = encodeCsvText(rowsToCsv(parsed.columns, parsed.rows), "utf-8-bom");
      setTable(parsed);
      setResult(new Blob([bytes], { type: "text/csv;charset=utf-8" }));
      setStatus(t.success(parsed.rows.length));
    } catch (error) {
      setStatus(`${t.error}: ${getErrorMessage(error)}`);
    }
  };

  return (
    <ToolPageLayout slug="jsonl-to-csv" toolCategory="data" title={t.title} description={t.description} aboutTitle={t.aboutTitle} aboutText={t.aboutText}
      contentSections={[{ title: locale === "ja" ? "ログ・API・AIデータセットを表形式へ" : "Turn logs, APIs, and AI datasets into tables", paragraphs: [locale === "ja" ? "大きなJSON配列に包まず、1行ずつ保存されたJSONを読み取ります。配列や複雑な値はJSON文字列としてセルに保持します。" : "Read one JSON value per line without requiring a surrounding array. Arrays and complex values are preserved as JSON strings inside CSV cells."] }]}
      listSections={[{ title: locale === "ja" ? "対応するデータ" : "Supported data", items: locale === "ja" ? ["JSONL（.jsonl）", "NDJSON（.ndjson）", "1行1オブジェクトのJSON", "ネストしたオブジェクト", "配列・真偽値・数値を含む値"] : ["JSONL (.jsonl)", "NDJSON (.ndjson)", "One JSON object per line", "Nested objects", "Arrays, booleans, and numeric values"] }]}
      comparisonTitle={locale === "ja" ? "JSONとJSONLの違い" : "JSON vs. JSONL"}
      comparisonItems={locale === "ja" ? [{ label: "JSON", value: "配列やオブジェクト全体を1つのJSONとして保存します。" }, { label: "JSONL / NDJSON", value: "改行ごとに独立したJSONを保存し、ログやストリーム処理に向きます。" }] : [{ label: "JSON", value: "Stores one complete array or object as a single JSON document." }, { label: "JSONL / NDJSON", value: "Stores one independent JSON value per line for logs and streaming workflows." }]}
      stepsTitle={locale === "ja" ? "使い方" : "How to use"} steps={locale === "ja" ? ["JSONLファイルを選択します", "変換ボタンを押します", "列と先頭行を確認します", "CSVをダウンロードします"] : ["Choose a JSONL file", "Click convert", "Review columns and sample rows", "Download CSV"]}
      faqTitle={locale === "ja" ? "よくある質問" : "FAQ"} faqs={locale === "ja" ? [
        { question: "NDJSONにも対応していますか？", answer: "はい。JSONLとNDJSONは同じ1行1JSON形式として読み取ります。" },
        { question: "ネストしたJSONはどうなりますか？", answer: "user.nameのようなdot notationの列へ展開します。" },
        { question: "ファイルはアップロードされますか？", answer: "いいえ。ブラウザ内で変換します。" },
      ] : [
        { question: "Does it support NDJSON?", answer: "Yes. JSONL and NDJSON are read as the same one-value-per-line format." },
        { question: "How is nested JSON handled?", answer: "Nested objects become dot-notation columns such as user.name." },
        { question: "Is the file uploaded?", answer: "No. Conversion runs in your browser." },
      ]}
      relatedTools={locale === "ja" ? [{ name: "JSONをCSVに変換", href: "/tools/json-to-csv" }, { name: "JSONをExcelに変換", href: "/tools/json-to-excel" }, { name: "CSV区切り文字変換", href: "/tools/csv-delimiter-converter" }] : [{ name: "JSON to CSV", href: "/en/tools/json-to-csv" }, { name: "JSON to Excel", href: "/en/tools/json-to-excel" }, { name: "CSV Delimiter Converter", href: "/en/tools/csv-delimiter-converter" }]}
    >
      <div className="space-y-5">
        <FileDropzone file={file} accept=".jsonl,.ndjson,.json,application/json,application/x-ndjson" emptyTitle={t.drop} onFileSelect={(selected) => { setFile(selected); setTable(null); setResult(null); setStatus(""); }} />
        {table ? <div className="space-y-2"><h2 className="text-sm font-medium">{t.preview}</h2><div className="overflow-x-auto rounded-lg border"><table className="min-w-full text-xs"><thead className="bg-gray-50"><tr>{table.columns.map((column) => <th key={column} className="whitespace-nowrap px-3 py-2 text-left">{column}</th>)}</tr></thead><tbody>{table.rows.slice(0, 5).map((row, rowIndex) => <tr key={rowIndex}>{table.columns.map((_, columnIndex) => <td key={columnIndex} className="max-w-[220px] truncate whitespace-nowrap px-3 py-2">{String(row[columnIndex] ?? "")}</td>)}</tr>)}</tbody></table></div></div> : null}
        {status ? <StatusMessage status={status} /> : null}
        {result ? <PrimaryButton onClick={() => triggerBlobDownload(result, `${getBaseName(file?.name || "data")}.csv`)}>{t.download}</PrimaryButton> : <PrimaryButton onClick={convert} disabled={!file}>{t.convert}</PrimaryButton>}
      </div>
    </ToolPageLayout>
  );
}
