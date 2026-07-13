import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ToolPageLayout from "@/components/ToolPageLayout";

afterEach(cleanup);

function getJsonLd(type: string) {
  const scripts = Array.from(
    document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'),
  );

  return scripts
    .map((script) => JSON.parse(script.textContent || "{}"))
    .find((value) => value["@type"] === type);
}

function renderLayout(props: { title: string; slug?: string }) {
  render(
    <ToolPageLayout
      slug={props.slug}
      title={props.title}
      description="Test description"
      aboutTitle="About"
      aboutText="About this tool"
      stepsTitle="How to use"
      steps={["Choose a file", "Download the result"]}
      faqTitle="FAQ"
      faqs={[{ question: "Is it free?", answer: "Yes." }]}
    >
      <div>Tool controls</div>
    </ToolPageLayout>,
  );
}

describe("ToolPageLayout structured data", () => {
  it("uses the tool URL in WebApplication, HowTo, and breadcrumb JSON-LD", () => {
    renderLayout({ title: "Fix CSV Encoding", slug: "csv-encoding-fix" });

    const expectedUrl = "https://ai-image-tools.com/en/tools/csv-encoding-fix";
    expect(getJsonLd("WebApplication").url).toBe(expectedUrl);
    expect(getJsonLd("HowTo").step[0].url).toBe(expectedUrl);
    expect(getJsonLd("BreadcrumbList").itemListElement[2].item).toBe(expectedUrl);
  });

  it("infers the URL for existing tools that do not pass a slug", () => {
    renderLayout({ title: "Parquet to CSV Converter" });

    expect(getJsonLd("WebApplication").url).toBe(
      "https://ai-image-tools.com/en/tools/parquet-to-csv",
    );
  });
});
