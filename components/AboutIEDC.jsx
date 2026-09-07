'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function AboutIEDC() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await fetch('/api/about');
        if (res.ok) setAboutData(await res.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, []);

  if (loading || !aboutData) {
    return (
      <section className="py-24 bg-[#FAFAFA] flex justify-center">
        <div className="animate-pulse text-gray-400 font-bold tracking-widest uppercase">Loading Content...</div>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 bg-[#FAFAFA] px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-4">About IEDC</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-gray-900 leading-tight mb-8">
              Empowering the next generation of creators.
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed font-sans whitespace-pre-wrap">
              {aboutData.about_text}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-gray-200" />
            <Image 
              src={aboutData.image_url || "/about-bg.jpg"} 
              alt="IEDC Activities" 
              fill 
              className="object-cover relative z-10" 
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-gray-100"
          >
            <h4 className="text-2xl font-serif text-gray-900 mb-6">Our Vision</h4>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
              {aboutData.vision}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-gray-100"
          >
            <h4 className="text-2xl font-serif text-gray-900 mb-6">Objectives</h4>
            <ul className="space-y-4">
              {aboutData.objectives && aboutData.objectives.map((obj, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <span className="text-gray-400 mt-1">✦</span>
                  <span className="text-gray-600 leading-relaxed text-lg">{obj}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}