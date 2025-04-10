'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
  // Base dimensions for the logo image.
  const LOGO_WIDTH = 1920;  // Logo's base width (in pixels)
  const LOGO_HEIGHT = 1080; // Logo's base height (in pixels)

  // Check session storage safely to decide whether to show the animation.
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return !sessionStorage.getItem('visited');
    }
    return true;
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    try {
      if (!sessionStorage.getItem('visited')) {
        timer = setTimeout(() => {
          sessionStorage.setItem('visited', 'true');
          setIsVisible(false);
        }, 3000);
      }
    } catch (err) {
      console.error('Session storage access failed:', err);
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, []);

  // Framer Motion variants for the container and logo.
  const containerVariants = {
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  const logoVariants = {
    hidden: { scale: 0.2, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { y: '-100%', opacity: 0, transition: { duration: 1, ease: 'easeInOut' } },
  };

  // Gradient style with vendor prefixes for cross-browser support.
  const gradientStyle = {
    background: 'linear-gradient(135deg, #000, #444)',
    WebkitBackground: '-webkit-linear-gradient(135deg, #000, #444)', // Older Safari
    MozBackground: '-moz-linear-gradient(135deg, #000, #444)', // Older Firefox
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50 overflow-hidden"
          variants={containerVariants}
          initial="visible"
          animate="visible"
          exit="exit"
        >
          {/* Animated Background Overlay with subtle pulsing effect */}
          <motion.div
            className="absolute inset-0"
            style={gradientStyle}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Logo Container */}
          <motion.div
            className="flex items-center justify-center w-full px-4 relative z-10"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          >
            {/* Responsive container: 
                80% width on mobile, 60% on small screens, and 30% on medium+ */}
            <div className="w-[80%] sm:w-[60%] md:w-[30%] relative">
              <Image
                src="/lololololo.png"
                alt="Logo"
                width={LOGO_WIDTH}
                height={LOGO_HEIGHT}
                className="object-cover w-full h-auto"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
