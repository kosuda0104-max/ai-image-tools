"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ADSENSE_LOADER_SRC } from "@/src/lib/ads";

const AD_FREE_PATHS = new Set([
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/en/about",
  "/en/contact",
  "/en/privacy-policy",
  "/en/terms",
]);

const SCRIPT_ID = "adsbygoogle-loader";

/**
 * Loads the AdSense bundle once the browser is idle after load.
 *
 * It used to run through next/script with `afterInteractive`, where its first
 * execution measured as a 168ms long task starting the moment the page
 * finished loading — right when someone is trying to use the tool. The units
 * sit below the fold, so none of that work needs to happen that early.
 *
 * next/script's `lazyOnload` was tried first and never injected the tag at all
 * (no request to pagead2 was made), which would silently stop ad serving, so
 * the tag is appended directly instead: the timing stays observable and the
 * script is guaranteed to load.
 *
 * The idle timeout is kept short (1.5s) so ads still appear promptly: the goal
 * is to clear the interaction window right after load, not to postpone revenue.
 */
export default function AdSenseLoader() {
  const pathname = usePathname();
  const adFree = pathname ? AD_FREE_PATHS.has(pathname) : false;

  useEffect(() => {
    if (adFree) return;
    if (document.getElementById(SCRIPT_ID)) return;

    let cancelled = false;

    const inject = () => {
      if (cancelled || document.getElementById(SCRIPT_ID)) return;
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = ADSENSE_LOADER_SRC;
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    };

    const whenIdle = () => {
      if (cancelled) return;
      const ric = (
        window as unknown as {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback;
      if (ric) ric(inject, { timeout: 1500 });
      else window.setTimeout(inject, 800);
    };

    if (document.readyState === "complete") {
      whenIdle();
      return () => {
        cancelled = true;
      };
    }

    window.addEventListener("load", whenIdle, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", whenIdle);
    };
  }, [adFree]);

  if (adFree) return null;

  return (
    <>
      {/* Warm the connections so the deferred script still starts quickly. */}
      <link
        rel="preconnect"
        href="https://pagead2.googlesyndication.com"
        crossOrigin="anonymous"
      />
      <link
        rel="preconnect"
        href="https://googleads.g.doubleclick.net"
        crossOrigin="anonymous"
      />
    </>
  );
}
