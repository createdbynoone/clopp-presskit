"use client";

import { useState } from "react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

const HERO_TEXTS = ["CLOPP", "TECHNO", "AMBIENT", "DJ", "PRODUCER", "CLOPP"];

const TITLE_STYLE: React.CSSProperties = {
  fontSize: "clamp(100px, 20vw, 260px)",
  lineHeight: 0.85,
  letterSpacing: "-0.02em",
  color: "#FFFFFF",
  fontFamily: "NeueHaasDisplay, Helvetica Neue, Arial, sans-serif",
  fontWeight: 500,
  textTransform: "uppercase" as const,
};

export default function Hero() {
  const [hovered, setHovered] = useState(false);

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

      {/* Title — mix-blend-mode difference + gooey on hover */}
      <div
        className="absolute inset-0 flex items-center justify-center cursor-crosshair"
        style={{ mixBlendMode: "difference" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <GooeyText
          texts={HERO_TEXTS}
          morphTime={1}
          cooldownTime={0.5}
          active={hovered}
          textClassName="hero-title"
          textStyle={TITLE_STYLE}
        />
      </div>
    </section>
  );
}
