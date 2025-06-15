"use client";
import React, { useState } from "react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Feature {
  id: string;
  place_name: string;
  center: [number, number];
}

const Page = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Feature[]>([]);

  const fetchPlaces = async (value: string) => {
    if (!value) {
      setResults([]);
      return;
    }
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        value
      )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&types=place&limit=5&country=in`
    );
    const data = await res.json();
    setResults(data.features);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 2) {
      fetchPlaces(val);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (place: Feature) => {
    setQuery(place.place_name);
    setResults([]);
    console.log("Selected place:", place.place_name);
    console.log("Coordinates:", place.center); // [lng, lat]
    // Add your logic here for selected place
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-20 max-w-md mx-auto">
      <h2 className="font-bold text-3xl">Choose your Preference</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Let our AI choose the most optimal plan for you
      </p>

      <div className="mt-10 relative">
        <label className="block text-xl mb-2 font-medium">
          Enter your destination:
        </label>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a city or place"
          className="w-full px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-[#f56551]"
        />

        {/* Suggestions dropdown */}
        {results.length > 0 && (
          <ul className="absolute z-50 bg-white border border-gray-300 rounded shadow-md w-full max-h-60 overflow-auto mt-1">
            {results.map((place) => (
              <li
                key={place.id}
                onClick={() => handleSelect(place)}
                className="cursor-pointer px-4 py-2 hover:bg-[#f56551] hover:text-white"
              >
                {place.place_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;
