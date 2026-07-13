"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import { formatFileSize, getErrorMessage } from "@/src/lib/image-conversion";
import {
  flattenParquetSchema,
  formatParquetCell,
  getParquetCompressionCodecs,
  type ParquetSchemaRow,
} from "@/src/lib/parquet-inspector";

type Locale = "ja" | "en";
type Inspection = {
  rowCount: string;
  rowGroups: number;
  createdBy: string;
  codecs: string[];
  schema: ParquetSchemaRow[];
  columns: string[];
  rows: Record<string, unknown>[];
};

const labels = {
  ja: {
    title: "Parquetビューアー・スキーマ確認",
    description: "Parquetファイルの列名・データ型・圧縮方式・行数・先頭データを、変換せずブラウザで確認できます。",
    aboutTitle: "Parquetビューアーとは？",
    aboutText: "AWS S3、Athena、BigQuery、Sparkなどで作られたParquetの構造と中身を、専用ソフトなしで確認するためのツールです。",
    drop: "Parquetファイルを選択",
    inspect: "Parquetを確認",
    inspecting: "確認中...",
    invalid: "エラー: Parquetファイルを選択してください。",
    error: "エラー",
    success: "完了: Parquetのメタデータと先頭20行を読み取りました。",
    summary: "ファイル概要",
    rows: "行数",
    groups: "行グループ",
    codecs: "圧縮方式",
    created: "作成元",
    schema: "スキーマ",
    path: "列パス",
    physical: "物理型",
    logical: "論理型",
    repetition: "必須・任意",
    preview: "先頭データ",
  },
  en: {
    title: "Parquet Viewer & Schema Inspector",
    description: "Inspect Parquet column names, data types, compression codecs, row groups, row count, and the first rows directly in your browser.",
    aboutTitle: "What is Parquet Viewer?",
    aboutText: "Inspect the structure and sample rows of Parquet files from AWS S3, Athena, BigQuery, Spark, and other data platforms without installing desktop software.",
    drop: "Choose a Parquet file",
    inspect: "Inspect Parquet",
    inspecting: "Inspecting...",
    invalid: "Error: Please select a Parquet file.",
    error: "Error",
    success: "Done: Parquet metadata and the first 20 rows were loaded.",
    summary: "File summary",
    rows: "Rows",
    groups: "Row groups",
    codecs: "Compression",
    created: "Created by",
    schema: "Schema",
    path: "Column path",
    physical: "Physical type",
    logical: "Logical type",
    repetition: "Repetition",
    preview: "First rows",
  },
} as const;

