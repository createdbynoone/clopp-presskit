"use client";

import { MorphingText } from "@/components/ui/liquid-text";

const BANNER_TEXTS = ["CLOPP", "MEDIA", "KIT", "ARTIST"];

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
      {/* Background photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/images/hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Morphing text banner — always animating */}
      <div className="absolute inset-0">
        <MorphingText
          texts={BANNER_TEXTS}
          textStyle={TEXT_STYLE}
        />
      </div>
    </section>
  );
}
