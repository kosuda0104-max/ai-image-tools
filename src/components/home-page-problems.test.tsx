import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import HomePage from "@/src/components/HomePage";

afterEach(cleanup);

describe("homepage problem guides", () => {
  it("starts as a compact collapsed section", () => {
    render(<HomePage locale="ja" />);

    const heading = screen.getByRole("heading", {
      name: "よくある困りごとから解決する",
    });
    const summary = heading.closest("summary");
    const details = summary?.closest("details");

    expect(summary).not.toBeNull();
    expect(details).not.toBeNull();
    expect(details).not.toHaveAttribute("open");
    expect(screen.getByText("6件")).toBeInTheDocument();
  });
});
