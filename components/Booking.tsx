'use client';

import { useState } from 'react';

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
    <section id="booking" className="section-reveal" style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}>
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">

          {/* Left — email + info */}
          <div className="md:col-span-5">
            <h2
              style={{
                fontSize: 'clamp(40px, 5.5vw, 78px)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: '40px',
              }}
            >
              LET'S<br />
              <span style={{ color: '#D40000' }}>TALK</span>
            </h2>

            <p
              style={{
                fontSize: '17px',
                lineHeight: 1.8,
                letterSpacing: '0.03em',
                color: '#888888',
                textTransform: 'none',
                marginBottom: '48px',
                maxWidth: '360px',
              }}
            >
              For bookings, festival slots, and collaborations. Response within 48 hours.
              Include event date, venue capacity and expected fee range.
            </p>

            {/* Email prominent */}
            <div style={{ marginBottom: '40px' }}>
              <a
                href="mailto:info@cloppmusic.com"
                className="block hover:text-[#D40000] transition-colors duration-200"
                style={{ fontSize: 'clamp(16px, 2.5vw, 26px)', letterSpacing: '0.06em', color: '#FFFFFF' }}
              >
                INFO@CLOPPMUSIC.COM
              </a>
            </div>

            {/* Info block */}
            <div className="flex flex-col gap-0">
              {[
                { label: 'MANAGEMENT', value: 'SELF-MANAGED' },
                { label: 'BASE', value: 'BARCELONA, SPAIN' },
                { label: 'TRAVEL', value: 'WORLDWIDE' },
                { label: 'RESPONSE', value: '48H MAX' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-8 py-4 border-b" style={{ borderColor: '#1E1E1E' }}>
                  <span style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#888888', minWidth: '120px' }}>
                    {label}
                  </span>
                  <span style={{ fontSize: '15px', letterSpacing: '0.1em' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="md:col-span-7">
            {status === 'sent' ? (
              <div className="flex flex-col items-center justify-center h-full text-center" style={{ minHeight: '400px', gap: '16px' }}>
                <div style={{ fontSize: '13px', letterSpacing: '0.18em', color: '#D40000', marginBottom: '8px' }}>■</div>
                <div style={{ fontSize: 'clamp(24px, 4vw, 44px)', letterSpacing: '-0.01em' }}>
                  MESSAGE SENT
                </div>
                <p style={{ fontSize: '15px', letterSpacing: '0.08em', color: '#888888', textTransform: 'none' }}>
                  Your mail client should have opened. We'll be in touch within 48 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 border py-2 px-6 hover:bg-white hover:text-black transition-all duration-200"
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
                <div className="flex items-center justify-end mt-10 pt-6 border-t" style={{ borderColor: '#1E1E1E' }}>
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
    </section>
  );
}
