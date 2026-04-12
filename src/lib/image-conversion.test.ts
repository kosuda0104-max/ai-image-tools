import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import {
  convertImageWithCanvas,
  formatFileSize,
  getBaseName,
} from "@/src/lib/image-conversion";

describe("image conversion helpers", () => {
  const createObjectURL = vi.fn(() => "blob:preview");
  const revokeObjectURL = vi.fn();
  const fillRect = vi.fn();
  const drawImage = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("URL", {
      createObjectURL,
      revokeObjectURL,
    });

    vi.stubGlobal(
      "Image",
      class {
        width = 640;
        height = 480;
        naturalWidth = 640;
        naturalHeight = 480;
        onload: null | (() => void) = null;
        onerror: null | (() => void) = null;

        set src(_value: string) {
          this.onload?.();
        }
      }
    );

    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      () =>
        ({
          fillStyle: "",
          fillRect,
          drawImage,
        }) as unknown as CanvasRenderingContext2D
    );

    vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation(
      (callback, type) => {
        callback?.(new Blob(["ok"], { type: String(type) }));
      }
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("formats file sizes", () => {
    expect(formatFileSize(500)).toBe("500 B");
    expect(formatFileSize(2048)).toBe("2.0 KB");
    expect(formatFileSize(3 * 1024 * 1024)).toBe("3.00 MB");
  });

  it("returns base names without the extension", () => {
    expect(getBaseName("photo.jpeg")).toBe("photo");
  });

  it("converts with optional background fill", async () => {
    const file = new File(["demo"], "sample.png", { type: "image/png" });
    const blob = await convertImageWithCanvas({
      file,
      outputType: "image/jpeg",
      quality: 0.92,
      fillBackground: "#ffffff",
    });

    expect(blob.type).toBe("image/jpeg");
    expect(fillRect).toHaveBeenCalledWith(0, 0, 640, 480);
    expect(drawImage).toHaveBeenCalled();
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:preview");
  });
});
