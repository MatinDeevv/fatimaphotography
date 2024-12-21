'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

// Story type
interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [newStory, setNewStory] = useState({
    title: '',
    description: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  // Load stories from localStorage
  useEffect(() => {
    const storedStories = JSON.parse(
      localStorage.getItem('storiesList') || '[]'
    );
    setStories(storedStories);
  }, []);

  // Save stories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('storiesList', JSON.stringify(stories));
  }, [stories]);

  // Handle image upload
  const handleImageUpload = async () => {
    if (!imageFile) {
      alert('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('file', imageFile);

    setUploading(true);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const uploadedImagePath = `/uploads/${data.fileName}`;
        setNewStory({ ...newStory, image: uploadedImagePath });
      } else {
        alert('Image upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    } finally {
      setUploading(false);
    }
  };

  // Add story to the list
  const handleAddStory = () => {
    if (!newStory.title || !newStory.description || !newStory.image) {
      alert('Please fill all fields and upload an image.');
      return;
    }

    const newEntry: Story = {
      id: uuidv4(),
      ...newStory,
    };

    setStories([...stories, newEntry]);
    setNewStory({ title: '', description: '', image: '' });
    setImageFile(null);
  };

  // Delete story from the list
  const deleteStory = (id: string) => {
    const updatedStories = stories.filter((s) => s.id !== id);
    setStories(updatedStories);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6">Add New Story</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Story Title"
            value={newStory.title}
            onChange={(e) =>
              setNewStory({ ...newStory, title: e.target.value })
            }
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={newStory.description}
            onChange={(e) =>
              setNewStory({ ...newStory, description: e.target.value })
            }
            className="w-full p-3 border rounded-lg"
          ></textarea>

          {/* Image Upload */}
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
              }
              className="w-full p-3 border rounded-lg"
            />
            <button
              type="button"
              onClick={handleImageUpload}
              disabled={uploading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>

          {newStory.image && (
            <div className="relative w-64 h-40 mt-4">
              <Image
                src={newStory.image}
                alt="Story Thumbnail"
                layout="fill"
                className="object-cover rounded-lg"
              />
            </div>
          )}

          <button
            onClick={handleAddStory}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Add Story
          </button>
        </div>

        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Existing Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-gray-50 p-6 rounded-xl shadow-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-2xl font-semibold">{story.title}</h3>
                  <p>{story.description}</p>
                </div>
                <div className="relative w-24 h-24">
                  <Image
                    src={story.image}
                    alt={story.title}
                    layout="fill"
                    className="rounded-lg object-cover"
                  />
                </div>
                <button
                  onClick={() => deleteStory(story.id)}
                  className="ml-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
