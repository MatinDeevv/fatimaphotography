// /app/BookingPage.tsx

'use client'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Booking() {
  const [backgroundImage, setBackgroundImage] = useState<string>('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: '',
    customEvent: '',
    date: '',
    guests: '',
    serviceType: '',
    venue: '',
    referral: '',
    specialRequests: '',
    newsletter: false,
  })
  const [isNavOpen, setIsNavOpen] = useState(false)

  // Fetch a random background image
  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch('/api/images')
        const images = await response.json()
        if (Array.isArray(images) && images.length > 0) {
          const randomImage = images[Math.floor(Math.random() * images.length)]
          setBackgroundImage(`/pictures-gallery/${randomImage}`)
        }
      } catch (error) {
        console.error('Failed to fetch images:', error)
      }
    }
    fetchImages()
  }, [])

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    const checked =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  // Handle form submission and save booking to local storage
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const storedBookings = JSON.parse(
      localStorage.getItem('bookingsList') || '[]'
    )
    const updatedBookings = [
      ...storedBookings,
      { ...formData, id: Date.now(), status: 'pending' },
    ]
    localStorage.setItem('bookingsList', JSON.stringify(updatedBookings))
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      eventType: '',
      customEvent: '',
      date: '',
      guests: '',
      serviceType: '',
      venue: '',
      referral: '',
      specialRequests: '',
      newsletter: false,
    })
    alert('Booking submitted successfully!')
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Navigation */}
      <nav className="bg-white bg-opacity-80 shadow-md fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold text-gray-800">
            FatimaPhotography
          </Link>
          <button
            className="block md:hidden p-2 text-gray-600 focus:outline-none"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <ul
            className={`flex-col md:flex-row md:flex space-y-4 md:space-y-0 md:space-x-6 items-center ${
              isNavOpen ? 'flex' : 'hidden'
            }`}
          >
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
              <Link
                href="/stories"
                className="text-gray-800 hover:text-blue-600"
              >
                Stories
              </Link>
            </li>
            <li>
              <Link
                href="/booking"
                className="text-gray-800 hover:text-blue-600"
              >
                Booking
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Booking Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 shadow-md rounded-lg p-8 w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 mt-32 mb-10 mx-4"
      >
        <h2 className="text-2xl text-black font-semibold text-center mb-6">
          Book Your Session
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-blue-500"
            placeholder="Your Full Name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-blue-500"
            placeholder="Your Email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-blue-500"
            placeholder="Your Phone Number"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Event Type
          </label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-blue-500"
          >
            <option value="">Select an event type</option>
            <option value="wedding">Wedding</option>
            <option value="engagement">Engagement</option>
            <option value="portrait">Portrait</option>
            <option value="corporate">Corporate</option>
            <option value="other">Other</option>
          </select>
          {formData.eventType === 'other' && (
            <input
              type="text"
              name="customEvent"
              value={formData.customEvent}
              onChange={handleChange}
              className="w-full mt-2 border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-blue-500"
              placeholder="Specify event type"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Event Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Service Type
          </label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-blue-500"
          >
            <option value="">Select a service type</option>
            <option value="photography">Photography</option>
            <option value="videography">Videography</option>
            <option value="both">Photography & Videography</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Venue Location
          </label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-blue-500"
            placeholder="Event venue"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Referral
          </label>
          <input
            type="text"
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-blue-500"
            placeholder="How did you hear about us?"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Special Requests
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md outline-none focus:border-blue-500"
            placeholder="Any special requests?"
          />
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
            className="mr-2 rounded focus:ring-0 focus:ring-offset-0"
          />
          <label className="text-sm text-gray-700">
            Sign me up for the newsletter!
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold text-sm hover:bg-blue-700 transition-colors"
        >
          Submit Booking
        </button>
      </form>

      {/* Footer */}
      <footer className="bg-white bg-opacity-80 text-black py-6 mt-auto">
        <div className="container mx-auto text-center">
          <p className="mb-2">Follow Us</p>
          <div className="flex justify-center mb-4 space-x-4">
            <a href="#" className="hover:text-blue-500">
              Facebook
            </a>
            <a href="#" className="hover:text-blue-500">
              Instagram
            </a>
            <a href="#" className="hover:text-blue-500">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-500">
              LinkedIn
            </a>
          </div>
          <p>© 2024 FatimaPhotography. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
