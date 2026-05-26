'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ScrambleOnView } from '@/components/ui/scramble-on-view';

type Slide = {
  src: string;
  label: string;
  sublabel?: string;
};

type Card = {
  id: string;
  category: string;
  slides: Slide[];
};

const TECHNICAL_CARDS: Card[] = [
  {
    id: 'player',
    category: 'REPRODUCTOR DIGITAL',
    slides: [
      { src: '/images/equipment/cdj3000.jpg', label: 'CDJ-3000', sublabel: 'PIONEER DJ' },
      { src: '/images/equipment/cdj3000.jpg', label: 'CDJ-3000X', sublabel: 'PIONEER DJ' },
    ],
  },
  {
    id: 'mixer',
    category: 'MIXER',
    slides: [
      { src: '/images/equipment/djmv10.jpg', label: 'DJM-V10', sublabel: 'PIONEER DJ' },
      { src: '/images/equipment/djma9.jpg', label: 'DJM-A9', sublabel: 'PIONEER DJ' },
      { src: '', label: 'XONE:96', sublabel: 'ALLEN & HEATH' },
    ],
  },
  {
    id: 'booth',
    category: 'BOOTH',
    slides: [
      { src: '', label: 'RETORNO / MONITORES DE SUELO' },
      { src: '', label: 'SUMINISTRO ELÉCTRICO ESTABLE' },
      { src: '', label: 'CABINA ACCESIBLE PARA SOUNDCHECK' },
    ],
  },
  {
    id: 'optional',
    category: 'OPCIONAL',
    slides: [
      { src: '/images/equipment/rmx1000.jpg', label: 'RMX-1000 / RMX IGNITE', sublabel: 'PIONEER DJ' },
      { src: '', label: 'SALIDAS PARA GRABACIÓN DESDE MIXER' },
    ],
  },
];

const HOSPITALITY_RIDER = [
  { num: '01', item: 'Pase de artista + 1 acompañante (acceso laminado / pulsera)' },
  { num: '02', item: 'Camarín privado o compartido con acceso seguro' },
  { num: '03', item: '1× caja de agua (botellas 500ml), refrescos' },
  { num: '04', item: 'Snacks / comida ligera disponible backstage' },
  { num: '05', item: 'Hotel si la distancia desde Barcelona supera los 50 km' },
  { num: '06', item: 'Traslados aeropuerto / local cuando sea necesario' },
  { num: '07', item: 'Método y calendario de pago confirmados con antelación' },
  { num: '08', item: 'Contacto del promotor en sala desde la llegada del artista' },
];

const ROW_STYLE = {
  paddingTop: 'clamp(6px, 1.1vh, 18px)',
  paddingBottom: 'clamp(6px, 1.1vh, 18px)',
} as const;

