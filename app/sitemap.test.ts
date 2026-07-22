import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

const PRIORITY_GUIDES = {
  "/guides/heic-cannot-open-windows": "2026-07-14",
  "/guides/csv-encoding-fix": "2026-07-14",
  "/en/guides/heic-cannot-open-windows": "2026-07-14",
  "/en/guides/csv-encoding-fix": "2026-07-14",
  "/guides/what-is-avif": "2026-07-22",
  "/en/guides/what-is-avif": "2026-07-22",
  "/guides/png-transparency-basics": "2026-07-22",
  "/guides/what-is-parquet": "2026-07-22",
  "/en/guides/parquet-csv-workflows": "2026-07-22",
} as const;

describe("sitemap", () => {
  it("publishes the current modified date for priority guides in both locales", () => {
    const entries = sitemap();

    for (const [path, lastModified] of Object.entries(PRIORITY_GUIDES)) {
      const entry = entries.find(({ url }) => new URL(url).pathname === path);
      expect(entry, path).toBeDefined();
      expect(entry?.lastModified).toEqual(new Date(lastModified));
    }
  });

  it("does not emit duplicate URLs", () => {
    const urls = sitemap().map(({ url }) => url);
    expect(new Set(urls).size).toBe(urls.length);
  });
});
