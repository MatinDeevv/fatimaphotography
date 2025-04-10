'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
  // Adjust these constants as needed to change the logo and container size.
  const LOGO_WIDTH = 1920;     // Base width of the logo image in pixels
  const LOGO_HEIGHT = 1080;    // Base height of the logo image in pixels
  const CONTAINER_WIDTH = '30%'; // Container width that holds the logo (e.g. "60%")

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // After 3 seconds, trigger the exit animation.
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          {/* Logo container (exits upward) */}
          <motion.div
            className="flex items-center justify-center w-full px-4"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div style={{ width: CONTAINER_WIDTH }}>
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
