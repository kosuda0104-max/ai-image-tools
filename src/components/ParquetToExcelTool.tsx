"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import PrimaryButton from "@/components/PrimaryButton";
import StatusMessage from "@/components/StatusMessage";
import ToolPageLayout from "@/components/ToolPageLayout";
import {
  formatFileSize,
  getBaseName,
  getErrorMessage,
  triggerBlobDownload,
} from "@/src/lib/image-conversion";
import { createXlsxBlob, type XlsxValue } from "@/src/lib/xlsx";

const PREVIEW_ROWS = 5;

type Locale = "ja" | "en";

type ParsedData = {
  columns: string[];
  rows: XlsxValue[][];
  totalRows: number;
};

const content = {
  ja: {
    page: {
      title: "Parquet を Excel に変換",
      description:
        "ParquetファイルをExcel（.xlsx）に変換できる無料オンラインツールです。AWS、BigQuery、Sparkまわりのデータ確認をブラウザだけで進められます。",
      aboutTitle: "Parquet を Excel に変換とは？",
      aboutText:
        "Parquetの中身を表として読み取り、Excelで開ける .xlsx に変換します。データ基盤の出力を軽く確認したいときや、非エンジニアに共有したいときに便利です。",
      stepsTitle: "使い方",
      steps: [
        "Parquetファイルを選択します",
        "変換ボタンを押します",
        "先頭行のプレビューを確認します",
        "Excelファイル（.xlsx）をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "Parquetファイルはサーバーに送られますか？",
          answer:
            "いいえ。読み取りとExcel生成はブラウザ内で行われ、ファイルは外部サーバーに送信されません。",
        },
        {
          question: "大きなParquetでも変換できますか？",
          answer:
            "ブラウザのメモリ内で処理するため、非常に大きなファイルでは時間がかかったり失敗することがあります。まずは確認用の小さめのファイルで使うのがおすすめです。",
        },
        {
          question: "CSVではなくExcelで出せますか？",
          answer:
            "はい。このツールは .xlsx を出力します。CSVが必要な場合は Parquet を CSV に変換ツールを使えます。",
        },
      ],
      relatedToolsTitle: "関連ツール",
      relatedTools: [
        { name: "Parquet を CSV に変換", href: "/tools/parquet-to-csv" },
        { name: "CSV を Parquet に変換", href: "/tools/csv-to-parquet" },
        { name: "JSON を Excel に変換", href: "/tools/json-to-excel" },
      ],
    },
    ui: {
      emptyTitle: "Parquetファイルをアップロード",
      selectedFileTitle: "選択中のファイル",
      fileNameLabel: "ファイル名",
      fileSizeLabel: "サイズ",
      rowCountLabel: "行数",
      columnCountLabel: "列数",
      previewTitle: "プレビュー",
      previewNote: (rows: number) => `先頭${rows}行まで表示します。`,
      convertButton: "Parquet を Excel に変換",
      convertingButton: "変換中...",
      downloadButton: "Excel をダウンロード",
      invalidFileError: "Parquetファイルを選択してください。",
      emptyFileError: "変換できる行がありませんでした。",
      convertingStatus: "Parquetを読み取り、Excelファイルを作成しています...",
      unexpectedErrorPrefix: "変換に失敗しました",
      successMessage: (baseName: string, rowCount: number) =>
        `${baseName}.parquet を ${rowCount.toLocaleString()} 行のExcelファイルに変換しました。`,
    },
  },
  en: {
    page: {
      title: "Parquet to Excel Converter",
      description:
        "Convert Parquet files to Excel (.xlsx) in your browser. Useful for AWS, BigQuery, Spark, and data-platform review workflows.",
      aboutTitle: "What is Parquet to Excel Converter?",
      aboutText:
        "This tool reads a Parquet file and creates an Excel-ready .xlsx file. It is useful when you need to quickly inspect or share data-platform exports in a spreadsheet.",
      stepsTitle: "How to Use",
      steps: [
        "Choose a Parquet file",
        "Click convert",
        "Review the first rows in the preview",
        "Download the Excel file",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Is the Parquet file uploaded?",
          answer:
            "No. Reading and Excel generation run in your browser, so the file is not sent to an external server.",
        },
        {
          question: "Can it handle large Parquet files?",
          answer:
            "The file is processed in browser memory, so very large files may take longer or fail. It works best for inspection and sharing workflows.",
        },
        {
          question: "Can I export CSV instead?",
          answer:
            "Yes. Use the Parquet to CSV tool if you need CSV output instead of .xlsx.",
        },
      ],
      relatedToolsTitle: "Related Tools",
      relatedTools: [
        { name: "Parquet to CSV", href: "/en/tools/parquet-to-csv" },
        { name: "CSV to Parquet", href: "/en/tools/csv-to-parquet" },
        { name: "JSON to Excel", href: "/en/tools/json-to-excel" },
      ],
    },
    ui: {
      emptyTitle: "Upload Parquet file",
      selectedFileTitle: "Selected file",
      fileNameLabel: "Name",
      fileSizeLabel: "Size",
      rowCountLabel: "Rows",
      columnCountLabel: "Columns",
      previewTitle: "Preview",
      previewNote: (rows: number) => `Showing the first ${rows} rows.`,
      convertButton: "Convert Parquet to Excel",
      convertingButton: "Converting...",
      downloadButton: "Download Excel",
      invalidFileError: "Please select a Parquet file.",
      emptyFileError: "No rows were found to convert.",
      convertingStatus: "Reading Parquet and creating an Excel file...",
      unexpectedErrorPrefix: "Conversion failed",
      successMessage: (baseName: string, rowCount: number) =>
        `${baseName}.parquet was converted to an Excel file with ${rowCount.toLocaleString()} rows.`,
    },
  },
} satisfies Record<Locale, {
  page: {
    title: string;
    description: string;
    aboutTitle: string;
    aboutText: string;
    stepsTitle: string;
    steps: string[];
    faqTitle: string;
    faqs: { question: string; answer: string }[];
    relatedToolsTitle: string;
    relatedTools: { name: string; href: string }[];
  };
  ui: {
    emptyTitle: string;
    selectedFileTitle: string;
    fileNameLabel: string;
    fileSizeLabel: string;
    rowCountLabel: string;
    columnCountLabel: string;
    previewTitle: string;
    previewNote: (rows: number) => string;
    convertButton: string;
    convertingButton: string;
    downloadButton: string;
    invalidFileError: string;
    emptyFileError: string;
    convertingStatus: string;
    unexpectedErrorPrefix: string;
    successMessage: (baseName: string, rowCount: number) => string;
  };
}>;

