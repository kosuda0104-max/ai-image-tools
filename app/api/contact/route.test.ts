import { describe, expect, it } from "vitest";
import { buildContactEmail } from "@/app/api/contact/route";

describe("buildContactEmail", () => {
  it("builds localized english contact email content", () => {
    const result = buildContactEmail({
      locale: "en",
      name: "Taylor",
      email: "t@example.com",
      tool: "PNG to JPG",
      message: "Need help",
    });

    expect(result).not.toBeNull();
    expect(result?.subject).toBe("Contact form submission");
    expect(result?.text).toContain("Tool: PNG to JPG");
  });

  it("builds localized japanese contact email content", () => {
    const result = buildContactEmail({
      locale: "ja",
      name: "太郎",
      email: "t@example.com",
      message: "助けてください",
    });

    expect(result).not.toBeNull();
    expect(result?.subject).toBe("お問い合わせフォーム送信");
    expect(result?.text).toContain("対象ツール: 未指定");
  });

  it("returns null for invalid payloads", () => {
    expect(buildContactEmail({ locale: "en", name: "", email: "", message: "" })).toBeNull();
  });
});
