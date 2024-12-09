"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { useRef } from "react";
import anime from "animejs";
import CircularGallery from "@/app/components/CircularGallery";
import Review from "@/app/components/Reviews";

// Define the Customer type
interface Customer {
  name: string;
  topPictures: string[]; // Array of image URLs
}
const imageGroups = [
    {
      id: "couple1",
      name:"ali and azade",
      images: [
        "story-1/couple1-photo1.jpg",
        "story-1/couple1-photo2.jpg",
        "story-1/couple1-photo3.jpg",
        "story-1/couple1-photo4.jpg",
        "story-1/couple1-photo5.jpg",
      ],
    },
    {
      id: "couple2",
      name:"ali and azade",
      images: [
        "story-2/Her03.jpg",
        "story-2/Her04.jpg",
        "story-2/Her05.jpg",
        "story-2/Her06.jpg",
        "story-2/Her07.jpg",
      ],
    },
    {
      id: "couple22",
      name:"ali and azade",
      images: [
        "story-3/Pun03.jpg",
        "story-3/Pun13.jpg",
        "story-3/Pun06.jpg",
        "story-3/Pun05.jpg",
        "story-3/Pun04.jpg",
      ],
    },

  
  ];
  

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false); // State for mobile menu}
}
interface SEOData {
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  siteName: string;
  contact: {
    website: string;
    phone: string;
    email: string;
    social: {
      facebook: string;
      instagram: string;
      twitter: string;
      ogImage: string;
      twitterCard: string;
    };
  };
  structuredData: Record<string, unknown>;
}

