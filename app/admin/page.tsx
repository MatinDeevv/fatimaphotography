// /app/admin/page.tsx

'use client'

import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import 'chart.js/auto'

// Define the type for booking data
type Booking = {
  id: number
  fullName: string
  email: string
  phone: string
  eventType: string
  date: string
  serviceType: string
  venue: string
  specialRequests?: string
  status: 'pending' | 'completed' | 'canceled' | 'archived' | 'responded'
}

export default function BookingManagementPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showArchived, setShowArchived] = useState(false)

  // Mock login
  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true)
      loadBookings()
    } else {
      alert('Invalid credentials. Please try again.')
    }
  }

  // Load bookings from localStorage on component mount
  const loadBookings = () => {
    const storedBookings = JSON.parse(
      localStorage.getItem('bookingsList') || '[]'
    )
    setBookings(storedBookings)
  }

  // Update booking status and save to localStorage
  const updateBookingStatus = (id: number, newStatus: Booking['status']) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    )
    setBookings(updatedBookings)
    localStorage.setItem('bookingsList', JSON.stringify(updatedBookings))
  }

  // Permanently delete an archived booking
  const deleteBooking = (id: number) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id)
    setBookings(updatedBookings)
    localStorage.setItem('bookingsList', JSON.stringify(updatedBookings))
  }

  // Filtered bookings based on search, selected status, and showArchived toggle
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.fullName
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesArchivedFilter = showArchived
      ? booking.status === 'archived'
      : booking.status !== 'archived'
    return matchesSearch && matchesArchivedFilter
  })

  // Conditional rendering for login or main page
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-3 border rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 text-black bg-gray-100 min-h-screen">
      {/* Toggle to show archived bookings */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={showArchived}
          onChange={() => setShowArchived(!showArchived)}
          className="mr-2"
        />
        <label>Show Archived Bookings</label>
      </div>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search bookings..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border rounded w-full p-2 mb-4"
      />

      {/* Booking List with Inline Status Update and Delete for Archived */}
      <div className="bg-white p-4 rounded shadow">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className={`border-b p-4 cursor-pointer hover:bg-gray-50 ${
              booking.status === 'canceled'
                ? 'bg-red-100'
                : booking.status === 'completed'
                  ? 'bg-green-100'
                  : booking.status === 'responded'
                    ? 'bg-yellow-100'
                    : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold">{booking.fullName}</h3>
                <p>
                  <strong>Email:</strong> {booking.email}
                </p>
                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>
                <p>
                  <strong>Event Type:</strong> {booking.eventType}
                </p>
                <p>
                  <strong>Date:</strong> {booking.date}
                </p>
                <p>
                  <strong>Service Type:</strong> {booking.serviceType}
                </p>
                <p>
                  <strong>Venue:</strong> {booking.venue}
                </p>
                {booking.specialRequests && (
                  <p>
                    <strong>Special Requests:</strong> {booking.specialRequests}
                  </p>
                )}
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => updateBookingStatus(booking.id, 'completed')}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Complete
                </button>
                <button
                  onClick={() => updateBookingStatus(booking.id, 'canceled')}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateBookingStatus(booking.id, 'responded')}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Responded
                </button>
                {booking.status === 'archived' ? (
                  <button
                    onClick={() => deleteBooking(booking.id)}
                    className="bg-black text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={() => updateBookingStatus(booking.id, 'archived')}
                    className="bg-gray-500 text-white px-2 py-1 rounded"
                  >
                    Archive
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Analytics */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Booking Analytics</h2>
        <Bar
          data={{
            labels: [
              'Pending',
              'Completed',
              'Canceled',
              'Archived',
              'Responded',
            ],
            datasets: [
              {
                label: 'Booking Status',
                data: [
                  bookings.filter((b) => b.status === 'pending').length,
                  bookings.filter((b) => b.status === 'completed').length,
                  bookings.filter((b) => b.status === 'canceled').length,
                  bookings.filter((b) => b.status === 'archived').length,
                  bookings.filter((b) => b.status === 'responded').length,
                ],
                backgroundColor: [
                  '#ffce56',
                  '#4bc0c0',
                  '#ff6384',
                  '#c0c0c0',
                  '#ffc107',
                ],
              },
            ],
          }}
        />
      </div>
    </div>
  )
}
