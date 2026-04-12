"use client";

import StandardImageConversionTool from "@/src/components/StandardImageConversionTool";
import { pngToJpgContent } from "@/src/data/tools/png-to-jpg";

type Props = {
  locale: "ja" | "en";
};

export default function PngToJpgTool({ locale }: Props) {
  return (
    <StandardImageConversionTool
      content={pngToJpgContent[locale]}
      accept="image/png,.png"
      outputExtension="jpg"
      outputType="image/jpeg"
      fillBackground="#ffffff"
      quality={0.92}
      isValidFile={(file) =>
        file.type === "image/png" || /\.png$/i.test(file.name)
      }
    />
  );
}
