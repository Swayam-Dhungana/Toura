"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Trip } from "@/app/types/type";
import Image from "next/image";

type Props = {
  trip: Trip
  ;
};

const Hotels: React.FC<Props> = ({ trip }) => {
const hotels = useMemo(() => trip?.TripData?.data.hotels || [], [trip]);

  const [hotelImages, setHotelImages] = useState<Record<string, string>>({});
  const UNSPLASH_ACCESS_KEY = "gc3UYZdSvKuE18BuyxdsjlzmwIY6UxFs_rtdJ3o_Gug";

useEffect(() => {
  const fetchedHotels = new Set(Object.keys(hotelImages));
  const hotelsToFetch = hotels.filter((hotel) => !fetchedHotels.has(hotel.name));
  if (hotelsToFetch.length === 0) return;

  hotelsToFetch.forEach(async (hotel) => {
    try {
      const query = encodeURIComponent(hotel.name);
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
      );
      const data = await response.json();
      const imageUrl =
        data.results?.[0]?.urls?.small || "/placeholder.webp";
      setHotelImages((prev) => ({ ...prev, [hotel.name]: imageUrl }));
    } catch {
      setHotelImages((prev) => ({ ...prev, [hotel.name]: "/placeholder.webp" }));
    }
  });
}, [hotels, hotelImages]);


  const openOpenStreetMap = (lat: number, lng: number) => {
    const zoom = 15;
    const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mt-10 p-10 md:px-20 lg:px-44 xl:px-56 text-white">
      <h2 className="mb-8 text-3xl font-extrabold">
        <span className="bg-gradient-to-r from-[#f56551] via-[#fc9272] to-[#fcbf49] bg-clip-text text-transparent">
          🏨 Hotel Recommendations
        </span>
      </h2>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {hotels.length > 0 ? (
          hotels.map((hotel, index) => (
            <div
              key={index}
              onClick={() =>
                openOpenStreetMap(hotel.coordinates.lat, hotel.coordinates.lng)
              }
              className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg hover:shadow-orange-500/30 transition-shadow duration-300 cursor-pointer"
            >
              <Image
                src={
                  hotelImages[hotel.name] ||
                  hotel.imageUrl ||
                  "/placeholder.webp"
                }
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-1">{hotel.name}</h3>
                <p className="text-sm text-gray-400 mb-1">{hotel.address}</p>
                <p className="text-sm text-gray-300 line-clamp-3">{hotel.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-yellow-400">⭐ {hotel.rating ?? "N/A"}</span>
                  <span className="text-sm font-semibold bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full">
                    {hotel.pricePerNight ?? "N/A"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400 font-normal">
            No hotel data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Hotels;
