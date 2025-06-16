import React from 'react';

const Hotels = ({ trip }: { trip: any }) => {
  const hotels = trip?.TripData?.data.hotels || [];

  const openOpenStreetMap = (lat: number, lng: number) => {
    const zoom = 15;
    const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="font-bold text-xl mt-10 p-10 md:px-20 lg:px-44 xl:px-56">
      <h2 className="mb-6 text-2xl">🏨 Hotel Recommendations</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {hotels.length > 0 ? (
          hotels.map((hotel: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => openOpenStreetMap(hotel.coordinates.lat, hotel.coordinates.lng)}
            >
              <img
                src={hotel.imageUrl || '/placeholder.webp'}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-gray-800">
                <h3 className="text-lg font-semibold mb-1">{hotel.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{hotel.address}</p>
                <p className="text-sm mb-1">{hotel.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm font-medium">⭐ {hotel.rating}</p>
                  <p className="text-sm font-semibold text-green-600">
                    {hotel.pricePerNight}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 font-normal">No hotel data available.</p>
        )}
      </div>
    </div>
  );
};

export default Hotels;
