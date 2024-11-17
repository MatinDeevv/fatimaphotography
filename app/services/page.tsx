// app/services/page.tsx

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const services = [
  {
    title: "Portraits",
    tagline: "Capturing Individual Essence",
    description: "Creative and professional portrait sessions that bring out the best in every individual.",
    image: "/images/portraits.jpg",
  },
  {
    title: "Weddings",
    tagline: "Your Day, Perfectly Captured",
    description: "Immortalize every magical moment of your wedding with our artistic wedding photography.",
    image: "/images/weddings.jpg",
  },
  {
    title: "Engagements",
    tagline: "Celebrate Love’s Journey",
    description: "Celebrate your journey together with timeless engagement photos that tell your unique story.",
    image: "/images/engagements.jpg",
  },
  {
    title: "More",
    tagline: "Explore Our Services",
    description: "We offer a range of photography services tailored to your needs.",
    image: "/images/more.jpg",
  },
];

export default function ServicesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="bg-gray-900 text-white min-h-screen py-16 relative">
      <h1 className="text-5xl font-bold text-center mb-16">Our Unique Photography Services</h1>
      <div className="container mx-auto grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative rounded-lg overflow-hidden shadow-lg cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Image Background with Gradient Overlay */}
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="100vw"
              className="object-cover w-full h-96"
              style={{ filter: "brightness(0.75)" }}
            />
            {/* Hover Effect Layer */}
            <motion.div
              className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-all ${
                hoveredIndex === index ? "opacity-100" : "opacity-0"
              }`}
              animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center px-6">
                <h2 className="text-3xl font-bold">{service.title}</h2>
                <p className="text-lg italic mt-2">{service.tagline}</p>
                <p className="mt-4 text-sm">{service.description}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
