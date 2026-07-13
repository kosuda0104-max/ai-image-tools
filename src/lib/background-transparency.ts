export type RgbColor = {
  red: number;
  green: number;
  blue: number;
};

type RemoveBackgroundOptions = {
  data: Uint8ClampedArray;
  width: number;
  height: number;
  target: RgbColor;
  tolerance: number;
  connectedOnly?: boolean;
};

function isCloseColor(
  data: Uint8ClampedArray,
  pixelIndex: number,
  target: RgbColor,
  tolerance: number,
) {
  const offset = pixelIndex * 4;
  return (
    Math.max(
      Math.abs(data[offset] - target.red),
      Math.abs(data[offset + 1] - target.green),
      Math.abs(data[offset + 2] - target.blue),
    ) <= tolerance
  );
}

export function removeBackgroundColor({
  data,
  width,
  height,
  target,
  tolerance,
  connectedOnly = true,
}: RemoveBackgroundOptions) {
  const output = new Uint8ClampedArray(data);
  let transparentPixels = 0;

  const clearPixel = (pixelIndex: number) => {
    const alphaOffset = pixelIndex * 4 + 3;
    if (output[alphaOffset] !== 0) {
      output[alphaOffset] = 0;
      transparentPixels++;
    }
  };

  if (!connectedOnly) {
    for (let pixelIndex = 0; pixelIndex < width * height; pixelIndex++) {
      if (isCloseColor(data, pixelIndex, target, tolerance)) {
        clearPixel(pixelIndex);
      }
    }
    return { data: output, transparentPixels };
  }

  const visited = new Uint8Array(width * height);
  const queue: number[] = [];

  const enqueue = (pixelIndex: number) => {
    if (
      visited[pixelIndex] === 0 &&
      isCloseColor(data, pixelIndex, target, tolerance)
    ) {
      visited[pixelIndex] = 1;
      queue.push(pixelIndex);
    }
  };

  for (let x = 0; x < width; x++) {
    enqueue(x);
    enqueue((height - 1) * width + x);
  }
  for (let y = 0; y < height; y++) {
    enqueue(y * width);
    enqueue(y * width + width - 1);
  }

  for (let cursor = 0; cursor < queue.length; cursor++) {
    const pixelIndex = queue[cursor];
    const x = pixelIndex % width;
    const y = Math.floor(pixelIndex / width);
    clearPixel(pixelIndex);

    if (x > 0) enqueue(pixelIndex - 1);
    if (x + 1 < width) enqueue(pixelIndex + 1);
    if (y > 0) enqueue(pixelIndex - width);
    if (y + 1 < height) enqueue(pixelIndex + width);
  }

  return { data: output, transparentPixels };
}

export function rgbToHex({ red, green, blue }: RgbColor) {
  return `#${[red, green, blue]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")}`;
}

export function hexToRgb(value: string): RgbColor {
  const normalized = value.replace(/^#/, "");
  if (!/^[0-9a-f]{6}$/i.test(normalized)) {
    throw new Error("Invalid HEX color.");
  }

  return {
    red: Number.parseInt(normalized.slice(0, 2), 16),
    green: Number.parseInt(normalized.slice(2, 4), 16),
    blue: Number.parseInt(normalized.slice(4, 6), 16),
  };
}
