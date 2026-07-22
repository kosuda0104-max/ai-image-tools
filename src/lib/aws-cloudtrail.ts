import {
  isRecord,
  parseJsonOrJsonLines,
  recordsToTable,
  safeJsonStringify,
  type TabularData,
} from "@/src/lib/aws-common";

const PREFERRED_COLUMNS = [
  "eventTime",
  "eventSource",
  "eventName",
  "awsRegion",
  "sourceIPAddress",
  "userIdentity.type",
  "userIdentity.principalId",
  "userIdentity.arn",
  "errorCode",
  "errorMessage",
  "readOnly",
  "eventCategory",
  "eventType",
  "managementEvent",
  "recipientAccountId",
  "eventID",
  "sourceFile",
];

const JSON_COLUMNS = new Set([
  "requestParameters",
  "responseElements",
  "resources",
  "additionalEventData",
  "serviceEventDetails",
  "tlsDetails",
  "sessionCredentialFromConsole",
]);

export type CloudTrailConversion = {
  events: Record<string, unknown>[];
  normalized: Record<string, unknown>[];
  table: TabularData;
};

function eventDocuments(value: unknown) {
  if (isRecord(value) && Array.isArray(value.Records)) return value.Records;
  return [value];
}

function normalizeEvent(event: Record<string, unknown>, sourceFile: string) {
  const output: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(event)) {
    if (key === "userIdentity" && isRecord(value)) {
      for (const [identityKey, identityValue] of Object.entries(value)) {
        const column = `userIdentity.${identityKey}`;
        output[column] = isRecord(identityValue) || Array.isArray(identityValue)
          ? safeJsonStringify(identityValue)
          : identityValue;
      }
    } else if (JSON_COLUMNS.has(key) || Array.isArray(value) || isRecord(value)) {
      output[key] = safeJsonStringify(value);
    } else {
      output[key] = value;
    }
  }

  output.sourceFile = sourceFile;
  return output;
}

export function parseCloudTrailText(
  text: string,
  sourceFile = "cloudtrail.json",
): CloudTrailConversion {
  const events = parseJsonOrJsonLines(text)
    .flatMap(eventDocuments)
    .filter(isRecord);

  if (events.length === 0) {
    throw new Error("No CloudTrail records were found.");
  }

  const normalized = events.map((event) => normalizeEvent(event, sourceFile));
  return {
    events,
    normalized,
    table: recordsToTable(normalized, {
      preferredColumns: PREFERRED_COLUMNS,
      maxDepth: 1,
    }),
  };
}

export function mergeCloudTrailConversions(
  conversions: CloudTrailConversion[],
): CloudTrailConversion {
  const events = conversions.flatMap((conversion) => conversion.events);
  const normalized = conversions.flatMap((conversion) => conversion.normalized);
  if (events.length === 0) throw new Error("No CloudTrail records were found.");
  return {
    events,
    normalized,
    table: recordsToTable(normalized, {
      preferredColumns: PREFERRED_COLUMNS,
      maxDepth: 1,
    }),
  };
}
