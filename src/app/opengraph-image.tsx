import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "안영준 | Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0d1117 0%, #1a2030 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "90px",
          color: "#e6ecf4",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 600,
            letterSpacing: 6,
            color: "#60a5fa",
            marginBottom: 28,
          }}
        >
          PORTFOLIO
        </div>
        <div style={{ fontSize: 100, fontWeight: 700, marginBottom: 20 }}>
          안영준
        </div>
        <div style={{ fontSize: 40, color: "#9ba8ba" }}>
          Full-Stack Developer
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
