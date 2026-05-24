'use client';

import { useEffect, useState } from 'react';

const links = ['ABOUT', 'GALLERY', 'RIDERS', 'MUSIC', 'BOOKING'];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    setTimeout(() => {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-500"
        data-scrolled={String(scrolled)}
        style={{
          backgroundColor: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
        }}
      >
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-white font-black tracking-widest text-sm hover:text-[#D40000] transition-colors duration-200"
          style={{ fontWeight: 900, letterSpacing: '0.2em', fontSize: '13px' }}
        >
          CLOPP
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className="nav-link bg-transparent border-none cursor-pointer"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-2 bg-transparent border-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-[1px] bg-white transition-all duration-300"
            style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }}
          />
          <span
            className="block w-6 h-[1px] bg-white transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-6 h-[1px] bg-white transition-all duration-300"
            style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }}
          />
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button
          className="absolute top-5 right-6 bg-transparent border-none cursor-pointer text-white"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{ fontSize: '11px', letterSpacing: '0.18em', fontWeight: 500 }}
        >
          CLOSE
        </button>
        <div className="flex flex-col gap-8">
          {links.map((link, i) => (
            <button
              key={link}
              onClick={() => handleNavClick(link)}
              className="text-left bg-transparent border-none cursor-pointer text-white hover:text-[#D40000] transition-colors duration-200"
              style={{
                fontSize: 'clamp(36px, 10vw, 60px)',
                fontWeight: 900,
                letterSpacing: '0.05em',
                animationDelay: `${i * 60}ms`,
              }}
            >
              {link}
            </button>
          ))}
        </div>
        <div
          className="absolute bottom-10 left-12"
          style={{ fontSize: '10px', letterSpacing: '0.18em', color: '#888888', fontWeight: 300 }}
        >
          (BCN) — 2024
        </div>
      </div>
    </>
  );
}
