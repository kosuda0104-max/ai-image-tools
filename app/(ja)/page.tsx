import type { Metadata } from "next";
import HomePage from "@/src/components/HomePage";

export const metadata: Metadata = {
  title: {
    absolute: "Filewisp – JPG・PNG・WebP・HEIC・PDF 変換 無料オンライン",
  },
};

export default function Page() {
  return <HomePage locale="ja" />;
}
