import { Config } from 'tailwindcss'; // Import the Tailwind Config type
import typography from '@tailwindcss/typography'; // Import plugins
import forms from '@tailwindcss/forms';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}' // Ensure these match your directory structure
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0.33, 1, 0.68, 1)' // Smooth arc movement
      },
      perspective: {
        500: '500px',
        1000: '1000px',
        1500: '1500px' // Added for a deeper 3D effect
      },
      fontSize: {
        sm: '0.750rem', // 12px
        base: '1rem', // 16px
        xl: '1.333rem', // 21.28px
        '2xl': '1.777rem', // 28.48px
        '3xl': '2.369rem', // 37.92px
        '4xl': '3.158rem', // 50.56px
        '5xl': '4.210rem' // 67.36px
      },
      fontFamily: {
        heading: ['"Inter"', 'sans-serif'],
        body: ['"Funnel Display"', 'sans-serif']
      },
      colors: {
        primary: '#4F46E5', // Indigo for primary accents
        secondary: '#22D3EE', // Cyan for secondary elements
        accent: '#FBBF24', // Amber for highlights
        dark: '#1E293B' // Dark gray, ideal for dark mode backgrounds
      },
      spacing: {
        '2px': '2px',
        '3px': '3px',
        '1.5': '0.375rem', // 6px
        '2.5': '0.625rem', // 10px
        '4.5': '1.125rem', // 18px
        '300px': '300px',
        '400px': '400px'
      }
    }
  },
  plugins: [
    typography, // Styled text
    forms // Better form styling
  ]
};

export default config;
