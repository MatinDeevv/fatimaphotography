import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Path to the public directory's pictures-gallery folder
    const imagesDirectory = path.join(process.cwd(), "public/pictures-gallery");

    // Ensure the directory exists
    if (!fs.existsSync(imagesDirectory)) {
      return NextResponse.json(
        { error: "The 'pictures-gallery' directory does not exist." },
        { status: 404 }
      );
    }
      // Read all files in the directory
    const files = fs.readdirSync(imagesDirectory);

    // Filter valid image formats (case-insensitive)
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    // If no images are found
    if (imageFiles.length === 0) {
      return NextResponse.json(
        { error: "No images found in the 'pictures-gallery' directory." },
        { status: 404 }
      );
    }

    // Generate URLs for the images (relative to the 'public' folder)
    const imageUrls = imageFiles.map((file) => `/pictures-gallery/${file}`);

    return NextResponse.json(imageUrls, { status: 200 });
  } catch (error) {
    console.error("Error fetching images:", error.message);
    return NextResponse.json(
      { error: "An error occurred while fetching images." },
      { status: 500 }
    );
  }
}
