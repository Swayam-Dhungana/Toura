import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI!);

interface TripPreferences {
  destination: string |null;
  coordinates: [number, number] | null;
  days: number |null;
  budget: string |null;
  travelerType: string|null;
}

const generateTripPlan = async (tripPreferences: TripPreferences) => {
  const { destination, coordinates, days, budget, travelerType } = tripPreferences;

const prompt = `
You are a smart AI travel planner. Generate a travel itinerary in **valid JSON format** (no explanations, just JSON).

### Trip Preferences:
- Destination: ${destination}
- Coordinates: ${coordinates ? coordinates.join(", ") : "Not provided"}
- Days: ${days}
- Budget: ${budget}
- Traveller Type: ${travelerType}

### JSON Structure:
{
  "location": "${destination}",
  "bestTimeToVisit": "October to March", 
  "hotels": [
    // Provide at least 10 hotel options, each with:
    {
      "name": "Hotel Name",
      "address": "Hotel Address",
      "pricePerNight": "₹ Approximate",
      "rating": "4.3/5",
      "description": "Brief hotel description",
      "imageUrl": "https://example.com/hotel.jpg",
      "coordinates": {
        "lat": 00.0000,
        "lng": 00.0000
      }
    }
    // Repeat for at least 10 hotels
  ],
  "itinerary": [
    {
      "day": 1,
      "plan": [
        {
          "placeName": "Name of place",
          "details": "Short description",
          "imageUrl": "https://example.com/image.jpg",
          "coordinates": {
            "lat": 00.0000,
            "lng": 00.0000
          },
          "ticketPrice": "₹100",
          "bestTimeToVisit": "Morning/Evening",
          "timeToSpend": "1-2 hours",
          "travelTimeFromLastLocation": "20 mins"
        }
      ]
    },
    {
      "day": 2,
      "plan": [
        // More places here
      ]
    }
  ]
}

Tailor this data for a ${travelerType?.toLowerCase()} with a ${budget?.toLowerCase()} budget visiting for ${days} days.

Make sure to output **valid JSON**.
`.trim();

  const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const text = (await result.response).text();

  // Optional: parse the JSON response (handle errors gracefully)
  try {
    const parsed = JSON.parse(text);
    return parsed;
  } catch (err) {
    console.error("Failed to parse AI response as JSON:", err);
    return text; // fallback to raw text
  }
};

export default generateTripPlan;
