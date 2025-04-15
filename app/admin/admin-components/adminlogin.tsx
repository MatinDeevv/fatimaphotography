'use client';

import React, { useState, useEffect } from 'react';

interface AdminLoginProps {
  onLoginSuccess: (role: 'admin' | 'developer') => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role === 'developer') {
      onLoginSuccess('developer');
    }
  }, [onLoginSuccess]);

  const handleLogin = () => {
    const validCredentials = [
      { username: 'admin', password: 'fatimaphotography', role: 'Admin123@@' },
      { username: 'developer', password: 'dev', role: 'developer' }
    ];

    const user = validCredentials.find((u) => u.username === username && u.password === password);

    if (user) {
      if (user.role === 'developer') {
        localStorage.setItem('userRole', user.role);
      }
      setError('');
      onLoginSuccess(user.role as 'admin' | 'developer');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      <div className="relative bg-white bg-opacity-10 p-10 rounded-3xl shadow-2xl w-full max-w-md backdrop-blur-lg">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-extrabold text-white tracking-wide">Welcome Back</h2>
          <p className="text-gray-300 mt-2">Sign in to manage your dashboard</p>
        </div>

        <div className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 bg-transparent border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-400"
            />
            <span className="absolute top-3 left-4 text-gray-400 text-xl">👤</span>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-transparent border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white placeholder-gray-400"
            />
            <span className="absolute top-3 left-4 text-gray-400 text-xl">🔒</span>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm text-center animate-pulse">{error}</p>}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-blue-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Sign In
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Need help?{' '}
            <a href="#" className="underline hover:text-white">
              Contact Support
            </a>
          </p>
        </div>

        {/* Decorative Glow */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-400 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default AdminLogin;
