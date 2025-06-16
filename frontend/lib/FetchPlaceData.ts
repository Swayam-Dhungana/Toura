// lib/fetchPlaceData.ts
export async function getMapboxPlaceData(query: string) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${token}&limit=1`;

  const res = await fetch(url);
  const data = await res.json();

  return data.features?.[0]; // returns the first result
}

export async function getUnsplashImage(placeName: string) {
  const key = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&client_id=${key}&per_page=1`;

  const res = await fetch(url);
  const data = await res.json();

  return data.results?.[0]?.urls?.regular || null;
}
