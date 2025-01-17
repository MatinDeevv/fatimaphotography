import React from 'react';

// Define the type for Booking
type Booking = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  eventType?: string | null;
  customEvent?: string | null;
  date?: string | null;
  status?: string | null;
  submittedAt?: string | null;
};

// Define the props type for the Bookings component
type BookingsProps = {
  bookings: Booking[];
};

const Bookings: React.FC<BookingsProps> = ({ bookings }) => {
  return (
    <div className="overflow-auto bg-gray-50 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Bookings Overview</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-200 text-sm">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Full Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Event Type</th>
            <th className="px-4 py-2 text-left">Custom Event</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Submitted At</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={10} className="px-4 py-4 text-center text-gray-500">
                No bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-100 transition">
                <td className="px-4 py-2">{booking.id}</td>
                <td className="px-4 py-2">{booking.fullName}</td>
                <td className="px-4 py-2">{booking.email}</td>
                <td className="px-4 py-2">{booking.phone}</td>
                <td className="px-4 py-2">{booking.eventType || 'N/A'}</td>
                <td className="px-4 py-2">{booking.customEvent || 'N/A'}</td>
                <td className="px-4 py-2">{booking.date || 'N/A'}</td>
                <td
                  className={`px-4 py-2 font-medium text-center ${
                    booking.status === 'pending'
                      ? 'text-yellow-500'
                      : booking.status === 'completed'
                      ? 'text-green-500'
                      : booking.status === 'deleted'
                      ? 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {booking.status || 'N/A'}
                </td>
                <td className="px-4 py-2">
                  {booking.submittedAt
                    ? new Date(booking.submittedAt).toLocaleString()
                    : 'N/A'}
                </td>
                <td className="px-4 py-2 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded-md"
                      onClick={() => alert(`Marking booking ${booking.id} as complete`)}
                    >
                      Complete
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded-md"
                      onClick={() => alert(`Responding to booking ${booking.id}`)}
                    >
                      Respond
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-md"
                      onClick={() => alert(`Deleting booking ${booking.id}`)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
