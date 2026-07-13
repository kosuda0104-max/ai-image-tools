import type { FileMetaData, SchemaTree } from "hyparquet";
import { describe, expect, it } from "vitest";
import {
  flattenParquetSchema,
  formatParquetCell,
  getParquetCompressionCodecs,
} from "@/src/lib/parquet-inspector";

describe("Parquet inspection helpers", () => {
  it("flattens nested schema fields into dot paths", () => {
    const schema = {
      element: { name: "schema" },
      path: [],
      children: [
        {
          element: {
            name: "id",
            type: "INT64",
            repetition_type: "REQUIRED",
            logical_type: {
              type: "INTEGER",
              bitWidth: 64,
              isSigned: true,
            },
          },
          path: ["id"],
          children: [],
        },
        {
          element: { name: "user", repetition_type: "OPTIONAL" },
          path: ["user"],
          children: [
            {
              element: { name: "name", type: "BYTE_ARRAY", converted_type: "UTF8" },
              path: ["user", "name"],
              children: [],
            },
          ],
        },
      ],
    } as unknown as SchemaTree;

    expect(flattenParquetSchema(schema)).toEqual([
      {
        path: "id",
        physicalType: "INT64",
        logicalType: "INT64",
        repetition: "REQUIRED",
      },
      {
        path: "user",
        physicalType: "GROUP",
        logicalType: "-",
        repetition: "OPTIONAL",
      },
      {
        path: "user.name",
        physicalType: "BYTE_ARRAY",
        logicalType: "UTF8",
        repetition: "-",
      },
    ]);
  });

  it("returns unique compression codecs across row groups", () => {
    const metadata = {
      row_groups: [
        {
          columns: [
            { meta_data: { codec: "SNAPPY" } },
            { meta_data: { codec: "GZIP" } },
          ],
        },
        {
          columns: [
            { meta_data: { codec: "SNAPPY" } },
            { meta_data: undefined },
          ],
        },
      ],
    } as unknown as FileMetaData;

    expect(getParquetCompressionCodecs(metadata)).toEqual(["SNAPPY", "GZIP"]);
  });

  it("formats browser-unfriendly Parquet values for previews", () => {
    expect(formatParquetCell(BigInt(42))).toBe("42");
    expect(formatParquetCell(new Date("2026-07-13T00:00:00.000Z"))).toBe(
      "2026-07-13T00:00:00.000Z",
    );
    expect(formatParquetCell(new Uint8Array([1, 2, 3]))).toBe("[3 bytes]");
    expect(formatParquetCell({ count: BigInt(7) })).toBe('{"count":"7"}');
  });
});
