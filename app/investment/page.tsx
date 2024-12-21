'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';
import NavBar from '@/app/components/NavBar';
import Link from 'next/link';

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

const PackageSection = ({ group, index }: { group: string[]; index: number }) => {
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

  return (
    <section className="py-20 bg-green-950 text-white">
      <div className="container mx-auto px-6">
        {/* Text Content */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{currentPackage.title}</h2>
          <p className="text-lg">{currentPackage.description}</p>
          <p className="text-2xl font-bold my-2">{currentPackage.pricing}</p>
          <p className="text-sm">{currentPackage.extras}</p>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {group.map((image, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg shadow-lg"
            >
              <img
                src={image}
                alt={`Package image ${i}`}
                className="w-full h-full object-cover transition-transform transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

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

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 py-6">
    <div className="container mx-auto flex justify-center items-center px-4">
      <div className="text-base font-medium text-gray-700 text-center">
        Windsor, London, Toronto |{' '}
        <a
          href="mailto:fashamifatemeh@gmail.com"
          className="hover:text-blue-600 transition"
        >
          fashamifatemeh@gmail.com
        </a>{' '}
        |{' '}
        <a href="tel:2267596075" className="hover:text-blue-600 transition">
          Tel: 226-759-6075
        </a>
      </div>
    </div>
  </footer>
);

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
      <Footer />
    </main>
  );
};

export default InvestmentPage;
