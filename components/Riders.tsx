'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ScrambleOnView } from '@/components/ui/scramble-on-view';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';

type Slide = { src: string; label: string; sublabel?: string };

const CAROUSEL_CARDS = [
  {
    id: 'player',
    slides: [
      { src: '/images/equipment/cdj3000.webp', label: 'CDJ-3000', sublabel: 'PIONEER DJ' },
      { src: '/images/equipment/cdj3000x.webp', label: 'CDJ-3000X', sublabel: 'PIONEER DJ' },
    ],
  },
  {
    id: 'mixer',
    slides: [
      { src: '/images/equipment/djmv10.webp', label: 'DJM-V10', sublabel: 'PIONEER DJ' },
      { src: '/images/equipment/djma9.webp', label: 'DJM-A9', sublabel: 'PIONEER DJ' },
      { src: '/images/equipment/xone96.webp', label: 'XONE:96', sublabel: 'ALLEN & HEATH' },
    ],
  },
  {
    id: 'optional',
    slides: [
      { src: '/images/equipment/rmx1000.webp', label: 'RMX-1000', sublabel: 'PIONEER DJ' },
      { src: '/images/equipment/rmxignite.webp', label: 'RMX IGNITE', sublabel: 'PIONEER DJ' },
    ],
  },
];

const ROW_STYLE = {
  paddingTop: 'clamp(6px, 1.1vh, 18px)',
  paddingBottom: 'clamp(6px, 1.1vh, 18px)',
} as const;

