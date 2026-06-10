"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Props = {
  locale: "ja" | "en";
};

export default function CookieBanner({ locale }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "1");
    setVisible(false);
  };

  if (!visible) return null;

  const isJa = locale === "ja";
  const privacyHref = isJa ? "/privacy-policy" : "/en/privacy-policy";

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 sm:left-auto sm:max-w-sm">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl shadow-gray-300/40">
        <p className="text-xs leading-5 text-gray-600">
          {isJa ? (
            <>
              アクセス解析・広告配信のために Cookie を使用しています。詳しくは
              <Link href={privacyHref} className="text-blue-600 underline underline-offset-2 hover:text-blue-800">
                プライバシーポリシー
              </Link>
              へ。
            </>
          ) : (
            <>
              We use cookies for analytics and ads. See our{" "}
              <Link href={privacyHref} className="text-blue-600 underline underline-offset-2 hover:text-blue-800">
                Privacy Policy
              </Link>
              .
            </>
          )}
        </p>
        <button
          onClick={accept}
          className="mt-3 w-full rounded-xl bg-gray-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-gray-700"
        >
          {isJa ? "了解" : "OK"}
        </button>
      </div>
    </div>
  );
}
