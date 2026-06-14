"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/src/lib/ads";

type Props = {
  /** data-ad-slot value from the AdSense dashboard. Empty = render nothing. */
  slot: string;
  /** data-ad-format (e.g. "auto", "fluid"). */
  format?: string;
  /** Whether the unit may expand to full container width. */
  responsive?: boolean;
  /** Extra classes on the wrapper. */
  className?: string;
};

export default function AdUnit({
  slot,
  format = "auto",
  responsive = true,
  className,
}: Props) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current || !slot) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // Ignore – e.g. blocked by an ad blocker or loader not ready.
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <aside
      className={`my-8 ${className ?? ""}`}
      aria-label="広告"
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </aside>
  );
}
