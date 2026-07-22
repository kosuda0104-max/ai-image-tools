import { gzipSync, strToU8 } from "fflate";
import { describe, expect, it } from "vitest";
import { decodeMaybeGzip } from "@/src/lib/aws-common";
import { parseDynamoDbText } from "@/src/lib/aws-dynamodb";
import { parseTextractText } from "@/src/lib/aws-textract";
import { parseCloudTrailText } from "@/src/lib/aws-cloudtrail";
import { parseCloudWatchText } from "@/src/lib/aws-cloudwatch";
import {
  mergeS3InventoryTables,
  parseS3InventoryCsv,
  parseS3InventoryManifest,
} from "@/src/lib/aws-s3-inventory";
import { parseTranscribeText } from "@/src/lib/aws-transcribe";

describe("AWS file helpers", () => {
  it("detects and decompresses gzip by magic bytes", () => {
    const bytes = gzipSync(strToU8('{"ok":true}'));
    expect(decodeMaybeGzip(bytes, "export.bin")).toBe('{"ok":true}');
  });
});

describe("DynamoDB conversion", () => {
  it("unmarshalls export JSONL without losing numeric precision", () => {
    const result = parseDynamoDbText(
      JSON.stringify({
        Item: {
          pk: { S: "USER#1" },
          balance: { N: "900719925474099312345" },
          active: { BOOL: true },
          profile: { M: { city: { S: "Tokyo" } } },
          tags: { SS: ["admin", "beta"] },
        },
      }),
    );

    expect(result.records[0]).toEqual({
      pk: "USER#1",
      balance: "900719925474099312345",
      active: true,
      profile: { city: "Tokyo" },
      tags: ["admin", "beta"],
    });
    expect(result.table.columns).toContain("profile.city");
  });

  it("preserves incremental export sections", () => {
    const result = parseDynamoDbText(
      JSON.stringify({
        Keys: { pk: { S: "A" } },
        NewImage: { count: { N: "2" } },
        Metadata: { WriteTimestampMicros: "123" },
      }),
    );
    expect(result.records[0]).toEqual({
      Keys: { pk: "A" },
      NewImage: { count: "2" },
      Metadata: { WriteTimestampMicros: "123" },
    });
  });
});

describe("Textract conversion", () => {
  it("reconstructs tables, forms, and selected elements from relationships", () => {
    const result = parseTextractText(
      JSON.stringify({
        Blocks: [
          { Id: "t1", BlockType: "TABLE", Page: 1, Relationships: [{ Type: "CHILD", Ids: ["c1", "c2"] }] },
          { Id: "c1", BlockType: "CELL", RowIndex: 1, ColumnIndex: 1, Relationships: [{ Type: "CHILD", Ids: ["w1"] }] },
          { Id: "c2", BlockType: "CELL", RowIndex: 1, ColumnIndex: 2, Relationships: [{ Type: "CHILD", Ids: ["s1"] }] },
          { Id: "w1", BlockType: "WORD", Text: "Approved" },
          { Id: "s1", BlockType: "SELECTION_ELEMENT", SelectionStatus: "SELECTED" },
          { Id: "k1", BlockType: "KEY_VALUE_SET", EntityTypes: ["KEY"], Page: 1, Relationships: [{ Type: "CHILD", Ids: ["wk"] }, { Type: "VALUE", Ids: ["v1"] }] },
          { Id: "v1", BlockType: "KEY_VALUE_SET", EntityTypes: ["VALUE"], Relationships: [{ Type: "CHILD", Ids: ["wv"] }] },
          { Id: "wk", BlockType: "WORD", Text: "Name" },
          { Id: "wv", BlockType: "WORD", Text: "Ada" },
          { Id: "l1", BlockType: "LINE", Page: 1, Text: "Approved Ada", Confidence: 99.5 },
        ],
      }),
    );

    expect(result.tables[0].rows).toEqual([["Approved", "[X]"]]);
    expect(result.forms).toEqual([["Name", "Ada", 1]]);
    expect(result.sheets.map((sheet) => sheet.name)).toEqual([
      "Table 1 (p1)",
      "Forms",
      "Text Lines",
    ]);
  });
});

