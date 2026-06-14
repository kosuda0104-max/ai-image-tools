// Google AdSense configuration.
//
// The loader script (with this client ID) is injected once in app/layout.tsx.
// Each manual ad unit needs a slot ID created in the AdSense dashboard:
//   Ads → By ad unit → Display ads → create unit → copy the data-ad-slot value.
//
// Slot IDs are read from public env vars so an unconfigured placement renders
// nothing instead of an empty/broken ad. Set these in .env.local (and on the
// host, e.g. Vercel) to turn a placement on:
//   NEXT_PUBLIC_AD_SLOT_GUIDE=1234567890
//   NEXT_PUBLIC_AD_SLOT_TOOL=0987654321

export const ADSENSE_CLIENT = "ca-pub-9678380581323736";

export const AD_SLOTS = {
  /** In-article unit shown inside guide articles. */
  guideInArticle: process.env.NEXT_PUBLIC_AD_SLOT_GUIDE ?? "",
  /** In-article unit shown inside the long-form content on tool pages. */
  toolInArticle: process.env.NEXT_PUBLIC_AD_SLOT_TOOL ?? "",
} as const;
