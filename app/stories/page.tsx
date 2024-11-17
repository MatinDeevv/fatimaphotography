"use client";

import { useState } from 'react';
import Link from 'next/link';

type Story = {
  id: number;
  couple: string;
  date: string;
  thumbnail: string;
  images: string[];
  description: string;
};

export default function StoriesPage() {
  const stories: Story[] = [
    {
      id: 1,
      couple: "Alice & John",
      date: "July 2024",
      thumbnail: "/path/to/thumbnail1.jpg",
      images: ["/path/to/image1.jpg", "/path/to/image2.jpg", "/path/to/image3.jpg"],
      description: "A beautiful wedding celebration at the coast.",
    },
    {
      id: 2,
      couple: "Emma & Liam",
      date: "August 2024",
      thumbnail: "/path/to/thumbnail2.jpg",
      images: ["/path/to/image4.jpg", "/path/to/image5.jpg", "/path/to/image6.jpg"],
      description: "An intimate garden ceremony full of love and laughter.",
    },
  ];

  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
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
            <li><Link href="/" className="text-gray-800 hover:text-blue-600">Home</Link></li>
            <li><Link href="/about" className="text-gray-800 hover:text-blue-600">About</Link></li>
            <li><Link href="/stories" className="text-gray-800 hover:text-blue-600">Stories</Link></li>
            <li><Link href="/contact" className="text-gray-800 hover:text-blue-600">Contact</Link></li>
          </ul>
          <button
            className="md:hidden text-gray-800 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            Menu
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <ul className="p-4 space-y-4">
              <li><Link href="/" className="block text-gray-800 hover:text-blue-600">Home</Link></li>
              <li><Link href="/about" className="block text-gray-800 hover:text-blue-600">About</Link></li>
              <li><Link href="/stories" className="block text-gray-800 hover:text-blue-600">Stories</Link></li>
              <li><Link href="/contact" className="block text-gray-800 hover:text-blue-600">Contact</Link></li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-cover bg-center h-64 flex items-center justify-center mt-16" style={{ backgroundImage: 'url(/public/about.jpg)' }}>
        <h1 className="text-4xl font-bold text-white">Love Stories</h1>
      </div>

      {/* Stories Grid */}
      <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((story) => (
          <div
            key={story.id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => setSelectedStory(story)}
          >
            <img src={story.thumbnail} alt={`${story.couple}'s Story`} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{story.couple}</h2>
              <p className="text-gray-500">{story.date}</p>
              <p className="mt-2 text-gray-700">{story.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-2/3 lg:w-1/2 max-h-full overflow-y-auto">
            <button className="text-right p-4 text-gray-500 hover:text-black" onClick={() => setSelectedStory(null)}>
              Close
            </button>
            <div className="p-6">
              <h2 className="text-3xl font-bold mb-4">{selectedStory.couple}</h2>
              <p className="text-gray-500 mb-6">{selectedStory.date}</p>
              <p className="text-lg text-gray-700 mb-6">{selectedStory.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedStory.images.map((image, index) => (
                  <img key={index} src={image} alt={`${selectedStory.couple} Image ${index + 1}`} className="rounded-lg shadow-md" />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

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
