export default function Hero() {
  return (
    <section
      className="relative w-full flex flex-col overflow-hidden"
      style={{ height: '100dvh', minHeight: '600px' }}
    >
      {/* Background photo */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/hero.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Overlay: fade to black at bottom so title reads clean */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, transparent 40%, #0A0A0A 100%)' }}
      />

      {/* Main title */}
      <div className="relative z-10 flex items-center justify-center" style={{ flex: 1 }}>
        <h1
          className="hero-title"
          style={{
            fontSize: 'clamp(100px, 20vw, 260px)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            color: '#D40000',
          }}
        >
          CLOPP
        </h1>
      </div>
    </section>
  );
}
