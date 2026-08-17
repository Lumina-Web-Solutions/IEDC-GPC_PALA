"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden font-sans p-6">
      
      {/* Soft, organic background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-160 h-160 bg-blue-100/80 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-140 h-140 bg-emerald-100/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[15%] w-160 h-160 bg-amber-100/50 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center bg-white/70 backdrop-blur-2xl p-10 md:p-16 rounded-4xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-2xl w-full"
      >
        
        {/* Updated College Logo Path */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <img 
            src="/favicon.ico" 
            alt="College Logo" 
            className="w-24 h-24 object-contain drop-shadow-sm"
            onError={(e) => {
              // Fallback just in case the browser caches a broken link
              e.currentTarget.style.display = 'none';
            }}
          />
        </motion.div>

        {/* Institution Badge */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-slate-500 font-bold tracking-widest uppercase mb-4 text-xs md:text-sm"
        >
          IEDC • Govt. Poly Pala
        </motion.h2>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-800 tracking-tight"
        >
          We are Building<br />The Future.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-slate-500 text-lg mb-12 max-w-md leading-relaxed"
        >
          Our official digital platform is currently under construction. We are preparing a seamless and secure experience for our innovators.
        </motion.p>

        {/* Refined Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-full max-w-xs h-1 bg-slate-200 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-slate-800 rounded-full"
            initial={{ width: "0%", x: "0%" }}
            animate={{ width: ["0%", "50%", "100%"], x: ["0%", "50%", "100%"] }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
        
      </motion.div>
    </main>
  );
}
