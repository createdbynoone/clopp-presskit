"use client";

import { MorphingText } from "@/components/ui/liquid-text";

const BANNER_TEXTS = ["CLOPP", "MEDIA", "KIT"];

const TEXT_STYLE: React.CSSProperties = {
  fontSize: "clamp(80px, 18vw, 240px)",
  lineHeight: 0.85,
  letterSpacing: "-0.02em",
  color: "#FFFFFF",
  fontFamily: "NeueHaasDisplay, Helvetica Neue, Arial, sans-serif",
  fontWeight: 500,
  textTransform: "uppercase" as const,
};

export default function Hero() {
  return (
    <section
      className="relative w-full flex flex-col overflow-hidden"
      style={{ height: "100dvh", minHeight: "600px" }}
    >
      <div className="hero-bg absolute inset-0" />

      {/* Desktop: morphing text */}
      <div className="hidden md:block absolute inset-0">
        <MorphingText texts={BANNER_TEXTS} textStyle={TEXT_STYLE} />
      </div>

      {/* Mobile: static CLOPP centered */}
      <div
        className="md:hidden absolute inset-0 flex items-center justify-center"
      >
        <span
          style={{
            fontSize: "clamp(72px, 22vw, 140px)",
            lineHeight: 0.85,
            letterSpacing: "-0.02em",
            color: "#FFFFFF",
            fontFamily: "NeueHaasDisplay, Helvetica Neue, Arial, sans-serif",
            fontWeight: 500,
          }}
        >
          CLOPP
        </span>
      </div>

      {/* Mobile: scroll indicator */}
      <div className="md:hidden absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 pointer-events-none">
        <span
          style={{
            fontSize: "10px",
            letterSpacing: "0.22em",
            color: "rgba(255,255,255,0.7)",
            fontWeight: 500,
          }}
        >
          SCROLL DOWN TO SEE MORE
        </span>
        <svg
          className="scroll-arrow-icon"
          width="18"
          height="11"
          viewBox="0 0 18 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L9 9L17 1"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
