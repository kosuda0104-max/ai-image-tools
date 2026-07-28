import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import BmpToPngTool from "@/src/components/BmpToPngTool";
import PngToWebpTool from "@/src/components/PngToWebpTool";
import TiffToPngTool from "@/src/components/TiffToPngTool";

afterEach(cleanup);

describe("indexing-priority conversion pages", () => {
  it("explains the first-page limit on the Japanese TIFF to PNG page", () => {
    render(<TiffToPngTool locale="ja" />);

    expect(
      screen.getByRole("heading", { name: "複数ページTIFFは先頭ページのみ変換" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "複数ページTIFFをPDFに変換" })).toHaveAttribute(
      "href",
      "/tools/tiff-to-pdf",
    );
  });

  it("gives a format-specific decision on the Japanese PNG to WebP page", () => {
    render(<PngToWebpTool locale="ja" />);

    expect(
      screen.getByRole("heading", { name: "透過を残しながらWeb画像を軽くしたいときに使う" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ガイド：PNGとWebPの違い" })).toHaveAttribute(
      "href",
      "/guides/png-vs-webp",
    );
  });

  it("distinguishes lossless conversion from background removal on BMP to PNG", () => {
    render(<BmpToPngTool locale="en" />);

    expect(
      screen.getByRole("heading", { name: "PNG support does not create transparency automatically" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Make Image Background Transparent" }),
    ).toHaveAttribute("href", "/en/tools/image-background-transparent");
  });
});
