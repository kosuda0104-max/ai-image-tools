import type { ReactNode } from "react";
import { getToolMeta } from "@/lib/tools";

export const metadata = getToolMeta("pdf-to-jpg");

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}