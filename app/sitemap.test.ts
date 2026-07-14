import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

const PRIORITY_GUIDE_PATHS = [
  "/guides/heic-cannot-open-windows",
  "/guides/csv-encoding-fix",
  "/guides/what-is-avif",
  "/en/guides/heic-cannot-open-windows",
  "/en/guides/csv-encoding-fix",
  "/en/guides/what-is-avif",
];

describe("sitemap", () => {
  it("publishes the current modified date for priority guides in both locales", () => {
    const entries = sitemap();

    for (const path of PRIORITY_GUIDE_PATHS) {
      const entry = entries.find(({ url }) => new URL(url).pathname === path);
      expect(entry, path).toBeDefined();
      expect(entry?.lastModified).toEqual(new Date("2026-07-14"));
    }
  });

  it("does not emit duplicate URLs", () => {
    const urls = sitemap().map(({ url }) => url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
