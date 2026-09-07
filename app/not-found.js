'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-6 text-center">
      
      {/* Animated Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-8"
      >
        <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto">
          <Image 
            src="/Logo.png" 
            alt="IEDC Logo" 
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Animated 404 Text */}
      <motion.h1 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="text-8xl md:text-9xl font-serif text-gray-900 mb-4"
      >
        404
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-6"
      >
        Page Not Found
      </motion.h2>

      {/* Animated Description */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="text-gray-600 max-w-md mx-auto mb-10 font-sans leading-relaxed"
      >
        The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
      </motion.p>

      {/* Animated Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        <Link 
          href="/" 
          className="bg-gray-900 text-white font-bold tracking-widest uppercase py-4 px-8 rounded-full hover:bg-black transition-colors inline-block"
        >
          Return to Homepage
        </Link>
      </motion.div>

    </div>
  );
}