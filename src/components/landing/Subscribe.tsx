'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSocialMediaPosts } from '@/http/api';
import { InstagramEmbed } from 'react-social-media-embed';
import { XEmbed } from 'react-social-media-embed';

const Subscribe = () => {
  const { data: socialMediaPosts } = useQuery({
    queryKey: ['getSocialMediaPosts'],
    queryFn: () => getSocialMediaPosts(),
  });
  return (
    <div className="bg-gradient-to-b from-[#14021D] to-[#60078C]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
        {socialMediaPosts
          ?.filter((post: any) => post.platform === 'Instagram')
          .map((post: any, index: number) => (
            <div
              key={index}
              className="w-full"
              style={{ padding: '0', margin: '0' }}
            >
              <InstagramEmbed url={post.url} />
            </div>
          ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
        {socialMediaPosts
          ?.filter((post: any) => post.platform === 'Twitter')
          .map((post: any, index: number) => (
            <div
              key={index}
              className="w-full"
              style={{ padding: '0', margin: '0' }}
            >
              <XEmbed url={post.url} />
            </div>
          ))}
      </div>
      <div className=" pt-[100px] pb-[100px] flex flex-col items-center">
        <h1 className="text-white view_all text-4xl sm:text-5xl md:text-6xl font-semibold mb-16 text-center tracking-tighter">
          Subscribe for More Updates
        </h1>
        <form className="flex flex-col sm:flex-row items-center sm:gap-6">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email Address"
            className="p-2 mb-2 bg-transparent outline-none border-b-3 border-[#D600E1] w-full sm:w-auto flex-grow"
            required
          />
          <div className="flex items-center">
            <button className="relative view_all text-white pl-6 pr-12 py-2 text-base sm:text-[1.2em] font-semibold overflow-hidden">
              <div className="pentagon bg-[#D600E1] absolute inset-0"></div>
              <span className="relative text-black z-10">Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Subscribe;
