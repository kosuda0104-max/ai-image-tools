import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import JpgToPngTool from "@/src/components/JpgToPngTool";
import PngToJpgTool from "@/src/components/PngToJpgTool";

describe("main image tools", () => {
  it("shows an error for non-jpg files on the JPG to PNG tool", async () => {
    const { container } = render(<JpgToPngTool locale="ja" />);
    const input = container.querySelector('input[type="file"]');

    expect(input).not.toBeNull();

    const wrongFile = new File(["demo"], "wrong.png", { type: "image/png" });
    fireEvent.change(input as HTMLInputElement, {
      target: { files: [wrongFile] },
    });

    expect(
      await screen.findByText("エラー: JPGファイルを選択してください。")
    ).toBeInTheDocument();
  });

  it("shows the selected file name on the PNG to JPG tool", () => {
    const { container } = render(<PngToJpgTool locale="en" />);
    const input = container.querySelector('input[type="file"]');

    expect(input).not.toBeNull();

    const pngFile = new File(["demo"], "sample.png", { type: "image/png" });
    fireEvent.change(input as HTMLInputElement, {
      target: { files: [pngFile] },
    });

    expect(screen.getAllByText("sample.png").length).toBeGreaterThan(0);
    expect(
      screen.getByRole("button", { name: "Convert PNG to JPG" })
    ).toBeEnabled();
  });
});
