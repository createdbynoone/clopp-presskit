import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Gallery from '@/components/Gallery';
import Riders from '@/components/Riders';
import Music from '@/components/Music';
import Booking from '@/components/Booking';
import Footer from '@/components/Footer';

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
