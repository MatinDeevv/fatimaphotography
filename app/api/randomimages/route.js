import path from 'path';
import fs from 'fs';
import { NextResponse } from 'next/server';

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
      // We only push if it's an image
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
 * Route Handler for GET
 */
export async function GET() {
  try {
    // 1. Locate the "pictures-gallery" folder inside the "public" directory.
    const baseDirectory = path.join(process.cwd(), 'public');
    const picturesDirectory = path.join(baseDirectory, 'pictures-gallery');

    // 2. Recursively gather all image files in pictures-gallery
    const allImageFiles = getAllFiles(picturesDirectory);

    // 3. Convert file paths to public-accessible URLs
    //    (remove the absolute path portion, replace backslashes if on Windows)
    const imageUrls = allImageFiles.map((filePath) =>
      filePath.replace(baseDirectory, '').replace(/\\/g, '/')
    );

    // 4. Group the images *two at a time* (i.e., "couples")
    const pairs = [];
    for (let i = 0; i < imageUrls.length; i += 2) {
      // We'll always push at least the current image
      const pair = [imageUrls[i]];

      // If there's a second one in this group, push it too
      if (i + 1 < imageUrls.length) {
        pair.push(imageUrls[i + 1]);
      }

      pairs.push(pair);
    }

    // 5. Shuffle just the array of pairs
    shuffleArray(pairs);

    // 6. Flatten the pairs back into a single array
    //    so each pair is side-by-side, but pairs are in random order
    const shuffledImageUrls = pairs.flat();

    // 7. Return JSON
    return NextResponse.json(shuffledImageUrls, { status: 200 });
  } catch (error) {
    console.error('Error fetching images:', error.message);
    return NextResponse.json(
      { error: 'An error occurred while fetching images.' },
      { status: 500 }
    );
  }
}
