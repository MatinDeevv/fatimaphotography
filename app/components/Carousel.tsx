import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <header className="relative h-screen mb-40">
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
  );
};

export default Carousel;