// Google AdSense configuration.
//
// The loader script is injected once in app/layout.tsx. Manual placements use
// display ad slot IDs from public env vars. If only one slot is configured,
// the site reuses it so ads can go live immediately after approval:
//   NEXT_PUBLIC_AD_SLOT_GUIDE=1234567890
//
// Optional reporting-specific slots:
//   NEXT_PUBLIC_AD_SLOT_TOOL=0987654321
//   NEXT_PUBLIC_AD_SLOT_HOME=2345678901
//   NEXT_PUBLIC_AD_SLOT_DIRECTORY=3456789012
//   NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx

/**
 * Slot IDs are digits only. Values arriving from dashboards and shells have
 * picked up stray quotes and escape sequences (a literal "\r" once shipped to
 * production and stopped AdSense from matching the unit), so anything that is
 * not a digit is dropped rather than passed through to data-ad-slot.
 */
function readSlot(value: string | undefined): string {
  return (value ?? "").replace(/\D/g, "");
}

const configuredClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim().replace(
  /[^a-zA-Z0-9-]/g,
  "",
);
const guideSlot = readSlot(process.env.NEXT_PUBLIC_AD_SLOT_GUIDE);
const toolSlot = readSlot(process.env.NEXT_PUBLIC_AD_SLOT_TOOL) || guideSlot;
const directorySlot = readSlot(process.env.NEXT_PUBLIC_AD_SLOT_DIRECTORY) || toolSlot;
const homeSlot = readSlot(process.env.NEXT_PUBLIC_AD_SLOT_HOME) || directorySlot;

export const ADSENSE_CLIENT =
  configuredClient || "ca-pub-9678380581323736";

export const ADSENSE_LOADER_SRC =
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;

export const AD_SLOTS = {
  /** Manual display unit shown inside guide articles. */
  guideInArticle: guideSlot,
  /** Manual display unit shown after the tool UI on individual tool pages. */
  toolAfterTool: toolSlot,
  /** Manual display unit shown on tool directory pages. */
  directory: directorySlot,
  /** Manual display unit shown on the home page. */
  home: homeSlot,
} as const;
