// Tracks recently used tools in localStorage so the homepage can offer
// one-click access on repeat visits. All functions are client-only and
// fail silently (private browsing, disabled storage, etc.).

const STORAGE_KEY = "filewisp:recent-tools";
const MAX_ENTRIES = 8;

export function getRecentToolSlugs(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

export function recordRecentTool(slug: string): void {
  try {
    const list = getRecentToolSlugs().filter((s) => s !== slug);
    list.unshift(slug);
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(list.slice(0, MAX_ENTRIES)),
    );
  } catch {
    // Ignore storage failures.
  }
}
