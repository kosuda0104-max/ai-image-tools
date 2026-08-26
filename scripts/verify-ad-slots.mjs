// Fails the build when an inlined AdSense identifier carries stray characters.
//
// NEXT_PUBLIC_* values are baked into the bundle at build time, so a slot copied
// out of the dashboard with a trailing "\r" or wrapping quotes ships silently and
// AdSense simply never matches the unit. That happened: production served
// data-ad-slot="7926623874\r" for eight days with no visible error anywhere.
//
// Legitimate values are digits-only slot IDs and the ca-pub-<digits> client, so
// the rule is narrow on purpose: flag a literal only when it holds a long digit
// run *and* a character that has no business being in an identifier.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = "dist/client/assets";
let bundles = [];
try {
  bundles = readdirSync(dir).filter((file) => /^ads-.*\.js$/.test(file));
} catch {
  console.log("no built assets directory — nothing to check");
  process.exit(0);
}

if (bundles.length === 0) {
  console.log("no ads bundle found — nothing to check");
  process.exit(0);
}

const STRAY = /[\\\s"'`]/;
const TEMPLATE_LITERAL = /`((?:[^`\\]|\\.)*)`/g;
let failed = false;

for (const file of bundles) {
  const source = readFileSync(join(dir, file), "utf8");
  for (const [, literal] of source.matchAll(TEMPLATE_LITERAL)) {
    if (/\d{6,}/.test(literal) && STRAY.test(literal)) {
      console.error(
        `::error::${file}: AdSense identifier carries stray characters: ${JSON.stringify(literal)}`,
      );
      failed = true;
    }
  }
}

if (failed) {
  console.error(
    "Check the NEXT_PUBLIC_ADSENSE_CLIENT and NEXT_PUBLIC_AD_SLOT_* repository variables.",
  );
  process.exit(1);
}
console.log(`ad identifiers are clean (${bundles.join(", ")})`);
