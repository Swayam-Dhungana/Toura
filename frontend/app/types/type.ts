// types.ts

export interface Trip {
  TripData: TripData;
}

export interface TripData {
  success: boolean;
  data: Data;
}

export interface Data {
  bestTimeToVisit: string;
  hotels: Hotel[];
  itinerary: Itinerary[];
  location: string;
}

export interface Hotel {
  name: string;
  address: string;
  pricePerNight: string;
  description: string;
  coordinates: Coordinate;
  rating: string;
  imageUrl: string
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Itinerary {
  day: number;
  plan: Plan[];
}

export interface Plan {
  placeName: string;
  details: string;
  imageUrl: string;
  bestTimeToVisit: string;
  coordinates: Coordinate;
  ticketPrice: string;
  timeToSpend: string;
  travelTimeFromLastLocation: string;
}

export interface Payload{
    TripData: TripData,
    userEmail:string,
    userSelection: userSelection,
}

export interface userSelection{
    destination: string,
    coordinates: null | Coordinate,
    days: number|null,
    budget: string,
    travelerType: string
}
