'use client';

import React, { useEffect, useRef, useState } from 'react';
import Carousel from './Carousel';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroGateProps {
  images: string[];
  children: React.ReactNode;
}

const HeroGate: React.FC<HeroGateProps> = ({ images, children }) => {
  const [showChildren, setShowChildren] = useState(false);
  const autoplayTriggeredRef = useRef(false);

  const handleFirstSlideDone = () => {
    if (!autoplayTriggeredRef.current) {
      autoplayTriggeredRef.current = true;
      setTimeout(() => {
        setShowChildren(true);
      }, 300);
    }
  };

  return (
    <>
      {!showChildren && (
        <Carousel images={images} onFirstSlideTransition={handleFirstSlideDone} />
      )}

      <AnimatePresence>
        {showChildren && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeroGate;
