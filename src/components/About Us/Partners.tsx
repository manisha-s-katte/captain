import React from 'react';
import Image from 'next/image';
import PartnerImg from '@/assets/Images/AboutUs/Partners/0c0494514350f9fe4cc9c74bada8e664.png';

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
    <p className="text-white text-sm font-medium">{name}</p>
  </div>
);

const Partners: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#3C0056] to-[#21022F] flex flex-col items-center py-24">
      <h1 className="text-2xl font-bold text-white mb-14">We’re partnered with</h1>
      <div className="flex flex-wrap justify-center gap-8 px-4">
        <LogoCard
          src={PartnerImg.src} // Replace with the actual path to your image
          alt="Sheepfarm in Metaland"
          name="Sheepfarm in Metaland"
        />
        <LogoCard
          src={PartnerImg.src} // Replace with the actual path to your image
          alt="Fabwelt Studios"
          name="Fabwelt Studios"
        />
        <LogoCard
          src={PartnerImg.src} // Replace with the actual path to your image
          alt="Exitlag"
          name="Exitlag"
        />
        <LogoCard
          src={PartnerImg.src} // Replace with the actual path to your image
          alt="Leagues.gg"
          name="Leagues.gg"
        />
      </div>
    </div>
  );
}

export default Partners;
