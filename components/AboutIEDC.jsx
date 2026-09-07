'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutIEDC() {
  // These will eventually be fetched from your NeonDB database
  const aboutData = {
    vision: "To create an innovation culture among innovators by introducing them to State-of-the-art technologies and positioning the Institution as a Learning and Innovation Platform.",
    about: "IEDC GPC Pala aims to build an entrepreneurial ecosystem on campus, bridging the gap between industry and academia. We empower students to transform their innovative ideas into viable tech-driven startups.",
    objectives: [
      "To foster entrepreneurial culture among students.",
      "To provide mentorship and networking opportunities.",
      "To support technology-based entrepreneurship."
    ]
  };

  return (
    <section id="about" className="py-24 bg-[#FAFAFA] px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* About Section (Text + Image) */}
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
            <p className="text-lg text-gray-600 leading-relaxed font-sans">
              {aboutData.about}
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="absolute inset-0 bg-gray-200" /> {/* Placeholder */}
            {/* Add 'about-bg.jpg' to your public folder */}
            <Image src="/about-bg.jpg" alt="IEDC Activities" fill className="object-cover relative z-10" />
          </motion.div>
        </div>

        {/* Vision & Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-gray-100"
          >
            <h4 className="text-2xl font-serif text-gray-900 mb-6">Our Vision</h4>
            <p className="text-gray-600 leading-relaxed text-lg">
              {aboutData.vision}
            </p>
          </motion.div>

          {/* Objectives */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-10 md:p-14 rounded-2xl shadow-sm border border-gray-100"
          >
            <h4 className="text-2xl font-serif text-gray-900 mb-6">Objectives</h4>
            <ul className="space-y-4">
              {aboutData.objectives.map((obj, i) => (
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