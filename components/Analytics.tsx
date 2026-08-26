import Script from "next/script";
import { CF_BEACON_SRC, CF_BEACON_TOKEN, isAnalyticsEnabled } from "@/src/lib/analytics";

export default function Analytics() {
  if (!isAnalyticsEnabled) {
    return null;
  }

  return (
    <Script
      id="cf-web-analytics"
      src={CF_BEACON_SRC}
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
    />
  );
}
