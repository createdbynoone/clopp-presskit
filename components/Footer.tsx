export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: 'IG', href: '#' },
    { label: 'SC', href: '#' },
    { label: 'RA', href: '#' },
    { label: 'BC', href: '#' },
  ];

  return (
    <footer style={{ borderTop: '1px solid #D40000', backgroundColor: '#0A0A0A' }}>
      <div
        className="px-6 md:px-10 max-w-screen-2xl mx-auto"
        style={{ padding: '40px 40px' }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Left */}
          <div>
            <div
              style={{
                fontSize: 'clamp(24px, 4vw, 36px)',
                fontWeight: 900,
                letterSpacing: '-0.01em',
                lineHeight: 1,
                marginBottom: '8px',
              }}
            >
              CLOPP
            </div>
            <div
              style={{
                fontSize: '9px',
                fontWeight: 300,
                letterSpacing: '0.18em',
                color: '#888888',
              }}
            >
              © {year} — ALL RIGHTS RESERVED
            </div>
          </div>

          {/* Center */}
          <div
            className="hidden md:block"
            style={{
              fontSize: '9px',
              fontWeight: 300,
              letterSpacing: '0.18em',
              color: '#888888',
              textAlign: 'center',
            }}
          >
            <div>(BCN) / (ES)</div>
            <div style={{ color: '#3A3A3A', marginTop: '4px' }}>DJ / PRODUCER</div>
          </div>

          {/* Right — socials */}
          <div className="flex items-center gap-6">
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="hover:text-[#D40000] transition-colors duration-200"
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  color: '#888888',
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="flex items-center justify-between mt-10 pt-6 border-t"
          style={{ borderColor: '#1E1E1E' }}
        >
          <span style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.18em', color: '#3A3A3A' }}>
            PRESSKIT — ELECTRONIC MUSIC
          </span>
          <a
            href="mailto:booking@clopp.xyz"
            className="hover:text-[#D40000] transition-colors duration-200"
            style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.18em', color: '#888888' }}
          >
            BOOKING@CLOPP.XYZ
          </a>
        </div>
      </div>
    </footer>
  );
}
