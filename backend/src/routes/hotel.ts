// src/routes/tripPlan.ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { adminAuth } from '../lib/firebase' 
import { GoogleGenerativeAI } from '@google/generative-ai'
import 'dotenv/config'
import { getUserIdFromCookie } from '../utils/auth' 

const app = new Hono()


const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

interface TripPreferences {
  destination: string | null
  coordinates: [number, number] | null
  days: number | null
  budget: string | null
  travelerType: string | null
}

app.post('/generate-trip-plan', async (c) => {
  try {
    const tripPreferences: TripPreferences = await c.req.json()
    const { destination, coordinates, days, budget, travelerType } = tripPreferences

    const prompt = `
You are a smart AI travel planner. Generate a travel itinerary in **valid JSON format** (no explanations, just JSON).
//The image URL must be accessible (i.e., not a placeholder or example), and should end with ".jpg",".png"  from (royalty-free image sites like Unsplash, Pexels, or Wikimedia Commons)

### Trip Preferences:
- Destination: ${destination}
- Coordinates: ${coordinates ? coordinates.join(', ') : 'Not provided'}
- Days: ${days}
- Budget: ${budget}
- Traveller Type: ${travelerType}

### JSON Structure:
{
  "location": "${destination}",
  "bestTimeToVisit": "October to March", 
  "hotels": [
  //Include atleast 10 hotels
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
    }
  ]
}

Tailor this data for a ${travelerType?.toLowerCase()} with a ${budget?.toLowerCase()} budget visiting for ${days} days.

Make sure to output **valid JSON**.
`.trim()

    const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    let text = result.response.candidates?.[0]?.content?.parts?.[0]?.text

    if (!text) {
      return c.json({ success: false, error: 'No response from Gemini' }, 500)
    }

    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim()

    try {
      const parsed = JSON.parse(cleaned)

      return c.json({ success: true, data: parsed })
    } catch (err) {
      console.error('JSON parsing failed:', err)
      return c.json({ success: false, error: 'Failed to parse AI response' }, 500)
    }
  } catch (error) {
    console.error('Error generating trip plan:', error)
    return c.json({ error: 'Internal Server Error' }, 500)
  }
})


app.get('/getId', async (c) => {
  try {
    const userId = await getUserIdFromCookie(c)
    console.log(userId)

    if (!userId) return c.json({ success: false, message: 'Not logged in' })

    // Get user from Firebase Auth
    const userRecord = await adminAuth.getUser(userId)

    return c.json({
      success: true,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName,
        photoURL: userRecord.photoURL,
        provider: userRecord.providerData[0]?.providerId,
      },
    })
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return c.json({ success: false, message: 'Error fetching user' }, 500)
  }
})


export default app
