import Navigation from '@/components/Navigation';
import Riders from '@/components/Riders';

export const metadata = {
  title: 'CLOPP — Riders',
};

export default function RidersPage() {
  return (
    <>
      <Navigation />
      <main>
        <Riders />
      </main>
    </>
  );
}
