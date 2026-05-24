const RELEASES = [
  { title: 'VOID 001', type: 'EP', year: '2024', label: 'SELF-RELEASED', tracks: 4, shade: '#111111' },
  { title: 'SURFACE', type: 'SINGLE', year: '2023', label: 'SELF-RELEASED', tracks: 2, shade: '#131313' },
  { title: 'STATIC LOOP EP', type: 'EP', year: '2022', label: 'SELF-RELEASED', tracks: 5, shade: '#101010' },
];

const MIXES = [
  { title: 'RESIDENT ADVISOR MIX — RA.001', duration: '1H 12M', year: '2024' },
  { title: 'FABRIC PROMO — LONDON', duration: '58M', year: '2023' },
  { title: 'PANORAMA BAR CAST', duration: '1H 30M', year: '2023' },
];

export default function Music() {
  return (
    <section id="music" className="section-reveal" style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}>
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto">

        {/* Section label */}
        <div className="flex items-center justify-between mb-16">
          <span style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#888888' }}>
            (004) — MUSIC
          </span>
          <div className="section-divider" style={{ width: '60%' }} />
        </div>

        <h2
          style={{
            fontSize: 'clamp(44px, 6.5vw, 88px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            marginBottom: '64px',
          }}
        >
          RELEASES /<br />MIXES
        </h2>

        {/* Releases */}
        <div style={{ marginBottom: '80px' }}>
          <div className="flex items-center gap-4 mb-8" style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#888888' }}>
            <div style={{ width: '24px', height: '1px', backgroundColor: '#D40000' }} />
            DISCOGRAPHY
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {RELEASES.map(({ title, type, year, label, tracks, shade }) => (
              <div
                key={title}
                className="group relative border border-[#222] hover:border-[#D40000] transition-colors duration-300 cursor-pointer"
                style={{ overflow: 'hidden' }}
              >
                {/* Cover placeholder */}
                <div style={{ width: '100%', paddingBottom: '100%', position: 'relative', backgroundColor: shade }}>
                  <div className="absolute inset-0 flex items-center justify-center" style={{ opacity: 0.08 }}>
                    <span style={{ fontSize: 'clamp(60px, 12vw, 100px)', letterSpacing: '-0.04em', color: '#FFFFFF', userSelect: 'none' }}>
                      C
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-[#D40000] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>

                {/* Metadata */}
                <div className="p-5 border-t" style={{ borderColor: '#222' }}>
                  <div style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#888888', marginBottom: '8px' }}>
                    {type} — {year} — {label}
                  </div>
                  <div style={{ fontSize: '17px', letterSpacing: '0.04em' }}>
                    {title}
                  </div>
                  <div style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#888888', marginTop: '8px' }}>
                    {tracks} TRACKS
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Mix embed placeholder */}
        <div style={{ marginBottom: '64px' }}>
          <div className="flex items-center gap-4 mb-8" style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#888888' }}>
            <div style={{ width: '24px', height: '1px', backgroundColor: '#D40000' }} />
            FEATURED MIX
          </div>

          <div
            className="relative w-full border"
            style={{
              aspectRatio: '16/7',
              backgroundColor: '#111111',
              borderColor: '#222222',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div className="text-center">
              <div style={{ fontSize: 'clamp(32px, 6vw, 64px)', letterSpacing: '-0.02em', color: '#222222', marginBottom: '16px' }}>
                ▶
              </div>
              <div style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#888888' }}>
                EMBED PLACEHOLDER — SOUNDCLOUD / MIXCLOUD
              </div>
            </div>
            <div style={{ position: 'absolute', bottom: '20px', left: '24px', fontSize: '13px', letterSpacing: '0.12em', color: '#888888' }}>
              RESIDENT ADVISOR MIX — RA.001 — 2024 — 1H 12M
            </div>
          </div>
        </div>

        {/* Mix list */}
        <div>
          <div className="flex items-center gap-4 mb-6" style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#888888' }}>
            <div style={{ width: '24px', height: '1px', backgroundColor: '#D40000' }} />
            SELECTED MIXES
          </div>

          {MIXES.map(({ title, duration, year }) => (
            <div
              key={title}
              className="flex items-center justify-between py-5 border-b hover:border-[#D40000] transition-colors duration-200 cursor-pointer group"
              style={{ borderColor: '#222222' }}
            >
              <div className="flex items-center gap-6">
                <span className="group-hover:text-[#D40000] transition-colors duration-200" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
                  ▶
                </span>
                <span style={{ fontSize: '15px', letterSpacing: '0.08em' }}>
                  {title}
                </span>
              </div>
              <div className="flex items-center gap-6" style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#888888' }}>
                <span className="hidden sm:block">{year}</span>
                <span>{duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Platform links */}
        <div className="flex flex-wrap gap-4 mt-12">
          {['SOUNDCLOUD', 'SPOTIFY', 'BANDCAMP', 'BEATPORT'].map((platform) => (
            <a
              key={platform}
              href="#"
              className="border py-2 px-5 hover:bg-white hover:text-black transition-all duration-200"
              style={{ borderColor: '#3A3A3A', fontSize: '13px', letterSpacing: '0.15em' }}
            >
              {platform}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
