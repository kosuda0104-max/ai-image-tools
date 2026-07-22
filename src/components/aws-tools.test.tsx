import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import AwsDataConverterTool from "@/src/components/AwsDataConverterTool";

afterEach(cleanup);

function selectFiles(container: HTMLElement, files: File[]) {
  const input = container.querySelector('input[type="file"]');
  expect(input).not.toBeNull();
  fireEvent.change(input as HTMLInputElement, { target: { files } });
}

describe("AWS conversion tools", () => {
  it("converts DynamoDB typed JSON and offers three outputs", async () => {
    const { container } = render(
      <AwsDataConverterTool kind="dynamodb" locale="en" />,
    );
    selectFiles(container, [
      new File(
        [JSON.stringify({ Item: { pk: { S: "A" }, count: { N: "42" } } })],
        "dynamodb-export.json",
        { type: "application/json" },
      ),
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Convert DynamoDB JSON" }));

    expect(await screen.findByText("Done: Converted 1 DynamoDB items.")).toBeInTheDocument();
    expect(screen.getByText("pk")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download JSON" })).toBeEnabled();
    expect(screen.getByRole("radio", { name: "Excel" })).toBeInTheDocument();
  }, 15_000);

  it("reconstructs a Textract table into Excel", async () => {
    const { container } = render(
      <AwsDataConverterTool kind="textract" locale="en" />,
    );
    selectFiles(container, [
      new File(
        [JSON.stringify({ Blocks: [
          { Id: "t", BlockType: "TABLE", Relationships: [{ Type: "CHILD", Ids: ["c"] }] },
          { Id: "c", BlockType: "CELL", RowIndex: 1, ColumnIndex: 1, Relationships: [{ Type: "CHILD", Ids: ["w"] }] },
          { Id: "w", BlockType: "WORD", Text: "Invoice" },
        ] })],
        "textract.json",
        { type: "application/json" },
      ),
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Convert Textract JSON" }));

    expect(await screen.findByText("Done: Reconstructed 1 table rows.")).toBeInTheDocument();
    expect(screen.getByText("Invoice")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download Excel" })).toBeEnabled();
  });

  it("merges CloudTrail files", async () => {
    const { container } = render(
      <AwsDataConverterTool kind="cloudtrail" locale="en" />,
    );
    selectFiles(container, [
      new File([JSON.stringify({ Records: [{ eventName: "GetObject" }] })], "trail-1.json"),
      new File([JSON.stringify({ Records: [{ eventName: "PutObject" }] })], "trail-2.json"),
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Convert CloudTrail Logs" }));

    expect(await screen.findByText("Done: Merged 2 CloudTrail events.")).toBeInTheDocument();
    expect(screen.getByText("GetObject")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download CSV" })).toBeEnabled();
  });

  it("loads an S3 Inventory manifest with headerless CSV", async () => {
    const { container } = render(
      <AwsDataConverterTool kind="s3-inventory" locale="en" />,
    );
    selectFiles(container, [
      new File(
        [JSON.stringify({ fileFormat: "CSV", fileSchema: "Bucket, Key, Size", files: [{ key: "part.csv.gz" }] })],
        "manifest.json",
        { type: "application/json" },
      ),
      new File(["demo,folder/file.txt,12\n"], "part.csv", { type: "text/csv" }),
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Load S3 Inventory" }));

    expect(await screen.findByText("Done: Loaded 1 inventory rows.")).toBeInTheDocument();
    expect(screen.getByText("folder/file.txt")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download CSV" })).toBeEnabled();
  });

  it("sorts CloudWatch export events", async () => {
    const { container } = render(
      <AwsDataConverterTool kind="cloudwatch" locale="en" />,
    );
    selectFiles(container, [
      new File(
        ["1753142402000 second\n1753142401000 first\n"],
        "cloudwatch.log",
        { type: "text/plain" },
      ),
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Convert CloudWatch Logs" }));

    expect(await screen.findByText("Done: Sorted 2 log events.")).toBeInTheDocument();
    const messages = screen.getAllByText(/first|second/);
    expect(messages[0]).toHaveTextContent("first");
    expect(screen.getByRole("button", { name: "Download CSV" })).toBeEnabled();
  });

  it("creates subtitles from Amazon Transcribe JSON", async () => {
    const { container } = render(
      <AwsDataConverterTool kind="transcribe" locale="en" />,
    );
    selectFiles(container, [
      new File(
        [JSON.stringify({ results: { transcripts: [{ transcript: "Hello." }], items: [
          { type: "pronunciation", start_time: "0", end_time: "0.8", alternatives: [{ content: "Hello" }] },
          { type: "punctuation", alternatives: [{ content: "." }] },
        ] } })],
        "transcribe.json",
        { type: "application/json" },
      ),
    ]);
    fireEvent.click(screen.getByRole("button", { name: "Convert to Subtitles" }));

    expect(await screen.findByText("Done: Created 1 subtitle cues.")).toBeInTheDocument();
    expect(screen.getByText("Hello.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download SRT" })).toBeEnabled();
  });
});
