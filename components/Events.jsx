'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real events from NeonDB on component load
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events');
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  // Format date to look like "Oct 15, 2026"
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <section className="py-24 bg-white flex justify-center">
        <div className="animate-pulse text-gray-400 font-bold tracking-widest uppercase">Loading Events...</div>
      </section>
    );
  }

  return (
    <section id="events" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex justify-between items-end">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm font-bold tracking-[0.2em] text-gray-500 uppercase mb-2">Join Us</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900">Upcoming Events</h3>
        </motion.div>
      </div>

      <div className="w-full flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-12 px-6 md:px-12 space-x-6 md:space-x-10">
        {events.map((event, index) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="snap-start shrink-0 w-[300px] md:w-[450px] flex flex-col group"
          >
            {/* Real Event Image */}
            <div className="relative h-[250px] md:h-[300px] w-full rounded-2xl overflow-hidden mb-6 bg-gray-100">
              <Image 
                src={event.image_url || '/event-placeholder.jpg'} 
                alt={event.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
            
            <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-2">
              {formatDate(event.event_date)}
            </p>
            <h4 className="text-2xl font-serif text-gray-900 mb-3">{event.title}</h4>
            <p className="text-gray-600 font-sans mb-6 line-clamp-3">
              {event.description}
            </p>

            {/* Dynamic Button Links */}
            {event.links && event.links.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-3">
                {event.links.map((link, i) => (
                  <Link 
                    key={i} 
                    href={link.url}
                    target="_blank" // Opens the link in a new tab
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-wider px-4 py-2 border border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors"
                  >
                    {link.label} {/* This is where the name you typed becomes the button text */}
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        ))}
        
        {/* Fallback if no events exist yet */}
        {events.length === 0 && (
          <p className="text-gray-500 font-sans">No upcoming events at the moment. Stay tuned!</p>
        )}
      </div>
    </section>
  );
}