import { describe, expect, it } from "vitest";
import {
  hexToRgb,
  removeBackgroundColor,
  rgbToHex,
} from "@/src/lib/background-transparency";

function makeRingImage() {
  const width = 5;
  const height = 5;
  const data = new Uint8ClampedArray(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = (y * width + x) * 4;
      const isOuterBackground = x === 0 || x === 4 || y === 0 || y === 4;
      const isIsolatedCenter = x === 2 && y === 2;
      const value = isOuterBackground || isIsolatedCenter ? 255 : 0;
      data.set([value, value, value, 255], offset);
    }
  }

  return { data, width, height };
}

describe("background transparency helpers", () => {
  it("removes matching pixels connected to an image edge", () => {
    const image = makeRingImage();
    const result = removeBackgroundColor({
      ...image,
      target: { red: 255, green: 255, blue: 255 },
      tolerance: 0,
    });

    expect(result.transparentPixels).toBe(16);
    expect(result.data[3]).toBe(0);
    expect(result.data[(2 * image.width + 2) * 4 + 3]).toBe(255);
  });

  it("can remove matching pixels even when they are enclosed", () => {
    const image = makeRingImage();
    const result = removeBackgroundColor({
      ...image,
      target: { red: 255, green: 255, blue: 255 },
      tolerance: 0,
      connectedOnly: false,
    });

    expect(result.transparentPixels).toBe(17);
    expect(result.data[(2 * image.width + 2) * 4 + 3]).toBe(0);
  });

  it("converts between RGB and HEX colors", () => {
    expect(rgbToHex({ red: 12, green: 160, blue: 255 })).toBe("#0ca0ff");
    expect(hexToRgb("#0ca0ff")).toEqual({ red: 12, green: 160, blue: 255 });
    expect(() => hexToRgb("#fff")).toThrow("Invalid HEX color.");
  });
});
