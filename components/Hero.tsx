"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-[#1f2339] to-[#101320]">
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />

      {/* Main Content */}
      <div className="z-10 text-center px-4 max-w-5xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <span className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium text-blue-300 border border-blue-500/30">
            <Sparkles size={16} /> Welcome to the Future of Innovation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white via-blue-100 to-blue-500 mb-6 tracking-tight"
        >
          Empowering Creators at Govt. Poly Pala
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          The Innovation and Entrepreneurship Development Centre. We turn ideas into reality, fostering a culture of technical excellence and startup growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            Explore Achievements <ArrowRight size={18} />
          </button>
          <button className="px-8 py-4 rounded-full glass-panel hover:bg-white/10 text-white font-semibold transition-all border border-slate-700">
            Student Login
          </button>
        </motion.div>

      </div>
    </section>
  );
}