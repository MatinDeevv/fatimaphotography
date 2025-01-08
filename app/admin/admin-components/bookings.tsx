// File: app/admin/admin-components/bookings.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTrash, FaEnvelope } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { toast } from 'react-toastify';

type Booking = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  customEvent?: string;
  date: string;
  status: 'pending' | 'completed' | 'responded' | 'deleted';
  submittedAt: string;
};

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'responded' | 'deleted'>('all');
  const [search, setSearch] = useState<string>('');

  // Fetch bookings from localStorage on component mount
  useEffect(() => {
    const fetchBookings = () => {
      try {
        const storedBookings: Booking[] = JSON.parse(localStorage.getItem('bookingsList') || '[]');
        setBookings(storedBookings);
      } catch (error) {
        console.error('Failed to parse bookings from localStorage:', error);
        setBookings([]);
      }
    };

    fetchBookings();

    // Optional: Set up an interval to fetch bookings periodically (e.g., every 5 seconds)
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  // Function to update booking status
  const updateBookingStatus = (id: number, newStatus: Booking['status']) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === id ? { ...booking, status: newStatus } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookingsList', JSON.stringify(updatedBookings));
    toast.success(`Booking status updated to "${newStatus}".`);
  };

  // Function to get status color classes
  const getStatusColor = (status: Booking['status']) => {
    const statusStyles: Record<Booking['status'], string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      responded: 'bg-blue-100 text-blue-800',
      deleted: 'bg-red-100 text-red-800',
    };
    return statusStyles[status] || 'bg-gray-100 text-gray-800';
  };

  // Filter and search bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch =
      booking.fullName.toLowerCase().includes(search.toLowerCase()) ||
      booking.email.toLowerCase().includes(search.toLowerCase()) ||
      booking.phone.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-16 h-screen w-full overflow-auto">

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Filter Dropdown */}
        <div className="flex items-center space-x-2">
          <label htmlFor="filter" className="text-gray-700 font-medium">
            Filter by Status:
          </label>
          <select
            id="filter"
            className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="responded">Responded</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="flex items-center space-x-2">
          <label htmlFor="search" className="text-gray-700 font-medium">
            Search:
          </label>
          <input
            id="search"
            type="text"
            className="border border-gray-300 rounded-md p-2 w-64 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Name, Email, or Phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Booking List */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-primary text-white">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold">ID</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Full Name</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Email</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Phone</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Date</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Event Type</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Status</th>
              <th className="py-3 px-6 text-left text-sm font-semibold">Submitted At</th>
              <th className="py-3 px-6 text-center text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-4 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            ) : (
              filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 font-body transition-colors duration-300">
                  <td className="py-3 px-6 text-sm text-gray-700">{booking.id}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{booking.fullName}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{booking.email}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">{booking.phone}</td>
                  <td className="py-3 px-6 text-sm text-gray-700">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-700">
                    {booking.eventType === 'other' ? booking.customEvent : booking.eventType}
                  </td>
                  <td
                    className={`py-2 px-4 text-sm font-medium rounded-full text-center ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-700">
                    {new Date(booking.submittedAt).toLocaleString()}
                  </td>
                  <td className="py-3 px-6 text-center space-x-2">
                    {/* Action Buttons */}
                    <IconContext.Provider value={{ size: '1em' }}>
                      {booking.status !== 'completed' && (
                        <button
                          className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded-md transition-colors duration-300"
                          onClick={() => updateBookingStatus(booking.id, 'completed')}
                        >
                          <FaCheckCircle />
                          <span>Complete</span>
                        </button>
                      )}
                      {booking.status !== 'deleted' && (
                        <button
                          className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-md transition-colors duration-300"
                          onClick={() => updateBookingStatus(booking.id, 'deleted')}
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      )}
                      {booking.status !== 'responded' && (
                        <button
                          className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded-md transition-colors duration-300"
                          onClick={() => updateBookingStatus(booking.id, 'responded')}
                        >
                          <FaEnvelope />
                          <span>Respond</span>
                        </button>
                      )}
                    </IconContext.Provider>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
