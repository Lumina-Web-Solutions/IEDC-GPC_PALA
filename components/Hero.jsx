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
       {/* Inside Hero.jsx */}

{/* Main Typography */}
<motion.div variants={item} className="max-w-5xl mx-auto mb-8 md:mb-12 text-center px-2 md:px-0">
  {/* Changed text-5xl to text-4xl for mobile, reduced bottom margin */}
  <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-gray-900 leading-[1.1] tracking-tight mb-4 md:mb-6">
    Innovation and <br />
    Entrepreneurship <br />
    Development Centre.
  </h1>
  <p className="text-base md:text-xl text-gray-600 font-sans tracking-wide">
    Government Polytechnic College, Pala
  </p>
</motion.div>

    {/* IEDC Video */}
    <motion.div variants={item} className="w-full h-[300px] md:h-[600px] relative rounded-2xl overflow-hidden mb-12 md:mb-16 shadow-2xl bg-gray-900">
      {/* Loading pulse effect before video starts playing */}
      <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="object-cover w-full h-full relative z-10"
      >
        <source src="/V2.mp4" type="video/mp4" />
      </video>
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