function EquipCard({ card }: { card: Card }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = card.slides.length;

  const prev = () => setCurrent(i => (i - 1 + total) % total);
  const next = () => setCurrent(i => (i + 1) % total);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  const slide = card.slides[current];

  return (
    <div
      style={{
        border: '1px solid #1E1E1E',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Category label */}
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #1E1E1E' }}>
        <p style={{ fontSize: '9px', letterSpacing: '0.18em', color: '#D40000', margin: 0 }}>
          {card.category}
        </p>
      </div>

      {/* Slide strip */}
      <div
        style={{ overflow: 'hidden', cursor: total > 1 ? 'grab' : 'default' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            display: 'flex',
            transform: `translateX(-${current * 100}%)`,
            transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {card.slides.map((s, i) => (
            <div
              key={i}
              style={{
                flex: '0 0 100%',
                aspectRatio: '3 / 4',
                backgroundColor: '#0E0E0E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {s.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={s.src}
                  alt={s.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  draggable={false}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '24px' }}>
                  <p style={{
                    fontSize: 'clamp(11px, 1.4vw, 14px)',
                    letterSpacing: '0.06em',
                    color: '#FFFFFF',
                    lineHeight: 1.3,
                    fontWeight: 500,
                    textAlign: 'center',
                  }}>
                    {s.label}
                  </p>
                  {s.sublabel && (
                    <p style={{ fontSize: '9px', letterSpacing: '0.18em', color: '#555', marginTop: '6px', textAlign: 'center' }}>
                      {s.sublabel}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info + navigation */}
      <div style={{
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '8px',
        borderTop: '1px solid #1E1E1E',
      }}>
        <div style={{ minWidth: 0 }}>
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.04em',
            color: '#FFFFFF',
            fontWeight: 500,
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {slide.label}
          </p>
          {slide.sublabel && slide.src && (
            <p style={{ fontSize: '9px', letterSpacing: '0.15em', color: '#555', margin: '2px 0 0' }}>
              {slide.sublabel}
            </p>
          )}
        </div>

        {/* Dots + arrows */}
        {total > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            {/* Prev arrow */}
            <button
              onClick={prev}
              aria-label="Anterior"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '2px', color: '#555', lineHeight: 1,
                display: 'flex', alignItems: 'center',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>

            {/* Dot indicators */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              {card.slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    width: i === current ? '12px' : '5px',
                    height: '5px',
                    borderRadius: '3px',
                    backgroundColor: i === current ? '#D40000' : '#333',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            {/* Next arrow */}
            <button
              onClick={next}
              aria-label="Siguiente"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '2px', color: '#555', lineHeight: 1,
                display: 'flex', alignItems: 'center',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Riders() {
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
    if (pw === 'clopp00') {
      setUnlocked(true);
    } else {
      setShake(true);
      setPw('');
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleUnlockT = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwT === 'clopp00') {
      setUnlockedT(true);
    } else {
      setShakeT(true);
      setPwT('');
      setTimeout(() => setShakeT(false), 500);
    }
  };

  return (
    <>
      {/* ── TECHNICAL RIDER ── */}
      <section
        id="technical-rider"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(20px, 4vh, 64px) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div className="px-6 md:px-10 max-w-screen-2xl mx-auto w-full">

          <h2
            style={{
              fontSize: 'clamp(36px, 6.5vw, 88px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              marginBottom: 'clamp(16px, 2.5vh, 48px)',
            }}
          >
            <ScrambleOnView as="span">TECHNICAL</ScrambleOnView>
            <br />
            <ScrambleOnView as="span" style={{ color: '#D40000' }}>RIDER</ScrambleOnView>
          </h2>

          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ gap: 'clamp(6px, 1vh, 12px)' }}
          >
            {TECHNICAL_CARDS.map(card => (
              <EquipCard key={card.id} card={card} />
            ))}
          </div>

          <div
            className="flex justify-end border-t"
            style={{ borderColor: '#1E1E1E', marginTop: 'clamp(10px, 1.8vh, 40px)', paddingTop: 'clamp(10px, 1.8vh, 32px)' }}
          >
            <a
              href="mailto:info@cloppmusic.com"
              className="inline-flex items-center gap-3 border py-3 px-6 transition-all duration-200"
              style={{ borderColor: '#3A3A3A', fontSize: '12px', letterSpacing: '0.18em', whiteSpace: 'nowrap' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#D40000';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#D40000';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#3A3A3A';
              }}
            >
              REQUEST PDF
            </a>
          </div>
        </div>

        {/* ── Technical password overlay ── */}
        {!unlockedT && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(16px, 3vh, 40px)',
              backgroundColor: isMobile ? '#0A0A0A' : 'rgba(10, 10, 10, 0.55)',
              backdropFilter: isMobile ? 'none' : 'blur(14px)',
              WebkitBackdropFilter: isMobile ? 'none' : 'blur(14px)',
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(48px, 8vw, 110px)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              PASSWORD
            </h2>

            <form
              onSubmit={handleUnlockT}
              style={{ width: '100%', maxWidth: '660px', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vh, 24px)' }}
            >
              <div
                className={shakeT ? 'pw-shake' : ''}
                style={{
                  width: '100%',
                  position: 'relative',
                  border: '2px solid #FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
              >
                <input
                  type={showPwT ? 'text' : 'password'}
                  value={pwT}
                  onChange={e => setPwT(e.target.value)}
                  autoComplete="off"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: 'clamp(18px, 3vh, 32px) 24px',
                    fontSize: 'clamp(18px, 2.5vw, 28px)',
                    letterSpacing: '0.12em',
                    color: '#FFFFFF',
                    caretColor: '#D40000',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPwT(v => !v)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 24px', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                  aria-label={showPwT ? 'Hide password' : 'Show password'}
                >
                  {showPwT ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              </div>

              <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#888888', textAlign: 'center' }}>
                CONTRASEÑA PARA MOSTRAR TECHNICAL RIDER
              </p>
            </form>
          </div>
        )}
      </section>

      {/* ── HOSPITALITY RIDER — red background, black text ── */}
      <section
        id="hospitality-rider"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(20px, 4vh, 64px) 0',
          backgroundColor: '#D40000',
        }}
      >
        {!unlocked ? (
          /* ── Password gate ── */
          <div className="px-6 md:px-10 max-w-screen-2xl mx-auto w-full flex flex-col items-center justify-center" style={{ gap: 'clamp(16px, 3vh, 40px)' }}>
            <h2
              style={{
                fontSize: 'clamp(48px, 8vw, 110px)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                color: '#000000',
                textAlign: 'center',
              }}
            >
              PASSWORD
            </h2>

            <form
              onSubmit={handleUnlock}
              style={{ width: '100%', maxWidth: '660px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'clamp(12px, 2vh, 24px)' }}
            >
              <div
                className={shake ? 'pw-shake' : ''}
                style={{
                  width: '100%',
                  position: 'relative',
                  border: '2px solid #000000',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                }}
              >
                <input
                  type={showPw ? 'text' : 'password'}
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  autoComplete="off"
                  style={{
                    flex: 1,
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: 'clamp(18px, 3vh, 32px) 24px',
                    fontSize: 'clamp(18px, 2.5vw, 28px)',
                    letterSpacing: '0.12em',
                    color: '#000000',
                    caretColor: '#000000',
                    fontFamily: 'inherit',
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 24px', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                >
                  {showPw ? (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              </div>

              <p style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.45)', textAlign: 'center' }}>
                CONTRASEÑA PARA MOSTRAR HOSPITALITY RIDER
              </p>
            </form>
          </div>
        ) : (
          /* ── Hospitality content ── */
          <div className="px-6 md:px-10 max-w-screen-2xl mx-auto w-full">
            <h2
              style={{
                fontSize: 'clamp(36px, 6.5vw, 88px)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: 'clamp(16px, 2.5vh, 48px)',
                color: '#000000',
              }}
            >
              <ScrambleOnView as="span">HOSPITALITY</ScrambleOnView>
              <br />
              <ScrambleOnView as="span">RIDER</ScrambleOnView>
            </h2>

            <div className="flex flex-col">
              {HOSPITALITY_RIDER.map(({ num, item }) => (
                <div
                  key={num}
                  className="flex gap-6 border-b"
                  style={{ borderColor: 'rgba(0,0,0,0.12)', ...ROW_STYLE }}
                >
                  <span style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.35)', flexShrink: 0, paddingTop: '3px', minWidth: '28px' }}>
                    {num}
                  </span>
                  <span style={{ fontSize: 'clamp(12px, 1.6vh, 15px)', lineHeight: 1.55, letterSpacing: '0.04em', color: '#000000', textTransform: 'none' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="flex justify-end border-t"
              style={{ borderColor: 'rgba(0,0,0,0.15)', marginTop: 'clamp(10px, 1.8vh, 40px)', paddingTop: 'clamp(10px, 1.8vh, 32px)' }}
            >
              <a
                href="mailto:info@cloppmusic.com"
                className="inline-flex items-center gap-3 border py-3 px-6 transition-all duration-200"
                style={{ borderColor: '#000000', fontSize: '12px', letterSpacing: '0.18em', color: '#000000', whiteSpace: 'nowrap' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#000000';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#D40000';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLAnchorElement).style.color = '#000000';
                }}
              >
                REQUEST PDF
              </a>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
