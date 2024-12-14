import { useEffect } from 'react';
import anime from 'animejs';
import Link from 'next/link';

const WhyUsSection = () => {
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
    <section id="why-us" className="relative h-[1008px] bg-white text-green-900">
      <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 mr-32">
        <h1 className="text-3xl h-[300px] w-[600px] ml-[1350px] tracking-tighter mt-[589px] drop-shadow-2xl  leading-none absolute md:text-3xl font-body text-green-900 text-left">
          AND HOW WE MIGHT <br /> PLAY A ROLE <br /> IN TELLING YOUR STORY
        </h1>
        <div className="flex space-x-8">
          <div className="w-[450px] h-[300px] mt-96 flex items-center justify-center static">
            <span className="text-gray-400"><img src="04 (2).jpg" alt="Image 1" /></span>
          </div>
          <div className="w-[500px] h-[700px] flex items-center justify-center static">
            <span className="text-gray-400"><img src="02.jpg" alt="Image 2" /></span>
          </div>
          <div className="w-[300px] h-[450px] flex items-center justify-center static">
            <span className="text-gray-400"><img src="01.jpg" alt="Image 3" /></span>
          </div>
        </div>

        {/* Adjusted positioning to align with the top of the image */}
        <h2 className="text-3xl mt-[50px] mb-[200px] h-[350px] w-[600px] tracking-tighter drop-shadow-2xl	 absolute top-[195px] font-body left-[33.5%] transform -translate-x-1/2 md:text-3xl leading-none text-left">
          LET'S CHAT ABOUT <br />YOUR PHOTOGRAPHY <br />INVESTMENT
        </h2>

        <Link href="/your-investment" legacyBehavior>
          <a className="text-lg md:text-xl font-medium text-gray-200 underline mt-4">
            {/*LEARN MORE →*/}
          </a>
        </Link>
      </div>
    </section>
  );
};

export default WhyUsSection;
