import type { Metadata } from "next";
import { getToolMeta } from "@/lib/tools";

const tool = getToolMeta("merge-pdf");

export const metadata: Metadata = {
  title: tool?.title ?? "AI Image Tools",
  description: tool?.description ?? "Free online image and PDF tools.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}