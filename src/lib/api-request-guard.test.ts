import { beforeEach, describe, expect, it } from "vitest";
import {
  guardApiRequest,
  readJsonBody,
  resetApiRateLimitsForTests,
} from "@/src/lib/api-request-guard";

function makeRequest(
  body = "{}",
  headers: Record<string, string> = {},
) {
  return new Request("https://ai-image-tools.com/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://ai-image-tools.com",
      "x-forwarded-for": "203.0.113.10",
      ...headers,
    },
    body,
  });
}

const options = {
  limit: 2,
  windowMs: 60_000,
  maxBodyBytes: 128,
};

describe("API request guard", () => {
  beforeEach(() => resetApiRateLimitsForTests());

  it("accepts same-origin JSON requests", () => {
    expect(guardApiRequest(makeRequest(), "contact", options)).toEqual({
      ok: true,
    });
  });

  it("rejects cross-origin and non-JSON requests", () => {
    const crossOrigin = guardApiRequest(
      makeRequest("{}", { origin: "https://example.com" }),
      "contact",
      options,
    );
    expect(crossOrigin.ok).toBe(false);
    if (!crossOrigin.ok) expect(crossOrigin.response.status).toBe(403);

    const formRequest = guardApiRequest(
      makeRequest("name=test", { "content-type": "text/plain" }),
      "contact",
      options,
    );
    expect(formRequest.ok).toBe(false);
    if (!formRequest.ok) expect(formRequest.response.status).toBe(415);
  });

  it("limits repeated requests from one address", () => {
    expect(guardApiRequest(makeRequest(), "contact", options).ok).toBe(true);
    expect(guardApiRequest(makeRequest(), "contact", options).ok).toBe(true);

    const blocked = guardApiRequest(makeRequest(), "contact", options);
    expect(blocked.ok).toBe(false);
    if (!blocked.ok) {
      expect(blocked.response.status).toBe(429);
      expect(blocked.response.headers.get("retry-after")).toBeTruthy();
    }
  });

  it("checks the actual body size when content-length is unavailable", async () => {
    await expect(
      readJsonBody(makeRequest(JSON.stringify({ value: "x".repeat(200) })), 64),
    ).rejects.toThrow("payload_too_large");
  });
});
