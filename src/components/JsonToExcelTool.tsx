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

type Content = {
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
    parseError: string;
    emptyFileError: string;
    convertingStatus: string;
    unexpectedErrorPrefix: string;
    successMessage: (baseName: string, rowCount: number) => string;
  };
};

const content: Record<Locale, Content> = {
  ja: {
    page: {
      title: "JSON を Excel に変換",
      description:
        "JSONファイルをExcel（.xlsx）に変換できる無料オンラインツールです。ブラウザ内で処理するため、ファイルは外部サーバーに送信されません。",
      aboutTitle: "JSON を Excel に変換とは？",
      aboutText:
        "APIレスポンスやDBエクスポートのJSONを、Excelで開ける .xlsx に変換します。配列JSONは各要素を行にし、ネストしたオブジェクトは dot notation の列名に展開します。",
      stepsTitle: "使い方",
      steps: [
        "JSONファイルを選択します",
        "変換ボタンを押します",
        "プレビューで列と行を確認します",
        "Excelファイル（.xlsx）をダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "配列ではないJSONも変換できますか？",
          answer:
            "はい。オブジェクトの場合は1行の表として変換します。配列の場合は各要素を1行として扱います。",
        },
        {
          question: "ネストしたJSONはどうなりますか？",
          answer:
            "ネストしたオブジェクトは user.name のような列名に展開します。配列や複雑な値はJSON文字列としてセルに入れます。",
        },
        {
          question: "ファイルはアップロードされますか？",
          answer:
            "いいえ。変換はブラウザ内で完結し、JSONファイルは外部サーバーへ送信されません。",
        },
      ],
      relatedToolsTitle: "関連ツール",
      relatedTools: [
        { name: "JSON を CSV に変換", href: "/tools/json-to-csv" },
        { name: "CSV を JSON に変換", href: "/tools/csv-to-json" },
        { name: "Parquet を Excel に変換", href: "/tools/parquet-to-excel" },
      ],
    },
    ui: {
      emptyTitle: "JSONファイルをアップロード",
      selectedFileTitle: "選択中のファイル",
      fileNameLabel: "ファイル名",
      fileSizeLabel: "サイズ",
      rowCountLabel: "行数",
      columnCountLabel: "列数",
      previewTitle: "プレビュー",
      previewNote: (rows) => `先頭${rows}行まで表示します。`,
      convertButton: "JSON を Excel に変換",
      convertingButton: "変換中...",
      downloadButton: "Excel をダウンロード",
      invalidFileError: "JSONファイルを選択してください。",
      parseError: "JSONを読み取れませんでした。形式を確認してください。",
      emptyFileError: "変換できるデータがありませんでした。",
      convertingStatus: "JSONを読み取り、Excelファイルを作成しています...",
      unexpectedErrorPrefix: "変換に失敗しました",
      successMessage: (baseName, rowCount) =>
        `${baseName}.json を ${rowCount.toLocaleString()} 行のExcelファイルに変換しました。`,
    },
  },
  en: {
    page: {
      title: "JSON to Excel Converter",
      description:
        "Convert JSON files to Excel (.xlsx) directly in your browser. No upload required.",
      aboutTitle: "What is JSON to Excel Converter?",
      aboutText:
        "This tool turns JSON arrays, API responses, and database exports into Excel-ready .xlsx files. Nested objects are flattened into dot-notation columns for easier spreadsheet review.",
      stepsTitle: "How to Use",
      steps: [
        "Choose a JSON file",
        "Click convert",
        "Check the column and row preview",
        "Download the Excel file",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "Can it convert non-array JSON?",
          answer:
            "Yes. A JSON object becomes a one-row table. A JSON array becomes one row per item.",
        },
        {
          question: "How are nested values handled?",
          answer:
            "Nested objects are flattened into columns such as user.name. Arrays and complex values are stored as JSON strings.",
        },
        {
          question: "Is my file uploaded?",
          answer:
            "No. The conversion runs in your browser and the JSON file is not sent to an external server.",
        },
      ],
      relatedToolsTitle: "Related Tools",
      relatedTools: [
        { name: "JSON to CSV", href: "/en/tools/json-to-csv" },
        { name: "CSV to JSON", href: "/en/tools/csv-to-json" },
        { name: "Parquet to Excel", href: "/en/tools/parquet-to-excel" },
      ],
    },
    ui: {
      emptyTitle: "Upload JSON file",
      selectedFileTitle: "Selected file",
      fileNameLabel: "Name",
      fileSizeLabel: "Size",
      rowCountLabel: "Rows",
      columnCountLabel: "Columns",
      previewTitle: "Preview",
      previewNote: (rows) => `Showing the first ${rows} rows.`,
      convertButton: "Convert JSON to Excel",
      convertingButton: "Converting...",
      downloadButton: "Download Excel",
      invalidFileError: "Please select a JSON file.",
      parseError: "Could not read the JSON. Please check the file format.",
      emptyFileError: "No convertible data was found.",
      convertingStatus: "Reading JSON and creating an Excel file...",
      unexpectedErrorPrefix: "Conversion failed",
      successMessage: (baseName, rowCount) =>
        `${baseName}.json was converted to an Excel file with ${rowCount.toLocaleString()} rows.`,
    },
  },
};

