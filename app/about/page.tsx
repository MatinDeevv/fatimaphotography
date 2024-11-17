// app/about/page.tsx

"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

type Achievement = {
  title: string;
  description: string;
};

const team: TeamMember[] = [
  { name: "Fatima", role: "Lead Photographer", image: "/About.jpeg" },
  { name: "Ahmed", role: "Assistant Photographer", image: "/About.jpeg" },
  { name: "Sara", role: "Editor", image: "/About.jpeg" },
  { name: "Ali", role: "Editor", image: "/About.jpeg" },
];

const achievements: Achievement[] = [
  { title: "500+ Weddings Captured", description: "Bringing love stories to life in every frame." },
  { title: "300+ Family Portraits", description: "Preserving family memories for generations." },
  { title: "Award-Winning Photographer", description: "Recognized for excellence in visual storytelling." },
];

// Responsive Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white fixed top-0 w-full z-50 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-3xl font-extrabold text-gray-800 hover:text-blue-600">
          FatimaPhotography
        </Link>
        <div className="md:hidden z-50">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle navigation" className="text-gray-800 text-2xl">
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } absolute top-0 left-0 w-full h-screen bg-white flex-col items-center justify-center space-y-8 text-lg font-medium z-40 md:flex md:static md:h-auto md:bg-transparent md:space-y-0 md:space-x-8 md:flex-row`}
        >
          {["Home", "About", "Stories", "Gallery", "Contact"].map((page, index) => (
            <li key={index} className="py-2 md:py-0">
              <Link
                href={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                className="text-gray-800 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default function AboutPage() {
  return (
    <div className="bg-gray-100 text-black">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        className="bg-cover bg-center h-64 flex items-center justify-center mt-16"
        style={{ backgroundImage: 'url(/about-hero.jpg)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">About Us</h1>
      </motion.section>

      {/* Team Section */}
      <section className="container mx-auto my-12 text-center">
        <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member) => (
            <div key={member.name} className="w-64 p-4 bg-white rounded-lg shadow-lg">
              <img src={member.image} alt={member.name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="bg-gray-100 py-12 text-center">
        <h2 className="text-3xl font-bold mb-8">Achievements</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {achievements.map((achievement) => (
            <motion.div key={achievement.title} className="w-64 p-4 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{achievement.title}</h3>
              <p className="text-gray-500">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-100 py-12 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Statistics</h2>
        <div className="flex justify-center space-x-8">
          <div className="p-4">
            <p className="text-5xl font-bold">10+</p>
            <p className="text-gray-500">Years of Experience</p>
          </div>
          <div className="p-4">
            <p className="text-5xl font-bold">500+</p>
            <p className="text-gray-500">Weddings Captured</p>
          </div>
          <div className="p-4">
            <p className="text-5xl font-bold">1000+</p>
            <p className="text-gray-500">Happy Clients</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto text-center px-4">
          <p className="text-lg font-light mb-6">Follow Us</p>
          <div className="flex justify-center mb-8 space-x-6 text-2xl">
            {["Facebook", "Instagram", "Twitter"].map((platform, index) => (
              <a key={index} href="#" className="hover:text-blue-500" aria-label={`Follow us on ${platform}`}>
                {platform}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-400">© 2024 FatimaPhotography. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
