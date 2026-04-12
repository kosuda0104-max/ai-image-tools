import { describe, expect, it } from "vitest";
import { buildSeoFallbackContent } from "@/src/lib/seo-tool-content";

describe("buildSeoFallbackContent", () => {
  it("builds conversion fallback content for Japanese tools", () => {
    const result = buildSeoFallbackContent({
      title: "GIFをPNGに変換",
      description: "GIF画像をPNG形式に変換します。",
      relatedTools: [{ name: "画像圧縮", href: "/tools/image-compress" }],
    });

    expect(result.comparisonTitle).toContain("GIF");
    expect(result.relatedToolsTitle).toBe("あわせて使いやすい関連ツール");
    expect(result.contentSections.length).toBeGreaterThan(0);
  });

  it("builds editing fallback content for English tools", () => {
    const result = buildSeoFallbackContent({
      title: "Rotate Image",
      description: "Rotate an image by 90, 180, or 270 degrees.",
      relatedTools: [{ name: "Image Compress", href: "/en/tools/image-compress" }],
    });

    expect(result.comparisonTitle).toContain("workflow");
    expect(result.listSections[0].items.length).toBeGreaterThan(0);
  });

  it("builds pdf fallback content", () => {
    const result = buildSeoFallbackContent({
      title: "Split PDF",
      description: "Extract only selected pages from a PDF.",
      relatedTools: [],
    });

    expect(result.comparisonTitle).toContain("PDF");
    expect(result.contentSections[0].title).toContain("PDF");
  });
});
