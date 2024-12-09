'use client';

import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';

// Placeholder SEO Data
const seoData = {
  siteName: 'Fatima Photography',
};

// Services Data
const services = [
  {
    id: 1,
    title: 'Wedding Photography',
    description: 'Immortalize your moments of love and joy.',
    image: '/pictures-gallery/wedding.jpg',
    color: '#ffadc1', // Unique background color
  },
  {
    id: 2,
    title: 'Portrait Photography',
    description: 'Discover your essence in timeless portraits.',
    image: '/pictures-gallery/portrait.jpg',
    color: '#a1c4ff',
  },
  {
    id: 3,
    title: 'Event Photography',
    description: 'Capture the life of your unforgettable events.',
    image: '/pictures-gallery/event.jpg',
    color: '#d4ffb5',
  },
  {
    id: 4,
    title: 'Fashion Photography',
    description: 'Showcase your style through captivating visuals.',
    image: '/pictures-gallery/fashion.jpg',
    color: '#ffd3a8',
  },
  {
    id: 5,
    title: 'Nature Photography',
    description: 'Explore the beauty of the great outdoors.',
    image: '/pictures-gallery/nature.jpg',
    color: '#b8e8ff',
  },
];

export default function ServicesPage() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Services | Fatima Photography</title>
        <meta name="description" content="Explore our unique photography services with an immersive experience." />
        <meta name="keywords" content="photography, services, wedding, portrait, event, fashion, nature" />
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
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="h-80 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/services.jpg')" }}
      >
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">Our Unique Services</h1>
      </header>

      {/* Services Immersive Grid */}
      <main className="relative container mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {services.map((service) => (
          <div
            key={service.id}
            className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-500"
            onMouseEnter={() => setHoveredService(service.id)}
            onMouseLeave={() => setHoveredService(null)}
          >
            {/* Background Color for Unique Vibe */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${
                hoveredService === service.id ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundColor: service.color }}
            ></div>

            {/* Service Image */}
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-64 object-cover z-10 relative"
            />

            {/* Service Content */}
            <div
              className={`absolute inset-0 flex flex-col justify-center items-center text-center text-white z-20 ${
                hoveredService === service.id ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-500`}
            >
              <h2 className="text-2xl font-bold">{service.title}</h2>
              <p className="mt-2 px-4">{service.description}</p>
              <button className="mt-4 px-6 py-2 bg-black bg-opacity-70 rounded-lg shadow-lg hover:bg-opacity-90 transition">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Interactive Floating Animation */}
      {hoveredService && (
        <div
          className="fixed top-0 left-0 w-screen h-screen pointer-events-none"
          style={{
            backgroundImage: `url(${services.find((s) => s.id === hoveredService)?.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            transition: 'opacity 0.5s',
          }}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Fatima Photography. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
