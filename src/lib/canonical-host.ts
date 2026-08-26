import { siteUrl } from "@/src/lib/site";

export function getCanonicalHostRedirect(
  requestUrl: string,
  canonicalSiteUrl = siteUrl,
): string | null {
  const request = new URL(requestUrl);
  const canonical = new URL(canonicalSiteUrl);

  if (
    canonical.hostname.startsWith("www.") ||
    request.hostname.toLowerCase() !== `www.${canonical.hostname.toLowerCase()}`
  ) {
    return null;
  }

  request.protocol = canonical.protocol;
  request.hostname = canonical.hostname;
  request.port = canonical.port;
  return request.toString();
}
