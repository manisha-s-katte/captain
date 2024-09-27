'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { CiSearch } from 'react-icons/ci';
import CustomDropdown from './CustomDropdown'; // Adjust the import path as needed
import EventDetails from './AppCard'; // Adjust the import path as needed
import { createClient } from '@/lib/supabase/client';
import Spinner from '@/components/Spinner/spinner';

const UpcomingPage = () => {
  const [selectedSort, setSelectedSort] = useState('Short');
  const [tournaments, setTournaments] = useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('Tournament')
        .select('*')
        .eq('status', 'active')
        .order('startDate', { ascending: true });

      if (error) {
        console.error('Error fetching tournaments:', error);
      } else {
        setTournaments(data || []);
      }
      setIsLoading(false);
    };

    fetchTournaments();
  }, []);

  const filteredTournaments = useMemo(() => {
    const today = new Date();
    return tournaments.filter((tournament) => {
      const startDate = new Date(tournament.startDate);
      return startDate > today;
    });
  }, [tournaments]);

  console.log('filteredTournaments', filteredTournaments);

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
              {filteredTournaments.length === 0 ? (
                <p className="text-white text-center">
                  No upcoming tournaments
                </p>
              ) : (
                filteredTournaments.map((tournament) => (
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
