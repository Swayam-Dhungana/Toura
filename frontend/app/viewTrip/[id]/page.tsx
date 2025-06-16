"use client"

import { db } from '@/lib/firebaseClient';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';

const page = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState<any>(null);

    useEffect(() => {
        if (id) GetTripData();
    }, [id]);

    const GetTripData = async () => {
        const docRef = doc(db, 'AITrips', id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("✅ Document:", docSnap.data());
            setTrip(docSnap.data()); // ✅ this should include `hotels`, `location`, etc.
        } else {
            toast.error('❌ No trip found');
        }
    };

    return (
        <div>
            {/* Safe check so we don't render until trip is fetched */}
            {trip ? (
                <>
                    <InfoSection trip={trip} />
                    <Hotels trip={trip} />
                </>
            ) : (
                <div className="text-center py-10 text-gray-500">Loading trip...</div>
            )}
        </div>
    );
};

export default page;
