import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const contentType = "image/png";

const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: "34px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.15)",
              fontSize: "36px",
            }}
          >
            🖼️
          </div>
          Filewisp
        </div>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            fontSize: "68px",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: "920px",
          }}
        >
          <div style={{ display: "flex" }}>画像・PDF・データ変換を</div>
          <div style={{ display: "flex" }}>ブラウザだけで完結</div>
        </div>

        <div
          style={{
            marginTop: "32px",
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            fontSize: "28px",
          }}
        >
          {["JPG", "PNG", "WebP", "HEIC", "PDF", "CSV"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "8px 22px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.16)",
                fontWeight: 600,
              }}
            >
              {label}
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "40px",
            fontSize: "26px",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          無料・登録不要・45種類以上のツール
        </div>
      </div>
    ),
    size,
  );
}
