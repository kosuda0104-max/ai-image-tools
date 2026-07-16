// Minimal service worker: cache-first for Next.js hashed static assets only.
// HTML and API responses are always fetched from the network, so deploys are
// never served stale.
const CACHE_NAME = "filewisp-static-v1";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  const isHashedStatic =
    url.origin === self.location.origin &&
    url.pathname.startsWith("/_next/static/");

  if (event.request.method !== "GET" || !isHashedStatic) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request);
      if (cached) return cached;
      const response = await fetch(event.request);
      if (response.ok) cache.put(event.request, response.clone());
      return response;
    }),
  );
});
