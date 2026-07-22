import { encodeCsvText, rowsToCsv } from "@/src/lib/csv";
import {
  readFileText,
  safeJsonStringify,
  type TabularData,
} from "@/src/lib/aws-common";
import { parseDynamoDbText } from "@/src/lib/aws-dynamodb";
import { parseTextractText } from "@/src/lib/aws-textract";
import {
  mergeCloudTrailConversions,
  parseCloudTrailText,
} from "@/src/lib/aws-cloudtrail";
import {
  mergeCloudWatchConversions,
  parseCloudWatchText,
} from "@/src/lib/aws-cloudwatch";
import {
  mergeS3InventoryTables,
  parseS3InventoryCsv,
  parseS3InventoryManifest,
  parseS3InventoryParquet,
} from "@/src/lib/aws-s3-inventory";
import { parseTranscribeText } from "@/src/lib/aws-transcribe";
import { createWorkbookBlob, createXlsxBlob } from "@/src/lib/xlsx";

export type AwsToolKind =
  | "dynamodb"
  | "textract"
  | "cloudtrail"
  | "s3-inventory"
  | "cloudwatch"
  | "transcribe";

export type AwsOutputFormat = "json" | "csv" | "xlsx" | "jsonl" | "srt" | "vtt" | "txt";

export type AwsArtifact = {
  format: AwsOutputFormat;
  filename: string;
  blob: Blob;
};

export type AwsConversionResult = {
  table: TabularData;
  rowCount: number;
  stats: Record<string, number | string>;
  artifacts: AwsArtifact[];
};

function filenameStem(filename: string) {
  return (
    filename
      .replace(/\.(json|csv|log|txt)\.gz$/i, "")
      .replace(/\.(json|jsonl|csv|parquet|log|txt)$/i, "") || "aws-export"
  );
}

function textBlob(text: string, type: string) {
  return new Blob([text], { type });
}

function csvBlob(table: TabularData) {
  return new Blob([encodeCsvText(rowsToCsv(table.columns, table.rows), "utf-8-bom")], {
    type: "text/csv;charset=utf-8",
  });
}

async function convertDynamoDb(files: File[]): Promise<AwsConversionResult> {
  const file = files[0];
  const result = parseDynamoDbText(await readFileText(file));
  const stem = filenameStem(file.name);
  return {
    table: result.table,
    rowCount: result.records.length,
    stats: { items: result.records.length, columns: result.table.columns.length },
    artifacts: [
      {
        format: "json",
        filename: `${stem}-plain.json`,
        blob: textBlob(`${safeJsonStringify(result.records, 2)}\n`, "application/json"),
      },
      { format: "csv", filename: `${stem}.csv`, blob: csvBlob(result.table) },
      {
        format: "xlsx",
        filename: `${stem}.xlsx`,
        blob: createXlsxBlob({
          headers: result.table.columns,
          rows: result.table.rows,
          sheetName: "DynamoDB Items",
        }),
      },
    ],
  };
}

async function convertTextract(files: File[]): Promise<AwsConversionResult> {
  const file = files[0];
  const result = parseTextractText(await readFileText(file));
  const stem = filenameStem(file.name);
  const firstSheet = result.sheets[0];
  const csvTable = result.csvRows.length > 0
    ? { columns: result.csvColumns, rows: result.csvRows }
    : { columns: firstSheet.headers, rows: firstSheet.rows };
  const preview = result.tables[0]
    ? {
        columns: result.tables[0].rows[0]?.map((_cell, index) => `Column ${index + 1}`) ?? [],
        rows: result.tables[0].rows,
      }
    : { columns: firstSheet.headers, rows: firstSheet.rows };

  return {
    table: preview,
    rowCount: result.tables.reduce((count, table) => count + table.rows.length, 0),
    stats: {
      blocks: result.blocks,
      tables: result.tables.length,
      forms: result.forms.length,
      lines: result.lines.length,
    },
    artifacts: [
      {
        format: "xlsx",
        filename: `${stem}.xlsx`,
        blob: createWorkbookBlob({ sheets: result.sheets }),
      },
      { format: "csv", filename: `${stem}-tables.csv`, blob: csvBlob(csvTable) },
    ],
  };
}

