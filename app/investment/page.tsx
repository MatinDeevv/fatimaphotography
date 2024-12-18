// pages/investment.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/app/components/NavBar';
import Link from 'next/link';

const fetchImages = async () => {
  const response = await fetch('/api/randomimages');
  const data: string[] = await response.json();
  return data;
};

const HeroSection = () => (
  <section className="relative h-screen overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: 'url(/hero-placeholder.jpg)' }}
    ></div>
    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    <div className="relative flex justify-center items-center h-full">
      <div className="text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          INVESTMENT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          Let’s chat about your photography investment and how we might play a role in telling your
          story.
        </motion.p>
      </div>
    </div>
  </section>
);

const PackageSection = ({ group, index }: { group: string[]; index: number }) => {
  const imageAnimation = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8 } },
    hover: { scale: 1.05, rotate: 2, transition: { duration: 0.3 } }
  };

  const weightedShapeClasses = () => {
    const shapeClasses = [
      'rounded-lg',
      'rounded-md',
      'clip-path-[polygon(0%_0%,_50%_100%,_100%_0%)]',
      'clip-path-[ellipse(50%_40%_at_50%_50%)]'
    ];
    return shapeClasses[Math.floor(Math.random() * shapeClasses.length)];
  };

  return (
    <section
      className={`py-20 relative ${index % 2 === 0 ? 'bg-white text-black' : 'bg-green-900 text-white'}`}
    >
      <div className="max-w-7xl mx-auto relative grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="z-10 px-4"
        >
          <h2 className="text-4xl font-bold mb-6">{`PACKAGE ${index + 1}`}</h2>
          <p className="text-lg leading-relaxed mb-6">
            {`Our package ${index + 1} offers a unique storytelling experience with ${
              3 + index
            } hours of coverage, 2 photographers, personalized galleries, and consultation to capture your dream moments.`}
          </p>
          <p className="text-2xl font-bold">Starting at ${2500 + index * 500}</p>
        </motion.div>
        <div className="relative h-[500px] md:h-[700px] w-full">
          {group.map((image, i) => (
            <motion.div
              key={i}
              variants={imageAnimation}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className={`absolute shadow-lg ${weightedShapeClasses()} transition-transform duration-300 ease-in-out ${
                i === 2
                  ? 'top-0 left-1/3 w-2/3 h-3/4 z-10'
                  : i === 0
                    ? 'top-0 left-0 w-1/3 h-1/2'
                    : 'bottom-0 right-0 w-1/3 h-1/2 rotate-3'
              }`}
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></motion.div>
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

const InvestmentPage = () => {
  const [images, setImages] = useState<string[][]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const data = await fetchImages();
      const groupedImages = [];
      for (let i = 0; i < data.length; i += 5) {
        groupedImages.push(data.slice(i, i + 5));
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
