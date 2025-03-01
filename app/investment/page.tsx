'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs/lib/anime.es.js';
import NavBar from '@/app/components/NavBar';
import CompactContactSection from '@/app/components/CompactContactSection';
import Footer from '@/app/components/Footer';
import SpecialOffersBanner from '../components/SpecialOffersBanner';

// 1) Define an interface for your package shape
interface PackageInfo {
  title: string;
  description: string;
  pricing: string;
  pictures: string[]; // Must be an array of strings
  extras: string[] | string; // Extras can be an array of strings or just a string
}

// 2) Define an interface for your PackageSection props
interface PackageSectionProps {
  pkg: PackageInfo;
}

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
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-white text-black font-body">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/Investmdent.jpg)' }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="relative flex justify-center items-center h-full">
        <div className="text-center px-4">
          <motion.h1
            className="text-5xl md:text-6xl text-white font-bold mb-4 hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            INVESTMENT
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl text-white font-bold mx-auto leading-relaxed hero-description"
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

// 3) Use the PackageSectionProps interface here
const PackageSection = ({ pkg }: PackageSectionProps) => {
  const { title, description, pricing, pictures, extras } = pkg;

  return (
    <section className="py-20 bg-green-950 text-white">
      <div className="container mx-auto px-6">
        {/* Text Content */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{title}</h2>
          <p className="text-xl font-sans">{description}</p>
          <p className="text-2xl font-bold my-2">{pricing}</p>

          {/* extras can be array or string */}
          {Array.isArray(extras) ? (
            extras.map((item: string, idx: number) => (
              <p key={idx} className="text-md font-sans my-1">
                {item}
              </p>
            ))
          ) : (
            <p className="text-md font-sans">{extras}</p>
          )}
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pictures.map((imgUrl: string, i: number) => (
            <div key={i} className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={imgUrl}
                alt={`package image ${i}`}
                className="w-full h-full object-cover transition-transform transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => <CompactContactSection />;



// 4) Change the type of packageDetails to PackageInfo[]
const InvestmentPage = () => {
  // Remove the 'public' prefix —
  // place these images in 'public/story-2', 'public/story-4', etc.
  // Then reference them as '/story-2/Her08.png', etc.
  const packageDetails: PackageInfo[] = [
    {
      title: 'WEDDING',
      description: 'Half day wedding coverage beginning with 6 hours',
      pricing: 'Starting at $2,200',
      pictures: ['/story-2/Her08.png', '/story-4/L02.jpg', '/story-4/6.jpg'],
      extras: [
        'All wedding packages include 1 photographer, 1 videographer, free consultation meeting, and a beautiful online gallery of memories.',
        'All taken photos, 300 edited photos, a 1-minute highlight video, and a fully mixed video will be provided.'
      ]
    },
    {
      title: 'ENGAGEMENT , PREWEDDING',
      description: 'Session starting with 2 hours photography coverage',
      pricing: 'Starting at $400',
      pictures: ['/story-4/2.jpg', '/story-3/Pun06.jpg', '/story-5/sab06.jpg'],
      extras: 'All engagement sessions include a professional gallery of memories.'
    },
    {
      title: 'MATERNITY',
      description: 'Family and maternity sessions for precious moments',
      pricing: 'Starting at $400',
      pictures: ['/Mat/Mat01.png', '/Mat/Mat02.png', '/Mat/Mat03.png'],
      extras:
        'Sessions include a professional gallery of memories for families and expectant mothers.'
    }
    // More packages can go here ...
  ];

  return (
    <main className="bg-green-950 text-white font-['Playfair Display', serif]">
      <NavBar />
      <HeroSection />

      {/* Render only 3 packages max */}
      {packageDetails.slice(0, 3).map((pkg, index) => (
        <PackageSection key={index} pkg={pkg} />
      ))}

      <CTASection />
      <Footer />
    </main>
  );
};

export default InvestmentPage;