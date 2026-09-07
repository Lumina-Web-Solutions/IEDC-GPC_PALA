'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  // Stagger animation variants for smooth reveals
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="relative pt-32 pb-20 px-6 md:px-12 bg-[#FAFAFA] min-h-screen flex flex-col justify-center">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto w-full"
      >
        {/* Main Typography */}
        <motion.div variants={item} className="max-w-5xl mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-gray-900 leading-[1.1] tracking-tight mb-6">
            Innovation and <br />
            Entrepreneurship <br />
            Development Centre.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-sans tracking-wide">
            Government Polytechnic College, Pala
          </p>
        </motion.div>

        {/* IEDC Image */}
        <motion.div variants={item} className="w-full h-[400px] md:h-[600px] relative rounded-2xl overflow-hidden mb-16 shadow-2xl">
          {/* Ensure you place an image named hero-bg.jpg in your public folder */}
          <div className="absolute inset-0 bg-gray-300 animate-pulse" /> {/* Placeholder background */}
          <Image 
            src="/hero-bg.png" // Change this to your actual image later
            alt="IEDC at GPC Pala"
            fill
            className="object-cover relative z-10"
            priority
          />
        </motion.div>

        {/* Famous Quote */}
        <motion.div variants={item} className="max-w-3xl mx-auto text-center">
          <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-800 leading-relaxed">
            "Innovation distinguishes between a leader and a follower."
          </blockquote>
          <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-gray-500 uppercase">
            — Steve Jobs
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}