import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import Link from 'next/link';

// Match your design’s “full-size” width/height
const DESIGN_WIDTH = 1400;
const DESIGN_HEIGHT = 1008;

const WhyUsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleResize() {
      if (!containerRef.current) return;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Figure out how much we need to scale so the entire design fits
      // in the available viewport.
      const scaleX = vw / DESIGN_WIDTH;
      const scaleY = vh / DESIGN_HEIGHT;
      const scale = Math.min(scaleX, scaleY);

      // Center: translate(-50%, -50%) + scale(...)
      containerRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // run on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // anime.js fade-in effect
  useEffect(() => {
    anime({
      targets: '[data-tr]',
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: anime.stagger(200),
    });
  }, []);

  return (
    <section
      id="why-us"
      className="
        w-full
        h-screen
        overflow-hidden
        relative
        bg-white
        text-green-900
      "
    >
      {/* 
        This absolutely positioned 'canvas' 
        is your entire 1400x1008 design. We center & scale it.
      */}
      <div
        ref={containerRef}
        style={{
          width: DESIGN_WIDTH,
          height: DESIGN_HEIGHT,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transformOrigin: 'center', // scale from center
        }}
      >
        {/* === Your original absolute layout code === */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 mr-32">
          <h1
            data-tr
            className="
              text-3xl
              h-[300px]
              w-[600px]
              ml-[1350px]
tracking-wide
              mt-[589px]
              drop-shadow-2xl
              leading-none
              absolute
font-bold
              text-green-900
              text-left
            "
          >
            AND HOW WE MIGHT <br /> PLAY A ROLE <br /> IN TELLING YOUR STORY
          </h1>
          
          <div className="flex space-x-8">
            <div className="w-[450px] h-[300px] mt-96 flex items-center justify-center static">
              <span className="text-gray-400">
                <img src="04 (2).jpg" alt="Image 1" />
              </span>
            </div>
            <div className="w-[500px] h-[700px] flex items-center justify-center static">
              <span className="text-gray-400">
                <img src="02.jpg" alt="Image 2" />
              </span>
            </div>
            <div className="w-[300px] h-[450px] flex items-center justify-center static">
              <span className="text-gray-400">
                <img src="01.jpg" alt="Image 3" />
              </span>
            </div>
          </div>
          <h2
            data-tr
            className="
            mr-60
              text-3xl
              mt-[50px]
              mb-[200px]
              h-[350px]
              w-[600px]

              drop-shadow-2xl
              absolute
              top-[195px]
font-bold
tracking-wide
              left-[4.5%]
              transform
              -translate-x-1/2
              leading-none
              text-left
            "
          >
            LET&apos;S CHAT ABOUT <br />
            YOUR PHOTOGRAPHY <br />
            INVESTMENT
          </h2>

          <Link href="/your-investment" legacyBehavior>
            <a
              data-tr
              className="
                text-lg
                md:text-xl
                font-medium
                text-gray-200
                underline
                mt-4
              "
            >
              {/*LEARN MORE →*/}
            </a>
          </Link>
        </div>
        {/* === End original code === */}
      </div>
    </section>
  );
};

export default WhyUsSection;
