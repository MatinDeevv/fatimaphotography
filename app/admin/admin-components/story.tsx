'use client';

import { useState } from 'react';
import { supabase } from '@/app/admin/supabaseClient';

export default function AdminPage() {
  const [story, setStory] = useState({
    couple: '',
    date: '',
    thumbnail: '',
    description: '',
    pixiesetLink: '',
    tags: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // When user wants to pick an image from the bucket
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [bucketImages, setBucketImages] = useState<{ name: string; url: string }[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  // Handle text / textarea changes in one place
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStory((prev) => ({ ...prev, [name]: value }));
  };

  // Validate required fields
  const validateForm = () => {
    if (!story.couple.trim()) return 'Couple is required';
    if (!story.date.trim()) return 'Date is required';
    if (!story.thumbnail.trim()) return 'Thumbnail is required';
    if (!story.tags.trim()) return 'At least one tag is required';
    return '';
  };

  // Normalize tags input before storing
  const normalizeTags = (rawTags: string) => {
    return rawTags
      .split(/[, ]+/)
      .map((t) => t.trim())
      .filter(Boolean)
      .join(', ');
  };

  // Called when user clicks "Add Story"
  const handleAddStory = async () => {
    setErrorMsg('');
    setSuccessMsg('');

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }
    setLoading(true);

    try {
      // Prepare object for DB
      const newStory = {
        couple: story.couple.trim(),
        date: story.date.trim(),
        thumbnail: story.thumbnail.trim(), // already set by the image picker or by user
        description: story.description.trim(),
        pixiesetLink: story.pixiesetLink.trim(),
        tags: normalizeTags(story.tags),
      };

      // Insert into Supabase
      const { error } = await supabase.from('stories').insert([newStory]);
      if (error) {
        console.error('Failed to add story:', error);
        setErrorMsg('Database error occurred.');
      } else {
        setSuccessMsg('Story added successfully!');
        setStory({
          couple: '',
          date: '',
          thumbnail: '',
          description: '',
          pixiesetLink: '',
          tags: '',
        });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setErrorMsg('Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // Reset everything
  const handleReset = () => {
    setStory({
      couple: '',
      date: '',
      thumbnail: '',
      description: '',
      pixiesetLink: '',
      tags: '',
    });
    setErrorMsg('');
    setSuccessMsg('');
  };

  // Toggle the image picker, and if opening, fetch images from the bucket
  const handleToggleImagePicker = async () => {
    // If we're showing it, we might be about to hide it
    // If we want to fetch images only once, you can do it conditionally
    if (!showImagePicker) {
      setLoadingImages(true);
      setErrorMsg('');
      setBucketImages([]);

      try {
        // 1) List all files in your bucket
        //    NOTE: Adjust "story-thumbnails" to match your bucket name
        const { data, error } = await supabase.storage
          .from('story-thumbnails')
          .list('', { limit: 100 });

        if (error) {
          console.error('Error listing bucket images:', error);
          setErrorMsg('Error fetching bucket images.');
        } else if (data) {
          // 2) Generate a public URL for each file
          const filesWithUrl: { name: string; url: string }[] = data.map((file: { name: string }) => {
            const { data: urlData } = supabase.storage
              .from('story-thumbnails')
              .getPublicUrl(file.name);

            return {
              name: file.name,
              url: urlData?.publicUrl || '',
            };
          });

          setBucketImages(filesWithUrl);
        }
      } catch (err) {
        console.error(err);
        setErrorMsg('Could not fetch images from bucket.');
      } finally {
        setLoadingImages(false);
      }
    }
    // Toggle show/hide
    setShowImagePicker(!showImagePicker);
  };

  // User clicked an image in the bucket
  const handleSelectImage = (url: string) => {
    // Set story.thumbnail to this URL
    setStory((prev) => ({ ...prev, thumbnail: url }));
    // Hide the image picker
    setShowImagePicker(false);
  };

  return (
    <div className="container mx-auto font-body p-10 max-w-xl">
      <h1 className="text-2xl font-bold font-body mb-5">Admin Panel - Add a Story</h1>

      {/* Error & Success Messages */}
      {errorMsg && (
        <div className="mb-4 p-3 bg-red-100 font-body text-red-700 border border-red-300 rounded">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="mb-4 p-3 bg-green-100 font-body text-green-700 border border-green-300 rounded">
          {successMsg}
        </div>
      )}

      <label className="font-body  font-semibold">Couple *</label>
      <input
        name="couple"
        type="text"
        placeholder="Couple Name"
        className="block w-full p-2 mb-4 border rounded focus:outline-none"
        value={story.couple}
        onChange={handleInputChange}
      />

      <label className="font-semibold font-body">Date *</label>
      <input
        name="date"
        type="text"
        placeholder="Date (e.g. October 2024)"
        className="block w-full p-2 mb-4 border rounded focus:outline-none"
        value={story.date}
        onChange={handleInputChange}
      />

      {/* Thumbnail - replaced with button & preview */}
      <div className="mb-4 font-body">
        <label className="font-semibold font-body">Thumbnail *</label>
        <div className="flex items-center font-body space-x-3 mt-2">
          <button
            type="button"
            onClick={handleToggleImagePicker}
            className="px-3 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-700"
          >
            {showImagePicker ? 'Close Image Picker' : 'Select Image from Bucket'}
          </button>
          {story.thumbnail && (
            <img
              src={story.thumbnail}
              alt="Selected Thumbnail"
              className="h-16 w-16 object-cover border rounded shadow"
            />
          )}
        </div>
      </div>

      {/* Optionally, if you want to allow manual input as well */}
      {/* 
      <input
        name="thumbnail"
        type="text"
        placeholder="Or enter thumbnail URL"
        className="block w-full p-2 mb-4 border rounded focus:outline-none"
        value={story.thumbnail}
        onChange={handleInputChange}
      />
      */}

      {/* The "select images" panel */}
      {showImagePicker && (
        <div className="border p-4 mb-4 rounded bg-gray-50">
          <h2 className="font-semibold mb-3">
            {loadingImages ? 'Loading images...' : 'Select an image'}
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {bucketImages.map((file) => (
              <div
                key={file.name}
                className="relative border rounded overflow-hidden cursor-pointer hover:opacity-75"
                onClick={() => handleSelectImage(file.url)}
              >
                {/* Preview the image */}
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                  {file.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <label className="font-semibold">Description</label>
      <textarea
        name="description"
        placeholder="Story description..."
        className="block w-full p-2 mb-4 border rounded focus:outline-none"
        value={story.description}
        onChange={handleInputChange}
      />

      <label className="font-semibold">Pixieset Link</label>
      <input
        name="pixiesetLink"
        type="text"
        placeholder="https://example.com/gallery"
        className="block w-full p-2 mb-4 border rounded focus:outline-none"
        value={story.pixiesetLink}
        onChange={handleInputChange}
      />

      <label className="font-semibold">Tags *</label>
      <input
        name="tags"
        type="text"
        placeholder="e.g. Wedding, Outdoor"
        className="block w-full p-2 mb-4 border rounded focus:outline-none"
        value={story.tags}
        onChange={handleInputChange}
      />

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handleAddStory}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-800 disabled:bg-green-300"
        >
          {loading ? 'Adding...' : 'Add Story'}
        </button>
        <button
          onClick={handleReset}
          disabled={loading}
          className="px-4 py-2 bg-gray-400 text-white rounded shadow hover:bg-gray-500 disabled:bg-gray-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
