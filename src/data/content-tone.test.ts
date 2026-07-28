import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const PUBLIC_COPY_ROOTS = [
  "src/data",
  "src/lib/seo-tool-content.ts",
  "app/(ja)",
  "app/(en)",
];

const SOURCE_EXTENSIONS = /\.(ts|tsx)$/;
const AI_STYLE_PATTERNS = [
  /解説します/g,
  /紹介します/g,
  /解説していきます/g,
  /紹介していきます/g,
  /いかがでしたか/g,
  /ぜひご活用/g,
  /幅広いニーズ/g,
  /最適なソリューション/g,
  /強力なツール/g,
  /——/g,
  /\bIn today's\b/gi,
  /\bWhether you're\b/gi,
  /\bgame[- ]changer\b/gi,
  /\bseamless(?:ly)?\b/gi,
  /\beffortlessly\b/gi,
  /\bunlock(?:ing|s|ed)?\b/gi,
  /\bdelve\b/gi,
];

function sourceFiles(path: string): string[] {
  if (SOURCE_EXTENSIONS.test(path)) return path.includes(".test.") ? [] : [path];

  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const child = join(path, entry.name);
    return entry.isDirectory()
      ? sourceFiles(child)
      : SOURCE_EXTENSIONS.test(child) && !child.includes(".test.")
        ? [child]
        : [];
  });
}

describe("public copy tone", () => {
  it("does not use stock AI-writing phrases", () => {
    const violations = PUBLIC_COPY_ROOTS.flatMap(sourceFiles).flatMap((file) => {
      const text = readFileSync(file, "utf8");
      return AI_STYLE_PATTERNS.flatMap((pattern) =>
        Array.from(text.matchAll(pattern), (match) => {
          const line = text.slice(0, match.index).split("\n").length;
          return `${file}:${line} ${match[0]}`;
        }),
      );
    });

    expect(violations).toEqual([]);
  });
});
