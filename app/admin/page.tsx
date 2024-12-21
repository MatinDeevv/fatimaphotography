'use client';

import { useState, useEffect } from 'react';
import AdminLogin from '@/app/admin/admin-components/adminlogin';
import Bookings from '@/app/admin/admin-components/bookings';
import Stories from '@/app/admin/admin-components/Stories';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<'admin' | 'developer' | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole as 'admin' | 'developer');
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (userRole: 'admin' | 'developer') => {
    setRole(userRole);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setRole(null);
    localStorage.removeItem('userRole'); // Clear the persistent login
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="text-lg">
          Logged in as: <span className="font-semibold">{role}</span>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Bookings Section */}
      <Bookings />
      <Stories />

      {/* Stories Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Stories</h2>
        <p>Coming soon...</p>
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm mt-12">
        © 2024 Fatima Photography. All rights reserved.
      </footer>
    </div>
  );
}
