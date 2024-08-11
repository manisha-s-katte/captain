import Navbar from '@/components/site/Navbar'
import HeroSection from "@/components/site/HeroSection";
import PopularEvents from '@/components/site/PopularEvents';
import Roaster from '@/components/site/Roaster';
import News from '@/components/site/News';
import Subscribe from '@/components/site/Subscribe';
import Footer from '@/components/site/Footer';

export default function Home() {
  return (
    <main >
    <Navbar />
    <HeroSection />
    <PopularEvents />
    <Roaster />
    <News />
    <Subscribe />
    <Footer />
    </main>
  );
}
