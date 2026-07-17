import type { CSSProperties } from "react";

type Props = {
  /** Rendered width/height in pixels. */
  size?: number;
  /** "float" = neutral hovering pose, "cheer" = happy closed eyes. */
  mood?: "float" | "cheer";
  className?: string;
  style?: CSSProperties;
};

/**
 * Filewisp's mascot: a small glowing wisp. Pure inline SVG so it works in
 * server components, stays crisp at any size, and adds no image requests.
 */
export default function WispMascot({
  size = 64,
  mood = "float",
  className,
  style,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="Filewisp"
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="wisp-body" x1="20" y1="8" x2="44" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5eead4" />
          <stop offset="0.55" stopColor="#2dd4bf" />
          <stop offset="1" stopColor="#0d9488" />
        </linearGradient>
        <radialGradient id="wisp-glow" cx="0.5" cy="0.45" r="0.5">
          <stop stopColor="#5eead4" stopOpacity="0.35" />
          <stop offset="1" stopColor="#5eead4" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft glow */}
      <circle cx="32" cy="34" r="28" fill="url(#wisp-glow)" />

      {/* Body: droplet with a flicked tail */}
      <path
        d="M32 8
           C 33 14, 44 18, 45 30
           C 45.8 40, 40 49, 32 54
           C 24 49, 18.2 40, 19 30
           C 20 18, 31 14, 32 8 Z"
        fill="url(#wisp-body)"
      />

      {/* Face */}
      {mood === "cheer" ? (
        <>
          {/* Happy closed eyes */}
          <path d="M25.5 32 q 2.2 -3 4.4 0" stroke="#134e4a" strokeWidth="2" strokeLinecap="round" />
          <path d="M34.1 32 q 2.2 -3 4.4 0" stroke="#134e4a" strokeWidth="2" strokeLinecap="round" />
          {/* Open smile */}
          <path d="M29 37.5 q 3 3.4 6 0 z" fill="#134e4a" />
        </>
      ) : (
        <>
          {/* Round eyes */}
          <circle cx="27.6" cy="32" r="2.1" fill="#134e4a" />
          <circle cx="36.4" cy="32" r="2.1" fill="#134e4a" />
          {/* Small smile */}
          <path d="M29.5 37.5 q 2.5 2.4 5 0" stroke="#134e4a" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {/* Cheeks */}
      <circle cx="23.6" cy="36" r="1.8" fill="#f9a8d4" opacity="0.55" />
      <circle cx="40.4" cy="36" r="1.8" fill="#f9a8d4" opacity="0.55" />

      {/* Sparkles */}
      <path d="M50 16 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2 Z" fill="#5eead4" opacity="0.9" />
      <path d="M13 22 l0.9 2.2 2.2 0.9 -2.2 0.9 -0.9 2.2 -0.9 -2.2 -2.2 -0.9 2.2 -0.9 Z" fill="#99f6e4" opacity="0.8" />
    </svg>
  );
}
