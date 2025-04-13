'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    if (imageLoaded) {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [imageLoaded])

  return (
    <>
      {/* Main content always renders */}
      {children}

      {/* Overlay loading screen */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-black z-[9999] px-4 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col items-center pointer-events-auto"
            >
              <Image
                src="/lololololo.png"
                alt="Logo"
                width={600}
                height={400}
                priority
                onLoadingComplete={() => setImageLoaded(true)}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
