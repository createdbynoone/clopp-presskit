import { ScrambleOnView } from '@/components/ui/scramble-on-view';

export default function About() {
  return (
    <section id="about" style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}>
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0">

          {/* Left — large ghost number + red bar */}
          <div className="md:col-span-3 flex items-start gap-4 scroll-trigger animate--slide-in">
            <div style={{ width: '2px', height: '160px', backgroundColor: '#D40000', flexShrink: 0, marginTop: '8px' }} />
            <div
              style={{
                fontSize: 'clamp(80px, 12vw, 160px)',
                lineHeight: 0.85,
                color: '#161616',
                letterSpacing: '-0.03em',
                userSelect: 'none',
              }}
            >
              01
            </div>
          </div>

          {/* Right — content */}
          <div className="md:col-span-9 md:pl-16 scroll-trigger animate--slide-in" style={{ '--animation-order': 1 } as React.CSSProperties}>
            <ScrambleOnView
              as="h2"
              style={{
                fontSize: 'clamp(40px, 5.5vw, 78px)',
                lineHeight: 0.9,
                letterSpacing: '-0.02em',
                marginBottom: '40px',
              }}
            >
              CLOPP
            </ScrambleOnView>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10" style={{ marginBottom: '56px' }}>
              <p style={{ fontSize: '17px', lineHeight: 1.8, letterSpacing: '0.03em', color: '#FFFFFF', textTransform: 'none' }}>
                Clopp is a Barcelona-based electronic music artist and producer whose work
                explores the intersection of techno, ambient and industrial sound design.
                His sets and productions move between hypnotic rhythm and atmospheric tension,
                building spaces that are simultaneously visceral and introspective.
              </p>
              <p style={{ fontSize: '17px', lineHeight: 1.8, letterSpacing: '0.03em', color: '#888888', textTransform: 'none' }}>
                Active since 2018, Clopp has developed a sound defined by precision and
                emotion — raw textures layered over precise rhythmic structures. His live
                and DJ performances have taken him across clubs and festivals in Europe,
                where he has established a reputation for deeply immersive sets.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'BASE', value: 'BCN / ES' },
                { label: 'ACTIVE', value: '2018 —' },
                { label: 'GENRE', value: 'TECHNO / AMBIENT' },
                { label: 'STATUS', value: 'BOOKING OPEN' },
              ].map(({ label, value }, i) => (
                <div key={label} className="scroll-trigger animate--rolling-fade-in" style={{ '--animation-order': i } as React.CSSProperties}>
                  <ScrambleOnView as="div" style={{ fontSize: '12px', letterSpacing: '0.18em', color: '#888888', marginBottom: '8px' }}>
                    {label}
                  </ScrambleOnView>
                  <ScrambleOnView as="div" style={{ fontSize: '15px', letterSpacing: '0.08em', color: '#FFFFFF' }}>
                    {value}
                  </ScrambleOnView>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Venues bar */}
        <div className="mt-20 flex flex-wrap border-t border-b scroll-trigger animate--slide-in" style={{ '--animation-order': 2, borderColor: '#3A3A3A' } as React.CSSProperties}>
          {['FABRIC — LONDON', 'RAZZMATAZZ — BCN', 'ARENA CLUB — BER', 'LE BATACLAN — PAR'].map((venue) => (
            <div
              key={venue}
              className="flex-1 py-5 px-6 border-r last:border-r-0"
              style={{ borderColor: '#3A3A3A', minWidth: '160px' }}
            >
              <ScrambleOnView as="div" style={{ fontSize: '14px', letterSpacing: '0.1em', color: '#FFFFFF' }}>
                {venue}
              </ScrambleOnView>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