export default function Page() {
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false); // Make sure this is inside the component

  // Static example of customers
  const customers: Customer[] = [
    {
      name: "Customer 1",
      topPictures: [
        "/story-1/couple1-photo1.jpg",
        "/story-1/couple1-photo2.jpg",
        "/story-1/couple1-photo3.jpg",
        "/story-1/couple1-photo4.jpg",
        "/story-1/couple1-photo5.jpg",
      ],
      
    }
  
  ];

  // Scroll shadow effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector("nav");
      if (navbar) {
        if (window.scrollY > 10) {
          navbar.classList.add("shadow-lg");
        } else {
          navbar.classList.remove("shadow-lg");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch SEO data
  useEffect(() => {
    async function fetchSEO() {
      try {
        const response = await fetch("/seo.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch SEO data: ${response.status} ${response.statusText}`);
        }

        const data: SEOData = await response.json();
        setSeoData(data);
      } catch (err) {
        console.error("Error loading SEO data:", err);
      }
    }

    fetchSEO();
  }, []);

  // Fetch images
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/randomimages");
        if (!response.ok) throw new Error("Failed to fetch images");
        const data: string[] = await response.json();
        setImages(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchImages();
  }, []);

  if (!seoData) return <p>Loading...</p>;

  return (

    <>
      {/* SEO Metadata */}
      <Head>
        <title>{seoData.defaultTitle}</title>
        <meta name="description" content={seoData.defaultDescription} />
        <meta name="keywords" content={seoData.keywords.join(", ")} />
        <meta property="og:title" content={seoData.defaultTitle} />
        <meta property="og:description" content={seoData.defaultDescription} />
        <meta property="og:image" content={seoData.contact.social.ogImage} />
        <meta property="og:url" content={seoData.contact.website} />
        <meta name="twitter:card" content={seoData.contact.social.twitterCard} />
        <meta name="twitter:title" content={seoData.defaultTitle} />
        <meta name="twitter:description" content={seoData.defaultDescription} />
        <link rel="canonical" href={seoData.contact.website} />
        <script type="application/ld+json">
          {JSON.stringify(seoData.structuredData)}
        </script>
      </Head>

      <main className="bg-gray-100 text-gray-800 font-body">

      <nav className="bg-white fixed top-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Left Section (Navigation Links) */}
        <div className="hidden md:flex space-x-4 text-base font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/services" className="hover:text-blue-600 transition">
            Services
          </Link>
        </div>

        {/* Centered Logo Section */}
        <div className="flex-grow flex justify-center">
          <Link href="/">
            <img
              src="/logo.png" // Replace with your actual logo path
              alt="Logo"
              className="object-contain max-w-full h-auto"
              style={{ maxWidth: "300px" }} // Adjust this value for maximum size
            />
          </Link>
        </div>

        {/* Right Section (Navigation Links) */}
        <div className="hidden md:flex space-x-4 text-base font-medium text-gray-700">
          <Link href="/stories" className="hover:text-blue-600 transition">
            Stories
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none ml-4"
          onClick={() => setShowMobileMenu((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-1 py-2 px-4">
            {["Home", "Services", "Stories", "Contact"].map((link) => (
              <li key={link}>
                <Link
                  href={`/${link.toLowerCase()}`}
                  className="block text-gray-700 hover:text-blue-600 transition py-1"
                  onClick={() => setShowMobileMenu(false)} // Close menu on click
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>


    





        {/* Hero Section */}
        <header className="relative h-screen mb-0">
          {images.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 800 }}
              slidesPerView={3}
              loop
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="h-full w-full"
              spaceBetween={20}
              breakpoints={{
                1024: { slidesPerView: 3.5 },
                840: {
                  slidesPerView: 2,
                },
                480: {
                  slidesPerView: 2,
                },
                0: {
                  slidesPerView: 1,
                },
              }}
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className=" h-full bg-cover bg-center transform transition-transform scale-105"
                    style={{ backgroundImage: `url(${src})` }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex justify-center items-center h-full bg-gray-200 text-gray-600">
              <p>No images available at the moment.</p>
            </div>
          )}

          {images.length > 0 && (
            <div className="absolute  left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded z-10">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </header>
        {/* Start of the new section */}
      <section className="flex items-center mt-40 mb-40 justify-center py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold animated-text">
              My name is <span className="text-indigo-600">Fatima</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed animated-text">
              At every given moment, there’s a story happening, and I strive to
              freeze these moments. I'm a PhD student of mechanical engineering,
              and I use my engineering skills in photography to capture the
              perfect view of your beautiful moments.
            </p>
            <a
              href="https://www.fatimaphotography.ca/about"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 text-white bg-indigo-600 rounded hover:bg-indigo-700 transition animated-text"
            >
              About Me
            </a>
            <div className="flex space-x-4 animated-text">
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-500 hover:text-indigo-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.6 3.9C21.5 4.5 22 6.5 22 12s-.5 7.5-2.4 8.1c-2.4.6-8.6.6-8.6.6s-6.2 0-8.6-.6C1.5 19.5 1 17.5 1 12s.5-7.5 2.4-8.1c2.4-.6 8.6-.6 8.6-.6s6.2 0 8.6.6z"></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-500 hover:text-indigo-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 0H5C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8.2 19.1H5.7V9h2.5v10.1zm-1.2-11.6C6 7.5 5.2 6.7 5.2 6S6 4.5 7 4.5c1.1 0 1.8.8 1.8 1.7S8.1 7.5 7 7.5zm12 11.6h-2.5v-4.8c0-1.1-.4-1.9-1.5-1.9-.8 0-1.3.5-1.6 1.1-.1.2-.1.5-.1.8v4.8h-2.5V9h2.4v1.4c.3-.5 1-.9 2.1-.9 2.3 0 2.8 1.5 2.8 3.4v5.2z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div>
            <img
              src="https://static.wixstatic.com/media/bb02f0_4538304fb2ff4532b9f266a4d21e4595~mv2.jpg"
              alt="Fatima"
              className="w-full h-auto rounded-lg shadow-lg animated-text"
            />
          </div>
        </div>
      </section>
      {/* End of the new section */}
        {/* CircularGallery Component */}
        <CircularGallery imageGroups={imageGroups} />
        
        <Review />
        {/* Footer */}
        <footer className="bg-gray-800 text-gray-400 py-8">
          <div className="container mx-auto text-center">
            <p>© 2024 Fatima Photography. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}