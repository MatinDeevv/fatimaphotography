'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

interface CircularGalleryProps {
  imageGroups: { id: string; name: string; images: string[] }[];
}

const CircularGallery: React.FC<CircularGalleryProps> = ({ imageGroups }) => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  const handleGroupClick = (groupId: string) => {
    setExpandedGroup(groupId);
    setAutoplayEnabled(false);
  };

  const handleClose = () => {
    setExpandedGroup(null);
    setAutoplayEnabled(true);
  };

  const visibleGroups = expandedGroup
    ? imageGroups.filter((group) => group.id === expandedGroup)
    : imageGroups;

  const activeImages = expandedGroup
    ? visibleGroups[0]?.images || []
    : [];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      {/* No px-4 / md:px-8 here */}
      <h1 className="text-3xl sm:text-5xl font-serif mt-16 sm:mt-24 text-gray-900 text-center">
        THE LATEST SHOOTS
      </h1>
      <h3 className="text-lg sm:text-xl font-serif mb-12 sm:mb-16 text-gray-900 text-center">
      SERVICING TORONTO, MISSISSAUGA, KITCHENER, LONDON, WINDSOR, AND SURROUNDING AREAS.
      </h3>

      {/* Removed max-w-7xl, set spaceBetween to 0 */}
      <Swiper
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={0} 
        breakpoints={{
          40: { slidesPerView: 1, spaceBetween: 0 },
          640: { slidesPerView: 1, spaceBetween: 0 },
          768: { slidesPerView: 2, spaceBetween: 0 },
          1024: { slidesPerView: 3, spaceBetween: 0 },
        }}
        modules={[Autoplay]}
        className="w-full h-full mb-24" // full width, no horizontal margin
      >
        {expandedGroup === null
          ? visibleGroups.map((group) => (
              <SwiperSlide
                key={group.id}
                className="flex items-center justify-center"
                onClick={() => handleGroupClick(group.id)}
              >
                <div className="relative flex items-center justify-center w-full max-w-[90%] sm:max-w-[500px] h-[400px] sm:h-[550px] md:h-[650px] cursor-pointer">
                  {group.images.map((image, index) => {
                    const totalImages = group.images.length;
                    const zIndex = totalImages - index;
                    return (
                      <div
                        key={index}
                        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg opacity-90 hover:opacity-100"
                        style={{
                          transform: `rotate(${index * 6 - 6}deg)`,
                          zIndex,
                        }}
                      >
                        <img
                          src={image}
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    );
                  })}
                </div>
              </SwiperSlide>
            ))
          : activeImages.map((image, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div className="relative flex items-center justify-center w-full max-w-[90%] sm:max-w-[600px] h-[500px] sm:h-[700px] md:h-[800px]">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                  <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600"
                  >
                    Close
                  </button>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default CircularGallery;
