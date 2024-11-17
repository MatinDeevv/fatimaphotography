import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = 'YOUR_GOOGLE_API_KEY';
const PLACE_ID = 'YOUR_PLACE_ID'; // Your business's Google Place ID

export async function GET() {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.result && data.result.reviews) {
      const reviews = data.result.reviews.map((review) => ({
        author_name: review.author_name,
        text: review.text,
        rating: review.rating,
        time: review.relative_time_description,
      }));

      return NextResponse.json({ reviews });
    } else {
      return NextResponse.json({ message: 'No reviews found.' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
