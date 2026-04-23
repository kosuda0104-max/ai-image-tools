const JAPANESE_TEXT_PATTERN = /[ぁ-ヿ㐀-龯]/;

export const TOOL_CONTENT_LAST_UPDATED = "2026-04-13";

export function isJapaneseText(value: string): boolean {
  return JAPANESE_TEXT_PATTERN.test(value);
}

export function formatToolUpdatedLabel(title: string): string {
  if (isJapaneseText(title)) {
    return `最終更新: ${TOOL_CONTENT_LAST_UPDATED}`;
  }

  return `Last updated: ${TOOL_CONTENT_LAST_UPDATED}`;
}

export function buildToolKeywords({
  locale,
  slug,
  title,
}: {
  locale: "ja" | "en";
  slug: string;
  title: string;
}): string[] {
  const words = slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.toUpperCase());

  if (locale === "ja") {
    return Array.from(
      new Set([
        title,
        `${title} 無料`,
        `${title} オンライン`,
        `${title} ブラウザ`,
        `${words.join(" ")} 変換`,
        "画像 変換 ツール",
        "PDF ツール",
      ]),
    );
  }

  return Array.from(
    new Set([
      title,
      `${title} online`,
      `${title} free`,
      `${title} browser tool`,
      `${words.join(" ")} converter`,
      "image converter online",
      "pdf tools online",
    ]),
  );
}
