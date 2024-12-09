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

  const handleDoubleClick = () => {
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
    <div className="flex flex-col mb-0  items-center justify-center bg-gray-100 ">
      <h1 className="text-4xl font-serif mb-16 text-gray-900">Our Photo Gallery</h1>
      <Swiper
        loop={true} // Enable looping only when a stack is expanded
        autoplay={
          autoplayEnabled
            ? {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        slidesPerView={3} // Show 3 slides at a time
        centeredSlides={true} // Center the middle slide
        spaceBetween={0} // Remove margin between slides
        modules={[Autoplay]}
        className="w-full"
        style={{
          height: "calc(100vh - 200px)", // Swiper takes up most of the screen
        }}
      >
        {expandedGroup === null
          ? visibleGroups.map((group) => (
              <SwiperSlide
                key={group.id}
                className="flex items-center justify-center"
                onClick={() => handleGroupClick(group.id)}
              >
                <div className="relative flex items-center justify-center w-full max-w-[400px] h-[400px] cursor-pointer">
                  {group.images.map((image, index) => {
                    const totalImages = group.images.length;
                    const zIndex = totalImages - index;

                    return (
                      <div
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full rounded-lg shadow-lg transition-transform duration-500 ease-in-out opacity-90 hover:opacity-100`}
                        style={{
                          transform: expandedGroup
                            ? `translateX(${(index - (totalImages - 1) / 2) * 410}px) rotate(0deg)` // Adjust spacing for expanded images
                            : `translateX(0px) rotate(${index * 10 - 10}deg)`,
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
                onDoubleClick={handleDoubleClick} // Close the expanded group on double-click
              >
                <div className="relative flex items-center justify-center w-full max-w-[400px] h-[400px]">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default CircularGallery;
