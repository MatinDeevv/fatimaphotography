import { useEffect } from "react";
import anime from "animejs";
import Link from "next/link";

const AppointmentSection = () => {
  useEffect(() => {
    anime({
      targets: ".animate-text",
      opacity: [0, 1],
      translateY: [20, 0],
      easing: "easeOutQuad",
      duration: 1000,
      delay: anime.stagger(200),
    });
    anime({
      targets: ".animate-button",
      scale: [0.8, 1],
      opacity: [0, 1],
      easing: "easeOutQuad",
      duration: 1000,
      delay: 1200,
    });
  }, []);

  return (
    <section className="bg-white text-black py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold animate-text mb-4">LET'S GET IN TOUCH</h2>
        <p className="text-xl animate-text mb-8 max-w-3xl mx-auto">
          We can have a 15 min free consylting session to figure out a suitable package for you.
        </p>
        <Link href="/contact">
          <button
            className="bg-green-800 text-xl text-white py-3 px-6 rounded-lg shadow-lg scale-x-125 w-72 h-32 hover:bg-green-700 animate-button"
            aria-label="Book Now"
          >
            Book Now
          </button>
        </Link>
      </div>
    </section>
  );
};

export default AppointmentSection;
