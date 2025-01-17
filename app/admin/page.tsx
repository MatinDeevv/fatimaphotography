'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/app/admin/supabaseClient';
import Bookings from './admin-components/bookings';

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

const AdminPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('bookings').select('*');
      if (error) {
        console.error('Error fetching bookings:', error);
      } else {
        setBookings(data || []);
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
        <Bookings bookings={bookings} />
      )}
    </div>
  );
};

export default AdminPage;
