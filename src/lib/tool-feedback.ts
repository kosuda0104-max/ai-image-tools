export type ToolFeedbackStatus = "resolved" | "unresolved";
export type ToolFeedbackEvent = "rating" | "detail";
export type ToolFeedbackReason =
  | "not_specified"
  | "no_matching_tool"
  | "instructions_unclear"
  | "conversion_failed"
  | "other";

export type ToolFeedbackRecord = {
  feedbackId: string;
  createdAt: string;
  event: ToolFeedbackEvent;
  status: ToolFeedbackStatus;
  locale: "ja" | "en";
  query: string;
  recommendationSlugs: string[];
  reason: ToolFeedbackReason;
  comment: string;
  page: string;
};

const statuses = new Set<ToolFeedbackStatus>(["resolved", "unresolved"]);
const events = new Set<ToolFeedbackEvent>(["rating", "detail"]);
const reasons = new Set<ToolFeedbackReason>([
  "not_specified",
  "no_matching_tool",
  "instructions_unclear",
  "conversion_failed",
  "other",
]);
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const idPattern = /^[a-zA-Z0-9-]{8,80}$/;

function stringValue(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

export function parseToolFeedback(
  input: unknown,
  now = new Date(),
): ToolFeedbackRecord | null {
  if (!input || typeof input !== "object") return null;

  const payload = input as Record<string, unknown>;
  const feedbackId = stringValue(payload.feedbackId, 80);
  const query = stringValue(payload.query, 300);
  const status = payload.status as ToolFeedbackStatus;
  const event = payload.event as ToolFeedbackEvent;
  const locale = payload.locale === "en" ? "en" : "ja";
  const reason = (payload.reason || "not_specified") as ToolFeedbackReason;
  const comment = stringValue(payload.comment, 600);
  const page = stringValue(payload.page, 200);

  const recommendationSlugs = Array.isArray(payload.recommendationSlugs)
    ? payload.recommendationSlugs
        .filter(
          (slug): slug is string =>
            typeof slug === "string" && slugPattern.test(slug),
        )
        .slice(0, 3)
    : [];

  if (
    !idPattern.test(feedbackId) ||
    !query ||
    !statuses.has(status) ||
    !events.has(event) ||
    !reasons.has(reason) ||
    (page && !page.startsWith("/"))
  ) {
    return null;
  }

  if (status === "resolved" && reason !== "not_specified") return null;
  if (event === "detail" && status !== "unresolved") return null;

  return {
    feedbackId,
    createdAt: now.toISOString(),
    event,
    status,
    locale,
    query,
    recommendationSlugs,
    reason,
    comment,
    page,
  };
}

export function buildToolFeedbackEmail(record: ToolFeedbackRecord) {
  const statusLabel =
    record.status === "resolved" ? "解決" : "未解決";
  const eventLabel = record.event === "detail" ? "詳細" : "評価";

  return {
    subject: `[Tool Assistant] ${statusLabel}${eventLabel}: ${record.query.slice(0, 36)}`,
    text: [
      "Tool Assistant feedback",
      "",
      JSON.stringify(record, null, 2),
    ].join("\n"),
  };
}

export function buildToolFeedbackBlobPath(record: ToolFeedbackRecord) {
  const day = record.createdAt.slice(0, 10);
  const timestamp = record.createdAt.replace(/\D/g, "");
  return `tool-feedback/${day}/${record.feedbackId}-${record.event}-${timestamp}.json`;
}
