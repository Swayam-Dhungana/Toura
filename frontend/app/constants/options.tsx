export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "Solo traveler exploring the world",
    icon: "🧍", // placeholder icon
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers sharing an adventure",
    icon: "❤️", // placeholder icon
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "Fun-loving family on a getaway",
    icon: "👨‍👩‍👧‍👦", // placeholder icon
    people: "3 to 5",
  },
  {
    id: 4,
    title: "Friends",
    desc: "Group of thrill-seeking friends",
    icon: "🎉", // placeholder icon
    people: "5 to 10",
  },
];

export const SelectBudgetOption = [
  {
    id: 1,
    title: "Budget",
    desc: "Cost-conscious and value-focused",
    icon: "💸", // placeholder icon
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Balanced spending for comfort and value",
    icon: "💼", // placeholder icon
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Premium experiences without compromise",
    icon: "🏰", // placeholder icon
  },
];
export const AI_PROMPT = ({
  destination,
  coordinates,
  days,
  budget,
  travelerType,
}: {
  destination: string;
  coordinates: [number, number] | null;
  days: number;
  budget: string;
  travelerType: string;
}) => `
You are a helpful travel planner AI. Based on the following preferences, generate a personalized travel itinerary.
- Destination: ${destination}
- Coordinates: ${coordinates ? coordinates.join(", ") : "Not provided"}
- Duration: ${days} day(s)
- Budget Level: ${budget}
- Traveller Type: ${travelerType}

Generate a detailed plan for each day including:
- Places to visit
- Activities
- Food recommendations
- Local tips

Keep the tone friendly and engaging.
`;