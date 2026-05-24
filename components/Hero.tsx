export default function Hero() {
  return (
    <section
      className="relative w-full flex flex-col justify-end overflow-hidden"
      style={{ height: '100dvh', minHeight: '600px' }}
    >
      {/* Background placeholder — replace with real image later */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, #111111 0%, #0A0A0A 40%, #0f0f0f 100%)',
        }}
      >
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
        {/* Diagonal graphic line — raw brutalist element */}
        <div
          className="absolute"
          style={{
            top: '35%',
            left: 0,
            right: 0,
            height: '1px',
            backgroundColor: '#3A3A3A',
            transform: 'rotate(-2deg) scaleX(1.1)',
            transformOrigin: 'left',
          }}
        />
        {/* IMAGE PLACEHOLDER — replace with real artist photo */}
        <div
          className="absolute right-0 top-0 bottom-0"
          style={{
            width: '55%',
            background: 'linear-gradient(to left, #161616 0%, transparent 100%)',
            borderLeft: '1px solid #222',
          }}
        />
      </div>

      {/* Coordinate labels — top meta info */}
      <div
        className="absolute top-24 left-6 md:left-10 flex flex-col gap-1 hero-meta"
        style={{ color: '#888888', fontSize: '10px', fontWeight: 300, letterSpacing: '0.18em' }}
      >
        <span>(BCN) / (ES)</span>
        <span style={{ color: '#D40000' }}>■ 2024—</span>
      </div>

      <div
        className="absolute top-24 right-6 md:right-10 flex flex-col items-end gap-1 hero-meta"
        style={{ color: '#888888', fontSize: '10px', fontWeight: 300, letterSpacing: '0.18em' }}
      >
        <span>DJ / PRODUCER</span>
        <span>ELECTRONIC MUSIC</span>
      </div>

      {/* Thin red horizontal accent bar */}
      <div
        className="absolute left-0 right-0"
        style={{ bottom: '22%', height: '1px', backgroundColor: '#D40000' }}
      />

      {/* Main title */}
      <div className="relative z-10 px-6 md:px-10 pb-10">
        <h1
          className="hero-title text-white leading-none tracking-tight"
          style={{
            fontSize: 'clamp(100px, 20vw, 260px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 0.85,
            marginBottom: '24px',
          }}
        >
          CLOPP
        </h1>

        {/* Bottom meta row */}
        <div
          className="hero-meta flex flex-wrap items-center gap-6"
          style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.18em', color: '#888888' }}
        >
          <span>PRESSKIT 2024</span>
          <span className="hidden sm:block" style={{ color: '#3A3A3A' }}>——</span>
          <span>BARCELONA, SPAIN</span>
          <span className="hidden sm:block" style={{ color: '#3A3A3A' }}>——</span>
          <span style={{ color: '#D40000' }}>BOOKING OPEN</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 right-6 md:right-10 hero-meta"
        style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.2em', color: '#888888' }}
      >
        <div className="flex flex-col items-center gap-2">
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, transparent, #888888)',
            }}
          />
          <span>SCROLL</span>
        </div>
      </div>
    </section>
  );
}
