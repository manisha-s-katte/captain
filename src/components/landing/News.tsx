'use client';
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
// import User from '@/assets/Resources/User.webp';
import Image from 'next/image';
import { User } from 'lucide-react';
import { FaUser } from 'react-icons/fa'; // Import user icon from react-icons
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getSocialMediaPosts } from '@/http/api';
import { InstagramEmbed } from 'react-social-media-embed';
import { XEmbed } from 'react-social-media-embed';



const News = () => {
  const [activeLink, setActiveLink] = useState('latest-events');

  const handleClick = (e:Event) =>{
    console.log(e.target)
  }

  const handleLinkClick = (link: React.SetStateAction<string>) => {
    setActiveLink(link);
  };

  const { data: socialMediaPosts } = useQuery({
    queryKey: ['getSocialMediaPosts'],
    queryFn: () => getSocialMediaPosts(),
    staleTime: 0, // Data is considered stale immediately
  });

  return (
    <div className="bg-gradient-to-r from-[#14021D] to-[#3C0056] min-h-screen">
      <nav className="flex justify-between items-center px-8 py-8 text-white">
        <div className="flex  items-center">
          <span className="text-2xl font-semibold mx-16">News</span>
          <div className="flex view_all text-xl tracking-lighter pl-20 space-x-10 relative">
            <Link
              href="/events"
              onClick={() => handleLinkClick('latest-events')}
              className={`relative pb-2 ${
                activeLink === 'latest-events' ? 'text-white' : 'text-white'
              }`}
            >
              Latest Events
              {activeLink === 'latest-events' && (
                <div className="absolute inset-x-0 bottom-0 border-b-3 border-[#D600E1]"></div>
              )}
            </Link>
            <Link
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
            </Link>
            <Link
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
            </Link>
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
      <main className="sm:p-8 p-2">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:p-8 p-0">
        {socialMediaPosts
          ?.filter((post: any) => post.platform === 'Instagram')
          .map((post: any, index: number) => (
            <div
              key={index}
              className="w-full clip-post h-20 mb-2"
              style={{ padding: '0', margin: '0' }}

            >
              <InstagramEmbed url={post.url} width={"100%"} />
            </div>
          ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-8 p-8">
        {socialMediaPosts
          ?.filter((post: any) => post.platform === 'Twitter')
          .map((post: any) => (
            <div
              key={post.id}
              className="w-full"
              style={{ padding: '0', margin: '0' }}
            >
              <XEmbed url={post.url} />
            </div>
          ))}
      </div>
        {/* <div className="flex mt-12 mb-[8em] justify-center">
          <button className="relative view_all text-white pl-5 pr-9 py-3 text-[1.2em] font-semibold overflow-hidden">
            <div className="pentagon bg-yellow-500 absolute inset-0"></div>
            <span className="relative text-black z-10">Load more</span>
          </button>
        </div> */}
      </main>
    </div>
  );
};

export default News;
