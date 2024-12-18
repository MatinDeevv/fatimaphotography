// app/api/reviews/route.ts
import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Stored in .env.local
const PLACE_ID = process.env.PLACE_ID; // Stored in .env.local

export async function GET() {
  if (!GOOGLE_API_KEY || !PLACE_ID) {
    return NextResponse.json({ error: 'Missing Google API credentials' }, { status: 500 });
  }

  try {
    // Fetch reviews from Google Places API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${PLACE_ID}&key=${GOOGLE_API_KEY}`
    );
    const data = await response.json();

    if (response.ok && data.result) {
      return NextResponse.json({ reviews: data.result.reviews });
    } else {
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'An error occurred while fetching reviews' },
      { status: 500 }
    );
  }
}
