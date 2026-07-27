import { describe, expect, it } from "vitest";
import {
  buildToolFeedbackBlobPath,
  buildToolFeedbackEmail,
  parseToolFeedback,
} from "@/src/lib/tool-feedback";

const validPayload = {
  feedbackId: "feedback-12345678",
  event: "rating",
  status: "unresolved",
  locale: "ja",
  query: "iPhoneの写真がWindowsで開けない",
  recommendationSlugs: ["heic-to-jpg", "heic-to-png"],
  reason: "not_specified",
  comment: "",
  page: "/",
};

describe("tool assistant feedback", () => {
  it("normalizes an anonymous feedback record", () => {
    const record = parseToolFeedback(
      validPayload,
      new Date("2026-07-22T03:00:00.000Z"),
    );

    expect(record).toEqual({
      ...validPayload,
      createdAt: "2026-07-22T03:00:00.000Z",
    });
  });

  it("rejects malformed payloads and invalid detail events", () => {
    expect(parseToolFeedback({ ...validPayload, feedbackId: "short" })).toBeNull();
    expect(
      parseToolFeedback({
        ...validPayload,
        event: "detail",
        status: "resolved",
      }),
    ).toBeNull();
  });

  it("builds a structured email that can be exported later", () => {
    const record = parseToolFeedback(validPayload);
    expect(record).not.toBeNull();
    if (!record) return;

    const email = buildToolFeedbackEmail(record);
    expect(email.subject).toContain("未解決");
    expect(email.text).toContain('"recommendationSlugs"');
    expect(email.text).toContain('"heic-to-jpg"');
  });

  it("uses a private, date-based blob path for each event", () => {
    const record = parseToolFeedback(
      validPayload,
      new Date("2026-07-22T03:00:00.000Z"),
    );
    expect(record).not.toBeNull();
    if (!record) return;

    expect(buildToolFeedbackBlobPath(record)).toBe(
      "tool-feedback/2026-07-22/feedback-12345678-rating-20260722030000000.json",
    );
  });
});
