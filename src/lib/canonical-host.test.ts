import { describe, expect, it } from "vitest";
import { getCanonicalHostRedirect } from "@/src/lib/canonical-host";

describe("getCanonicalHostRedirect", () => {
  it("redirects the www host while preserving the path and query", () => {
    expect(
      getCanonicalHostRedirect(
        "https://www.ai-image-tools.com/en/tools/parquet-to-csv?source=test",
      ),
    ).toBe(
      "https://ai-image-tools.com/en/tools/parquet-to-csv?source=test",
    );
  });

  it("leaves the canonical host unchanged", () => {
    expect(
      getCanonicalHostRedirect("https://ai-image-tools.com/tools/jpg-to-png"),
    ).toBeNull();
  });

  it("does not redirect unrelated hosts", () => {
    expect(
      getCanonicalHostRedirect("https://filewisp.example/tools/jpg-to-png"),
    ).toBeNull();
  });
});
