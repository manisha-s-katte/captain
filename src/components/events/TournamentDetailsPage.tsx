'use client';

import { getTournamentDetails } from '@/http/api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../Spinner/spinner';
import { format } from 'date-fns';
import {
  FaCalendarAlt,
  FaUsers,
  FaUserFriends,
  FaMoneyBillWave,

  FaFlag,
  FaTrophy,
} from 'react-icons/fa';
import { useState } from 'react';
import TeamTable from './TeamTable';
import { toCapitalize } from '@/lib/utils';

export default function TournamentDetailsPage({
  tournamentId,
}: {
  tournamentId: string;
}) {
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const { data: tournamentsData, isLoading } = useQuery({
    queryKey: ['getTournamentDetails'],
    queryFn: async () => getTournamentDetails(tournamentId),
  });

  return (
    <main>
      <div className="mt-8 mx-4 lg:mx-16">
        <h1 className="text-3xl font-semibold mb-6">Tournament Details</h1>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="bg-[#2A0A3A] bg-opacity-50 backdrop-blur-sm rounded-lg shadow-lg p-6 border border-[#60078C] mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <h2 className="text-xl md:text-2xl tracking-tight view_all font-semibold mb-2">
                    {tournamentsData?.title}
                  </h2>
                  <p className="text-[#AA9DA9] text-base mb-">
                    {tournamentsData?.description}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-green-500 mr-3 text-xl" />
                  <p className="text-white">
                    Entry Fee: {tournamentsData.entryFee} INR
                  </p>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="text-red-500 mr-3 text-xl" />
                  <p className="text-white">
                    Date: {format(new Date(tournamentsData.startDate), 'd MMM')}{' '}
                    - {format(new Date(tournamentsData.endDate), 'd MMM')}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaUsers className="text-yellow-500 mr-3 text-xl" />
                  <p className="text-white">
                    Max Teams: {tournamentsData.maxNofTeams}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaUserFriends className="text-yellow-500 mr-3 text-xl" />
                  <p className="text-white">
                    Players per Team: {tournamentsData.maxNofPlayersPerTeam}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaMoneyBillWave className="text-green-500 mr-3 text-xl" />
                  <p className="text-white">
                    Prize Pool: {tournamentsData?.prize || 'TBD'}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaFlag className="text-blue-500 mr-3 text-xl" />
                  <p className="text-white">
                    Game Pass: {tournamentsData?.gamePass?.title}
                  </p>
                </div>
                <div className="flex items-center">
                  <FaTrophy className="text-yellow-600 mr-3 text-xl" />
                  <p className="text-white">
                    Mode: {toCapitalize(tournamentsData?.tournamentType)}
                  </p>
                </div>
              </div>
            </div>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">
                  Participating Teams
                </h2>
                <button
                  onClick={() => setIsCreateTeamModalOpen(true)}
                  className="bg-[#D600E1] text-white px-4 py-2 rounded-lg hover:bg-[#A800B3]"
                >
                  Create Team
                </button>
              </div>
              <TeamTable teamsData={tournamentsData?.registrations} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
