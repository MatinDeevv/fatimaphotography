"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRef } from "react";
import anime from "animejs";
import CircularGallery from "@/app/components/CircularGallery";
import Review from "@/app/components/Reviews";
import AppointmentSection from "@/app/components/AppointmentSection";
import CompactContactSection from "./components/CompactContactSection";
import WhyUs from "./components/WhyUs";

// Define the Customer type
interface Customer {
  name: string;
  topPictures: string[]; // Array of image URLs
}






const imageGroups = [
  {
    id: "couple1",
    name: "Ali and Azade",
    images: [
      "story-1/couple1-photo1.jpg",
      "story-1/couple1-photo2.jpg",
      "story-1/couple1-photo3.jpg",
      "story-1/couple1-photo4.jpg",
      "story-1/couple1-photo5.jpg",
    ],
  },
  {
    id: "couple6",
    name: "Areefa & hasan",
    images: [
      "story-6/ar05.jpg",
      "story-6/ar03.jpg",
      "story-6/ar04.jpg",
      "story-6/ar01.jpg",
      "story-6/ar02.jpg",

    ],
  },
  {
    id: "couple5",
    name: "Saba & Vaji",
    images: [
      "story-5/sab01.jpg",
      "story-5/sab02.jpg",
      "story-5/sab03.jpg",
      "story-5/sab04.jpg",
      "story-5/sab05.jpg",
    ],
  },
  {
    id: "couple2",
    name: "Ali and Azade",
    images: [
      "story-2/Her03.jpg",
      "story-2/Her04.jpg",
      "story-2/Her05.jpg",
      "story-2/Her06.jpg",
      "story-2/Her07.jpg",
    ],
  },
  {
    id: "couple3",
    name: "Ali and Azade",
    images: [
      "story-3/Pun03.jpg",
      "story-3/Pun13.jpg",
      "story-3/Pun06.jpg",
      "story-3/Pun05.jpg",
      "story-3/Pun04.jpg",
    ],
  },
  {
    id: "couple4",
    name: "Haniyeh & Shayan",
    images: [
      "story-4/4.jpg",
      "story-4/5.jpg",
      "story-4/6.jpg",
      "story-4/2.jpg",
      "story-4/3.jpg",
    ],
  },
];

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
    },
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

      <main className="bg-green-950 text-white font-body">

        {/* Navbar */}
        <nav className="bg-white fixed top-0 w-full z-50 shadow-md m-0">
  <div className="container mx-auto flex justify-between items-center px-4 py-2">
    {/* Left Section (Navigation Links) */}
    <div className="hidden md:flex space-x-4 text-base font-medium text-gray-700">
      <Link href="/" className="hover:text-blue-600 transition">
        Home
      </Link>
      <Link href="/investment" className="hover:text-blue-600 transition">
        Investment
      </Link>
    </div>

    {/* Centered Logo Section */}
    <div className="flex justify-center flex-shrink-0">
      <Link href="/">
        <img
          src="/logo.png"
          alt="Logo"
          className="object-contain h-20 w-190"
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
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  {/* Mobile Menu */}
  {showMobileMenu && (
    <div className="md:hidden bg-white shadow-md">
      <ul className="flex flex-col space-y-1 py-2 px-4">
        {["Home", "Packages", "Stories", "Contact"].map((link) => (
          <li key={link}>
            <Link
              href={`/${link.toLowerCase()}`}
              className="block text-gray-700 hover:text-blue-600 transition py-1"
              onClick={() => setShowMobileMenu(false)}
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
        <header className="relative h-screen mb-40">
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

        {/* About Section */}
        <section className="flex items-center mt-30 mb-40  justify-center py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">

              <p className="text-lg text-white mt- leading-relaxed mt-0 animated-text">
               <br />  
                 <h1 className="text-4xl font-bold mt-44 mb-0 animated-text">
                My name is <span className="text-green-200 ">FATIMA</span>
              </h1>
                
                
                At every given moment, there’s a story happening, and I strive to
                freeze these moments. I'm a PhD student of mechanical engineering,
                and I use my engineering skills in photography to capture the
                perfect view of your beautiful moments.
              </p>
              <a
                
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 text-white bg-green-900 rounded hover:bg-green-700 transition animated-text"
              >
                About Me
              </a>
            </div>

            <div>
              <img
                src="about.jpg"
                alt="Fatima"
                className="w-9/12 h-auto rounded-lg shadow-lg animated-text"
              />
            </div>
          </div>
        </section>
<section className="mb-32">{/* Circular Gallery Component */}
        <CircularGallery imageGroups={imageGroups} />

        {/* Reviews */}
        
</section>
<Review />
<br /><br /><br /><br /><br />
<section><WhyUs /></section>

        <CompactContactSection />
        {/* Footer */}
        <footer className="bg-white text-black py-8">
          <div className="container mx-auto text-center">
            <p>© 2024 Fatima Photography. All rights reserved. <br />Windsor, London, Toronto | fashamifatemeh@gmail.com | Tel: 226-759-6075 | Tel: 226-975-0953</p>
          </div>
        </footer>
      </main>
    </>
  );
}
