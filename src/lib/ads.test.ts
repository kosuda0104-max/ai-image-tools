import { afterEach, describe, expect, it, vi } from "vitest";

async function loadAds(env: Record<string, string>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) {
    vi.stubEnv(key, value);
  }
  return import("@/src/lib/ads");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("AD_SLOTS", () => {
  it("strips escape sequences that reached production and broke ad serving", async () => {
    const { AD_SLOTS } = await loadAds({
      NEXT_PUBLIC_AD_SLOT_GUIDE: String.raw`7926623874\r`,
    });

    expect(AD_SLOTS.guideInArticle).toBe("7926623874");
    expect(AD_SLOTS.home).toBe("7926623874");
  });

  it("strips surrounding whitespace and quotes", async () => {
    const { AD_SLOTS } = await loadAds({
      NEXT_PUBLIC_AD_SLOT_GUIDE: ' "7926623874" \r\n',
    });

    expect(AD_SLOTS.guideInArticle).toBe("7926623874");
  });

  it("falls back through guide → tool → directory → home", async () => {
    const { AD_SLOTS } = await loadAds({
      NEXT_PUBLIC_AD_SLOT_GUIDE: "1111111111",
      NEXT_PUBLIC_AD_SLOT_TOOL: "2222222222",
    });

    expect(AD_SLOTS.guideInArticle).toBe("1111111111");
    expect(AD_SLOTS.toolAfterTool).toBe("2222222222");
    expect(AD_SLOTS.directory).toBe("2222222222");
    expect(AD_SLOTS.home).toBe("2222222222");
  });

  it("yields empty slots when nothing is configured, so AdUnit renders nothing", async () => {
    const { AD_SLOTS } = await loadAds({ NEXT_PUBLIC_AD_SLOT_GUIDE: "" });

    expect(AD_SLOTS.guideInArticle).toBe("");
    expect(AD_SLOTS.home).toBe("");
  });
});
