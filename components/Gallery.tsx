const GALLERY_ITEMS = [
  { id: 1, location: 'BARCELONA', year: '2024', aspect: '4/5', colSpan: 1, rowSpan: 2 },
  { id: 2, location: 'BERLIN', year: '2023', aspect: '16/9', colSpan: 1, rowSpan: 1 },
  { id: 3, location: 'LONDON', year: '2023', aspect: '1/1', colSpan: 1, rowSpan: 1 },
  { id: 4, location: 'AMSTERDAM', year: '2023', aspect: '3/2', colSpan: 2, rowSpan: 1 },
  { id: 5, location: 'PARIS', year: '2022', aspect: '2/3', colSpan: 1, rowSpan: 1 },
  { id: 6, location: 'MADRID', year: '2022', aspect: '1/1', colSpan: 1, rowSpan: 1 },
];

const GREY_SHADES = ['#111111', '#141414', '#161616', '#131313', '#151515', '#121212'];

export default function Gallery() {
  return (
    <section id="gallery" className="section-reveal" style={{ padding: 'clamp(60px, 8vw, 100px) 0' }}>
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto">

        {/* Section label */}
        <div className="flex items-center justify-between mb-12">
          <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.18em', color: '#888888' }}>
            (002) — GALLERY
          </span>
          <div className="section-divider" style={{ width: '60%' }} />
        </div>

        <div className="flex items-end gap-4 mb-12">
          <h2
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
            }}
          >
            VISUALS
          </h2>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 300,
              letterSpacing: '0.18em',
              color: '#888888',
              paddingBottom: '12px',
            }}
          >
            — 2022 / 2024
          </span>
        </div>

        {/* Desktop: custom grid layout */}
        <div
          className="hidden md:grid gap-2"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto' }}
        >
          {/* Large left image — 2 rows */}
          <div
            className="gallery-item"
            style={{ gridRow: 'span 2', minHeight: '600px' }}
          >
            <div style={{ width: '100%', height: '100%', backgroundColor: GREY_SHADES[0], minHeight: '600px' }} />
            <div className="gallery-overlay" />
            <div className="gallery-caption">
              <span>BARCELONA</span>
              <span>2024</span>
            </div>
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                fontSize: '9px',
                fontWeight: 300,
                letterSpacing: '0.18em',
                color: '#888888',
              }}
            >
              (01)
            </div>
          </div>

          {/* Top-right images */}
          {[
            { location: 'BERLIN', year: '2023', shade: GREY_SHADES[1], h: '290px' },
            { location: 'LONDON', year: '2023', shade: GREY_SHADES[2], h: '290px' },
          ].map(({ location, year, shade, h }, i) => (
            <div key={location} className="gallery-item" style={{ height: h }}>
              <div style={{ width: '100%', height: '100%', backgroundColor: shade }} />
              <div className="gallery-overlay" />
              <div className="gallery-caption">
                <span>{location}</span>
                <span>{year}</span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  fontSize: '9px',
                  fontWeight: 300,
                  letterSpacing: '0.18em',
                  color: '#888888',
                }}
              >
                ({String(i + 2).padStart(2, '0')})
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row — full width span */}
        <div className="hidden md:grid gap-2 mt-2" style={{ gridTemplateColumns: '2fr 1fr 1fr' }}>
          {[
            { location: 'AMSTERDAM', year: '2023', shade: GREY_SHADES[3] },
            { location: 'PARIS', year: '2022', shade: GREY_SHADES[4] },
            { location: 'MADRID', year: '2022', shade: GREY_SHADES[5] },
          ].map(({ location, year, shade }, i) => (
            <div key={location} className="gallery-item" style={{ height: '280px' }}>
              <div style={{ width: '100%', height: '100%', backgroundColor: shade }} />
              <div className="gallery-overlay" />
              <div className="gallery-caption">
                <span>{location}</span>
                <span>{year}</span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  fontSize: '9px',
                  fontWeight: 300,
                  letterSpacing: '0.18em',
                  color: '#888888',
                }}
              >
                ({String(i + 4).padStart(2, '0')})
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: simple column */}
        <div className="md:hidden grid grid-cols-1 gap-2">
          {GALLERY_ITEMS.map(({ id, location, year }, idx) => (
            <div key={id} className="gallery-item" style={{ height: '250px' }}>
              <div style={{ width: '100%', height: '100%', backgroundColor: GREY_SHADES[idx] }} />
              <div className="gallery-overlay" />
              <div className="gallery-caption">
                <span>{location}</span>
                <span>{year}</span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  fontSize: '9px',
                  fontWeight: 300,
                  letterSpacing: '0.18em',
                  color: '#888888',
                }}
              >
                ({String(id).padStart(2, '0')})
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-8 flex items-center justify-between"
          style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.18em', color: '#888888' }}
        >
          <span>6 IMAGES — PLACEHOLDER</span>
          <span style={{ color: '#D40000' }}>FULL PORTFOLIO ON REQUEST</span>
        </div>
      </div>
    </section>
  );
}
