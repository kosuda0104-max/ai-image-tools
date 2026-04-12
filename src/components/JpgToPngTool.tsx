"use client";

import StandardImageConversionTool from "@/src/components/StandardImageConversionTool";
import { jpgToPngContent } from "@/src/data/tools/jpg-to-png";

type Props = {
  locale: "ja" | "en";
};

export default function JpgToPngTool({ locale }: Props) {
  return (
    <StandardImageConversionTool
      content={jpgToPngContent[locale]}
      accept="image/jpeg,.jpg,.jpeg"
      outputExtension="png"
      outputType="image/png"
      isValidFile={(file) =>
        file.type === "image/jpeg" || /\.jpe?g$/i.test(file.name)
      }
    />
  );
}
