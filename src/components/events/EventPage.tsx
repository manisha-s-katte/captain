'use client';
import React, { useState, useEffect, useMemo } from 'react';
// import { Image } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { toCapitalize } from '@/lib/utils';
import Spinner from '@/components/Spinner/spinner';

import TournamentImg from '@/assets/Images/Events & Tournaments/ffc5d649262f1422064a2775a76cc2f6.jpeg';
import EventCard1 from '@/assets/Images/Event Card/048dcaf894496b7e214e4d9ac34831de.jpeg';
import EventCard2 from '@/assets/Images/Event Card/162cd1e7d132a7cd3d3faca93effdef4.jpeg';
import EventCard3 from '@/assets/Images/Event Card/6fc85454b8182288d6abdef5c0e65121.jpeg';
import EventCard4 from '@/assets/Images/Event Card/be8d1b473c9bc73dce8397acace05dd2.jpeg';
// import { Spinner } from '@nextui-org/react';

const imageArray = [
  { src: EventCard1.src, alt: 'Image 1' },
  { src: EventCard2.src, alt: 'Image 2' },
  { src: EventCard3.src, alt: 'Image 3' },
  { src: EventCard4.src, alt: 'Image 4' },
];

const EventPage = () => {
  const [activeLink, setActiveLink] = useState('ongoing');
  const [tournaments, setTournaments] = useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [filteredTournaments, setFilteredTournaments] = useState<
  //   Record<string, any>[]
  // >([]);

  useEffect(() => {
    const fetchTournaments = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('Tournament')
        .select('*')
        .eq('status', 'active')
        .order('startDate', { ascending: false }); // Order by start date, most recent first

      if (error) {
        console.error('Error fetching tournaments:', error);
      } else {
        setTournaments(data || []);
      }
      setIsLoading(false);
    };

    fetchTournaments();
  }, []);

  // useEffect(() => {
  //   const today = new Date();
  //   const filterTournaments = () => {
  //     return tournaments.filter((tournament) => {
  //       const startDate = new Date(tournament.startDate);
  //       const endDate = new Date(tournament.endDate);
  //       return startDate <= today && today <= endDate;
  //     });
  //   };

  //   setFilteredTournaments(filterTournaments());
  // }, [tournaments]);
  const filteredTournaments = useMemo(() => {
    const today = new Date();
    return tournaments.filter((tournament) => {
      const startDate = new Date(tournament.startDate);
      const endDate = new Date(tournament.endDate);
      return startDate <= today && today <= endDate;
    });
  }, [tournaments]);

  console.log('filteredTournaments', filteredTournaments);
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <main>
      <section className="block mt-8 mx-4 lg:mx-16">
        <h1 className="text-3xl font-semibold"> Events & Tournaments</h1>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {filteredTournaments?.length === 0 ? (
              <p className="text-white text-center mt-32">
                No events & tournaments
              </p>
            ) : (
              <div className="flex flex-col lg:flex-row items-center justify-start">
                {/* Left Image */}
                <div className="lg:w-2/5 mt-8">
                  <Image
                    src={filteredTournaments[0]?.fileUrl}
                    alt="Event Image"
                    style={{ objectFit: 'cover' }}
                    width={320}
                    height={320}
                    className="h-[20rem] w-[20rem] md:h-[30rem] md:w-[30rem]"
                  />
                </div>
                {/* Right Content */}
                <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0 text-left">
                  <h2 className="text-3xl md:text-5xl tracking-tight view_all font-semibold mb-4">
                    {filteredTournaments[0]?.title}
                  </h2>
                  <p className="text-[#AA9DA9] text-xl mb-6">
                    {filteredTournaments[0]?.description}
                  </p>
                  {/* Buttons */}
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-20 mt-12">
                    <button className="pentagon w-full md:w-auto view_all text-lg md:text-2xl bg-[#FCCC4C] text-black py-2 px-4 pr-6 hover:bg-yellow-500">
                      Join {filteredTournaments[0]?.entryFee} INR
                    </button>
                    <button className=" w-full md:w-auto view_all text-lg md:text-2xl text-white py-2 px-4 pr-6 border-2 border-[#D600E1]">
                      Get a Game Pass & Join All Events
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* New Section */}
      {filteredTournaments?.length > 0 && (
        <section className="mt-16 pb-16 mx-4 lg:mx-16">
          <div className="flex view_all text-xl tracking-lighter space-x-6 relative">
            <Link
              href="/events"
              onClick={() => handleLinkClick('ongoing')}
              className={`relative pb-2 cursor-pointer ${
                activeLink === 'ongoing' ? 'text-white' : 'text-white'
              }`}
            >
              Ongoing
              {activeLink === 'ongoing' && (
                <div className="absolute inset-x-0 bottom-0 border-b-3 border-[#D600E1]"></div>
              )}
            </Link>
            <Link
              href="/events/upcoming"
              onClick={() => handleLinkClick('upcoming')}
              className={`relative pb-2 ${
                activeLink === 'upcoming' ? 'text-white' : 'text-white'
              }`}
            >
              Upcoming
              {activeLink === 'upcoming' && (
                <div className="absolute inset-x-0 bottom-0 border-b-3 border-[#D600E1]"></div>
              )}
            </Link>
            <Link
              href="/events/previous"
              onClick={() => handleLinkClick('previous')}
              className={`relative pb-2 ${
                activeLink === 'previous' ? 'text-white' : 'text-white'
              }`}
            >
              Previous
              {activeLink === 'previous' && (
                <div className="absolute inset-x-0 bottom-0 border-b-3 border-[#D600E1]"></div>
              )}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-y-8 mt-8 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 lg:gap-y-20">
            {filteredTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="relative w-[374px] h-[384px] overflow-hidden group"
              >
                <Image
                  src={tournament.fileUrl}
                  alt={tournament.title}
                  width={374}
                  height={384}
                  className="w-[374px] h-[384px] relative z-10 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm  text-white z-20">
                  <div className="flex justify-between gap-2 text-base">
                    <div>
                      <div>ENTRY</div> {tournament.entryFee} INR
                    </div>
                    <div>
                      <div>MODE</div> {toCapitalize(tournament.tournamentType)}
                    </div>
                    <div>
                      <div>PRIZE</div> {tournament.prize || 200} INR
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default EventPage;
