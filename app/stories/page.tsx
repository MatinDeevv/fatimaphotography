'use client';

import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/app/components/NavBar';

// Placeholder SEO Data
const seoData = {
  siteName: 'Fatima Photography'
};

// Sample stories data with Pixieset links
const stories = [
  {
    id: 1,
    couple: 'Story 1',
    date: 'November 2024',
    thumbnail: '333.png',
    description: 'A captivating moment captured in time.',
    pixiesetLink: 'https://fatimaphotographyca.pixieset.com/almaandyunes/'
  },
  {
    id: 2,
    couple: 'Story 2',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/15.jpg',
    description: 'An unforgettable scene full of emotion.',
    pixiesetLink: 'https://example.pixieset.com/story2'
  },
  {
    id: 3,
    couple: 'Story 3',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/19.jpg',
    description: 'A beautiful memory frozen forever.',
    pixiesetLink: 'https://example.pixieset.com/story3'
  },
  {
    id: 4,
    couple: 'Story 4',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/20.jpg',
    description: 'Captured emotions and cherished moments.',
    pixiesetLink: 'https://example.pixieset.com/story4'
  },
  {
    id: 5,
    couple: 'Story 5',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/7.jpg',
    description: 'A serene scene filled with love and warmth.',
    pixiesetLink: 'https://example.pixieset.com/story5'
  }
];

export default function StoriesPage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <Head>
        <title>Love Stories | Fatima Photography</title>
        <meta
          name="description"
          content="Browse captivating love stories captured by Fatima Photography."
        />
        <meta name="keywords" content="photography, stories, gallery, love, couples" />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header
        className="h-64 bg-green-950 bg-center flex items-center justify-center"
      >
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">Love Stories</h1>
      </header>

      {/* Stories Grid */}
      <main className="container mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {stories.map((story) => (
          <a
            key={story.id}
            href={story.pixiesetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            {/* Thumbnail */}
            <div
              className="relative w-40 h-32"
              style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}
            >
              <img
                src={story.thumbnail}
                alt={story.couple}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Overlay Content */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-xl font-bold">{story.couple}</h2>
              <p className="text-sm">{story.date}</p>
              <p className="text-sm mt-2">{story.description}</p>
            </div>
          </a>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Fatima Photography. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
