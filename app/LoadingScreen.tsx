'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 2500); // چند ثانیه باشه رو صفحه

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-black z-[9999]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-center"
          >
            {/* لوگو */}
            <Image
              src="/lololololo.png"
              alt="Logo"
              width={300}
              height={200}
              priority
              className="w-full h-auto object-contain"
            />

            {/* خط لودینگ متحرک */}
            <motion.div
              className="mt-6 h-1 w-48 bg-white/20 overflow-hidden rounded-full relative"
            >
              <motion.div
                className="absolute h-full w-1/3 bg-white"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
