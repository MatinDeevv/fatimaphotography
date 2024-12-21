import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import formidable, { Fields, Files } from 'formidable';
import { Readable } from 'stream';

// Disable body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

// Ensure Upload Directory Exists
function ensureUploadDirectory() {
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('✅ Upload directory created at:', uploadDir);
  }
}

// Helper: Convert Buffer to Readable Stream
function bufferToStream(buffer: Buffer): Readable {
  const readable = new Readable();
  readable._read = () => {};
  readable.push(buffer);
  readable.push(null);
  return readable;
}

// Parse Form from NextRequest
async function parseForm(req: NextRequest): Promise<{ fields: Fields; files: Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable({
      multiples: true,
      uploadDir: path.join(process.cwd(), 'public/uploads'),
      keepExtensions: true,
    });

    // Handle null body case
    if (!req.body) {
      reject(new Error('Request body is empty.'));
      return;
    }

    req
      .arrayBuffer()
      .then((buffer: ArrayBuffer) => {
        const stream = bufferToStream(Buffer.from(buffer));

        form.parse(stream as any, (err: Error | null, fields: Fields, files: Files) => {
          if (err) {
            reject(err);
          } else {
            resolve({ fields, files });
          }
        });
      })
      .catch((err) => reject(err));
  });
}

// Handle File Upload
export async function POST(req: NextRequest) {
  try {
    ensureUploadDirectory();

    const { fields, files } = await parseForm(req);

    if (!files || Object.keys(files).length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedFiles: { fileName: string; url: string }[] = [];

    for (const fileKey in files) {
      const fileArray = files[fileKey];

      if (Array.isArray(fileArray)) {
        fileArray.forEach((file) => {
          const fileName = path.basename(file.filepath);
          const newFilePath = path.join(process.cwd(), 'public/uploads', fileName);

          fs.renameSync(file.filepath, newFilePath);

          uploadedFiles.push({
            fileName,
            url: `/uploads/${fileName}`,
          });
        });
      }
    }

    console.log('📂 Files Uploaded:', uploadedFiles);

    return NextResponse.json({
      message: 'Files uploaded successfully!',
      files: uploadedFiles,
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload files. Please try again.' },
      { status: 500 }
    );
  }
}
