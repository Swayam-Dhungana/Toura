import Button from '@/components/ui/Button';
import React from 'react';

const InfoSection = ({ trip }: { trip: any }) => {
  const selection = trip?.userSelection;
  const destination = selection?.destination || "Unknown Location";

  return (
    <div className="mt-10 p-10 md:px-20 lg:px-44 xl:px-56">
      <img
        src="/placeholder.webp"
        className="h-[300px] w-full rounded-xl object-cover"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{destination}</h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🗓 {selection?.days} Days
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🧳 {selection?.travelerType}
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {selection?.budget}
            </h2>
          </div>
        </div>
        <Button>
          {/* 🚀 Add share/send icon here */}
          Share
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
