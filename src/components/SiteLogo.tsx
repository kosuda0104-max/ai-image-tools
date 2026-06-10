type Tone = "light" | "dark";

type Props = {
  compact?: boolean;
  variant?: "quiet" | "wordmark" | "monogram";
  /** "dark" renders the logo for dark backgrounds (white text). */
  tone?: Tone;
};

function QuietMark({ tone }: { tone: Tone }) {
  return (
    <span
      className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
        tone === "dark" ? "bg-white/10 text-white" : "bg-slate-100 text-slate-700"
      }`}
    >
      <svg
        aria-hidden="true"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3.25"
          y="4"
          width="8"
          height="10"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 6.75H13.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 10.5H13.25"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function MonogramMark({ tone }: { tone: Tone }) {
  return (
    <span
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-semibold tracking-[0.18em] ${
        tone === "dark" ? "bg-white text-slate-900" : "bg-slate-900 text-white"
      }`}
    >
      FW
    </span>
  );
}

function Wordmark({ compact, tone }: { compact: boolean; tone: Tone }) {
  return (
    <span
      className={`font-semibold tracking-tight ${
        tone === "dark" ? "text-white" : "text-slate-950"
      } ${compact ? "text-base" : "text-xl"}`}
    >
      File
      <span className={tone === "dark" ? "text-blue-400" : "text-blue-600"}>
        wisp
      </span>
    </span>
  );
}

function MarkWithLabel({
  compact,
  tone,
  mark,
}: {
  compact: boolean;
  tone: Tone;
  mark: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {mark}
      <Wordmark compact={compact} tone={tone} />
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

  if (variant === "monogram") {
    return <MarkWithLabel compact={compact} tone={tone} mark={<MonogramMark tone={tone} />} />;
  }

  return <MarkWithLabel compact={compact} tone={tone} mark={<QuietMark tone={tone} />} />;
}
