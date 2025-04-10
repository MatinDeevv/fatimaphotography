'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface CarouselProps {
  images: string[];
}

export default function ClientCarousel({ images }: CarouselProps) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
        waitForTransition: false,
      }}
      slidesPerView={3}
      loop
      breakpoints={{
        60: { slidesPerView: 1 },
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
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
}
