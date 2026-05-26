"use client";

import { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  return (
    <section
      className="relative w-full flex flex-col overflow-hidden"
      style={{ height: "100dvh", minHeight: "600px" }}
    >
      {isMobile ? (
        /* Mobile: pre-rendered video — hardware-decoded, zero JS animation cost */
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center top" }}
        >
          <source src="/videos/banner-loop.webm" type="video/webm" />
          <source src="/videos/banner-loop.mp4" type="video/mp4" />
        </video>
      ) : (
        <>
          {/* Desktop: static background + live JS morph */}
          <div className="hero-bg absolute inset-0" />
          <div className="absolute inset-0">
            <MorphingText texts={BANNER_TEXTS} textStyle={TEXT_STYLE} />
          </div>
        </>
      )}
    </section>
  );
}
