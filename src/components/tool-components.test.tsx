import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import AvifToWebpTool from "@/src/components/AvifToWebpTool";
import Base64ToImageTool from "@/src/components/Base64ToImageTool";
import CsvDelimiterConverterTool from "@/src/components/CsvDelimiterConverterTool";
import CsvEncodingFixTool from "@/src/components/CsvEncodingFixTool";
import ImageBackgroundTransparentTool from "@/src/components/ImageBackgroundTransparentTool";
import ImageCompressTool from "@/src/components/ImageCompressTool";
import JpgToPngTool from "@/src/components/JpgToPngTool";
import JsonlToCsvTool from "@/src/components/JsonlToCsvTool";
import JsonToExcelTool from "@/src/components/JsonToExcelTool";
import ParquetToExcelTool from "@/src/components/ParquetToExcelTool";
import ParquetViewerTool from "@/src/components/ParquetViewerTool";
import PngToJpgTool from "@/src/components/PngToJpgTool";
import SvgToWebpTool from "@/src/components/SvgToWebpTool";
import TiffToPdfTool from "@/src/components/TiffToPdfTool";

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

  it("detects and converts a semicolon-delimited CSV", async () => {
    const { container } = render(<CsvDelimiterConverterTool locale="en" />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(
      ['name;note\nAda;"alpha;beta"'],
      "semicolon.csv",
      { type: "text/csv" },
    );

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });
    fireEvent.click(screen.getByRole("button", { name: "Convert Delimiter" }));

    expect(
      await screen.findByText(
        "Done: Detected Semicolon (;) delimiter and converted the file.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("name")).toBeInTheDocument();
    expect(screen.getByText("alpha;beta")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Download Converted File" }),
    ).toBeEnabled();
  });

  it("converts nested JSONL rows into a CSV preview", async () => {
    const { container } = render(<JsonlToCsvTool locale="en" />);
    const input = container.querySelector('input[type="file"]');
    const file = new File(
      ['{"id":1,"user":{"name":"Ada"}}\n{"id":2,"user":{"name":"Lin"}}'],
      "events.jsonl",
      { type: "application/x-ndjson" },
    );

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [file] },
    });
    fireEvent.click(screen.getByRole("button", { name: "Convert JSONL to CSV" }));

    expect(
      await screen.findByText("Done: 2 rows were converted to CSV."),
    ).toBeInTheDocument();
    expect(screen.getByText("user.name")).toBeInTheDocument();
    expect(screen.getByText("Ada")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Download CSV" })).toBeEnabled();
  });

  it("rejects unsupported files on the background transparency tool", async () => {
    const { container } = render(
      <ImageBackgroundTransparentTool locale="en" />,
    );
    const input = container.querySelector('input[type="file"]');

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [new File(["pdf"], "document.pdf", { type: "application/pdf" })] },
    });

    expect(
      await screen.findByText(
        "Error: Please select a JPG, PNG, or WebP image.",
      ),
    ).toBeInTheDocument();
  });

  it("rejects non-Parquet files on the schema viewer", async () => {
    const { container } = render(<ParquetViewerTool locale="en" />);
    const input = container.querySelector('input[type="file"]');

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [new File(["text"], "data.txt", { type: "text/plain" })] },
    });
    fireEvent.click(screen.getByRole("button", { name: "Inspect Parquet" }));

    expect(
      await screen.findByText("Error: Please select a Parquet file."),
    ).toBeInTheDocument();
  });

  it("rejects non-TIFF files on the multi-page PDF tool", async () => {
    const { container } = render(<TiffToPdfTool locale="en" />);
    const input = container.querySelector('input[type="file"]');

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [new File(["png"], "image.png", { type: "image/png" })] },
    });
    fireEvent.click(screen.getByRole("button", { name: "Convert TIFF to PDF" }));

    expect(
      await screen.findByText("Error: Please select a TIFF or TIF file."),
    ).toBeInTheDocument();
  });

  it("rejects non-AVIF files on the AVIF to WebP tool", async () => {
    const { container } = render(<AvifToWebpTool locale="en" />);
    const input = container.querySelector('input[type="file"]');

    fireEvent.change(input as HTMLInputElement, {
      target: { files: [new File(["png"], "image.png", { type: "image/png" })] },
    });

    expect(
      await screen.findByText("Error: Please select an AVIF file."),
    ).toBeInTheDocument();
  });
});
