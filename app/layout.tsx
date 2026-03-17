import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI Image Tools",
    template: "%s | AI Image Tools",
  },
  verification: {
    google: "YAHjjL4QTT_OD7cBWy9kQN6fQfzI3kVLxXJ96ihPVgg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="antialiased bg-white text-gray-900">{children}</body>
    </html>
  );
}