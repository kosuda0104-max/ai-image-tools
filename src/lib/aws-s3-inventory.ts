import { parseDelimitedText } from "@/src/lib/csv";
import {
  isRecord,
  recordsToTable,
  toTabularCell,
  type TabularData,
} from "@/src/lib/aws-common";

export type S3InventoryManifest = {
  sourceBucket: string;
  destinationBucket: string;
  version: string;
  creationTimestamp: string;
  fileFormat: string;
  fileSchema: string[];
  files: { key: string; size?: number; md5?: string }[];
};

export function parseS3InventoryManifest(text: string): S3InventoryManifest {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text.replace(/^\ufeff/, ""));
  } catch {
    throw new Error("The S3 Inventory manifest is not valid JSON.");
  }
  if (!isRecord(parsed) || !Array.isArray(parsed.files)) {
    throw new Error("The selected JSON is not an S3 Inventory manifest.");
  }

  const fileSchema = String(parsed.fileSchema ?? "")
    .split(",")
    .map((column) => column.trim())
    .filter(Boolean);
  if (fileSchema.length === 0) {
    throw new Error("The manifest does not contain fileSchema.");
  }

  return {
    sourceBucket: String(parsed.sourceBucket ?? ""),
    destinationBucket: String(parsed.destinationBucket ?? ""),
    version: String(parsed.version ?? ""),
    creationTimestamp: String(parsed.creationTimestamp ?? ""),
    fileFormat: String(parsed.fileFormat ?? "CSV").toUpperCase(),
    fileSchema,
    files: parsed.files.filter(isRecord).map((file) => ({
      key: String(file.key ?? ""),
      size: typeof file.size === "number" ? file.size : undefined,
      md5: String(file.MD5checksum ?? file.md5Checksum ?? "") || undefined,
    })),
  };
}

export function parseS3InventoryCsv(
  text: string,
  schema: string[],
  sourceFile: string,
): TabularData {
  const parsed = parseDelimitedText(
    `${schema.map((column) => `"${column.replace(/"/g, '""')}"`).join(",")}\n${text.replace(/^\ufeff/, "")}`,
    ",",
  );
  const columns = [...parsed.columns, "_sourceFile"];
  return {
    columns,
    rows: parsed.rows.map((row) => [
      ...parsed.columns.map((_column, index) => row[index] ?? ""),
      sourceFile,
    ]),
  };
}

export async function parseS3InventoryParquet(
  buffer: ArrayBuffer,
  sourceFile: string,
) {
  const asyncBuffer = {
    byteLength: buffer.byteLength,
    slice: (start: number, end?: number) =>
      Promise.resolve(buffer.slice(start, end)),
  };
  const { parquetReadObjects } = await import("hyparquet");
  const rows = (await parquetReadObjects({ file: asyncBuffer })) as Record<
    string,
    unknown
  >[];
  return recordsToTable(
    rows.map((row) => ({ ...row, _sourceFile: sourceFile })),
    { maxDepth: 1 },
  );
}

export function mergeS3InventoryTables(tables: TabularData[]) {
  const columns = Array.from(new Set(tables.flatMap((table) => table.columns)));
  const rows = tables.flatMap((table) =>
    table.rows.map((row) => {
      const values = new Map(
        table.columns.map((column, index) => [column, toTabularCell(row[index])]),
      );
      return columns.map((column) => values.get(column) ?? "");
    }),
  );

  if (rows.length === 0) throw new Error("No S3 Inventory rows were found.");
  return { columns, rows } satisfies TabularData;
}
