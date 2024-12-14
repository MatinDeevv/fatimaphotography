import type { NextConfig } from 'next';
module.exports = {
  devIndicators: {
    buildActivity: false, // Disable build activity indicator
    errorOverlay: false, // Disable the error overlay
  },
};

const nextConfig: NextConfig = {
  reactStrictMode: true, // Keep this if you need it
};

export default nextConfig;
