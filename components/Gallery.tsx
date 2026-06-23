"use client"

import { useEffect, useState } from "react"
import { motion, stagger, useAnimate } from "motion/react"
import Floating, { FloatingElement } from "@/components/ui/parallax-floating"
import { ScrambleOnView } from "@/components/ui/scramble-on-view"

const IMG = "/images/hero.webp"

const DOWNLOAD_STYLE: React.CSSProperties = {
  fontFamily: "NeueHaasDisplay, Helvetica Neue, Arial, sans-serif",
  fontWeight: 500,
  fontSize: "clamp(40px, 7vw, 110px)",
  lineHeight: 0.88,
  letterSpacing: "-0.02em",
  color: "#A8CC10",
  textDecoration: "none",
  textAlign: "center",
  textTransform: "uppercase",
}

// Each floating image — src + objectPosition for the crop
const FRAMES = [
  { depth: 0.5,  pos: "top-[6%]  left-[5%]",  w: "clamp(130px,14vw,210px)", h: "clamp(130px,14vw,210px)", obj: "20% 30%" },
  { depth: 1,    pos: "top-[4%]  left-[26%]", w: "clamp(130px,15vw,230px)", h: "clamp(170px,20vw,300px)", obj: "60% 20%" },
  { depth: 2,    pos: "top-[2%]  left-[62%]", w: "clamp(150px,17vw,270px)", h: "clamp(200px,25vw,380px)", obj: "80% 10%" },
  { depth: 1,    pos: "top-[8%]  left-[83%]", w: "clamp(110px,12vw,180px)", h: "clamp(110px,12vw,180px)", obj: "50% 40%" },
  { depth: 1.5,  pos: "top-[38%] left-[1%]",  w: "clamp(150px,17vw,260px)", h: "clamp(150px,17vw,260px)", obj: "30% 60%" },
  { depth: 2,    pos: "top-[35%] left-[86%]", w: "clamp(120px,13vw,200px)", h: "clamp(160px,18vw,280px)", obj: "70% 50%" },
  { depth: 4,    pos: "top-[68%] left-[10%]", w: "clamp(170px,19vw,300px)", h: "clamp(170px,19vw,300px)", obj: "40% 80%" },
  { depth: 1,    pos: "top-[74%] left-[48%]", w: "clamp(120px,13vw,200px)", h: "clamp(120px,13vw,200px)", obj: "55% 70%" },
  { depth: 1.5,  pos: "top-[70%] left-[75%]", w: "clamp(140px,15vw,230px)", h: "clamp(190px,21vw,330px)", obj: "65% 85%" },
]

export default function Gallery() {
  const [scope, animate] = useAnimate()
  const [lightbox, setLightbox] = useState<{ src: string; obj: string } | null>(null)

  useEffect(() => {
    animate("img", { opacity: [0, 1] }, { duration: 0.6, delay: stagger(0.12) })
  }, [])

  // Close lightbox on Escape
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [lightbox])

  return (
    <section
      id="gallery"
      ref={scope}
      style={{ position: "relative", width: "100%", height: "100dvh", backgroundColor: "transparent", overflow: "hidden" }}
    >
      {/* ── Center link ── */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10, pointerEvents: "none" }}>
        <a href="https://www.dropbox.com/scl/fo/00rv1vqbowdhyy9qg6ts4/AEosEoPbzTNEDyo6WKgM1NE?rlkey=k419i9lzdbtga2xuyi313pbms&st=uevy76wp&dl=0" target="_blank" rel="noopener noreferrer" aria-label="Download press content" style={{ ...DOWNLOAD_STYLE, pointerEvents: "all" }}>
          <ScrambleOnView as="span" duration={0.9}>DOWNLOAD</ScrambleOnView>
          <br />
          <ScrambleOnView as="span" duration={0.9}>CONTENT</ScrambleOnView>
        </a>
      </div>

      {/* ── Floating images ── */}
      <Floating sensitivity={-1} className="overflow-hidden">
        {FRAMES.map(({ depth, pos, w, h, obj }, i) => (
          <FloatingElement key={i} depth={depth} className={pos}>
            <motion.img
              initial={{ opacity: 0 }}
              src={IMG}
              alt="CLOPP live — press"
              onClick={() => setLightbox({ src: IMG, obj })}
              className="object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
              style={{ width: w, height: h, objectFit: "cover", objectPosition: obj }}
            />
          </FloatingElement>
        ))}
      </Floating>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.88)",
            zIndex: 200,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          {/* Card — stop propagation so clicking the image doesn't close */}
          <div
            onClick={e => e.stopPropagation()}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}
          >
            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              style={{
                alignSelf: "flex-end",
                background: "none",
                border: "none",
                color: "#888888",
                fontSize: "11px",
                letterSpacing: "0.18em",
                cursor: "pointer",
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                padding: "4px 0",
              }}
            >
              CLOSE ✕
            </button>

            {/* Image 4:5 */}
            <img
              src={lightbox.src}
              alt="CLOPP press"
              style={{
                aspectRatio: "4 / 5",
                height: "clamp(360px, 78vh, 1100px)",
                width: "auto",
                objectFit: "cover",
                objectPosition: lightbox.obj,
                display: "block",
              }}
            />

            {/* Download button */}
            <a
              href={lightbox.src}
              download="CLOPP-press.jpg"
              onClick={e => e.stopPropagation()}
              style={{
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "#FFFFFF",
                border: "1px solid rgba(255,255,255,0.25)",
                padding: "8px 24px",
                textDecoration: "none",
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "#A8CC10"
                ;(e.currentTarget as HTMLAnchorElement).style.color = "#A8CC10"
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)"
                ;(e.currentTarget as HTMLAnchorElement).style.color = "#FFFFFF"
              }}
            >
              DOWNLOAD
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
