'use client';

import React from 'react';
import { supabase } from '@/app/admin/supabaseClient';
import NewBookingListener from '@/app/admin/newbooking';
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

const Bookings: React.FC<{ bookings: Booking[]; reloadBookings: () => void }> = ({
  bookings,
  reloadBookings
}) => {
  // Function to update booking status
  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', id);

      if (error) {
        console.error('Error updating status:', error);
        alert('Failed to update booking status.');
      } else {
        alert(`Booking marked as ${newStatus}!`);
        reloadBookings(); // Reload bookings to reflect changes
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred.');
    }
  };

  // Function to delete a booking
  const deleteBooking = async (id: number) => {
    const confirmation = prompt('To confirm deletion, type "Delete Booking" exactly.');

    if (confirmation !== 'Delete Booking') {
      alert('Booking deletion canceled.');
      return;
    }

    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);

      if (error) {
        console.error('Error deleting booking:', error);
        alert('Failed to delete the booking.');
      } else {
        alert('Booking successfully deleted!');
        reloadBookings(); // Reload bookings to reflect deletion
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('An unexpected error occurred while deleting.');
    }
  };

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
                  className="hover:bg-gray-100 font-body transition-all duration-300"
                >
                  <td className="px-6 py-4 text-gray-800 font-body text-xl font-medium">
                    {booking.fullName}
                  </td>
                  <td className="px-6 py-4 font-body text-gray-600 text-xl">{booking.email}</td>
                  <td className="px-6 py-4 font-body text-gray-600 text-xl">{booking.phone}</td>
                  <td className="px-6 py-4 font-body text-gray-600 text-xl">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 font-body text-gray-600 text-xl">
                    {booking.eventType === 'other' ? booking.customEvent : booking.eventType}
                  </td>
                  <td
                    className={`px-6 py-4 font-body text-xl font-bold ${
                      booking.status === 'pending'
                        ? 'text-yellow-500'
                        : booking.status === 'completed'
                          ? 'text-green-500'
                          : 'text-red-500'
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </td>
                  <td className="px-6 py-4 font-body text-gray-600 text-xl">
                    {new Date(booking.submittedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 font-body text-center">
                    <div className="flex font-body justify-center space-x-4">
                      {booking.status !== 'completed' && (
                        <button
                          className="bg-green-500 font-body hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md text-lg transition-all duration-300"
                          onClick={() => updateStatus(booking.id, 'completed')}
                        >
                          ✅ Complete
                        </button>
                      )}
                      <button
                        className="bg-red-500 font-body hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md text-lg transition-all duration-300"
                        onClick={() => deleteBooking(booking.id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <NewBookingListener />
      </div>
    </div>
  );
};

export default Bookings;
