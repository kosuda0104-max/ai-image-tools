import type { ReactNode } from "react";

/**
 * Topic illustration shown at the top of each guide. The illustration kind is
 * derived automatically from the guide slug, so every guide gets a relevant
 * banner with no per-guide authoring. Pure inline SVG — no JS, crisp at any
 * size, and styled with the brand palette.
 */

const FORMAT_COLORS: Record<string, string> = {
  JPG: "#f97316",
  JPEG: "#f97316",
  PNG: "#3b82f6",
  WEBP: "#8b5cf6",
  HEIC: "#10b981",
  PDF: "#ef4444",
  TIFF: "#06b6d4",
  CSV: "#14b8a6",
  PARQUET: "#0d9488",
  JSON: "#eab308",
  AVIF: "#10b981",
  GIF: "#ec4899",
  SVG: "#0ea5e9",
  IMG: "#6366f1",
};

function color(label: string): string {
  return FORMAT_COLORS[label.toUpperCase()] ?? "#6366f1";
}

function Chip({
  x,
  y,
  label,
  w = 96,
}: {
  x: number;
  y: number;
  label: string;
  w?: number;
}) {
  const c = color(label);
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={w} height={64} rx={14} fill="white" stroke={c} strokeWidth={2} />
      <rect width={w} height={64} rx={14} fill={c} opacity={0.08} />
      <text
        x={w / 2}
        y={40}
        textAnchor="middle"
        fontSize={22}
        fontWeight={800}
        fill={c}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        {label}
      </text>
    </g>
  );
}

function Arrow({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <line x1={0} y1={0} x2={42} y2={0} stroke="#94a3b8" strokeWidth={4} strokeLinecap="round" />
      <path d="M38 -8 L52 0 L38 8 Z" fill="#94a3b8" />
    </g>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-slate-50 to-blue-50">
      <svg viewBox="0 0 720 200" className="h-auto w-full" role="img" aria-hidden="true">
        {children}
      </svg>
    </div>
  );
}

function FormatFlow({ from, to }: { from: string; to: string }) {
  return (
    <Frame>
      <Chip x={196} y={68} label={from} />
      <Arrow x={316} y={100} />
      <Chip x={388} y={68} label={to} />
      <text x={360} y={168} textAnchor="middle" fontSize={15} fill="#64748b" fontFamily="ui-sans-serif, system-ui">
        {from} → {to}
      </text>
    </Frame>
  );
}

function Versus({ a, b }: { a: string; b: string }) {
  const ca = color(a);
  const cb = color(b);
  return (
    <Frame>
      <g transform="translate(150, 56)">
        <rect width={130} height={88} rx={16} fill="white" stroke={ca} strokeWidth={2.5} />
        <rect width={130} height={88} rx={16} fill={ca} opacity={0.08} />
        <text x={65} y={54} textAnchor="middle" fontSize={26} fontWeight={800} fill={ca} fontFamily="ui-sans-serif, system-ui">
          {a}
        </text>
      </g>
      <text x={360} y={110} textAnchor="middle" fontSize={22} fontWeight={800} fill="#94a3b8" fontFamily="ui-sans-serif, system-ui">
        VS
      </text>
      <g transform="translate(440, 56)">
        <rect width={130} height={88} rx={16} fill="white" stroke={cb} strokeWidth={2.5} />
        <rect width={130} height={88} rx={16} fill={cb} opacity={0.08} />
        <text x={65} y={54} textAnchor="middle" fontSize={26} fontWeight={800} fill={cb} fontFamily="ui-sans-serif, system-ui">
          {b}
        </text>
      </g>
    </Frame>
  );
}

function FormatsRow({ labels }: { labels: string[] }) {
  const total = labels.length;
  const gap = 16;
  const w = 92;
  const startX = (720 - (total * w + (total - 1) * gap)) / 2;
  return (
    <Frame>
      {labels.map((l, i) => (
        <Chip key={l} x={startX + i * (w + gap)} y={68} label={l} w={w} />
      ))}
    </Frame>
  );
}

function DocumentArt() {
  return (
    <Frame>
      {/* stacked pages */}
      <g transform="translate(300, 36)">
        <rect x={16} y={10} width={104} height={128} rx={10} fill="#fecaca" />
        <rect x={8} y={4} width={104} height={128} rx={10} fill="#fca5a5" />
        <rect width={104} height={128} rx={10} fill="white" stroke="#ef4444" strokeWidth={2} />
        <path d="M76 0 L104 26 L76 26 Z" fill="#ef4444" opacity={0.25} />
        <text x={20} y={108} fontSize={16} fontWeight={800} fill="#ef4444" fontFamily="ui-sans-serif, system-ui">
          PDF
        </text>
        <line x1={20} y1={44} x2={84} y2={44} stroke="#fca5a5" strokeWidth={4} strokeLinecap="round" />
        <line x1={20} y1={60} x2={84} y2={60} stroke="#fecaca" strokeWidth={4} strokeLinecap="round" />
        <line x1={20} y1={76} x2={68} y2={76} stroke="#fecaca" strokeWidth={4} strokeLinecap="round" />
      </g>
    </Frame>
  );
}

