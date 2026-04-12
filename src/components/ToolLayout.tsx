"use client";

import Link from "next/link";
import { useLocale } from "@/src/lib/get-locale";

type Props = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function ToolLayout({ title, description, children }: Props) {
  const locale = useLocale();
  const basePath = locale === "en" ? "/en" : "";

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-3 text-gray-600">{description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        {children}
      </section>

      <section className="py-10 text-center">
        <Link
          href={`${basePath}/tools`}
          className="inline-block rounded-xl bg-black px-5 py-3 text-white"
        >
          {locale === "en" ? "Back to Tools" : "ツール一覧へ戻る"}
        </Link>
      </section>
    </main>
  );
}
