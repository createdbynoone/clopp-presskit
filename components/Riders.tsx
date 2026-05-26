'use client';
import React, { useState, useEffect } from 'react';
import { ScrambleOnView } from '@/components/ui/scramble-on-view';

const TECHNICAL_RIDER = [
  { num: '01', item: '2× CDJ-3000 o equivalente (Pioneer DXJ-XP2 aceptado)' },
  { num: '02', item: 'Pioneer DJM-900NXS2 o DJM-V10 (preferido)' },
  { num: '03', item: 'Todos los canales calibrados y completamente funcionales' },
  { num: '04', item: 'Salida XLR estéreo conectada al sistema de sala' },
  { num: '05', item: 'Monitores: mínimo 2× monitores de suelo (mínimo 400W c/u)' },
  { num: '06', item: 'Suministro eléctrico estable con protección de sobretensión' },
  { num: '07', item: 'Iluminación de escenario bajo dirección técnica del local' },
  { num: '08', item: 'Cabina accesible 30 min antes de la actuación para soundcheck' },
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

          <div className="flex flex-col scroll-trigger animate--slide-in">
            {TECHNICAL_RIDER.map(({ num, item }) => (
              <div key={num} className="flex gap-6 border-b" style={{ borderColor: '#1E1E1E', ...ROW_STYLE }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#D40000', flexShrink: 0, paddingTop: '3px', minWidth: '28px' }}>
                  {num}
                </span>
                <span style={{ fontSize: 'clamp(12px, 1.6vh, 15px)', lineHeight: 1.55, letterSpacing: '0.04em', color: '#CCCCCC', textTransform: 'none' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div
            className="flex justify-end border-t scroll-trigger animate--fade-in"
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
              // Mobile: solid black. Desktop: frosted glass blur
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
                    /* Eye open */
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  ) : (
                    /* Eye off */
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
