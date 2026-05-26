'use client';
import React, { useState } from 'react';
import { ScrambleOnView } from '@/components/ui/scramble-on-view';

const SOCIALS = [
  { label: 'IG', href: '#' },
  { label: 'SC', href: '#' },
  { label: 'RA', href: '#' },
  { label: 'BC', href: '#' },
];

export default function Booking() {
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
      style={{ display: 'flex', flexDirection: 'column', paddingTop: 'clamp(20px, 4vh, 72px)' }}
    >
      {/* ── Main booking content ── */}
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto w-full" style={{ flex: 1, paddingBottom: 'clamp(20px, 4vh, 60px)' }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">

          {/* Left — email + info */}
          <div className="md:col-span-5 scroll-trigger animate--slide-in">
            <h2
              style={{
                fontSize: 'clamp(36px, 5.5vw, 78px)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: 'clamp(12px, 2.5vh, 40px)',
              }}
            >
              <ScrambleOnView as="span">{"LET'S"}</ScrambleOnView>
              <br />
              <ScrambleOnView as="span" style={{ color: '#D40000' }}>TALK</ScrambleOnView>
            </h2>

            <p
              style={{
                fontSize: 'clamp(13px, 1.8vh, 17px)',
                lineHeight: 1.7,
                letterSpacing: '0.03em',
                color: '#888888',
                textTransform: 'none',
                marginBottom: 'clamp(12px, 2.5vh, 40px)',
                maxWidth: '360px',
              }}
            >
              For bookings, festival slots, and collaborations. Response within 48 hours.
              Include event date, venue capacity and expected fee range.
            </p>

            <div style={{ marginBottom: 'clamp(12px, 2vh, 32px)' }}>
              <a
                href="mailto:info@cloppmusic.com"
                className="block hover:text-[#D40000] transition-colors duration-200"
                style={{ fontSize: 'clamp(14px, 2.2vw, 26px)', letterSpacing: '0.06em', color: '#FFFFFF' }}
              >
                <ScrambleOnView as="span">INFO@CLOPPMUSIC.COM</ScrambleOnView>
              </a>
            </div>

            <div className="flex flex-col gap-0">
              {[
                { label: 'MANAGEMENT', value: 'SELF-MANAGED' },
                { label: 'BASE', value: 'BARCELONA, SPAIN' },
                { label: 'TRAVEL', value: 'WORLDWIDE' },
                { label: 'RESPONSE', value: '48H MAX' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-8 border-b"
                  style={{ borderColor: '#1E1E1E', paddingTop: 'clamp(6px, 1vh, 16px)', paddingBottom: 'clamp(6px, 1vh, 16px)' }}
                >
                  <ScrambleOnView as="span" style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#888888', minWidth: '110px' }}>
                    {label}
                  </ScrambleOnView>
                  <ScrambleOnView as="span" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>
                    {value}
                  </ScrambleOnView>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="md:col-span-7 scroll-trigger animate--slide-in" style={{ '--animation-order': 1 } as React.CSSProperties}>
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center h-full text-center" style={{ minHeight: '300px', gap: '16px' }}>
                <div style={{ fontSize: '13px', letterSpacing: '0.18em', color: '#D40000', marginBottom: '8px' }}>■</div>
                <div style={{ fontSize: 'clamp(20px, 4vw, 44px)', letterSpacing: '-0.01em' }}>MESSAGE SENT</div>
                <p style={{ fontSize: '14px', letterSpacing: '0.08em', color: '#888888', textTransform: 'none' }}>
                  Your mail client should have opened. We'll be in touch within 48 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 border py-2 px-6 hover:bg-white hover:text-black transition-all duration-200"
                  style={{ borderColor: '#3A3A3A', fontSize: '13px', letterSpacing: '0.15em' }}
                >
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  <input type="text" name="name" placeholder="NAME *" required value={form.name} onChange={handleChange} className="form-input" />
                  <input type="text" name="company" placeholder="COMPANY / PROMOTER" value={form.company} onChange={handleChange} className="form-input" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mt-2">
                  <input type="text" name="date" placeholder="EVENT DATE" value={form.date} onChange={handleChange} className="form-input" />
                  <input type="text" name="city" placeholder="CITY / VENUE" value={form.city} onChange={handleChange} className="form-input" />
                </div>
                <div className="mt-2">
                  <textarea
                    name="message"
                    placeholder="MESSAGE — EVENT DETAILS, CAPACITY, FEE RANGE *"
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="form-input form-textarea"
                  />
                </div>
                <div
                  className="flex items-center justify-end border-t"
                  style={{ borderColor: '#1E1E1E', marginTop: 'clamp(12px, 2vh, 40px)', paddingTop: 'clamp(12px, 2vh, 24px)' }}
                >
                  <button
                    type="submit"
                    className="flex items-center gap-4 border py-3 px-8 hover:bg-[#D40000] hover:border-[#D40000] hover:text-white transition-all duration-300 group"
                    style={{ borderColor: '#FFFFFF', fontSize: '13px', letterSpacing: '0.15em' }}
                  >
                    SEND INQUIRY
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Footer bar ── */}
      <footer style={{ backgroundColor: '#D40000', marginTop: 'auto' }}>
        <div
          className="px-6 md:px-10 max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ padding: '24px 40px' }}
        >
          <div>
            <div
              style={{
                fontFamily: "'NeueHaasDisplay', 'Helvetica Neue', Arial, sans-serif",
                fontSize: 'clamp(20px, 3vw, 36px)',
                lineHeight: 1,
                letterSpacing: '-0.01em',
                marginBottom: '5px',
                color: '#000000',
              }}
            >
              CLOPP
            </div>
            <div style={{ fontSize: '11px', letterSpacing: '0.15em', color: 'rgba(0,0,0,0.5)' }}>
              © {new Date().getFullYear()} — ALL RIGHTS RESERVED
            </div>
          </div>

          <div className="hidden md:block" style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(0,0,0,0.4)' }}>
            ELECTRONIC MUSIC ARTIST
          </div>

          <div className="flex items-center gap-6">
            {SOCIALS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="transition-opacity duration-200 hover:opacity-50"
                style={{ fontSize: '12px', letterSpacing: '0.18em', color: '#000000' }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}
