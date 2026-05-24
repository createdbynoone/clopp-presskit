export default function Hero() {
  return (
    <section
      className="relative w-full flex flex-col justify-end overflow-hidden"
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
        {/* Structural horizontal line */}
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
        {/* Right column shadow */}
        <div
          className="absolute right-0 top-0 bottom-0"
          style={{
            width: '55%',
            background: 'linear-gradient(to left, #161616 0%, transparent 100%)',
            borderLeft: '1px solid #222',
          }}
        />
      </div>

      {/* Red horizontal accent bar */}
      <div
        className="absolute left-0 right-0"
        style={{ bottom: '22%', height: '1px', backgroundColor: '#D40000' }}
      />

      {/* Main title */}
      <div className="relative z-10 px-6 md:px-10 pb-14">
        <h1
          className="hero-title text-white"
          style={{
            fontSize: 'clamp(100px, 20vw, 260px)',
            lineHeight: 0.85,
            letterSpacing: '-0.02em',
          }}
        >
          CLOPP
        </h1>
      </div>
    </section>
  );
}
