'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const res = await fetch('/api/achievements');
        if (res.ok) setAchievements(await res.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white flex justify-center">
        <div className="animate-pulse text-gray-400 font-bold tracking-widest uppercase">Loading Achievements...</div>
      </section>
    );
  }

  if (achievements.length === 0) return null;

  return (
    <section id="achievements" className="py-24 bg-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">Milestones</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900">Our Achievements</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {achievements.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[300px] w-full rounded-2xl overflow-hidden mb-6 bg-gray-100">
                <Image 
                  src={item.image_url || '/event-placeholder.jpg'} 
                  alt={item.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <h4 className="text-2xl font-serif text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h4>
              <p className="text-gray-600 font-sans leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}