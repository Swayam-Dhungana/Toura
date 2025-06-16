"use client";

import Button from '@/components/ui/Button';
import React from 'react';

const InfoSection = ({ trip }: { trip: any }) => {
  const selection = trip?.userSelection;
  const destination = selection?.destination || "Unknown Location";

  return (
    <div className="mt-10 p-10 md:px-20 lg:px-44 xl:px-56 
      bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-black
      rounded-2xl shadow-lg text-white"
    >
      <img
        src="/placeholder.png"
        alt={destination}
        className="h-[300px] w-full rounded-xl object-cover mb-6"
      />
      <div className="flex justify-between items-center flex-wrap gap-6">
        <div className="flex flex-col gap-3 max-w-xl">
          <h2 className="font-extrabold text-3xl md:text-4xl leading-tight">
            <span className="bg-gradient-to-r from-[#f56551] via-[#fc9272] to-[#fcbf49] bg-clip-text text-transparent">
              {destination}
            </span>
          </h2>

          <div className="flex flex-wrap gap-4 text-gray-400">
            <span className="px-4 py-1 bg-[#2a2a2a] rounded-full text-sm md:text-md font-medium">
              🗓 {selection?.days ?? 'N/A'} Days
            </span>
            <span className="px-4 py-1 bg-[#2a2a2a] rounded-full text-sm md:text-md font-medium">
              🧳 {selection?.travelerType ?? 'N/A'}
            </span>
            <span className="px-4 py-1 bg-[#2a2a2a] rounded-full text-sm md:text-md font-medium">
              💰 {selection?.budget ?? 'N/A'}
            </span>
          </div>
        </div>
        <Button variant="secondary" className="whitespace-nowrap">
          Share
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
