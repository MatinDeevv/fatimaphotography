'use client';

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

interface CarouselProps {
  images: string[];
}

const ClientCarousel: React.FC<CarouselProps> = React.memo(({ images }) => {
  // Compute allowSwipe once. Disable touch interactions if user agent indicates
  // Instagram's in-app browser or Safari (excluding Chrome).
  const allowSwipe = useMemo(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent;
      return !(ua.includes('Instagram') || (ua.includes('Safari') && !ua.includes('Chrome')));
    }
    return true;
  }, []);

  // Memoize breakpoints to avoid recreating the object on every render.
  const breakpoints = useMemo(
    () => ({
      60: { slidesPerView: 1 },
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }),
    []
  );

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
      allowTouchMove={allowSwipe}
      breakpoints={breakpoints}
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
});

ClientCarousel.displayName = 'ClientCarousel';

ClientCarousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default ClientCarousel;