export default function ParquetViewerTool({ locale }: { locale: Locale }) {
  const t = labels[locale];
  const [file, setFile] = useState<File | null>(null);
  const [inspection, setInspection] = useState<Inspection | null>(null);
  const [status, setStatus] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleInspect = async () => {
    if (!file || processing) return;
    if (!/\.parquet$/i.test(file.name)) {
      setStatus(t.invalid);
      return;
    }

    try {
      setProcessing(true);
      setStatus("");
      const buffer = await file.arrayBuffer();
      const asyncBuffer = {
        byteLength: buffer.byteLength,
        slice: (start: number, end?: number) => Promise.resolve(buffer.slice(start, end)),
      };
      const { parquetMetadataAsync, parquetReadObjects, parquetSchema } = await import("hyparquet");
      const metadata = await parquetMetadataAsync(asyncBuffer);
      const tree = parquetSchema(metadata);
      const rows = await parquetReadObjects({ file: asyncBuffer, metadata, rowEnd: 20 });
      const columns = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));

      setInspection({
        rowCount: metadata.num_rows.toString(),
        rowGroups: metadata.row_groups.length,
        createdBy: metadata.created_by || "-",
        codecs: getParquetCompressionCodecs(metadata),
        schema: flattenParquetSchema(tree),
        columns,
        rows,
      });
      setStatus(t.success);
    } catch (error) {
      setStatus(`${t.error}: ${getErrorMessage(error)}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      slug="parquet-viewer"
      toolCategory="data"
      title={t.title}
      description={t.description}
      aboutTitle={t.aboutTitle}
      aboutText={t.aboutText}
      contentSections={[{
        title: locale === "ja" ? "BigQuery・AWSのParquetをすぐ確認" : "Quickly inspect Parquet from BigQuery and AWS",
        paragraphs: [locale === "ja" ? "CSVやExcelへ変換する前に、列名、型、行数、圧縮方式と先頭20行を確認できます。大きなファイルでもデータ全体を表へ展開せず、まず構造を把握できます。" : "Check schema, row count, compression, and the first 20 rows before converting to CSV or Excel. This is useful for understanding a file without expanding the full dataset into a table."],
      }]}
      listSections={[{
        title: locale === "ja" ? "確認できる情報" : "Information shown",
        items: locale === "ja" ? ["列名とネストした列パス", "物理型・論理型・必須／任意", "総行数と行グループ数", "圧縮コーデックと作成元", "先頭20行の値"] : ["Column names and nested paths", "Physical and logical types", "Total rows and row groups", "Compression codecs and creator", "The first 20 rows"],
      }]}
      stepsTitle={locale === "ja" ? "使い方" : "How to use"}
      steps={locale === "ja" ? ["Parquetファイルを選択します", "確認ボタンを押します", "概要とスキーマを確認します", "先頭データを表で確認します"] : ["Choose a Parquet file", "Click Inspect", "Review the summary and schema", "Check the first rows"]}
      faqTitle={locale === "ja" ? "よくある質問" : "FAQ"}
      faqs={locale === "ja" ? [
        { question: "ParquetをExcelで開かずに確認できますか？", answer: "はい。列構造と先頭20行をブラウザ内で表示します。" },
        { question: "ファイル全体をアップロードしますか？", answer: "いいえ。読み取りはブラウザ内で行われます。" },
        { question: "変換もできますか？", answer: "関連するParquet→CSV、Parquet→Excelツールから変換できます。" },
      ] : [
        { question: "Can I inspect Parquet without Excel?", answer: "Yes. The schema and first 20 rows are displayed directly in your browser." },
        { question: "Is the file uploaded?", answer: "No. The file is read locally in your browser." },
        { question: "Can I convert it too?", answer: "Use the related Parquet to CSV or Parquet to Excel tools for conversion." },
      ]}
      relatedTools={locale === "ja" ? [
        { name: "ParquetをCSVに変換", href: "/tools/parquet-to-csv" },
        { name: "ParquetをExcelに変換", href: "/tools/parquet-to-excel" },
        { name: "CSVをParquetに変換", href: "/tools/csv-to-parquet" },
      ] : [
        { name: "Parquet to CSV", href: "/en/tools/parquet-to-csv" },
        { name: "Parquet to Excel", href: "/en/tools/parquet-to-excel" },
        { name: "CSV to Parquet", href: "/en/tools/csv-to-parquet" },
      ]}
    >
      <div className="space-y-5">
        <FileDropzone file={file} accept=".parquet" emptyTitle={t.drop} onFileSelect={(selected) => { setFile(selected); setInspection(null); setStatus(""); }} />
        {file ? <p className="text-sm text-gray-600">{file.name} · {formatFileSize(file.size)}</p> : null}
        {!inspection ? <PrimaryButton onClick={handleInspect} disabled={!file || processing}>{processing ? t.inspecting : t.inspect}</PrimaryButton> : null}
        {status ? <StatusMessage status={status} /> : null}
        {inspection ? (
          <div className="space-y-6">
            <section className="space-y-3">
              <h2 className="text-base font-semibold text-gray-900">{t.summary}</h2>
              <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[[t.rows, inspection.rowCount], [t.groups, inspection.rowGroups.toLocaleString()], [t.codecs, inspection.codecs.join(", ") || "-"], [t.created, inspection.createdBy]].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-gray-200 bg-gray-50 p-3"><dt className="text-xs text-gray-500">{label}</dt><dd className="mt-1 break-words text-sm font-medium text-gray-900">{value}</dd></div>
                ))}
              </dl>
            </section>
            <section className="space-y-3">
              <h2 className="text-base font-semibold text-gray-900">{t.schema}</h2>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full text-xs"><thead className="bg-gray-50"><tr>{[t.path, t.physical, t.logical, t.repetition].map((value) => <th key={value} className="whitespace-nowrap px-3 py-2 text-left font-medium text-gray-700">{value}</th>)}</tr></thead><tbody className="divide-y divide-gray-100">{inspection.schema.map((row) => <tr key={row.path}><td className="px-3 py-2 font-mono">{row.path}</td><td className="px-3 py-2">{row.physicalType}</td><td className="px-3 py-2">{row.logicalType}</td><td className="px-3 py-2">{row.repetition}</td></tr>)}</tbody></table>
              </div>
            </section>
            {inspection.rows.length > 0 ? (
              <section className="space-y-3"><h2 className="text-base font-semibold text-gray-900">{t.preview}</h2><div className="overflow-x-auto rounded-lg border border-gray-200"><table className="min-w-full text-xs"><thead className="bg-gray-50"><tr>{inspection.columns.map((column) => <th key={column} className="whitespace-nowrap px-3 py-2 text-left font-medium text-gray-700">{column}</th>)}</tr></thead><tbody className="divide-y divide-gray-100">{inspection.rows.map((row, index) => <tr key={index}>{inspection.columns.map((column) => <td key={column} className="max-w-[240px] truncate whitespace-nowrap px-3 py-2 text-gray-600">{formatParquetCell(row[column])}</td>)}</tr>)}</tbody></table></div></section>
            ) : null}
          </div>
        ) : null}
      </div>
    </ToolPageLayout>
  );
}
