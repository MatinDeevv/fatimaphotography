'use client';

import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <>
      {/* Hidden preloaders: fetch the images instantly */}
      <div className="hidden">
        {images.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Preload ${idx}`}
            width={10}
            height={10}
            priority
          />
        ))}
      </div>

      <header className="relative h-screen mb-40 overflow-hidden">
        {images.length > 0 ? (
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            slidesPerView={3}
            loop
            breakpoints={{
              60: { slidesPerView: 1 },
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="h-full w-full"
            spaceBetween={0}
          >
            {images.map((src, idx) => (
              <SwiperSlide key={idx} className="relative h-full">
                <div className="relative h-full w-full">
                  <Image
                    src={src}
                    alt={`Slide ${idx}`}
                    fill
                    className="object-cover"
                    priority
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="flex justify-center items-center h-full bg-gray-200 text-gray-600">
            <p>No images available.</p>
          </div>
        )}
      </header>
    </>
  );
};

export default Carousel;
