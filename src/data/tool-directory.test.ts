import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { homePageContent } from "@/src/data/home-page";
import {
  getAllToolItems,
  TOOL_COUNT,
} from "@/src/data/tool-directory";
import { toolsPageContent } from "@/src/data/tools/tools-page";

const newSlugs = [
  "image-background-transparent",
  "parquet-viewer",
  "csv-delimiter-converter",
  "jsonl-to-csv",
  "tiff-to-pdf",
  "avif-to-webp",
  "dynamodb-json-converter",
  "textract-json-to-excel",
  "cloudtrail-log-to-csv",
  "s3-inventory-viewer",
  "cloudwatch-logs-converter",
  "transcribe-json-to-srt",
] as const;

describe("tool directory", () => {
  it("contains the intentional number of unique tools in both locales", () => {
    const ja = getAllToolItems("ja");
    const en = getAllToolItems("en");

    expect(TOOL_COUNT).toBe(67);
    expect(ja).toHaveLength(TOOL_COUNT);
    expect(en).toHaveLength(TOOL_COUNT);
    expect(new Set(ja.map((tool) => tool.slug)).size).toBe(TOOL_COUNT);
    expect(en.map((tool) => tool.slug)).toEqual(ja.map((tool) => tool.slug));
  });

  it.each(["ja", "en"] as const)(
    "matches every %s tool route and its metadata slug",
    (locale) => {
      const routeRoot = join(
        process.cwd(),
        "app",
        locale === "ja" ? "(ja)" : "(en)",
        ...(locale === "ja" ? ["tools"] : ["en", "tools"]),
      );
      const routeSlugs = readdirSync(routeRoot, { withFileTypes: true })
        .filter(
          (entry) =>
            entry.isDirectory() &&
            existsSync(join(routeRoot, entry.name, "page.tsx")),
        )
        .map((entry) => {
          const page = readFileSync(
            join(routeRoot, entry.name, "page.tsx"),
            "utf8",
          );
          expect(page).toMatch(
            new RegExp(`slug:\\s*["']${entry.name}["']`),
          );
          expect(page).toMatch(new RegExp(`locale:\\s*["']${locale}["']`));
          return entry.name;
        })
        .sort();
      const registeredSlugs = getAllToolItems(locale)
        .map((tool) => tool.slug)
        .sort();

      expect(routeSlugs).toHaveLength(TOOL_COUNT);
      expect(routeSlugs).toEqual(registeredSlugs);
    },
  );

  it.each(["ja", "en"] as const)(
    "lists every %s tool in exactly one directory category",
    (locale) => {
      const categorizedSlugs = toolsPageContent[locale].categories.flatMap(
        (category) =>
          category.tools.map((tool) => tool.href.split("/").at(-1)),
      );
      const registeredSlugs = getAllToolItems(locale)
        .map((tool) => tool.slug)
        .sort();

      expect(categorizedSlugs).toHaveLength(TOOL_COUNT);
      expect(new Set(categorizedSlugs).size).toBe(TOOL_COUNT);
      expect(categorizedSlugs.sort()).toEqual(registeredSlugs);
    },
  );

  it("uses the registered count in homepage and directory copy", () => {
    expect(homePageContent.ja.stats[0].value).toBe(`${TOOL_COUNT}種類`);
    expect(homePageContent.en.stats[0].value).toBe(`${TOOL_COUNT} Tools`);
    expect(toolsPageContent.ja.hero.description).toContain(`${TOOL_COUNT}種類`);
    expect(toolsPageContent.en.hero.description).toContain(`${TOOL_COUNT} tools`);
  });

  it.each(newSlugs)("registers %s with localized URLs", (slug) => {
    const ja = getAllToolItems("ja").find((tool) => tool.slug === slug);
    const en = getAllToolItems("en").find((tool) => tool.slug === slug);

    expect(ja?.href).toBe(`/tools/${slug}`);
    expect(en?.href).toBe(`/en/tools/${slug}`);
    expect(ja?.name).toBeTruthy();
    expect(en?.name).toBeTruthy();
  });
});
