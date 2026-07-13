/**
 * Decode a TIFF file into a canvas-friendly PNG File.
 *
 * Browsers cannot render TIFF in an <img>, so the conversion tools cannot
 * rely on the usual canvas path. UTIF decodes the TIFF to raw RGBA, which we
 * paint onto a canvas and export as PNG. The shared image pipeline then takes
 * that PNG and re-encodes it to the requested output format.
 */
export type DecodedTiffPage = {
  width: number;
  height: number;
  rgba: Uint8Array;
};

export async function decodeTiffPages(file: File): Promise<DecodedTiffPage[]> {
  const UTIF = (await import("utif")).default;
  const buffer = await file.arrayBuffer();

  const ifds = UTIF.decode(buffer);
  if (!ifds.length) {
    throw new Error("No image found in the TIFF file.");
  }

  return ifds.map((page) => {
    UTIF.decodeImage(buffer, page);
    const rgba = UTIF.toRGBA8(page);
    const width = page.width;
    const height = page.height;

    if (!width || !height) {
      throw new Error("Invalid TIFF dimensions.");
    }

    return {
      width,
      height,
      rgba: Uint8Array.from(rgba),
    };
  });
}

export async function tiffPageToPngBlob(page: DecodedTiffPage) {
  const { width, height, rgba } = page;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to initialize canvas.");
  }

  const imageData = ctx.createImageData(width, height);
  imageData.data.set(new Uint8ClampedArray(rgba.buffer, rgba.byteOffset, rgba.byteLength));
  ctx.putImageData(imageData, 0, 0);

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Failed to encode PNG."))),
      "image/png",
    );
  });

}

export async function tiffToPngFile(file: File): Promise<File> {
  const pages = await decodeTiffPages(file);
  const blob = await tiffPageToPngBlob(pages[0]);
  const name = file.name.replace(/\.tiff?$/i, "") + ".png";
  return new File([blob], name, { type: "image/png" });
}
