"use client";

import { useEffect } from "react";

// Registers the static-asset service worker (see public/sw.js). Required for
// PWA installability alongside app/manifest.ts.
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failures (e.g. private mode) are non-fatal.
      });
    }
  }, []);

  return null;
}
