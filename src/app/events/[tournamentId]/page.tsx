import TournamentDetailsPage from '@/components/events/TournamentDetailsPage';
import Navbar from '@/components/landing/Navbar';
import React from 'react';

const page = ({ params }: { params: { tournamentId: string } }) => {
  const { tournamentId } = params;
  return (
    <main className="flex flex-col bg-gradient-to-tr from-[#60078C] to-[#1A0226] min-h-screen">
      <Navbar bgColor="transparent" />
      <TournamentDetailsPage tournamentId={tournamentId} />
    </main>
  );
};

export default page;
