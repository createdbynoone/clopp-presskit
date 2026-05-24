"use client";

import * as React from "react";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
  textStyle?: React.CSSProperties;
  active?: boolean;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
  textStyle,
  active = true,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const frameRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (!active) {
      cancelAnimationFrame(frameRef.current);
      // Bug fix: use 0/1 not "0%"/"100%" — opacity only accepts 0–1
      if (text1Ref.current) {
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "0";
        text1Ref.current.textContent = texts[0];
      }
      if (text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "1";
        text2Ref.current.textContent = texts[0];
      }
      return;
    }

    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;

    if (text1Ref.current) text1Ref.current.textContent = texts[textIndex % texts.length];
    if (text2Ref.current) text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];

    const setMorph = (fraction: number) => {
      if (!text1Ref.current || !text2Ref.current) return;
      // Bug fix: opacity as 0–1 number, not percentage string
      text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2Ref.current.style.opacity = String(Math.pow(fraction, 0.4));
      fraction = 1 - fraction;
      text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text1Ref.current.style.opacity = String(Math.pow(fraction, 0.4));
    };

    const doCooldown = () => {
      morph = 0;
      if (!text1Ref.current || !text2Ref.current) return;
      text2Ref.current.style.filter = "";
      text2Ref.current.style.opacity = "1";
      text1Ref.current.style.filter = "";
      text1Ref.current.style.opacity = "0";
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    };

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;
      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current) text1Ref.current.textContent = texts[textIndex % texts.length];
          if (text2Ref.current) text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
        }
        doMorph();
      } else {
        doCooldown();
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [texts, morphTime, cooldownTime, active]);

  // Bug fix: explicit centering via top/left/transform — flex alignment
  // does not reliably position absolute children across all browsers
  const spanStyle: React.CSSProperties = {
    ...textStyle,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    whiteSpace: "nowrap",
    textAlign: "center",
  };

  return (
    <div className={`relative w-full h-full ${className ?? ""}`}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="gooey-threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="w-full h-full"
        style={{ filter: "url(#gooey-threshold)", position: "relative" }}
      >
        <span
          ref={text1Ref}
          className={`select-none ${textClassName ?? ""}`}
          style={spanStyle}
        />
        <span
          ref={text2Ref}
          className={`select-none ${textClassName ?? ""}`}
          style={spanStyle}
        />
      </div>
    </div>
  );
}
