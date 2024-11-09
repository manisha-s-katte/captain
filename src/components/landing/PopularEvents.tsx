"use client"
import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import GamePass from '@/assets/Resources/GamePass.webp';
import Link from 'next/link';
import { getTournaments } from '@/http/api';
import { useQuery } from "@tanstack/react-query";
import { toCapitalize } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FileObject {
  id: number;
  fileUrl: string;
}

const getFileUrls = (array?: FileObject[]): string[] => {
  if (!array || !Array.isArray(array)) {
    return [];
  }
  return array.map(item => item.fileUrl);
};

const PopularEvents = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => await getTournaments('ongoing'),
  });

  const scrollToNext = () => {
    if (carouselRef.current && tournaments) {
      const newIndex = (currentIndex + 1) % tournaments.length;
      const cardWidth = 320; // Show 4 cards at a time
      carouselRef.current.scrollTo({
        left: cardWidth * newIndex,
        behavior: 'smooth'
      });
      setCurrentIndex(newIndex);
    }
  };

  const scrollToPrev = () => {
    if (carouselRef.current && tournaments) {
      const newIndex = currentIndex === 0 ? tournaments.length - 1 : currentIndex - 1;
      const cardWidth = carouselRef.current.offsetWidth / 4; // Show 4 cards at a time
      carouselRef.current.scrollTo({
        left: cardWidth * newIndex,
        behavior: 'smooth'
      });
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isHovered && tournaments?.length) {
      interval = setInterval(() => {
        scrollToNext();
      }, 3000); // Autoplay every 3 seconds
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, isHovered, tournaments]);

  return (
    <section className="overflow-y-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#14021D] to-[#3C0056] text-white flex justify-between items-center p-4">
        <span className="text-xl sm:text-2xl mx-4 sm:mx-16 my-4 font-semibold">
          Popular Events
        </span>
        <span className="view_all uppercase border-b-2 border-fuchsia-600 border-spacing-10 mr-4 sm:mr-20 text-xl sm:text-2xl font-semibold cursor-pointer">
          View all
        </span>
      </div>

      {/* Carousel Section */}
      <div className="bg-gradient-to-r from-[#3C0056] to-[#14021D] relative">
        <div 
          className="flex overflow-x-hidden scroll-smooth p-8 relative"
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {tournaments?.map((tournament: any, index: number) => (
            <div
              key={index}
              className="min-w-[25%] px-4 flex-shrink-0"
            >
              <div className="relative">
                <Image
                  src={tournament.fileUrl}
                  alt={`Event Card ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-auto"
                  objectFit="contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm text-white z-20">
                  <div className="flex justify-between gap-2 text-base">
                    <div>
                      <div className='text-xs font-bold'>ENTRY</div> {tournament.entryFee} INR
                    </div>
                    <div>
                      <div className='text-xs font-bold'>MODE</div>{' '}
                      {toCapitalize(tournament.tournamentType)}
                    </div>
                    <div>
                      <div className='text-xs font-bold'>PRIZE</div> {tournament.prize || 'TBD'} INR
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
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

      {/* Game Pass Section */}
      <div className="bg-gradient-to-r from-[#3C0056] to-[#14021D] pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:pl-20 sm:pr-0 py-8 text-white">
          <h1 className="view_all text-2xl sm:text-3xl md:text-4xl lg:text-[3.5em] font-medium tracking-tight text-center md:text-left mb-6 md:mb-0 leading-snug">
            Get Your Game Pass <br />
            <span className="mt-3 block md:inline-flex text-nowrap">
              play games and win rewards
            </span>
          </h1>
          <div className="pt-10 md:mt-0 md:ml-12 flex justify-center w-full">
            <Image
              src={GamePass}
              alt="gamepass"
              className="w-full sm:w-[400px] md:w-[650px] lg:w-full"
            />
          </div>
        </div>
        <div className="flex justify-center md:justify-start ml-0 md:ml-20 mt-8">
          <Link href="/gamePass">
            <button className="relative view_all text-white pl-5 pr-9 py-3 text-lg sm:text-[1.2em] font-semibold overflow-hidden">
              <div className="pentagon bg-yellow-500 absolute inset-0"></div>
              <span className="relative text-black z-10">Coming Soon</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularEvents;