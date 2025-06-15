"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import { AI_PROMPT, SelectBudgetOption, SelectTravelersList } from "../constants/options";
import { toast } from "sonner";
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom, duration: 0.6, ease: "easeOut" },
  }),
};

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Feature {
  id: string;
  place_name: string;
  center: [number, number];
}

interface TripPreferences {
  destination: string;
  coordinates: [number, number] | null;
  days: number | null;
  budget: string | null;
  travelerType: string | null;
}

const AnimatedSection = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      custom={delay}
    >
      {children}
    </motion.div>
  );
};

const Page = () => {
  const [results, setResults] = useState<Feature[]>([]);
  const [tripPreferences, setTripPreferences] = useState<TripPreferences>({
    destination: "",
    coordinates: null,
    days: null,
    budget: null,
    travelerType: null,
  });

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

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTripPreferences((prev) => ({ ...prev, destination: val }));
    if (val.length > 2) {
      fetchPlaces(val);
    } else {
      setResults([]);
    }
  };

  const handleSelectPlace = (place: Feature) => {
    setTripPreferences((prev) => ({
      ...prev,
      destination: place.place_name,
      coordinates: place.center,
    }));
    setResults([]);
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTripPreferences((prev) => ({
      ...prev,
      days: parseInt(e.target.value),
    }));
  };

  const handleBudgetSelect = (title: string) => {
    setTripPreferences((prev) => ({ ...prev, budget: title }));
  };

  const handleTravelerSelect = (title: string) => {
    setTripPreferences((prev) => ({ ...prev, travelerType: title }));
  };

const handleSubmit = async () => {
  if (
    !tripPreferences.budget ||
    !tripPreferences.days ||
    !tripPreferences.travelerType ||
    !tripPreferences.destination
  ) {
    toast.error("Please fill all the data");
    return;
  }

  console.log("Trip Preferences:", tripPreferences);

  try {
    toast.loading("Generating your trip plan...");

    const res = await fetch('http://localhost:3000/api/v1/generate-trip-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripPreferences),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const result = await res.json();

    toast.dismiss();
    toast.success("Trip plan generated!");
    console.log('AI Trip Plan:', result);

    // You can store the result in state here if you want to display it
    // setTripPlan(result);
  } catch (error) {
    toast.dismiss();
    toast.error("Failed to generate trip plan. Try again.");
    console.error(error);
  }
};



  return (
    <div className="min-h-screen px-5 sm:px-10 md:px-20 lg:px-36 xl:px-40 py-20 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-black text-white space-y-16">
      <AnimatedSection delay={0}>
        <h2 className="font-extrabold text-4xl md:text-5xl">
          Choose your <span className="text-[#f56551]">Preference</span>
        </h2>
        <p className="mt-4 text-lg text-gray-400">
          Let our AI choose the most optimal plan for you.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <label className="block text-xl mb-2 font-medium">Destination</label>
        <input
          type="text"
          value={tripPreferences.destination}
          onChange={handleDestinationChange}
          placeholder="Search for a city or place"
          className="w-full px-4 py-2 bg-black/40 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#f56551]"
        />
        {results.length > 0 && (
          <ul className="absolute z-50 mt-1 w-full bg-black border border-gray-700 rounded shadow-md max-h-60 overflow-auto">
            {results.map((place) => (
              <li
                key={place.id}
                onClick={() => handleSelectPlace(place)}
                className="cursor-pointer px-4 py-2 hover:bg-[#f56551] hover:text-white"
              >
                {place.place_name}
              </li>
            ))}
          </ul>
        )}
      </AnimatedSection>

      <AnimatedSection delay={0.2}>
        <h2 className="text-2xl font-semibold mb-3">Number of Days</h2>
        <Input
          placeholder="Ex. 3"
          type="number"
          onChange={handleDaysChange}
          className="max-w-xs bg-black/40 text-white border-gray-600"
        />
      </AnimatedSection>

      <AnimatedSection delay={0.3}>
        <h2 className="text-2xl font-semibold mb-5">What is your budget?</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {SelectBudgetOption.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleBudgetSelect(item.title)}
              className={`bg-black/40 p-5 border ${
                tripPreferences.budget === item.title
                  ? "border-[#f56551]"
                  : "border-gray-700"
              } hover:cursor-pointer rounded-lg shadow-sm hover:shadow-lg transition-all duration-200`}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.4}>
        <h2 className="text-2xl font-semibold mb-5">
          Who are you travelling with?
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {SelectTravelersList.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleTravelerSelect(item.title)}
              className={`bg-black/40 p-5 border ${
                tripPreferences.travelerType === item.title
                  ? "border-[#f56551]"
                  : "border-gray-700"
              } hover:cursor-pointer rounded-lg shadow-sm hover:shadow-lg transition-all duration-200`}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.5}>
        <div className="flex justify-end mt-10">
          <Button variant="secondary" onClick={handleSubmit}>
            Generate Trip
          </Button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Page;
