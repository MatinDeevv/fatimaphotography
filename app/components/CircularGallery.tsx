"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

interface CircularGalleryProps {
  imageGroups: { id: string; name: string; images: string[] }[];
}

const CircularGallery: React.FC<CircularGalleryProps> = ({ imageGroups }) => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  const handleGroupClick = (groupId: string) => {
    setExpandedGroup(groupId); // Expand the selected group
    setAutoplayEnabled(false); // Pause autoplay
  };

  const handleClose = () => {
    setExpandedGroup(null); // Collapse the expanded group
    setAutoplayEnabled(true); // Resume autoplay for all groups
  };

  // Determine which images to display based on the expanded group
  const visibleGroups = expandedGroup
    ? imageGroups.filter((group) => group.id === expandedGroup)
    : imageGroups;

  const activeImages = expandedGroup
    ? visibleGroups[0]?.images || [] // Show only expanded group's images
    : [];

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-serif  mt-24 text-gray-900">THE LATEST SHOTS</h1>
      <h3 className="text-xl font-serif  mb-16 text-gray-900">SERVIVCING TORONTO, MISSISSUGA, KITCHNER, LONDON, WINDSOR AND SROUNDINGS</h3>
      <Swiper
        loop={true}
        autoplay={{ delay: 1500, disableOnInteraction: false }} 
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={50}
        breakpoints={{
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay]}
        className="w-full mb-32"
      >
        {expandedGroup === null
          ? visibleGroups.map((group) => (
              <SwiperSlide
                key={group.id}
                className="flex items-center justify-center"
                onClick={() => handleGroupClick(group.id)}
              >
                <div className="relative flex items-center justify-center w-full max-w-[500px] h-[650px] cursor-pointer">
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
              <SwiperSlide
                key={index}
                className="flex items-center justify-center"
              >
                <div className="relative flex items-center justify-center w-full max-w-[600px] h-[800px]">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                  <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600"
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
