import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/admin/supabaseClient';
import Bookings from './admin-components/bookings';

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

const AdminPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]); // State for bookings
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch bookings from Supabase
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('bookings').select('*');
      if (error) {
        console.error('Error fetching bookings:', error);
      } else {
        setBookings(data || []); // Set bookings data or empty array
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Bookings</h1>
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <Bookings bookings={bookings} /> // Pass bookings to Bookings component
      )}
    </div>
  );
};

export default AdminPage;
