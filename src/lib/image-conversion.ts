export type CanvasConversionOptions = {
  file: File;
  outputType: "image/png" | "image/jpeg" | "image/webp";
  quality?: number;
  fillBackground?: string;
};

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export function getBaseName(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "");
}

export function triggerBlobDownload(blob: Blob, fileName: string) {
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(downloadUrl);
}

export async function convertImageWithCanvas({
  file,
  outputType,
  quality,
  fillBackground,
}: CanvasConversionOptions) {
  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(objectUrl);
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth || image.width;
    canvas.height = image.naturalHeight || image.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to initialize canvas.");
    }

    if (fillBackground) {
      ctx.fillStyle = fillBackground;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(image, 0, 0);

    return await canvasToBlob(canvas, outputType, quality);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image."));
    image.src = src;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  outputType: CanvasConversionOptions["outputType"],
  quality?: number
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Failed to convert image."));
        return;
      }

      resolve(blob);
    }, outputType, quality);
  });
}
