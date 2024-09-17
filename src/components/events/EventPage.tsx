"use client";
import React, { useState } from 'react';
import { Image } from '@nextui-org/react';

import TournamentImg from '@/assets/Images/Events & Tournaments/ffc5d649262f1422064a2775a76cc2f6.jpeg';
import EventCard1 from "@/assets/Images/Event Card/048dcaf894496b7e214e4d9ac34831de.jpeg";
import EventCard2 from "@/assets/Images/Event Card/162cd1e7d132a7cd3d3faca93effdef4.jpeg";
import EventCard3 from "@/assets/Images/Event Card/6fc85454b8182288d6abdef5c0e65121.jpeg";
import EventCard4 from "@/assets/Images/Event Card/be8d1b473c9bc73dce8397acace05dd2.jpeg";

const imageArray = [
  { src: EventCard1.src, alt: 'Image 1' },
  { src: EventCard2.src, alt: 'Image 2' },
  { src: EventCard3.src, alt: 'Image 3' },
  { src: EventCard4.src, alt: 'Image 4' },
];

const EventPage = () => {
  const [activeLink, setActiveLink] = useState('ongoing');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <main className="min-h-screen">
      <section className="block mt-8 mx-4 lg:mx-16">
        <h1 className="text-3xl font-semibold">Events & Tournament</h1>

        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Image */}
          <div className="lg:w-2/5 mt-8">
            <Image
              src={TournamentImg.src}
              alt="Event Image"
              style={{ objectFit: 'cover' }}
              className="h-[20rem] w-[20rem] md:h-[30rem] md:w-[30rem]"
            />
          </div>
          {/* Right Content */}
          <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0 text-left">
            <h2 className="text-3xl md:text-5xl tracking-tight view_all font-semibold mb-4">Weekly Wars</h2>
            <p className="text-[#AA9DA9] text-xl mb-6">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
              laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
              in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at
              vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis
              dolore te.
            </p>
            {/* Buttons */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-20 mt-12">
              <button className="pentagon w-full md:w-auto view_all text-lg md:text-2xl bg-[#FCCC4C] text-black py-2 px-4 pr-6 hover:bg-yellow-500">
                Join 200 INR
              </button>
              <button className=" w-full md:w-auto view_all text-lg md:text-2xl text-white py-2 px-4 pr-6 border-2 border-[#D600E1]">
                Get a Game Pass & Join All Events
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* New Section */}
      <section className="mt-16 pb-16 mx-4 lg:mx-16">
        <div className="flex view_all text-xl tracking-lighter space-x-6 relative">
          <a 
            href="" 
            onClick={() => handleLinkClick('ongoing')}
            className={`relative pb-2 ${activeLink === 'ongoing' ? 'text-white' : 'text-white'}`}
          >
            Ongoing
            {activeLink === 'ongoing' && (
              <div className="absolute inset-x-0 bottom-0 border-b-3 border-[#D600E1]"></div>
            )}
          </a>
          <a 
            href="/events/upcoming" 
            onClick={() => handleLinkClick('upcoming')}
            className={`relative pb-2 ${activeLink === 'upcoming' ? 'text-white' : 'text-white'}`}
          >
            Upcoming
            {activeLink === 'upcoming' && (
              <div className="absolute inset-x-0 bottom-0 border-b-3 border-[#D600E1]"></div>
            )}
          </a>
          <a 
            href="/events/previous" 
            onClick={() => handleLinkClick('previous')}
            className={`relative pb-2 ${activeLink === 'previous' ? 'text-white' : 'text-white'}`}
          >
            Previous
            {activeLink === 'previous' && (
              <div className="absolute inset-x-0 bottom-0 border-b-3 border-[#D600E1]"></div>
            )}
          </a>
        </div>

        <div className="grid grid-cols-1 gap-y-8 mt-8 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 lg:gap-y-20">
          {imageArray.map((image, index) => (
            <div key={index} className="flex justify-center">
              <Image
                src={image.src}
                alt={image.alt}
                style={{ objectFit: 'cover' }}
                className="w-[15rem] h-[15rem] md:w-96 md:h-96"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default EventPage;
