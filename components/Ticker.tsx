const TICKER_TEXT = [
  'CLOPP',
  '——',
  'ELECTRONIC MUSIC',
  '——',
  'DJ / PRODUCER',
  '——',
  'BARCELONA',
  '——',
  'BOOKING OPEN',
  '——',
  'PRESSKIT 2024',
  '——',
  'TECHNO',
  '——',
  'AMBIENT',
  '——',
  'INDUSTRIAL',
  '——',
];

export default function Ticker() {
  const items = [...TICKER_TEXT, ...TICKER_TEXT];

  return (
    <div className="ticker-wrap">
      <div className="ticker-track">
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-block px-6"
            style={{
              fontSize: '10px',
              fontWeight: item === '——' ? 100 : 700,
              letterSpacing: '0.22em',
              color: item === '——' ? '#3A3A3A' : '#D40000',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
