import { describe, expect, it } from "vitest";
import { getGuide } from "@/src/data/guides";
import { getRelatedGuides } from "@/src/data/guide-related-guides";
import { buildGuideArticleJsonLd } from "@/src/lib/guide-seo";

const TARGET_GUIDES = [
  "heic-cannot-open-windows",
  "csv-encoding-fix",
  "what-is-avif",
] as const;

describe.each(["ja", "en"] as const)("priority guides (%s)", (locale) => {
  it.each(TARGET_GUIDES)("keeps %s current and source-backed", (slug) => {
    const guide = getGuide(locale, slug);

    expect(guide).toBeDefined();
    expect(guide?.updatedAt).toBe("2026-07-14");
    expect(guide?.sources?.length).toBeGreaterThan(0);
    expect(guide?.sources?.every((source) => source.href.startsWith("https://"))).toBe(true);

    const jsonLd = buildGuideArticleJsonLd(guide!, locale);
    expect(jsonLd.dateModified).toBe("2026-07-14");
    expect(jsonLd.citation).toEqual(guide?.sources?.map((source) => source.href));
  });

  it("answers each target symptom with distinct content", () => {
    const heic = getGuide(locale, "heic-cannot-open-windows");
    const csv = getGuide(locale, "csv-encoding-fix");
    const avif = getGuide(locale, "what-is-avif");

    expect(heic?.sections.some((section) => /30/.test(section.title))).toBe(true);
    expect(csv?.sections.some((section) => /症状|symptom/i.test(section.title))).toBe(true);
    expect(avif?.sections.some((section) => /拡張子|extension/i.test(section.title))).toBe(true);
  });
});

describe("HEIC guide cluster", () => {
  it.each(["ja", "en"] as const)(
    "links the Windows and iPhone/PDF guides both ways (%s)",
    (locale) => {
      const windowsLinks = getRelatedGuides(locale, "heic-cannot-open-windows");
      const pdfLinks = getRelatedGuides(locale, "iphone-photos-to-pdf");

      expect(windowsLinks.map((guide) => guide.slug)).toContain("iphone-photos-to-pdf");
      expect(pdfLinks.map((guide) => guide.slug)).toContain("heic-cannot-open-windows");
    },
  );
});
