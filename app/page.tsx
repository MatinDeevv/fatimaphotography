"use client";

import { useEffect, useState } from "react";
import anime from "animejs";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaFacebookF, FaInstagram, FaTwitter, FaCamera } from "react-icons/fa";
import Head from "next/head";
import seoData from "../seo.json"; // Ensure the path is correct

// Loader Component
const Loader = () => (
  <div className="flex justify-center items-center w-full h-screen bg-gray-100">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
  </div>
);

// Animated Intro Overlay
const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const textWrapper = document.querySelector(".intro-text");
    textWrapper!.innerHTML = textWrapper!.textContent!
      .split("")
      .map((char) => `<span class="letter">${char}</span>`)
      .join("");

    anime
      .timeline({ easing: "easeOutExpo", complete: onComplete })
      .add({
        targets: ".intro-text .letter",
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1200,
        delay: anime.stagger(50),
      })
      .add({
        targets: ".intro-overlay",
        opacity: [1, 0],
        duration: 1000,
        delay: 500,
      });
  }, [onComplete]);

  return (
    <div className="intro-overlay fixed inset-0 flex items-center justify-center bg-gray-900 z-50">
      <div className="text-center px-4">
        <h1 className="intro-text text-4xl md:text-5xl font-extrabold text-white">
          Welcome to 𝐹𝒶𝓉𝒾𝓂𝒶𝒫𝒽𝑜𝓉𝑜𝑔𝓇𝒶𝓅𝒽𝓎
        </h1>
        <p className="text-base md:text-lg font-light text-gray-300 mt-4">
          Capturing Windsor's Finest Moments
        </p>
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = () => (
  <nav className="bg-white shadow-md fixed top-0 w-full z-50 py-4 px-6 backdrop-blur-sm bg-opacity-80">
    <div className="container mx-auto flex justify-between items-center">
      <Link href="/" className="text-3xl font-bold text-gray-900">
        FatimaPhotography
      </Link>
      <ul className="flex space-x-6 text-gray-700 font-medium">
        {["Home", "Portfolio", "Services", "Packages", "Contact"].map((page) => (
          <li key={page}>
            <Link
              href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
              className="hover:text-blue-600 transition duration-300"
            >
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

// Hero Section with Swiper
const HeroSection = ({ images }: { images: string[] }) => (
  <section className="relative w-full h-screen bg-gradient-to-r from-blue-50 to-gray-50">
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      loop
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      className="h-full w-full"
    >
      {images.map((image, index) => (
        <SwiperSlide key={`${image}-${index}`} className="h-full">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={`/pictures-gallery/${image}`}
              alt={`Gallery Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (min-width: 769px) 100vh"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

// Services Section with Hover to Expand Stacks
const ServicesSection = () => {
  const services = [
    {
      title: "Engagement Photography",
      images: ["engagement1.jpg", "engagement2.jpg", "engagement3.jpg"],
      href: "/portfolio/engagement",
    },
    {
      title: "Wedding Photography",
      images: ["wedding1.jpg", "wedding2.jpg", "wedding3.jpg"],
      href: "/portfolio/wedding",
    },
    {
      title: "Kids Photography",
      images: ["kids1.jpg", "kids2.jpg", "kids3.jpg"],
      href: "/portfolio/kids",
    },
    {
      title: "Family Portraits",
      images: ["family1.jpg", "family2.jpg", "family3.jpg"],
      href: "/portfolio/family",
    },
  ];

  return (
    <section className="relative bg-gray-50 py-16 px-4 md:px-0">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Our Photography Services</h2>
        <div className="flex flex-wrap justify-center gap-12">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="relative w-64 h-96 group cursor-pointer"
            >
              {/* Stacked Images */}
              <div
                className="absolute w-full h-full rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform group-hover:translate-x-24 group-hover:rotate-[-10deg]"
                style={{ left: "0", zIndex: 1 }}
              >
                <Image
                  src={`/pictures-gallery/${service.images[0]}`}
                  alt={`${service.title} 1`}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
              </div>
              <div
                className="absolute w-full h-full rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform group-hover:scale-105"
                style={{ zIndex: 2 }}
              >
                <Image
                  src={`/pictures-gallery/${service.images[1]}`}
                  alt={`${service.title} 2`}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
              </div>
              <div
                className="absolute w-full h-full rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform group-hover:translate-x-[-24px] group-hover:rotate-[10deg]"
                style={{ zIndex: 1, right: "0" }}
              >
                <Image
                  src={`/pictures-gallery/${service.images[2]}`}
                  alt={`${service.title} 3`}
                  layout="fill"
                  objectFit="cover"
                  className="object-cover"
                />
              </div>
              {/* Overlay Title */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-2xl font-semibold text-white">{service.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-gradient-to-t from-gray-900 to-gray-800 text-white py-10">
    <div className="container mx-auto text-center">
      <p className="text-lg font-light mb-6">Connect with Us</p>
      <div className="flex justify-center space-x-6 text-2xl">
        <a href={seoData.contact.social.facebook} className="hover:text-blue-500">
          <FaFacebookF />
        </a>
        <a href={seoData.contact.social.instagram} className="hover:text-pink-500">
          <FaInstagram />
        </a>
        <a href={seoData.contact.social.twitter} className="hover:text-blue-400">
          <FaTwitter />
        </a>
      </div>
      <p className="text-sm text-gray-400 mt-8">© 2024 Fatima Photography in Windsor. All rights reserved.</p>
    </div>
  </footer>
);

// Main Home Page Component
export default function Home() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/randomimages");
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  return (
    <>
      <Head>
        <title>{seoData.defaultTitle}</title>
        <meta name="description" content={seoData.defaultDescription} />
        <meta name="keywords" content={seoData.keywords.join(", ")} />
        <meta property="og:title" content={seoData.defaultTitle} />
        <meta property="og:description" content={seoData.defaultDescription} />
        <meta property="og:image" content={seoData.contact.social.ogImage} />
        <meta property="og:url" content={seoData.contact.website} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={seoData.contact.website} />
      </Head>

      {showIntro && <IntroOverlay onComplete={() => setShowIntro(false)} />}
      <div className={`${showIntro ? "hidden" : "block"} bg-white text-gray-900`}>
        <Navbar />
        {loading ? <Loader /> : <HeroSection images={images} />}
        <ServicesSection />
        <Footer />
      </div>
    </>
  );
}
