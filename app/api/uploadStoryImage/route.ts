import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
// Import the Supabase client from your supabaseClient.ts file
import { supabase } from '@/app/admin/supabaseClient';


// Change this to match the name of your Supabase storage bucket
const BUCKET_NAME = 'story-thumbnails';

/**
 * GET handler
 * If someone visits /api/uploadStoryImage directly with a GET request,
 * they'll receive a simple JSON message instead of a 405 error.
 */
export async function GET() {
  return NextResponse.json({
    message: 'Please use POST to upload images to Supabase.',
  });
}

/**
 * POST handler
 * Expects a multipart/form-data payload with a `file` field.
 * Uploads the file to Supabase Storage and returns a public URL.
 */
export async function POST(req: NextRequest) {
  try {
    // Parse the form-data from the request
    const formData = await req.formData();
    const file = formData.get('file') as File;

    // If no file is provided, return an error
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Generate a unique filename to avoid collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `story-${uuidv4()}.${fileExt}`;

    // Upload the file to your specified Supabase bucket
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (error) {
      console.error('Upload error:', error);
      return NextResponse.json(
        { error: 'Upload failed' },
        { status: 500 }
      );
    }

    // Construct the public URL for the uploaded image
    // Make sure your bucket is public or has the appropriate policy
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${fileName}`;

    // Return the URL in a JSON response
    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}