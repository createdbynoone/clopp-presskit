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

        <h2
          style={{
            fontSize: 'clamp(44px, 7vw, 90px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            marginBottom: '40px',
          }}
        >
          GALERÍA
        </h2>

        {/* ─── DESKTOP ─── */}
        <div className="hidden md:block" style={{ position: 'relative' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
            {/* Large left — 2 rows */}
            <div className="gallery-item" style={{ gridRow: 'span 2', minHeight: '580px' }}>
              <div style={{ width: '100%', height: '100%', backgroundColor: GREY_SHADES[0], minHeight: '580px' }} />
              <div className="gallery-overlay" />
              <div className="gallery-caption">
                <span>BARCELONA</span>
                <span>2024</span>
              </div>
            </div>

            {[
              { location: 'BERLIN', year: '2023', shade: GREY_SHADES[1] },
              { location: 'LONDON', year: '2023', shade: GREY_SHADES[2] },
            ].map(({ location, year, shade }) => (
              <div key={location} className="gallery-item" style={{ height: '288px' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: shade }} />
                <div className="gallery-overlay" />
                <div className="gallery-caption">
                  <span>{location}</span>
                  <span>{year}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '4px', marginTop: '4px' }}>
            {[
              { location: 'AMSTERDAM', year: '2023', shade: GREY_SHADES[3] },
              { location: 'PARIS', year: '2022', shade: GREY_SHADES[4] },
              { location: 'MADRID', year: '2022', shade: GREY_SHADES[5] },
            ].map(({ location, year, shade }) => (
              <div key={location} className="gallery-item" style={{ height: '260px' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: shade }} />
                <div className="gallery-overlay" />
                <div className="gallery-caption">
                  <span>{location}</span>
                  <span>{year}</span>
                </div>
              </div>
            ))}
          </div>

          {/* DOWNLOAD CONTENT overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
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

        {/* ─── MOBILE ─── */}
        <div className="md:hidden">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4px' }}>
            {GALLERY_ITEMS.map(({ id, location, year }, idx) => (
              <div key={id} className="gallery-item" style={{ height: '240px' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: GREY_SHADES[idx] }} />
                <div className="gallery-overlay" />
                <div className="gallery-caption">
                  <span>{location}</span>
                  <span>{year}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '32px' }}>
            <a
              href="#"
              aria-label="Download press content"
              className="download-link"
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
      </div>
    </section>
  );
}
