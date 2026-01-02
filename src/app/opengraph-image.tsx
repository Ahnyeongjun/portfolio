import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Jun Portfolio";
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
          fontSize: 72,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 700, marginBottom: 20 }}>
          Jun Portfolio
        </div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>Full-Stack Developer</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