function safeStringify(value: unknown) {
  return JSON.stringify(value, (_key, child) =>
    typeof child === "bigint" ? child.toString() : child,
  );
}

function toCellValue(value: unknown): XlsxValue {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) return value.toISOString();
  return safeStringify(value) ?? String(value);
}

function normalizeRows(rows: Record<string, unknown>[]) {
  const keySet = new Set<string>();

  for (const row of rows) {
    for (const key of Object.keys(row)) {
      keySet.add(key);
    }
  }

  const columns = Array.from(keySet);

  return {
    columns,
    values: rows.map((row) => columns.map((column) => toCellValue(row[column]))),
  };
}

function previewCell(value: XlsxValue) {
  if (value === null || value === undefined) return "";
  return String(value);
}

export default function ParquetToExcelTool({ locale }: { locale: Locale }) {
  const { page, ui } = content[locale];
  const [file, setFile] = useState<File | null>(null);
  const [parsed, setParsed] = useState<ParsedData | null>(null);
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [xlsxBlob, setXlsxBlob] = useState<Blob | null>(null);
  const [baseName, setBaseName] = useState("");

  const handleFileSelect = (selected: File | null) => {
    setFile(selected);
    setParsed(null);
    setXlsxBlob(null);
    setStatus("");
    if (selected) setBaseName(getBaseName(selected.name));
  };

  const handleConvert = async () => {
    if (!file || isProcessing) return;

    if (!file.name.toLowerCase().endsWith(".parquet")) {
      setStatus(ui.invalidFileError);
      return;
    }

    try {
      setIsProcessing(true);
      setStatus(ui.convertingStatus);

      const arrayBuffer = await file.arrayBuffer();
      const asyncBuffer = {
        byteLength: arrayBuffer.byteLength,
        slice: (start: number, end?: number) =>
          Promise.resolve(arrayBuffer.slice(start, end)),
      };

      const { parquetReadObjects } = await import("hyparquet");
      const rows = (await parquetReadObjects({
        file: asyncBuffer,
      })) as Record<string, unknown>[];

      if (rows.length === 0) {
        setStatus(ui.emptyFileError);
        return;
      }

      const { columns, values } = normalizeRows(rows);
      const blob = createXlsxBlob({
        headers: columns,
        rows: values,
        sheetName: "Parquet",
      });

      setParsed({
        columns,
        rows: values.slice(0, PREVIEW_ROWS),
        totalRows: rows.length,
      });
      setXlsxBlob(blob);
      setStatus(ui.successMessage(baseName, rows.length));
    } catch (err) {
      const msg = getErrorMessage(err);
      setStatus(`${ui.unexpectedErrorPrefix}: ${msg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!xlsxBlob) return;
    triggerBlobDownload(xlsxBlob, `${baseName}.xlsx`);
  };

  return (
    <ToolPageLayout
      slug="parquet-to-excel"
      toolCategory="data"
      title={page.title}
      description={page.description}
      aboutTitle={page.aboutTitle}
      aboutText={page.aboutText}
      contentSections={[
        {
          title: locale === "ja" ? "ParquetをExcelで確認・共有" : "Inspect and share Parquet data in Excel",
          paragraphs: [
            locale === "ja"
              ? "Parquetは分析基盤でよく使われる列指向形式ですが、Excelでは直接開けません。このツールで .xlsx に変換すると、AWS S3、BigQuery、Sparkなどから出力したデータを表として確認できます。"
              : "Parquet is a columnar format commonly used in analytics platforms, but Excel cannot open it directly. Convert it to .xlsx to review exports from AWS S3, BigQuery, Spark, and similar workflows.",
            locale === "ja"
              ? "変換はブラウザのメモリ内で行うため、確認や共有に使う小〜中規模のParquetファイルに向いています。"
              : "Conversion runs in browser memory, so it is best suited to small and medium Parquet files used for inspection or sharing.",
          ],
        },
      ]}
      listSections={[
        {
          title: locale === "ja" ? "主な利用場面" : "Common use cases",
          items:
            locale === "ja"
              ? ["S3に保存したParquetの中身を確認", "BigQueryやSparkの出力をExcelで共有", "CSVへ変換する前の列・行プレビュー", "非エンジニア向けの .xlsx 資料を作成"]
              : ["Inspect Parquet files stored in S3", "Share BigQuery or Spark exports in Excel", "Preview columns and rows before CSV export", "Create an .xlsx file for non-technical teammates"],
        },
      ]}
      comparisonTitle={locale === "ja" ? "Excel出力とCSV出力の違い" : "Excel output vs. CSV output"}
      comparisonItems={
        locale === "ja"
          ? [
              { label: "Excel（.xlsx）", value: "表としてすぐ開き、社内確認や共有に使いたい場合に向いています。" },
              { label: "CSV", value: "別システムへの取り込みやスクリプト処理に向いています。" },
            ]
          : [
              { label: "Excel (.xlsx)", value: "Best for immediate spreadsheet review and sharing." },
              { label: "CSV", value: "Best for imports, scripts, and system-to-system workflows." },
            ]
      }
      stepsTitle={page.stepsTitle}
      steps={page.steps}
      faqTitle={page.faqTitle}
      faqs={page.faqs}
      relatedTools={page.relatedTools}
      relatedToolsTitle={page.relatedToolsTitle}
    >
      <div className="space-y-4">
        <FileDropzone
          file={file}
          accept=".parquet"
          emptyTitle={ui.emptyTitle}
          onFileSelect={handleFileSelect}
        />

        {file && (
          <div className="space-y-1 rounded-xl border p-4 text-sm">
            <div className="font-medium">{ui.selectedFileTitle}</div>
            <div className="text-gray-600">
              <span className="font-medium">{ui.fileNameLabel}:</span> {file.name}
            </div>
            <div className="text-gray-600">
              <span className="font-medium">{ui.fileSizeLabel}:</span>{" "}
              {formatFileSize(file.size)}
            </div>
            {parsed && (
              <>
                <div className="text-gray-600">
                  <span className="font-medium">{ui.rowCountLabel}:</span>{" "}
                  {parsed.totalRows.toLocaleString()}
                </div>
                <div className="text-gray-600">
                  <span className="font-medium">{ui.columnCountLabel}:</span>{" "}
                  {parsed.columns.length}
                </div>
              </>
            )}
          </div>
        )}

        {parsed && parsed.rows.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">{ui.previewTitle}</div>
            <p className="text-xs text-gray-500">{ui.previewNote(PREVIEW_ROWS)}</p>
            <div className="overflow-x-auto rounded-xl border">
              <table className="min-w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    {parsed.columns.map((column) => (
                      <th
                        key={column}
                        className="whitespace-nowrap px-3 py-2 text-left font-medium text-gray-700"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {parsed.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {parsed.columns.map((column, columnIndex) => (
                        <td
                          key={`${column}-${columnIndex}`}
                          className="max-w-[200px] truncate whitespace-nowrap px-3 py-2 text-gray-600"
                        >
                          {previewCell(row[columnIndex])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {status && <StatusMessage status={status} />}

        <div className="flex gap-3">
          {!xlsxBlob ? (
            <PrimaryButton onClick={handleConvert} disabled={!file || isProcessing}>
              {isProcessing ? ui.convertingButton : ui.convertButton}
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={handleDownload}>{ui.downloadButton}</PrimaryButton>
          )}
        </div>
      </div>
    </ToolPageLayout>
  );
}
