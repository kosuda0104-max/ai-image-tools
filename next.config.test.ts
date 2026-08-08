import { describe, expect, it } from "vitest";
import nextConfig from "./next.config";

describe("locale response headers", () => {
  it("declares the English content language for every English route", async () => {
    const headers = await nextConfig.headers?.();
    expect(headers).toContainEqual({
      source: "/en/:path*",
      headers: [{ key: "Content-Language", value: "en" }],
    });
  });

  it("declares the Traditional Chinese content language for translated routes", async () => {
    const headers = await nextConfig.headers?.();
    expect(headers).toContainEqual({
      source: "/zh-tw/:path*",
      headers: [{ key: "Content-Language", value: "zh-TW" }],
    });
  });
});
