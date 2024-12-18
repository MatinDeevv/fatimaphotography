import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

// API handler to fetch images from a specific folder
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { folder } = req.query;

  // Ensure folder name is a string
  if (typeof folder !== 'string') {
    console.error('Folder parameter is invalid');
    return res.status(400).json({ message: 'Invalid folder name' });
  }

  // Path to the folder where images are stored (in public/stories)
  const folderPath = path.join(process.cwd(), 'public', 'stories', folder);

  // Log folder path for debugging purposes
  console.log('Fetching images from:', folderPath);

  // Read the folder contents
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return res.status(500).json({ message: 'Failed to read folder' });
    }

    // Filter only image files based on the file extensions
    const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
    const imageUrls = imageFiles.map((file) => `/stories/${folder}/${file}`);

    // Log image URLs to ensure they are correct
    console.log('Image URLs:', imageUrls);

    res.status(200).json({ images: imageUrls });
  });
}
