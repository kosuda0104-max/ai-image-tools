// Cloudflare Web Analytics configuration.
//
// The site is served from Cloudflare Workers (vinext), so Vercel Analytics is
// unavailable — /_vercel/insights/* is not routed. Cloudflare Web Analytics is
// cookieless and stores no visitor identifiers, which keeps it compatible with
// the "files never leave your browser" promise and needs no consent banner.
//
// Set the beacon token from the Cloudflare dashboard:
//   NEXT_PUBLIC_CF_BEACON_TOKEN=0123456789abcdef0123456789abcdef
//
// Without the token the beacon is not rendered at all, so local builds and
// previews stay free of third-party requests.

/**
 * Beacon tokens are 32 lowercase hex characters. Values pasted out of the
 * Cloudflare dashboard and through shells have historically arrived wrapped in
 * quotes or with a trailing "\r" (see readSlot in src/lib/ads.ts, where exactly
 * that shipped to production), so anything outside the expected alphabet is
 * dropped instead of being passed through to data-cf-beacon.
 */
function readBeaconToken(value: string | undefined): string {
  const cleaned = (value ?? "").replace(/[^a-fA-F0-9]/g, "").toLowerCase();
  return /^[a-f0-9]{32}$/.test(cleaned) ? cleaned : "";
}

export const CF_BEACON_TOKEN = readBeaconToken(
  process.env.NEXT_PUBLIC_CF_BEACON_TOKEN,
);

export const CF_BEACON_SRC = "https://static.cloudflareinsights.com/beacon.min.js";

export const isAnalyticsEnabled = CF_BEACON_TOKEN !== "";
