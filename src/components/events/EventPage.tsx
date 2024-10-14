'use client';
import React, { useState, useEffect, useMemo } from 'react';
// import { Image } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { toCapitalize } from '@/lib/utils';
import Spinner from '@/components/Spinner/spinner';
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import TournamentImg from '@/assets/Images/Events & Tournaments/ffc5d649262f1422064a2775a76cc2f6.jpeg';
import EventCard1 from '@/assets/Images/Event Card/048dcaf894496b7e214e4d9ac34831de.jpeg';
import EventCard2 from '@/assets/Images/Event Card/162cd1e7d132a7cd3d3faca93effdef4.jpeg';
import EventCard3 from '@/assets/Images/Event Card/6fc85454b8182288d6abdef5c0e65121.jpeg';
import EventCard4 from '@/assets/Images/Event Card/be8d1b473c9bc73dce8397acace05dd2.jpeg';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getTournaments, joinTournament } from '@/http/api';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { SingleElimination } from './SingleElimination';
// import { Spinner } from '@nextui-org/react';

const imageArray = [
  { src: EventCard1.src, alt: 'Image 1' },
  { src: EventCard2.src, alt: 'Image 2' },
  { src: EventCard3.src, alt: 'Image 3' },
  { src: EventCard4.src, alt: 'Image 4' },
];

const EventPage = () => {
  const router = useRouter();
  const session = useSession();
  console.log('session in event page', session);
  const [activeLink, setActiveLink] = useState('ongoing');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    teamName: '',
    heardFrom: '',
    tournamentId: '',
  });

  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => await getTournaments('ongoing'),
    refetchInterval: 60000,
  });

  const {
    mutate: joinTournamentMutate,
    isPending: isJoinTournamentMutatePending,
  } = useMutation({
    mutationKey: ['joinTournament'],
    mutationFn: async (data: any) => await joinTournament(data),
    onSuccess: (data: any) => {
      toast.success(data.message);
      setFormData({
        name: '',
        gender: '',
        age: '',
        teamName: '',
        heardFrom: '',
        tournamentId: '',
      });
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message);
      if (error.response.status === 401) {
        router.push('/login');
      }
    },
  });

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const handleJoinClick = () => {
    if (!session?.data) {
      toast.error('Please login to join the tournament');
      router.push('/login');
      return;
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent, tournamentId: string) => {
    e.preventDefault();
    console.log('Form submitted:', formData, tournamentId);
    joinTournamentMutate({ ...formData, tournamentId });
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
              <div className="flex flex-col lg:flex-row items-center justify-start">
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
                      onClick={handleJoinClick}
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

          <div className="grid grid-cols-1 gap-y-8 mt-8 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 lg:gap-y-20">
            {tournaments?.length === 0 ? (
              <p className="text-white text-start">
                No ongoing events & tournaments
              </p>
            ) : (
              tournaments?.map((tournament: any) => (
                <Link
                  href={`/events/${tournament.id}`}
                  key={tournament.id}
                  className="relative w-[374px] h-[384px] overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={tournament.fileUrl}
                    alt={tournament.title}
                    width={374}
                    height={384}
                    className="w-[374px] h-[384px] relative z-10 object-cover aspect-square"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm  text-white z-20">
                    <div className="flex justify-between gap-2 text-base">
                      <div>
                        <div>ENTRY</div> {tournament.entryFee} INR
                      </div>
                      <div>
                        <div>MODE</div>{' '}
                        {toCapitalize(tournament.tournamentType)}
                      </div>
                      <div>
                        <div>PRIZE</div> {tournament.prize || 200} INR
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>
      }

      {/* Add this dialog component */}
      <Transition appear show={isDialogOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleCloseDialog}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-tr from-[#60078C] to-[#1A0226] p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <DialogTitle
                      as="h3"
                      className="text-2xl font-medium leading-6 text-white"
                    >
                      Join Tournament
                    </DialogTitle>
                    <button
                      onClick={handleCloseDialog}
                      className="text-white hover:text-gray-300 focus:outline-none"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <form
                    onSubmit={(e) => {
                      handleSubmit(e, tournaments[0]?.id);
                    }}
                    className="mt-4 space-y-4"
                  >
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      className="w-full px-3 py-2 bg-[#350949] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                      required
                    />
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#350949] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                      required
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Age"
                      className="w-full px-3 py-2 bg-[#350949] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                      required
                    />
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      placeholder="Team Name"
                      className="w-full px-3 py-2 bg-[#350949] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                      required
                    />
                    <select
                      name="heardFrom"
                      value={formData.heardFrom}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-[#350949] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D600E1]"
                      required
                    >
                      <option value="" disabled>
                        How did you hear about Captain Side Gaming?
                      </option>
                      <option value="youtube">YouTube</option>
                      <option value="instagram">Instagram</option>
                      <option value="facebook">Facebook</option>
                      <option value="x">X</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="mt-6">
                      <button
                        type="submit"
                        disabled={isJoinTournamentMutatePending}
                        className="w-full px-4 py-2 bg-[#FCCC4C] text-black font-semibold rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-[#60078C]"
                      >
                        {isJoinTournamentMutatePending ? (
                          <div className="flex items-center justify-center gap-2">
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                            <span>Joining...</span>
                          </div>
                        ) : (
                          'Join'
                        )}
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
};

export default EventPage;
