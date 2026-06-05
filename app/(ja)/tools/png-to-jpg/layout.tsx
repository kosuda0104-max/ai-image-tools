import type { Metadata } from "next";
import { getToolMeta } from "@/lib/tools";

const tool = getToolMeta("png-to-jpg");

export const metadata: Metadata = {
  title: tool?.title ?? "Filewisp",
  description: tool?.description ?? "Free online image and PDF tools.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}