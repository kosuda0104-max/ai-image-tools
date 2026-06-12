"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Props = {
  locale: "ja" | "en";
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
    setVisible(false);
  };

  if (!visible) return null;

  const isJa = locale === "ja";
  const privacyHref = isJa ? "/privacy-policy" : "/en/privacy-policy";

  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 sm:bottom-4 sm:left-auto sm:max-w-sm">
      <div className="max-h-[38vh] overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 p-3 shadow-xl shadow-black/40 sm:rounded-2xl sm:p-4">
        <p className="text-[11px] leading-5 text-slate-300 sm:text-xs">
          {isJa ? (
            <>
              アクセス解析・広告配信のために Cookie を使用しています。詳しくは
              <Link href={privacyHref} className="text-blue-400 underline underline-offset-2 hover:text-blue-300">
                プライバシーポリシー
              </Link>
              へ。
            </>
          ) : (
            <>
              We use cookies for analytics and ads. See our{" "}
              <Link href={privacyHref} className="text-blue-400 underline underline-offset-2 hover:text-blue-300">
                Privacy Policy
              </Link>
              .
            </>
          )}
        </p>
        <button
          onClick={accept}
          className="mt-2.5 w-full rounded-lg bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-400 sm:mt-3 sm:rounded-xl"
        >
          {isJa ? "了解" : "OK"}
        </button>
      </div>
    </div>
  );
}
