"use client";
import Link from 'next/link';

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Fetch images from API
    const fetchImages = async () => {
      const response = await fetch("/api/images");
      const data = await response.json();
      const shuffledImages = data.sort(() => 0.5 - Math.random());
      setImages(shuffledImages);
      setHeroImage(shuffledImages[0]); // Pick the first random image for the hero
    };

    // Fetch Google reviews
    const fetchReviews = async () => {
      const response = await fetch("/api/get-reviews");
      const data = await response.json();
      setReviews(data.reviews || []);
    };

    fetchImages();
    fetchReviews();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-semibold text-gray-800">
            FatimaPhotography
          </a>
          <ul className="hidden md:flex space-x-6">
            <li>
              <a href="/" className="text-gray-800 hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
  <Link href="/about" className="text-gray-800 hover:text-blue-600">
    About
  </Link>
</li>

            <li>
              <a href="/stories" className="text-gray-800 hover:text-blue-600">
               Stories
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-800 hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            Menu
          </button>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <ul className="p-4 space-y-4">
              <li>
                <a href="/" className="block text-gray-800 hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block text-gray-800 hover:text-blue-600"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/stories"
                  className="block text-gray-800 hover:text-blue-600"
                >
                  Stories
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="block text-gray-800 hover:text-blue-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center text-center pt-24"
        style={{
          backgroundImage: `url('/pictures-gallery/${heroImage}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          marginTop: "80px", // Adjust margin for the navbar
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Welcome to FatimaPhotography
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-100">
            Capturing the moments that captivate your heart
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
            Book a Session
          </button>
        </div>
      </section>

      {/* Improved Swiper Gallery with Better Sizing */}
      <section className="my-12">
        <div className="container mx-auto px-4">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 10 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="mySwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={`/pictures-gallery/${image}`}
                  alt={`Image ${index + 1}`}
                  className="w-full h-[600px] object-cover rounded-lg"
                  style={{ objectPosition: "50% 20%" }} // Adjust for head visibility
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* What Our Clients Say Section */}
      <section className="my-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">What Our Clients Say</h2>
          <div className="mt-8 space-y-4">
            {reviews.length === 0 ? (
              <p>Loading reviews...</p>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-600">
                    {review.author_name}
                  </h3>
                  <p className="text-gray-600 mt-2">{review.text}</p>
                  <p className="mt-4 text-yellow-500">
                    {"★".repeat(review.rating)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-6">
        <div className="container mx-auto text-center">
          <p className="mb-2">Follow Us</p>
          <div className="flex justify-center mb-4 space-x-4">
            <a href="#" className="hover:text-blue-500">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-500">
              Instagram
            </a>
            <a href="#" className="hover:text-blue-500">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-500">
              LinkedIn
            </a>
          </div>
          <p>© 2024 FatimaPhotography. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
