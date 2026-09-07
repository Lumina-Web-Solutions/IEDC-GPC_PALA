'use client';
import { motion } from 'framer-motion';

export default function CorePillars() {
  const pillars = [
    {
      title: "Innovation",
      text: "We regularly host ideathons and challenges to help kindle the fire of innovation and creativity in budding entrepreneurs on campus, and bring about a culture of idea-driven development in college."
    },
    {
      title: "Entrepreneurship",
      text: "We provide assistance to startup founders in the college, by collaborating with Kerala Startup Mission and CET TBI. We are also supported by our illustrious alumni and other leading entrepreneurs and innovators."
    },
    {
      title: "Technology",
      text: "We regularly conduct workshops, competitions, hackathons and panel discussions to delve into the latest technologies and processes that drive the industries of today."
    }
  ];

  return (
    <section className="py-24 bg-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        {pillars.map((pillar, index) => (
          <motion.div 
            key={pillar.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col"
          >
            <h2 className="text-3xl font-serif text-gray-900 mb-6 border-b border-gray-300 pb-4">
              {pillar.title}
            </h2>
            <p className="text-gray-600 font-sans leading-loose text-lg">
              {pillar.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}