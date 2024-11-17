"use client";

import { useState } from "react";
import Link from "next/link";

export default function AboutPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold text-gray-800">
            FatimaPhotography
          </Link>
          <ul className="hidden md:flex space-x-6">
            <li>
              <Link href="/" className="text-gray-800 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-gray-800 hover:text-blue-600">
                About
              </Link>
            </li>
            <li>
              <Link href="/stories" className="text-gray-800 hover:text-blue-600">
                Stories
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-gray-800 hover:text-blue-600">
                Contact
              </Link>
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
                <Link href="/" className="block text-gray-800 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="block text-gray-800 hover:text-blue-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/stories" className="block text-gray-800 hover:text-blue-600">
                  Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block text-gray-800 hover:text-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* About Section */}
      <section className="bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">About Us</h1>
          <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="md:w-1/2">
              <img
                src="/About.jpeg"
                alt="FatimaPhotography Team"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 text-left">
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                At FatimaPhotography, we believe in capturing life’s most precious moments in their truest form. With over a decade of experience, our team is passionate about storytelling through the art of photography.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                Our mission is to freeze moments in time and create timeless memories for our clients. From the first consultation to the final photo delivery, we work closely with you to ensure every detail is perfect.
              </p>
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Experience</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            With over a decade of experience in wedding and portrait photography, we have mastered the art of capturing memorable moments.
          </p>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">500+ Weddings Captured</h3>
              <p className="text-gray-600 mt-2">Bringing love stories to life in every frame.</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">300+ Family Portraits</h3>
              <p className="text-gray-600 mt-2">Preserving family memories for generations.</p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">Award-Winning Photographer</h3>
              <p className="text-gray-600 mt-2">Recognized for excellence in visual storytelling.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Clients Say</h2>
          <div className="space-y-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="text-lg text-gray-600">
                “FatimaPhotography captured our wedding beautifully! The pictures are beyond perfect, and we couldn’t be happier!”
              </p>
              <p className="text-gray-800 font-bold mt-4">— Sarah & Ahmed</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <p className="text-lg text-gray-600">
                “Such a professional and warm experience. The photoshoot was comfortable, and the results were incredible.”
              </p>
              <p className="text-gray-800 font-bold mt-4">— Emily & John</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-6">
        <div className="container mx-auto text-center">
          <p className="mb-2">Follow Us</p>
          <div className="flex justify-center mb-4 space-x-4">
            <a href="#" className="hover:text-blue-500">Facebook</a>
            <a href="#" className="hover:text-blue-500">Instagram</a>
            <a href="#" className="hover:text-blue-500">Twitter</a>
            <a href="#" className="hover:text-blue-500">LinkedIn</a>
          </div>
          <p>© 2024 FatimaPhotography. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
