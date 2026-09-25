import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site-config";

export const ogSize = { width: 1200, height: 630 };

/**
 * Branded 1200×630 social card, prerendered at build time. Self-contained
 * (next/og default font, no network) so it works under `output: export`.
 */
export function ogCard({
  eyebrow,
  title,
  accent,
  description,
  chips = [],
}: {
  eyebrow?: string;
  title: string;
  /** Highlighted continuation of the title */
  accent?: string;
  description?: string;
  chips?: string[];
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(1200px 630px at 100% 0%, #1e3a8a 0%, #0a0a0a 55%)",
          color: "white",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #3b82f6, #38bdf8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              fontWeight: 700,
            }}
          >
            V
          </div>
          <span style={{ fontSize: "30px", fontWeight: 600 }}>{siteConfig.name}</span>
          {eyebrow && (
            <span
              style={{
                marginLeft: "12px",
                fontSize: "24px",
                color: "#93c5fd",
                border: "1px solid #1e40af",
                borderRadius: "999px",
                padding: "6px 18px",
              }}
            >
              {eyebrow}
            </span>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          <div
            style={{
              fontSize: title.length > 28 ? "64px" : "80px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {title}
            {accent && (
              <span style={{ color: "#60a5fa" }}>&nbsp;{accent}</span>
            )}
          </div>
          {description && (
            <div style={{ fontSize: "30px", color: "#a1a1aa", maxWidth: "940px", lineHeight: 1.3 }}>
              {description}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "24px", color: "#d4d4d8" }}>
          {chips.map((chip, i) => (
            <span key={chip} style={{ display: "flex", gap: "14px" }}>
              {i > 0 && <span style={{ color: "#3f3f46" }}>•</span>}
              {chip}
            </span>
          ))}
        </div>
      </div>
    ),
    ogSize
  );
}
