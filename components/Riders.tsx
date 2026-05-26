'use client';
import React, { useState, useEffect } from 'react';
import { ScrambleOnView } from '@/components/ui/scramble-on-view';

const TECHNICAL_CARDS = [
  {
    id: 'player',
    label: 'REPRODUCTOR DIGITAL',
    spec: '3× CDJ-3000 O 3× CDJ-3000X',
    images: [
      { src: '/images/equipment/cdj3000.jpg', alt: 'Pioneer CDJ-3000' },
      { src: '/images/equipment/cdj3000.jpg', alt: 'Pioneer CDJ-3000X' },
    ],
    items: [],
  },
  {
    id: 'mixer',
    label: 'MIXER',
    spec: 'DJM-V10 — DJM-A9 — XONE:96',
    images: [
      { src: '/images/equipment/djmv10.jpg', alt: 'Pioneer DJM-V10' },
      { src: '/images/equipment/djma9.jpg', alt: 'Pioneer DJM-A9' },
      { src: '', alt: 'Allen & Heath XONE:96', label: 'XONE:96' },
    ],
    items: [],
  },
  {
    id: 'booth',
    label: 'BOOTH',
    spec: '',
    images: [],
    items: [
      'RETORNO / MONITORES DE SUELO',
      'SUMINISTRO ELÉCTRICO ESTABLE',
      'CABINA ACCESIBLE PARA SOUNDCHECK ANTES DE ACTUACIÓN',
    ],
  },
  {
    id: 'optional',
    label: 'OPCIONAL',
    spec: '',
    images: [
      { src: '/images/equipment/rmx1000.jpg', alt: 'Pioneer RMX-1000 / RMX Ignite' },
    ],
    items: [
      '1× RMX-1000 / RMX IGNITE',
      'SALIDAS DISPONIBLES PARA GRABACIÓN DESDE MIXER',
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

function EquipCard({ card }: { card: typeof TECHNICAL_CARDS[0] }) {
  return (
    <div
      style={{
        border: '1px solid #1E1E1E',
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(16px, 2.5vh, 32px)',
        gap: 'clamp(12px, 2vh, 24px)',
      }}
    >
      {/* Header */}
      <div>
        <p style={{ fontSize: '10px', letterSpacing: '0.2em', color: '#D40000', marginBottom: '8px' }}>
          {card.label}
        </p>
        {card.spec && (
          <p style={{ fontSize: 'clamp(13px, 1.8vh, 17px)', letterSpacing: '0.05em', color: '#FFFFFF', lineHeight: 1.3 }}>
            {card.spec}
          </p>
        )}
        {card.items.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {card.items.map((item, i) => (
              <li
                key={i}
                style={{ fontSize: 'clamp(12px, 1.6vh, 15px)', letterSpacing: '0.04em', color: '#CCCCCC', lineHeight: 1.5, display: 'flex', gap: '10px', alignItems: 'flex-start' }}
              >
                <span style={{ color: '#D40000', flexShrink: 0, marginTop: '1px' }}>—</span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Images */}
      {card.images.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flex: 1,
          }}
        >
          {card.images.map((img, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                backgroundColor: '#111111',
                border: '1px solid #1E1E1E',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {img.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                /* Styled text placeholder for XONE:96 (no image available) */
                <p style={{ fontSize: 'clamp(10px, 1.3vw, 14px)', letterSpacing: '0.12em', color: '#555555', textAlign: 'center', padding: '8px' }}>
                  {'label' in img ? img.label : img.alt}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
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

          {/* 4 equipment cards — no scroll-trigger so they're visible after unlock */}
          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: 'clamp(8px, 1.5vh, 20px)' }}
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
          /* ── Hospitality content — no scroll-trigger so it's visible immediately ── */
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
