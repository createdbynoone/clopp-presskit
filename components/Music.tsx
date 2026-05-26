import React from 'react';
import { ScrambleOnView } from '@/components/ui/scramble-on-view';
import MusicPortfolio, { type Release } from '@/components/ui/music-portfolio';

const RELEASES_DATA: Release[] = [
  { id: 1, artist: 'CLOPP', album: 'VOID 001',       category: 'EP',     label: 'SELF-RELEASED', year: '2024', image: '/images/hero.png' },
  { id: 2, artist: 'CLOPP', album: 'SURFACE',        category: 'SINGLE', label: 'SELF-RELEASED', year: '2023', image: '/images/hero.png' },
  { id: 3, artist: 'CLOPP', album: 'STATIC LOOP EP', category: 'EP',     label: 'SELF-RELEASED', year: '2022', image: '/images/hero.png' },
  { id: 4, artist: 'CLOPP', album: 'FRAGMENTS',      category: 'ALBUM',  label: 'SELF-RELEASED', year: '2021', image: '/images/hero.png' },
];

const SC_SETS = [
  { title: 'RESIDENT ADVISOR MIX — RA.001', duration: '1H 12M', year: '2024' },
  { title: 'FABRIC PROMO — LONDON', duration: '58M', year: '2023' },
  { title: 'PANORAMA BAR CAST', duration: '1H 30M', year: '2023' },
];

const H2 = {
  fontSize: 'clamp(44px, 6.5vw, 88px)',
  lineHeight: 0.9,
  letterSpacing: '-0.02em',
  marginBottom: '64px',
} as const;

export default function Music() {
  return (
    <>
      {/* ── RELEASES — fullscreen banner ── */}
      <section id="releases" style={{ height: '100vh', overflow: 'hidden', padding: 0, minHeight: 'unset' }}>
        <MusicPortfolio releases={RELEASES_DATA} />
      </section>

      {/* ── SESSIONS — separate full-screen section ── */}
      <section id="sessions" style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}>
        <div className="px-6 md:px-10 max-w-screen-2xl mx-auto">

          <h2 style={H2}>
            <ScrambleOnView as="span">SESSIONS</ScrambleOnView>
          </h2>

          {/* YouTube placeholder */}
          <div
            className="relative w-full border"
            style={{
              aspectRatio: '16/9',
              backgroundColor: '#111111',
              borderColor: '#222222',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '4px',
            }}
          >
            <div style={{ fontSize: 'clamp(32px, 6vw, 64px)', letterSpacing: '-0.02em', color: '#222222' }}>▶</div>
            <div style={{ position: 'absolute', top: '14px', right: '18px', fontSize: '10px', letterSpacing: '0.18em', color: '#3A3A3A' }}>
              YOUTUBE
            </div>
          </div>

          {/* SoundCloud sets */}
          <div style={{ marginTop: '48px', marginBottom: '48px' }}>
            {SC_SETS.map(({ title, duration, year }) => (
              <div
                key={title}
                className="flex items-center justify-between py-5 border-b hover:border-[#D40000] transition-colors duration-200 cursor-pointer group"
                style={{ borderColor: '#222222' }}
              >
                <div className="flex items-center gap-6">
                  <span className="group-hover:text-[#D40000] transition-colors duration-200" style={{ fontSize: '13px' }}>▶</span>
                  <ScrambleOnView as="span" style={{ fontSize: '15px', letterSpacing: '0.08em' }}>
                    {title}
                  </ScrambleOnView>
                </div>
                <div className="flex items-center gap-6" style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#888888' }}>
                  <span className="hidden sm:block">{year}</span>
                  <span>{duration}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
