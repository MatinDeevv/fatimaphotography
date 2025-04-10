// components/Carousel.tsx
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[];
}

// Dynamically import the interactive client carousel with SSR disabled.
const ClientCarousel = dynamic(
  () => import('./ClientCarousel'),
  { ssr: false }
);

export default function Carousel({ images }: CarouselProps) {
  // This state helps us know when the component has mounted (client-side).
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="relative h-screen mb-40">
      {!isMounted ? (
        // Static fallback: shows a grid of images immediately upon load.
        <div className="h-full w-full grid grid-cols-3">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
      ) : (
        // After hydration, load the interactive carousel.
        <ClientCarousel images={images} />
      )}
    </header>
  );
}
