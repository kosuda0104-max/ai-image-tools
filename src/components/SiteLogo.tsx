type Tone = "light" | "dark";

type Props = {
  compact?: boolean;
  variant?: "quiet" | "wordmark";
  /** "dark" renders the logo for dark backgrounds (white text). */
  tone?: Tone;
};

function BrandMark({ compact, tone }: { compact: boolean; tone: Tone }) {
  // Unique gradient ids per usage so multiple logos on one page don't collide.
  const id = `fw-${tone}-${compact ? "c" : "f"}`;
  const height = compact ? 30 : 36;
  const width = Math.round(height * 1.1875);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 76 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id={`${id}-b`} x1="28" y1="8" x2="52" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2E97F0" />
          <stop offset="1" stopColor="#2C6FE0" />
        </linearGradient>
        <linearGradient id={`${id}-f`} x1="50" y1="8" x2="58" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#DCEBFC" />
          <stop offset="1" stopColor="#AECEF5" />
        </linearGradient>
        <linearGradient id={`${id}-w`} x1="40" y1="36" x2="15" y2="59" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5663E6" />
          <stop offset="0.55" stopColor="#7B45E8" />
          <stop offset="1" stopColor="#8A37E0" />
        </linearGradient>
      </defs>
      <g strokeLinecap="round">
        <line x1="17" y1="26" x2="26" y2="26" stroke="#6BB5F5" strokeWidth="3.2" />
        <line x1="7" y1="31.5" x2="26" y2="31.5" stroke="#2E97F0" strokeWidth="3.2" />
        <line x1="11" y1="37" x2="26" y2="37" stroke="#2E97F0" strokeWidth="3.2" />
        <line x1="18" y1="42.5" x2="26" y2="42.5" stroke="#6BB5F5" strokeWidth="3.2" />
      </g>
      <path
        d="M40 36 C 41.5 49, 35 56.5, 23 59.5 C 17 61, 13 60, 15.5 56.8 C 26 54.5, 33 48, 34.5 37.5 Z"
        fill={`url(#${id}-w)`}
      />
      <rect x="28" y="8" width="12" height="40" rx="4" fill={`url(#${id}-b)`} />
      <rect x="28" y="8" width="29" height="12" rx="4" fill={`url(#${id}-b)`} />
      <rect x="28" y="25" width="19" height="11" rx="4" fill={`url(#${id}-b)`} />
      <path d="M51 8 H57 V14 Z" fill={`url(#${id}-f)`} />
    </svg>
  );
}

function Wordmark({ compact, tone }: { compact: boolean; tone: Tone }) {
  return (
    <span
      className={`font-bold tracking-tight ${
        tone === "dark" ? "text-white" : "text-[#11224A]"
      } ${compact ? "text-base" : "text-xl"}`}
    >
      Filewisp
    </span>
  );
}

export default function SiteLogo({
  compact = false,
  variant = "quiet",
  tone = "light",
}: Props) {
  if (variant === "wordmark") {
    return <Wordmark compact={compact} tone={tone} />;
  }

  return (
    <span className="inline-flex items-center gap-2">
      <BrandMark compact={compact} tone={tone} />
      <Wordmark compact={compact} tone={tone} />
    </span>
  );
}
