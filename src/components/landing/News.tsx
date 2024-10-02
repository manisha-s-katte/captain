'use client';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import EventCard1 from '@/assets/Images/Event Card/048dcaf894496b7e214e4d9ac34831de.jpeg';
import EventCard2 from '@/assets/Images/Event Card/162cd1e7d132a7cd3d3faca93effdef4.jpeg';
import EventCard3 from '@/assets/Images/Event Card/6fc85454b8182288d6abdef5c0e65121.jpeg';
import EventCard4 from '@/assets/Images/Event Card/be8d1b473c9bc73dce8397acace05dd2.jpeg';
// import User from '@/assets/Resources/User.webp';
import Image from 'next/image';
import { User } from 'lucide-react';
import { FaUser } from 'react-icons/fa'; // Import user icon from react-icons

const EventCard = [EventCard1, EventCard2, EventCard3, EventCard4];

const News = () => {
  const [activeLink, setActiveLink] = useState('latest-events');

  const handleLinkClick = (link: React.SetStateAction<string>) => {
    setActiveLink(link);
  };

  return (
    <div className="bg-gradient-to-r from-[#14021D] to-[#3C0056] min-h-screen">
      <nav className="flex justify-between items-center px-8 py-16 text-white">
        <div className="flex  items-center">
          <span className="text-2xl font-semibold mx-16">News</span>
          <div className="flex view_all text-xl tracking-lighter pl-20 space-x-10 relative">
            <a
              href="#latest-events"
              onClick={() => handleLinkClick('latest-events')}
              className={`relative pb-2 ${
                activeLink === 'latest-events' ? 'text-white' : 'text-white'
              }`}
            >
              Latest Events
              {activeLink === 'latest-events' && (
                <div className="absolute inset-x-0 bottom-0 border-b-3 border-[#D600E1]"></div>
              )}
            </a>
            <a
              href="/events"
              onClick={() => handleLinkClick('events')}
              className={`relative pb-2 ${
                activeLink === 'events' ? 'text-white' : 'text-white'
              }`}
            >
              Events
              {activeLink === 'events' && (
                <div className="absolute inset-x-0 bottom-0 border-b-3 border-[#D600E1]"></div>
              )}
            </a>
            <a
              href="/gamePass"
              onClick={() => handleLinkClick('game-pass')}
              className={`relative pb-2 ${
                activeLink === 'game-pass' ? 'text-white' : 'text-white'
              }`}
            >
              Game Pass
              {activeLink === 'game-pass' && (
                <div className="absolute inset-x-0 bottom-0 border-b-3 border-[#D600E1]"></div>
              )}
            </a>
          </div>
        </div>
        <div className="flex border-b-3 pb-3 border-[#D600E1] items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 bg-transparent text-white outline-none"
          />
          <button className="text-white">
            <CiSearch className="w-6 h-6" />
          </button>
        </div>
      </nav>
      <main className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-10 ml-16">
          {EventCard.map((image, index) => (
            <div key={index} className="flex-1">
              <Image
                src={image}
                alt={`Event Card ${index + 1}`}
                layout="responsive"
                width={100}
                height={100}
                objectFit="contain"
              />
              <div className="bg-[#330B45] border-b-5 border-[#D600E1]  p-4 text-white">
                <div className="flex items-center mb-2">
                  <User className="w-6 h-6 mr-2 p-1  border border-white rounded-full" />
                  <span className="font-semibold">User Name</span>
                </div>
                <p className="text-sm font-light">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Nobis pariatur ad consectetur quia enim labore?
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex ml-20 mt-24 mb-[8em] justify-center">
          <button className="relative view_all text-white pl-5 pr-9 py-3 text-[1.2em] font-semibold overflow-hidden">
            <div className="pentagon bg-yellow-500 absolute inset-0"></div>
            <span className="relative text-black z-10">Load more</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default News;
