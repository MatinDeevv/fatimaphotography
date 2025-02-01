

import Link from "next/link";
import { motion } from "framer-motion";

const SpecialOffersBanner = () => {
  return (
    <motion.div
      className="bg-pink-200 text-red-900 mt-24 mb-3 py-6 px-4 text-center border-t-4 border-red-500"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-3xl font-bold">💘 Valentine's Special Offer! 💘</h2>
      <p className="text-lg mt-2">Book now and save 15% on your romantic photoshoot!</p>
      <Link href="/offers">
        <motion.button
          className="mt-4 bg-red-700 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-red-500 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ❤️ See the Offer
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default SpecialOffersBanner;
