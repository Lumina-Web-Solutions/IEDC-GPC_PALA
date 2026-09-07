'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const res = await fetch('/api/announcements');
        if (res.ok) setAnnouncements(await res.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAnnouncements();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <section className="py-24 bg-[#FAFAFA] flex justify-center">
        <div className="animate-pulse text-gray-400 font-bold tracking-widest uppercase">Loading Announcements...</div>
      </section>
    );
  }

  // Hide section completely if there are no announcements
  if (announcements.length === 0) return null;

  return (
    <section id="announcements" className="py-24 bg-[#FAFAFA] px-6 md:px-12 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900">Announcements</h3>
        </motion.div>

        <div className="space-y-6">
          {announcements.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col md:flex-row md:items-start gap-4 md:gap-8"
            >
              <div className="md:w-32 shrink-0 pt-1">
                <span className="text-sm font-bold tracking-widest text-gray-400 uppercase">
                  {formatDate(item.announcement_date)}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-serif text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-gray-600 font-sans leading-relaxed">
                  {item.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}