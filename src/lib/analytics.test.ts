import { afterEach, describe, expect, it, vi } from "vitest";

async function loadAnalytics(env: Record<string, string>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) {
    vi.stubEnv(key, value);
  }
  return import("@/src/lib/analytics");
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("CF_BEACON_TOKEN", () => {
  const token = "0123456789abcdef0123456789abcdef";

  it("accepts a plain dashboard token", async () => {
    const analytics = await loadAnalytics({
      NEXT_PUBLIC_CF_BEACON_TOKEN: token,
    });

    expect(analytics.CF_BEACON_TOKEN).toBe(token);
    expect(analytics.isAnalyticsEnabled).toBe(true);
  });

  it("strips quotes and escape sequences picked up from shells", async () => {
    const analytics = await loadAnalytics({
      NEXT_PUBLIC_CF_BEACON_TOKEN: String.raw` "${token}" \r\n`,
    });

    expect(analytics.CF_BEACON_TOKEN).toBe(token);
  });

  it("normalises an uppercase token", async () => {
    const analytics = await loadAnalytics({
      NEXT_PUBLIC_CF_BEACON_TOKEN: token.toUpperCase(),
    });

    expect(analytics.CF_BEACON_TOKEN).toBe(token);
  });

  it("rejects a token that is not 32 hex characters", async () => {
    const analytics = await loadAnalytics({
      NEXT_PUBLIC_CF_BEACON_TOKEN: "abc123",
    });

    expect(analytics.CF_BEACON_TOKEN).toBe("");
    expect(analytics.isAnalyticsEnabled).toBe(false);
  });

  it("stays disabled when the token is unset so previews send no beacon", async () => {
    const analytics = await loadAnalytics({
      NEXT_PUBLIC_CF_BEACON_TOKEN: "",
    });

    expect(analytics.isAnalyticsEnabled).toBe(false);
  });
});