function toCellValue(value: unknown): XlsxValue {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return value;
  }
  return JSON.stringify(value);
}

function flattenItem(
  value: unknown,
  prefix = "",
  output: Record<string, XlsxValue> = {},
) {
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      const column = prefix ? `${prefix}.${key}` : key;
      if (child !== null && typeof child === "object" && !Array.isArray(child)) {
        flattenItem(child, column, output);
      } else {
        output[column] = toCellValue(child);
      }
    }
  } else {
    output[prefix || "value"] = toCellValue(value);
  }

  return output;
}

function parseJsonRows(jsonData: unknown) {
  const items = Array.isArray(jsonData) ? jsonData : [jsonData];

  if (items.length === 0) {
    throw new Error("EMPTY");
  }

  const flattened = items.map((item) => flattenItem(item));
  const keySet = new Set<string>();

  for (const row of flattened) {
    for (const key of Object.keys(row)) {
      keySet.add(key);
    }
  }

  const columns = Array.from(keySet);

  if (columns.length === 0) {
    throw new Error("EMPTY");
  }

  return {
    columns,
    rows: flattened.map((row) => columns.map((column) => row[column] ?? "")),
  };
}

function previewCell(value: XlsxValue) {
  if (value === null || value === undefined) return "";
  return String(value);
}

export default function JsonToExcelTool({ locale }: { locale: Locale }) {
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

    if (!file.name.toLowerCase().endsWith(".json")) {
      setStatus(ui.invalidFileError);
      return;
    }

    try {
      setIsProcessing(true);
      setStatus(ui.convertingStatus);

      const text = await file.text();
      let jsonData: unknown;

      try {
        jsonData = JSON.parse(text);
      } catch {
        setStatus(ui.parseError);
        return;
      }

      const { columns, rows } = parseJsonRows(jsonData);
      const blob = createXlsxBlob({ headers: columns, rows, sheetName: "JSON" });

      setParsed({ columns, rows: rows.slice(0, PREVIEW_ROWS), totalRows: rows.length });
      setXlsxBlob(blob);
      setStatus(ui.successMessage(baseName, rows.length));
    } catch (err) {
      const msg = getErrorMessage(err);
      setStatus(
        msg === "EMPTY"
          ? ui.emptyFileError
          : `${ui.unexpectedErrorPrefix}: ${msg}`,
      );
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
      slug="json-to-excel"
      toolCategory="data"
      title={page.title}
      description={page.description}
      aboutTitle={page.aboutTitle}
      aboutText={page.aboutText}
      contentSections={[
        {
          title: locale === "ja" ? "APIのJSONをExcelで確認" : "Review API JSON in Excel",
          paragraphs: [
            locale === "ja"
              ? "JSON配列は1要素を1行として変換し、オブジェクトのキーをExcelの列名にします。APIレスポンスやDBエクスポートを、コードを書かずに表として確認できます。"
              : "Each item in a JSON array becomes a row and object keys become Excel columns. This makes API responses and database exports easier to review without writing a conversion script.",
            locale === "ja"
              ? "ネストしたオブジェクトは user.name のような列名に展開し、配列はJSON文字列として保持します。"
              : "Nested objects are flattened into columns such as user.name, while arrays are preserved as JSON strings.",
          ],
        },
      ]}
      listSections={[
        {
          title: locale === "ja" ? "変換できるJSON" : "Supported JSON structures",
          items:
            locale === "ja"
              ? ["オブジェクトの配列", "単一のJSONオブジェクト", "ネストしたオブジェクト", "文字列・数値・真偽値・nullを含むデータ"]
              : ["Arrays of objects", "A single JSON object", "Nested objects", "Data containing strings, numbers, booleans, and null values"],
        },
      ]}
      comparisonTitle={locale === "ja" ? "JSONからExcelへ変換するときの扱い" : "How JSON values map to Excel"}
      comparisonItems={
        locale === "ja"
          ? [
              { label: "配列", value: "各要素をExcelの1行として出力します。" },
              { label: "オブジェクト", value: "キーを列名、値をセルとして1行に出力します。" },
              { label: "ネスト", value: "dot notationの列名へ展開します。" },
            ]
          : [
              { label: "Arrays", value: "Each array item becomes one Excel row." },
              { label: "Objects", value: "Keys become headers and values become cells in one row." },
              { label: "Nested data", value: "Nested keys are flattened using dot notation." },
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
          accept=".json,application/json"
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
