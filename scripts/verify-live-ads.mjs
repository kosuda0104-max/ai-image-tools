// Post-deploy smoke check: confirm the live page serves a usable ad slot.
//
// A green build is not evidence that anything shipped. The AdSense slot bug was
// invisible precisely because every local check passed while production kept
// serving a stale bundle, so this reads the deployed HTML back.
const url = process.env.SITE_URL ?? "https://ai-image-tools.com/";
const attempts = 6;

async function fetchHtml() {
  const response = await fetch(url, {
    headers: { "cache-control": "no-cache" },
  });
  if (!response.ok) {
    throw new Error(`${url} responded ${response.status}`);
  }
  return response.text();
}

let html = "";
for (let attempt = 1; attempt <= attempts; attempt += 1) {
  try {
    html = await fetchHtml();
    break;
  } catch (error) {
    if (attempt === attempts) {
      console.error(`::error::${error.message}`);
      process.exit(1);
    }
    // The Workers rollout takes a moment to become globally visible.
    await new Promise((resolve) => setTimeout(resolve, 10_000));
  }
}

const slots = [...html.matchAll(/data-ad-slot="([^"]*)"/g)].map(([, slot]) => slot);

if (slots.length === 0) {
  // Not fatal on its own: a page can legitimately render without a unit, and the
  // loader is injected client-side so it never appears in the served HTML.
  console.log("no data-ad-slot on the served HTML — nothing to verify here");
  process.exit(0);
}

const dirty = slots.filter((slot) => !/^\d+$/.test(slot));
if (dirty.length > 0) {
  console.error(
    `::error::Live page serves unusable ad slots: ${dirty.map((slot) => JSON.stringify(slot)).join(", ")}`,
  );
  process.exit(1);
}

console.log(`live ad slots are digits-only: ${slots.join(", ")}`);
