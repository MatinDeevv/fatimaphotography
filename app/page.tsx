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
import Footer from '@/app/components/Footer';
import Carousel from './components/Carousel';
import SpecialOffersBanner from './components/SpecialOffersBanner';
import LoadingScreen from './LoadingScreen';
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
      'story-1/couple1-photo5.jpg'
    ]
  },
  {
    id: 'couple6',
    name: 'Areefa & Hasan',
    images: [
      'story-6/ar05.jpg',
      'story-6/ar03.jpg',
      'story-6/ar04.jpg',
      'story-6/ar01.jpg',
      'story-6/ar02.jpg'
    ]
  },
  {
    id: 'couple5',
    name: 'Saba & Vaji',
    images: [
      'story-5/sab01.jpg',
      'story-5/sab02.jpg',
      'story-5/sab03.jpg',
      'story-5/sab04.jpg',
      'story-5/sab05.jpg'
    ]
  },
  {
    id: 'couple2',
    name: 'Ali and Azade',
    images: [
      'story-2/Her03.jpg',
      'story-2/Her04.jpg',
      'story-2/Her05.jpg',
      'story-2/Her06.jpg',
      'story-2/Her07.jpg'
    ]
  },
  {
    id: 'couple3',
    name: 'Ali and Azade',
    images: [
      'story-3/Pun03.jpg',
      'story-3/Pun13.jpg',
      'story-3/Pun06.jpg',
      'story-3/Pun05.jpg',
      'story-3/Pun04.jpg'
    ]
  },
  {
    id: 'couple4',
    name: 'Haniyeh & Shayan',
    images: ['story-4/4.jpg', 'story-4/5.jpg', 'story-4/6.jpg', 'story-4/2.jpg', 'story-4/3.jpg']
  }
];

export default function Page() {
  const [images, setImages] = useState<string[]>([]);

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

      <main className="bg-green-950 text-white font">
        <NavBar />

        <header className="relative h-screen mb-40">
          {/* اینجا فقط لودینگ لایه بالاییه، بدون گیت */}
          <LoadingScreen />
          <Carousel images={images} />
        </header>

        <section className="flex items-center mt-30 mb-40 justify-center py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold mt-44 mb-0">
                My name is <span className="text-green-200">FATIMA</span>
              </h1>
              <p className=" text-white leading-relaxed font-sans text-xl">
                I strive to freeze moments that matter the most. I&apos;m a PhD student of
                mechanical engineering and a passionate photographer. I use my engineering skills at
                photography to capture perfect view of your beautiful moments.
              </p>
            </div>
            <div>
              <img
                src="about.png"
                alt="fatima"
                className="w-full h-full max-w-full object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <CircularGallery imageGroups={imageGroups} />
        <Review />
        <WhyUs />
        <CompactContactSection />
        <Footer />
      </main>
    </>
  );
}
