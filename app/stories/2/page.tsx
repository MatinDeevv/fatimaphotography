'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

const seoData = {
  siteName: 'Fatima Photography',
};

export default function StoryPage({ params }: { params: { storyId: string } }) {
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch images dynamically for the specific story
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/getImages?folder=story-${params.storyId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data.images);
      } catch (err: any) {
        console.error('Error loading images:', err);
        setError('Failed to load images.');
      }
    };

    fetchImages();
  }, [params.storyId]);

  return (
    <>
      <Head>
        <title>Story {params.storyId} | Fatima Photography</title>
        <meta name="description" content="Browse captivating love stories captured by Fatima Photography." />
        <meta name="keywords" content="photography, stories, gallery, love, couples" />
      </Head>

      {/* Navbar */}
      <nav className="bg-white fixed top-0 w-full z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">
            {seoData.siteName}
          </Link>

          <ul className="hidden md:flex space-x-6 text-sm font-medium">
            {['Home', 'Services', 'Stories', 'Contact'].map((link) => (
              <li key={link}>
                <Link
                  href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                  className="hover:text-blue-600 transition"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/about.jpg')" }}
      >
        <h1 className="text-4xl font-bold text-white">Love Story {params.storyId}</h1>
      </header>

      {/* Story Image Grid */}
      <main className="container mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          images.map((image, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300">
              <img src={image} alt={`Story ${params.storyId} Image ${index + 1}`} className="w-full h-64 object-cover" />
            </div>
          ))
        )}
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
