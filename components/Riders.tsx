const TECHNICAL_RIDER = [
  { num: '01', item: '2× CDJ-3000 or equivalent (Pioneer DXJ-XP2 accepted)' },
  { num: '02', item: 'Pioneer DJM-900NXS2 or DJM-V10 (preferred)' },
  { num: '03', item: 'All channels calibrated and fully functional' },
  { num: '04', item: 'XLR stereo output connected to house system' },
  { num: '05', item: 'Monitor speakers: minimum 2× floor monitors (minimum 400W each)' },
  { num: '06', item: 'Reliable power supply with surge protection' },
  { num: '07', item: 'Stage lighting under technical direction of venue' },
  { num: '08', item: 'Booth accessible 30 min before performance for soundcheck' },
];

const HOSPITALITY_RIDER = [
  { num: '01', item: 'Artist + 1 guest pass (laminate / wristband access)' },
  { num: '02', item: 'Private or shared green room with secure entry' },
  { num: '03', item: '1× case of water (500ml bottles), soft drinks' },
  { num: '04', item: 'Light food/snacks available backstage' },
  { num: '05', item: 'Hotel accommodation if venue is 50+ km from Barcelona' },
  { num: '06', item: 'Airport / venue transfers when required' },
  { num: '07', item: 'Confirmed fee payment method and schedule in advance' },
  { num: '08', item: 'Promoter contact on-site from artist arrival' },
];

export default function Riders() {
  return (
    <section id="riders" className="section-reveal" style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}>
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto">

        {/* Section label */}
        <div className="flex items-center justify-between mb-16">
          <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.18em', color: '#888888' }}>
            (003) — RIDERS
          </span>
          <div className="section-divider" style={{ width: '60%' }} />
        </div>

        <h2
          style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            marginBottom: '64px',
          }}
        >
          TECHNICAL /<br />HOSPITALITY
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

          {/* Technical Rider */}
          <div className="border-r" style={{ borderColor: '#3A3A3A', paddingRight: '48px' }}>
            <div className="flex items-center gap-4 mb-10">
              <div style={{ width: '2px', height: '20px', backgroundColor: '#D40000', flexShrink: 0 }} />
              <h3 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em' }}>
                TECHNICAL RIDER
              </h3>
            </div>
            <div className="flex flex-col">
              {TECHNICAL_RIDER.map(({ num, item }, i) => (
                <div
                  key={num}
                  className="flex gap-6 py-5 border-b"
                  style={{ borderColor: '#222222' }}
                >
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 300,
                      letterSpacing: '0.18em',
                      color: '#D40000',
                      flexShrink: 0,
                      paddingTop: '2px',
                    }}
                  >
                    {num}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: 1.6,
                      letterSpacing: '0.06em',
                      color: i === 1 ? '#FFFFFF' : '#CCCCCC',
                      textTransform: 'none',
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hospitality Rider */}
          <div style={{ paddingLeft: '48px' }}>
            <div className="flex items-center gap-4 mb-10">
              <div style={{ width: '2px', height: '20px', backgroundColor: '#D40000', flexShrink: 0 }} />
              <h3 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em' }}>
                HOSPITALITY RIDER
              </h3>
            </div>
            <div className="flex flex-col">
              {HOSPITALITY_RIDER.map(({ num, item }) => (
                <div
                  key={num}
                  className="flex gap-6 py-5 border-b"
                  style={{ borderColor: '#222222' }}
                >
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 300,
                      letterSpacing: '0.18em',
                      color: '#D40000',
                      flexShrink: 0,
                      paddingTop: '2px',
                    }}
                  >
                    {num}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: 1.6,
                      letterSpacing: '0.06em',
                      color: '#CCCCCC',
                      textTransform: 'none',
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Download CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-16 pt-10 border-t" style={{ borderColor: '#3A3A3A' }}>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.18em', color: '#888888', marginBottom: '8px' }}>
              COMPLETE RIDER AVAILABLE AS PDF
            </div>
            <div style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '0.1em', color: '#CCCCCC', textTransform: 'none' }}>
              For specific requirements or questions, contact the booking team directly.
            </div>
          </div>
          <a
            href="mailto:booking@clopp.xyz"
            className="inline-flex items-center gap-3 border py-3 px-6 hover:bg-[#D40000] hover:border-[#D40000] transition-all duration-200"
            style={{
              borderColor: '#3A3A3A',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              whiteSpace: 'nowrap',
            }}
          >
            REQUEST RIDER PDF
          </a>
        </div>
      </div>
    </section>
  );
}
