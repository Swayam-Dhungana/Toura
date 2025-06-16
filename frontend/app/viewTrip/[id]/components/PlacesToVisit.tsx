"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

type Coordinates = {
  lat: number;
  lng: number;
};

type Place = {
  placeName: string;
  ticketPrice?: string;
  timeToSpend?: string;
  imageUrl?: string;
  details?: string;
  coordinates?: Coordinates;
  travelTimeFromLastLocation?: string;
  bestTimeToVisit?: string;
};

type ItineraryItem = {
  day: number;
  plan: Place[];
};

type TripData = {
  data: {
    itinerary: ItineraryItem[];
  };
};

type Props = {
  trip: {
    TripData: TripData;
  };
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  }),
};

const PlacesToVisit: React.FC<Props> = ({ trip }) => {
  const itinerary = trip?.TripData?.data?.itinerary || [];

  const [placeImages, setPlaceImages] = useState<Record<string, string>>({});

  const UNSPLASH_ACCESS_KEY = "gc3UYZdSvKuE18BuyxdsjlzmwIY6UxFs_rtdJ3o_Gug";

  useEffect(() => {
    const allPlaces = itinerary.flatMap((dayItem) => dayItem.plan);
    const placesToFetch = allPlaces.filter(
      (place) => !placeImages[place.placeName]
    );

    if (placesToFetch.length === 0) return;

    placesToFetch.forEach(async (place) => {
      try {
        const query = encodeURIComponent(place.placeName + " travel");
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const imageUrl = data.results[0].urls.small;
          setPlaceImages((prev) => ({ ...prev, [place.placeName]: imageUrl }));
        } else {
          setPlaceImages((prev) => ({ ...prev, [place.placeName]: "/placeholder.webp" }));
        }
      } catch (error) {
        setPlaceImages((prev) => ({ ...prev, [place.placeName]: "/placeholder.webp" }));
      }
    });
  }, [itinerary]);

  const openOpenStreetMap = (lat: number, lng: number) => {
    const zoom = 15;
    const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      className="min-h-screen px-6 md:px-20 lg:px-44 xl:px-56 py-10 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-black text-white font-sans"
    >
      <h2 className="mb-10 text-3xl font-extrabold text-center bg-gradient-to-r from-[#f56551] via-[#fc9272] to-[#fcbf49] bg-clip-text text-transparent">
        📍 Places to Visit
      </h2>

      {itinerary.length === 0 && (
        <p className="text-center text-gray-400 text-sm font-normal">No places found.</p>
      )}

      {itinerary.map((dayItem, dayIndex) => (
        <div key={dayIndex} className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2">
            Day {dayItem.day}
          </h3>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {dayItem.plan.map((place, placeIndex) => (
              <motion.div
                key={placeIndex}
                className="bg-[#121212] rounded-xl overflow-hidden shadow-lg hover:shadow-[0_8px_20px_rgba(252,146,114,0.6)] transition-shadow duration-300 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
                custom={placeIndex * 0.1}
              >
                <img
                  src={placeImages[place.placeName] || place.imageUrl || "/placeholder.webp"}
                  alt={place.placeName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 text-gray-200">
                  <h4 className="text-xl font-semibold mb-2">{place.placeName}</h4>
                  {place.details && (
                    <p className="text-sm text-gray-400 mb-2">{place.details}</p>
                  )}
                  <p className="text-sm mb-1">🕒 {place.timeToSpend ?? "N/A"}</p>
                  <p className="text-sm mb-1">🧭 Best Time: {place.bestTimeToVisit ?? "N/A"}</p>
                  <p className="text-sm mb-1">🎟️ Ticket: {place.ticketPrice ?? "Free"}</p>
                  <p className="text-sm mb-2">
                    🚗 Travel Time: {place.travelTimeFromLastLocation ?? "N/A"}
                  </p>
                  {place.coordinates && (
                    <button
                      onClick={() =>
                        openOpenStreetMap(place.coordinates!.lat, place.coordinates!.lng)
                      }
                      className="text-[#f56551] text-sm font-semibold hover:underline"
                    >
                      📍 View on Map
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default PlacesToVisit;
