// File: app/admin/page.tsx
'use client';

import React from 'react';
import Head from 'next/head';
import Bookings from './admin-components/bookings';
import NavBar from '@/app/components/NavBar';
const AdminPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Admin Dashboard - Fatima Photography</title>
        <meta name="description" content="Admin dashboard for managing bookings at Fatima Photography." />
      </Head>
<NavBar />
      <div className="min-h-screen bg-gradient-to-r mt-52 from-gray-100 to-gray-200 p font-body">
        <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl">
          {/* Header */}
          <header className="flex items-center justify-between p-6 border-b">
            <h1 className="text-5xl font-extrabold text-gray-800">Admin Dashboard</h1>
            {/* Optional: Add a logo or user profile here */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, Admin</span>
              {/* Example Profile Icon */}
              <img
                src="/admin-profile.png"
                alt="Admin Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          </header>

          {/* Main Content */}
          <main className="p-8">
            <Bookings />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
