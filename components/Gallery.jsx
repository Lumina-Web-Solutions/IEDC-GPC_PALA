'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) setPhotos(await res.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-[#FAFAFA] flex justify-center">
        <div className="animate-pulse text-gray-400 font-bold tracking-widest uppercase">Loading Gallery...</div>
      </section>
    );
  }

  if (photos.length === 0) return null;

  return (
    <section className="py-24 bg-[#FAFAFA] px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h3 className="text-4xl md:text-5xl font-serif text-gray-900">Life at IEDC</h3>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <motion.div 
              key={photo.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
              className="relative aspect-square rounded-xl overflow-hidden bg-gray-200 group shadow-sm"
            >
              <Image 
                src={photo.image_url} 
                alt={`Gallery image ${index + 1}`} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}