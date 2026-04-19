type Props = {
  compact?: boolean;
};

export default function SiteLogo({ compact = false }: Props) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-700 shadow-sm">
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="4"
            width="10"
            height="12"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M8 9.5H14.5C16.433 9.5 18 11.067 18 13C18 14.933 16.433 16.5 14.5 16.5H8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 6.5L15 9.5L11.5 12.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
          AI
        </span>
        <span
          className={`font-semibold tracking-tight text-gray-950 ${
            compact ? "text-base" : "text-lg"
          }`}
        >
          Image Tools
        </span>
      </span>
    </span>
  );
}
