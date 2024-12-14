'use client';

import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';

// Placeholder SEO Data
const seoData = {
  siteName: 'Fatima Photography',
};

// Packages Data
const packages = [
  {
    id: 1,
    title: 'Weddings',
    price: '$6650',
    description: 'For couples looking to receive full day coverage for a large wedding with elegant service.',
    details: [
      '8 hour minimum',
      '40+ guests',
      'Professional Editing & Retouching',
      'Starting at $6650',
    ],
    image: '/pictures-gallery/wedding.jpg',
    moreInfo: 'Our wedding packages are designed to capture the full essence of your special day with cinematic quality and artistic flair.',
  },
  {
    id: 2,
    title: 'Micro Weddings',
    price: '$2950',
    description: 'Small, intimate weddings for couples seeking a more personal touch with close friends and family.',
    details: [
      '3 hour minimum',
      'Less than 40 guests',
      'Documentary-style photography',
      'Starting at $2950',
    ],
    image: '/pictures-gallery/kids.jpg',
    moreInfo: 'Perfect for small gatherings, capturing timeless moments in a relaxed, candid style.',
  },
  {
    id: 3,
    title: 'Minimonies',
    price: '$1250',
    description: 'Quick, intimate ceremonies, ideal for couples who want a private and memorable experience.',
    details: [
      '1-2 hours',
      '6-10 guests',
      'Simple & Elegant Ceremony Coverage',
      'Starting at $1250',
    ],
    image: '/pictures-gallery/7.jpg',
    moreInfo: 'We specialize in short, yet intimate wedding ceremonies that will be cherished forever.',
  },
  {
    id: 4,
    title: 'Engagements, Proposals, & Families',
    price: '$850',
    description: 'Perfect for engagement sessions, proposals, and family portraits with a professional touch.',
    details: [
      '1-2 hours',
      'Up to 5 people',
      'Studio or outdoor options available',
      'Starting at $850',
    ],
    image: '/pictures-gallery/family.jpg',
    moreInfo: 'Capture the excitement and joy of your engagement or family moments with beautiful and high-quality photography.',
  },
];

const addOns = [
  'Engagement Session',
  'Second Shooter',
  'Additional Hours',
  'Wedding Albums',
  'Rehearsal Dinner Coverage',
  'Travel Availability',
];

const weddingIncludes = [
  'Printing Rights',
  'Vendor Recommendations',
  'Wedding Day Guide',
  'Timeline Assistance',
  'Gallery Delivery Within 8 Weeks',
];

export default function PackagesPage() {
  const [hoveredPackage, setHoveredPackage] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>Packages | Fatima Photography</title>
        <meta name="description" content="Explore our premium photography packages, tailored for different events." />
        <meta name="keywords" content="photography, packages, wedding, portrait, event, family, engagement" />
      </Head>

      {/* Navbar */}
      <nav className="bg-white fixed top-0 w-full z-50 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600">
            {seoData.siteName}
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 text-lg font-medium">
            {['Home', 'Investment', 'Stories', 'Contact'].map((link) => (
              <li key={link}>
                <Link
                  href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                  className="text-gray-600 hover:text-blue-600 transition"
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
        className="h-96 bg-cover bg-center flex items-center justify-center font-body text-black"
        style={{ backgroundImage: "url('/hero-image.jpg')" }}
      >
        <h1 className="text-5xl font-extrabold drop-shadow-lg">Explore Our Wedding Packages</h1>
      </header>

      {/* Packages Grid */}
      <main className="container mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500"
            onMouseEnter={() => setHoveredPackage(pkg.id)}
            onMouseLeave={() => setHoveredPackage(null)}
          >
            <img src={pkg.image} alt={pkg.title} className="w-full h-64 object-cover rounded-md" />
            <h2 className="text-2xl font-bold text-center text-gray-800 mt-4">{pkg.title}</h2>
            <p className="text-center text-xl font-semibold text-gray-700">{pkg.price}</p>
            <p className="mt-4 text-center text-gray-600">{pkg.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              {pkg.details.map((detail, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-green-500 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12l5 5L19 7" />
                  </svg>
                  {detail}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-center font-medium text-gray-800">{pkg.moreInfo}</p>
            <div className="flex justify-center mt-6">
              <button className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Link href="/contact">Book Now</Link>
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* Wedding Packages Include */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Wedding Packages Include</h2>
          <ul className="list-disc text-left text-lg text-gray-700 mx-auto w-3/4">
            {weddingIncludes.map((item, index) => (
              <li key={index} className="mb-2">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Add-Ons & Extras Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Add-Ons & Extras</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {addOns.map((addOn, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800">{addOn}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Fatima Photography. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
