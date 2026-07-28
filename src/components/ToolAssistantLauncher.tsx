"use client";

import { useEffect, useId, useState } from "react";
import type { ToolDirectoryItem } from "@/src/data/tool-directory";
import ToolAssistant from "@/src/components/ToolAssistant";
import WispMascot from "@/src/components/WispMascot";
import type { ToolFinderLocale } from "@/src/lib/tool-finder";

type Props = {
  locale: ToolFinderLocale;
  tools: ToolDirectoryItem[];
};

const launcherCopy = {
  ja: {
    open: "ウィスプに相談",
    close: "相談画面を閉じる",
    title: "ウィスプに相談",
    description: "ファイルの困りごとを一緒に整理します",
  },
  en: {
    open: "Ask Wisp",
    close: "Close assistant",
    title: "Ask Wisp",
    description: "Get help choosing the right file tool",
  },
} as const;

export default function ToolAssistantLauncher({ locale, tools }: Props) {
  const t = launcherCopy[locale];
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [cookieNoticeVisible, setCookieNoticeVisible] = useState(false);

  useEffect(() => {
    const syncCookieNotice = () => {
      setCookieNoticeVisible(!window.localStorage.getItem("cookie-consent"));
    };

    syncCookieNotice();
    window.addEventListener("filewisp-cookie-consent", syncCookieNotice);
    return () => window.removeEventListener("filewisp-cookie-consent", syncCookieNotice);
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <aside
      className={`fixed right-3 z-[60] transition-[bottom] sm:right-5 ${
        cookieNoticeVisible
          ? "bottom-[10rem]"
          : "bottom-[max(1rem,env(safe-area-inset-bottom))]"
      }`}
    >
      <section
        id={panelId}
        hidden={!open}
        aria-labelledby={`${panelId}-title`}
        className={`mb-3 w-[calc(100vw-1.5rem)] max-w-sm overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-xl ${
          cookieNoticeVisible
            ? "max-h-[calc(100dvh-14rem)]"
            : "max-h-[calc(100dvh-7rem)]"
        }`}
      >
        <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50"
          >
            <WispMascot size={40} mood="cheer" />
          </span>
          <span className="min-w-0 flex-1 text-left">
            <span id={`${panelId}-title`} className="block text-sm font-bold text-gray-950">
              {t.title}
            </span>
            <span className="block truncate text-xs text-gray-500">{t.description}</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.close}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            ×
          </button>
        </header>
        <div className="p-4">
          <ToolAssistant locale={locale} tools={tools} showHeading={false} />
        </div>
      </section>

      <button
        type="button"
        aria-label={t.open}
        aria-controls={panelId}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="ml-auto flex min-h-14 items-center gap-2 rounded-full border border-teal-200 bg-white py-1.5 pl-1.5 pr-4 text-sm font-bold text-gray-900 shadow-lg transition hover:border-teal-400 hover:shadow-xl"
      >
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-50"
        >
          <WispMascot size={42} mood={open ? "cheer" : "float"} />
        </span>
        <span>{t.open}</span>
      </button>
    </aside>
  );
}