describe("CloudTrail conversion", () => {
  it("expands Records and keeps nested request data as JSON", () => {
    const result = parseCloudTrailText(
      JSON.stringify({
        Records: [
          {
            eventTime: "2026-07-22T00:00:00Z",
            eventSource: "s3.amazonaws.com",
            eventName: "GetObject",
            userIdentity: { type: "IAMUser", arn: "arn:aws:iam::123:user/ada" },
            requestParameters: { bucketName: "demo" },
          },
        ],
      }),
      "trail.json.gz",
    );

    expect(result.normalized[0]).toMatchObject({
      eventName: "GetObject",
      "userIdentity.type": "IAMUser",
      requestParameters: '{"bucketName":"demo"}',
      sourceFile: "trail.json.gz",
    });
  });
});

describe("CloudWatch Logs conversion", () => {
  it("sorts exported lines and expands JSON messages", () => {
    const result = parseCloudWatchText(
      [
        '1753142402000 {"level":"error","requestId":"b"}',
        '1753142401000 {"level":"info","requestId":"a"}',
      ].join("\n"),
      "000000.gz",
    );

    expect(result.events.map((event) => event.timestamp)).toEqual([
      1753142401000,
      1753142402000,
    ]);
    expect(result.events[0]["message.level"]).toBe("info");
    expect(result.table.columns).toContain("message.requestId");
  });

  it("reads subscription payload logEvents", () => {
    const result = parseCloudWatchText(
      JSON.stringify({
        owner: "123",
        logGroup: "/aws/lambda/demo",
        logStream: "stream",
        logEvents: [{ id: "1", timestamp: 1753142400000, message: "started" }],
      }),
    );
    expect(result.events[0]).toMatchObject({
      logGroup: "/aws/lambda/demo",
      message: "started",
    });
  });
});

describe("S3 Inventory conversion", () => {
  it("uses manifest fileSchema for headerless CSV.GZ data", () => {
    const manifest = parseS3InventoryManifest(
      JSON.stringify({
        sourceBucket: "arn:aws:s3:::source",
        destinationBucket: "arn:aws:s3:::destination",
        fileFormat: "CSV",
        fileSchema: "Bucket, Key, Size, StorageClass",
        files: [{ key: "data/part-1.csv.gz", size: 100 }],
      }),
    );
    const first = parseS3InventoryCsv(
      'source,"folder/file,one.txt",12,STANDARD\n',
      manifest.fileSchema,
      "part-1.csv.gz",
    );
    const second = parseS3InventoryCsv(
      "source,second.txt,4,GLACIER\n",
      manifest.fileSchema,
      "part-2.csv.gz",
    );
    const merged = mergeS3InventoryTables([first, second]);

    expect(merged.columns).toEqual([
      "Bucket",
      "Key",
      "Size",
      "StorageClass",
      "_sourceFile",
    ]);
    expect(merged.rows[0]).toEqual([
      "source",
      "folder/file,one.txt",
      "12",
      "STANDARD",
      "part-1.csv.gz",
    ]);
    expect(merged.rows).toHaveLength(2);
  });
});

describe("Amazon Transcribe conversion", () => {
  it("creates SRT and VTT cues with punctuation and speaker labels", () => {
    const result = parseTranscribeText(
      JSON.stringify({
        results: {
          transcripts: [{ transcript: "Hello world. Next." }],
          speaker_labels: {
            segments: [{ speaker_label: "spk_0", items: [{ start_time: "0.00", speaker_label: "spk_0" }, { start_time: "1.20", speaker_label: "spk_0" }] }],
          },
          items: [
            { type: "pronunciation", start_time: "0.00", end_time: "0.50", alternatives: [{ content: "Hello" }] },
            { type: "pronunciation", start_time: "0.60", end_time: "1.00", alternatives: [{ content: "world" }] },
            { type: "punctuation", alternatives: [{ content: "." }] },
            { type: "pronunciation", start_time: "1.20", end_time: "1.70", alternatives: [{ content: "Next" }] },
            { type: "punctuation", alternatives: [{ content: "." }] },
          ],
        },
      }),
    );

    expect(result.cues.map((cue) => cue.text)).toEqual([
      "[spk_0] Hello world.",
      "[spk_0] Next.",
    ]);
    expect(result.srt).toContain("00:00:00,000 --> 00:00:01,000");
    expect(result.vtt.startsWith("WEBVTT")).toBe(true);
  });
});
