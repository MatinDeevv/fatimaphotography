'use client';

import React, { useState } from 'react';

export default function AdminUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [statusColor, setStatusColor] = useState<'green' | 'red' | ''>(''); // for success/error styling
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setUploadStatus('');
      setStatusColor('');
    }
  };

  const handleUpload = async () => {
    setUploadStatus('');
    setStatusColor('');
    if (!file) {
      setUploadStatus('Please select a file first!');
      setStatusColor('red');
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/uploadStoryImage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        setUploadStatus(`Upload failed: ${errData.error || 'Unknown error'}`);
        setStatusColor('red');
        return;
      }

      const data = await response.json();
      if (data.url) {
        setUploadStatus(`Upload successful! URL: ${data.url}`);
        setStatusColor('green');
      } else {
        setUploadStatus('Upload completed, but no URL returned.');
        setStatusColor('red');
      }
    } catch (error) {
      console.error(error);
      setUploadStatus('An error occurred during upload.');
      setStatusColor('red');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center font-body justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 font-body rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 font-body text-center">Upload to Bucket</h1>

        {/* File Input */}
        <label className="block text-sm font-body font-medium text-gray-700 mb-1">
          Choose File
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 block w-full font-body text-sm border border-gray-300 rounded p-2 focus:outline-none"
        />

        {/* Preview if it's an image */}
        {file && (
          <div className="mb-4 font-body">
            <p className="text-sm font-body text-gray-600">
              Selected file: <span className="font-medium">{file.name}</span>
            </p>
            {file.type.startsWith('image/') && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="mt-2 max-h-40 object-cover rounded"
              />
            )}
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className={`w-full flex items-center justify-center py-2 px-4 rounded font-semibold text-white shadow ${
            isUploading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } transition-colors`}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading…' : 'Upload'}
        </button>

        {/* Status Message */}
        {uploadStatus && (
          <div
            className={`mt-4 p-3 rounded text-sm ${
              statusColor === 'green'
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}
          >
            {uploadStatus}
          </div>
        )}
      </div>
    </div>
  );
}
