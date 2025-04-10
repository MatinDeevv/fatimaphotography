import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
}

// Dynamically import the client carousel to ensure client-side-only loading.
const ClientCarousel = dynamic(() => import('./ClientCarousel'), { ssr: false });

export default function Carousel({ images }: CarouselProps) {
  // Track the client-side mount for optimized rendering.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="relative h-screen mb-40">
      {!isMounted ? (
        // Optimized static fallback: use responsive grid columns 
        // (1 column for small/mobile, 2 for sm, 3 for md and above).
        <div className="h-full w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
      ) : (
        // Load the interactive carousel after hydration.
        <ClientCarousel images={images} />
      )}
    </header>
  );
}
