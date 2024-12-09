'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Head from 'next/head';
import { useState, useEffect } from 'react';

// Placeholder SEO Data
const seoData = {
  siteName: 'Fatima Photography',
};

// Sample stories data
const stories = [
  {
    id: 1,
    couple: 'Story 1',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/1.jpg',
    description: 'A captivating moment captured in time.',
  },
  {
    id: 2,
    couple: 'Story 2',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/15.jpg',
    description: 'An unforgettable scene full of emotion.',
  },
  {
    id: 3,
    couple: 'Story 3',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/19.jpg',
    description: 'A beautiful memory frozen forever.',
  },
  {
    id: 4,
    couple: 'Story 4',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/20.jpg',
    description: 'Captured emotions and cherished moments.',
  },
  {
    id: 5,
    couple: 'Story 5',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/7.jpg',
    description: 'A serene scene filled with love and warmth.',
  },
];

export default function StoriesPage() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Love Stories | Fatima Photography</title>
        <meta name="description" content="Browse captivating love stories captured by Fatima Photography." />
        <meta name="keywords" content="photography, stories, gallery, love, couples" />
      </Head>

      {/* Navbar */}
      <nav className="bg-white fixed top-0 w-full z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">
            {seoData.siteName}
          </Link>

          {/* Desktop Navigation */}
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

          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {showMobileMenu && (
          <div className="md:hidden bg-white shadow-md">
            <ul className="flex flex-col space-y-1 py-2 px-4">
              {['Home', 'Gallery', 'Services', 'Testimonials', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="block text-gray-700 hover:text-blue-600 transition py-1"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header
        className="h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/about.jpg')" }}
      >
        <h1 className="text-4xl font-bold text-white">Love Stories</h1>
      </header>

      {/* Stories Grid */}
      <main className="container mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {stories.map((story) => (
       <div
       key={story.id}
       className="relative group rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300 cursor-pointer"
       onClick={() => router.push(`/stories/${story.id}`)}
     >
       {/* Thumbnail */}
       <div className="relative w-full h-0" style={{ paddingBottom: '56.25%' /* 16:9 Aspect Ratio */ }}>
         <img
           src={story.thumbnail}
           alt={story.couple}
           className="absolute inset-0 w-full h-full object-cover"
         />
       </div>
     
       {/* Content */}
       <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
         <h2 className="text-lg font-semibold">{story.couple}</h2>
         <p className="text-sm">{story.date}</p>
         <p className="text-sm mt-2">{story.description}</p>
       </div>
     </div>
     
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
