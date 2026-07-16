// Hands files dropped on the homepage over to a tool page across a
// client-side navigation. Module state survives soft navigation only —
// after a hard reload the tool page simply starts empty, which is fine.
let pending: File[] | null = null;

export function setPendingFiles(files: File[]): void {
  pending = files;
}

export function takePendingFiles(): File[] | null {
  const files = pending;
  pending = null;
  return files;
}
