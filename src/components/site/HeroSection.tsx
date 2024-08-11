"use client";
import { useState } from 'react';
import Navbar from '@/components/site/Navbar';
import HeroSectionImage1 from '@/assets/Images/hero_section/1347662.jpeg'; // Image 1
import HeroSectionImage2 from '@/assets/Images/hero_section/wallpapersden.com_iso-valorant-x-overwatch-2-style_3840x2160.jpg'; // Image 2
import HeroSectionImage3 from '@/assets/Images/hero_section/valorant-game-clove-4k-wallpaper-uhdpaper.com-361@3@a.jpg'; // Image 3

const images = [
  HeroSectionImage1,
  HeroSectionImage2,
  HeroSectionImage3,
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <main 
      className="relative w-screen h-screen bg-cover bg-center transition-all duration-500"
      style={{ 
        backgroundImage: `url(${images[activeIndex].src})`
      }}
    >
      <div className="absolute bottom-32 left-20 flex space-x-2" >
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleImageChange(index)}
            className={`w-3 h-3 cursor-pointer transition-colors duration-300 ${index === activeIndex ? 'bg-fuchsia-900 w-8' : 'bg-gray-400'}`}
          >
          </div>
        ))}
      </div>
    </main>
  );
}
