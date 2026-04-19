type Props = {
  compact?: boolean;
  variant?: "quiet" | "wordmark" | "monogram";
};

function QuietMark() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700">
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

function MonogramMark() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-[11px] font-semibold tracking-[0.18em] text-white">
      IT
    </span>
  );
}

function WordmarkOnly({ compact }: { compact: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-slate-500">
        AI
      </span>
      <span
        className={`font-semibold tracking-tight text-slate-950 ${
          compact ? "text-base" : "text-xl"
        }`}
      >
        Image Tools
      </span>
    </span>
  );
}

function MarkWithLabel({
  compact,
  mark,
}: {
  compact: boolean;
  mark: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-3">
      {mark}
      <span className="flex flex-col leading-none">
        <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-slate-500">
          AI
        </span>
        <span
          className={`font-semibold tracking-tight text-slate-950 ${
            compact ? "text-base" : "text-xl"
          }`}
        >
          Image Tools
        </span>
      </span>
    </span>
  );
}

export default function SiteLogo({
  compact = false,
  variant = "quiet",
}: Props) {
  if (variant === "wordmark") {
    return <WordmarkOnly compact={compact} />;
  }

  if (variant === "monogram") {
    return <MarkWithLabel compact={compact} mark={<MonogramMark />} />;
  }

  return <MarkWithLabel compact={compact} mark={<QuietMark />} />;
}
