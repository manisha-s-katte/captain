"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toCapitalize } from '@/lib/utils';
import Spinner from '@/components/Spinner/spinner';

import EventCard1 from '@/assets/Images/Event Card/048dcaf894496b7e214e4d9ac34831de.jpeg';
import EventCard2 from '@/assets/Images/Event Card/162cd1e7d132a7cd3d3faca93effdef4.jpeg';
import EventCard3 from '@/assets/Images/Event Card/6fc85454b8182288d6abdef5c0e65121.jpeg';
import EventCard4 from '@/assets/Images/Event Card/be8d1b473c9bc73dce8397acace05dd2.jpeg';
import { useQuery } from '@tanstack/react-query';
import { getTournaments} from '@/http/api';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const imageArray = [
  { src: EventCard1.src, alt: 'Image 1' },
  { src: EventCard2.src, alt: 'Image 2' },
  { src: EventCard3.src, alt: 'Image 3' },
  { src: EventCard4.src, alt: 'Image 4' },
];

const EventPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeLink, setActiveLink] = useState('ongoing');

  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => await getTournaments('ongoing'),
    refetchInterval: 60000,
  });

  const handleJoin = (tournamentId: string) => {
    if (!session?.user) {
      toast.error('Please login to join the tournament');
      router.push('/login');
    } else {
      router.push(`/events/${tournamentId}`);
    }
    return;
  };

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
            {tournaments?.length === 0 ? (
              <p className="text-white text-center mt-32">
                No live events & tournaments
              </p>
            ) : (
              <div className="flex flex-col lg:flex-row items-center justify-start p-4 bg-purple-950 pentagon">
                {/* Left Image */}
                <div className="lg:w-2/5 mt-8">
                  <Image
                    src={tournaments[0]?.fileUrl}
                    alt="Event Image"
                    style={{ objectFit: 'cover' }}
                    width={320}
                    height={320}
                    className="h-[20rem] w-[20rem] md:h-[30rem] md:w-[30rem] aspect-square"
                  />
                </div>
                {/* Right Content */}
                <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-0 text-left">
                  <h2 className="text-3xl md:text-5xl tracking-tight view_all font-semibold mb-4">
                    {tournaments[0]?.title}
                  </h2>
                  <p className="text-[#AA9DA9] text-xl mb-6">
                    {tournaments[0]?.description}
                  </p>
                  {/* Buttons */}
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-20 mt-12">
                    <button
                      onClick={() => handleJoin(tournaments[0]?.id)}
                      className="pentagon w-full md:w-auto view_all text-lg md:text-2xl bg-[#FCCC4C] text-black py-2 px-4 pr-6 hover:bg-yellow-500"
                    >
                      Join {tournaments[0]?.entryFee} INR
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
      {
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

          <div className="grid place-items-center grid-cols-1 gap-8 gap-y-8 mt-8 sm:grid-cols-2  lg:grid-cols-3 md:gap-x-4 lg:gap-y-20">
            {tournaments?.length === 0 ? (
              <p className="text-white text-start">
                No ongoing events & tournaments
              </p>
            ) : (
              tournaments?.map((tournament: any) => (
                <Link
                  href={`/events/${tournament.id}`}
                  key={tournament.id}
                  className="relative w-[374px] h-[384px] overflow-hidden group cursor-pointer m-4"
                >
                  <Image
                    src={tournament.fileUrl}
                    alt={tournament.title}
                    width={374}
                    height={384}
                    className="w-full h-full relative z-10 object-top aspect-square"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm text-white z-20">
                    <div className="flex justify-between gap-2 text-base">
                      <div>
                        <div>ENTRY</div> {tournament.entryFee} INR
                      </div>
                      <div>
                        <div>MODE</div>{' '}
                        {toCapitalize(tournament.tournamentType)}
                      </div>
                      <div>
                        <div>PRIZE</div> {tournament.prize || 'TBD'} INR
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      }
    </main>
  );
};

export default EventPage;
