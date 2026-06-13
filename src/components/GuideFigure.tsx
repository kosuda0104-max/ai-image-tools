import type { GuideFigure as GuideFigureData } from "@/src/data/guides";

/**
 * Inline illustration shown inside a guide section (under the heading). Unlike
 * GuideHero — which renders one banner per guide from the slug — these are
 * authored per section in the guide data, so a how-to section can carry its own
 * step-flow or conversion diagram. Pure inline SVG: no JS, crisp at any size,
 * server-rendered, styled with the brand palette.
 */

const FORMAT_COLORS: Record<string, string> = {
  JPG: "#f97316",
  JPEG: "#f97316",
  PNG: "#3b82f6",
  WEBP: "#8b5cf6",
  HEIC: "#10b981",
  AVIF: "#10b981",
  PDF: "#ef4444",
  TIFF: "#06b6d4",
  CSV: "#14b8a6",
  PARQUET: "#0d9488",
  JSON: "#eab308",
  GIF: "#ec4899",
  SVG: "#0ea5e9",
  IMG: "#6366f1",
};

function color(label: string): string {
  return FORMAT_COLORS[label.toUpperCase()] ?? "#6366f1";
}

function Frame({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption?: string;
}) {
  return (
    <figure className="my-1 overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-slate-50 to-blue-50">
      <svg viewBox="0 0 720 150" className="h-auto w-full" role="img" aria-hidden="true">
        {children}
      </svg>
      {caption ? (
        <figcaption className="border-t border-gray-200 bg-white/60 px-4 py-2 text-xs text-gray-500">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function StepFlow({ steps, caption }: { steps: string[]; caption?: string }) {
  const n = steps.length;
  const arrowW = 30;
  const boxH = 78;
  const y = 28;
  const boxW = Math.min(190, (720 - (n - 1) * arrowW - 24) / n);
  const used = n * boxW + (n - 1) * arrowW;
  const startX = (720 - used) / 2;

  return (
    <Frame caption={caption}>
      {steps.map((label, i) => {
        const x = startX + i * (boxW + arrowW);
        const lines = label.split("\n");
        return (
          <g key={`${label}-${i}`}>
            <rect
              x={x}
              y={y}
              width={boxW}
              height={boxH}
              rx={12}
              fill="white"
              stroke="#c7d2fe"
              strokeWidth={2}
            />
            <circle cx={x + 22} cy={y + 22} r={13} fill="#6366f1" />
            <text
              x={x + 22}
              y={y + 27}
              textAnchor="middle"
              fontSize={15}
              fontWeight={800}
              fill="white"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
            >
              {i + 1}
            </text>
            {lines.map((line, li) => (
              <text
                key={li}
                x={x + boxW / 2}
                y={y + 52 + (li - (lines.length - 1) / 2) * 20}
                textAnchor="middle"
                fontSize={15}
                fontWeight={600}
                fill="#334155"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
              >
                {line}
              </text>
            ))}
            {i < n - 1 ? (
              <g transform={`translate(${x + boxW + 5}, ${y + boxH / 2})`}>
                <line x1={0} y1={0} x2={20} y2={0} stroke="#94a3b8" strokeWidth={3} strokeLinecap="round" />
                <path d="M16 -6 L28 0 L16 6 Z" fill="#94a3b8" />
              </g>
            ) : null}
          </g>
        );
      })}
    </Frame>
  );
}

function FormatChip({ x, label, w }: { x: number; label: string; w: number }) {
  const c = color(label);
  return (
    <g transform={`translate(${x}, 40)`}>
      <rect width={w} height={66} rx={14} fill="white" stroke={c} strokeWidth={2} />
      <rect width={w} height={66} rx={14} fill={c} opacity={0.08} />
      <text
        x={w / 2}
        y={42}
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

function ConvertFlow({
  from,
  to,
  caption,
}: {
  from: string;
  to: string;
  caption?: string;
}) {
  const w = 150;
  return (
    <Frame caption={caption}>
      <FormatChip x={170} label={from} w={w} />
      <g transform="translate(338, 73)">
        <line x1={0} y1={0} x2={32} y2={0} stroke="#94a3b8" strokeWidth={4} strokeLinecap="round" />
        <path d="M28 -8 L44 0 L28 8 Z" fill="#94a3b8" />
      </g>
      <FormatChip x={400} label={to} w={w} />
    </Frame>
  );
}

export default function GuideFigure({ figure }: { figure: GuideFigureData }) {
  switch (figure.kind) {
    case "steps":
      return <StepFlow steps={figure.steps} caption={figure.caption} />;
    case "flow":
      return <ConvertFlow from={figure.from} to={figure.to} caption={figure.caption} />;
    default:
      return null;
  }
}
