'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CircularGallery from '@/app/components/CircularGallery';
import Review from '@/app/components/Reviews';
import CompactContactSection from '@/app/components/CompactContactSection';
import WhyUs from '@/app/components/WhyUs';
import NavBar from '@/app/components/NavBar';
import Image from 'next/image';
const imageGroups = [
  {
    id: 'couple1',
    name: 'Ali and Azade',
    images: [
      'story-1/couple1-photo1.jpg',
      'story-1/couple1-photo2.jpg',
      'story-1/couple1-photo3.jpg',
      'story-1/couple1-photo4.jpg',
      'story-1/couple1-photo5.jpg',
    ],
  },
  {
    id: 'couple6',
    name: 'Areefa & Hasan',
    images: [
      'story-6/ar05.jpg',
      'story-6/ar03.jpg',
      'story-6/ar04.jpg',
      'story-6/ar01.jpg',
      'story-6/ar02.jpg',
    ],
  },
  {
    id: 'couple5',
    name: 'Saba & Vaji',
    images: [
      'story-5/sab01.jpg',
      'story-5/sab02.jpg',
      'story-5/sab03.jpg',
      'story-5/sab04.jpg',
      'story-5/sab05.jpg',
    ],
  },
  {
    id: 'couple2',
    name: 'Ali and Azade',
    images: [
      'story-2/Her03.jpg',
      'story-2/Her04.jpg',
      'story-2/Her05.jpg',
      'story-2/Her06.jpg',
      'story-2/Her07.jpg',
    ],
  },
  {
    id: 'couple3',
    name: 'Ali and Azade',
    images: [
      'story-3/Pun03.jpg',
      'story-3/Pun13.jpg',
      'story-3/Pun06.jpg',
      'story-3/Pun05.jpg',
      'story-3/Pun04.jpg',
    ],
  },
  {
    id: 'couple4',
    name: 'Haniyeh & Shayan',
    images: [
      'story-4/4.jpg',
      'story-4/5.jpg',
      'story-4/6.jpg',
      'story-4/2.jpg',
      'story-4/3.jpg',
    ],
  },
];

export default function Page() {
  const [images, setImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/randomimages');
        const data: string[] = await response.json();
        setImages(data);
      } catch (err) {
        console.error('Error fetching images:', err);
      }
    }
    fetchImages();
  }, []);

  return (
    <>
      <Head>
        <title>Fatima Photography</title>
        <meta name="description" content="Capturing life's precious moments" />
      </Head>

      <main className="bg-green-950 text-white font-body">
        <NavBar />

        <header className="relative h-screen mb-40">
          {images.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 800 }}
              slidesPerView={3}
              loop
              breakpoints={{
                60: { slidesPerView: 1 },
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="h-full w-full"
              spaceBetween={0}
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className="h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${src})` }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex justify-center items-center h-full bg-gray-200 text-gray-600">
              <p>No images available.</p>
            </div>
          )}
        </header>

        <section className="flex items-center mt-30 mb-40 justify-center py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold mt-44 mb-0">
                My name is <span className="text-green-200">FATIMA</span>
              </h1>
              <p className="text-lg text-white leading-relaxed">
              I strive to freeze moments that matter the most. I'm a PhD student of mechanical engineering and a passionate photographer. I use my engineering skills at photography to capture perfect view of your beautiful moments.
              </p>
            </div>
            <div>
            <img src="about.jpg" alt="Fatima" className="w-full h-auto max-w-full object-cover rounded-lg shadow-lg" />


            </div>
          </div>
        </section>

        <CircularGallery imageGroups={imageGroups} />
        <Review />
        <WhyUs />
        <CompactContactSection />

        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="container mx-auto flex justify-center items-center px-4">
            <div className="text-base font-medium text-gray-700 text-center">
              Windsor, London, Toronto |{' '}
              <a
                href="mailto:fashamifatemeh@gmail.com"
                className="hover:text-green-600 transition"
              >
                fashamifatemeh@gmail.com
              </a>{' '}
              |{' '}
              <a href="tel:2267596075" className="hover:text-green-600 transition">
                Tel: 226-759-6075
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
