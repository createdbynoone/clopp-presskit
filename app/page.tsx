import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Riders from '@/components/Riders';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';

// Heavy sections — code-split so they don't block the initial Hero bundle
const Gallery = dynamic(() => import('@/components/Gallery'));
const Music   = dynamic(() => import('@/components/Music'));

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        <Hero />
        <About />
        <Gallery />
        <Riders />
        <Music />
        <Booking />
      </main>

      <Footer />
    </>
  );
}
