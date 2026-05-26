//@ts-nocheck
"use client";

import { useCallback, useEffect, useRef } from "react";

const MORPH_TIME = 1.5;
const COOLDOWN_TIME = 0.6;

interface MorphingTextProps {
  texts: string[];
  className?: string;
  textStyle?: React.CSSProperties;
}

export function MorphingText({ texts, className = "", textStyle }: MorphingTextProps) {
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(texts.length - 1);
  const morphRef = useRef(0);
  const cooldownRef = useRef(COOLDOWN_TIME);
  const prevTimeRef = useRef(Date.now());
  const wasInCooldownRef = useRef(true);

  const applyStyles = useCallback((frac: number, noBlur = false) => {
    const t1 = text1Ref.current;
    const t2 = text2Ref.current;
    if (!t1 || !t2) return;
    const f = Math.max(frac, 0.001);
    const g = Math.max(1 - frac, 0.001);
    if (noBlur) {
      // Mobile: pure opacity crossfade, no blur filter
      t2.style.filter = '';
      t2.style.opacity = String(f);
      t1.style.filter = '';
      t1.style.opacity = String(g);
    } else {
      t2.style.filter = `blur(${Math.min(8 / f - 8, 100)}px)`;
      t2.style.opacity = String(Math.pow(f, 0.4));
      t1.style.filter = `blur(${Math.min(8 / g - 8, 100)}px)`;
      t1.style.opacity = String(Math.pow(g, 0.4));
    }
  }, []);

  useEffect(() => {
    if (!texts.length) return;

    const mobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    indexRef.current = texts.length - 1;
    morphRef.current = 0;
    cooldownRef.current = COOLDOWN_TIME;
    prevTimeRef.current = Date.now();
    wasInCooldownRef.current = true;

    if (text1Ref.current) text1Ref.current.textContent = texts[texts.length - 1];
    if (text2Ref.current) text2Ref.current.textContent = texts[0];

    let frameId: number;

    const tick = () => {
      frameId = requestAnimationFrame(tick);

      const now = Date.now();
      const dt = (now - prevTimeRef.current) / 1000;
      prevTimeRef.current = now;

      const wasCooldown = wasInCooldownRef.current;
      cooldownRef.current -= dt;

      const t1 = text1Ref.current;
      const t2 = text2Ref.current;
      if (!t1 || !t2) return;

      if (cooldownRef.current > 0) {
        wasInCooldownRef.current = true;
        morphRef.current = 0;
        t1.style.filter = "";
        t1.style.opacity = "0";
        t2.style.filter = "";
        t2.style.opacity = "1";
        return;
      }

      wasInCooldownRef.current = false;

      if (wasCooldown) {
        indexRef.current = (indexRef.current + 1) % texts.length;
        t1.textContent = texts[indexRef.current];
        t2.textContent = texts[(indexRef.current + 1) % texts.length];
      }

      morphRef.current -= cooldownRef.current;
      cooldownRef.current = 0;

      let frac = morphRef.current / MORPH_TIME;
      if (frac >= 1) {
        cooldownRef.current = COOLDOWN_TIME;
        morphRef.current = 0;
        frac = 1;
      }

      applyStyles(frac, mobile);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [texts, applyStyles]);

  return (
    <>
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="morph-liquid">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
      <div
        className={`relative w-full h-full ${className} morph-container`}
        style={{ filter: "url(#morph-liquid) blur(0.6px)" }}
      >
        <span
          ref={text1Ref}
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
          style={textStyle}
        />
        <span
          ref={text2Ref}
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
          style={textStyle}
        />
      </div>
    </>
  );
}
