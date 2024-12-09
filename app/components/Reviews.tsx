"use client";
import React, { useState, useEffect } from "react";
import Head from "next/head";

const REVIEWS = [
  {
    id: 6,
    name: "Dania & Ahsan",
    avatar: "reviews/dania.jpg",
    review: `I got engaged on 1 September I got my engagement photo shoot, Photography and Videography from Fatima Photography. She has been amazing, I loved the Photo Shoot pictures and video. She is absolutely amazing at her work and I loved the professionalism and dedication that she puts in her work. I was absolutely delighted to see her hard work. I would highly recommend her, if you have weddings, birthdays, engagements, pre-wedding shoots and any other events do consider her. She has been very supportive and wonderful at her job.`,
  },
  {
    id: 0,
    name: "Tanu & ****",
    avatar: "reviews/tanu.jpg",
    review: `I would suggest Fatima to everyone. She really did amazing with our pre-wedding and engagement shoot and made me feel so comfortable as we both are camera-shy.`,
  },
  {
    id: 2,
    name: "Sunny & ****",
    avatar: "reviews/sunny.jpg",
    review: `Fatima did an awesome work in just 2 hours. They made the entire session very easy, and the final product turned out to be a great memory of our engagement everlasting.
Like`,
  },
  {
    id: 3,
    name: "Herschel & Roberto",
    avatar: "reviews/roberto.jpg",
    review: `Best team ever! Highly recommended. She knows how to capture “moments”. I’ll let the photos speak for itself ❤️🥰

P.S photos are filtered for vintage theme
`,
  }
  
];

const Slider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState<any>(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % REVIEWS.length);
  };

  useEffect(() => {
    setCurrentCard(REVIEWS[currentIndex]);
  }, [currentIndex]);

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen relative px-4">
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

      <main className="bg-white w-full h-full max-w-none rounded-none text-center mt-0 p-8 sm:p-16 flex flex-col justify-center items-center">
      <h2 className="text-4xl font-serif text-center text-gray-800 mb-12">
            What Our Clients Say
          </h2>

        <div className="flex flex-row justify-center items-center w-full h-full">
          {currentCard && (
            <>
              <img
                className="w-72 h-72 object-cover mb-10px border-8 border-white shadow-xl"
                src={currentCard.avatar}
                alt={`${currentCard.name}'s avatar`}
              />
              <div className="details flex flex-col mt-3 items-start gap-4 w-1/3 h-full justify-center pl-8">
                <blockquote
                  className="bg-white text-black p-12 w-full h-[250px] rounded-lg shadow-xl mb-8 baskervville-sc-regular"
                  style={{
                    fontSize: "small",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    minHeight: "250px",
                    paddingBottom: "10px", // To ensure enough space between the text and box
                  }}
                >
                  <p className="text-2xl mb-4 text-center baskervville-sc-regular">{currentCard.name}</p>
                  {currentCard.review}
                </blockquote>
              </div>
            </>
          )}
        </div>
      </main>

      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-black rounded-full p-3"
        onClick={handlePrev}
      >
        &#8592;
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl bg-black rounded-full p-3"
        onClick={handleNext}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Slider;
