"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    customEvent: "",
    serviceType: "",
    venue: "",
    referral: "",
    excitement: "",
    additionalInfo: "",
    newsletter: false,
  });
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    // Select a random image for the background from the gallery
    const images = [
      "/pictures-gallery/image1.jpg",
      "/pictures-gallery/image2.jpg",
      "/pictures-gallery/image3.jpg",
    ];
    setBackgroundImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen relative"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay for readability */}

      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 w-full z-50">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold text-gray-800">
            FatimaPhotography
          </Link>
          <ul className="hidden md:flex space-x-6">
            <li><Link href="/" className="text-gray-800 hover:text-blue-600">Home</Link></li>
            <li><Link href="/about" className="text-gray-800 hover:text-blue-600">About</Link></li>
            <li><Link href="/stories" className="text-gray-800 hover:text-blue-600">Stories</Link></li>
            <li><Link href="/contact" className="text-gray-800 hover:text-blue-600">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* Contact Form */}
      <div className="flex items-center justify-center px-4 pt-32 relative z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-lg w-full" // Added `bg-opacity-80` for slight transparency
        >
          <h2 className="text-3xl font-light text-center mb-8 text-black">Contact Us</h2>

          <div className="mb-4">
            <label className="block text-sm mb-2 text-black">Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 py-2 outline-none focus:border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2 text-black">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 py-2 outline-none focus:border-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2 text-black">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 py-2 outline-none focus:border-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-2 text-black">Event Type</label>
            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 py-2 outline-none focus:border-black"
            >
              <option value="">Select an event type</option>
              <option value="wedding">Wedding</option>
              <option value="engagement">Engagement</option>
              <option value="portrait">Portrait</option>
              <option value="other">Other</option>
            </select>
          </div>

          {formData.eventType === "other" && (
            <div className="mb-4">
              <label className="block text-sm mb-2 text-black">Custom Event</label>
              <input
                type="text"
                name="customEvent"
                value={formData.customEvent}
                onChange={handleChange}
                className="w-full border-b-2 border-gray-300 py-2 outline-none focus:border-black"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm mb-2 text-black">Service Type</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 py-2 outline-none focus:border-black"
            >
              <option value="">Select a service type</option>
              <option value="photography">Photography</option>
              <option value="videography">Videography</option>
              <option value="both">Photography & Videography</option>
            </select>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="newsletter"
              checked={formData.newsletter}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm text-black">Sign me up for the newsletter!</label>
          </div>

          <button
            type="submit"
            className="w-full border border-gray-800 py-3 text-gray-800 font-medium text-sm hover:bg-gray-800 hover:text-white transition-colors"
          >
            Submit
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-white text-black py-6 mt-12">
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
