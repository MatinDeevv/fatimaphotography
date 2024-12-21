'use client';

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

type Booking = {
  id: number;
  fullName: string;
  email: string;
  eventType: string;
  date: string;
  status: 'pending' | 'completed' | 'canceled';
};

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Pull bookings from localStorage
  useEffect(() => {
    const fetchBookings = () => {
      const storedBookings = JSON.parse(
        localStorage.getItem('bookingsList') || '[]'
      );
      setBookings(storedBookings);
    };

    fetchBookings();

    // Auto-sync every 5 seconds
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  const updateBookingStatus = (id: number, newStatus: Booking['status']) => {
    const updatedBookings = bookings.map((b) =>
      b.id === id ? { ...b, status: newStatus } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem('bookingsList', JSON.stringify(updatedBookings));
  };

  const deleteBooking = (id: number) => {
    const updatedBookings = bookings.filter((b) => b.id !== id);
    setBookings(updatedBookings);
    localStorage.setItem('bookingsList', JSON.stringify(updatedBookings));
  };

  const chartData = {
    labels: ['Pending', 'Completed', 'Canceled'],
    datasets: [
      {
        label: 'Booking Overview',
        data: [
          bookings.filter((b) => b.status === 'pending').length,
          bookings.filter((b) => b.status === 'completed').length,
          bookings.filter((b) => b.status === 'canceled').length,
        ],
        backgroundColor: ['#FACC15', '#22C55E', '#EF4444'],
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-4xl font-bold mb-8">Manage Bookings</h2>
        <Bar data={chartData} />

        <div className="mt-12 space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-gray-50 p-6 rounded-xl flex justify-between items-center shadow"
            >
              <div>
                <h3 className="text-xl font-semibold">{booking.fullName}</h3>
                <p>{booking.eventType}</p>
                <p>{booking.date}</p>
                <p>{booking.status}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => updateBookingStatus(booking.id, 'completed')}
                  className="bg-green-500 text-white px-5 py-2 rounded-lg"
                >
                  Complete
                </button>
                <button
                  onClick={() => updateBookingStatus(booking.id, 'canceled')}
                  className="bg-yellow-500 text-white px-5 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteBooking(booking.id)}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
