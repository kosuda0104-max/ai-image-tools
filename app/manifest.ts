import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Filewisp – 画像・PDF・データの無料ブラウザツール",
    short_name: "Filewisp",
    description:
      "画像変換・圧縮・PDF整理・CSV/Parquet変換をブラウザだけで。ファイルはサーバーに送信されません。",
    start_url: "/",
    display: "standalone",
    background_color: "#f9fafb",
    theme_color: "#0f766e",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
