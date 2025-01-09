'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '@/app/components/NavBar';
import NoContextMenuPage from '@/app/components/DisableContextMenu';
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
    tags: ['Pre-Wedding', 'Persian']
  },
  {
    id: 2,
    couple: 'Malek & Shelair',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/DSC_3448.JPG',
    description: 'An unforgettable scene full of emotion.',
    pixiesetLink: 'https://fatimaphotographyca.pixieset.com/malekandshelair/',
    tags: ['Wedding', 'Arab']
  },
    {
      id: 3,
      couple: 'Simran & Ramandeep',
      date: 'September 2024',
      thumbnail: '/pictures-gallery/DSC_2604.JPG',
      description: 'An unforgettable scene full of emotion.',
      pixiesetLink: 'https://fatimaphotographyca.pixieset.com/web-1/',
      tags: ['Wedding', 'South Asian' ]
    },
    {
      id: 4,
      couple: 'Savreet & Ramandeep',
      date: 'September 2024',
      thumbnail: '/pictures-gallery/DSC_0280.jpg',
      description: 'An unforgettable scene full of emotion.',
      pixiesetLink: 'https://fatimaphotographyca.pixieset.com/web/',
      tags: ['Wedding', 'South Asian' ]
    },
    {
      id: 5,
      couple: 'Hanieh & Shayan',
      date: 'September 2024',
      thumbnail: '/pictures-gallery/DSC_8350.jpg',
      description: 'An unforgettable scene full of emotion.',
      pixiesetLink: 'https://fatimaphotographyca.pixieset.com/haniehandshayan/',
      tags: ['Pre-Wedding','Persian' ]
    },
    
];

export default function PortfolioPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [visibleStories, setVisibleStories] = useState(6);
  const [uploadedStories, setUploadedStories] = useState<Story[]>([]);

  // Fetch uploaded stories dynamically from /api/getUploads
  useEffect(() => {
    const fetchUploads = async () => {
      try {
        const response = await fetch('/api/getUploads');
        const data = await response.json();
        const uploads: Story[] = data.files.map((file: { name: string; url: string }, index: number) => ({
          id: staticStories.length + index + 1,
          couple: file.name.split('.')[0], // Use file name as placeholder for couple name
          date: 'Uploaded Story',
          thumbnail: file.url,
          description: 'Uploaded through the admin panel.',
          pixiesetLink: file.url,
          tags: ['Upload']
        }));
        setUploadedStories(uploads);
      } catch (error) {
        console.error('Error fetching uploads:', error);
      }
    };

    fetchUploads();
  }, []);

  // Combine Static and Uploaded Stories
  const allStories = [...staticStories, ...uploadedStories];

  const uniqueTags = ['All', ...new Set(allStories.flatMap((story) => story.tags))];

  // Filtered Stories
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

  return (
    <>
    <NoContextMenuPage />
      <Head>
        <title>Portfolio | Fatima Photography</title>
        <meta
          name="description"
          content="Browse captivating stories and portfolio by Fatima Photography."
        />
        <meta name="keywords" content="photography, portfolio, gallery, love, stories" />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="h-64 bg-green-950 flex items-center justify-center">
        <h1 className="text-5xl mt-24 text-white drop-shadow-xl">PORTFOLIO</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        {/* Search and Filter Section */}
        <section className="container mx-auto my-10 px-4">
          <div className="flex flex-col items-center space-y-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search stories by name or description..."
              className="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-950 transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Tag Filters */}
            <div className="flex flex-wrap justify-center space-x-2">
              {uniqueTags.map((tag) => (
                <button
                  key={tag}
                  className={`px-4 py-2 text-sm font-semibold rounded-full ${
                    selectedTag === tag
                      ? 'bg-green-950 text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700'
                  } hover:bg-green-700 hover:text-white transition-colors duration-200`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Stories Grid */}
        <main className="container mx-auto my-1 px-4 flex-grow">
          {visibleFilteredStories.length === 0 ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-semibold text-gray-600">No stories found!</h2>
              <p className="text-gray-500">Try a different search or filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleFilteredStories.map((story) => (
                <a
                  key={story.id}
                  href={story.pixiesetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 cursor-pointer"
                >
                  <div className="relative w-full h-[500px] rounded-t-lg">
                    <img
                      src={story.thumbnail}
                      alt={story.couple}
                      className="absolute inset-0 w-full h-full object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="bg-white p-6 rounded-b-lg">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-green-950 transition">
                      {story.couple}
                    </h2>
                    <p className="text-sm text-gray-600">{story.date}</p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {visibleStories < filteredStories.length && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-green-950 text-white rounded-lg font-bold hover:bg-green-700 transition duration-200"
              >
                Load More Stories
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
