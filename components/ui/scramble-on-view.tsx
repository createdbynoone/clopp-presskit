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
  delay = 200,
  characterSet = DEFAULT_CHARS,
}: ScrambleOnViewProps) {
  const ref = useRef<HTMLElement>(null);
  const [text, setText] = useState(children);
  const scrambling = useRef(false);
  // Always holds the latest children so the observer closure never goes stale
  const childrenRef = useRef(children);

  useEffect(() => {
    childrenRef.current = children;
    if (!scrambling.current) setText(children);
  }, [children]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let delayTimer: ReturnType<typeof setTimeout>;
    let scrambleTimer: ReturnType<typeof setInterval>;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();

        delayTimer = setTimeout(() => {
          // Use ref so we always scramble to the current language value
          const original = childrenRef.current;
          const totalSteps = Math.ceil(duration / speed);
          let step = 0;
          scrambling.current = true;

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
              scrambling.current = false;
              setText(childrenRef.current);
            }
          }, speed * 1000);
        }, delay);
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
