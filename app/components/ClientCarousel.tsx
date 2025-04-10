'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Compute constants outside the component when possible.
const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
const isIOS =
  typeof navigator !== 'undefined' &&
  (/iPad|iPhone|iPod/.test(navigator.platform) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
const disableSwipe =
  userAgent.includes('Instagram') ||
  (isIOS && userAgent.includes('Safari') && !userAgent.includes('Chrome'));
const allowTouchMove = !disableSwipe;

// Define breakpoints as a constant object.
const breakpoints = {
  60: { slidesPerView: 1 },
  640: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
};

interface CarouselProps {
  images: string[];
}

const ClientCarousel: React.FC<CarouselProps> = ({ images }) => {
  // If images are not loaded yet, display a fallback loading text
  if (!images || images.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );
  }

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        waitForTransition: false,
      }}
      speed={500}
      slidesPerView={3}
      loop
      allowTouchMove={allowTouchMove}
      breakpoints={breakpoints}
      observer
      observeParents
      className="h-full w-full"
      spaceBetween={0}
    >
      {images.map((src, idx) => (
        <SwiperSlide key={idx}>
          <div
            className="h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${src})` }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ClientCarousel;
