'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '@/app/components/NavBar';
import CompactContactSection from '@/app/components/CompactContactSection';
import Footer from '@/app/components/Footer';

// Data for Floating Hearts Animation
const floatingHeartsData = [
  { key: 1, style: { top: '5rem', left: '2.5rem' }, emoji: '❤️', classes: 'text-red-300 text-6xl' },
  { key: 2, style: { top: '10rem', right: '4rem' }, emoji: '💖', classes: 'text-pink-400 text-4xl' },
  { key: 3, style: { bottom: '5rem', left: '6rem' }, emoji: '💕', classes: 'text-red-400 text-5xl' },
  { key: 4, style: { bottom: '8rem', right: '8rem' }, emoji: '💞', classes: 'text-pink-300 text-7xl' },
];

// Hero Section Component
const HeroSection = () => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const heartsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate the title
    anime({
      targets: titleRef.current,
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo'
    });

    // Animate the description
    anime({
      targets: descriptionRef.current,
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutExpo'
    });

    // Animate all floating hearts
    anime({
      targets: heartsRefs.current,
      translateY: [-10, 10],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 2000
    });
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-red-100 font-body">
      {/* Background Image and Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/valentine-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-pink-600 bg-opacity-40" />

      {/* Main Hero Content */}
      <div className="relative flex justify-center items-center h-full">
        <div className="text-center px-4">
          <motion.h1
            ref={titleRef}
            className="text-5xl md:text-6xl text-white font-bold mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            VALENTINE&apos;S DAY SPECIAL ❤️
          </motion.h1>
          <motion.p
            ref={descriptionRef}
            className="text-lg md:text-xl max-w-2xl text-white font-bold mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Celebrate love with a stunning photoshoot, capturing your most romantic moments. 💘✨
          </motion.p>
        </div>
      </div>

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingHeartsData.map((heart, index) => (
          <div
            key={heart.key}
            ref={(el) => {
              if (el) {
                heartsRefs.current[index] = el;
              }
            }}
            className={`absolute ${heart.classes}`}
            style={heart.style}
          >
            {heart.emoji}
          </div>
        ))}
      </div>
    </section>
  );
};

// Offer Section Component
const OfferSection = () => {
  const galleryImages = [

    { src: '/reviews/IMG_6094.JPG', alt: 'Valentine Special 2' },
    { src: '/reviews/IMG_6105.JPG', alt: 'Valentine Special 3' },
    { src: '/reviews/IMG_6111.JPG', alt: 'Valentine Special 3' },
    { src: '/reviews/IMG_6492.JPG', alt: 'Valentine Special 1' },
    { src: '/reviews/IMG_6481.JPG', alt: 'Valentine Special 2' },
    { src: '/reviews/IMG_6485.JPG', alt: 'Valentine Special 1' },

  ];

  return (
    <section className="py-20 bg-pink-100 font-body text-red-900 text-center">
      <div className="container font-body mx-auto px-6">

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
  {/* Photography Session Card */}
  <div className="flex-1 bg-white shadow-lg font-body rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105">
    <h3 className="text-2xl font-bold font-body mb-4">Photography Session</h3>
    <ul className="list-disc list-inside font-body text-left space-y-2">
      <li>
        <span className="font-semibold font-body">40 Minutes</span> – <span className=" font-body font-semibold">$250</span>
      </li>
      <li>All original photos</li>
      <li>15 edited photos</li>
    </ul>
  </div>

  {/* Videography Session Card */}
  <div className="flex-1 bg-white font-body shadow-lg rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105">
    <h3 className="text-2xl font-bold font-body mb-4">Videography Session</h3>
    <ul className="list-disc list-inside font-body text-left space-y-2">
      <li>
        <span className="font-semibold font-body">1/5 Hour - $400</span>
      </li>
      <li className='font-body'>Highlight video</li>
      <li className='font-body'>Edited video</li>
    </ul>
  </div>
</div>

{/* Image Gallery */}
<div className="grid grid-cols-1 font-body sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
  {galleryImages.map((image, index) => (
    <div
      key={index}
      className="relative font-body overflow-hidden rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={500}
        height={400}
        className="object-cover"
      />
    </div>
  ))}
</div>

        {/* Booking Button */}
        <div className="mt-12">
          <Link href="/contact">
            <motion.button
              className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-red-500 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Book Your Session Now"
            >
              💌 Book Your Session Now
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Offers Page Component
const OffersPage = () => {
  return (
    <main className="bg-pink-100 text-red-900">
      <NavBar />
      <HeroSection />
      <OfferSection />
      <CompactContactSection />
      <Footer />
    </main>
  );
};

export default OffersPage;
