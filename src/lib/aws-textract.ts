import { isRecord, parseJsonOrJsonLines } from "@/src/lib/aws-common";
import type { XlsxSheet, XlsxValue } from "@/src/lib/xlsx";

type TextractBlock = Record<string, unknown> & {
  Id?: string;
  BlockType?: string;
  Page?: number;
  Text?: string;
  RowIndex?: number;
  ColumnIndex?: number;
  RowSpan?: number;
  ColumnSpan?: number;
  SelectionStatus?: string;
  EntityTypes?: string[];
  Relationships?: { Type?: string; Ids?: string[] }[];
};

export type TextractTable = {
  name: string;
  page: number;
  rows: string[][];
};

export type TextractExtraction = {
  blocks: number;
  tables: TextractTable[];
  forms: [string, string, number][];
  lines: [number, string, number | string][];
  sheets: XlsxSheet[];
  csvColumns: string[];
  csvRows: XlsxValue[][];
};

function asBlock(value: unknown): TextractBlock | null {
  return isRecord(value) ? (value as TextractBlock) : null;
}

function relationshipIds(block: TextractBlock, type: string) {
  return (block.Relationships ?? [])
    .filter((relationship) => relationship.Type === type)
    .flatMap((relationship) => relationship.Ids ?? []);
}

function blockText(block: TextractBlock, byId: Map<string, TextractBlock>): string {
  if (block.BlockType === "WORD" || block.BlockType === "LINE") {
    return String(block.Text ?? "");
  }
  if (block.BlockType === "SELECTION_ELEMENT") {
    return block.SelectionStatus === "SELECTED" ? "[X]" : "[ ]";
  }

  return relationshipIds(block, "CHILD")
    .map((id) => byId.get(id))
    .filter((child): child is TextractBlock => Boolean(child))
    .map((child) => blockText(child, byId))
    .filter(Boolean)
    .join(" ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function collectBlocks(documents: unknown[]) {
  return documents.flatMap((document) => {
    if (isRecord(document) && Array.isArray(document.Blocks)) {
      return document.Blocks.map(asBlock).filter(
        (block): block is TextractBlock => Boolean(block),
      );
    }
    if (Array.isArray(document)) {
      return document.map(asBlock).filter(
        (block): block is TextractBlock => Boolean(block),
      );
    }
    return [];
  });
}

function extractTables(blocks: TextractBlock[], byId: Map<string, TextractBlock>) {
  return blocks
    .filter((block) => block.BlockType === "TABLE")
    .map((table, tableIndex): TextractTable => {
      const cells = relationshipIds(table, "CHILD")
        .map((id) => byId.get(id))
        .filter(
          (block): block is TextractBlock =>
            Boolean(block) && block?.BlockType === "CELL",
        );
      const rowCount = Math.max(
        0,
        ...cells.map((cell) => (cell.RowIndex ?? 1) + (cell.RowSpan ?? 1) - 1),
      );
      const columnCount = Math.max(
        0,
        ...cells.map(
          (cell) => (cell.ColumnIndex ?? 1) + (cell.ColumnSpan ?? 1) - 1,
        ),
      );
      const rows = Array.from({ length: rowCount }, () =>
        Array.from({ length: columnCount }, () => ""),
      );

      for (const cell of cells) {
        const row = Math.max((cell.RowIndex ?? 1) - 1, 0);
        const column = Math.max((cell.ColumnIndex ?? 1) - 1, 0);
        rows[row][column] = blockText(cell, byId);
      }

      const page = Number(table.Page ?? 1);
      return {
        name: `Table ${tableIndex + 1} (p${page})`,
        page,
        rows,
      };
    });
}

function extractForms(blocks: TextractBlock[], byId: Map<string, TextractBlock>) {
  return blocks
    .filter(
      (block) =>
        block.BlockType === "KEY_VALUE_SET" &&
        block.EntityTypes?.includes("KEY"),
    )
    .map((keyBlock): [string, string, number] => {
      const valueBlock = relationshipIds(keyBlock, "VALUE")
        .map((id) => byId.get(id))
        .find(Boolean);
      return [
        blockText(keyBlock, byId),
        valueBlock ? blockText(valueBlock, byId) : "",
        Number(keyBlock.Page ?? valueBlock?.Page ?? 1),
      ];
    })
    .filter(([key]) => Boolean(key));
}

export function extractTextractDocument(documents: unknown[]): TextractExtraction {
  const blocks = collectBlocks(documents);
  if (blocks.length === 0) {
    throw new Error("No Textract Blocks were found.");
  }

  const byId = new Map(
    blocks.flatMap((block) => (block.Id ? [[block.Id, block] as const] : [])),
  );
  const tables = extractTables(blocks, byId);
  const forms = extractForms(blocks, byId);
  const lines: [number, string, number | string][] = blocks
    .filter((block) => block.BlockType === "LINE" && block.Text)
    .map((block) => [
      Number(block.Page ?? 1),
      String(block.Text),
      typeof block.Confidence === "number" ? block.Confidence : "",
    ]);
  const sheets: XlsxSheet[] = tables.map((table) => ({
    name: table.name,
    headers: table.rows[0]?.map((_cell, index) => `Column ${index + 1}`) ?? ["Column 1"],
    rows: table.rows,
  }));

  if (forms.length > 0) {
    sheets.push({ name: "Forms", headers: ["Key", "Value", "Page"], rows: forms });
  }
  if (lines.length > 0) {
    sheets.push({
      name: "Text Lines",
      headers: ["Page", "Text", "Confidence"],
      rows: lines,
    });
  }

  const maxColumns = Math.max(0, ...tables.map((table) => table.rows[0]?.length ?? 0));
  const csvColumns = [
    "table",
    "page",
    ...Array.from({ length: maxColumns }, (_unused, index) => `column_${index + 1}`),
  ];
  const csvRows = tables.flatMap((table, tableIndex) =>
    table.rows.map((row) => [tableIndex + 1, table.page, ...row]),
  );

  if (sheets.length === 0) {
    throw new Error("No tables, forms, or text lines were found in the Textract response.");
  }

  return { blocks: blocks.length, tables, forms, lines, sheets, csvColumns, csvRows };
}

export function parseTextractText(text: string) {
  return extractTextractDocument(parseJsonOrJsonLines(text));
}
