import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export async function GET() {
  try {
    // Path to the public directory's pictures-gallery folder
    const baseDirectory = path.join(process.cwd(), "public");

    // Recursively get all image files in the pictures-gallery directory
    function getAllFiles(dirPath, arrayOfFiles) {
      const files = fs.readdirSync(dirPath);

      arrayOfFiles = arrayOfFiles || [];

      files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
          arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
        } else if (/\.(jpg|jpeg|png|gif|webp)$/i.test(file)) {
          arrayOfFiles.push(fullPath);
        }
      });

      return arrayOfFiles;
    }

    const allImageFiles = getAllFiles(path.join(baseDirectory, "pictures-gallery"));

    // If no images are found
    if (allImageFiles.length === 0) {
      return NextResponse.json(
        { error: "No images found in the 'pictures-gallery' directory." },
        { status: 404 }
      );
    }

    // Generate URLs for the images (relative to the 'public' folder)
    const imageUrls = allImageFiles.map((file) =>
      file.replace(baseDirectory, "").replace(/\\/g, "/")
    );

    // Shuffle the array to randomize the order of images
    const shuffledImageUrls = shuffleArray(imageUrls);

    return NextResponse.json(shuffledImageUrls, { status: 200 });
  } catch (error) {
    console.error("Error fetching images:", error.message);
    return NextResponse.json(
      { error: "An error occurred while fetching images." },
      { status: 500 }
    );
  }
}
