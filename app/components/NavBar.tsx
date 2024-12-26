'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Add shadow to the navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        if (window.scrollY > 10) {
          navbar.classList.add('shadow-lg');
        } else {
          navbar.classList.remove('shadow-lg');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="bg-white fixed top-0 w-full z-50  font-sans shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        {/* Left Section (Navigation Links) */}
        <div className="hidden md:flex space-x-4 text-base font-bold text-gray-700">
          <Link href="/" className="hover:text-green-600 transition">
            HOME
          </Link>
          <Link href="/investment" className="hover:text-green-600 transition">
            INVESTMENT
          </Link>
        </div>

        {/* Centered Logo Section */}
        <div className="flex justify-center flex-shrink-0">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="object-contain h-20 w-190" />
          </Link>
        </div>

        {/* Right Section (Navigation Links) */}
        <div className="hidden md:flex space-x-4 text-base font-bold text-gray-700">
          <Link href="/portfilio" className="hover:text-green-600 transition">
            PORTFILIO
          </Link>
          <Link href="/contact" className="hover:text-green-600 transition">
            CONTACT
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-gray-700 hover:text-green-600 focus:outline-none ml-4"
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-1 py-2 px-4">
            {['Home', 'Investment', 'portfilio', 'Contact'].map((link) => (
              <li key={link}>
                <Link
                  href={`/${link.toLowerCase()}`}
                  className="block text-gray-700 hover:text-green-600 transition py-1"
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
  );
};

export default Navbar;
