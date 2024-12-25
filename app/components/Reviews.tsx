'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const REVIEWS = [
  {
    id: 6,
    name: 'Dania & Ahsan',
    avatar: 'reviews/dania.jpg',
    review: `I got engaged on 1 September I got my engagement photo shoot, Photography and Videography from Fatima Photography. She has been amazing, I loved the Photo Shoot pictures and video. She is absolutely amazing at her work and I loved the professionalism and dedication that she puts in her work. I was absolutely delighted to see her hard work. I would highly recommend her, if you have weddings, birthdays, engagements, pre-wedding shoots and any other events do consider her. She has been very supportive and wonderful at her job.`
  },
  {
    id: 0,
    name: 'Tanu & Ritesh',
    avatar: 'reviews/Tanu.jpg',
    review: `I would suggest Fatima to everyone. She really did amazing with our pre-wedding and engagement shoot and made me feel so comfortable as we both are camera-shy.`
  },
  {
    id: 2,
    name: 'Sunny & ****',
    avatar: 'reviews/Sunny.jpg',
    review: `Fatima did an awesome work in just 2 hours. They made the entire session very easy, and the final product turned out to be a great memory of our engagement everlasting.`
  },
  {
    id: 3,
    name: 'Herschel & Roberto',
    avatar: 'reviews/roberto.jpg',
    review: `Best team ever! Highly recommended. She knows how to capture “moments”. I’ll let the photos speak for itself ❤️🥰 P.S photos are filtered for vintage theme`
  }
];

const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState<any>(null);

  useEffect(() => {
    setCurrentCard(REVIEWS[currentIndex]);
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
  };

  return (
    <div className="flex justify-center items-center bg-green-950 min-h-screen w-full relative px-4">
      <Head>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Baskervville+SC&display=swap');
          .baskervville-sc-regular {
            font-family: "Baskervville SC", serif;
            font-weight: 400;
            font-style: normal;
          }
        `}</style>
      </Head>

      <main className="bg-green-950 text-white w-full max-w-screen-xl rounded-none text-center px-4 sm:px-8 flex flex-col justify-center items-center">
        <h2 className="text-4xl sm:text-5xl font-serif text-center text-white mb-12 sm:mb-20">
          WHAT OUR CLIENTS SAY
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
          {currentCard && (
            <>
              <img
                className="w-[300px] sm:w-[400px] md:w-[450px] h-[300px] sm:h-[400px] md:h-[450px] object-cover border-4 border-white shadow-lg"
                src={currentCard.avatar}
                alt={`${currentCard.name}'s avatar`}
              />
              <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-[600px]">
                <blockquote className="text-white p-4 sm:p-6 rounded-lg baskervville-sc-regular">
                  <p className="text-lg sm:text-xl font-semibold mb-2">{currentCard.name}</p>
                  <p className="text-sm sm:text-base">{currentCard.review}</p>
                </blockquote>
              </div>
            </>
          )}
        </div>
      </main>

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl sm:text-4xl p-3"
        onClick={handlePrev}
      >
        &#8592;
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl sm:text-4xl p-3"
        onClick={handleNext}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Slider;
