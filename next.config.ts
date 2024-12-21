import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,  // Disable build activity indicator
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.devtool = false;  // Disables error overlay during development
    }
    return config;
  },
};

export default nextConfig;
