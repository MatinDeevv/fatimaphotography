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
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Event Type</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Submitted At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b hover:bg-gray-100 transition duration-300"
                >
                  <td className="px-4 py-2">{booking.fullName}</td>
                  <td className="px-4 py-2">{booking.email}</td>
                  <td className="px-4 py-2">{booking.phone}</td>
                  <td className="px-4 py-2">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    {booking.eventType === 'other'
                      ? booking.customEvent
                      : booking.eventType}
                  </td>
                  <td
                    className={`px-4 py-2 font-semibold text-center ${
                      booking.status === 'pending'
                        ? 'text-yellow-600'
                        : booking.status === 'completed'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(booking.submittedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      {/* Complete Action */}
                      {booking.status !== 'completed' && (
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                          onClick={() => alert('Mark as completed!')}
                        >
                          Complete
                        </button>
                      )}
                      {/* Delete Action */}
                      {booking.status !== 'deleted' && (
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                          onClick={() => alert('Delete this booking!')}
                        >
                          Delete
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
