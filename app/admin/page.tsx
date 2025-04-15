'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/admin/supabaseClient';
import Bookings from './admin-components/bookings';
import Story from './admin-components/story';
import Upload from './admin-components/upload';
import AdminLogin from './admin-components/adminlogin';

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
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'developer' | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('bookings').select('*');
      if (error) {
        console.error('Error fetching bookings:', error);
      } else {
        setBookings(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const savedRole = localStorage.getItem('userRole') as 'admin' | 'developer' | null;
    if (savedRole) {
      setUserRole(savedRole);
    }
  }, []);

  useEffect(() => {
    if (userRole) {
      fetchBookings();
    }
  }, [userRole]); // <--- only fetch when userRole is set

  if (!userRole) {
    return <AdminLogin onLoginSuccess={setUserRole} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Bookings</h1>
      {loading ? (
        <p className="text-center text-xl text-gray-500">Loading bookings...</p>
      ) : (
        <div>
          <Bookings bookings={bookings} reloadBookings={fetchBookings} />
          <h3>first upload your photo to the basket and then select it in the story form</h3>
          <Upload />
          <Story />

        </div>
      )}
    </div>
  );
};

export default AdminPage;
