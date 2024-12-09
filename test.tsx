"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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
        if (!response.ok) throw new Error("Failed to load SEO data");
        const data: SEOData = await response.json();
        setSeoData(data);
      } catch (err) {
        console.error(err);
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

      <main className="bg-gray-100 text-gray-800">
       {/* Navbar */}
<nav className="bg-white fixed top-0 w-full z-50 shadow-md">
  <div className="container mx-auto flex justify-between items-center px-4 py-2">
    {/* Logo */}
    <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">
      {seoData.siteName}
    </Link>

    {/* Desktop Navigation */}
    <ul className="hidden md:flex space-x-6 text-sm font-medium">
      {["Home", "Gallery", "Services", "Testimonials", "Contact"].map((link) => (
        <li key={link}>
          <Link
            href={`/${link.toLowerCase()}`}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            {link}
          </Link>
        </li>
      ))}
    </ul>

    {/* Mobile Hamburger Menu */}
    <button
      className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
      onClick={() => setShowMobileMenu(!showMobileMenu)}
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
        {["Home", "Gallery", "Services", "Testimonials", "Contact"].map((link) => (
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
        <header className="relative h-screen">
          {images.length > 0 ? (
            <Swiper
              modules={[Autoplay, EffectFade]}
              autoplay={{ delay: 3000 }}
              effect="fade"
              loop
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              className="h-full w-full"
            >
              {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                  <div
                    className="h-full bg-cover bg-center transform transition-transform scale-105"
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
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black flex flex-col justify-center items-center text-center">
            <h1 className="text-6xl font-serif text-white mb-4 animate-fade-in">
              Windsor's Premier Photography Service
            </h1>
            <p className="text-xl text-gray-200 mb-6">Capturing your most precious moments.</p>
            <Link href="/gallery">
              <button className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl">
                View Portfolio
              </button>
            </Link>
          </div>
          {images.length > 0 && (
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </header>

  {/* Services Section */}
  <section className="py-16 px-6">
          <h2 className="text-4xl font-serif text-center mb-8">Our Services</h2>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Weddings", "Portraits", "Events", "Fashion", "Nature"].map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <h3 className="text-2xl font-bold mb-4">{service}</h3>
                <p className="text-gray-700">
                  Capture the essence of your special moments with professional {service.toLowerCase()} photography.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 px-6 bg-gray-50">
          <h2 className="text-4xl font-serif text-center mb-8">Gallery</h2>
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-lg">
                {/* Main Image */}
                <div className="relative z-10 h-64 bg-gray-300 rounded-lg shadow-lg transition-transform group-hover:translate-y-2">
                  <img
                    src={`/images/image-${idx + 1}.jpg`} // Replace with your actual image URLs
                    alt={`Gallery Image ${idx + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Hover Animation (Stacking Effect) */}
                <div
                  className="absolute top-2 left-2 w-full h-full z-0 bg-gray-400 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                  style={{ zIndex: 9 }}
                ></div>
                <div
                  className="absolute top-4 left-4 w-full h-full z-0 bg-gray-500 rounded-lg transform translate-y-8 group-hover:translate-y-4 transition-transform duration-300"
                  style={{ zIndex: 8 }}
                ></div>
              </div>
            ))}
          </div>
        </section>

{/* Testimonials Section */}
<section className="py-16 px-6 bg-gray-50">
  <h2 className="text-4xl font-serif text-center mb-8">What Our Clients Say</h2>
  <Swiper
    autoplay={{ delay: 5000 }}
    loop
    spaceBetween={30}
    className="max-w-5xl mx-auto"
  >
    {[
      {
        name: "Maria Korsgaard",
        date: "15/04/2021",
        review:
          "The host was waiting for us and was very polite and helpful. Apartments are amazing!",
        rating: 5,
        avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
        googleLogo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png",
      },
      {
        name: "Alice Johnson",
        date: "10/03/2023",
        review:
          "Amazing photos! The team captured every special moment beautifully.",
        rating: 5,
        avatar: "https://via.placeholder.com/50",
        googleLogo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png",
      },
      {
        name: "Bob Smith",
        date: "01/02/2023",
        review:
          "Captured everything perfectly! Highly professional and friendly team.",
        rating: 4.5,
        avatar: "https://via.placeholder.com/50",
        googleLogo:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png",
      },
    ].map((testimonial, idx) => (
      <SwiperSlide key={idx}>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto relative">
          {/* Google Logo */}
          <img
            src={testimonial.googleLogo}
            alt="Google Logo"
            className="absolute top-4 right-4 w-6 h-6"
          />

          {/* Header: Avatar, Name, and Date */}
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-bold text-gray-800">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.date}</p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center mb-3">
            {Array.from({ length: 5 }).map((_, starIdx) => (
              <svg
                key={starIdx}
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  starIdx < Math.floor(testimonial.rating)
                    ? "fill-yellow-400"
                    : testimonial.rating > starIdx
                    ? "fill-yellow-300"
                    : "fill-gray-300"
                }`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>

          {/* Review Text */}
          <p className="text-gray-700">{testimonial.review}</p>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>



        

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
