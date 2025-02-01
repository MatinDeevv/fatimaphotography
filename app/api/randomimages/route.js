import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';
import { supabase } from '@/app/admin/supabaseClient'; // Import your pre-configured Supabase client

/**
 * Recursively collect all image files within a directory.
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);

    if (fs.statSync(fullPath).isDirectory()) {
      // Recursively scan sub-folders
      getAllFiles(fullPath, arrayOfFiles);
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
      // Only include image files
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

/**
 * Fisher-Yates shuffle for an array.
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Fetch images from a Supabase storage bucket.
 *
 * @param {string} bucketName - The name of the Supabase bucket.
 * @param {string} folderPath - (Optional) A folder path within the bucket.
 * @returns {Promise<string[]>} - An array of public image URLs.
 */
async function getSupabaseImages(bucketName, folderPath = '') {
  // List files in the bucket folder (the list API is not recursive)
  const { data, error } = await supabase.storage
  .from('carousel')

    .list(folderPath, { limit: 100, offset: 0 });

  if (error) {
    console.error('Error fetching Supabase images:', error);
    return [];
  }

  // Filter for image files and generate public URLs
  const imageUrls = data
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name))
    .map((file) => {
      // Construct the file path (prepend folderPath if provided)
      const filePath = folderPath ? `${folderPath}/${file.name}` : file.name;
      const { publicURL } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      return publicURL;
    });

  return imageUrls;
}

/**
 * Route Handler for GET requests.
 */
export async function GET() {
  try {
    // 1. Retrieve images from the local "pictures-gallery" folder in the public directory.
    const baseDirectory = path.join(process.cwd(), 'public');
    const picturesDirectory = path.join(baseDirectory, 'pictures-gallery');
    const localImageFiles = getAllFiles(picturesDirectory);

    // Convert absolute file paths into public URLs (e.g., "/pictures-gallery/your-image.jpg")
    const localImageUrls = localImageFiles.map((filePath) =>
      filePath.replace(baseDirectory, '').replace(/\\/g, '/')
    );

    // 2. Retrieve images from the Supabase bucket.
    const SUPABASE_BUCKET_NAME = 'your-bucket-name'; // Replace with your bucket name
    const supabaseImageUrls = await getSupabaseImages(SUPABASE_BUCKET_NAME);

    // 3. Combine both sources of image URLs.
    const combinedImageUrls = [...localImageUrls, ...supabaseImageUrls];

    // 4. Group the images two at a time ("couples").
    const pairs = [];
    for (let i = 0; i < combinedImageUrls.length; i += 2) {
      const pair = [combinedImageUrls[i]];
      if (i + 1 < combinedImageUrls.length) {
        pair.push(combinedImageUrls[i + 1]);
      }
      pairs.push(pair);
    }

    // 5. Shuffle the array of pairs.
    shuffleArray(pairs);

    // 6. Flatten the pairs back into a single array so that each pair stays together.
    const shuffledImageUrls = pairs.flat();

    // 7. Return the combined and shuffled list of image URLs as JSON.
    return NextResponse.json(shuffledImageUrls, { status: 200 });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching images.' },
      { status: 500 }
    );
  }
}
