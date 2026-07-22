import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AwsDataConverterTool from "@/src/components/AwsDataConverterTool";
import CsvEncodingFixTool from "@/src/components/CsvEncodingFixTool";
import HeicToJpgTool from "@/src/components/HeicToJpgTool";
import ParquetToCsvTool from "@/src/components/ParquetToCsvTool";
import WebpToJpgTool from "@/src/components/WebpToJpgTool";

vi.mock("hyparquet", () => ({
  parquetReadObjects: vi.fn(async () => [{ id: 1, name: "台北" }]),
}));

afterEach(cleanup);

function selectFiles(container: HTMLElement, files: File[]) {
  const input = container.querySelector('input[type="file"]');
  expect(input).not.toBeNull();
  fireEvent.change(input as HTMLInputElement, { target: { files } });
}

describe("Traditional Chinese tools", () => {
  it("decodes a Big5 CSV and exports an Excel-friendly result", async () => {
    const { container } = render(<CsvEncodingFixTool locale="zh-TW" />);
    const bytes = new Uint8Array([
      0x6e, 0x61, 0x6d, 0x65, 0x0a, 0xa4, 0xa4, 0xa4, 0xe5,
    ]);
    selectFiles(container, [new File([bytes], "people.csv", { type: "text/csv" })]);
    fireEvent.change(screen.getByLabelText("原始文字編碼"), {
      target: { value: "big5" },
    });
    fireEvent.click(screen.getByRole("button", { name: "修復文字編碼" }));

    expect(await screen.findByText(/完成：已將 people.csv/)).toBeInTheDocument();
    expect(screen.getByText("中文")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "下載修復後的 CSV" })).toBeEnabled();
  }, 15_000);

  it("converts DynamoDB typed JSON with Traditional Chinese controls", async () => {
    const { container } = render(
      <AwsDataConverterTool kind="dynamodb" locale="zh-TW" />,
    );
    selectFiles(container, [
      new File(
        [JSON.stringify({ Item: { pk: { S: "TW" }, count: { N: "42" } } })],
        "dynamodb.json",
        { type: "application/json" },
      ),
    ]);
    fireEvent.click(screen.getByRole("button", { name: "轉換 DynamoDB JSON" }));

    expect(await screen.findByText("完成：已轉換 1 筆 Item。")).toBeInTheDocument();
    expect(screen.getByText("TW")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "下載 JSON" })).toBeEnabled();
  });

  it("merges CloudTrail records with Traditional Chinese controls", async () => {
    const { container } = render(
      <AwsDataConverterTool kind="cloudtrail" locale="zh-TW" />,
    );
    selectFiles(container, [
      new File([JSON.stringify({ Records: [{ eventName: "GetObject" }] })], "trail.json"),
    ]);
    fireEvent.click(screen.getByRole("button", { name: "轉換 CloudTrail 日誌" }));

    expect(await screen.findByText("完成：已合併 1 筆 CloudTrail 事件。")).toBeInTheDocument();
    expect(screen.getByText("GetObject")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "下載 CSV" })).toBeEnabled();
  });

  it("reads Parquet rows and exposes a CSV download", async () => {
    const { container } = render(<ParquetToCsvTool locale="zh-TW" />);
    selectFiles(container, [
      new File([new Uint8Array([0x50, 0x41, 0x52, 0x31])], "sample.parquet"),
    ]);
    fireEvent.click(screen.getByRole("button", { name: "轉成 CSV" }));

    expect(await screen.findByText("台北")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "下載 CSV" })).toBeEnabled();
  });

  it("shows localized validation for both image converters", async () => {
    const heic = render(<HeicToJpgTool locale="zh-TW" />);
    selectFiles(heic.container, [new File(["x"], "wrong.png", { type: "image/png" })]);
    expect(await screen.findByText("錯誤：請選擇 HEIC 或 HEIF 圖片。")).toBeInTheDocument();
    heic.unmount();

    const webp = render(<WebpToJpgTool locale="zh-TW" />);
    selectFiles(webp.container, [new File(["x"], "wrong.png", { type: "image/png" })]);
    expect(await screen.findByText("錯誤：請選擇 WebP 圖片。")).toBeInTheDocument();
  });
});
