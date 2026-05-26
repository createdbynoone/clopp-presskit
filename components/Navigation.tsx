'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';

const NAV_LINKS = ['ABOUT', 'MUSIC', 'GALLERY', 'RIDERS', 'BOOKING'];

export default function Navigation() {
  const { lang, toggle } = useLanguage();
  const t = T[lang].nav;
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [ridersOpen, setRidersOpen] = useState(false);
  const [mobileMusicOpen, setMobileMusicOpen] = useState(false);
  const [mobileRidersOpen, setMobileRidersOpen] = useState(false);
  const musicRef = useRef<HTMLDivElement>(null);
  const ridersRef = useRef<HTMLDivElement>(null);

  const MUSIC_SUB = [
    { label: t.releases, id: 'releases' },
    { label: t.sessions, id: 'sessions' },
  ];
  const RIDERS_SUB = [
    { label: t.technical, id: 'technical-rider', href: '/riders#technical-rider' },
    { label: t.hospitality, id: 'hospitality-rider', href: '/riders#hospitality-rider' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (id: string) => {
    setMenuOpen(false);
    setMusicOpen(false);
    setRidersOpen(false);
    setTimeout(() => {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  const handleRiderClick = (href: string) => {
    setMenuOpen(false);
    setRidersOpen(false);
    router.push(href);
  };

  const dropdownStyle = (open: boolean) => ({
    position: 'absolute' as const,
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    paddingTop: '12px',
    opacity: open ? 1 : 0,
    pointerEvents: (open ? 'all' : 'none') as React.CSSProperties['pointerEvents'],
    transition: 'opacity 0.2s ease',
  });

  const dropdownInnerStyle = (open: boolean) => ({
    backgroundColor: '#0A0A0A',
    border: '1px solid',
    borderColor: '#2A2A2A',
    padding: '6px 0',
    minWidth: '140px',
  });

  const subBtnStyle = {
    fontSize: '11px',
    letterSpacing: '0.18em',
    color: '#AAAAAA',
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 md:px-10 py-5 transition-all duration-500"
        data-scrolled={String(scrolled)}
        style={{
          backgroundColor: scrolled ? '#D40000' : 'transparent',
          backdropFilter: 'none',
        }}
      >
        {/* ESP / ENG toggle — top right */}
        <button
          onClick={toggle}
          className="absolute right-10 hidden md:flex items-center"
          style={{
            background: 'none',
            border: '1px solid',
            borderColor: scrolled ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.35)',
            color: scrolled ? '#000000' : '#FFFFFF',
            fontSize: '10px',
            letterSpacing: '0.18em',
            padding: '4px 10px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = scrolled ? '#000' : '#fff'; (e.currentTarget as HTMLButtonElement).style.opacity = '0.7'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = scrolled ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLButtonElement).style.opacity = '1'; }}
        >
          {lang === 'es' ? 'ENG' : 'ESP'}
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            if (link === 'MUSIC') return (
              <div
                key={link}
                ref={musicRef}
                className="relative"
                onMouseEnter={() => setMusicOpen(true)}
                onMouseLeave={() => setMusicOpen(false)}
              >
                <button
                  onClick={() => handleNavClick('releases')}
                  className="nav-link bg-transparent border-none cursor-pointer"
                >
                  {link}
                </button>
                <div style={dropdownStyle(musicOpen)}>
                  <div style={dropdownInnerStyle(musicOpen)}>
                    {MUSIC_SUB.map(({ label, id }) => (
                      <button
                        key={id}
                        onClick={() => handleNavClick(id)}
                        className="block w-full text-left bg-transparent border-none cursor-pointer px-5 py-3 transition-colors duration-150"
                        style={subBtnStyle}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#D40000'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#AAAAAA'; }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );

            if (link === 'RIDERS') return (
              <div
                key={link}
                ref={ridersRef}
                className="relative"
                onMouseEnter={() => setRidersOpen(true)}
                onMouseLeave={() => setRidersOpen(false)}
              >
                <button
                  onClick={() => router.push('/riders')}
                  className="nav-link bg-transparent border-none cursor-pointer"
                >
                  {link}
                </button>
                <div style={dropdownStyle(ridersOpen)}>
                  <div style={dropdownInnerStyle(ridersOpen)}>
                    {RIDERS_SUB.map(({ label, id, href }) => (
                      <button
                        key={id}
                        onClick={() => handleRiderClick(href)}
                        className="block w-full text-left bg-transparent border-none cursor-pointer px-5 py-3 transition-colors duration-150"
                        style={subBtnStyle}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#D40000'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#AAAAAA'; }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );

            return (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="nav-link bg-transparent border-none cursor-pointer"
              >
                {link}
              </button>
            );
          })}
        </div>

        {/* Mobile ESP/ENG toggle */}
        <button
          onClick={toggle}
          className="md:hidden absolute left-6"
          style={{ background: 'none', border: '1px solid', borderColor: scrolled ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.35)', color: scrolled ? '#000' : '#fff', fontSize: '9px', letterSpacing: '0.15em', padding: '3px 8px', cursor: 'pointer' }}
        >
          {lang === 'es' ? 'ENG' : 'ESP'}
        </button>

        {/* Mobile hamburger */}
        <div className="md:hidden absolute right-6">
          <button
            className="flex flex-col gap-[5px] cursor-pointer p-2 bg-transparent border-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-[1px] transition-all duration-300"
              style={{ backgroundColor: scrolled ? '#000000' : '#FFFFFF', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }}
            />
            <span
              className="block w-6 h-[1px] transition-all duration-300"
              style={{ backgroundColor: scrolled ? '#000000' : '#FFFFFF', opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-[1px] transition-all duration-300"
              style={{ backgroundColor: scrolled ? '#000000' : '#FFFFFF', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button
          className="absolute top-5 right-6 bg-transparent border-none cursor-pointer text-white"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 500 }}
        >
          {t.close}
        </button>
        <div className="flex flex-col gap-8">
          {NAV_LINKS.map((link, i) => {
            if (link === 'MUSIC') return (
              <div key={link}>
                <button
                  onClick={() => setMobileMusicOpen(v => !v)}
                  className="text-left bg-transparent border-none cursor-pointer text-white hover:text-[#D40000] transition-colors duration-200 flex items-center gap-4"
                  style={{ fontSize: 'clamp(36px, 10vw, 60px)', fontWeight: 900, letterSpacing: '0.05em' }}
                >
                  {link}
                  <span style={{ fontSize: '16px', transform: mobileMusicOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease', display: 'inline-block' }}>›</span>
                </button>
                <div style={{ maxHeight: mobileMusicOpen ? '120px' : '0px', overflow: 'hidden', transition: 'max-height 0.3s ease', paddingLeft: '8px' }}>
                  {MUSIC_SUB.map(({ label, id }) => (
                    <button key={id} onClick={() => handleNavClick(id)}
                      className="block text-left bg-transparent border-none cursor-pointer text-[#888888] hover:text-[#D40000] transition-colors duration-200"
                      style={{ fontSize: 'clamp(18px, 5vw, 28px)', fontWeight: 500, letterSpacing: '0.12em', paddingTop: '8px', paddingBottom: '4px' }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            );

            if (link === 'RIDERS') return (
              <div key={link}>
                <button
                  onClick={() => setMobileRidersOpen(v => !v)}
                  className="text-left bg-transparent border-none cursor-pointer text-white hover:text-[#D40000] transition-colors duration-200 flex items-center gap-4"
                  style={{ fontSize: 'clamp(36px, 10vw, 60px)', fontWeight: 900, letterSpacing: '0.05em' }}
                >
                  {link}
                  <span style={{ fontSize: '16px', transform: mobileRidersOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s ease', display: 'inline-block' }}>›</span>
                </button>
                <div style={{ maxHeight: mobileRidersOpen ? '120px' : '0px', overflow: 'hidden', transition: 'max-height 0.3s ease', paddingLeft: '8px' }}>
                  {RIDERS_SUB.map(({ label, id, href }) => (
                    <button key={id} onClick={() => handleRiderClick(href)}
                      className="block text-left bg-transparent border-none cursor-pointer text-[#888888] hover:text-[#D40000] transition-colors duration-200"
                      style={{ fontSize: 'clamp(18px, 5vw, 28px)', fontWeight: 500, letterSpacing: '0.12em', paddingTop: '8px', paddingBottom: '4px' }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            );

            return (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="text-left bg-transparent border-none cursor-pointer text-white hover:text-[#D40000] transition-colors duration-200"
                style={{ fontSize: 'clamp(36px, 10vw, 60px)', fontWeight: 900, letterSpacing: '0.05em', animationDelay: `${i * 60}ms` }}
              >
                {link}
              </button>
            );
          })}
        </div>
        <div className="absolute bottom-10 left-12" style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#888888', fontWeight: 300 }}>
          (BCN) — 2024
        </div>
      </div>
    </>
  );
}
