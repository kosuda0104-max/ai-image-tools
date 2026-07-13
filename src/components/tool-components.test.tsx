import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ImageCompressTool from "@/src/components/ImageCompressTool";
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

describe("image compressor", () => {
  const createObjectURL = vi.fn(() => "blob:preview");
  const revokeObjectURL = vi.fn();
  const drawImage = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("URL", { createObjectURL, revokeObjectURL });
    vi.stubGlobal(
      "Image",
      class {
        width = 640;
        height = 480;
        onload: null | (() => void) = null;
        onerror: null | (() => void) = null;

        set src(_value: string) {
          this.onload?.();
        }
      },
    );
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () => ({ drawImage }) as unknown as CanvasRenderingContext2D,
    );
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("compresses a JPEG at the selected quality", async () => {
    const toBlob = vi
      .spyOn(HTMLCanvasElement.prototype, "toBlob")
      .mockImplementation((callback, type) => {
        callback?.(new Blob(["compressed"], { type: String(type) }));
      });
    const { container } = render(<ImageCompressTool locale="en" />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["image"], "photo.jpg", { type: "image/jpeg" });

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });
    fireEvent.change(screen.getByLabelText("Compression Quality: 80"), {
      target: { value: "60" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Compress Image" }));

    expect(await screen.findByText("Done: Image compression completed successfully.")).toBeInTheDocument();
    expect(toBlob).toHaveBeenLastCalledWith(expect.any(Function), "image/jpeg", 0.6);
    expect(drawImage).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Download Compressed Image" })).toBeEnabled();
  });

  it("uses WebP when the user selects WebP output", async () => {
    const toBlob = vi
      .spyOn(HTMLCanvasElement.prototype, "toBlob")
      .mockImplementation((callback, type) => {
        callback?.(new Blob(["compressed"], { type: String(type) }));
      });
    const { container } = render(<ImageCompressTool locale="en" />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["image"], "graphic.png", { type: "image/png" });

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });
    fireEvent.change(screen.getByLabelText("Output Format"), {
      target: { value: "image/webp" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Compress Image" }));

    expect(await screen.findByText("Done: Image compression completed successfully.")).toBeInTheDocument();
    expect(toBlob).toHaveBeenLastCalledWith(expect.any(Function), "image/webp", 0.8);
  });

  it("rejects unsupported files", async () => {
    const { container } = render(<ImageCompressTool locale="en" />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["not an image"], "document.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });

    expect(
      await screen.findByText("Error: Please select a JPG, PNG, or WebP file."),
    ).toBeInTheDocument();
  });
});
