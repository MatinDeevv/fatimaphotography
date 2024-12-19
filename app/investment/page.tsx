'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';
import NavBar from '@/app/components/NavBar';
import Link from 'next/link';

// Placeholder API endpoint for random images (replace with your actual route)
const fetchRandomImages = async () => {
  const response = await fetch('/api/randomimages');
  const data = await response.json();
  return data;
};

const HeroSection = () => {
  useEffect(() => {
    anime({
      targets: '.hero-title',
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: 'easeOutExpo',
    });

    anime({
      targets: '.hero-description',
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutExpo',
    });
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-black text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/hero-placeholder.jpg)' }}
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative flex justify-center items-center h-full">
        <div className="text-center px-4">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4 hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            INVESTMENT
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed hero-description"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Let’s chat about your photography investment and how we might play a role in telling
            your story.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

// Package Section with more apart, larger margins, and random image sizes/positions
const PackageSection = ({ group, index }: { group: string[]; index: number }) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Trigger anime.js animations when images load
    anime({
      targets: `.package-${index} img`,
      scale: [0.5, 1],
      opacity: [0, 1],
      duration: 1000,
      delay: anime.stagger(300),
      easing: 'easeOutExpo',
    });
  }, [index]);

  const packageDetails = [
    {
      title: 'WEDDINGS',
      description: 'Full day wedding coverage beginning with 6 hours',
      pricing: 'Starting at $4,600',
      extras:
        'All wedding packages include 2 photographers, consultations, and a beautiful online gallery of memories.',
    },
    {
      title: 'ELOPEMENTS',
      description: 'Elopements beginning with 2 hours of coverage',
      pricing: 'Starting at $2,500',
      extras:
        'All elopement packages include 2 photographers, planning assistance, and an online gallery.',
    },
    {
      title: 'ENGAGEMENT + COUPLES',
      description: 'All sessions include 2 photographers and an online gallery',
      pricing: 'Flat rate of $750',
      extras: 'All engagement sessions include a professional gallery of memories.',
    },
    {
      title: 'FAMILY + MATERNITY',
      description: 'Family and maternity sessions for precious moments',
      pricing: 'Flat rate of $850',
      extras: 'Sessions include a professional gallery of memories for families and expectant mothers.',
    },
    {
      title: 'BOUDOIR',
      description: 'Celebrate yourself with a luxury boudoir session',
      pricing: 'Starting at $1,200',
      extras: 'Boudoir sessions include professional retouching and a private gallery.',
    },
  ];

  const currentPackage = packageDetails[index % packageDetails.length];

  // Function to generate random size and position for images inside the section
  const getRandomStyle = () => {
    const width = Math.floor(Math.random() * (700 - 150 + 1)) + 150; // Random width between 150 and 700
    const height = Math.floor(Math.random() * (800 - 300 + 1)) + 300; // Random height between 300 and 800
    const top = Math.random() * 600; // Larger random vertical position
    const left = Math.random() * 800; // Larger random horizontal position
    const rotate = Math.random() * 10 - 5; // Random rotation between -5 and 5 degrees

    return {
      width: `${width}px`,
      height: `${height}px`,
      top: `${top}px`,
      left: `${left}px`,
      transform: `rotate(${rotate}deg)`, // Random rotation for some dynamic feel
    };
  };

  return (
    <section className={`py-20 relative text-white`}>
      <div className="max-w-7xl mx-auto relative">
        {/* Centered Text Content */}
        <motion.div
          className="text-center mx-auto space-y-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-bold mb-6">{currentPackage.title}</h2>
          <p className="text-lg">{currentPackage.description}</p>
          <p className="text-2xl font-bold">{currentPackage.pricing}</p>
          <p className="text-sm">{currentPackage.extras}</p>
        </motion.div>

        {/* Custom Image Layout with More Apart and Larger Margins */}
        <div className={`package-${index} relative`}>
          {group.map((image, i) => {
            const randomStyle = getRandomStyle(); // Get random style for each image
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className="absolute"
                style={{
                  ...randomStyle, // Apply the random styles
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '15px',
                  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
                }}
              ></motion.div>
            );
          })}
        </div>
      </div>
      <hr className="my-16 border-t-2 border-gray-300" />
    </section>
  );
};

// Call to Action Section
const CTASection = () => (
  <section className="py-16 bg-black text-center text-white px-6">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl mx-auto"
    >
      <h2 className="text-4xl font-bold mb-4">READY TO CAPTURE YOUR STORY?</h2>
      <Link
        href="/contact"
        className="inline-block px-8 py-3 mt-4 bg-green-800 text-white rounded hover:bg-green-700"
      >
        Contact Us
      </Link>
    </motion.div>
  </section>
);

// Main Investment Page
const InvestmentPage = () => {
  const [images, setImages] = useState<string[][]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const data = await fetchRandomImages();
      const groupedImages = [];
      for (let i = 0; i < data.length; i += 3) {
        groupedImages.push(data.slice(i, i + 3));
      }
      setImages(groupedImages);
    };
    loadImages();
  }, []);

  return (
    <main className="bg-green-950 text-white font-[\'Playfair Display\', serif]">
      <NavBar />
      <HeroSection />
      {images.map((group, index) => (
        <PackageSection key={index} group={group} index={index} />
      ))}
      <CTASection />
    </main>
  );
};

export default InvestmentPage;
