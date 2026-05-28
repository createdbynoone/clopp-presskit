import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';

// Code-split everything below the fold
const Music   = dynamic(() => import('@/components/Music'));
const Gallery = dynamic(() => import('@/components/Gallery'));
const Booking = dynamic(() => import('@/components/Booking'));

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <About />
        <Music />
        <Gallery />
        <Booking />
      </main>
    </>
  );
}
