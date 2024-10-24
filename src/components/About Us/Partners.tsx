import React from 'react';
import Image from 'next/image';
import PartnerImg1 from '@/assets/Images/AboutUs/Partners/0c0494514350f9fe4cc9c74bada8e664.png';
import PartnerImg2 from '@/assets/Images/AboutUs/Partners/Sheepfarm.webp';
import PartnerImg3 from '@/assets/Images/AboutUs/Partners/FABWELT.webp';
import PartnerImg4 from '@/assets/Images/AboutUs/Partners/leagues.webp';

// Define the props for the LogoCard component
interface LogoCardProps {
  src: string;
  alt: string;
  name: string;
}

// Local component to render each logo and its name
const LogoCard: React.FC<LogoCardProps> = ({ src, alt, name }) => (
  <div className="flex flex-col items-center">
    <Image src={src} alt={alt} width={200} height={200} className="mb-3" /> {/* Adjust size as needed */}
  </div>
);

const Partners: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#3C0056] to-[#21022F] flex flex-col items-center py-24">
      <h1 className="text-2xl font-bold text-white mb-14">We&apos;re partnered with</h1>
      <div className="flex flex-wrap justify-center gap-8 px-4">
        <LogoCard
          src={PartnerImg2.src} // Replace with the actual path to your image
          alt="Sheepfarm in Metaland"
          name="Sheepfarm in Metaland"
        />
        <LogoCard
          src={PartnerImg3.src} // Replace with the actual path to your image
          alt="Fabwelt Studios"
          name="Fabwelt Studios"
        />
        <LogoCard
          src={PartnerImg4.src} // Replace with the actual path to your image
          alt="Leagues.gg"
          name="Leagues.gg"
        />
      </div>
    </div>
  );
}

export default Partners;
