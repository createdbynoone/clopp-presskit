'use client';
import React from 'react';
import { ScrambleOnView } from '@/components/ui/scramble-on-view';

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

const H2 = {
  fontSize: 'clamp(44px, 6.5vw, 88px)',
  lineHeight: 0.9,
  letterSpacing: '-0.02em',
  marginBottom: '52px',
} as const;

export default function Riders() {
  return (
    <>
      {/* ── TECHNICAL RIDER ── */}
      <section
        id="technical-rider"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(64px, 8vw, 100px) 0',
        }}
      >
        <div className="px-6 md:px-10 max-w-screen-2xl mx-auto w-full">

          <h2 style={H2}>
            <ScrambleOnView as="span">TECHNICAL</ScrambleOnView>
            <br />
            <ScrambleOnView as="span" style={{ color: '#D40000' }}>RIDER</ScrambleOnView>
          </h2>

          <div className="flex flex-col scroll-trigger animate--slide-in">
            {TECHNICAL_RIDER.map(({ num, item }) => (
              <div key={num} className="flex gap-6 py-5 border-b" style={{ borderColor: '#1E1E1E' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#D40000', flexShrink: 0, paddingTop: '3px', minWidth: '28px' }}>
                  {num}
                </span>
                <span style={{ fontSize: '15px', lineHeight: 1.65, letterSpacing: '0.04em', color: '#CCCCCC', textTransform: 'none' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-10 pt-8 border-t scroll-trigger animate--fade-in" style={{ borderColor: '#1E1E1E' }}>
            <a
              href="mailto:info@cloppmusic.com"
              className="inline-flex items-center gap-3 border py-3 px-6 transition-all duration-200"
              style={{ borderColor: '#3A3A3A', fontSize: '12px', letterSpacing: '0.18em', whiteSpace: 'nowrap' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#D40000';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#D40000';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.borderColor = '#3A3A3A';
              }}
            >
              REQUEST PDF
            </a>
          </div>
        </div>
      </section>

      {/* ── HOSPITALITY RIDER — red background, black text ── */}
      <section
        id="hospitality-rider"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(64px, 8vw, 100px) 0',
          backgroundColor: '#D40000',
        }}
      >
        <div className="px-6 md:px-10 max-w-screen-2xl mx-auto w-full">

          <h2 style={{ ...H2, color: '#000000' }}>
            <ScrambleOnView as="span">HOSPITALITY</ScrambleOnView>
            <br />
            <ScrambleOnView as="span">RIDER</ScrambleOnView>
          </h2>

          <div className="flex flex-col scroll-trigger animate--slide-in">
            {HOSPITALITY_RIDER.map(({ num, item }) => (
              <div
                key={num}
                className="flex gap-6 py-5 border-b"
                style={{ borderColor: 'rgba(0,0,0,0.12)' }}
              >
                <span style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.35)', flexShrink: 0, paddingTop: '3px', minWidth: '28px' }}>
                  {num}
                </span>
                <span style={{ fontSize: '15px', lineHeight: 1.65, letterSpacing: '0.04em', color: '#000000', textTransform: 'none' }}>
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-10 pt-8 border-t scroll-trigger animate--fade-in" style={{ borderColor: 'rgba(0,0,0,0.15)' }}>
            <a
              href="mailto:info@cloppmusic.com"
              className="inline-flex items-center gap-3 border py-3 px-6 transition-all duration-200"
              style={{ borderColor: '#000000', fontSize: '12px', letterSpacing: '0.18em', color: '#000000', whiteSpace: 'nowrap' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#000000';
                (e.currentTarget as HTMLAnchorElement).style.color = '#D40000';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.color = '#000000';
              }}
            >
              REQUEST PDF
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
