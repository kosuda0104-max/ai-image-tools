import { describe, expect, it } from "vitest";
import { homePageContent } from "@/src/data/home-page";

const PRIORITY_GUIDES = [
  "what-is-avif",
  "heic-cannot-open-windows",
  "csv-encoding-fix",
  "what-is-webp",
  "jpg-vs-jpeg-difference",
  "crop-image-to-square",
];

describe.each(["ja", "en"] as const)("homepage problem paths (%s)", (locale) => {
  it("links every search-priority guide with descriptive copy", () => {
    const items = homePageContent[locale].problemGuidesSection.items;

    expect(items).toHaveLength(PRIORITY_GUIDES.length);
    expect(items.map((item) => item.href.split("/").at(-1))).toEqual(PRIORITY_GUIDES);
    expect(items.every((item) => item.title.length >= 10)).toBe(true);
    expect(items.every((item) => item.description.length >= 20)).toBe(true);
  });

  it("keeps localized links on the matching language path", () => {
    const items = homePageContent[locale].problemGuidesSection.items;

    expect(
      items.every((item) =>
        locale === "en" ? item.href.startsWith("/en/guides/") : item.href.startsWith("/guides/"),
      ),
    ).toBe(true);
  });
});
