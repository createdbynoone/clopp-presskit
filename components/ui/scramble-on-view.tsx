'use client';
import { useEffect, useRef, useState } from 'react';

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!—/';

type ScrambleOnViewProps = {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  speed?: number;
  delay?: number;
  characterSet?: string;
};

export function ScrambleOnView({
  children,
  as: Tag = 'p',
  className,
  style,
  duration = 0.7,
  speed = 0.03,
  delay = 500,
  characterSet = DEFAULT_CHARS,
}: ScrambleOnViewProps) {
  const ref = useRef<HTMLElement>(null);
  const [text, setText] = useState(children);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let delayTimer: ReturnType<typeof setTimeout>;
    let scrambleTimer: ReturnType<typeof setInterval>;

    // On mobile: run scramble but faster — 0ms delay, 0.3s duration
    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const effectiveDuration = isMobile ? 0.3 : duration;
    const effectiveDelay = isMobile ? 0 : delay;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();

        delayTimer = setTimeout(() => {
          const original = children;
          const totalSteps = Math.ceil(effectiveDuration / speed);
          let step = 0;

          scrambleTimer = setInterval(() => {
            step++;
            const progress = step / totalSteps;
            let scrambled = '';

            for (let i = 0; i < original.length; i++) {
              if (original[i] === ' ') { scrambled += ' '; continue; }
              scrambled +=
                progress * original.length > i
                  ? original[i]
                  : characterSet[Math.floor(Math.random() * characterSet.length)];
            }

            setText(scrambled);

            if (step >= totalSteps) {
              clearInterval(scrambleTimer);
              setText(original);
            }
          }, speed * 1000);
        }, effectiveDelay);
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => {
      obs.disconnect();
      clearTimeout(delayTimer);
      clearInterval(scrambleTimer);
    };
  }, []);

  const El = Tag as any;
  return (
    <El ref={ref} className={className} style={style}>
      {text}
    </El>
  );
}
