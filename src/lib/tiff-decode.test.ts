import { beforeEach, describe, expect, it, vi } from "vitest";
import { decodeTiffPages } from "@/src/lib/tiff-decode";

const utif = vi.hoisted(() => ({
  decode: vi.fn(),
  decodeImage: vi.fn(),
  toRGBA8: vi.fn(),
}));

vi.mock("utif", () => ({ default: utif }));

describe("TIFF decoding", () => {
  beforeEach(() => {
    utif.decode.mockReset();
    utif.decodeImage.mockReset();
    utif.toRGBA8.mockReset();
  });

  it("decodes every TIFF page in its original order", async () => {
    const first = { width: 2, height: 1, page: 1 };
    const second = { width: 1, height: 2, page: 2 };
    utif.decode.mockReturnValue([first, second]);
    utif.toRGBA8
      .mockReturnValueOnce(new Uint8Array(8).fill(1))
      .mockReturnValueOnce(new Uint8Array(8).fill(2));

    const file = new File([new Uint8Array([1, 2, 3])], "scan.tiff", {
      type: "image/tiff",
    });
    Object.defineProperty(file, "arrayBuffer", {
      value: async () => new Uint8Array([1, 2, 3]).buffer,
    });

    const pages = await decodeTiffPages(file);

    expect(pages).toEqual([
      { width: 2, height: 1, rgba: new Uint8Array(8).fill(1) },
      { width: 1, height: 2, rgba: new Uint8Array(8).fill(2) },
    ]);
    expect(utif.decodeImage).toHaveBeenNthCalledWith(
      1,
      expect.any(ArrayBuffer),
      first,
    );
    expect(utif.decodeImage).toHaveBeenNthCalledWith(
      2,
      expect.any(ArrayBuffer),
      second,
    );
  });

  it("rejects a TIFF with no image pages", async () => {
    utif.decode.mockReturnValue([]);
    const file = new File([new Uint8Array([1])], "empty.tif", {
      type: "image/tiff",
    });
    Object.defineProperty(file, "arrayBuffer", {
      value: async () => new Uint8Array([1]).buffer,
    });

    await expect(decodeTiffPages(file)).rejects.toThrow(
      "No image found in the TIFF file.",
    );
  });
});
