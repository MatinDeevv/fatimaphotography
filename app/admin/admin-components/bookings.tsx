'use client';

import React from 'react';

type Booking = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  eventType: string;
  customEvent?: string;
  referral?: string;
  specialRequests?: string;
  status: string;
  submittedAt: string;
};

const Bookings: React.FC<{ bookings: Booking[] }> = ({ bookings }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 px-8 py-12 font-body">
      <h2 className="text-6xl font-extrabold text-center text-gray-800 mb-12">
        Admin Bookings Dashboard
      </h2>
      <div className="overflow-hidden rounded-xl shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-lg">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-2xl font-bold uppercase">Full Name</th>
              <th className="px-6 py-4 text-left text-2xl font-bold uppercase">Email</th>
              <th className="px-6 py-4 text-left text-2xl font-bold uppercase">Phone</th>
              <th className="px-6 py-4 text-left text-2xl font-bold uppercase">Date</th>
              <th className="px-6 py-4 text-left text-2xl font-bold uppercase">Event Type</th>
              <th className="px-6 py-4 text-left text-2xl font-bold uppercase">Status</th>
              <th className="px-6 py-4 text-left text-2xl font-bold uppercase">Submitted At</th>
              <th className="px-6 py-4 text-center text-2xl font-bold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-500 text-2xl">
                  No bookings found. 🚀
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-gray-100 transition-all duration-300"
                >
                  <td className="px-6 py-4 text-gray-800 text-xl font-medium">
                    {booking.fullName}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-xl">{booking.email}</td>
                  <td className="px-6 py-4 text-gray-600 text-xl">{booking.phone}</td>
                  <td className="px-6 py-4 text-gray-600 text-xl">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-xl">
                    {booking.eventType === 'other' ? booking.customEvent : booking.eventType}
                  </td>
                  <td
                    className={`px-6 py-4 text-xl font-bold ${
                      booking.status === 'pending'
                        ? 'text-yellow-500'
                        : booking.status === 'completed'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-xl">
                    {new Date(booking.submittedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center space-x-4">
                      {booking.status !== 'completed' && (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md text-lg transition-all duration-300"
                          onClick={() => alert('Mark as completed!')}
                        >
                          ✅ Complete
                        </button>
                      )}
                      {booking.status !== 'deleted' && (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md text-lg transition-all duration-300"
                          onClick={() => alert('Delete this booking!')}
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </div>
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
