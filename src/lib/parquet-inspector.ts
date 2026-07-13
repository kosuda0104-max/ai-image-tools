import type { FileMetaData, SchemaElement, SchemaTree } from "hyparquet";

export type ParquetSchemaRow = {
  path: string;
  physicalType: string;
  logicalType: string;
  repetition: string;
};

function logicalTypeLabel(element: SchemaElement) {
  if (element.logical_type) {
    if (element.logical_type.type === "DECIMAL") {
      return `DECIMAL(${element.logical_type.precision}, ${element.logical_type.scale})`;
    }
    if (
      element.logical_type.type === "TIME" ||
      element.logical_type.type === "TIMESTAMP"
    ) {
      return `${element.logical_type.type}(${element.logical_type.unit})`;
    }
    if (element.logical_type.type === "INTEGER") {
      return `${element.logical_type.isSigned ? "INT" : "UINT"}${element.logical_type.bitWidth}`;
    }
    return element.logical_type.type;
  }

  return element.converted_type ?? "-";
}

export function flattenParquetSchema(root: SchemaTree): ParquetSchemaRow[] {
  const output: ParquetSchemaRow[] = [];

  const visit = (node: SchemaTree) => {
    if (node !== root) {
      output.push({
        path: node.path.length > 0 ? node.path.join(".") : node.element.name,
        physicalType: node.element.type ?? "GROUP",
        logicalType: logicalTypeLabel(node.element),
        repetition: node.element.repetition_type ?? "-",
      });
    }
    node.children.forEach(visit);
  };

  visit(root);
  return output;
}

export function getParquetCompressionCodecs(metadata: FileMetaData) {
  return Array.from(
    new Set(
      metadata.row_groups.flatMap((group) =>
        group.columns
          .map((column) => column.meta_data?.codec)
          .filter((codec): codec is NonNullable<typeof codec> => Boolean(codec)),
      ),
    ),
  );
}

export function formatParquetCell(value: unknown) {
  if (value === null || value === undefined) return "";
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (value instanceof Uint8Array) return `[${value.byteLength} bytes]`;
  if (typeof value === "object") {
    return JSON.stringify(value, (_key, child) =>
      typeof child === "bigint" ? child.toString() : child,
    );
  }
  return String(value);
}
