const TECHNICAL_RIDER = [
  { num: '01', item: '2× CDJ-3000 o equivalente (Pioneer DXJ-XP2 aceptado)' },
  { num: '02', item: 'Pioneer DJM-900NXS2 o DJM-V10 (preferido)' },
  { num: '03', item: 'Todos los canales calibrados y completamente funcionales' },
  { num: '04', item: 'Salida XLR estéreo conectada al sistema de sala' },
  { num: '05', item: 'Monitores: mínimo 2× monitores de suelo (mínimo 400W c/u)' },
  { num: '06', item: 'Suministro eléctrico estable con protección de sobretensión' },
  { num: '07', item: 'Iluminación de escenario bajo dirección técnica del local' },
  { num: '08', item: 'Cabina accesible 30 min antes de la actuación para soundcheck' },
];

const HOSPITALITY_RIDER = [
  { num: '01', item: 'Pase de artista + 1 acompañante (acceso laminado / pulsera)' },
  { num: '02', item: 'Camarín privado o compartido con acceso seguro' },
  { num: '03', item: '1× caja de agua (botellas 500ml), refrescos' },
  { num: '04', item: 'Snacks / comida ligera disponible backstage' },
  { num: '05', item: 'Hotel si la distancia desde Barcelona supera los 50 km' },
  { num: '06', item: 'Traslados aeropuerto / local cuando sea necesario' },
  { num: '07', item: 'Método y calendario de pago confirmados con antelación' },
  { num: '08', item: 'Contacto del promotor en sala desde la llegada del artista' },
];

export default function Riders() {
  return (
    <section id="riders" className="section-reveal" style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}>
      <div className="px-6 md:px-10 max-w-screen-2xl mx-auto">

        {/* Section label */}
        <div className="flex items-center justify-between mb-16">
          <span style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#888888' }}>
            (003) — RIDERS
          </span>
          <div className="section-divider" style={{ width: '60%' }} />
        </div>

        <h2
          style={{
            fontSize: 'clamp(44px, 6.5vw, 88px)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            marginBottom: '64px',
          }}
        >
          TECHNICAL /<br />HOSPITALITY
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">

          {/* Technical Rider */}
          <div style={{ borderRight: '1px solid #3A3A3A', paddingRight: '48px' }}>
            <div className="flex items-center gap-4 mb-10">
              <div style={{ width: '2px', height: '22px', backgroundColor: '#D40000', flexShrink: 0 }} />
              <h3 style={{ fontSize: '14px', letterSpacing: '0.15em' }}>
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
                  <span style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#D40000', flexShrink: 0, paddingTop: '2px' }}>
                    {num}
                  </span>
                  <span style={{ fontSize: '15px', lineHeight: 1.6, letterSpacing: '0.04em', color: i === 1 ? '#FFFFFF' : '#CCCCCC', textTransform: 'none' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hospitality Rider */}
          <div style={{ paddingLeft: '48px' }}>
            <div className="flex items-center gap-4 mb-10">
              <div style={{ width: '2px', height: '22px', backgroundColor: '#D40000', flexShrink: 0 }} />
              <h3 style={{ fontSize: '14px', letterSpacing: '0.15em' }}>
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
                  <span style={{ fontSize: '12px', letterSpacing: '0.15em', color: '#D40000', flexShrink: 0, paddingTop: '2px' }}>
                    {num}
                  </span>
                  <span style={{ fontSize: '15px', lineHeight: 1.6, letterSpacing: '0.04em', color: '#CCCCCC', textTransform: 'none' }}>
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
            <div style={{ fontSize: '13px', letterSpacing: '0.15em', color: '#888888', marginBottom: '8px' }}>
              RIDER COMPLETO DISPONIBLE EN PDF
            </div>
            <div style={{ fontSize: '15px', lineHeight: 1.6, letterSpacing: '0.04em', color: '#CCCCCC', textTransform: 'none' }}>
              Para requerimientos específicos, contacta directamente con el equipo de booking.
            </div>
          </div>
          <a
            href="mailto:booking@clopp.xyz"
            className="inline-flex items-center gap-3 border py-3 px-6 hover:bg-[#D40000] hover:border-[#D40000] transition-all duration-200"
            style={{ borderColor: '#3A3A3A', fontSize: '13px', letterSpacing: '0.15em', whiteSpace: 'nowrap' }}
          >
            SOLICITAR RIDER PDF
          </a>
        </div>
      </div>
    </section>
  );
}
