import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { IncomingMessage } from 'http';

// Disable default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), 'public/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req: NextRequest) {
  console.log('Incoming upload request...');  // <-- Log to check if route is hit

  const form = formidable({
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024,  // 10MB
  });

  const incomingReq = req as unknown as IncomingMessage;

  return new Promise((resolve, reject) => {
    form.parse(incomingReq, (err, fields, files) => {
      if (err) {
        console.error('Upload Error:', err);
        reject(NextResponse.json({ message: 'Upload failed' }, { status: 500 }));
        return;
      }

      const file = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!file) {
        console.log('No file received');
        resolve(NextResponse.json({ message: 'No file uploaded' }, { status: 400 }));
        return;
      }

      const newFilePath = path.join(uploadDir, file.originalFilename || file.newFilename);

      fs.rename(file.filepath, newFilePath, (renameErr) => {
        if (renameErr) {
          console.error('Rename Error:', renameErr);
          reject(NextResponse.json({ message: 'Error saving file' }, { status: 500 }));
        }

        console.log('File uploaded successfully:', newFilePath);
        resolve(
          NextResponse.json({
            message: 'File uploaded successfully',
            path: `/uploads/${file.originalFilename || file.newFilename}`,
          })
        );
      });
    });
  });
}
