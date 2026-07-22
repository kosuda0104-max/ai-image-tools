import {
  isRecord,
  parseJsonOrJsonLines,
  type TabularData,
  recordsToTable,
} from "@/src/lib/aws-common";

const ATTRIBUTE_TYPES = new Set([
  "S",
  "N",
  "B",
  "BOOL",
  "NULL",
  "SS",
  "NS",
  "BS",
  "L",
  "M",
]);

function isAttributeValue(value: unknown) {
  if (!isRecord(value)) return false;
  const keys = Object.keys(value);
  return keys.length === 1 && ATTRIBUTE_TYPES.has(keys[0]);
}

function isAttributeMap(value: unknown): value is Record<string, unknown> {
  return (
    isRecord(value) &&
    Object.keys(value).length > 0 &&
    Object.values(value).every(isAttributeValue)
  );
}

export function unmarshallDynamoValue(value: unknown): unknown {
  if (!isRecord(value)) return value;

  if ("S" in value) return String(value.S ?? "");
  if ("N" in value) return String(value.N ?? "");
  if ("B" in value) return String(value.B ?? "");
  if ("BOOL" in value) return Boolean(value.BOOL);
  if ("NULL" in value) return null;
  if ("SS" in value) return Array.isArray(value.SS) ? value.SS.map(String) : [];
  if ("NS" in value) return Array.isArray(value.NS) ? value.NS.map(String) : [];
  if ("BS" in value) return Array.isArray(value.BS) ? value.BS.map(String) : [];
  if ("L" in value) {
    return Array.isArray(value.L) ? value.L.map(unmarshallDynamoValue) : [];
  }
  if ("M" in value) return unmarshallDynamoMap(value.M);

  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [key, unmarshallDynamoValue(child)]),
  );
}

export function unmarshallDynamoMap(value: unknown) {
  if (!isRecord(value)) return {};
  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [key, unmarshallDynamoValue(child)]),
  );
}

function normalizeDynamoRecord(record: unknown): unknown {
  if (!isRecord(record)) return record;

  if (isAttributeMap(record.Item)) {
    return unmarshallDynamoMap(record.Item);
  }

  const isIncremental = ["Keys", "NewImage", "OldImage", "Metadata"].some(
    (key) => key in record,
  );
  if (isIncremental) {
    return Object.fromEntries(
      Object.entries(record).map(([key, value]) => [
        key,
        isAttributeMap(value) ? unmarshallDynamoMap(value) : value,
      ]),
    );
  }

  if (isAttributeMap(record)) {
    return unmarshallDynamoMap(record);
  }

  return record;
}

export type DynamoConversion = {
  records: unknown[];
  table: TabularData;
};

export function parseDynamoDbText(text: string): DynamoConversion {
  const documents = parseJsonOrJsonLines(text);
  const records = documents.flatMap((document) => {
    if (isRecord(document) && Array.isArray(document.Items)) {
      return document.Items.map(normalizeDynamoRecord);
    }
    return [normalizeDynamoRecord(document)];
  });

  if (records.length === 0) {
    throw new Error("No DynamoDB items were found.");
  }

  return { records, table: recordsToTable(records) };
}
