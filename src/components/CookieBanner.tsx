"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { SiteLocale } from "@/src/lib/site-locale";

type Props = {
  locale: SiteLocale;
};

export default function CookieBanner({ locale }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(!localStorage.getItem("cookie-consent"));
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "1");
    window.dispatchEvent(new Event("filewisp-cookie-consent"));
    setVisible(false);
  };

  if (!visible) return null;

  const isJa = locale === "ja";
  const isZhTw = locale === "zh-TW";
  const privacyHref = isJa ? "/privacy-policy" : "/en/privacy-policy";

  return (
    <div
      data-cookie-banner
      className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:max-w-sm"
    >
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-xl shadow-black/40">
        <p className="text-xs leading-5 text-slate-300">
          {isJa ? (
            <>
              アクセス解析・広告配信のために Cookie を使用しています。詳しくは
              <Link href={privacyHref} className="text-teal-400 underline underline-offset-2 hover:text-teal-300">
                プライバシーポリシー
              </Link>
              へ。
            </>
          ) : isZhTw ? (
            <>
              本站使用 Cookie 進行流量分析與廣告投放。詳情請參閱
              <Link href={privacyHref} className="text-teal-400 underline underline-offset-2 hover:text-teal-300">
                隱私權政策（英文）
              </Link>
              。
            </>
          ) : (
            <>
              We use cookies for analytics and ads. See our{" "}
              <Link href={privacyHref} className="text-teal-400 underline underline-offset-2 hover:text-teal-300">
                Privacy Policy
              </Link>
              .
            </>
          )}
        </p>
        <button
          onClick={accept}
          className="mt-3 w-full rounded-xl bg-teal-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-400"
        >
          {isZhTw ? "了解" : isJa ? "了解" : "OK"}
        </button>
      </div>
    </div>
  );
}
