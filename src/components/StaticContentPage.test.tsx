import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import StaticContentPage from "@/src/components/StaticContentPage";

describe("StaticContentPage sources", () => {
  it("renders official references as external links", () => {
    render(
      <StaticContentPage
        locale="en"
        title="Guide"
        description="Description"
        sections={[]}
        sources={[
          {
            label: "Official format documentation",
            href: "https://example.com/spec",
          },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { name: "Official references" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Official format documentation" })).toHaveAttribute(
      "href",
      "https://example.com/spec",
    );
  });
});
