import { describe, expect, it } from "vitest";
import robots from "@/app/robots";

describe("robots", () => {
  it("allows public pages, blocks APIs, and advertises the canonical sitemap", () => {
    expect(robots()).toEqual({
      rules: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/"],
        },
      ],
      sitemap: "https://ai-image-tools.com/sitemap.xml",
    });
  });
});
