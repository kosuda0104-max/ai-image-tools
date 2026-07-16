import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ToolFinder from "@/src/components/ToolFinder";
import { getAllToolItems } from "@/src/data/tool-directory";

afterEach(cleanup);

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

    expect(screen.getByText("CSV Delimiter Converter")).toBeInTheDocument();
    expect(screen.getByText(/matching tool/)).toBeInTheDocument();
  });

  it("supports one-tap Japanese problem suggestions", () => {
    render(<ToolFinder locale="ja" tools={getAllToolItems("ja")} />);

    fireEvent.click(screen.getByRole("button", { name: "画像の背景を透明に" }));

    expect(screen.getByText("画像の背景を透明化")).toBeInTheDocument();
    expect(screen.getByLabelText("困りごとを入力")).toHaveValue(
      "画像の背景を透明に",
    );
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
});
