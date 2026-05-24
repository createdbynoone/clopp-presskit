export default function About() {
  return (
    <section id="about" className="section-reveal" style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}>
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto">

        {/* Section label */}
        <div className="flex items-center justify-between mb-16">
          <span style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#888888' }}>
            (001) — ABOUT
          </span>
          <div className="section-divider" style={{ width: '60%' }} />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0">

          {/* Left column — large number + vertical bar */}
          <div className="md:col-span-3 flex items-start gap-4">
            <div
              style={{
                width: '2px',
                height: '160px',
                backgroundColor: '#D40000',
                flexShrink: 0,
                marginTop: '8px',
              }}
            />
            <div>
              <div
                style={{
                  fontSize: 'clamp(80px, 12vw, 160px)',
                  lineHeight: 0.85,
                  color: '#161616',
                  letterSpacing: '-0.03em',
                  userSelect: 'none',
                }}
              >
                01
              </div>
            </div>
          </div>

          {/* Right column — content */}
          <div className="md:col-span-9 md:pl-16">
            <h2
              style={{
                fontSize: 'clamp(40px, 5.5vw, 78px)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: '40px',
              }}
            >
              CLOPP
            </h2>

            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
              style={{ marginBottom: '56px' }}
            >
              <p
                style={{
                  fontSize: '17px',
                  lineHeight: 1.8,
                  letterSpacing: '0.03em',
                  color: '#FFFFFF',
                  textTransform: 'none',
                }}
              >
                Clopp is a Barcelona-based electronic music artist and producer whose work
                explores the intersection of techno, ambient and industrial sound design.
                His sets and productions move between hypnotic rhythm and atmospheric tension,
                building spaces that are simultaneously visceral and introspective.
              </p>
              <p
                style={{
                  fontSize: '17px',
                  lineHeight: 1.8,
                  letterSpacing: '0.03em',
                  color: '#888888',
                  textTransform: 'none',
                }}
              >
                Active since 2018, Clopp has developed a sound defined by precision and
                emotion — raw textures layered over precise rhythmic structures. His live
                and DJ performances have taken him across clubs and festivals in Europe,
                where he has established a reputation for deeply immersive sets.
              </p>
            </div>

            {/* Stats row */}
            <div className="section-divider" style={{ marginBottom: '32px' }} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'BASE', value: 'BCN / ES' },
                { label: 'ACTIVE', value: '2018 —' },
                { label: 'GENRE', value: 'TECHNO / AMBIENT' },
                { label: 'STATUS', value: 'BOOKING OPEN' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div
                    style={{ fontSize: '12px', letterSpacing: '0.18em', color: '#888888', marginBottom: '8px' }}
                  >
                    {label}
                  </div>
                  <div
                    style={{ fontSize: '15px', letterSpacing: '0.08em', color: '#FFFFFF' }}
                  >
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured highlights bar */}
        <div
          className="mt-20 flex flex-wrap gap-0 border-t border-b"
          style={{ borderColor: '#3A3A3A' }}
        >
          {[
            'FABRIC — LONDON',
            'RAZZMATAZZ — BCN',
            'ARENA CLUB — BER',
            'LE BATACLAN — PAR',
          ].map((venue, i) => (
            <div
              key={venue}
              className="flex-1 py-5 px-6 border-r last:border-r-0"
              style={{ borderColor: '#3A3A3A', minWidth: '160px' }}
            >
              <div style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#888888', marginBottom: '6px' }}>
                ({String(i + 1).padStart(2, '0')})
              </div>
              <div style={{ fontSize: '14px', letterSpacing: '0.1em', color: '#FFFFFF' }}>
                {venue}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
