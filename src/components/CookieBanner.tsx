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

  if (locale === "ja") {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-4 shadow-lg">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-gray-700">
            このサイトでは、アクセス解析や Google AdSense による広告配信のために Cookie を使用しています。
            詳しくは{" "}
            <Link href="/privacy-policy" className="underline hover:text-black">
              プライバシーポリシー
            </Link>
            をご確認ください。
          </p>
          <button
            onClick={accept}
            className="shrink-0 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            了解
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white px-4 py-4 shadow-lg">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-gray-700">
          This site uses cookies for analytics and advertising via Google AdSense. See our{" "}
          <Link href="/en/privacy-policy" className="underline hover:text-black">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          OK
        </button>
      </div>
    </div>
  );
}
