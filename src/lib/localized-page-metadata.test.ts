import { describe, expect, it } from "vitest";
import { createLocalizedPageMetadata } from "@/src/lib/localized-page-metadata";

describe("createLocalizedPageMetadata", () => {
  it("uses the Japanese page as canonical and x-default", () => {
    const metadata = createLocalizedPageMetadata({
      locale: "ja",
      title: "ガイド",
      description: "説明",
      jaPath: "/guides",
      enPath: "/en/guides",
    });

    expect(metadata.alternates).toEqual({
      canonical: "https://ai-image-tools.com/guides",
      languages: {
        ja: "https://ai-image-tools.com/guides",
        en: "https://ai-image-tools.com/en/guides",
        "x-default": "https://ai-image-tools.com/guides",
      },
    });
  });

  it("uses the English page as canonical without changing x-default", () => {
    const metadata = createLocalizedPageMetadata({
      locale: "en",
      title: "Guides",
      description: "Description",
      jaPath: "/guides",
      enPath: "/en/guides",
    });

    expect(metadata.alternates?.canonical).toBe(
      "https://ai-image-tools.com/en/guides",
    );
    expect(metadata.alternates?.languages?.["x-default"]).toBe(
      "https://ai-image-tools.com/guides",
    );
  });
});
