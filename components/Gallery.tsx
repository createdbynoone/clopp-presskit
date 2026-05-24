const GALLERY_ITEMS = [
  { id: 1, location: 'BARCELONA', year: '2024' },
  { id: 2, location: 'BERLIN', year: '2023' },
  { id: 3, location: 'LONDON', year: '2023' },
  { id: 4, location: 'AMSTERDAM', year: '2023' },
  { id: 5, location: 'PARIS', year: '2022' },
  { id: 6, location: 'MADRID', year: '2022' },
];

const GREY_SHADES = ['#111111', '#141414', '#161616', '#131313', '#151515', '#121212'];

export default function Gallery() {
  return (
    <section id="gallery" className="section-reveal" style={{ padding: 'clamp(60px, 8vw, 100px) 0' }}>
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto">

        {/* Section label */}
        <div className="flex items-center justify-between mb-12">
          <span style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#888888' }}>
            (002) — GALERÍA
          </span>
          <div className="section-divider" style={{ width: '60%' }} />
        </div>

        {/* Title row */}
        <div className="flex items-end gap-4 mb-12">
          <h2
            style={{
              fontSize: 'clamp(44px, 7vw, 90px)',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            GALERÍA
          </h2>
          <span
            style={{
              fontSize: '13px',
              letterSpacing: '0.15em',
              color: '#888888',
              paddingBottom: '14px',
            }}
          >
            — 2022 / 2024
          </span>
        </div>

        {/* ─── DESKTOP GRID + DOWNLOAD OVERLAY ─── */}
        <div className="hidden md:block" style={{ position: 'relative' }}>

          {/* Photo grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '4px',
            }}
          >
            {/* Large left image — spans 2 rows */}
            <div
              className="gallery-item"
              style={{ gridRow: 'span 2', minHeight: '580px' }}
            >
              <div style={{ width: '100%', height: '100%', backgroundColor: GREY_SHADES[0], minHeight: '580px' }} />
              <div className="gallery-overlay" />
              <div className="gallery-caption">
                <span>BARCELONA</span>
                <span>2024</span>
              </div>
              <span style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '12px', letterSpacing: '0.15em', color: '#555555' }}>
                (01)
              </span>
            </div>

            {/* Top-right pair */}
            {[
              { location: 'BERLIN', year: '2023', shade: GREY_SHADES[1] },
              { location: 'LONDON', year: '2023', shade: GREY_SHADES[2] },
            ].map(({ location, year, shade }, i) => (
              <div key={location} className="gallery-item" style={{ height: '288px' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: shade }} />
                <div className="gallery-overlay" />
                <div className="gallery-caption">
                  <span>{location}</span>
                  <span>{year}</span>
                </div>
                <span style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '12px', letterSpacing: '0.15em', color: '#555555' }}>
                  ({String(i + 2).padStart(2, '0')})
                </span>
              </div>
            ))}
          </div>

          {/* Bottom row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: '4px',
              marginTop: '4px',
            }}
          >
            {[
              { location: 'AMSTERDAM', year: '2023', shade: GREY_SHADES[3] },
              { location: 'PARIS', year: '2022', shade: GREY_SHADES[4] },
              { location: 'MADRID', year: '2022', shade: GREY_SHADES[5] },
            ].map(({ location, year, shade }, i) => (
              <div key={location} className="gallery-item" style={{ height: '260px' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: shade }} />
                <div className="gallery-overlay" />
                <div className="gallery-caption">
                  <span>{location}</span>
                  <span>{year}</span>
                </div>
                <span style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '12px', letterSpacing: '0.15em', color: '#555555' }}>
                  ({String(i + 4).padStart(2, '0')})
                </span>
              </div>
            ))}
          </div>

          {/* ── DOWNLOAD CONTENT overlay ── */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              display: 'flex',
              alignItems: 'flex-end',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          >
            <a
              href="#"
              aria-label="Download press content"
              className="download-link"
              style={{
                pointerEvents: 'all',
                display: 'block',
                fontSize: 'clamp(72px, 13vw, 190px)',
                color: '#D40000',
                letterSpacing: '-0.03em',
                lineHeight: 0.82,
                textDecoration: 'none',
                paddingBottom: '32px',
              }}
            >
              DOWNLOAD<br />CONTENT
            </a>
          </div>
        </div>

        {/* ─── MOBILE LAYOUT ─── */}
        <div className="md:hidden" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4px' }}>
            {GALLERY_ITEMS.map(({ id, location, year }, idx) => (
              <div key={id} className="gallery-item" style={{ height: '240px' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: GREY_SHADES[idx] }} />
                <div className="gallery-overlay" />
                <div className="gallery-caption">
                  <span>{location}</span>
                  <span>{year}</span>
                </div>
                <span style={{ position: 'absolute', top: '16px', left: '16px', fontSize: '12px', letterSpacing: '0.15em', color: '#555555' }}>
                  ({String(id).padStart(2, '0')})
                </span>
              </div>
            ))}
          </div>

          {/* Mobile DOWNLOAD CONTENT */}
          <div style={{ marginTop: '32px' }}>
            <a
              href="#"
              aria-label="Download press content"
              style={{
                display: 'block',
                fontSize: 'clamp(52px, 16vw, 90px)',
                color: '#D40000',
                letterSpacing: '-0.03em',
                lineHeight: 0.85,
                textDecoration: 'none',
              }}
            >
              DOWNLOAD<br />CONTENT
            </a>
          </div>
        </div>

        <div
          className="mt-10 flex items-center justify-between"
          style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#888888' }}
        >
          <span>6 IMAGES — PLACEHOLDER</span>
          <span style={{ color: '#D40000' }}>FULL PORTFOLIO ON REQUEST</span>
        </div>
      </div>
    </section>
  );
}
