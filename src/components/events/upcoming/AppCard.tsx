"use client";
import React from "react";
import Image from "next/image";
import { Card, CardBody } from "@nextui-org/react";
import TournamentImg from '@/assets/Images/Events & Tournaments/ffc5d649262f1422064a2775a76cc2f6.jpeg';

const EventDetails: React.FC = () => {

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
              alt="Event cover"
              className="object-cover w-60 h-60"
              height={200}
              src={TournamentImg.src} // replace with actual event image URL
              width={200}
            />
          </div>

          {/* Event Details Section */}
          <div className="flex flex-col items-start text-center md:text-left gap-4">
            <h1 className="text-4xl view_all font-bold tracking-tight text-white">Weekly Wars</h1>

            <div className="text-white">
              <p className="text-sm font-extralight text-gray-300">Date</p>
              <p className="text-xl font-semibold">24-28th May</p>
            </div>

            <div className="text-white">
              <p className="text-sm font-extralight text-gray-300">Prizepool</p>
              <p className="text-xl font-semibold">12,500 VP</p>
            </div>

            <div className="text-white">
              <p className="text-sm font-extralight text-gray-300">Participated Teams</p>
              <p className="text-xl font-semibold">23</p>
            </div>

            {/* Team Name Details Section */}
            
            </div>
            <div className="ml-44">
              <h2 className="text-sm font-extralight text-gray-30">Winner</h2>
              <p className="text-xl font-semibold uppercase">Team Name</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EventDetails;
