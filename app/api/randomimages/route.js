import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';
import { supabase } from '@/app/admin/supabaseClient'; // Import your pre-configured Supabase client

/**
 * Recursively collect all image files within a directory and include their file size.
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
      arrayOfFiles.push({ file: fullPath, size: stat.size });
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
 * Helper function to get image size via a HEAD request.
 */
async function getImageSize(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    const contentLength = res.headers.get('content-length');
    return contentLength ? parseInt(contentLength, 10) : Infinity;
  } catch (error) {
    console.error('Error fetching image size for', url, error);
    return Infinity;
  }
}

/**
 * Fetch images from a Supabase storage bucket with file size.
 *
 * @param {string} bucketName - The name of the Supabase bucket.
 * @param {string} folderPath - (Optional) A folder path within the bucket.
 * @returns {Promise<Array<{url: string, size: number}>>} - An array of objects with public image URLs and sizes.
 */
async function getSupabaseImages(bucketName, folderPath = '') {
  // List files in the bucket folder (not recursive)
  const { data, error } = await supabase.storage
    .from(bucketName)
    .list(folderPath, { limit: 100, offset: 0 });

  if (error) {
    console.error('Error fetching Supabase images:', error);
    return [];
  }

  // Filter for image files and generate public URLs
  const supabaseFiles = data
    .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name))
    .map((file) => {
      const filePath = folderPath ? `${folderPath}/${file.name}` : file.name;
      const { publicURL } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      return publicURL;
    });

  // For each image, perform a HEAD request to get the size
  const supabaseImageData = await Promise.all(
    supabaseFiles.map(async (url) => {
      const size = await getImageSize(url);
      return { url, size };
    })
  );

  return supabaseImageData;
}

/**
 * Route Handler for GET requests.
 */
export async function GET() {
  try {
    // 1. Retrieve images from the local "pictures-gallery" folder in the public directory.
    const baseDirectory = path.join(process.cwd(), 'public');
    const picturesDirectory = path.join(baseDirectory, 'pictures-gallery');
    const localFiles = getAllFiles(picturesDirectory); // returns array of {file, size}

    // Convert absolute file paths into public URLs and retain size data.
    const localImageData = localFiles.map((item) => ({
      url: item.file.replace(baseDirectory, '').replace(/\\/g, '/'),
      size: item.size,
    }));

    // 2. Retrieve images from the Supabase bucket with size info.
    const SUPABASE_BUCKET_NAME = 'your-bucket-name'; // Replace with your bucket name
    const supabaseImageData = await getSupabaseImages(SUPABASE_BUCKET_NAME);

    // 3. Combine both sources of image data.
    const combinedImageData = [...localImageData, ...supabaseImageData];

    // 4. Sort the combined images by file size (ascending).
    combinedImageData.sort((a, b) => a.size - b.size);

    // 5. Extract the first 3 images (the smallest ones) to load first.
    const firstThree = combinedImageData.slice(0, 3);

    // 6. For the remaining images, group them into pairs and shuffle the pairs.
    const remainder = combinedImageData.slice(3);
    const pairs = [];
    for (let i = 0; i < remainder.length; i += 2) {
      const pair = [remainder[i]];
      if (i + 1 < remainder.length) {
        pair.push(remainder[i + 1]);
      }
      pairs.push(pair);
    }
    shuffleArray(pairs);
    const shuffledRemainder = pairs.flat();

    // 7. Concatenate the prioritized first three images at the beginning.
    const finalCombinedImageData = [...firstThree, ...shuffledRemainder];

    // 8. Map to URL only for the final output.
    const finalImageUrls = finalCombinedImageData.map((item) => item.url);

    // 9. Return the final list of image URLs as JSON.
    return NextResponse.json(finalImageUrls, { status: 200 });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching images.' },
      { status: 500 }
    );
  }
}
