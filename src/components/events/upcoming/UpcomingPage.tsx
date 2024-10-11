'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { CiSearch } from 'react-icons/ci';
import CustomDropdown from '../common/CustomDropdown'; // Adjust the import path as needed
import EventDetails from '../common/AppCard'; // Adjust the import path as needed
import { createClient } from '@/lib/supabase/client';
import Spinner from '@/components/Spinner/spinner';
import { useQuery } from '@tanstack/react-query';
import { getTournaments } from '@/http/api';

const UpcomingPage = () => {
  const [selectedSort, setSelectedSort] = useState('Short');

  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: async () => await getTournaments('upcoming'),
    refetchInterval: 60000,
  });

  return (
    <main>
      <section className="block mt-8 pb-8 mx-4 sm:mx-8 lg:mx-16">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          {/* Center the heading */}Upcoming Events & Tournaments
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
          {/* Left: Sort Options */}
          <div className="flex items-center space-x-4">
            <CustomDropdown
              options={['Short', 'Long']}
              selected={selectedSort}
              onSelect={(option) => setSelectedSort(option)}
            />
          </div>

          {/* Right: Search Bar */}
          <div className="flex border-b-2 sm:border-b-3 pb-2 sm:pb-3 border-[#D600E1] items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 bg-transparent text-white outline-none text-sm sm:text-base"
            />
            <button className="text-white">
              <CiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="space-y-8">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {tournaments.length === 0 ? (
                <p className="text-white text-center mt-32">
                  No upcoming tournaments
                </p>
              ) : (
                tournaments?.map((tournament: any) => (
                  <EventDetails key={tournament.id} tournament={tournament} />
                ))
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default UpcomingPage;
