export default function Hero() {
  return (
    <section
      className="relative w-full flex flex-col overflow-hidden"
      style={{ height: '100dvh', minHeight: '600px' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #111111 0%, #0A0A0A 40%, #0f0f0f 100%)' }}
      >
        {/* Grain texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </div>

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
