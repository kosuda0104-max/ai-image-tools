import type { Metadata } from "next";
import HomePage from "@/src/components/HomePage";

export const metadata: Metadata = {
  title: {
    absolute: "Filewisp – Free Online JPG, PNG, WebP, HEIC & PDF Converter",
  },
  alternates: {
    canonical: "/en",
    languages: {
      ja: "/",
      en: "/en",
      "x-default": "/",
    },
  },
};

export default function Page() {
  return <HomePage locale="en" />;
}
