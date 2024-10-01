import React from 'react';
import Image from 'next/image';
import EventCard1 from '@/assets/Images/Event Card/048dcaf894496b7e214e4d9ac34831de.jpeg';
import EventCard2 from '@/assets/Images/Event Card/162cd1e7d132a7cd3d3faca93effdef4.jpeg';
import EventCard3 from '@/assets/Images/Event Card/6fc85454b8182288d6abdef5c0e65121.jpeg';
import EventCard4 from '@/assets/Images/Event Card/be8d1b473c9bc73dce8397acace05dd2.jpeg';
import GamePass from '@/assets/Resources/GamePass.webp';
import Link from 'next/link';

const EventCard = [EventCard1, EventCard2, EventCard3, EventCard4];

const PopularEvents = () => {
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
      <div className="flex flex-wrap">
        {EventCard.map((image, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 md:w-1/4"
            style={{ padding: '0', margin: '0' }}
          >
            <Image
              src={image}
              alt={`Event Card ${index + 1}`}
              layout="responsive"
              width={100}
              height={100}
              objectFit="contain"
            />
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
              <span className="relative text-black z-10">Explore more</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularEvents;