async function convertCloudTrail(files: File[]): Promise<AwsConversionResult> {
  const conversions = await Promise.all(
    files.map(async (file) =>
      parseCloudTrailText(await readFileText(file), file.name),
    ),
  );
  const result = mergeCloudTrailConversions(conversions);
  const jsonl = result.normalized
    .map((event) => safeJsonStringify(event))
    .join("\n");
  return {
    table: result.table,
    rowCount: result.events.length,
    stats: { events: result.events.length, files: files.length },
    artifacts: [
      { format: "csv", filename: "cloudtrail-events.csv", blob: csvBlob(result.table) },
      {
        format: "jsonl",
        filename: "cloudtrail-events.jsonl",
        blob: textBlob(`${jsonl}\n`, "application/x-ndjson"),
      },
    ],
  };
}

async function convertCloudWatch(files: File[]): Promise<AwsConversionResult> {
  const conversions = await Promise.all(
    files.map(async (file) =>
      parseCloudWatchText(await readFileText(file), file.name),
    ),
  );
  const result = mergeCloudWatchConversions(conversions);
  const jsonl = result.events.map((event) => safeJsonStringify(event)).join("\n");
  return {
    table: result.table,
    rowCount: result.events.length,
    stats: { events: result.events.length, files: files.length },
    artifacts: [
      { format: "csv", filename: "cloudwatch-logs.csv", blob: csvBlob(result.table) },
      {
        format: "jsonl",
        filename: "cloudwatch-logs.jsonl",
        blob: textBlob(`${jsonl}\n`, "application/x-ndjson"),
      },
    ],
  };
}

async function convertS3Inventory(files: File[]): Promise<AwsConversionResult> {
  const manifestFile = files.find((file) => /manifest\.json$/i.test(file.name));
  if (!manifestFile) {
    throw new Error("Select manifest.json together with its inventory data files.");
  }
  const manifest = parseS3InventoryManifest(await readFileText(manifestFile));
  const dataFiles = files.filter(
    (file) => file !== manifestFile && /\.(csv(?:\.gz)?|parquet)$/i.test(file.name),
  );
  if (dataFiles.length === 0) {
    throw new Error("No CSV.GZ, CSV, or Parquet inventory data files were selected.");
  }

  const tables = await Promise.all(
    dataFiles.map(async (file) => {
      if (/\.parquet$/i.test(file.name)) {
        return parseS3InventoryParquet(await file.arrayBuffer(), file.name);
      }
      return parseS3InventoryCsv(await readFileText(file), manifest.fileSchema, file.name);
    }),
  );
  const table = mergeS3InventoryTables(tables);
  return {
    table,
    rowCount: table.rows.length,
    stats: {
      rows: table.rows.length,
      columns: table.columns.length,
      loadedFiles: dataFiles.length,
      manifestFiles: manifest.files.length,
    },
    artifacts: [
      { format: "csv", filename: "s3-inventory.csv", blob: csvBlob(table) },
      {
        format: "xlsx",
        filename: "s3-inventory.xlsx",
        blob: createXlsxBlob({
          headers: table.columns,
          rows: table.rows,
          sheetName: "S3 Inventory",
        }),
      },
    ],
  };
}

async function convertTranscribe(files: File[]): Promise<AwsConversionResult> {
  const file = files[0];
  const result = parseTranscribeText(await readFileText(file));
  const stem = filenameStem(file.name);
  const table: TabularData = {
    columns: ["cue", "start_seconds", "end_seconds", "speaker", "text"],
    rows: result.cues.map((cue) => [
      cue.index,
      cue.start,
      cue.end,
      cue.speaker,
      cue.text,
    ]),
  };
  return {
    table,
    rowCount: result.cues.length,
    stats: {
      cues: result.cues.length,
      duration: result.cues.at(-1)?.end.toFixed(2) ?? "0.00",
    },
    artifacts: [
      { format: "srt", filename: `${stem}.srt`, blob: textBlob(result.srt, "application/x-subrip") },
      { format: "vtt", filename: `${stem}.vtt`, blob: textBlob(result.vtt, "text/vtt") },
      { format: "txt", filename: `${stem}.txt`, blob: textBlob(result.text, "text/plain;charset=utf-8") },
    ],
  };
}

export async function convertAwsFiles(kind: AwsToolKind, files: File[]) {
  if (files.length === 0) throw new Error("No files were selected.");
  switch (kind) {
    case "dynamodb":
      return convertDynamoDb(files);
    case "textract":
      return convertTextract(files);
    case "cloudtrail":
      return convertCloudTrail(files);
    case "s3-inventory":
      return convertS3Inventory(files);
    case "cloudwatch":
      return convertCloudWatch(files);
    case "transcribe":
      return convertTranscribe(files);
  }
}
