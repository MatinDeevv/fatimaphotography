'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';

type Story = {
  id: number;
  couple: string;
  date: string;
  thumbnail: string;
  description: string;
  pixiesetLink: string;
  tags: string[];
};

// Static Stories
const staticStories: Story[] = [
  {
    id: 1,
    couple: 'Saba & Vaji',
    date: 'October 20th, 2024',
    thumbnail: 'story-5/sab01.jpg',
    description: 'A captivating moment captured in time.',
    pixiesetLink: 'https://fatimaphotographyca.pixieset.com/sabaandvaji/',
    tags: ['Wedding', 'Asian'],
  },
  {
    id: 2,
    couple: 'Malek & Shelair',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/15.jpg',
    description: 'An unforgettable scene full of emotion.',
    pixiesetLink: 'https://fatimaphotographyca.pixieset.com/malekandshelair/',
    tags: ['Wedding', 'South Asian'],
  },
];

export default function PortfolioPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [visibleStories, setVisibleStories] = useState(6);
  const [uploadedStories, setUploadedStories] = useState<Story[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Fetch uploaded stories from API
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch('/api/getUploads');
        const data = await response.json();

        const uploads: Story[] = data.files.map(
          (file: { name: string; url: string }, index: number) => ({
            id: staticStories.length + index + 1,
            couple: file.name.split('.')[0],
            date: 'Uploaded Story',
            thumbnail: file.url,
            description: 'Uploaded via admin panel.',
            pixiesetLink: file.url,
            tags: ['Upload'],
          })
        );

        setUploadedStories(uploads);
      } catch (error) {
        console.error('Error fetching uploads:', error);
      }
    };

    fetchUploads();
  }, []);

  const allStories = [...staticStories, ...uploadedStories];
  const uniqueTags = ['All', ...new Set(allStories.flatMap((story) => story.tags))];

  const filteredStories = allStories.filter((story) => {
    const matchesSearch =
      story.couple.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === 'All' || story.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const visibleFilteredStories = filteredStories.slice(0, visibleStories);

  const handleLoadMore = () => {
    setVisibleStories((prev) => prev + 6);
  };

  // Handle File Upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/Uploads', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadStatus('File uploaded successfully!');
        alert('File uploaded successfully');
        setUploadedStories((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            couple: selectedFile.name.split('.')[0],
            date: 'Uploaded Story',
            thumbnail: data.path,
            description: 'Uploaded via admin panel.',
            pixiesetLink: data.path,
            tags: ['Upload'],
          },
        ]);
      } else {
        setUploadStatus(`Error: ${data.message}`);
        alert('Upload failed: ' + data.message);
      }
    } catch (error) {
      setUploadStatus('Upload failed');
      alert('An error occurred during the upload.');
    }
  };

  return (
    <>
      <Head>
        <title>Portfolio | Fatima Photography</title>
        <meta
          name="description"
          content="Browse captivating stories and portfolio by Fatima Photography."
        />
      </Head>

      {/* Upload Section */}
      <div className="p-8 bg-white shadow-lg rounded-lg max-w-xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-center mb-6">Upload New Story</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          className="block w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none"
        />
        <button
          onClick={handleUpload}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg w-full hover:bg-green-700"
        >
          Upload
        </button>
        {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}
      </div>

      {/* Search and Filter */}
      <section className="container mx-auto my-10 px-4">
        <input
          type="text"
          placeholder="Search stories by name or description..."
          className="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex flex-wrap justify-center space-x-2 mt-6">
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full ${
                selectedTag === tag
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Stories Grid */}
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleFilteredStories.map((story) => (
            <a
              key={story.id}
              href={story.pixiesetLink}
              className="block rounded-lg overflow-hidden shadow-lg"
            >
              <img src={story.thumbnail} alt={story.couple} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{story.couple}</h3>
                <p>{story.date}</p>
              </div>
            </a>
          ))}
        </div>
        {visibleStories < filteredStories.length && (
          <button onClick={handleLoadMore} className="mt-10 px-6 py-3 bg-green-700 text-white">
            Load More
          </button>
        )}
      </main>
    </>
  );
}
