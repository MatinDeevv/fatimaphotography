import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const uploadDir = path.join(process.cwd(), 'public/uploads');

export async function GET() {
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const files = fs.readdirSync(uploadDir).map((file) => ({
      name: file,
      url: `/uploads/${file}`,
    }));

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error fetching uploads:', error);
    return NextResponse.json(
      { message: 'Failed to retrieve files' },
      { status: 500 }
    );
  }
}
