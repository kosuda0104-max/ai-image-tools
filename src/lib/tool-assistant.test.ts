import { describe, expect, it } from "vitest";
import { getAllToolItems } from "@/src/data/tool-directory";
import { buildToolAssistantReply } from "@/src/lib/tool-assistant";

describe("tool assistant replies", () => {
  it("returns at most three tools and a guide for a specific problem", () => {
    const reply = buildToolAssistantReply(
      getAllToolItems("ja"),
      "iPhoneの写真がWindowsで開けない",
      "ja",
    );

    expect(reply.kind).toBe("recommendations");
    if (reply.kind !== "recommendations") return;

    expect(reply.recommendations[0].slug).toBe("heic-to-jpg");
    expect(reply.recommendations).toHaveLength(3);
    expect(reply.guide?.href).toBe("/guides/heic-cannot-open-windows");
  });

  it("asks one concrete follow-up for a vague request", () => {
    const reply = buildToolAssistantReply(
      getAllToolItems("ja"),
      "画像を変換したい",
      "ja",
    );

    expect(reply).toEqual({
      kind: "clarification",
      message: expect.stringContaining("元のファイル形式"),
    });
  });

  it("returns English links on the English site", () => {
    const reply = buildToolAssistantReply(
      getAllToolItems("en"),
      "Parquet to CSV",
      "en",
    );

    expect(reply.kind).toBe("recommendations");
    if (reply.kind !== "recommendations") return;

    expect(reply.recommendations[0].slug).toBe("parquet-to-csv");
    expect(reply.guide?.href).toBe("/en/guides/parquet-csv-workflows");
  });
});
