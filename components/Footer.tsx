export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: 'IG', href: '#' },
    { label: 'SC', href: '#' },
    { label: 'RA', href: '#' },
    { label: 'BC', href: '#' },
  ];

  return (
    <footer style={{ backgroundColor: '#D40000' }}>
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto" style={{ padding: '40px 40px' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Left */}
          <div>
            <div
              style={{
                fontSize: 'clamp(26px, 4vw, 40px)',
                lineHeight: 1,
                letterSpacing: '-0.01em',
                marginBottom: '8px',
                color: '#000000',
              }}
            >
              CLOPP
            </div>
            <div style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#000000' }}>
              © {year} — ALL RIGHTS RESERVED
            </div>
          </div>

          {/* Center */}
          <div
            className="hidden md:block"
            style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#000000', textAlign: 'center' }}
          >
            <div style={{ color: '#5A0000' }}>ELECTRONIC MUSIC ARTIST</div>
          </div>

          {/* Right — socials */}
          <div className="flex items-center gap-6">
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="transition-opacity duration-200 hover:opacity-60"
                style={{ fontSize: '14px', letterSpacing: '0.18em', color: '#000000' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
