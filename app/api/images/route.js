import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  const imagesDirectory = path.join(process.cwd(), 'public/pictures-gallery');

  try {
    const files = fs.readdirSync(imagesDirectory);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    return NextResponse.json(imageFiles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
  }
}
