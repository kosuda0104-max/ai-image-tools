const siteUrl = (process.env.SITE_URL ?? "https://ai-image-tools.com").replace(
  /\/$/,
  "",
);
const requestHeaders = {
  "user-agent": "Filewisp index signal verifier/1.0",
};

function normalizeUrl(value) {
  return value ? value.replace(/\/$/, "") : value;
}

function readLinkAttributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w-]+)=["']([^"']*)["']/g)].map((match) => [
      match[1].toLowerCase(),
      match[2],
    ]),
  );
}

async function fetchText(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { ...requestHeaders, ...options.headers },
    signal: AbortSignal.timeout(20_000),
  });
  const text = await response.text();
  return { response, text };
}

const { response: robotsResponse, text: robots } = await fetchText(
  `${siteUrl}/robots.txt`,
);
if (!robotsResponse.ok) {
  throw new Error(`robots.txt returned ${robotsResponse.status}`);
}
if (!robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`)) {
  throw new Error("robots.txt does not advertise the canonical sitemap URL");
}

const { response: sitemapResponse, text: sitemap } = await fetchText(
  `${siteUrl}/sitemap.xml`,
);
if (!sitemapResponse.ok) {
  throw new Error(`sitemap.xml returned ${sitemapResponse.status}`);
}

const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
if (urls.length === 0) throw new Error("sitemap.xml contains no URLs");
if (new Set(urls).size !== urls.length) {
  throw new Error("sitemap.xml contains duplicate URLs");
}
if (!sitemap.includes("xmlns:xhtml=")) {
  throw new Error("sitemap.xml does not include localized hreflang entries");
}

let cursor = 0;
const failures = [];

async function verifyPage() {
  while (cursor < urls.length) {
    const url = urls[cursor++];

    try {
      const { response, text: html } = await fetchText(url, {
        redirect: "follow",
      });
      if (response.status !== 200) {
        failures.push(`${url}: HTTP ${response.status}`);
        continue;
      }
      if (normalizeUrl(response.url) !== normalizeUrl(url)) {
        failures.push(`${url}: redirected to ${response.url}`);
      }

      const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];
      const links = linkTags.map(readLinkAttributes);
      const canonical = links.find((link) => link.rel === "canonical")?.href;
      if (normalizeUrl(canonical) !== normalizeUrl(url)) {
        failures.push(`${url}: canonical is ${canonical ?? "missing"}`);
      }

      const selfAlternate = links.find(
        (link) =>
          link.rel === "alternate" &&
          normalizeUrl(link.href) === normalizeUrl(url) &&
          link.hreflang,
      );
      if (!selfAlternate) failures.push(`${url}: self hreflang is missing`);

      const robots = [
        ...html.matchAll(
          /<meta[^>]+name=["'](?:robots|googlebot)["'][^>]+content=["']([^"']+)/gi,
        ),
      ].map((match) => match[1]);
      const headerRobots = response.headers.get("x-robots-tag") ?? "";
      if (
        robots.some((value) => /noindex/i.test(value)) ||
        /noindex/i.test(headerRobots)
      ) {
        failures.push(`${url}: noindex is present`);
      }

      const htmlLang = html.match(/<html[^>]+lang=["']([^"']+)/i)?.[1];
      const pathname = new URL(url).pathname;
      const expectedLang = pathname.startsWith("/en")
        ? "en"
        : pathname.startsWith("/zh-tw")
          ? "zh-Hant-TW"
          : "ja";
      if (htmlLang !== expectedLang) {
        failures.push(`${url}: html lang is ${htmlLang ?? "missing"}`);
      }
    } catch (error) {
      failures.push(`${url}: ${error instanceof Error ? error.message : error}`);
    }
  }
}

await Promise.all(Array.from({ length: 12 }, verifyPage));

const canonical = new URL(siteUrl);
if (!canonical.hostname.startsWith("www.")) {
  const wwwUrl = new URL(siteUrl);
  wwwUrl.hostname = `www.${canonical.hostname}`;
  const response = await fetch(wwwUrl, {
    redirect: "manual",
    headers: requestHeaders,
    signal: AbortSignal.timeout(20_000),
  });
  const location = response.headers.get("location");
  if (
    ![301, 308].includes(response.status) ||
    normalizeUrl(location && new URL(location, wwwUrl).toString()) !==
      normalizeUrl(siteUrl)
  ) {
    failures.push(
      `${wwwUrl}: expected a permanent redirect to ${siteUrl}, received ${response.status} ${location ?? ""}`,
    );
  }
}

if (failures.length > 0) {
  throw new Error(`Index signal verification failed:\n${failures.join("\n")}`);
}

console.log(
  `Verified robots.txt, sitemap hreflang, canonical URLs, and indexability for ${urls.length} pages.`,
);