function CarouselCard({ card, category }: { card: typeof CAROUSEL_CARDS[0]; category: string }) {
  const total = card.slides.length;
  // Append clone of first slide so the loop always goes left → seamless wrap
  const extSlides = [...card.slides, card.slides[0]];

  const [idx, setIdx] = useState(0);
  const [animated, setAnimated] = useState(true);
  const touchStartX = useRef<number | null>(null);

  // Auto-advance every 2 s, always forward
  useEffect(() => {
    const id = setInterval(() => setIdx(i => i + 1), 2000);
    return () => clearInterval(id);
  }, []);

  // When we land on the clone (idx === total), snap back to 0 after transition
  useEffect(() => {
    if (idx < total) return;
    const snap = setTimeout(() => {
      setAnimated(false);
      setIdx(0);
    }, 360);
    return () => clearTimeout(snap);
  }, [idx, total]);

  // Re-enable transition after the no-animation snap
  useEffect(() => {
    if (animated) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimated(true))
    );
    return () => cancelAnimationFrame(raf);
  }, [animated]);

  const displayIdx = idx % total;
  const slide = card.slides[displayIdx];

  const next = () => setIdx(i => i + 1);
  const prev = () => {
    // Going backwards: jump to the real previous slide directly (no clone trick needed)
    setIdx(i => (i - 1 + total) % total);
  };

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div style={{ border: '1px solid #1E1E1E', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #1E1E1E' }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.18em', color: '#A8CC10', margin: 0 }}>{category}</p>
      </div>

      <div style={{ overflow: 'hidden', flex: 1, cursor: 'grab' }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div style={{
          display: 'flex',
          transform: `translateX(-${idx * 100}%)`,
          transition: animated ? 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        }}>
          {extSlides.map((s, i) => (
            <div key={i} style={{ flex: '0 0 100%', aspectRatio: '3 / 4', backgroundColor: '#0E0E0E', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} draggable={false} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', borderTop: '1px solid #1E1E1E' }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.04em', color: '#FFFFFF', fontWeight: 500, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {slide.label}
          </p>
          {slide.sublabel && (
            <p style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#555', margin: '2px 0 0' }}>{slide.sublabel}</p>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <button onClick={prev} aria-label="Anterior" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: '#555', lineHeight: 1, display: 'flex', alignItems: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {card.slides.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === displayIdx ? '12px' : '5px', height: '5px', borderRadius: '3px', backgroundColor: i === displayIdx ? '#A8CC10' : '#333', border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.25s ease', flexShrink: 0 }} />
            ))}
          </div>
          <button onClick={next} aria-label="Siguiente" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', color: '#555', lineHeight: 1, display: 'flex', alignItems: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Riders() {
  const { lang, toggle } = useLanguage();
  const t = T[lang].riders;

  // Hospitality gate
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [shake, setShake] = useState(false);

  // Technical gate
  const [pwT, setPwT] = useState('');
  const [showPwT, setShowPwT] = useState(false);
  const [unlockedT, setUnlockedT] = useState(false);
  const [shakeT, setShakeT] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === 'clopp00') { setUnlocked(true); }
    else { setShake(true); setPw(''); setTimeout(() => setShake(false), 500); }
  };

  const handleUnlockT = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwT === 'clopp00') { setUnlockedT(true); }
    else { setShakeT(true); setPwT(''); setTimeout(() => setShakeT(false), 500); }
  };

  const categoryLabels: Record<string, string> = {
    player: t.player,
    mixer: t.mixer,
    optional: t.optional,
  };

  return (
    <>
      {/* ── TECHNICAL RIDER ── */}
      <section id="technical-rider" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(20px, 4vh, 64px) 0', position: 'relative', overflow: 'hidden' }}>
        <div className="px-6 md:px-10 max-w-screen-2xl mx-auto w-full">

          <h2 style={{ fontSize: 'clamp(36px, 6.5vw, 88px)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: 'clamp(16px, 2.5vh, 48px)' }}>
            <ScrambleOnView as="span">{t.technical}</ScrambleOnView>
            <br />
            <ScrambleOnView as="span" style={{ color: '#A8CC10' }}>{t.rider}</ScrambleOnView>
          </h2>

          {/* 3 carousel cards + BOOTH plain text */}
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 'clamp(6px, 1vh, 12px)', alignItems: 'start' }}>
            {CAROUSEL_CARDS.map(card => (
              <CarouselCard key={card.id} card={card} category={categoryLabels[card.id]} />
            ))}

            {/* BOOTH — plain text, spreads to match card height */}
            <div style={{ display: 'flex', flexDirection: 'column', padding: '8px 8px', alignSelf: 'stretch', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '12px', letterSpacing: '0.18em', color: '#A8CC10', margin: '0 0 16px' }}>{t.booth}</p>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', flex: 1 }}>
                {t.boothItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', paddingBottom: '12px' }}>
                    <span style={{ color: '#A8CC10', fontSize: '10px', flexShrink: 0, marginTop: '3px' }}>—</span>
                    <p style={{ fontSize: 'clamp(12px, 1.1vw, 15px)', letterSpacing: '0.06em', color: '#CCCCCC', lineHeight: 1.5, margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end" style={{ marginTop: 'clamp(10px, 1.8vh, 40px)' }}>
            <a
              href="mailto:info@cloppmusic.com"
              className="inline-flex items-center gap-3 border py-3 px-6 transition-all duration-200"
              style={{ borderColor: '#3A3A3A', fontSize: '12px', letterSpacing: '0.18em', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#A8CC10'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#A8CC10'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.borderColor = '#3A3A3A'; }}
            >
              {t.requestPdf}
            </a>
          </div>
        </div>

        {/* ── Technical password overlay ── */}
        {!unlockedT && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'clamp(16px, 3vh, 40px)', backgroundColor: isMobile ? '#0A0A0A' : 'rgba(10, 10, 10, 0.55)', backdropFilter: isMobile ? 'none' : 'blur(14px)', WebkitBackdropFilter: isMobile ? 'none' : 'blur(14px)' }}>
            <h2 style={{ fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#FFFFFF', textAlign: 'center' }}>
              {t.password}
            </h2>
            <form onSubmit={handleUnlockT} style={{ width: '100%', maxWidth: '660px', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vh, 24px)' }}>
              <div className={shakeT ? 'pw-shake' : ''} style={{ width: '100%', position: 'relative', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', backgroundColor: 'transparent' }}>
                <input type={showPwT ? 'text' : 'password'} value={pwT} onChange={e => setPwT(e.target.value)} autoComplete="off" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: 'clamp(18px, 3vh, 32px) 24px', fontSize: 'clamp(18px, 2.5vw, 28px)', letterSpacing: '0.12em', color: '#FFFFFF', caretColor: '#A8CC10', fontFamily: 'inherit' }} />
                <button type="button" onClick={() => setShowPwT(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 24px', display: 'flex', alignItems: 'center', flexShrink: 0 }} aria-label={showPwT ? 'Hide' : 'Show'}>
                  {showPwT
                    ? <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  }
                </button>
              </div>
              <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#888888', textAlign: 'center' }}>{t.pwHintTech}</p>
            </form>
          </div>
        )}
      </section>

      {/* ── HOSPITALITY RIDER ── */}
      <section id="hospitality-rider" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(20px, 4vh, 64px) 0', backgroundColor: '#A8CC10' }}>
        {!unlocked ? (
          <div className="px-6 md:px-10 max-w-screen-2xl mx-auto w-full flex flex-col items-center justify-center" style={{ gap: 'clamp(16px, 3vh, 40px)' }}>
            <h2 style={{ fontSize: 'clamp(48px, 8vw, 110px)', lineHeight: 0.9, letterSpacing: '-0.02em', color: '#000000', textAlign: 'center' }}>
              {t.password}
            </h2>
            <form onSubmit={handleUnlock} style={{ width: '100%', maxWidth: '660px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vh, 24px)' }}>
              <div className={shake ? 'pw-shake' : ''} style={{ width: '100%', position: 'relative', border: '2px solid #000000', display: 'flex', alignItems: 'center', backgroundColor: 'transparent' }}>
                <input type={showPw ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)} autoComplete="off" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', padding: 'clamp(18px, 3vh, 32px) 24px', fontSize: 'clamp(18px, 2.5vw, 28px)', letterSpacing: '0.12em', color: '#000000', caretColor: '#000000', fontFamily: 'inherit' }} />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 24px', display: 'flex', alignItems: 'center', flexShrink: 0 }} aria-label={showPw ? 'Hide' : 'Show'}>
                  {showPw
                    ? <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  }
                </button>
              </div>
              <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.45)', textAlign: 'center' }}>{t.pwHintHosp}</p>
            </form>
          </div>
        ) : (
          <div className="px-6 md:px-10 max-w-screen-2xl mx-auto w-full">
            <h2 style={{ fontSize: 'clamp(36px, 6.5vw, 88px)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: 'clamp(16px, 2.5vh, 24px)', color: '#000000' }}>
              <ScrambleOnView as="span">{t.hospitality}</ScrambleOnView>
              <br />
              <ScrambleOnView as="span">{t.rider}</ScrambleOnView>
            </h2>

            <div style={{ marginBottom: 'clamp(12px, 2vh, 32px)' }}>
              <button
                onClick={toggle}
                style={{
                  background: 'none',
                  border: '1px solid rgba(0,0,0,0.2)',
                  color: 'rgba(0,0,0,0.45)',
                  fontSize: '10px',
                  letterSpacing: '0.18em',
                  padding: '4px 10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,0,0,0.5)'; (e.currentTarget as HTMLButtonElement).style.color = '#000000'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,0,0,0.2)'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(0,0,0,0.45)'; }}
              >
                {lang === 'es' ? 'ENGLISH' : 'SPANISH'}
              </button>
            </div>

            <div className="flex flex-col">
              {t.hospitalityItems.map((block, i) => (
                <div key={i} style={{ paddingTop: 'clamp(10px, 1.5vh, 20px)', paddingBottom: 'clamp(10px, 1.5vh, 20px)', borderTop: 'none', borderBottom: 'none' }}>
                  <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.4)', marginBottom: '8px' }}>
                    {block.category}
                  </p>
                  <div className="flex flex-col gap-2">
                    {block.items.map((item, j) => (
                      <span key={j} style={{ fontSize: 'clamp(12px, 1.6vh, 15px)', lineHeight: 1.55, letterSpacing: '0.04em', color: '#000000', textTransform: 'none' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end" style={{ marginTop: 'clamp(10px, 1.8vh, 40px)' }}>
              <a
                href="mailto:info@cloppmusic.com"
                className="inline-flex items-center gap-3 border py-3 px-6 transition-all duration-200"
                style={{ borderColor: '#000000', fontSize: '12px', letterSpacing: '0.18em', color: '#000000', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#000000'; (e.currentTarget as HTMLAnchorElement).style.color = '#A8CC10'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#000000'; }}
              >
                {t.requestPdf}
              </a>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
