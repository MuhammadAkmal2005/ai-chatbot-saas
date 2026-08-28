import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Chatbot SaaS — the front desk that never clocks out";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0B1120",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 120,
            height: 120,
            borderRadius: 28,
            backgroundColor: "#FFB454",
            marginBottom: 40,
          }}
        >
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#0B1120" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "#F4F6FB" }}>
          Chatbot SaaS
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#93A0BD", marginTop: 16 }}>
          The front desk that never clocks out.
        </div>
      </div>
    ),
    { ...size }
  );
}