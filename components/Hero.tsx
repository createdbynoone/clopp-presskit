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

      {/* Main title — mix-blend-mode: difference sobre la foto */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ mixBlendMode: 'difference' }}
      >
        <h1
          className="hero-title"
          style={{
            fontSize: 'clamp(100px, 20vw, 260px)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
            color: '#FFFFFF',
          }}
        >
          CLOPP
        </h1>
      </div>
    </section>
  );
}
