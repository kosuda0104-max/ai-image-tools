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

const configuredClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
const guideSlot = process.env.NEXT_PUBLIC_AD_SLOT_GUIDE?.trim() ?? "";
const toolSlot = process.env.NEXT_PUBLIC_AD_SLOT_TOOL?.trim() || guideSlot;
const directorySlot = process.env.NEXT_PUBLIC_AD_SLOT_DIRECTORY?.trim() || toolSlot;
const homeSlot = process.env.NEXT_PUBLIC_AD_SLOT_HOME?.trim() || directorySlot;

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
