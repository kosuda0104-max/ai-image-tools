import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ToolFinder from "@/src/components/ToolFinder";
import { getAllToolItems } from "@/src/data/tool-directory";

afterEach(() => {
  cleanup();
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
