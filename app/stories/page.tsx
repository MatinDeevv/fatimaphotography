// app/stories/page.tsx

'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Story type
type Story = {
  id: number
  couple: string
  date: string
  thumbnail: string
  images: string[]
  description: string
}

// Sample stories data
const stories: Story[] = [
  {
    id: 1,
    couple: 'Story 1',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/1.jpg',
    images: ['/pictures-gallery/1.jpg'],
    description: 'A captivating moment captured in time.',
  },
  {
    id: 2,
    couple: 'Story 2',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/15.jpg',
    images: ['/pictures-gallery/15.jpg'],
    description: 'An unforgettable scene full of emotion.',
  },
  {
    id: 3,
    couple: 'Story 3',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/19.jpg',
    images: ['/pictures-gallery/19.jpg'],
    description: 'A beautiful memory frozen forever.',
  },
  {
    id: 4,
    couple: 'Story 4',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/20.jpg',
    images: ['/pictures-gallery/20.jpg'],
    description: 'Captured emotions and cherished moments.',
  },
  {
    id: 5,
    couple: 'Story 5',
    date: 'November 2024',
    thumbnail: '/pictures-gallery/7.jpg',
    images: ['/pictures-gallery/7.jpg'],
    description: 'A serene scene filled with love and warmth.',
  },
  // Additional stories would go here
]

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white fixed top-0 w-full z-50 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-3xl font-extrabold text-gray-800 hover:text-blue-600"
        >
          FatimaPhotography
        </Link>
        <div className="md:hidden z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 text-2xl"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
        <ul
          className={`${
            isOpen ? 'flex' : 'hidden'
          } absolute top-0 left-0 w-full h-screen bg-white flex-col items-center justify-center space-y-8 text-lg font-medium z-40 md:flex md:static md:h-auto md:bg-transparent md:space-y-0 md:space-x-8 md:flex-row`}
        >
          {['Home', 'About', 'Stories', 'Gallery', 'Contact'].map(
            (page, index) => (
              <li key={index} className="py-2 md:py-0">
                <Link
                  href={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                  className="text-gray-800 hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  {page}
                </Link>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  )
}

// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 text-white py-10">
    <div className="container mx-auto text-center px-4">
      <p className="text-lg font-light mb-6">Follow Us</p>
      <div className="flex justify-center mb-8 space-x-6 text-2xl">
        {['Facebook', 'Instagram', 'Twitter'].map((platform, index) => (
          <a
            key={index}
            href="#"
            className="hover:text-blue-500"
            aria-label={`Follow us on ${platform}`}
          >
            {platform}
          </a>
        ))}
      </div>
      <p className="text-sm text-gray-400">
        © 2024 FatimaPhotography. All rights reserved.
      </p>
    </div>
  </footer>
)

// Stories Page Component
export default function StoriesPage() {
  const router = useRouter()

  return (
    <div className="bg-white text-gray-900 font-['Roboto']">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div
        className="bg-cover bg-center h-64 flex items-center justify-center mt-16"
        style={{ backgroundImage: "url('/about.jpg')" }}
      >
        <h1 className="text-4xl font-bold text-black">Love Stories</h1>
      </div>

      {/* Stories Grid */}
      <div className="container mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="relative bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            onClick={() => router.push(`/stories/${story.id}`)}
          >
            <img
              src={story.thumbnail}
              alt={`${story.couple}'s Story`}
              className="w-full h-48 object-cover rounded-t-lg"
              loading="lazy"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{story.couple}</h2>
              <p className="text-gray-500">{story.date}</p>
              <p className="mt-2 text-gray-700">{story.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
