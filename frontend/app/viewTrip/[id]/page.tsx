"use client";

import { db } from "@/lib/firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";
import { Payload } from "@/app/types/type";
const ViewTripPage = () => {


  const { id } = useParams();
  const [trip, setTrip] = useState<Payload | null>(null);

useEffect(() => {
  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AITrips", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTrip(docSnap.data() as Payload);
      } else {
        toast.error("No trip found");
      }
    } catch {
      toast.error("Failed to load trip data");
    }
  };

  if (id) {
    GetTripData();
  }
}, [id]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#111111] text-white">
      {trip ? (
        <div className="pb-20">
          <InfoSection trip={trip} />
          <Hotels trip={trip} />
          <PlacesToVisit trip={trip} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-pulse text-orange-500 text-xl font-semibold">
              Loading trip...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTripPage;
