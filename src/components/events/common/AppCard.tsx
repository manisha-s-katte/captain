'use client';
import React from 'react';
// import Image from 'next/image';
import Image from 'next/image';
import { Card, CardBody } from '@nextui-org/react';
import { format } from 'date-fns';
import TournamentImg from '@/assets/Images/Events & Tournaments/ffc5d649262f1422064a2775a76cc2f6.jpeg';

const EventDetails: React.FC<{ tournament: any }> = ({ tournament }) => {
  return (
    <Card
      className="border-b-4 mt-10 z-0 border-[#D700E1] bg-[#330B45]  max-w-full"
      shadow="sm"
    >
      <CardBody>
        <div className="flex flex-col m-2 md:flex-row items-start">
          {/* Image Section */}
          <div className="mr-10">
            <Image
              alt={tournament?.title}
              className="object-cover w-60 h-60"
              height={240}
              src={tournament.fileUrl}
              width={240}
            />
          </div>

          {/* Event Details Section */}
          <div className="flex flex-col items-start text-center md:text-left gap-4">
            <h1 className="text-4xl view_all font-bold tracking-tight text-white">
              {tournament.name}
            </h1>

            <div className="text-white">
              <p className="text-sm font-extralight text-gray-300">Date</p>
              <p className="text-xl font-semibold">
                {format(new Date(tournament.startDate), 'd MMM')} -{' '}
                {format(new Date(tournament.endDate), 'd MMM')}
              </p>
            </div>

            <div className="text-white">
              <p className="text-sm font-extralight text-gray-300">Prizepool</p>
              <p className="text-xl font-semibold">
                {tournament?.prizePool || 'TBD'}
              </p>
            </div>

            <div className="text-white">
              <p className="text-sm font-extralight text-gray-300">
                Participated Teams
              </p>
              <p className="text-xl font-semibold">
                {tournament?.maxNofTeams || 'TBD'}
              </p>
            </div>

            {/* Team Name Details Section */}
          </div>
          <div className="ml-44">
            <h2 className="text-sm font-extralight text-gray-30">Winner</h2>
            <p className="text-xl font-semibold uppercase">
              {tournament?.winner || 'TBD'}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EventDetails;
