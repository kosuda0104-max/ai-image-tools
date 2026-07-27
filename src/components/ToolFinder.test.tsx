import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ToolFinder from "@/src/components/ToolFinder";
import { getAllToolItems } from "@/src/data/tool-directory";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("ToolFinder", () => {
  it("shows only relevant actions after a file is selected", () => {
    render(<ToolFinder locale="en" tools={getAllToolItems("en")} />);
    const input = screen.getByLabelText("Choose file");

    fireEvent.change(input, {
      target: {
        files: [new File(["name,city"], "customers.csv", { type: "text/csv" })],
      },
    });

    expect(screen.getByText("customers.csv")).toBeInTheDocument();
    expect(screen.getByText("Fix CSV Encoding")).toBeInTheDocument();
    expect(screen.getByText("CSV Delimiter Converter")).toBeInTheDocument();
    expect(screen.getByText("CSV to JSON")).toBeInTheDocument();
    expect(screen.queryByText("JPG to PNG")).not.toBeInTheDocument();
  });

  it("finds a tool from a plain-language problem", () => {
    render(<ToolFinder locale="en" tools={getAllToolItems("en")} />);

    fireEvent.change(screen.getByLabelText("Describe the problem"), {
      target: { value: "CSV opens in one column" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ask" }));

    expect(screen.getByText("CSV Delimiter Converter")).toBeInTheDocument();
    expect(screen.getByText(/closest matches/)).toBeInTheDocument();
  });

  it("supports one-tap Japanese problem suggestions", () => {
    render(<ToolFinder locale="ja" tools={getAllToolItems("ja")} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "iPhoneの写真がWindowsで開けない",
      }),
    );

    expect(screen.getByText("HEIC を JPG に変換")).toBeInTheDocument();
    expect(screen.getByText("このあたりが近そうです。まずは一番上から試してください。")).toBeInTheDocument();
  });

  it("handles a file type with no matching workflow", () => {
    render(<ToolFinder locale="en" tools={getAllToolItems("en")} />);

    fireEvent.change(screen.getByLabelText("Choose file"), {
      target: {
        files: [
          new File(["archive"], "backup.zip", { type: "application/zip" }),
        ],
      },
    });

    expect(
      screen.getByText("No tools could be matched to this file format."),
    ).toBeInTheDocument();
  });

  it("records an unresolved answer before asking for optional detail", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    render(<ToolFinder locale="en" tools={getAllToolItems("en")} />);
    fireEvent.change(screen.getByLabelText("Describe the problem"), {
      target: { value: "Parquet to CSV" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Ask" }));
    fireEvent.click(screen.getByRole("button", { name: "Not solved" }));

    expect(screen.getByLabelText("What got in the way?")).toBeInTheDocument();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toMatchObject({
      event: "rating",
      status: "unresolved",
      query: "Parquet to CSV",
      recommendationSlugs: expect.arrayContaining(["parquet-to-csv"]),
    });
  });
});
