import type { ReactNode } from "react";

/**
 * Visual identity for each tool: a gradient color tile + a glyph icon,
 * inspired by tool sites like iLovePDF / Smallpdf where every tool is
 * recognizable at a glance by its colored icon.
 */

type ToolKind =
  | "pdf"
  | "compress"
  | "resize"
  | "crop"
  | "rotate"
  | "flip"
  | "watermark"
  | "grayscale"
  | "code"
  | "data"
  | "convert";

const gradients: Record<ToolKind | string, string> = {
  pdf: "from-rose-500 to-red-500",
  compress: "from-amber-500 to-orange-500",
  resize: "from-emerald-500 to-green-500",
  crop: "from-emerald-500 to-teal-500",
  rotate: "from-teal-500 to-cyan-500",
  flip: "from-cyan-500 to-sky-500",
  watermark: "from-fuchsia-500 to-purple-500",
  grayscale: "from-slate-500 to-gray-600",
  code: "from-indigo-500 to-violet-500",
  data: "from-teal-500 to-emerald-500",
  // conversions colored by the primary format
  jpg: "from-orange-500 to-amber-500",
  png: "from-blue-500 to-indigo-500",
  webp: "from-violet-500 to-purple-500",
  heic: "from-emerald-500 to-teal-500",
  avif: "from-indigo-500 to-blue-500",
  gif: "from-pink-500 to-rose-500",
  svg: "from-sky-500 to-cyan-500",
  bmp: "from-teal-500 to-cyan-500",
  tiff: "from-cyan-500 to-blue-500",
  ico: "from-slate-500 to-slate-700",
  convert: "from-blue-500 to-indigo-500",
};

function Glyph({ d, fill = false }: { d: string; fill?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill={fill ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const icons: Record<ToolKind, ReactNode> = {
  pdf: <Glyph d="M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM14 3v4h4M9 13h6M9 16h6M9 10h2" />,
  compress: <Glyph d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4M8 12h8" />,
  resize: <Glyph d="M3 8V4a1 1 0 0 1 1-1h4M21 16v4a1 1 0 0 1-1 1h-4M9 21H4a1 1 0 0 1-1-1v-5M15 3h5a1 1 0 0 1 1 1v5" />,
  crop: <Glyph d="M6 2v14a2 2 0 0 0 2 2h14M2 6h14a2 2 0 0 1 2 2v14" />,
  rotate: <Glyph d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5" />,
  flip: <Glyph d="M12 3v18M7 8l-3 4 3 4M17 8l3 4-3 4" />,
  watermark: <Glyph d="M5 21h14M7 17l5-12 5 12M9.5 12h5" />,
  grayscale: <Glyph d="M12 3a9 9 0 0 0 0 18zM12 3a9 9 0 0 1 0 18" fill />,
  code: <Glyph d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 6l-2 12" />,
  data: <Glyph d="M4 5h16v14H4zM4 10h16M4 15h16M10 5v14" />,
  convert: <Glyph d="M4 8h12l-3-3M20 16H8l3 3" />,
};

function detectKind(slug: string, name: string): { kind: ToolKind; colorKey: string } {
  const s = slug.toLowerCase();
  const n = name.toLowerCase();

  if (s.includes("pdf") || n.includes("pdf")) return { kind: "pdf", colorKey: "pdf" };
  if (s.includes("compress") || n.includes("圧縮")) return { kind: "compress", colorKey: "compress" };
  if (s.includes("resize") || n.includes("リサイズ")) return { kind: "resize", colorKey: "resize" };
  if (s.includes("crop") || n.includes("切り抜き")) return { kind: "crop", colorKey: "crop" };
  if (s.includes("rotate") || n.includes("回転")) return { kind: "rotate", colorKey: "rotate" };
  if (s.includes("flip") || n.includes("反転")) return { kind: "flip", colorKey: "flip" };
  if (s.includes("watermark") || n.includes("透かし")) return { kind: "watermark", colorKey: "watermark" };
  if (s.includes("grayscale") || n.includes("白黒")) return { kind: "grayscale", colorKey: "grayscale" };
  if (s.includes("base64")) return { kind: "code", colorKey: "code" };
  if (s.includes("parquet") || s.includes("csv") || s.includes("json")) return { kind: "data", colorKey: "data" };

  // conversions: color by the target format (after "to")
  const target = s.split("-to-").pop() ?? s;
  for (const fmt of ["webp", "heic", "avif", "tiff", "jpg", "jpeg", "png", "gif", "svg", "bmp", "ico"]) {
    if (target.includes(fmt) || s.includes(fmt)) {
      return { kind: "convert", colorKey: fmt === "jpeg" ? "jpg" : fmt };
    }
  }

  return { kind: "convert", colorKey: "convert" };
}

export function getToolGradient(name: string, href: string): string {
  const slug = href.split("/").pop() ?? "";
  const { colorKey } = detectKind(slug, name);
  return gradients[colorKey] ?? gradients.convert;
}

export function getToolIcon(name: string, href: string): ReactNode {
  const slug = href.split("/").pop() ?? "";
  const { kind } = detectKind(slug, name);
  return icons[kind];
}

/** A colored gradient tile with the tool's glyph icon. */
export function ToolIcon({
  name,
  href,
  size = "md",
}: {
  name: string;
  href: string;
  size?: "sm" | "md";
}) {
  const gradient = getToolGradient(name, href);
  const icon = getToolIcon(name, href);
  const sizing = size === "sm" ? "h-9 w-9 rounded-lg" : "h-11 w-11 rounded-xl";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center bg-gradient-to-br text-white shadow-sm ${gradient} ${sizing}`}
    >
      {icon}
    </span>
  );
}
