"use client";
import { useState, useEffect, useCallback, useRef, act } from 'react';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import {  getHeroImages } from '@/http/api';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';

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

  console.log('heroImages')


  const images: string[] = getFileUrls(heroImages);



  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const scrollToNext = () => {
    if (carouselRef.current && images) {
      const newIndex = (activeIndex + 1) % images.length;
      const cardWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: cardWidth * newIndex,
        behavior: 'smooth'
      });
      setActiveIndex(newIndex);
    }
  };

  const scrollToPrev = () => {
    if (carouselRef.current && images) {
      const newIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
      const cardWidth = carouselRef.current.offsetWidth ; // Show 4 cards at a time
      carouselRef.current.scrollTo({
        left: cardWidth * newIndex,
        behavior: 'smooth'
      });
      setActiveIndex(newIndex);
    }
  };

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
      className="relative w-screen aspect-video"
     
    >
      <div className="relative w-full h-full"
                   ref={carouselRef}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 
              ${activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}
              ${isTransitioning && activeIndex === index ? 'opacity-50' : ''}`}
          >
            <Link href=''>
            <Image
              src={image}
              alt={`Hero slide ${index + 1}`}
              fill
              priority={index === 0}
              quality={90}
              className="object-cover object-center"
            />
            </Link>
          </div>
        ))}
          <button 
          onClick={scrollToPrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white backdrop-blur-sm z-30"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={scrollToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white backdrop-blur-sm z-30"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </main>
  );
}
