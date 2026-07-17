"use client";

import { useEffect } from "react";

// Registers the static-asset service worker (see public/sw.js). Required for
// PWA installability alongside app/manifest.ts.
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // Dev chunks under /_next/static/ are not content-hashed, so the
    // cache-first worker would serve stale code. Register in production only
    // and drop any worker left over from a previous production visit.
    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker.getRegistrations?.().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Registration failures (e.g. private mode) are non-fatal.
    });
  }, []);

  return null;
}
