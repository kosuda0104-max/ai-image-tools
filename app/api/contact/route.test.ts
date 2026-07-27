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
    expect(
      buildContactEmail({
        locale: "en",
        name: "Taylor",
        email: "not-an-email",
        message: "Need help",
      }),
    ).toBeNull();
  });

  it("caps fields before building the outbound message", () => {
    const result = buildContactEmail({
      locale: "en",
      name: "N".repeat(120),
      email: "t@example.com",
      tool: "T".repeat(180),
      message: "M".repeat(5_000),
    });

    expect(result?.text).toContain(`Name: ${"N".repeat(80)}`);
    expect(result?.text).toContain(`Tool: ${"T".repeat(120)}`);
    expect(result?.text).not.toContain("M".repeat(4_001));
  });
});