function ShrinkArt() {
  return (
    <Frame>
      <g transform="translate(176, 44)">
        <rect width={120} height={112} rx={14} fill="#bfdbfe" stroke="#3b82f6" strokeWidth={2} />
        <text x={60} y={64} textAnchor="middle" fontSize={20} fontWeight={800} fill="#1d4ed8" fontFamily="ui-sans-serif, system-ui">
          5 MB
        </text>
      </g>
      <Arrow x={320} y={100} />
      <g transform="translate(404, 74)">
        <rect width={72} height={56} rx={10} fill="#bbf7d0" stroke="#22c55e" strokeWidth={2} />
        <text x={36} y={36} textAnchor="middle" fontSize={16} fontWeight={800} fill="#15803d" fontFamily="ui-sans-serif, system-ui">
          0.8 MB
        </text>
      </g>
      <text x={510} y={108} fontSize={26} fontWeight={800} fill="#22c55e" fontFamily="ui-sans-serif, system-ui">
        ✓
      </text>
    </Frame>
  );
}

function DeviceArt() {
  return (
    <Frame>
      <g transform="translate(312, 30)">
        <rect width={96} height={140} rx={16} fill="white" stroke="#334155" strokeWidth={3} />
        <rect x={10} y={16} width={76} height={96} rx={6} fill="#dbeafe" />
        <circle cx={48} cy={56} r={16} fill="#60a5fa" />
        <path d="M22 100 L40 74 L56 92 L66 80 L74 100 Z" fill="#3b82f6" />
        <rect x={36} y={120} width={24} height={6} rx={3} fill="#cbd5e1" />
      </g>
    </Frame>
  );
}

type Hero =
  | { kind: "flow"; from: string; to: string }
  | { kind: "versus"; a: string; b: string }
  | { kind: "formats"; labels: string[] }
  | { kind: "document" }
  | { kind: "shrink" }
  | { kind: "device" };

function heroFor(slug: string): Hero {
  const s = slug.toLowerCase();

  // explicit conversions
  if (s === "heic-to-jpg-guide" || s === "heic-cannot-open-windows") return { kind: "flow", from: "HEIC", to: "JPG" };
  if (s === "what-is-webp") return { kind: "flow", from: "WebP", to: "JPG" };
  if (s === "what-is-tiff") return { kind: "flow", from: "TIFF", to: "JPG" };
  if (s === "pdf-to-jpg-guide") return { kind: "flow", from: "PDF", to: "JPG" };
  if (s === "parquet-csv-workflows") return { kind: "flow", from: "Parquet", to: "CSV" };
  if (s === "what-is-parquet") return { kind: "flow", from: "Parquet", to: "CSV" };
  if (s === "what-is-avif") return { kind: "flow", from: "AVIF", to: "JPG" };
  if (s === "iphone-photos-to-pdf") return { kind: "flow", from: "HEIC", to: "PDF" };
  if (s === "screenshot-to-pdf") return { kind: "flow", from: "IMG", to: "PDF" };

  // PDF size-reduction guides read better as a shrink illustration
  if (s === "pdf-upload-size-limit") return { kind: "shrink" };

  // comparisons
  if (s === "jpg-vs-png") return { kind: "versus", a: "JPG", b: "PNG" };
  if (s === "png-vs-webp") return { kind: "versus", a: "PNG", b: "WebP" };
  if (s === "jpg-vs-jpeg-difference") return { kind: "versus", a: "JPG", b: "JPEG" };
  if (s === "png-transparency-basics") return { kind: "versus", a: "PNG", b: "JPG" };
  if (s === "json-and-csv") return { kind: "versus", a: "JSON", b: "CSV" };
  if (s === "csv-encoding-fix") return { kind: "formats", labels: ["CSV", "JSON", "Parquet"] };

  // format overviews
  if (s === "image-format-basics" || s === "choose-best-image-format-for-web") {
    return { kind: "formats", labels: ["JPG", "PNG", "WebP", "HEIC"] };
  }

  // pdf documents
  if (s.includes("pdf") || s === "merge-or-split-pdf" || s === "how-to-remove-pages-from-pdf") {
    return { kind: "document" };
  }

  // size / compression / upload
  if (
    s.includes("compress") ||
    s.includes("large") ||
    s.includes("upload") ||
    s.includes("optimize") ||
    s === "send-large-photos-by-email" ||
    s === "resize-images-for-web" ||
    s === "prepare-images-for-upload"
  ) {
    return { kind: "shrink" };
  }

  // device / photo workflows
  if (
    s === "convert-images-on-smartphone" ||
    s === "marketplace-product-photos" ||
    s === "resume-photo-size" ||
    s === "grayscale-photo" ||
    s === "add-watermark-to-image" ||
    s === "crop-image-to-square"
  ) {
    return { kind: "device" };
  }

  return { kind: "formats", labels: ["JPG", "PNG", "WebP", "PDF"] };
}

export default function GuideHero({ slug }: { slug: string }) {
  const hero = heroFor(slug);

  switch (hero.kind) {
    case "flow":
      return <FormatFlow from={hero.from} to={hero.to} />;
    case "versus":
      return <Versus a={hero.a} b={hero.b} />;
    case "formats":
      return <FormatsRow labels={hero.labels} />;
    case "document":
      return <DocumentArt />;
    case "shrink":
      return <ShrinkArt />;
    case "device":
      return <DeviceArt />;
    default:
      return null;
  }
}
