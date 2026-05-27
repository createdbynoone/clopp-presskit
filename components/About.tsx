'use client';
import { ScrambleOnView } from '@/components/ui/scramble-on-view';
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';

export default function About() {
  const { lang } = useLanguage();
  const t = T[lang].about;

  const stats = [
    { label: t.base,   value: 'BCN / ES' },
    { label: t.active, value: '2018 —' },
    { label: t.genre,  value: 'TECHNO / AMBIENT' },
    { label: t.status, value: t.statusVal },
  ];

  return (
    <section id="about" style={{ padding: 'clamp(20px, 4vh, 72px) 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto w-full">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0">

          {/* Left — ghost number + red bar */}
          <div className="md:col-span-3 flex items-start gap-4 scroll-trigger animate--slide-in">
            <div style={{ width: '2px', height: 'clamp(80px, 12vh, 160px)', backgroundColor: '#D40000', flexShrink: 0, marginTop: '8px' }} />
            <div style={{ fontSize: 'clamp(50px, 9vh, 140px)', lineHeight: 0.85, color: '#161616', letterSpacing: '-0.03em', userSelect: 'none' }}>
              01
            </div>
          </div>

          {/* Right — content */}
          <div className="md:col-span-9 md:pl-16 scroll-trigger animate--slide-in" style={{ '--animation-order': 1 } as React.CSSProperties}>
            <ScrambleOnView as="h2" style={{ fontSize: 'clamp(36px, 5.5vw, 78px)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: 'clamp(12px, 2.5vh, 36px)' }}>
              CLOPP
            </ScrambleOnView>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ marginBottom: 'clamp(12px, 3vh, 48px)' }}>
              <p style={{ fontSize: 'clamp(13px, 1.8vh, 17px)', lineHeight: 1.7, letterSpacing: '0.03em', color: '#FFFFFF', textTransform: 'none' }}>
                {t.bio1}
              </p>
              <p style={{ fontSize: 'clamp(13px, 1.8vh, 17px)', lineHeight: 1.7, letterSpacing: '0.03em', color: '#888888', textTransform: 'none' }}>
                {t.bio2}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map(({ label, value }, i) => (
                <div key={i} className="scroll-trigger animate--rolling-fade-in" style={{ '--animation-order': i } as React.CSSProperties}>
                  <ScrambleOnView as="div" style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#888888', marginBottom: '6px' }}>
                    {label}
                  </ScrambleOnView>
                  <ScrambleOnView as="div" style={{ fontSize: '13px', letterSpacing: '0.08em', color: '#FFFFFF' }}>
                    {value}
                  </ScrambleOnView>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Venues bar */}
        <div
          className="flex flex-wrap border-t border-b scroll-trigger animate--slide-in"
          style={{ '--animation-order': 2, borderColor: '#3A3A3A', marginTop: 'clamp(16px, 3vh, 64px)' } as React.CSSProperties}
        >
          {['FABRIC — LONDON', 'RAZZMATAZZ — BCN', 'ARENA CLUB — BER', 'LE BATACLAN — PAR'].map((venue) => (
            <div key={venue} className="flex-1 border-r last:border-r-0" style={{ borderColor: '#3A3A3A', minWidth: '160px', padding: 'clamp(10px, 1.5vh, 20px) 24px' }}>
              <ScrambleOnView as="div" style={{ fontSize: '13px', letterSpacing: '0.1em', color: '#FFFFFF' }}>
                {venue}
              </ScrambleOnView>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
