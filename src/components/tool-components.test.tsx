import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Base64ToImageTool from "@/src/components/Base64ToImageTool";
import CsvEncodingFixTool from "@/src/components/CsvEncodingFixTool";
import ImageCompressTool from "@/src/components/ImageCompressTool";
import JpgToPngTool from "@/src/components/JpgToPngTool";
import JsonToExcelTool from "@/src/components/JsonToExcelTool";
import ParquetToExcelTool from "@/src/components/ParquetToExcelTool";
import PngToJpgTool from "@/src/components/PngToJpgTool";
import SvgToWebpTool from "@/src/components/SvgToWebpTool";

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

describe("new niche conversion tools", () => {
  const createObjectURL = vi.fn(() => "blob:tool-preview");
  const revokeObjectURL = vi.fn();

  beforeEach(() => {
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: createObjectURL,
      writable: true,
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      value: revokeObjectURL,
      writable: true,
    });
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    createObjectURL.mockClear();
    revokeObjectURL.mockClear();
  });

  it("decodes a Base64 data URL into an image preview", async () => {
    render(<Base64ToImageTool locale="en" />);

    fireEvent.change(screen.getByLabelText("Base64 or data URL"), {
      target: {
        value:
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFgwJ/l4rZ5QAAAABJRU5ErkJggg==",
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "Convert to Image" }));

    expect(await screen.findByText("Done: Image decoded successfully.")).toBeInTheDocument();
    expect(screen.getByText("image/png")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download Image" })).toBeEnabled();
  });

  it("fixes a CSV into an Excel-friendly UTF-8 download", async () => {
    const { container } = render(<CsvEncodingFixTool locale="en" />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["name,city\nTaro,Tokyo"], "people.csv", {
      type: "text/csv",
    });

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });
    fireEvent.click(screen.getByRole("button", { name: "Fix Encoding" }));

    expect(
      await screen.findByText("Done: people.csv has been converted to an Excel-friendly CSV."),
    ).toBeInTheDocument();
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("Taro")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download Fixed CSV" })).toBeEnabled();
  });

  it("converts JSON rows into an Excel download", async () => {
    const { container } = render(<JsonToExcelTool locale="en" />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(
      [JSON.stringify([{ id: 1, user: { name: "Ada" }, tags: ["alpha"] }])],
      "data.json",
      { type: "application/json" },
    );

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });
    fireEvent.click(screen.getByRole("button", { name: "Convert JSON to Excel" }));

    expect(
      await screen.findByText("data.json was converted to an Excel file with 1 rows."),
    ).toBeInTheDocument();
    expect(screen.getByText("user.name")).toBeInTheDocument();
    expect(screen.getByText("Ada")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download Excel" })).toBeEnabled();
  });

  it("rejects non-Parquet files before loading the Parquet reader", async () => {
    const { container } = render(<ParquetToExcelTool locale="en" />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["not parquet"], "notes.txt", {
      type: "text/plain",
    });

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });
    fireEvent.click(screen.getByRole("button", { name: "Convert Parquet to Excel" }));

    expect(await screen.findByText("Please select a Parquet file.")).toBeInTheDocument();
  });

  it("rejects non-SVG files on the SVG to WebP tool", async () => {
    const { container } = render(<SvgToWebpTool locale="en" />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(["hello"], "hello.txt", {
      type: "text/plain",
    });

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });

    expect(await screen.findByText("Please select an SVG file.")).toBeInTheDocument();
  });
});
