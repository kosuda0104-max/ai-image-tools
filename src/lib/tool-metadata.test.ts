import { describe, expect, it } from "vitest";
import { createToolMetadata } from "@/src/lib/tool-metadata";

const base = {
  slug: "csv-encoding-fix",
  jaTitle: "CSV文字化け修正",
  jaDescription: "説明",
  enTitle: "Fix CSV Encoding",
  enDescription: "Description",
  zhTwTitle: "修復 CSV 亂碼",
  zhTwDescription: "說明",
} as const;

describe("createToolMetadata", () => {
  it("uses the zh-TW canonical and locale for a translated tool", () => {
    const metadata = createToolMetadata({ ...base, locale: "zh-TW" });

    expect(metadata.alternates?.canonical).toBe(
      "https://ai-image-tools.com/zh-tw/tools/csv-encoding-fix",
    );
    expect(metadata.alternates?.languages?.["zh-TW"]).toBe(
      "https://ai-image-tools.com/zh-tw/tools/csv-encoding-fix",
    );
    expect(metadata.openGraph?.locale).toBe("zh_TW");
  });

  it("adds zh-TW to the Japanese counterpart of translated tools", () => {
    const metadata = createToolMetadata({ ...base, locale: "ja" });
    expect(metadata.alternates?.languages?.["zh-TW"]).toBeTruthy();
  });

  it("does not advertise zh-TW for tools that have not been translated", () => {
    const metadata = createToolMetadata({
      ...base,
      locale: "en",
      slug: "png-to-jpg",
    });
    expect(metadata.alternates?.languages?.["zh-TW"]).toBeUndefined();
  });
});
