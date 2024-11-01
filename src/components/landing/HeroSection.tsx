"use client";
import { useState, useEffect, useCallback } from 'react';
import HeroSectionImage1 from '@/assets/Images/hero_section/1347662.jpeg'; // Image 1
import HeroSectionImage2 from '@/assets/Images/hero_section/wallpapersden.com_iso-valorant-x-overwatch-2-style_3840x2160.jpg'; // Image 2
import HeroSectionImage3 from '@/assets/Images/hero_section/valorant-game-clove-4k-wallpaper-uhdpaper.com-361@3@a.jpg'; // Image 3
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getGamePasses, getHeroImages } from '@/http/api';


interface FileObject {
  id: number;
  fileUrl: string;
  createdAt: string;
  // Add other properties if needed with '?' if optional
}

const getFileUrls = (array?: FileObject[]): string[] => {
  if (!array || !Array.isArray(array)) {
    return [];
  }
  return array.map(item => item.fileUrl);
};


export default function HeroSection() {

  const { data: heroImages } = useQuery({
    queryKey: ['heroPosts'],
    queryFn: () => getHeroImages(),
    staleTime: 0, // Data is considered stale immediately
  });


  const images: string[] = getFileUrls(heroImages);



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

  
  return (
    <main 
      className="relative w-screen h-screen bg-cover bg-center transition-all duration-500"
      style={{ 
        backgroundImage: `url(${images[activeIndex]})`
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
              
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
