'use client';
import React, { useState } from 'react';
import { ScrambleOnView } from '@/components/ui/scramble-on-view';
import { useLanguage } from '@/contexts/LanguageContext';
import { T } from '@/lib/translations';

const PURPLE = '#C03000';
const GREEN  = '#A8CC10';

const SOCIALS = [
  { label: 'IG', href: 'https://instagram.com/cloppmusic' },
  { label: 'SC', href: 'https://soundcloud.com/cloppmusic' },
  { label: 'RA', href: 'https://ra.co/dj/clopp' },
  { label: 'BC', href: 'https://clopp.bandcamp.com' },
];

export default function Booking() {
  const { lang } = useLanguage();
  const t = T[lang].booking;
  const [form, setForm] = useState({ name: '', company: '', date: '', city: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:info@cloppmusic.com?subject=BOOKING INQUIRY — ${form.company || form.name}&body=NAME: ${form.name}%0ACOMPANY/PROMOTER: ${form.company}%0AEVENT DATE: ${form.date}%0ACITY: ${form.city}%0A%0AMESSAGE:%0A${form.message}`;
    window.location.href = mailto;
    setStatus('sent');
  };

  return (
    <section
      id="booking"
      style={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 'clamp(36px, 5vh, 120px)',
        backgroundColor: PURPLE,
      }}
    >
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto w-full" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-16">

          {/* Left */}
          <div className="md:col-span-5 scroll-trigger animate--slide-in">
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 60px)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: 'clamp(6px, 1.5vh, 40px)', color: GREEN }}>
              <ScrambleOnView as="span">{t.title1}</ScrambleOnView>
              <br />
              <ScrambleOnView as="span">{t.title2}</ScrambleOnView>
            </h2>

            <p style={{ fontSize: 'clamp(13px, 1.8vh, 17px)', lineHeight: 1.7, letterSpacing: '0.03em', color: `rgba(168,204,16,0.65)`, textTransform: 'none', marginBottom: 'clamp(6px, 1.5vh, 40px)', maxWidth: '360px' }}>
              {t.description}
            </p>

            <a href="mailto:info@cloppmusic.com" className="block transition-opacity duration-200 hover:opacity-60" style={{ fontSize: 'clamp(13px, 1.6vw, 20px)', letterSpacing: '0.06em', color: GREEN }}>
              <ScrambleOnView as="span">INFO@CLOPPMUSIC.COM</ScrambleOnView>
            </a>
          </div>

          {/* Right — form */}
          <div className="md:col-span-7 scroll-trigger animate--slide-in" style={{ '--animation-order': 1 } as React.CSSProperties}>
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center h-full text-center" style={{ minHeight: '300px', gap: '16px' }}>
                <div style={{ fontSize: '13px', letterSpacing: '0.18em', color: GREEN, marginBottom: '8px' }}>■</div>
                <div style={{ fontSize: 'clamp(18px, 3vw, 36px)', letterSpacing: '-0.01em', color: GREEN }}>{t.sent}</div>
                <p style={{ fontSize: '14px', letterSpacing: '0.08em', color: `rgba(168,204,16,0.65)`, textTransform: 'none' }}>{t.sentMsg}</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 border py-2 px-6 transition-all duration-200"
                  style={{ borderColor: GREEN, fontSize: '13px', letterSpacing: '0.15em', color: GREEN }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = GREEN; (e.currentTarget as HTMLButtonElement).style.color = PURPLE; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = GREEN; }}
                >
                  {t.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  <input type="text" name="name" placeholder={t.name} required value={form.name} onChange={handleChange} className="form-input form-input--onpurple" />
                  <input type="text" name="company" placeholder={t.company} value={form.company} onChange={handleChange} className="form-input form-input--onpurple" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mt-2">
                  <input type="text" name="date" placeholder={t.date} value={form.date} onChange={handleChange} className="form-input form-input--onpurple" />
                  <input type="text" name="city" placeholder={t.city} value={form.city} onChange={handleChange} className="form-input form-input--onpurple" />
                </div>
                <div className="mt-2">
                  <textarea name="message" placeholder={t.message} required value={form.message} onChange={handleChange} className="form-input form-input--onpurple form-textarea" />
                </div>
                <div className="flex items-center justify-end" style={{ marginTop: 'clamp(8px, 1.5vh, 40px)' }}>
                  <button
                    type="submit"
                    className="flex items-center gap-4 border py-3 px-8 transition-all duration-300 group"
                    style={{ borderColor: GREEN, fontSize: '13px', letterSpacing: '0.15em', color: GREEN }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = GREEN; (e.currentTarget as HTMLButtonElement).style.color = PURPLE; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = GREEN; }}
                  >
                    {t.send}
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#000000', marginTop: 'auto', flexShrink: 0, paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="px-6 md:px-10 max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ padding: '16px 24px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)' }}>
            © {new Date().getFullYear()} — {t.rights}
          </div>
          <div className="hidden md:block" style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>
            {t.artist}
          </div>
          <div className="flex items-center gap-6">
            {SOCIALS.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="transition-opacity duration-200 hover:opacity-50" style={{ fontSize: '12px', letterSpacing: '0.18em', color: '#FFFFFF' }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}
