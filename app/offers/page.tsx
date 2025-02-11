'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';
import NavBar from '@/app/components/NavBar';
import CompactContactSection from '@/app/components/CompactContactSection';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

// Valentine’s Hero Section
const HeroSection = () => {
  useEffect(() => {
    anime({
      targets: '.hero-title',
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.hero-description',
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutExpo'
    });

    anime({
      targets: '.floating-hearts',
      translateY: [-10, 10],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      duration: 2000
    });
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-red-100 text-black font-body">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/valentine-bg.jpg)' }}
      />
      <div className="absolute inset-0 bg-pink-600 bg-opacity-40" />
      <div className="relative flex justify-center items-center h-full">
        <div className="text-center px-4">
          <motion.h1
            className="text-5xl md:text-6xl text-white font-bold mb-4 hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            VALENTINE&apos;S DAY SPECIAL ❤️
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl text-white font-bold mx-auto leading-relaxed hero-description"
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
        <div className="floating-hearts absolute top-20 left-10 text-red-300 text-6xl">❤️</div>
        <div className="floating-hearts absolute top-40 right-16 text-pink-400 text-4xl">💖</div>
        <div className="floating-hearts absolute bottom-20 left-24 text-red-400 text-5xl">💕</div>
        <div className="floating-hearts absolute bottom-32 right-32 text-pink-300 text-7xl">💞</div>
      </div>
    </section>
  );
};

// Valentine’s Offer Section
const OfferSection = () => {
  return (
    <section className="py-20 bg-pink-100 font-body text-red-900 text-center">
      <div className="container font-body mx-auto px-6">
        <h2 className="text-4xl font-body font-bold mb-6">Valentine&apos;s Love Package 💕</h2>
        
        <p className='text-2xl font-body max-w-2xl mx-auto'>Mini Session starting with 40 minutes PhotoGraphy coverage  $250</p>
        <p className='text-2xl font-body max-w-2xl mx-auto'>Mini Session starting with 1/5 hour VideoGraphy coverage $400</p>

        <div className="text-3xl font-bold text-red-700 my-4">💖 15% OFF Limited Time! 💖</div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="reviews/IMG_6481.JPG"
              alt="Valentine Special 1"
              className="w-full h-full object-cover transition-transform transform hover:scale-105"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="reviews/IMG_6094.JPG"
              alt="Valentine Special 2"
              className="w-full h-full object-cover transition-transform transform hover:scale-105"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <img
              src="reviews/IMG_6487.JPG"
              alt="Valentine Special 3"
              className="w-full h-full object-cover transition-transform transform hover:scale-105"
            />
          </div>
        </div>

        {/* Booking Button */}
        <div className="mt-12">
          <Link href="/contact">
            <motion.button
              className="bg-red-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-red-500 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💌 Book Your Session Now
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Offers Page
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
