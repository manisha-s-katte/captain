"use client"
import React from 'react';
import Image from 'next/image';
import GamePass from '@/assets/Resources/GamePass.webp';
import Link from 'next/link';
import { getTournaments } from '@/http/api';
import { useQuery } from "@tanstack/react-query";
import { toCapitalize } from '@/lib/utils';




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

  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => await getTournaments('ongoing'),
  });
  const EventCard = getFileUrls(tournaments)

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

      {/* Event Cards Section */}
      <div className="bg-gradient-to-r from-[#3C0056] to-[#14021D] grid grid-cols-2 gap-8 p-8 sm:flex">
        {tournaments?.map((tournament:any, index:number) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/4 relative"
            style={{ padding: '0', margin: '0' }}
          >
            <Image
              src={tournament.fileUrl}
              alt={`Event Card ${index + 1}`}
              layout="responsive"
              width={100}
              height={100}
              objectFit="contain"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm text-white z-20">
                    <div className="flex justify-between gap-2 text-base">
                      <div>
                        <div className='text-xs font-bold'>ENTRY</div> {tournament.entryFee} INR
                      </div>
                      <div>
                        <div  className='text-xs font-bold'>MODE</div>{' '}
                        {toCapitalize(tournament.tournamentType)}
                      </div>
                      <div>
                        <div  className='text-xs font-bold'>PRIZE</div> {tournament.prize || 'TBD'} INR
                      </div>
                    </div>
                  </div>
          </div>
        ))}
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
            ></Image>
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
