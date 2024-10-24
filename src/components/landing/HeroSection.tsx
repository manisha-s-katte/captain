"use client";
import { useState, useEffect, useCallback } from 'react';
import HeroSectionImage1 from '@/assets/Images/hero_section/1347662.jpeg'; // Image 1
import HeroSectionImage2 from '@/assets/Images/hero_section/wallpapersden.com_iso-valorant-x-overwatch-2-style_3840x2160.jpg'; // Image 2
import HeroSectionImage3 from '@/assets/Images/hero_section/valorant-game-clove-4k-wallpaper-uhdpaper.com-361@3@a.jpg'; // Image 3
import Image from 'next/image';
const images = [
  HeroSectionImage1,
  HeroSectionImage2,
  HeroSectionImage3,
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleImageChange = (index: number) => {
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setActiveIndex((current) => (current + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images.length]);

  useEffect(() => {
    let intervalId:any;
    if (isPlaying) {
      intervalId = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, nextSlide]);

  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <main 
      className="relative w-screen h-screen bg-cover bg-center transition-all duration-500"
      style={{ 
        backgroundImage: `url(${images[activeIndex].src})`
      }}
    >
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 
              ${activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}
              ${isTransitioning && activeIndex === index ? 'opacity-50' : ''}`}
          >
            <Image
              src={image}
              alt={`Hero slide ${index + 1}`}
              fill
              priority={index === 0}
              quality={90}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
      <div className="flex space-x-2 hidden">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-8 bg-fuchsia-900' 
                  : 'w-3 bg-gray-400 hover:bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
    </main>
  );
}
